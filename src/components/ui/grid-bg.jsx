import { cn } from "../../lib/utils";
import React from "react";

export default function GridBackgroundDemo() {
  return (
    <div className="relative flex h-[50rem] w-full items-center justify-center bg-black">
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:55px_55px]",
          "[background-image:linear-gradient(to_right,#fff_0.1px,transparent_0.5px),linear-gradient(to_bottom,#fff_0.1px,transparent_0.5px)]",
          "transition-all duration-300 ease-in-out"
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_bottom,transparent_75%,black)]"></div>
      <div
        className="pointer-events-none absolute inset-0 bg-black"
        style={{
          maskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 30%, transparent 50%, black 90%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.2) 30%, transparent 50%, black 90%)",
        }}
      ></div>
    </div>
  );
}
