import React from "react";
import Logo from "../../../public/SkyShare-Logo.png";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black text-gray-400 rounded-t-3xl border-t border-gray-800 md:rounded-t-[4rem]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute top-1/4 right-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="md:w-1/2">
            <div className="mb-4 flex items-center gap-3">
              <img src={Logo} alt="logo" className="h-10 w-10 rounded-full" />
              <span className="text-3xl font-bold bg-gradient-to-br from-blue-400 to-purple-500 bg-clip-text text-transparent">
                SkyStream
              </span>
            </div>
            <p className="mb-6 max-w-lg text-sm text-gray-400 text-justify">
                Real-time WebRTC made simple. Plug, play, and collaborate.
            </p>
            <div className="flex gap-3">
              <SocialIcon href="https://github.com/UjjwalSaini07" icon={<Github size={18} />} />
              <SocialIcon href="#" icon={<Twitter size={18} />} />
              <SocialIcon href="#" icon={<Instagram size={18} />} />
              <SocialIcon href="#" icon={<Linkedin size={18} />} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:w-1/2 md:justify-end">
            <FooterColumn
              title="Products"
              links={[
                { label: "ChatRoom", href: "/chatroom" },
                { label: "Share Screen", href: "/sharescreen" },
                { label: "VideoRoom", href: "/videoroom" },
                { label: "File Sharing", href: "/fileshare" },
              ]}
            />
            <FooterColumn
              title="Company"
              links={[
                { label: "Terms & Conditions", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "License Issued", href: "#" },
              ]}
            />
            <FooterColumn
              title="Support"
              links={[
                { label: "About Us", href: "/about" },
                { label: "Contact Us", href: "/contact" },
                { label: "Help-Center", href: "/help-center" },
              ]}
            />
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="relative mt-12 border-t border-gray-800 pt-6">
          <div className="absolute left-1/2 top-0 h-0.5 w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div className="flex flex-col items-center justify-between text-sm text-gray-500 md:flex-row">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-medium text-white">SkyStream</span>. All rights reserved.
            </p>
            <p className="mt-3 md:mt-0">
              Building in public at{" "}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-medium text-purple-400 hover:text-white transition"
              >
                UjjwalS
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-gray-900 p-2 shadow-sm hover:scale-110 hover:bg-gray-800 transition duration-200"
    >
      <span className="text-gray-300 hover:text-white transition">{icon}</span>
    </a>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold text-white">{title}</h3>
      <ul className="space-y-2 text-sm">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="text-gray-400 hover:text-white hover:underline transition"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}