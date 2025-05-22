import React from "react";
import Logo from "../../../public/SkyShare-Logo.png"
import { Github, Heart, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-3xl border-t bg-muted/30 md:rounded-t-[4rem]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/30 blur-3xl dark:bg-primary/10"></div>
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl dark:bg-blue-500/10"></div>
      </div>
      <div className="container mx-auto max-w-6xl px-5 pb-8 pt-16">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <div className="mb-4 flex items-center justify-start gap-2">
              <img
                src={Logo}
                alt="logo"
                className="h-8 w-8 rounded-full"
              />
              <span className="bg-primary text-white bg-clip-text text-2xl font-semibold text-transparent dark:bg-gradient-to-b">
                SkyStream
              </span>
            </div>
            <p className="mb-4 text-muted-foreground">
              Real-time WebRTC made simple. Plug, play, and collaborate—fast, smooth, reliable.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://github.com/UjjwalSaini07"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-background p-2 transition-colors hover:bg-muted"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-background p-2 transition-colors hover:bg-muted"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-background p-2 transition-colors hover:bg-muted"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-background p-2 transition-colors hover:bg-muted"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className="mb-4 font-semibold">Products</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/chatroom"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  ChatRoom
                </a>
              </li>
              <li>
                <a
                  href="/sharescreen"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Share Screen
                </a>
              </li>
              <li>
                <a
                  href="/videoroom"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  VideoRoom
                </a>
              </li>
              <li>
                <a
                  href="/fileshare"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  File Sharing
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  License Issued
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/help-center"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Help-Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative border-t border-muted/50 pt-8">
          <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent"></div>
          <div className="flex flex-col items-center justify-between text-sm text-muted-foreground md:flex-row">
            <p>
              ©{new Date().getFullYear()}{" "}
              <span className="font-medium text-foreground">SkyStream</span>.
              All rights reserved.
            </p>
            <div className="mt-4 flex items-center space-x-1 md:mt-0">
              <span>
                Building in public at
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 font-medium text-primary hover:underline"
                >
                  UjjwalS
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
