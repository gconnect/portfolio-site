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
  Code2,
} from "lucide-react";
import { socialLinks } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";

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
  {
    name: "Technical SDK Documentation",
    url: "https://africlab.gitbook.io/cartdevkit/introduction/overview-of-cartdevkit",
    color: "#1a1a2e",
    icon: Code2,
    description: "CartDevKit developer toolkit docs",
  },
];

export function Writing() {
  const { theme } = useTheme();

  return (
    <section
      id="writing"
      className={`py-24 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#141414]" : "bg-gray-50"
      }`}
    >
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
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Technical Writing
          </h2>
          <p
            className={`max-w-2xl mx-auto ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
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
              <h3
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Publications
              </h3>
            </div>

            <div className="space-y-4">
              {eb1Achievements.publications.map((pub, index) => {
                const hasTutorials = 'tutorials' in pub && Array.isArray(pub.tutorials);

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-5 rounded-xl border transition-all ${
                      theme === "dark"
                        ? "bg-[#1a1a1a] border-white/5 hover:border-[#2ea8ff]/30"
                        : "bg-white border-gray-200 hover:border-[#2ea8ff]/50 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <span
                          className={`text-xs font-medium mb-2 inline-block px-2 py-1 rounded ${
                            pub.type === "Academic Research"
                              ? "bg-[#907aea]/20 text-[#907aea]"
                              : pub.type === "Technical Tutorials"
                              ? "bg-[#00f56b]/20 text-[#00f56b]"
                              : "bg-[#2ea8ff]/20 text-[#2ea8ff]"
                          }`}
                        >
                          {pub.type}
                        </span>
                        <h4
                          className={`font-medium mt-2 leading-relaxed ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {pub.title}
                        </h4>
                        <p className="text-gray-500 text-sm mt-1">
                          {pub.publication}
                        </p>
                      </div>
                      {!hasTutorials && pub.url && (
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-[#2ea8ff] flex-shrink-0 ml-4 transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>

                    {/* Nested tutorials for combined entries */}
                    {hasTutorials && (
                      <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
                        {(pub.tutorials as Array<{title: string; url: string}>).map((tutorial, i) => (
                          <a
                            key={i}
                            href={tutorial.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-between py-2 px-3 rounded-lg transition-all group/tutorial ${
                              theme === "dark"
                                ? "hover:bg-white/5"
                                : "hover:bg-gray-100"
                            }`}
                          >
                            <span className={`text-sm group-hover/tutorial:text-[#2ea8ff] transition-colors ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {tutorial.title}
                            </span>
                            <ExternalLink size={14} className="text-gray-500 group-hover/tutorial:text-[#2ea8ff] transition-colors" />
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
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
              <h3
                className={`text-xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
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
                  className={`flex items-center justify-between p-5 rounded-xl border transition-all group ${
                    theme === "dark"
                      ? "bg-[#1a1a1a] border-white/5 hover:border-white/10"
                      : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110"
                      style={{ backgroundColor: platform.color }}
                    >
                      <platform.icon size={22} />
                    </div>
                    <div>
                      <h4
                        className={`font-medium group-hover:text-[#2ea8ff] transition-colors ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
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

          </motion.div>
        </div>
      </div>
    </section>
  );
}
