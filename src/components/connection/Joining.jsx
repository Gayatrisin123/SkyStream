import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ArrowLeft, Users } from "lucide-react";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

const textVariant = (delay) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay: delay },
  },
});

export default function JoinPage() {
  const [roomId, setRoomId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef(null);
  const peerRef = useRef(null);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get("room");
    if (room) {
      setRoomId(room);
    }
  }, []);

  const joinRoom = () => {
    if (!roomId.trim()) {
      toast.error("Room code required! Please enter a valid room code.");
      return;
    }

    setIsConnecting(true);
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", () => {
      const conn = peer.connect(roomId);

      conn.on("open", () => {
        setIsConnected(true);
        toast.success("Connected successfully! Waiting for host...");
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
        toast.warning("Disconnected! Host has ended the session.");
      });
    });

    peer.on("error", (err) => {
      console.error("PeerJS Error:", err);
      setIsConnecting(false);
      toast.error("Connection failed! Check the room code and try again.");
    });
  };

  return (
    <div className={cn("mx-auto space-y-8 flex-1 p-6", isConnected ? "max-w-6xl" : "max-w-2xl")}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <motion.div
        variants={textVariant(0.9)}
        initial="hidden"
        animate="show"
        className="flex justify-between"
      >
        <Button
          variant="outline"
          className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-xl shadow-xl"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Button>
      </motion.div>
      
      <motion.div
        variants={textVariant(0.35)}
        initial="hidden"
        animate="show"
      >
      <Card className="bg-gray-900 text-white shadow-xl hover:border-purple-500 rounded-xl p-6"
        style={{ boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white text-2xl font-extrabold">
            <Users className="h-7 w-7 text-blue-500 hover:scale-110 transition-transform duration-300" />
            Join a Room
          </CardTitle>
          <CardDescription className="text-gray-400 text-sm">
            Enter the room code to join and view the shared screen.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!isConnected ? (
            <div className="space-y-4">
              <Input
                className="p-4 rounded-lg bg-gray-800 text-gray-200 focus:ring-2 focus:ring-blue-500 border border-gray-600 transition-all duration-300"
                placeholder="Enter room code"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                disabled={isConnecting}
              />
              <Button
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
                onClick={joinRoom}
                disabled={isConnecting || !roomId.trim()}
              >
                {isConnecting ? "Connecting..." : "Join Room"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-video bg-muted-foreground rounded-xl overflow-hidden group border border-gray-600 shadow-lg">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-contain rounded-xl bg-gray-900"
                  autoPlay
                  playsInline
                  controls
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}
