import React, { useState } from "react";
import { motion } from "framer-motion";

const dataArray = [
  {
    title: "1. Introduction",
    para: `Welcome to SkyStream's Privacy Policy. Your privacy is a top priority. This policy outlines how we collect, use, and protect your personal information. By using SkyStream's services, you agree to the practices detailed in this statement.`,
  },
  {
    title: "2. Information We Collect",
    para: `SkyStream collects personal information that you provide when signing up for our services, creating an account, or interacting with our features such as video calls, chat rooms, and file sharing. This may include your name, email address, and any other details necessary to enhance your experience.`,
  },
  {
    title: "3. How We Use Your Information",
    para: `We use your information to provide and improve our services, including enabling seamless screen sharing, video calls, chat functionality, and file sharing. We do not sell, trade, or otherwise transfer your personal information to outside parties without your explicit consent.`,
  },
  {
    title: "4. Security of Your Information",
    para: `SkyStream employs advanced security measures, including encryption and secure protocols, to ensure the confidentiality and integrity of your data. We are committed to protecting your personal information from unauthorized access, alteration, or disclosure.`,
  },
  {
    title: "5. Cookies",
    para: `SkyStream uses cookies to enhance your experience by remembering your preferences and tracking user behavior to improve our services. You can manage your cookie preferences through your browser settings.`,
  },
  {
    title: "6. Changes to This Privacy Policy",
    para: `SkyStream reserves the right to update or modify this Privacy Policy at any time. Any changes will be reflected on this page, and we encourage you to review it periodically.`,
  },
  {
    title: "7. Contact Us",
    para: `If you have any questions, concerns, or feedback about our Privacy Policy, please contact us at support@skystream.com.`,
  },
];

const PrivacyPolicy = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleBtn = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 10, y: 5 }}
      transition={{ duration: 2 }}
      className="min-h-screen"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 style={{ fontFamily: 'Orbitron, sans-serif' }} className="text-3xl md:text-4xl lg:text-5xl text-center font-bold text-[#2596be] mb-8">
          Privacy Policy
        </h1>
        <div>
          {dataArray.map((data, index) => (
            <motion.div
              key={index}
              className={`shadow-lg cursor-pointer py-3 px-5 bg-white mt-6 rounded-lg`}
              whileHover={{ scale: 1.01 }}
              onClick={() => toggleBtn(index)}
            >
              <div className="flex justify-between items-center">
                <p style={{ fontFamily: 'Ancizar, sans-serif' }} className="text-lg md:text-xl font-semibold text-gray-800">
                  {data.title}
                </p>
                <div>
                  <span className="text-xl md:text-2xl text-gray-600">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </div>
              </div>
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="overflow-hidden"
                >
                  <div className="py-4">
                    <p style={{ fontFamily: 'Ancizar, sans-serif' }} className="text-gray-700 text-sm md:text-base leading-6">
                      {data.para}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
