"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemedMain } from "@/components/layout/ThemedMain";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Achievements } from "@/components/sections/Achievements";
import { Community } from "@/components/sections/Community";
import { Speaking } from "@/components/sections/Speaking";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <ThemedMain>
      <Header />
      <Hero />
      <About />
      <Achievements />
      <Community />
      <Speaking />
      <Writing />
      <Contact />
      <Footer />
    </ThemedMain>
  );
}
