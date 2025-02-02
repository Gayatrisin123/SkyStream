import React from "react";
import { Button } from "../@/components/ui/button";
import img from '../assets/howitworks.png';
import { FaClipboard, FaShareAlt, FaUsers } from "react-icons/fa";

const steps = [
  {
    title: "Create a Room",
    description: "A random room code will be generated for you.",
    icon: <FaClipboard className="text-white text-2xl" />,
  },
  {
    title: "Start the Code",
    description: "Click the 'Share Screen' button and allow access to your screen.",
    icon: <FaShareAlt className="text-white text-2xl" />,
  },
  {
    title: "Collaborate in Real-Time",
    description: "Share your screen with others in real-time, without any limitations!",
    icon: <FaUsers className="text-white text-2xl" />,
  },
];

export default function HelpCenter() {
  return (
    <section id="help-center" className="py-28 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
          A simple, efficient way to collaborate in real-time. Follow these steps to get started.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-16">
        {/* Image Section */}
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
              className="bg-white p-8 rounded-xl shadow-lg flex items-start gap-8 transform hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold rounded-full flex items-center justify-center shadow-md">
                {step.icon}
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
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
