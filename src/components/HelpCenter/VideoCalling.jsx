import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import VideoCalling from "../../assets/VideoCalling.png";
import { PiNumberOneBold, PiNumberTwoBold, PiNumberThreeBold, PiNumberFourBold, } from "react-icons/pi";

const textVariant = (delay) => ({
  hidden: { y: -50, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration: 1.25, delay: delay },
  },
});

const VideoCallingSteps = [
  {
    title: "Create Your Room Instantly",
    description: "Quickly generate a unique room code to begin collaborating.",
    icon: <PiNumberOneBold className="text-white text-[1.8rem]" />,
  },
  {
    title: "Start a Video Call Instantly",
    description: "Effortlessly start high-quality video calls with a single click.",
    icon: <PiNumberTwoBold className="text-white text-[1.8rem]" />,
  },
  {
    title: "Collaborate Effortlessly",
    description: "Share a room code or link for seamless real-time collaboration.",
    icon: <PiNumberThreeBold className="text-white text-[1.8rem]" />,
  },
  {
    title: "End Your Session Securely",
    description: "Safely conclude sessions and save progress for future access.",
    icon: <PiNumberFourBold className="text-white text-[1.8rem]" />,
  },
];

export default function HelpCenter() {
  return (
    <section
      id="help-center"
      className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16"
    >
      <div className="grid lg:grid-cols-2 items-center gap-12">
        <div className="space-y-10 relative">
          <div className="absolute left-5 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full opacity-80"></div>
          {VideoCallingSteps.map((step, index) => (
            <motion.div
            key={index}
            variants={textVariant(index + 0.7)}
            initial="hidden"
            animate="show"
            transition={{
              delay: 6.5,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="flex items-center gap-6 text-white group"
          >
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg transform transition-all group-hover:scale-110">
                {step.icon}
              </div>
              <div className="transition-all duration-300 group-hover:translate-x-2">
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="opacity-90">{step.description}</p>
              </div>
            </motion.div>
          ))}

          <div className="mt-10 text-center">
            <motion.div
              variants={textVariant(7.2)}
              initial="hidden"
              animate="show"
            >
              <Button
                size="lg"
                className="transform hover:scale-110 transition-transform duration-300 shadow-xl"
              >
                <a
                  href="/videoroom"
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Get Started
                </a>
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div variants={textVariant(6.5)} initial="hidden" animate="show">
          <div className="relative">
            <img
              src={VideoCalling}
              alt="How it works illustration"
              className="rounded-2xl shadow-xl w-full h-auto object-cover object-center transition-all duration-700 transform hover:scale-105"
            />
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-400 rounded-full opacity-75 blur-lg animate-pulse"></div>
          </div>
          <h2 style={{ fontFamily: 'Ancizar Serif, sans-serif' }} className="mt-4 text-2xl font-semibold text-center text-gray-700">How Video Calling Works</h2>
        </motion.div>
      </div>
    </section>
  );
}
