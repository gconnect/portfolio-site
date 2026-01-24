"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo, socialLinks } from "@/lib/data";
import { Github, Linkedin, Twitter, Youtube, Instagram, ArrowDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const socialIcons = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: socialLinks.twitter, label: "Twitter" },
  { icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
  { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
];

export function Hero() {
  const { theme } = useTheme();

  return (
    <section
      className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-20 transition-colors duration-300 ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"
        }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] ${theme === "dark" ? "bg-[#2ea8ff]/20" : "bg-[#2ea8ff]/20"
            }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px] ${theme === "dark" ? "bg-[#907aea]/20" : "bg-[#907aea]/20"
            }`}
        />
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] ${theme === "dark" ? "bg-[#00f56b]/5" : "bg-[#00f56b]/10"
            }`}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              theme === "dark"
                ? `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`
                : `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                   linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="order-2 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-12 h-px bg-[#2ea8ff]" />
            <span className="text-[#2ea8ff] text-sm font-mono tracking-wider">
              HELLO, I&apos;M
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
              }`}
          >
            Glory A. Justin
          </motion.h1>

          {/* Dual identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`text-lg mb-8 max-w-lg leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
          >
            {personalInfo.shortBio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <a
              href="#achievements"
              className="group px-6 py-3 bg-[#2ea8ff] text-black font-medium rounded-full hover:bg-[#2ea8ff]/90 hover:shadow-[0_0_30px_rgba(46,168,255,0.4)] transition-all duration-300 flex items-center gap-2"
            >
              View Achievements
              <ArrowDown
                size={16}
                className="group-hover:translate-y-1 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className={`px-6 py-3 border rounded-full transition-all duration-300 ${theme === "dark"
                ? "border-white/20 text-white hover:bg-white/5 hover:border-white/40"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }`}
            >
              Contact Me
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-4"
          >
            <span className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
              Find me on
            </span>
            <div className="flex gap-3">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:text-[#2ea8ff] transition-all ${theme === "dark"
                    ? "bg-white/5 text-gray-400 hover:bg-white/10"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                    }`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right: Profile image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
          className="relative order-1 lg:order-2"
        >
          {/* Main image container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[450px] md:h-[450px] lg:w-[520px] lg:h-[520px] mx-auto">
            {/* Animated gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2ea8ff] via-[#907aea] to-[#00f56b] p-1"
            >
              <div
                className={`w-full h-full rounded-full ${theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"
                  }`}
              />
            </motion.div>

            {/* Profile image */}
            <div
              className={`absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br ${theme === "dark"
                ? "from-[#141414] to-[#1a1a1a]"
                : "from-gray-100 to-gray-200"
                }`}
            >
              <Image
                src="/images/profile.png"
                alt="Glory Justin"
                fill
                className="object-cover profile-image"
                priority
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 450px, 520px"
              />
            </div>

            {/* Decorative elements */}
            <div
              className={`absolute -inset-4 rounded-full border ${theme === "dark" ? "border-white/5" : "border-gray-200"
                }`}
            />
            <div
              className={`absolute -inset-8 rounded-full border ${theme === "dark" ? "border-white/[0.02]" : "border-gray-100"
                }`}
            />
          </div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-6 right-6 md:bottom-10 md:left-1/2 md:right-auto md:-translate-x-1/2 cursor-pointer group"
        aria-label="Scroll to next section"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span
            className={`text-xs tracking-wider group-hover:text-[#2ea8ff] transition-colors ${theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
          >
            SCROLL
          </span>
          <div
            className={`w-6 h-10 border-2 rounded-full flex justify-center pt-2 group-hover:border-[#2ea8ff]/50 transition-colors ${theme === "dark" ? "border-white/20" : "border-gray-300"
              }`}
          >
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#2ea8ff] rounded-full"
            />
          </div>
        </motion.div>
      </motion.button>
    </section>
  );
}
