import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import BG from "../ui/grid-bg";
import Spotlight from "../ui/spotlight";
import { motion } from "framer-motion";
import AnimatedCard from "../ui/AnimatedCard";
import AnimatedBeamCard from "../ui/AnimatedBeamCard";
import { Check, Grid3x3, Cloud, Sparkles } from "lucide-react";

export default function HomeHero1() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white px-4 py-20">
      <div className="absolute inset-0 z-0">
        <BG />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <Spotlight className="hidden md:block absolute top-0 left-0 translate-x-[-48%] translate-y-[-45%] opacity-80 animate-fade-in-slide" />
        <Spotlight className="hidden md:block absolute top-0 right-10 -scale-x-100 translate-x-[48%] translate-y-[-45%] opacity-80 animate-fade-in-slide" />
      </div>

      <div className="relative z-20 w-full mx-auto text-center">
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
          Empowering real-time connections
          <br />
          through seamless WebRTC experiences
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
          Plug-and-play WebRTC components for real-time collaboration. No
          complexity, just seamless integration. Build faster, connect
          instantly.
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <Button className="bg-pink-600 hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-full shadow-md hover:shadow-pink-500/40 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2">
            Get Started
          </Button>
        </div>
        <div className="text-gray-500 text-sm flex items-center justify-center gap-2 mb-16">
          <span>Powered by WebRTC. Built for impact.</span>
        </div>

        <div className="-mt-3 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          <AnimatedCard
            icon={<Sparkles size={28} className="text-white" />}
            title="Slick UI"
            description="Highly interactive and animated card with live data"
            className="p-6 -mt-20"
          />

          <div className="flex flex-col justify-between gap-6">
            <AnimatedBeamCard
              icon={<Cloud className="text-white" size={28} />}
              title="Cloud Ready"
              description="Sync and scale with real-time infrastructure."
              beamColorFrom="#ff4d6d"
              beamColorTo="#c70039"
            />
            <AnimatedBeamCard
              icon={<Cloud className="text-white" size={28} />}
              title="Animated Out of Box"
              description="No setup and smooth UI interactions."
              beamColorFrom="#ff4d6d"
              beamColorTo="#c70039"
            />
          </div>
          
          <AnimatedCard
            icon={<Cloud  size={36} className="text-white" />}
            title="WebRTC Ready"
            description="Real-time collaboration with WebSocket & cloud sync"
            className="p-6 -mt-20"
          />
        </div>
      </div>
    </div>
  );
}
