import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gloryjustin.dev"),
  title: "Glory Justin | Protocol Software Engineer & AI Researcher",
  description:
    "Protocol Engineer, contributor at Ethereum Protocol, Backend Developer, AI Researcher and Technical Writer. Building the future of decentralized systems with expertise in blockchain, Web3, and cloud technologies.",
  keywords: [
    "Glory Justin",
    "Agatevure",
    "Protocol Engineer",
    "Ethereum",
    "Backend Developer",
    "Java",
    "Rust",
    "Web3",
    "Blockchain",
    "Technical Writer",
    "NestJS",
    "GraphQL",
  ],
  authors: [{ name: "Glory Justin", url: "https://gloryjustin.dev" }],
  creator: "Glory Justin",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gloryjustin.dev",
    title: "Glory Justin | Protocol Engineer & Backend Developer",
    description:
      "Protocol Engineer at Ethereum Foundation, Backend Developer, and Technical Writer. Building the future of decentralized systems.",
    siteName: "Glory Justin Portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Glory Justin - Protocol Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glory Justin | Protocol Engineer & Backend Developer",
    description:
      "Protocol Engineer at Ethereum Foundation, Backend Developer, and Technical Writer.",
    creator: "@agatevureglory",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased transition-colors duration-300`}
        style={{
          backgroundColor: "var(--color-bg-primary)",
          color: "var(--color-text-primary)",
        }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* Noise overlay for texture */}
        <div className="noise-overlay" />
      </body>
    </html>
  );
}
