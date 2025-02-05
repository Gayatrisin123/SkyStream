import React from "react";

export default function HelpCenter() {
  return (
    <section
      id="help-center"
      className="relative max-w-7xl mx-auto px-6 md:px-10 lg:px-16"
    >
      {/* Floating Background Effects */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-purple-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>

      <div className="text-center mb-12">
        <h2 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
          About Info
        </h2>
        <p className="text-lg text-white mt-4 max-w-2xl mx-auto opacity-90">
          Sky Share allows instant screen sharing with no logins or downloads—fast, secure, and effortless collaboration.
        </p>
        <div className="mt-4 h-1 w-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
      </div>
    </section>
  );
}
