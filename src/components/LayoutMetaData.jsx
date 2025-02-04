import React from "react";

const metadata = {
  title: "SkyShare",
  description: "Share your screen📽️ instantly with anyone using a simple room code. No logins, no downloads required, just instant access.",
  metadataBase: "",
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
