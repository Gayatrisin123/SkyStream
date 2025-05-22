import React, { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from "react-router-dom";
import { Sparkles, ScreenShare, Video, FolderOpen } from "lucide-react";
import AnimatedBeamCard from "../ui/AnimatedBeamCardHome2";

export default function FeaturesSection() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      offset: 100,
      delay: 10,
      duration: 2000,
      easing: "ease",
      once: false,
    });
  }, []);

  const features = [
    {
      icon: <Sparkles size={28} className="text-white" />,
      title: "Real-Time Chatroom",
      description:
        "Engage instantly with synchronized WebRTC messaging, enabling fast and immersive group discussions anywhere. 💬 Connect effortlessly with friends, colleagues, or communities from anywhere, anytime.",
      route: "/chatroom",
      animation: "fade-right",
    },
    {
      icon: <ScreenShare size={28} className="text-white" />,
      title: "Live Screen Sharing",
      description:
        "Share your screen in real-time with no lag — ideal for demos, walkthroughs, and live remote sessions. 📺 Perfect for team collaboration and remote troubleshooting with crystal-clear visuals.",
      route: "/sharescreen",
      animation: "fade-down",
    },
    {
      icon: <Video size={28} className="text-white" />,
      title: "Crystal Clear Video Calls",
      description:
        "Host seamless video calls with ultra-low latency and stunning quality using cutting-edge WebRTC streams. 🎥 Experience natural face-to-face conversations with smooth audio and vibrant video anywhere.",
      route: "/videoroom",
      animation: "fade-up",
    },
    {
      icon: <FolderOpen size={28} className="text-white" />,
      title: "Instant File Sharing",
      description:
        "Send documents and media instantly using peer-to-peer WebRTC channels with speed and security. 📂 Share large files securely and effortlessly without third-party delays or storage limits.",
      route: "/fileshare",
      animation: "fade-left",
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-4">
      <h2 data-aos="zoom-in-down" className="text-4xl font-bold text-center mb-16">
        Explore Our WebRTC Features
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <AnimatedBeamCard
            key={index}
            icon={feature.icon}
            designation={feature.title}
            description={feature.description}
            className="min-h-[440px] flex flex-col justify-between"
            aosAnimation={feature.animation}
          >
            <button
              onClick={() => navigate(feature.route)}
              className="mt-6 px-5 py-2 text-sm font-semibold bg-pink-600 hover:bg-pink-700 text-white rounded-full transition-colors"
            >
              Explore
            </button>
          </AnimatedBeamCard>
        ))}
      </div>
    </section>
  );
}
