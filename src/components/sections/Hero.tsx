"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { personalInfo, socialLinks } from "@/lib/data";
import { Github, Linkedin, Twitter, Youtube, ArrowDown } from "lucide-react";

const socialIcons = [
  { icon: Github, href: socialLinks.github, label: "GitHub" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: socialLinks.twitter, label: "Twitter" },
  { icon: Youtube, href: socialLinks.youtube, label: "YouTube" },
];

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0a] pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2ea8ff]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#907aea]/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00f56b]/5 rounded-full blur-[150px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
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
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
          >
            Glory Justin
          </motion.h1>

          {/* Dual identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="text-xl md:text-2xl text-gray-300">
              Protocol Engineer
            </span>
            <span className="text-[#2ea8ff] text-2xl">/</span>
            <span className="text-xl md:text-2xl text-[#907aea] font-mono">
              &lt;Backend Developer /&gt;
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed"
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
              className="px-6 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 hover:border-white/40 transition-all duration-300"
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
            <span className="text-gray-500 text-sm">Find me on</span>
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
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#2ea8ff] hover:bg-white/10 transition-all"
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
          <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
            {/* Animated gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2ea8ff] via-[#907aea] to-[#00f56b] p-1"
            >
              <div className="w-full h-full rounded-full bg-[#0a0a0a]" />
            </motion.div>

            {/* Profile image */}
            <div className="absolute inset-2 rounded-full overflow-hidden bg-gradient-to-br from-[#141414] to-[#1a1a1a]">
              <Image
                src="/images/profile.jpg"
                alt="Glory Justin"
                fill
                className="object-cover profile-image"
                priority
                sizes="(max-width: 768px) 288px, 384px"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -inset-4 rounded-full border border-white/5" />
            <div className="absolute -inset-8 rounded-full border border-white/[0.02]" />
          </div>

          {/* Floating badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute top-0 md:top-4 right-0 md:-right-4 px-4 py-2 bg-[#141414] border border-[#00f56b]/30 rounded-full shadow-lg"
          >
            <span className="text-[#00f56b] text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f56b] animate-pulse" />
              Ethereum Fellow
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              delay: 0.5,
              ease: "easeInOut",
            }}
            className="absolute bottom-0 md:bottom-8 left-0 md:-left-4 px-4 py-2 bg-[#141414] border border-[#f5bc00]/30 rounded-full shadow-lg"
          >
            <span className="text-[#f5bc00] text-sm font-medium flex items-center gap-2">
              <span className="text-lg">🏆</span>
              3x Hackathon Winner
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3.5,
              delay: 1,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 -right-8 md:-right-12 px-4 py-2 bg-[#141414] border border-[#907aea]/30 rounded-full shadow-lg hidden md:block"
          >
            <span className="text-[#907aea] text-sm font-medium">
              50K+ Devs Impacted
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-xs tracking-wider">SCROLL</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#2ea8ff] rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
