"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import { Briefcase, ExternalLink } from "lucide-react";

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-6">
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
              CAREER
            </span>
            <span className="w-12 h-px bg-[#907aea]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Work Experience
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Building scalable systems across Web3, backend, and mobile platforms.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#2ea8ff] via-[#907aea] to-[#00f56b]" />

          {experience.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`relative mb-12 ${
                index % 2 === 0
                  ? "md:pr-12 md:text-right md:mr-auto md:w-1/2"
                  : "md:pl-12 md:ml-auto md:w-1/2"
              }`}
            >
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`absolute top-0 w-4 h-4 rounded-full border-4 border-[#0a0a0a] z-10 ${
                  job.type === "current" ? "bg-[#00f56b]" : "bg-[#2ea8ff]"
                } ${
                  index % 2 === 0
                    ? "left-0 md:left-auto md:-right-2"
                    : "left-0 md:-left-2"
                }`}
              />

              {/* Connecting line to dot */}
              <div
                className={`absolute top-1.5 h-px bg-white/10 hidden md:block ${
                  index % 2 === 0 ? "right-0 w-10" : "left-0 w-10"
                }`}
              />

              {/* Card */}
              <div
                className={`ml-8 md:ml-0 bg-[#141414] rounded-xl p-6 border border-white/5 hover:border-[#2ea8ff]/30 transition-all duration-300 group ${
                  index % 2 === 0 ? "md:mr-4" : "md:ml-4"
                }`}
              >
                <div
                  className={`flex items-center justify-between mb-3 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <span className="text-[#2ea8ff] text-sm font-mono">
                    {job.period}
                  </span>
                  {job.type === "current" && (
                    <span className="px-2.5 py-1 bg-[#00f56b]/20 text-[#00f56b] text-xs font-medium rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f56b] animate-pulse" />
                      Current
                    </span>
                  )}
                </div>

                <h3
                  className={`text-xl font-semibold text-white mb-1 group-hover:text-[#2ea8ff] transition-colors ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  {job.title}
                </h3>
                <p
                  className={`text-gray-400 text-sm mb-4 ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  {job.company}
                </p>

                <ul
                  className={`space-y-2 mb-4 ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  {job.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className={`text-gray-400 text-sm flex items-start gap-2 ${
                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <span className="text-[#2ea8ff] mt-1 flex-shrink-0">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div
                  className={`flex flex-wrap gap-2 ${
                    index % 2 === 0 ? "md:justify-end" : ""
                  }`}
                >
                  {job.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-white/5 text-gray-400 text-xs rounded-md hover:bg-white/10 hover:text-white transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://www.linkedin.com/in/glory-agatevure/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#2ea8ff] transition-colors group"
          >
            <Briefcase size={18} />
            <span>View full experience on LinkedIn</span>
            <ExternalLink
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
