
import React from "react";
import { Button } from "../@/components/ui/button";

const About = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--black)]">
      <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
        About Me
      </Button>
    </div>
  );
};

export default About;
