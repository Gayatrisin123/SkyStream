import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import Peer from "peerjs";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, Copy, Share2, Users, XCircle } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

const textVariant = (delay) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay: delay },
  },
});

export default function SendFile() {
  const [roomId, setRoomId] = useState("");
  const [peer, setPeer] = useState(null);
  const [viewers, setViewers] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [connections, setConnections] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5173";

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on("open", (id) => {
      setRoomId(id);
      toast.success("Sender's Room created successfully!");
    });

    newPeer.on("connection", (conn) => {
      setViewers((prev) => prev + 1);
      setConnections((prev) => [...prev, conn]);
      toast.info("New Receiver connected!", { autoClose: 3000 });

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
      toast.success("Sender's code copied! Share to receive.");
    } catch (error) {
      toast.error("Failed to copy sender's code.");
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const sendFile = () => {
    if (!selectedFile) {
      toast.error("No file selected. Please choose a file to send.");
      return;
    }

    const CHUNK_SIZE = 16 * 1024; // 16 KB
    const reader = new FileReader();

    reader.onload = () => {
      const fileData = reader.result;
      const totalChunks = Math.ceil(fileData.byteLength / CHUNK_SIZE);

      connections.forEach((conn) => {
        let offset = 0;

        const sendChunk = () => {
          if (offset < fileData.byteLength) {
            const chunk = fileData.slice(offset, offset + CHUNK_SIZE);
            conn.send({ chunk });
            offset += CHUNK_SIZE;
            setTimeout(sendChunk, 50); // Delay to avoid overloading
          } else {
            conn.send({
              done: true,
              name: selectedFile.name,
              type: selectedFile.type,
            });
            toast.success("File sent to all receivers!");
          }
        };

        sendChunk();
      });
    };

    reader.readAsArrayBuffer(selectedFile);
  };

  const endSession = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    setViewers(0);
    setRoomId("");
    setConnections([]);
    toast.warning("File sharing session ended.");
    navigate("/fileshare");
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
          style={{ fontFamily: 'Ancizar Serif, sans-serif' }}
          className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-xl shadow-xl"
          onClick={() => navigate("/fileshare")}
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Button>

        <Button
          variant="outline"
          style={{ fontFamily: 'Ancizar Serif, sans-serif' }}
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
          className="absolute top-16 right-0 bg-gray-800 bg-opacity-40 backdrop-blur-lg p-5 shadow-lg rounded-2xl border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex flex-col items-center space-y-4">
            <QRCode
              value={roomId ? `${baseUrl}/fileshare/receivefile?senderscode=${roomId}` : ""}
              size={160}
              fgColor="#ffffff"
              bgColor="transparent"
              className="rounded-xl shadow-lg"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black via-gray-800 to-gray-900 opacity-20 blur-sm"></div>
            <p className="text-gray-300 text-sm font-medium text-center">
              Scan to receive the file
            </p>
          </div>
        </div>
      )}

      <motion.div variants={textVariant(0.3)} initial="hidden" animate="show">
        <Card
          className="bg-gray-900 text-white shadow-xl hover:border-purple-500 rounded-xl p-6"
          style={{ boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)" }}
        >
          <CardHeader>
            <CardTitle style={{ fontFamily: 'Ancizar Serif, sans-serif' }} className="flex items-center gap-2 text-xl font-bold">
              <Users className="h-6 w-6 text-purple-400" />
              Your File Sharing Room
            </CardTitle>
            <CardDescription style={{ fontFamily: 'Ancizar Serif, sans-serif' }} className="text-gray-400 text-md">
              Share this room code with others to let them receive your file.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center gap-2">
              <code style={{ fontFamily: 'Ancizar Serif, sans-serif' }} className="flex-1 py-2 px-3 bg-gray-800 rounded-lg text-lg font-mono">
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
                    const shareUrl = `${baseUrl}/fileshare/receivefile?senderscode=${roomId}`; //! Error
                    try {
                      await navigator.share({
                        title: "Join my file sharing session",
                        text: "Click to join my file sharing session",
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

            <input
              type="file"
              onChange={handleFileSelect}
              style={{ fontFamily: 'Ancizar Serif, sans-serif' }}
              className="w-full text-white bg-gray-800 p-3 rounded-lg"
            />

            {selectedFile && (
              <div style={{ fontFamily: 'Ancizar Serif, sans-serif' }} className="text-gray-400">
                Selected File: <strong>{selectedFile.name}</strong>
              </div>
            )}

            <Button
              className="w-full bg-green-600 hover:bg-green-500"
              onClick={sendFile}
              style={{ fontFamily: 'Exo, sans-serif' }}
              disabled={!selectedFile}
            >
              Send File
            </Button>

            <Button
              className="w-full bg-red-600 hover:bg-red-500"
              style={{ fontFamily: 'Exo, sans-serif' }}
              onClick={endSession}
            >
              <XCircle className="h-5 w-5" />
              End Session
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
