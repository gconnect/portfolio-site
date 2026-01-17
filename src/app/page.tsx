import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Achievements } from "@/components/sections/Achievements";
import { Speaking } from "@/components/sections/Speaking";
import { Writing } from "@/components/sections/Writing";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Header />
      <Hero />
      <About />
      <Experience />
      <Achievements />
      <Speaking />
      <Writing />
      <Contact />
      <Footer />
    </main>
  );
}
