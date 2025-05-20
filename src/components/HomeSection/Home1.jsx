import React from "react";
import BG from "../ui/grid-bg";
import Spotlight from "../ui/spotlight";

const Home1 = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <BG className="absolute inset-0 z-0" />
      <Spotlight
        className="hidden md:block absolute top-0 left-0 z-10 translate-x-[-48%] translate-y-[-45%] opacity-80 animate-fade-in-slide"
      />
      <Spotlight
        className="hidden md:block absolute top-0 right-10 z-10 -scale-x-100 translate-x-[48%] translate-y-[-45%] opacity-80 animate-fade-in-slide"
      />
    </div>
  );
};

export default Home1;
