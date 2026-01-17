"use client";

import { motion } from "framer-motion";
import { personalInfo, skills, education } from "@/lib/data";
import { GraduationCap, Code2, Layers, Database, Smartphone } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Languages",
    skills: skills.languages,
    color: "#2ea8ff",
  },
  {
    icon: Layers,
    title: "Backend & Frontend",
    skills: [...skills.backend.slice(0, 3), ...skills.frontend.slice(0, 2)],
    color: "#907aea",
  },
  {
    icon: Database,
    title: "Blockchain",
    skills: skills.blockchain.slice(0, 5),
    color: "#00f56b",
  },
  {
    icon: Smartphone,
    title: "Tools & Mobile",
    skills: [...skills.tools.slice(0, 3), ...skills.mobile],
    color: "#f5bc00",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-px bg-[#2ea8ff]" />
            <span className="text-[#2ea8ff] text-sm font-mono tracking-wider">
              ABOUT ME
            </span>
            <span className="w-12 h-px bg-[#2ea8ff]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Who I Am
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A passionate technologist bridging the worlds of protocol engineering,
            software development, and technical education.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-white/5">
              <h3 className="text-2xl font-semibold text-white mb-6">
                My Journey
              </h3>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  I am a Protocol Engineer currently working with the{" "}
                  <span className="text-[#2ea8ff]">Ethereum Protocol Fellowship</span>,
                  where I implement critical infrastructure like the Ephemery testnet
                  impacting <span className="text-[#00f56b] font-semibold">50K+ developers</span>.
                </p>
                <p>
                  My journey spans from mobile development to backend engineering,
                  with deep expertise in NestJS, GraphQL, and blockchain technologies.
                  I&apos;ve processed over <span className="text-[#f5bc00] font-semibold">100K+ transactions</span>{" "}
                  in DeFi systems and contributed to platforms with{" "}
                  <span className="text-[#907aea] font-semibold">$2M+ in trading volume</span>.
                </p>
                <p>
                  I&apos;m also passionate about technical writing and community building,
                  serving as a <span className="text-white">GDG Organizer</span> and{" "}
                  <span className="text-white">Women Techmaker advocate</span>.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="bg-[#141414] rounded-lg p-4">
                  <span className="text-[#2ea8ff] text-2xl font-bold">7+</span>
                  <p className="text-gray-400 text-sm mt-1">Years Experience</p>
                </div>
                <div className="bg-[#141414] rounded-lg p-4">
                  <span className="text-[#907aea] text-2xl font-bold">3x</span>
                  <p className="text-gray-400 text-sm mt-1">Hackathon Winner</p>
                </div>
                <div className="bg-[#141414] rounded-lg p-4">
                  <span className="text-[#00f56b] text-2xl font-bold">50K+</span>
                  <p className="text-gray-400 text-sm mt-1">Devs Impacted</p>
                </div>
                <div className="bg-[#141414] rounded-lg p-4">
                  <span className="text-[#f5bc00] text-2xl font-bold">5+</span>
                  <p className="text-gray-400 text-sm mt-1">Conferences</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mt-6 bg-[#1a1a1a] rounded-2xl p-8 border border-white/5">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-[#2ea8ff]" size={24} />
                <h3 className="text-xl font-semibold text-white">Education</h3>
              </div>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-[#2ea8ff]/30 pl-4"
                  >
                    <h4 className="text-white font-medium">{edu.degree}</h4>
                    <p className="text-[#2ea8ff] text-sm">{edu.institution}</p>
                    <p className="text-gray-500 text-sm">{edu.period}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white mb-6">
              Technical Skills
            </h3>

            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#1a1a1a] rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <category.icon size={20} style={{ color: category.color }} />
                  </div>
                  <h4 className="text-white font-medium">{category.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 bg-white/5 text-gray-300 text-sm rounded-full hover:bg-white/10 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Current Focus */}
            <div className="bg-gradient-to-br from-[#2ea8ff]/10 to-[#907aea]/10 rounded-xl p-6 border border-[#2ea8ff]/20">
              <h4 className="text-white font-medium mb-3">Currently Focused On</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2ea8ff]" />
                  Ethereum Protocol Development & Consensus Layer
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#907aea]" />
                  Scalable Backend Architecture with NestJS
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f56b]" />
                  Technical Writing & Developer Advocacy
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
