import React from "react";
import { Button } from "../@/components/ui/button";
import img from "../assets/howitworks.png";
import { PiNumberOneBold, PiNumberTwoBold, PiNumberThreeBold, PiNumberFourBold } from "react-icons/pi";

const steps = [
  {
    title: "Create a Room",
    description: "A random room code will be generated for you instantly.",
    icon: <PiNumberOneBold className="text-white text-[1.8rem]" />,
  },
  {
    title: "Start the Code",
    description: "Click the 'Share Screen' button and allow access to your screen.",
    icon: <PiNumberTwoBold className="text-white text-[1.8rem]" />,
  },
  {
    title: "Collaborate in Real-Time",
    description: "Share your screen with others in real-time, without any limitations!",
    icon: <PiNumberThreeBold className="text-white text-[1.8rem]" />,
  },
  {
    title: "End Your Session",
    description: "Wrap up smoothly and save your progress hassle-free.",
    icon: <PiNumberFourBold className="text-white text-[1.8rem]" />,
  },
];

export default function HelpCenter() {
  return (
    <section
      id="help-center"
      className="relative py-28 max-w-7xl mx-auto px-6 md:px-10 lg:px-16 overflow-hidden"
    >
      {/* Floating Background Effects */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-purple-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>

      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
          How It Works
        </h2>
        <p className="text-lg text-white mt-4 max-w-2xl mx-auto opacity-90">
          A simple, efficient way to collaborate in real-time. Follow these
          steps to get started.
        </p>
        <div className="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>

      <div className="grid lg:grid-cols-2 items-center gap-12">
        <div className="relative">
          <img
            src={img}
            alt="How it works illustration"
            className="rounded-2xl shadow-xl w-full h-auto object-cover object-center transition-all duration-700 transform hover:scale-105"
          />
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-400 rounded-full opacity-75 blur-lg animate-pulse"></div>
        </div>

        <div className="space-y-10 relative">
          <div className="absolute left-5 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full opacity-80"></div>
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-6 text-white group">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg transform transition-all group-hover:scale-110">
                {step.icon}
              </div>
              <div className="transition-all duration-300 group-hover:translate-x-2">
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="opacity-90">{step.description}</p>
              </div>
            </div>
          ))}

          <div className="mt-10 text-center">
            <Button
              size="lg"
              className="transform hover:scale-110 transition-transform duration-300 shadow-xl"
            >
              <a
                href="/host"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                Get Started
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
