import React, { useState } from "react";
import { motion } from "framer-motion";

const dataArray = [
  {
    title: "1. Introduction",
    para: `Welcome to SkyStream! By using our platform, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully. If you do not agree, you must not use SkyStream's services.`,
  },
  {
    title: "2. Use of Services",
    para: `SkyStream provides tools for screen sharing, video calls, chat rooms, and file sharing. You agree to use these features responsibly and in compliance with applicable laws. Any misuse, including unauthorized access, sharing of malicious content, or abuse of other users, is strictly prohibited.`,
  },
  {
    title: "3. User Accounts",
    para: `You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. SkyStream is not liable for any loss or damage resulting from unauthorized use of your account.`,
  },
  {
    title: "4. Intellectual Property",
    para: `SkyStream owns all rights, titles, and interests in its platform and services, including logos, designs, and software. You may not copy, distribute, or create derivative works without prior written consent.`,
  },
  {
    title: "5. Limitation of Liability",
    para: `SkyStream is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services. We provide our platform "as is" and do not guarantee uninterrupted access.`,
  },
  {
    title: "6. Termination",
    para: `SkyStream reserves the right to suspend or terminate your account without prior notice if you violate these Terms and Conditions or engage in any behavior deemed harmful to the platform or its users.`,
  },
  {
    title: "7. Amendments",
    para: `SkyStream may update these Terms and Conditions at any time. Changes will be posted on this page, and continued use of the platform constitutes acceptance of the updated terms.`,
  },
  {
    title: "8. Governing Law",
    para: `These Terms and Conditions are governed by and construed in accordance with the laws of the jurisdiction where SkyStream operates.`,
  },
  {
    title: "9. Contact Us",
    para: `For any questions or concerns regarding these Terms and Conditions, please contact us at ujjwalsaini0007@gmail.com.`,
  },
];

const TermsAndCondition = () => {
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
          Terms And Conditions
        </h1>
        <div>
          {dataArray.map((data, index) => (
            <div
              key={index}
              className={`shadow-lg cursor-pointer py-3 px-5 bg-white mt-6 rounded-lg transform transition-transform duration-300 hover:scale-[1.01] ${
                activeIndex === index ? "animate-slideDown" : ""
              }`}
            >
              <div
                className="flex justify-between items-center"
                onClick={() => toggleBtn(index)}
              >
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
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TermsAndCondition;
