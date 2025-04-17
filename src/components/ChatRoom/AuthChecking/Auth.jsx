import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { initializeApp } from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, } from "firebase/auth";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import MarequeHead from "../ChatHeading";

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

const textVariant = (delay) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay: delay },
  },
});

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        toast.success("Verification email sent! Please check your inbox.");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error("Google sign-in failed: " + error.message);
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
      toast.success("Signin Done Successfully!!");
    } catch (error) {
      toast.error("Error signing in:" + error.message);
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
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 mb-6"
              onClick={signInWithGoogle}
            >
              Sign in with Google
            </button>

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
                  className="w-full px-4 py-3 bg-gray-700 text-gray-200 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-3 bg-gray-700 text-gray-200 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105"
                type="submit"
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </button>

              <p className="text-gray-400 text-sm mt-4">
                {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                <span
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-400 cursor-pointer hover:underline"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </span>
              </p>
            </form>
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
  return <></>;
}

function Auth() {
  const [user] = useAuthState(auth);

  return (
    <div className="flex flex-col bg-transparent text-white">
      <div className="text-left px-4 mt-4">{user && <SignOut />}</div>
      {!user && <MarequeHead />}
      <motion.div variants={textVariant(0.7)} initial="hidden" animate="show">
        <main className="flex-1 mt-16 w-full flex flex-col items-center">
          <SignIn />
        </main>
      </motion.div>
    </div>
  );
}

export default Auth;
