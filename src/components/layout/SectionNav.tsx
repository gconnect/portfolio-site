"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const sections = [
  { id: "hero", label: "Home", color: "#2ea8ff" },
  { id: "about", label: "About", color: "#907aea" },
  { id: "achievements", label: "Achievements", color: "#00f56b" },
  { id: "speaking", label: "Speaking", color: "#f5bc00" },
  { id: "community", label: "Community", color: "#fa3d8c" },
  { id: "writing", label: "Writing", color: "#00d4ff" },
  { id: "contact", label: "Contact", color: "#ff6b6b" },
];

export function SectionNav() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setIsVisible(window.scrollY > 300);

      // Find current section
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
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
      const offset = sectionId === "hero" ? 0 : 80;
      const targetPosition = section.offsetTop - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const activeColor = sections[activeIndex]?.color || "#2ea8ff";

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
          {/* Animated background track */}
          <div
            className={`absolute right-[11px] top-0 bottom-0 w-[2px] rounded-full ${
              theme === "dark" ? "bg-white/5" : "bg-gray-200"
            }`}
          />

          {/* Active section indicator line */}
          <motion.div
            className="absolute right-[11px] w-[2px] rounded-full"
            style={{ backgroundColor: activeColor }}
            initial={false}
            animate={{
              top: `${activeIndex * 40 + 8}px`,
              height: "24px",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />

          {/* Glow effect */}
          <motion.div
            className="absolute right-[7px] w-[10px] rounded-full blur-sm"
            style={{ backgroundColor: activeColor }}
            initial={false}
            animate={{
              top: `${activeIndex * 40 + 8}px`,
              height: "24px",
              opacity: 0.5,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          />

          {sections.map((section, index) => {
            const isActive = activeSection === section.id;
            const isHovered = hoveredSection === section.id;

            return (
              <div key={section.id} className="relative h-10 flex items-center">
                {/* Label tooltip */}
                <AnimatePresence>
                  {(isHovered || isActive) && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-8 px-3 py-1.5 rounded-lg whitespace-nowrap text-sm font-medium ${
                        theme === "dark"
                          ? "bg-[#1a1a1a] border border-white/10"
                          : "bg-white border border-gray-200 shadow-lg"
                      }`}
                      style={{
                        color: isActive ? section.color : undefined,
                      }}
                    >
                      {section.label}
                      {/* Arrow */}
                      <div
                        className={`absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ${
                          theme === "dark"
                            ? "border-l-[6px] border-l-[#1a1a1a]"
                            : "border-l-[6px] border-l-white"
                        }`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dot button */}
                <motion.button
                  onClick={() => scrollToSection(section.id)}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className="relative w-6 h-6 flex items-center justify-center group"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={`Navigate to ${section.label}`}
                >
                  {/* Outer ring on hover/active */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={false}
                    animate={{
                      scale: isActive ? 1 : 0,
                      opacity: isActive ? 0.2 : 0,
                    }}
                    style={{ backgroundColor: section.color }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Inner dot */}
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: isActive
                        ? section.color
                        : theme === "dark"
                        ? "rgba(255,255,255,0.3)"
                        : "rgba(0,0,0,0.2)",
                    }}
                    animate={{
                      scale: isActive ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Pulse effect for active */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: section.color }}
                      initial={{ scale: 0.5, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </motion.button>
              </div>
            );
          })}

          {/* Progress percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`mt-4 text-xs font-mono ${
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            }`}
          >
            <ScrollProgress />
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <span>{Math.round(progress)}%</span>;
}
