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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import MarequeHead from "./common/ChatHeading";
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

const textVariant = (delay) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay: delay },
  },
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

function FireChatRoom() {
  const [user] = useAuthState(auth);

  return (
    <div className="flex flex-col bg-transparent text-white">
      <div className="text-left">{user && <SignOut />}</div>
      {!user && (
        <div>
          <MarequeHead />
        </div>
      )}
      <motion.div variants={textVariant(0.7)} initial="hidden" animate="show">
        <main className="flex-1 mt-16 mb-15 w-full flex flex-col items-center">
          {user ? <ChatRoom /> : <SignIn />}
        </main>
      </motion.div>
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
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        toast.success("Verification email sent! Please check your inbox.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error("Error during Google sign-in: " + error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
      });
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
      toast.success("Join ChatRoom Successfully!!!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
      });
    } catch (error) {
      toast.error("Error Signing in: " + error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
      });
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
        toast.success("Email linked successfully!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error linking email:", error);
      toast.error("Error linking email: " + error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-lg shadow-2xl rounded-3xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-white">
            {isSignUp ? "Create an Account" : "Welcome Back"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <button
              className="w-full px-6 py-3 bg-blue-600 bg-opacity-90 text-white font-semibold rounded-lg shadow-md hover:bg-opacity-100 transition-transform transform hover:scale-105 mb-6"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </button>

            <div className="flex flex-col items-center w-full">
              <p className="text-gray-400">OR</p>
              <form
                onSubmit={handleEmailSignIn}
                className="mt-4 flex flex-col items-center w-full"
              >
                <div className="w-full mb-4">
                  <label
                    className="block text-sm font-medium text-gray-300 mb-1"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-3 bg-gray-700 text-gray-200 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="w-full mb-6">
                  <label
                    className="block text-sm font-medium text-gray-300 mb-1"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="w-full px-4 py-3 bg-gray-700 text-gray-200 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  className="w-full px-6 py-3 bg-blue-600 bg-opacity-90 text-white font-semibold rounded-lg shadow-md hover:bg-opacity-100 transition-transform transform hover:scale-105"
                  type="submit"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>

                <p className="text-gray-400 text-sm mt-4">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <span
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-400 cursor-pointer hover:underline"
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </span>
                </p>
              </form>
            </div>

            <p className="text-gray-400 text-sm mt-6 text-center">
              Be respectful and follow the community rules.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SignOut() {
  return <div></div>;
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
      toast.error("Error sending message:" + error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: "dark",
      });
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
            <svg
              width="80px"
              height="80px"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 11.6C2 8.23969 2 6.55953 2.65396 5.27606C3.2292 4.14708 4.14708 3.2292 5.27606 2.65396C6.55953 2 8.23969 2 11.6 2H20.4C23.7603 2 25.4405 2 26.7239 2.65396C27.8529 3.2292 28.7708 4.14708 29.346 5.27606C30 6.55953 30 8.23969 30 11.6V20.4C30 23.7603 30 25.4405 29.346 26.7239C28.7708 27.8529 27.8529 28.7708 26.7239 29.346C25.4405 30 23.7603 30 20.4 30H11.6C8.23969 30 6.55953 30 5.27606 29.346C4.14708 28.7708 3.2292 27.8529 2.65396 26.7239C2 25.4405 2 23.7603 2 20.4V11.6Z"
                fill="url(#paint0_linear_87_7269)"
              />
              <path
                d="M16 23C20.9706 23 25 19.6421 25 15.5C25 11.3579 20.9706 8 16 8C11.0294 8 7 11.3579 7 15.5C7 18.1255 8.61889 20.4359 11.0702 21.7758C10.9881 22.4427 10.7415 23.3327 10 24C11.4021 23.7476 12.5211 23.2405 13.3571 22.6714C14.1928 22.885 15.0803 23 16 23Z"
                fill="white"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_87_7269"
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="30"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#5AF575" />
                  <stop offset="1" stop-color="#13BD2C" />
                </linearGradient>
              </defs>
            </svg>
            <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
              <p className="text-2xl font-semibold text-gray-700">
                No messages yet
              </p>
              <p className="text-sm text-gray-500">
                Start a conversation to see messages here.
              </p>
            </div>
            <button className="px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-500 rounded-lg shadow hover:bg-blue-600">
              Start a Conversation
            </button>
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
        <span className="text-sm leading-snug whitespace-pre-wrap">{text}</span>
      </div>
    </div>
  );
}

export default FireChatRoom;
