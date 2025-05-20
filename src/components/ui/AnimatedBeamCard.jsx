"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./card";
import { cn } from "../../lib/utils";
import { BorderBeam } from "./magicui/border-beam";

const AnimatedBeamCard = ({
  icon,
  title,
  description,
  className,
  beamColorFrom = "#ff4d6d",
  beamColorTo = "#c70039",
}) => {
  return (
    <Card
      className={cn(
        "relative group/card bg-black/50 border border-white/10 rounded-2xl backdrop-blur-xl p-6 overflow-hidden transition-shadow duration-500 ease-out hover:shadow-[0_6px_20px_rgba(156,64,255,0.35)]",
        className
      )}
    >
      <div className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
        <BorderBeam
          colorFrom={beamColorFrom}
          colorTo={beamColorTo}
          size={140}
          style={{ strokeWidth: 10 }} // thicker beam stroke
        />
      </div>

      <CardContent className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300 max-w-xs">{description}</p>
      </CardContent>
    </Card>
  );
};

export default AnimatedBeamCard;
