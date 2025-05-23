import React from "react";

const metadata = {
  title: "SkyStream",
  description: "SkyStream makes remote collaboration effortless without the hassle with instant real-time collaboration powered by WebRTC, secure screen sharing, Video calls, File Sharing—no downloads or logins required! 🌐✨ Integrated chat rooms enhance interaction, and a simple sign-in process ensures a personalized, seamless experience. Fast, secure, and accessible, SkyStream brings teams together effortlessly, anytime, anywhere.",
  metadataBase: "https://sky-stream-share.vercel.app/",
};

function LayoutMetaData({ children }) {
  React.useEffect(() => {
    document.title = metadata.title;
    document.querySelector('meta[name="description"]').setAttribute("content", metadata.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');

    if (ogTitle) ogTitle.setAttribute("content", metadata.title);
    if (ogUrl) ogUrl.setAttribute("content", metadata.metadataBase);
    if (ogDescription) ogDescription.setAttribute("content", metadata.description);
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] bg-cover to-muted/80 p-2 py-10 flex flex-col justify-between">
      {children}
    </div>
  );
}

export default LayoutMetaData;
