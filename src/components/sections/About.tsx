"use client";

import { motion } from "framer-motion";
import { personalInfo, skills, education, eb1Achievements } from "@/lib/data";
import { GraduationCap, Code2, Layers, Database, Smartphone } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

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
    skills: skills.backend,
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
  const { theme } = useTheme();

  return (
    <section
      id="about"
      className={`py-24 transition-colors duration-300 ${theme === "dark" ? "bg-[#141414]" : "bg-gray-50"
        }`}
    >
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
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
              }`}
          >
            Who I Am
          </h2>
          <p
            className={`max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
          >
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
            <div
              className={`rounded-2xl p-8 border ${theme === "dark"
                  ? "bg-[#1a1a1a] border-white/5"
                  : "bg-white border-gray-200 shadow-sm"
                }`}
            >
              <h3
                className={`text-2xl font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
              >
                My Journey
              </h3>
              <div
                className={`space-y-4 leading-relaxed ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                <p>
                    I’m a Protocol Engineer & Researcher contributing to the {" "}
                  <span className="text-[#2ea8ff]">Ethereum Protocol</span>,
                  where I contribute to critical infrastructure like the Ephemery testnet, Execution and Consensus layers, and node operations
                  impacting <span className="text-[#00f56b] font-semibold">50K+ users and node operators</span>.
                </p>
                <p>
                  My experience spans mobile development to full-stack engineering, with deep expertise in Software Engineering, AI, Cloud & DevOps and blockchain technologies.
                </p>
                <p>
                  I&apos;m also passionate about technical writing and community building,
                  serving as a{" "}
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    GDG Organizer
                  </span>{" "}
                  and{" "}
                  <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                    Women Techmaker advocate
                  </span>
                  .
                </p>
              </div>

              {/* Quick Facts */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div
                  className={`rounded-lg p-4 ${theme === "dark" ? "bg-[#141414]" : "bg-gray-50"
                    }`}
                >
                  <span className="text-[#2ea8ff] text-2xl font-bold">7+</span>
                  <p
                    className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Years Experience
                  </p>
                </div>
                <div
                  className={`rounded-lg p-4 ${theme === "dark" ? "bg-[#141414]" : "bg-gray-50"
                    }`}
                >
                  <span className="text-[#907aea] text-2xl font-bold">3x</span>
                  <p
                    className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Hackathon Winner
                  </p>
                </div>
                <div
                  className={`rounded-lg p-4 ${theme === "dark" ? "bg-[#141414]" : "bg-gray-50"
                    }`}
                >
                  <span className="text-[#00f56b] text-2xl font-bold">50K+</span>
                  <p
                    className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Devs Impacted
                  </p>
                </div>
                <div
                  className={`rounded-lg p-4 ${theme === "dark" ? "bg-[#141414]" : "bg-gray-50"
                    }`}
                >
                  <span className="text-[#f5bc00] text-2xl font-bold">{eb1Achievements.speakingEngagements.length}+</span>
                  <p
                    className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                  >
                    Conferences
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div
              className={`mt-6 rounded-2xl p-8 border ${theme === "dark"
                  ? "bg-[#1a1a1a] border-white/5"
                  : "bg-white border-gray-200 shadow-sm"
                }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-[#2ea8ff]" size={24} />
                <h3
                  className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                >
                  Education
                </h3>
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
                    <h4
                      className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                    >
                      {edu.degree}
                    </h4>
                    <p className="text-[#2ea8ff] text-sm">{edu.institution}</p>
                    <p
                      className={`text-sm ${theme === "dark" ? "text-gray-500" : "text-gray-500"
                        }`}
                    >
                      {edu.period}
                    </p>
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
            <h3
              className={`text-2xl font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"
                }`}
            >
              Technical Skills
            </h3>

            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-6 border transition-all group ${theme === "dark"
                    ? "bg-[#1a1a1a] border-white/5 hover:border-white/10"
                    : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                  }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <category.icon size={20} style={{ color: category.color }} />
                  </div>
                  <h4
                    className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {category.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${theme === "dark"
                          ? "bg-white/5 text-gray-300 hover:bg-white/10"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Current Focus */}
            <div
              className={`rounded-xl p-6 border ${theme === "dark"
                  ? "bg-gradient-to-br from-[#2ea8ff]/10 to-[#907aea]/10 border-[#2ea8ff]/20"
                  : "bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200"
                }`}
            >
              <h4
                className={`font-medium mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
              >
                Currently Focused On
              </h4>
              <ul
                className={`space-y-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2ea8ff]" />
                  Ethereum Protocol Development & Consensus Layer
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#907aea]" />
                  Scalable Backend Architecture with NestJS, Rust and Java
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#907aea]" />
                  Cloud Infrastructure & DevOps (CI/CD, containerization, reliability)
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
