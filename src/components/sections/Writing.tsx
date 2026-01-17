"use client";

import { motion } from "framer-motion";
import { blogLinks, eb1Achievements } from "@/lib/data";
import {
  ExternalLink,
  BookOpen,
  FileText,
  PenTool,
  Newspaper,
  Youtube,
} from "lucide-react";
import { socialLinks } from "@/lib/data";

const blogPlatforms = [
  {
    name: "Medium",
    url: blogLinks.medium,
    color: "#00ab6c",
    icon: PenTool,
    description: "Technical articles & tutorials",
  },
  {
    name: "Substack",
    url: blogLinks.substack,
    color: "#ff6719",
    icon: Newspaper,
    description: "Newsletter & insights",
  },
  {
    name: "YouTube",
    url: socialLinks.youtube,
    color: "#ff0000",
    icon: Youtube,
    description: "Video content & talks",
  },
];

export function Writing() {
  return (
    <section id="writing" className="py-24 bg-[#141414]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-px bg-[#907aea]" />
            <span className="text-[#907aea] text-sm font-mono tracking-wider">
              WRITING
            </span>
            <span className="w-12 h-px bg-[#907aea]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Writing
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Articles, tutorials, research publications, and developer resources.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Publications Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#2ea8ff]/15 flex items-center justify-center">
                <BookOpen size={20} className="text-[#2ea8ff]" />
              </div>
              <h3 className="text-xl font-semibold text-white">Publications</h3>
            </div>

            <div className="space-y-4">
              {eb1Achievements.publications.map((pub, index) => (
                <motion.a
                  key={index}
                  href={pub.url || "#"}
                  target={pub.url ? "_blank" : undefined}
                  rel={pub.url ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start justify-between p-5 bg-[#1a1a1a] rounded-xl border border-white/5 hover:border-[#2ea8ff]/30 transition-all group cursor-pointer"
                >
                  <div className="flex-1">
                    <span
                      className={`text-xs font-medium mb-2 inline-block px-2 py-1 rounded ${
                        pub.type === "Academic Research"
                          ? "bg-[#907aea]/20 text-[#907aea]"
                          : "bg-[#2ea8ff]/20 text-[#2ea8ff]"
                      }`}
                    >
                      {pub.type}
                    </span>
                    <h4 className="text-white font-medium group-hover:text-[#2ea8ff] transition-colors mt-2 leading-relaxed">
                      {pub.title}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      {pub.publication}
                    </p>
                  </div>
                  {pub.url && (
                    <ExternalLink
                      size={16}
                      className="text-gray-500 group-hover:text-[#2ea8ff] flex-shrink-0 ml-4 transition-colors"
                    />
                  )}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Blog Platforms Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#907aea]/15 flex items-center justify-center">
                <FileText size={20} className="text-[#907aea]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                Content Platforms
              </h3>
            </div>

            <div className="space-y-4">
              {blogPlatforms.map((platform, index) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center justify-between p-5 bg-[#1a1a1a] rounded-xl border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                      style={{ backgroundColor: platform.color }}
                    >
                      <platform.icon size={22} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium group-hover:text-[#2ea8ff] transition-colors">
                        {platform.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {platform.description}
                      </p>
                    </div>
                  </div>
                  <ExternalLink
                    size={18}
                    className="text-gray-500 group-hover:text-white transition-colors"
                  />
                </motion.a>
              ))}
            </div>

            {/* Featured Articles CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 p-5 bg-gradient-to-br from-[#2ea8ff]/10 to-[#907aea]/10 rounded-xl border border-[#2ea8ff]/20"
            >
              <h4 className="text-white font-medium mb-2">
                Featured on Algorand Developer Portal
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Technical tutorials helping developers build on Algorand blockchain.
              </p>
              <div className="flex flex-wrap gap-2">
                {blogLinks.algorand.map((url, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#2ea8ff] hover:text-[#2ea8ff]/80 underline underline-offset-2"
                  >
                    Tutorial {index + 1}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
