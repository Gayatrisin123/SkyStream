import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Share2, Activity, Cloud, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import BG from "../ui/grid-bg";
import Spotlight from "../ui/spotlight";
import AnimatedCard from "../ui/AnimatedCard";
import AnimatedBeamCard from "../ui/AnimatedBeamCard";

const textMotion = ({ 
  delay = 0, 
  duration = 1.25, 
  startY = -50, 
  startOpacity = 0, 
  endY = 0, 
  endOpacity = 1, 
  easingType = "spring" 
} = {}) => ({
  hidden: { y: startY, opacity: startOpacity },
  show: {
    y: endY,
    opacity: endOpacity,
    transition: {
      type: easingType,
      duration: duration,
      delay: delay,
    },
  },
});

const textMotionFromLeft = ({ 
  delay = 0, 
  duration = 1.25, 
  startX = -50, 
  startOpacity = 0, 
  endX = 0, 
  endOpacity = 1, 
  easingType = "spring" 
} = {}) => ({
  hidden: { x: startX, opacity: startOpacity },
  show: {
    x: endX,
    opacity: endOpacity,
    transition: {
      type: easingType,
      duration: duration,
      delay: delay,
    },
  },
});

const textMotionFromRight = ({ 
  delay = 0, 
  duration = 1.25, 
  startX = 50, 
  startOpacity = 0, 
  endX = 0, 
  endOpacity = 1, 
  easingType = "spring" 
} = {}) => ({
  hidden: { x: startX, opacity: startOpacity },
  show: {
    x: endX,
    opacity: endOpacity,
    transition: {
      type: easingType,
      duration: duration,
      delay: delay,
    },
  },
});

export default function HomeHero1() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white px-4 py-20">
      <div className="absolute inset-0 z-0">
        <BG />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div variants={ textMotion({ delay: 2.5, duration: 1, startY: -100, easingType: "easeOut" })} initial="hidden" animate="show">
          <Spotlight className="hidden md:block absolute top-0 left-0 translate-x-[-48%] translate-y-[-45%] opacity-80 animate-fade-in-slide" />
        </motion.div>
        <motion.div variants={ textMotion({ delay: 3, duration: 1, startY: -100, easingType: "easeOut" })} initial="hidden" animate="show">
          <Spotlight className="hidden md:block absolute top-0 right-10 -scale-x-100 translate-x-[48%] translate-y-[-45%] opacity-80 animate-fade-in-slide" />
        </motion.div>
      </div>

      <div className="relative z-20 w-full mx-auto text-center">
        <motion.div variants={ textMotion({ delay: 1, duration: 1, startY: -100, easingType: "easeOut" })} initial="hidden" animate="show">
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
            Empowering real-time connections
            <br />
            through seamless WebRTC experiences
          </h1>
        </motion.div>
        <motion.div variants={ textMotion({ delay: 1.8, duration: 1, startY: -100, easingType: "easeOut" })} initial="hidden" animate="show">
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Plug-and-play WebRTC components for real-time collaboration. No
            complexity, just seamless integration. Build faster, connect
            instantly.
          </p>
        </motion.div>
        <div className="flex justify-center gap-4 mb-12">
          <motion.div variants={ textMotion({ delay: 4, duration: 1, startY: -100, easingType: "easeOut" })} initial="hidden" animate="show">
            <Button onClick={() => navigate('/chatroom')} className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-full shadow-md hover:shadow-pink-500/40 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2">
              Get Started
            </Button>
          </motion.div>
        </div>
        <motion.div variants={ textMotionFromLeft({ delay: 4.4, duration: 1, startY: -100, easingType: "easeOut" })} initial="hidden" animate="show">
          <div className="text-gray-500 text-sm flex items-center justify-center gap-2 mb-16">
            <span>Powered by WebRTC. Built for impact.</span>
          </div>
        </motion.div>

        <div className="-mt-3 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          <motion.div variants={ textMotionFromLeft({ delay: 5, duration: 1, startY: -100, easingType: "easeOut" })} initial="hidden" animate="show">
            <AnimatedCard
              icon={<Sparkles size={28} className="text-white" />}
              title="Real-Time Brilliance"
  description="Leverage interactive WebRTC components designed for flawless real-time collaboration, empowering seamless video, chat, and file-sharing experiences effortlessly."
              className="p-6 -mt-20"
            />
          </motion.div>

          <div className="flex flex-col justify-between gap-6">
            <motion.div variants={ textMotion({ delay: 6, duration: 1, startY: -100, easingType: "easeOut" })} initial="hidden" animate="show">
              <AnimatedBeamCard
                icon={<Activity className="text-white" size={28} />}
                title="Performance Optimized"
                description="Experience lightning-fast interactions with real-time efficiency."
                beamColorFrom="#ff4d6d"
                beamColorTo="#c70039"
              />
            </motion.div>
            <motion.div variants={ textMotion({ delay: 6.5, duration: 1, startY: -100, easingType: "easeOut" })} initial="hidden" animate="show">
              <AnimatedBeamCard
                icon={<Share2 className="text-white" size={28} />}
                title="Effortless Collaboration"
                description="Simplify teamwork with seamless sharing and communication tools."
                beamColorFrom="#ff4d6d"
                beamColorTo="#c70039"
              />
            </motion.div>
          </div>

          <motion.div variants={ textMotionFromRight({ delay: 5.5, duration: 1, startY: -100, easingType: "easeOut" })} initial="hidden" animate="show">
            <AnimatedCard
              icon={<Cloud  size={36} className="text-white" />}
              title="WebRTC Ready"
              description="Empower real-time communication with WebRTC technology, offering seamless connectivity, low latency, and reliable cloud synchronization."
              className="p-6 -mt-20"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
