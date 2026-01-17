"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "@/lib/data";
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  Youtube,
  MapPin,
  Send,
  MessageSquare,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const socialIcons = [
  { icon: Linkedin, url: socialLinks.linkedin, label: "LinkedIn", color: "#0077b5" },
  { icon: Github, url: socialLinks.github, label: "GitHub", color: "#333" },
  { icon: Twitter, url: socialLinks.twitter, label: "Twitter", color: "#1da1f2" },
  { icon: Youtube, url: socialLinks.youtube, label: "YouTube", color: "#ff0000" },
];

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );

      // Reset status after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2ea8ff]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#907aea]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-px bg-[#2ea8ff]" />
            <span className="text-[#2ea8ff] text-sm font-mono tracking-wider">
              CONTACT
            </span>
            <span className="w-12 h-px bg-[#2ea8ff]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Open to discussing protocol engineering, Web3 development, speaking
            opportunities, or collaboration on interesting projects.
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#141414] rounded-2xl p-8 md:p-12 border border-white/5"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Contact Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#2ea8ff]/15 flex items-center justify-center">
                  <MessageSquare size={22} className="text-[#2ea8ff]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Get in Touch
                  </h3>
                  <p className="text-gray-500 text-sm">
                    I&apos;d love to hear from you
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Email */}
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl hover:bg-[#1a1a1a]/80 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#2ea8ff]/15 flex items-center justify-center group-hover:bg-[#2ea8ff]/25 transition-colors">
                    <Mail size={18} className="text-[#2ea8ff]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Email</p>
                    <p className="text-white group-hover:text-[#2ea8ff] transition-colors">
                      {personalInfo.email}
                    </p>
                  </div>
                </motion.a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 bg-[#1a1a1a] rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#907aea]/15 flex items-center justify-center">
                    <MapPin size={18} className="text-[#907aea]" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Location</p>
                    <p className="text-white">{personalInfo.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <p className="text-gray-500 text-sm mb-4">Connect on social</p>
                <div className="flex gap-3">
                  {socialIcons.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white transition-all border border-white/5 hover:border-white/10"
                      style={{ "--hover-color": social.color } as React.CSSProperties}
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#00f56b]/15 flex items-center justify-center">
                  <Send size={22} className="text-[#00f56b]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Send a Message
                  </h3>
                  <p className="text-gray-500 text-sm">
                    I&apos;ll get back to you soon
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2ea8ff]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      required
                      className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2ea8ff]/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2ea8ff]/50 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-[#1a1a1a] border border-white/5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2ea8ff]/50 transition-colors resize-none"
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-[#00f56b]/10 border border-[#00f56b]/30 rounded-lg text-[#00f56b] text-sm"
                  >
                    <CheckCircle size={18} />
                    Message sent successfully! I&apos;ll get back to you soon.
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                  >
                    <AlertCircle size={18} />
                    {errorMessage || "Failed to send message. Please try again."}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                  className={`w-full py-3 font-medium rounded-xl transition-all flex items-center justify-center gap-2 ${
                    status === "loading"
                      ? "bg-[#2ea8ff]/50 text-black/50 cursor-not-allowed"
                      : "bg-[#2ea8ff] text-black hover:bg-[#2ea8ff]/90 hover:shadow-[0_0_20px_rgba(46,168,255,0.4)]"
                  }`}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Currently open to{" "}
          <span className="text-[#2ea8ff]">speaking engagements</span>,{" "}
          <span className="text-[#907aea]">collaborations</span>, and{" "}
          <span className="text-[#00f56b]">consulting opportunities</span>.
        </motion.p>
      </div>
    </section>
  );
}
