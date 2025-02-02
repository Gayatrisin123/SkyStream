import React from "react";
import { Button } from "../@/components/ui/button";
import img from '../assets/howitworks.png';
import { PiNumberOneBold, PiNumberTwoBold, PiNumberThreeBold, PiNumberFourBold } from "react-icons/pi";

const steps = [
  {
    title: "Create a Room",
    description: "A random room code will be generated for you.",
    icon: <PiNumberOneBold className="text-white text-[1.4rem]" />,
  },
  {
    title: "Start the Code",
    description: "Click the 'Share Screen' button and allow access to your screen.",
    icon: <PiNumberTwoBold className="text-white text-[1.4rem]" />,
  },
  {
    title: "Collaborate in Real-Time",
    description: "Share your screen with others in real-time, without any limitations!",
    icon: <PiNumberThreeBold className="text-white text-[1.4rem]" />,
  },
  {
    title: "Collaborate in Real-Time",
    description: "Share your screen with others in real-time, without any limitations!",
    icon: <PiNumberFourBold className="text-white text-[1.4rem]" />,
  },
];

export default function HelpCenter() {
  return (
    <section id="help-center" className="py-28 max-w-7xl mx-auto px-5">
      <div className="text-center mb-10">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
          How It Works
        </h2>
        <p className="text-lg text-white mt-3 max-w-xl mx-auto">
          A simple, efficient way to collaborate in real-time. Follow these steps to get started.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <img
            src={img}
            alt="How it works illustration"
            className="rounded-xl shadow-xl w-full h-auto object-cover object-center hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Steps Section */}
        <div className="lg:w-1/2 space-y-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-6 transition-transform duration-300"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center shadow-md">
                {step.icon}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white">{step.description}</p>
              </div>
            </div>
          ))}

          <div className="text-center mt-10">
            <Button size="lg" className="transform hover:scale-105 transition-transform duration-200">
              <a
                href="/host"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-2xl transition-all duration-300"
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
