import React, { useRef, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  linkWithCredential,
  EmailAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import UserProfile from "../../assets/UserProfile.png";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

function FireChatRoom() {
  const [user] = useAuthState(auth);

  return (
    <div className="flex flex-col bg-transparent text-white">
      <div className="text-left">
        {user && <SignOut />}
      </div>

      <main className="flex-1 mt-16 mb-15 w-full flex flex-col items-center">
        {user ? <ChatRoom /> : <SignIn />}
      </main>
    </div>
  );
}

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check if the user has verified their email
      if (!user.emailVerified) {
        // Send a verification email
        await sendEmailVerification(user);
        alert("Verification email sent! Please check your inbox.");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setError("");
    } catch (error) {
      setError("Error signing in: " + error.message);
    }
  };

  const handleLinkEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user && user.email && window.location.href) {
        const credential = EmailAuthProvider.credentialWithLink(
          email,
          window.location.href
        );
        await linkWithCredential(user, credential);
        alert("Email linked successfully!");
      }
    } catch (error) {
      console.error("Error linking email:", error);
      setError("Error linking email: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <button
        className="px-6 py-3 bg-blue-500 bg-opacity-80 text-white font-semibold rounded-lg shadow-md hover:bg-opacity-100 transition-transform transform hover:scale-105 mb-4"
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>

      <div className="flex flex-col items-center mb-4">
        <p className="text-gray-400">OR</p>
        <form
          onSubmit={handleEmailSignIn}
          className="mt-4 flex flex-col items-center"
        >
          <input
            type="email"
            className="px-4 py-2 mb-2 bg-gray-700 text-gray-200 rounded-lg"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="px-4 py-2 mb-4 bg-gray-700 text-gray-200 rounded-lg"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className="px-6 py-3 bg-blue-500 bg-opacity-80 text-white font-semibold rounded-lg shadow-md hover:bg-opacity-100 transition-transform transform hover:scale-105"
            type="submit"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
          <p className="text-gray-400 text-sm mt-2">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-blue-400 cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </form>
      </div>

      <p className="text-gray-400 text-sm mt-4">
        Be respectful and follow the community rules.
      </p>
    </div>
  );
}

function SignOut() {
  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
      onClick={() => signOut(auth)}
    >
      Sign Out
    </button>
  );
}

function ChatRoom() {
  const bottomRef = useRef(null);
  const messagesRef = collection(firestore, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(50));
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

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
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col w-full h-full px-4 overflow-hidden">
      <div className="flex-1 flex flex-col justify-end overflow-auto pb-20">
        {messages && messages.length > 0 ? (
          messages.map((msg, idx) => <ChatMessage key={idx} message={msg} />)
        ) : (
          <div className="flex flex-col items-center justify-center py-10 mt-12 text-gray-500">
            <svg className="w-12 h-12 mb-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h4m1 8a9 9 0 100-18 9 9 0 000 18z" />
            </svg>
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm text-gray-400">Start a conversation to see messages here.</p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

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
    </div>
  );
}

function ChatMessage({ message }) {
  const { text, uid, photoURL } = message;

  const isCurrentUser = uid === auth.currentUser?.uid;

  const messageStyle = isCurrentUser
    ? "bg-blue-600 text-white rounded-br-none"
    : "bg-gray-100 text-gray-900 rounded-bl-none";

  return (
    <div
      className={`flex items-end mb-4 px-4 ${
        isCurrentUser ? "flex-row-reverse" : ""
      }`}
    >
      <img
        className="w-10 h-10 rounded-full shadow-md mx-3 border-2 border-white ring-2 ring-blue-400"
        src={photoURL || UserProfile}
        alt="User avatar"
      />
      <div
        className={`px-6 py-2 rounded-2xl shadow-lg max-w-md break-words transition-all duration-300 ${messageStyle}`}
      >
        <span className="text-sm leading-snug whitespace-pre-wrap">
          {text}
        </span>
      </div>
    </div>
  );
}

export default FireChatRoom;
