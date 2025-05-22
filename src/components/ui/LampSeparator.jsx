"use client";
import React from "react";
import { motion } from "framer-motion";

export function LampSeparator() {
  return (
    <div className="relative w-full h-24 bg-black overflow-hidden z-0">
      {/* Left White Conic Gradient */}
      <motion.div
        initial={{ opacity: 0.4, width: "30rem" }}
        whileInView={{ opacity: 0.4, width: "65rem" }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `conic-gradient(var(--conic-position), white, transparent)`,
        }}
        className="absolute inset-auto right-1/2 h-10 w-[30rem] text-white [--conic-position:from_70deg_at_center_top] opacity-40 z-10"
      >
        <div className="absolute w-full left-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute w-40 h-full left-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
      </motion.div>

      {/* Right White Conic Gradient */}
      <motion.div
        initial={{ opacity: 0.4, width: "30rem" }}
        whileInView={{ opacity: 0.4, width: "65rem" }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `conic-gradient(var(--conic-position), transparent, white)`,
        }}
        className="absolute inset-auto left-1/2 h-10 w-[30rem] text-white [--conic-position:from_290deg_at_center_top] opacity-40 z-10"
      >
        <div className="absolute w-40 h-full right-0 bg-black bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
        <div className="absolute w-full right-0 bg-black h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
      </motion.div>

      {/* White lamp shade glow */}
      <div className="absolute inset-auto z-10 h-10 w-[28rem] -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-full bg-white opacity-40 blur-3xl"></div>

      {/* Thin white separator line */}
      <motion.div
        initial={{ width: "15rem" }}
        whileInView={{ width: "30rem" }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="absolute inset-auto z-20 h-0.5 w-[30rem] left-1/2 -translate-x-1/2 -translate-y-[4.5rem] bg-white"
      />
    </div>
  );
}
