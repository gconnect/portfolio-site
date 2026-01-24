"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  GitBranch,
  GitCommit,
  ExternalLink,
  Code2,
  Server,
  FileText,
  Globe,
  Sparkles,
  Filter,
  Sun,
  Moon,
  Github,
  Star,
  Activity,
  Layers,
  Database,
  Cpu,
  Play,
  Calendar,
  Rocket,
  Beaker,
  FolderGit2,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { openSourceContributions, founderProjects, experimentalProjects } from "@/lib/data";

// Section navigation config
const workSections = [
  { id: "work-hero", label: "Overview", color: "#2ea8ff", icon: Rocket },
  { id: "founder-projects", label: "Founder Projects", color: "#fa3d8c", icon: Sparkles },
  { id: "experimental-projects", label: "Experiments", color: "#907aea", icon: Beaker },
  { id: "open-source", label: "Open Source", color: "#00f56b", icon: FolderGit2 },
  { id: "work-cta", label: "Connect", color: "#f5bc00", icon: MessageSquare },
];

const categoryConfig: Record<string, { color: string; icon: typeof Code2 }> = {
  Protocol: { color: "#00f56b", icon: Server },
  Documentation: { color: "#907aea", icon: FileText },
  Web: { color: "#2ea8ff", icon: Globe },
  Education: { color: "#f5bc00", icon: Sparkles },
};

// WorkSectionNav Component
function WorkSectionNav() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("work-hero");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = workSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(workSections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(workSections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = sectionId === "work-hero" ? 0 : 80;
      window.scrollTo({ top: section.offsetTop - offset, behavior: "smooth" });
    }
  };

  const activeIndex = workSections.findIndex((s) => s.id === activeSection);
  const activeColor = workSections[activeIndex]?.color || "#2ea8ff";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1"
        >
          <div className={`absolute right-[11px] top-0 bottom-0 w-[2px] rounded-full ${theme === "dark" ? "bg-white/5" : "bg-gray-300"}`} />
          <motion.div
            className="absolute right-[11px] w-[2px] rounded-full"
            style={{ backgroundColor: activeColor }}
            initial={false}
            animate={{ top: `${activeIndex * 40 + 8}px`, height: "24px" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <motion.div
            className="absolute right-[7px] w-[10px] rounded-full blur-sm"
            style={{ backgroundColor: activeColor }}
            initial={false}
            animate={{ top: `${activeIndex * 40 + 8}px`, height: "24px", opacity: 0.5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {workSections.map((section) => {
            const isActive = activeSection === section.id;
            const isHovered = hoveredSection === section.id;
            const Icon = section.icon;

            return (
              <div key={section.id} className="relative h-10 flex items-center">
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-8 px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium flex items-center gap-2 ${
                        theme === "dark"
                          ? "bg-[#1a1a1a] border border-white/10"
                          : "bg-white border border-gray-200 shadow-lg"
                      }`}
                      style={{ color: isActive ? section.color : undefined }}
                    >
                      <Icon size={14} />
                      {section.label}
                      <div className={`absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ${
                        theme === "dark" ? "border-l-[6px] border-l-[#1a1a1a]" : "border-l-[6px] border-l-white"
                      }`} />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={() => scrollToSection(section.id)}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className="relative w-6 h-6 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Navigate to ${section.label}`}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={false}
                    animate={{ scale: isActive ? 1 : 0, opacity: isActive ? 0.2 : 0 }}
                    style={{ backgroundColor: section.color }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: isActive ? section.color : theme === "dark" ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)",
                    }}
                    animate={{ scale: isActive ? 1.2 : 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: section.color }}
                      initial={{ scale: 0.5, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </motion.button>
              </div>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

export default function WorkPage() {
  const { theme, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = [...new Set(openSourceContributions.map((c) => c.category))];
    return cats;
  }, []);

  const filteredContributions = useMemo(() => {
    if (!selectedCategory) return openSourceContributions;
    return openSourceContributions.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  const stats = useMemo(() => {
    return {
      totalProjects: openSourceContributions.length + experimentalProjects.length,
      organizations: [...new Set(openSourceContributions.map((c) => c.organization))].length,
      experiments: experimentalProjects.length,
      highlighted: openSourceContributions.filter((c) => c.highlight).length,
    };
  }, []);

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0a0a0a]" : "bg-gradient-to-b from-gray-50 via-white to-gray-50"
      }`}
    >
      {/* Section Navigation */}
      <WorkSectionNav />

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors ${
          theme === "dark"
            ? "bg-[#0a0a0a]/90 border-white/5"
            : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className={`flex items-center gap-2 transition-colors ${
              theme === "dark"
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-all ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="work-hero" className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute -top-1/2 -left-1/4 w-[800px] h-[800px] rounded-full blur-[150px] ${
              theme === "dark" ? "bg-[#00f56b]/10" : "bg-[#00f56b]/15"
            }`}
          />
          <motion.div
            animate={{
              rotate: [360, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute -bottom-1/2 -right-1/4 w-[800px] h-[800px] rounded-full blur-[150px] ${
              theme === "dark" ? "bg-[#2ea8ff]/10" : "bg-[#2ea8ff]/15"
            }`}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00f56b]/10 border border-[#00f56b]/20 mb-6"
            >
              <GitBranch size={16} className="text-[#00f56b]" />
              <span className="text-[#00f56b] text-sm font-medium">
                Open Source Contributor
              </span>
            </motion.div>

            <h1
              className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Work &{" "}
              <span className="bg-gradient-to-r from-[#00f56b] via-[#2ea8ff] to-[#907aea] bg-clip-text text-transparent">
                Open Source
              </span>
            </h1>

            <p
              className={`text-lg md:text-xl max-w-2xl mx-auto ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Contributing to the decentralized future through protocol development,
              documentation, and community-driven innovation.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { label: "Total Projects", value: stats.totalProjects, icon: Code2, color: "#00f56b" },
              { label: "Organizations", value: stats.organizations, icon: Globe, color: "#2ea8ff" },
              { label: "Experiments", value: stats.experiments, icon: Layers, color: "#907aea" },
              { label: "Featured", value: stats.highlighted, icon: Star, color: "#f5bc00" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-6 rounded-2xl border text-center transition-all ${
                  theme === "dark"
                    ? "bg-[#141414] border-white/5 hover:border-white/10"
                    : "bg-white/80 backdrop-blur-sm border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                }`}
              >
                <stat.icon
                  size={24}
                  className="mx-auto mb-3"
                  style={{ color: stat.color }}
                />
                <div
                  className={`text-3xl font-bold mb-1 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Founder Projects Section */}
      <section id="founder-projects" className={`py-16 px-6 ${theme === "dark" ? "" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme === "dark" ? "bg-[#fa3d8c]/15" : "bg-[#fa3d8c]/10"}`}>
                <Sparkles size={20} className="text-[#fa3d8c]" />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Founder Projects
              </h2>
            </div>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Ventures I&apos;ve founded and actively building
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {founderProjects.map((project, index) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`group p-6 rounded-2xl border transition-all ${
                  theme === "dark"
                    ? "bg-gradient-to-br from-[#141414] to-[#1a1a1a] border-white/5 hover:border-[#fa3d8c]/30"
                    : "bg-gradient-to-br from-white to-gray-50/50 border-gray-200 hover:border-[#fa3d8c]/50 shadow-md hover:shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        project.status === "Building"
                          ? "bg-[#f5bc00]/20 text-[#f5bc00]"
                          : "bg-[#00f56b]/20 text-[#00f56b]"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <ExternalLink
                    size={18}
                    className="text-gray-500 group-hover:text-[#fa3d8c] transition-colors"
                  />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 group-hover:text-[#fa3d8c] transition-colors ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {project.name}
                </h3>
                <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                  {project.description}
                </p>
                <div className="mt-4 text-sm text-[#fa3d8c] font-medium">
                  {project.role}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Experimental Projects Section */}
      <section
        id="experimental-projects"
        className={`py-20 px-6 ${
          theme === "dark" ? "bg-[#0d0d0d]" : "bg-gradient-to-b from-gray-100/80 to-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme === "dark" ? "bg-[#2ea8ff]/15" : "bg-[#2ea8ff]/10"}`}>
                <Layers size={20} className="text-[#2ea8ff]" />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Experimental Projects
              </h2>
            </div>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Showcasing expertise in NestJS, Java Spring Boot, and Blockchain technologies
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experimentalProjects.map((project, index) => {
              const isHovered = hoveredProject === `exp-${project.name}`;
              const categoryColors: Record<string, string> = {
                Blockchain: "#00f56b",
                Backend: "#2ea8ff",
                Frontend: "#907aea",
              };
              const color = categoryColors[project.category] || "#2ea8ff";

              return (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredProject(`exp-${project.name}`)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`group relative rounded-2xl overflow-hidden border transition-all duration-500 ${
                    theme === "dark"
                      ? "bg-[#141414] border-white/5 hover:border-white/20"
                      : "bg-white border-gray-200/80 hover:border-gray-300 shadow-md hover:shadow-xl"
                  }`}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0 z-10 opacity-60 transition-opacity duration-500 group-hover:opacity-40"
                      style={{
                        background: `linear-gradient(135deg, ${color}30 0%, transparent 50%, ${color}10 100%)`,
                      }}
                    />

                    {/* Animated Grid Pattern */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `linear-gradient(${color}20 1px, transparent 1px), linear-gradient(90deg, ${color}20 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    />

                    {/* Floating Tech Icons */}
                    <motion.div
                      animate={{ y: isHovered ? -10 : 0, opacity: isHovered ? 1 : 0.7 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-10 flex items-center justify-center"
                    >
                      <div className="flex gap-3">
                        {project.category === "Blockchain" && (
                          <motion.div
                            animate={{ rotate: isHovered ? 360 : 0 }}
                            transition={{ duration: 2, ease: "linear" }}
                            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                          >
                            <Cpu size={32} style={{ color }} />
                          </motion.div>
                        )}
                        {project.category === "Backend" && (
                          <motion.div
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            transition={{ duration: 0.3 }}
                            className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center"
                          >
                            <Database size={32} style={{ color }} />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>

                    {/* Year Badge */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <span
                        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                          theme === "dark"
                            ? "bg-black/50 text-gray-300"
                            : "bg-white/80 text-gray-700"
                        } backdrop-blur-sm`}
                      >
                        <Calendar size={10} />
                        {project.year}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                        style={{
                          backgroundColor: `${color}30`,
                          color: color,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3
                      className={`text-lg font-semibold mb-2 transition-colors ${
                        theme === "dark"
                          ? "text-white group-hover:text-[#2ea8ff]"
                          : "text-gray-900 group-hover:text-[#2ea8ff]"
                      }`}
                    >
                      {project.name}
                    </h3>

                    <p
                      className={`text-sm mb-4 line-clamp-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className={`text-xs px-2 py-1 rounded transition-colors ${
                            theme === "dark"
                              ? "bg-white/5 text-gray-400 group-hover:bg-white/10"
                              : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className={`flex items-center gap-3 pt-4 border-t ${theme === "dark" ? "border-white/5" : "border-gray-100"}`}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                          theme === "dark"
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Github size={16} />
                        Source
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-[#2ea8ff] hover:text-[#2ea8ff]/80 transition-colors"
                        >
                          <Play size={16} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${color}15 0%, transparent 50%)`,
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Source Contributions */}
      <section id="open-source" className={`py-16 px-6 ${theme === "dark" ? "" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${theme === "dark" ? "bg-[#00f56b]/15" : "bg-[#00f56b]/10"}`}>
                <Github size={20} className="text-[#00f56b]" />
              </div>
              <h2
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Open Source Contributions
              </h2>
            </div>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Contributing to critical infrastructure and developer tools
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mb-8"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? "bg-[#00f56b] text-black shadow-md"
                  : theme === "dark"
                  ? "bg-white/5 text-gray-400 hover:bg-white/10"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
              }`}
            >
              <Filter size={14} />
              All
            </button>
            {categories.map((cat) => {
              const config = categoryConfig[cat] || { color: "#2ea8ff", icon: Code2 };
              const Icon = config.icon;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "text-black shadow-md"
                      : theme === "dark"
                      ? "bg-white/5 text-gray-400 hover:bg-white/10"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === cat ? config.color : undefined,
                  }}
                >
                  <Icon size={14} />
                  {cat}
                </button>
              );
            })}
          </motion.div>

          {/* Contributions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredContributions.map((contribution, index) => {
                const config =
                  categoryConfig[contribution.category] || {
                    color: "#2ea8ff",
                    icon: Code2,
                  };
                const isHovered = hoveredProject === contribution.name;

                return (
                  <motion.div
                    key={contribution.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredProject(contribution.name)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className={`group relative rounded-2xl border overflow-hidden transition-all ${
                      theme === "dark"
                        ? "bg-[#141414] border-white/5 hover:border-white/20"
                        : "bg-white border-gray-200/80 hover:border-gray-300 shadow-md hover:shadow-lg"
                    } ${contribution.highlight ? "ring-1 ring-[#00f56b]/30" : ""}`}
                  >
                    {/* Highlight Badge */}
                    {contribution.highlight && (
                      <div className="absolute top-4 right-4 z-10">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-3 h-3 rounded-full bg-[#00f56b]"
                        />
                      </div>
                    )}

                    {/* Gradient Overlay on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, ${config.color}10 0%, transparent 60%)`,
                      }}
                    />

                    <div className="p-6 relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <span
                          className="px-3 py-1 text-xs font-medium rounded-full"
                          style={{
                            backgroundColor: `${config.color}20`,
                            color: config.color,
                          }}
                        >
                          {contribution.category}
                        </span>
                        <a
                          href={contribution.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-full transition-colors ${
                            theme === "dark"
                              ? "hover:bg-white/10"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github
                            size={18}
                            className={
                              theme === "dark" ? "text-gray-400" : "text-gray-500"
                            }
                          />
                        </a>
                      </div>

                      {/* Organization */}
                      <p className="text-xs text-gray-500 mb-2">
                        {contribution.organization}
                      </p>

                      {/* Title */}
                      <h3
                        className={`text-lg font-semibold mb-2 transition-colors ${
                          theme === "dark"
                            ? "text-white group-hover:text-[#2ea8ff]"
                            : "text-gray-900 group-hover:text-[#2ea8ff]"
                        }`}
                      >
                        {contribution.name}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-sm mb-4 line-clamp-2 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {contribution.description}
                      </p>

                      {/* Role Badge */}
                      <div className="mb-4">
                        <span
                          className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded ${
                            theme === "dark" ? "bg-white/5" : "bg-gray-100"
                          }`}
                        >
                          <GitCommit size={12} style={{ color: config.color }} />
                          {contribution.role}
                        </span>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {contribution.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className={`text-xs px-2 py-1 rounded ${
                              theme === "dark"
                                ? "bg-white/5 text-gray-400"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {contribution.technologies.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{contribution.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* View Link */}
                      <a
                        href={contribution.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-4 flex items-center gap-2 text-sm font-medium transition-colors ${
                          theme === "dark"
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        View Project
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="work-cta" className={`py-24 px-6 ${theme === "dark" ? "" : "bg-gradient-to-b from-gray-50 to-white"}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-12 rounded-3xl border ${
              theme === "dark"
                ? "bg-gradient-to-br from-[#141414] to-[#0d0d0d] border-white/5"
                : "bg-gradient-to-br from-white to-gray-50/50 border-gray-200 shadow-lg"
            }`}
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Let&apos;s Build Together
            </h2>
            <p
              className={`mb-8 max-w-lg mx-auto ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Interested in collaborating on open-source projects or discussing
              protocol development? I&apos;d love to connect.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/gconnect"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00f56b] text-black font-medium rounded-full hover:bg-[#00f56b]/90 transition-all"
              >
                <Github size={18} />
                View GitHub
              </a>
              <Link
                href="/#contact"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  theme === "dark"
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
