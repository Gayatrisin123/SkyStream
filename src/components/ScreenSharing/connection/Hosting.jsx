import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Peer from "peerjs";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, Copy, Monitor, Share2, Users, XCircle, Play } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { motion } from "framer-motion";

const textVariant = (delay) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay: delay },
  },
});

export default function HostPage() {
  const [roomId, setRoomId] = useState("");
  const [peer, setPeer] = useState(null);
  const [viewers, setViewers] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [activeStream, setActiveStream] = useState(null);
  const [connections, setConnections] = useState([]);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5173";

  useEffect(() => {
    const handleOutsideClick = () => {
      if (showQR) setShowQR(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [showQR]);

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on("open", (id) => {
      setRoomId(id);
      toast.success("Room created successfully!");
    });

    newPeer.on("connection", (conn) => {
      setViewers((prev) => prev + 1);
      setConnections((prev) => [...prev, conn]); // Store new connection
      toast.info("New viewer connected!", { autoClose: 3000 });

      conn.on("close", () => {
        setViewers((prev) => Math.max(0, prev - 1));
        setConnections((prev) => prev.filter((c) => c !== conn));
      });
    });

    setPeer(newPeer);
    return () => newPeer.destroy();
  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room code copied! Share with others.");
    } catch (error) {
      toast.error("Failed to copy room code.");
    }
  };

  const startScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      setActiveStream(stream);

      connections.forEach((conn) => {
        const call = peer.call(conn.peer, stream);
        call.on("close", () => console.log("Call closed"));
      });

      stream.getVideoTracks()[0].onended = stopScreenSharing;
    } catch (err) {
      console.error("Screen sharing error:", err);
      toast.error("Failed to start screen sharing.");
    }
  };

  const stopScreenSharing = () => {
    if (activeStream) {
      activeStream.getTracks().forEach((track) => track.stop());
      setActiveStream(null);
    }
  };

  const endSession = () => {
    stopScreenSharing();
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    setViewers(0);
    setRoomId("");
    setConnections([]);
    toast.warning("Screen sharing session ended.");
    navigate("/sharescreen");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 flex-1 p-6 relative">
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
          onClick={() => navigate("/sharescreen")}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Button>

        <Button
          variant="outline"
          className="px-4 py-3 text-white bg-gray-800 hover:bg-gray-700 rounded-xl shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            setShowQR(!showQR);
          }}
        >
          QR Code
        </Button>
      </motion.div>

      {showQR && (
        <div
          className="absolute top-16 right-0 bg-gray-900 p-4 shadow-lg rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <QRCode
            value={roomId ? `${baseUrl}/join?room=${roomId}` : ""}
            size={150}
            fgColor="#ffffff"
            bgColor="#1a202c"
            className="rounded-lg shadow-md"
          />
        </div>
      )}

      <motion.div
        variants={textVariant(0.3)}
        initial="hidden"
        animate="show"
      >
      <Card
        className="bg-gray-900 text-white shadow-xl hover:border-purple-500 rounded-xl p-6"
        style={{ boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)" }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Monitor className="h-6 w-6 text-purple-400" />
            Your Screen Sharing Room
          </CardTitle>
          <CardDescription className="text-gray-400">
            Share this room code with others to let them view your screen.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex items-center gap-2">
            <code className="flex-1 py-2 px-3 bg-gray-800 rounded-lg text-lg font-mono">
              {roomId || "Generating room code..."}
            </code>
            <Button
              size="icon"
              onClick={copyRoomId}
              className="bg-gray-700 hover:bg-gray-600"
            >
              <Copy className="size-4 text-white" />
            </Button>

            {navigator.share && (
              <Button
                size="icon"
                onClick={async () => {
                  const shareUrl = `${baseUrl}/join?room=${roomId}`;
                  try {
                    await navigator.share({
                      title: "Join my screen sharing session",
                      text: "Click to join my screen sharing session",
                      url: shareUrl,
                    });
                  } catch (err) {
                    if (err.name !== "AbortError") {
                      await navigator.clipboard.writeText(shareUrl);
                      toast.success("Link copied to clipboard!");
                    }
                  }
                }}
                className="bg-blue-600 hover:bg-blue-500"
              >
                <Share2 className="size-4 text-white" />
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-400">Current Viewers</span>
            </div>
            <span className="text-lg font-semibold text-white">{viewers}</span>
          </div>

          {viewers > 0 && !activeStream && (
            <Button className="w-full bg-green-600 hover:bg-green-500" onClick={startScreenSharing}>
              <Play className="h-5 w-5" />
              Start Sharing
            </Button>
          )}

          {activeStream && (
            <Button className="w-full bg-red-600 hover:bg-red-500" onClick={stopScreenSharing}>
              <XCircle className="h-5 w-5" />
              Stop Sharing
            </Button>
          )}
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
}
