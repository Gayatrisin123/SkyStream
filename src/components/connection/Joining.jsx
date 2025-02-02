import { useEffect, useRef, useState } from "react";
import { Button } from "../../@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";
import { Input } from "../../@/components/ui/input";
import { ArrowLeft, Users } from "lucide-react";
import { cn } from "../../@/components/lib/utils";
import { toast } from "sonner";

export default function JoinPage() {
  const [roomId, setRoomId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get("room");
    if (room) {
      setRoomId(room);
    }
  }, []);

  const joinRoom = () => {
    if (!roomId.trim()) {
      toast.error("Room code required", {
        description: "Please enter a valid room code",
      });
      return;
    }

    setIsConnecting(true);

    const peer = new Peer();

    peer.on("open", () => {
      const conn = peer.connect(roomId);

      conn.on("open", () => {
        setIsConnected(true);
        toast.success("Connected!", {
          description: "Waiting for host to share their screen...",
        });
      });

      peer.on("call", (call) => {
        call.answer();
        call.on("stream", (remoteStream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = remoteStream;
            videoRef.current.play().catch(console.error);
          }
        });
      });

      conn.on("close", () => {
        setIsConnecting(false);
        setIsConnected(false);
        toast.warning("Disconnected", {
          description: "The host has ended the session",
        });
      });
    });

    peer.on("error", (err) => {
      setIsConnecting(false);
      toast.error("Connection failed", {
        description:
          "Could not connect to the room. Please check the room code and try again.",
      });
    });
  };

  return (
    <div
      className={cn(
        "mx-auto space-y-8 flex-1",
        isConnected ? "max-w-6xl" : "max-w-2xl"
      )}
    >
      {/* Back Button */}
      <Button
        variant="outline"
        className="flex items-center gap-2 px-6 py-3 text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-lg shadow-lg"
        onClick={() => window.history.back()}
      >
        <ArrowLeft className="h-5 w-5" />
        Back to Home
      </Button>

      <Card className="relative bg-white/10 backdrop-blur-lg border border-transparent hover:border-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-transform transform hover:scale-105 rounded-xl shadow-lg p-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white text-2xl font-extrabold">
            <Users className="h-8 w-8 text-purple-500 hover:scale-110 transition-transform duration-300" />
            Join a Room
          </CardTitle>
          <CardDescription className="text-gray-300 text-sm">
            Enter the room code to join and view the shared screen
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isConnected ? (
            <div className="space-y-4">
              <Input
                className="p-3 rounded-lg bg-gray-800/50 text-gray-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room code"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                disabled={isConnecting}
              />
              <Button
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
                onClick={joinRoom}
                disabled={isConnecting || !roomId.trim()}
              >
                {isConnecting ? "Connecting..." : "Join Room"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                ref={videoContainerRef}
                className="relative aspect-video bg-muted-foreground rounded-lg overflow-hidden group border-2 border-gray-700"
              >
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-contain rounded-lg bg-gradient-to-br from-gray-900 to-gray-800"
                  autoPlay
                  playsInline
                  controls
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
