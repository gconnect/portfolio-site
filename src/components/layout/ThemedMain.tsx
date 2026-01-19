"use client";

import { useTheme } from "@/context/ThemeContext";
import { ReactNode } from "react";

export function ThemedMain({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      {children}
    </main>
  );
}
