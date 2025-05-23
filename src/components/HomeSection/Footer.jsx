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
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="md:w-1/2">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mb-5 flex items-center gap-4 cursor-pointer focus:outline-none"
            >
              <img src={Logo} alt="logo" className="h-10 w-10 rounded-full" />
              <span style={{ fontFamily: 'Orbitron, sans-serif' }} className="text-3xl font-extrabold bg-gradient-to-br from-blue-400 to-purple-500 bg-clip-text text-transparent">
                SkyStream
              </span>
            </button>

            <p style={{ fontFamily: 'Ancizar Serif, sans-serif' }} className="mb-6 max-w-md text-sm leading-relaxed text-justify">
              Real-time WebRTC made simple. Plug, play, and collaborate
              effortlessly.
            </p>
            <div className="flex gap-4">
              <SocialIcon
                href="https://github.com/UjjwalSaini07"
                icon={<Github size={20} />}
              />
              <SocialIcon href="#" icon={<Twitter size={20} />} />
              <SocialIcon href="#" icon={<Instagram size={20} />} />
              <SocialIcon href="#" icon={<Linkedin size={20} />} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:w-1/2 md:justify-end">
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
                { label: "Terms & Conditions", href: "/conditons" },
                { label: "Privacy Policy", href: "/privacypolicy" },
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
        <div className="relative mt-14 border-t border-gray-800 pt-6">
          <div className="absolute left-1/2 top-0 h-0.5 w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          <div style={{ fontFamily: 'Ancizar Serif, sans-serif' }} className="flex flex-col items-center justify-between text-sm text-gray-500 md:flex-row">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-white">SkyStream</span>. All
              rights reserved.
            </p>
            <p className="mt-3 md:mt-0">
              Building in public at{" "}
              <a
                href="https://github.com/UjjwalSaini07"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-medium text-purple-400 hover:text-white transition hover:underline"
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
      className="inline-flex items-center justify-center rounded-full bg-gray-900 p-2 shadow-md hover:scale-110 hover:bg-gray-800 transition-all duration-200 hover:ring-1 hover:ring-purple-500"
    >
      <span className="text-gray-300 hover:text-white transition">{icon}</span>
    </a>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 style={{ fontFamily: 'Playfair Display SC, sans-serif' }} className="mb-5 text-sm font-bold text-white tracking-widest uppercase">
        {title}
      </h3>
      <ul style={{ fontFamily: 'Cormorant Garamond, sans-serif' }} className="space-y-3 text-md">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="group relative inline-flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <span className="absolute -left-4 top-1/2 h-1 w-1 rounded-full bg-purple-400 opacity-0 group-hover:opacity-100 transform -translate-y-1/2 transition-all duration-200" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
