"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function BackToTop() {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300 group ${
            theme === "dark"
              ? "bg-[#1a1a1a] border border-white/10 hover:border-[#2ea8ff]/50 hover:bg-[#1a1a1a]/90"
              : "bg-white border border-gray-200 hover:border-[#2ea8ff]/50 hover:shadow-xl"
          }`}
          aria-label="Back to top"
        >
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp
              size={20}
              className={`transition-colors ${
                theme === "dark"
                  ? "text-gray-400 group-hover:text-[#2ea8ff]"
                  : "text-gray-600 group-hover:text-[#2ea8ff]"
              }`}
            />
          </motion.div>

          {/* Glow effect on hover */}
          <div
            className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-md ${
              theme === "dark" ? "bg-[#2ea8ff]/20" : "bg-[#2ea8ff]/10"
            }`}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
