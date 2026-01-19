"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";

const footerLinks = [
  { name: "About", href: "#about" },
  { name: "Achievements", href: "#achievements" },
  { name: "Speaking", href: "#speaking" },
  { name: "Writing", href: "#writing" },
  { name: "Community", href: "#community" },
  { name: "Contact", href: "#contact" },
];

const socialIcons = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: socialLinks.twitter, label: "Twitter" },
  { icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
  { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
];

export function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`border-t transition-colors duration-300 ${theme === "dark"
        ? "bg-[#0a0a0a] border-white/5"
        : "bg-white border-gray-200"
      }`}>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link href="/" className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
              Glory<span className="text-[#2ea8ff]">.</span>
            </Link>
            <p className={`mt-4 text-sm max-w-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
              Protocol Engineer, AI Researcher, and Technical Writer
              building the future of decentralized systems.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm transition-colors hover:text-[#2ea8ff] ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
              }`}>Connect</h4>
            <div className="flex gap-4">
              {socialIcons.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:text-[#2ea8ff] ${theme === "dark"
                      ? "bg-white/5 text-gray-400 hover:bg-white/10"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${theme === "dark" ? "border-white/5" : "border-gray-200"
          }`}>
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"
            }`}>
            © {new Date().getFullYear()} Glory Justin. All rights reserved.
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-600"
            }`}>
            Built with{" "}
            <span className="text-[#2ea8ff]">Next.js</span> &{" "}
            <span className="text-[#907aea]">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
