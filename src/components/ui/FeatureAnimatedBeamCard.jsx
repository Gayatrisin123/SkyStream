"use client";

import React from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Card, CardContent } from "./card";
import { cn } from "../../lib/utils";
import { BorderBeam } from "./magicui/border-beam";

const FeatureAnimatedBeamCard = ({
  icon,
  title,
  description,
  className,
  beamColorFrom = "#ff4d6d",
  beamColorTo = "#c70039",
  children,
  aosAnimation,
}) => {
  return (
    <Card
      className={cn(
        "relative group/card bg-black/50 border border-white/10 rounded-2xl backdrop-blur-xl pt-8 overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.03] hover:shadow-[0_6px_20px_rgba(255,64,128,0.35)]",
        className
      )}
      data-aos={aosAnimation}
    >
      <div className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
        <BorderBeam
          colorFrom={beamColorFrom}
          colorTo={beamColorTo}
          size={160}
          style={{ strokeWidth: 20 }}
        />
      </div>

      <CardContent className="relative z-10 flex flex-col items-center justify-between text-center h-full space-y-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-gray-900/30 border border-white/30 backdrop-blur-md shadow-inner">
          {icon}
        </div>
        <h3 style={{ fontFamily: 'Almendra, sans-serif' }} className="text-2xl font-bold text-white">
          {title}
        </h3>
        <p style={{ fontFamily: 'Cormorant Upright, sans-serif' }} className="text-md text-gray-300 leading-relaxed">
          {description}
        </p>
        <div className="pt-4">{children}</div>
      </CardContent>
    </Card>
  );
};

export default FeatureAnimatedBeamCard;
