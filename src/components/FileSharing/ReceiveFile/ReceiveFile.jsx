import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, Users } from "lucide-react";
import { motion } from "framer-motion";
import Peer from "peerjs";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

const textVariant = (delay) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay: delay },
  },
});

export default function ReceiveFile() {
  const [roomId, setRoomId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [receivedFile, setReceivedFile] = useState(null);
  const [receivedChunks, setReceivedChunks] = useState([]);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const peerRef = useRef(null);
  const connectionRef = useRef(null);

  const joinRoom = () => {
    if (!roomId.trim()) {
      toast.error("Sender's code is required! Please enter a valid Sender's code.");
      return;
    }

    setIsConnecting(true);
    const peer = new Peer();
    peerRef.current = peer;

    peer.on("open", () => {
      const conn = peer.connect(roomId);
      connectionRef.current = conn;

      conn.on("open", () => {
        setIsConnected(true);
        toast.success("Connected successfully! Waiting for file...");
      });

      const chunks = [];
      let totalSize = 0;

      conn.on("data", (data) => {
        if (data.chunk) {
          chunks.push(data.chunk);
          totalSize += data.chunk.byteLength;
          setFileSize(totalSize);
        } else if (data.done) {
          const blob = new Blob(chunks, { type: data.type });
          const url = URL.createObjectURL(blob);
          setReceivedChunks([]);
          setFileName(data.name);
          setFileType(data.type);
          setReceivedFile({ name: data.name, url });
          toast.success("File received successfully!");
        }
      });

      conn.on("close", () => {
        setIsConnecting(false);
        setIsConnected(false);
        toast.warning("Disconnected! Sender has ended the session.");
      });
    });

    peer.on("error", (err) => {
      console.error("PeerJS Error:", err);
      setIsConnecting(false);
      toast.error("Connection failed! Check the Sender's code and try again.");
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

      <motion.div variants={textVariant(0.35)} initial="hidden" animate="show">
        <Card
          className="bg-gray-900 text-white shadow-xl hover:border-purple-500 rounded-xl p-6"
          style={{ boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37)" }}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white text-2xl font-extrabold">
              <Users className="h-7 w-7 text-blue-500 hover:scale-110 transition-transform duration-300" />
              Receive a file
            </CardTitle>
            <CardDescription className="text-gray-400 text-sm">
              Enter the sender's code to receive the file instantly.
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
                  {isConnecting ? "Connecting..." : "Join with Sender"}
                </Button>
              </div>
            ) : receivedFile ? (
                <div className="space-y-6 text-center p-6 bg-gray-900 rounded-lg shadow-xl border border-gray-700">
                <h3 className="text-white text-2xl font-semibold">🎉File Transfer Successful</h3>
                <div className="bg-gray-800 rounded-md p-4 shadow-inner">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2 text-gray-300">
                    <span className="font-medium">File Name:</span>
                    <span className="text-gray-100">{receivedFile.name}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2 mb-2 text-gray-300">
                    <span className="font-medium">File Type:</span>
                    <span className="text-gray-100">{fileType}</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-300">
                    <span className="font-medium">File Size:</span>
                    <span className="text-gray-100">{(fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                </div>
                <a
                    href={receivedFile.url}
                    download={receivedFile.name}
                    className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                    Download File
                </a>
                </div>
            ) : (
              <div className="text-gray-400 text-center">Waiting for file...</div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}