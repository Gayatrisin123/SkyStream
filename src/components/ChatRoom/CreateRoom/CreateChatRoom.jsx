import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, Copy, Share2, CircleFadingPlus } from "lucide-react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../../ui/card";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, arrayUnion, updateDoc, } from "firebase/firestore";
import Auth from "../AuthChecking/Auth";
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

function CreateGroupRoom() {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [roomId, setRoomId] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const bottomRef = useRef(null);
  const isConnected = Boolean(currentRoomId);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const baseUrl = "http://localhost:5173";
  // const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5173";

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

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get("room");
    if (room) {
      setRoomId(room);
    }
  }, []);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room code copied! Share with others.");
    } catch (error) {
      toast.error("Failed to copy room code.");
    }
  };

  const createGroup = async () => {
    if (!auth.currentUser) {
      toast.error("You must be logged in to create a group.");
      return;
    }

    if (!groupName.trim()) {
      toast.error("Group name cannot be empty.");
      return;
    }

    try {
      const groupDoc = await addDoc(collection(firestore, "Groups"), {
        name: groupName,
        description: groupDescription,
        ownerId: auth.currentUser.uid,
        members: [auth.currentUser.uid],
        createdAt: serverTimestamp(),
      });

      const newRoomId = groupDoc.id;
      setRoomId(newRoomId);

      toast.success("Group created successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error("Error creating group: " + error.message);
    }
  };

  const joinRoom = async () => {
    if (!user) {
      toast.error("You must be logged in to join a room.");
      return;
    }

    if (!roomId.trim()) {
      toast.error("Please enter a valid Room ID.");
      return;
    }

    setIsConnecting(true);
    try {
      const roomRef = doc(firestore, "Groups", roomId.trim());
      const roomDoc = await getDoc(roomRef);

      if (!roomDoc.exists()) {
        toast.error("Room does not exist. Please check the Room ID.");
        setIsConnecting(false);
        return;
      }

      const roomData = roomDoc.data();
      const isMember = roomData.members.includes(user.uid);

      console.log("Room data:", roomData);
      console.log("User UID:", user.uid);

      // If the user is already a member, no need to update
      if (isMember) {
        setCurrentRoomId(roomId.trim());
        toast.success("Successfully joined the room!");
      } else {
        await updateDoc(roomRef, {
          members: arrayUnion(user.uid), // Add user to the members array
        });
        setCurrentRoomId(roomId.trim());
        toast.success("You have been added to the room!");
      }
    } catch (error) {
      console.error("Error joining room:", error);
      toast.error(`Error joining room: ${error.message}`);
    } finally {
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
      {!currentRoomId ? (
        <div className="max-w-3xl mx-auto p-6 space-y-6 flex-1  relative">
          <ToastContainer position="top-right" autoClose={3000} />

          <motion.div
            variants={textVariant(0.3)}
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
                value={`${baseUrl}/joinroom?room=${roomId}`}
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
                  <CircleFadingPlus className="h-7 w-7 text-purple-500 duration-300 hover:scale-110 transition-transform" />
                  Create a Group Room
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Start a new group for messaging and collaboration.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Group Name</label>
                  <input
                    type="text"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    placeholder="Enter group name"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Group Description
                  </label>
                  <textarea
                    value={groupDescription}
                    onChange={(e) => setGroupDescription(e.target.value)}
                    placeholder="Enter group description (optional)"
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
                  ></textarea>
                </div>

                {roomId && (
                  <div className="space-y-4">
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
                            const shareUrl = `${baseUrl}/joinroom?room=${roomId}`;
                            try {
                              await navigator.share({
                                title: "Join my group",
                                text: "Click to join my group",
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
                  </div>
                )}

                <Button
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
                  onClick={createGroup}
                >
                  Create Group
                </Button>
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
        <ChatMessaging roomId={currentRoomId} />
      )}
    </>
  );
}

function CreateAuthCheck() {
  const [user] = useAuthState(auth);

  return <div>{!user ? <Auth /> : <CreateGroupRoom />}</div>;
}

export default CreateAuthCheck;