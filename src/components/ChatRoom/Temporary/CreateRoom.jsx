import React, { useState, useRef, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";

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

function ChatRoom() {
  const [roomId, setRoomId] = useState("");
  const [formValue, setFormValue] = useState("");
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const bottomRef = useRef(null);
  const messagesRef = currentRoomId
    ? collection(firestore, `rooms/${currentRoomId}/messages`)
    : null;
  const messagesQuery =
    messagesRef && query(messagesRef, orderBy("createdAt"), limit(50));
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  const createRoom = async () => {
    if (!auth.currentUser) {
      toast.error("You must be logged in to create a room.");
      return;
    }
    try {
      const roomDoc = await addDoc(collection(firestore, "Groups"), {
        createdBy: auth.currentUser.uid, // Optional: Track who created the room
        createdAt: serverTimestamp(),
      });
      setCurrentRoomId(roomDoc.id);
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
  
    try {
      // Check if the room exists in the "Groups" collection
      const roomDoc = await getDoc(doc(firestore, "Groups", roomId.trim()));
  
      if (!roomDoc.exists()) {
        toast.error("Room does not exist. Please check the Room ID.");
        return;
      }
  
      setCurrentRoomId(roomId.trim());
      toast.success("Successfully joined the room!");
  
    } catch (error) {
      console.error("Error joining room:", error);
      toast.error("Error joining room: " + error.message);
    }
  };
  

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!currentRoomId) {
      toast.error("You must join a room first.");
      return;
    }

    const { uid, photoURL } = auth.currentUser || {};

    if (!uid) {
      toast.error("You must be logged in to send messages.");
      return;
    }

    try {
      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      });

      setFormValue("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Error sending message: " + error.message);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full px-4 overflow-hidden">
      <div className="flex flex-row justify-center space-x-4 py-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
          onClick={createRoom}
        >
          Create Room
        </button>
        <input
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          onClick={joinRoom}
        >
          Join Room
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-end overflow-auto pb-20">
        {messages && messages.length > 0 ? (
          messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-10 mt-12 text-gray-500">
            <p className="text-2xl font-semibold text-gray-700">
              {currentRoomId
                ? "No messages yet"
                : "Join or create a room to start chatting!"}
            </p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {currentRoomId && (
        <form
          onSubmit={sendMessage}
          className="fixed bottom-0 left-0 w-full px-4 py-3 backdrop-blur-lg bg-gray-800 bg-opacity-50 shadow-md flex items-center"
        >
          <input
            className="flex-1 px-4 py-2 bg-gray-700 bg-opacity-40 text-gray-200 rounded-lg focus:outline-none placeholder-gray-400"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type your message here..."
          />
          <button
            className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            type="submit"
            disabled={!formValue}
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
}

function ChatMessage({ message }) {
  const { text, uid, photoURL } = message;
  const messageClass =
    uid === (auth.currentUser?.uid || "") ? "sent" : "received";

  return (
    <div className={`message ${messageClass} flex items-center mb-4`}>
      <img
        src={photoURL || "https://i.pravatar.cc/300"}
        alt="Avatar"
        className="w-10 h-10 rounded-full mr-4"
      />
      <p className="px-4 py-2 bg-gray-200 rounded-lg shadow-md">{text}</p>
    </div>
  );
}

export default ChatRoom;
