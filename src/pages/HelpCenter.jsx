import React from "react";
import { motion } from "framer-motion";
import ShareScreen from "../components/HelpCenter/ShareScreen";
import ChatRoomScreen from "../components/HelpCenter/ChatRoom";
import FileSharingScreen from "../components/HelpCenter/FileSharing";
import VideoCallScreen from "../components/HelpCenter/VideoCalling";

const textVariant = (delay) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay: delay },
  },
});

export default function HelpCenter() {
  return (
    <section
      id="help-center"
      className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16"
    >
      <div className="absolute top-10 left-10 w-16 h-16 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-purple-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>

      <div className="text-center mb-12">
        <motion.div variants={textVariant(0.4)} initial="hidden" animate="show">
          <h2 style={{ fontFamily: 'Orbitron, sans-serif' }} className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            How It Works
          </h2>
        </motion.div>
        <motion.div variants={textVariant(0.9)} initial="hidden" animate="show">
          <p style={{ fontFamily: 'Ancizar Serif, sans-serif' }} className="text-lg text-white mt-4 max-w-2xl mx-auto opacity-90">
            Discover a seamless and efficient way to collaborate in real-time by following these simple steps to get started and unlock the full potential of your teamwork.
          </p>
        </motion.div>
        <motion.div variants={textVariant(1.1)} initial="hidden" animate="show">
          <div className="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </motion.div>
      </div>
      <div>
        <ShareScreen />
      </div>
      <motion.div variants={textVariant(5)} initial="hidden" animate="show">
        <div>
          <ChatRoomScreen />
        </div>
      </motion.div>
      <motion.div variants={textVariant(8)} initial="hidden" animate="show">
        <div>
          <FileSharingScreen />
        </div>
      </motion.div>
      <motion.div variants={textVariant(12)} initial="hidden" animate="show">
        <div>
          <VideoCallScreen />
        </div>
      </motion.div>
    </section>
  );
}
