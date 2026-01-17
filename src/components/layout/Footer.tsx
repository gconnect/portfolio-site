"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { socialLinks } from "@/lib/data";

const footerLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Speaking", href: "#speaking" },
  { name: "Writing", href: "#writing" },
  { name: "Contact", href: "#contact" },
];

const socialIcons = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: socialLinks.twitter, label: "Twitter" },
  { icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold text-white">
              Glory<span className="text-[#2ea8ff]">.</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm max-w-xs">
              Protocol Engineer, Backend Developer, and Technical Writer
              building the future of decentralized systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#2ea8ff] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#2ea8ff] hover:bg-white/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Glory Justin. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Built with{" "}
            <span className="text-[#2ea8ff]">Next.js</span> &{" "}
            <span className="text-[#907aea]">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
