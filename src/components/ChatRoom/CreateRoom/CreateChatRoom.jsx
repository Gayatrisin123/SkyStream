import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, Copy, Monitor, Share2 } from "lucide-react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../ui/card";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, } from "firebase/firestore";
import ChatMessaging from "../Messaging/ChatMessaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const textVariant = (delay) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay: delay },
  },
});

export default function CreateChatRoom() {
  const [roomId, setRoomId] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const bottomRef = useRef(null);
  const isConnected = Boolean(currentRoomId);
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5173";

  useEffect(() => {
    if (showQR) {
      const handleOutsideClick = (e) => {
        if (!e.target.closest("#qr-code-container")) {
          setShowQR(false);
        }
      };
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }
  }, [showQR]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room code copied! Share with others.");
    } catch (error) {
      toast.error("Failed to copy room code.");
    }
  };

  const createRoom = async () => {
    if (!auth.currentUser) {
      toast.error("You must be logged in to create a room.");
      return;
    }
    try {
      const roomDoc = await addDoc(collection(firestore, "Groups"), {
        createdBy: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setRoomId(roomDoc.id);
      toast.success("Room created successfully! Room ID: " + roomDoc.id, {
        position: "top-center",
        autoClose: 5000,
      });
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Error creating room: " + error.message);
    }
  };

  const joinRoom = async () => {
    if (!auth.currentUser) {
      toast.error("You must be logged in to join a room.");
      return;
    }

    if (!roomId.trim()) {
      toast.error("Please enter a valid Room ID.");
      return;
    }

    setIsConnecting(true);
    try {
      const roomDoc = await getDoc(doc(firestore, "Groups", roomId.trim()));

      if (!roomDoc.exists()) {
        toast.error("Room does not exist. Please check the Room ID.");
        setIsConnecting(false);
        return;
      }

      setCurrentRoomId(roomId.trim());
      toast.success("Successfully joined the room!");
    } catch (error) {
      console.error("Error joining room:", error);
      toast.error(`Error joining room: ${error.message}`);
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && !roomId) {
        createRoom();
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {!isConnecting ? (
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
              onClick={() => navigate("/")}
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

          {showQR && roomId && (
            <div
              id="qr-code-container"
              className="absolute top-16 right-0 bg-gray-900 p-4 shadow-lg rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <QRCode
                value={`${baseUrl}/chatroomjoin?room=${roomId}`}
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

                  {navigator.share && roomId && (
                    <Button
                      size="icon"
                      onClick={async () => {
                        const shareUrl = `${baseUrl}/chatroomjoin?room=${roomId}`;
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
                <Button
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  onClick={joinRoom}
                  disabled={isConnecting || !roomId.trim()}
                >
                  {isConnecting ? "Connecting..." : "Join Room"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      ) : (
        <ChatMessaging />
      )}
    </>
  );
}
