"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { eb1Achievements } from "@/lib/data";
import {
  MapPin,
  Mic,
  Video,
  Users,
  ExternalLink,
  Award,
  ArrowRight,
  Calendar,
  Globe,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const typeConfig = {
  Speaker: { color: "#2ea8ff", icon: Mic },
  Panelist: { color: "#907aea", icon: Users },
  Contributor: { color: "#00f56b", icon: Video },
  Participant: { color: "#f5bc00", icon: Users },
  Organizer: { color: "#fa3d8c", icon: Award },
  Facilitator: { color: "#00d4ff", icon: Users },
  Coach: { color: "#ff6b6b", icon: Users },
};

export function Speaking() {
  const { theme } = useTheme();

  // Featured events (hand-picked)
  const featuredEventNames = [
    "Ethereum Devcon 7 SEA",
    "Cartesi Podcast",
    "Google Developers Festival (DevFest Uyo)",
    "Google Developer Festival (DevFest Owerri)",
    "Monetizing Tech Skills through Open Source & Freelancing - Women in Defi",
    "Women Techmakers Uyo (IWD)",
  ];

  const featuredEvents = useMemo(() => {
    return featuredEventNames
      .map((name) =>
        eb1Achievements.speakingEngagements.find((e) => e.event === name)
      )
      .filter(Boolean) as typeof eb1Achievements.speakingEngagements;
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const events = eb1Achievements.speakingEngagements;
    const years = [...new Set(events.map((e) => e.year))];
    const countries = [
      ...new Set(
        events.map((e) => {
          const parts = e.location.split(", ");
          return parts[parts.length - 1];
        })
      ),
    ];

    return {
      totalEvents: events.length,
      yearsActive: years.length,
      countries: countries.length,
    };
  }, []);

  return (
    <section
      id="speaking"
      className={`py-24 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-px bg-[#f5bc00]" />
            <span className="text-[#f5bc00] text-sm font-mono tracking-wider">
              SPEAKING
            </span>
            <span className="w-12 h-px bg-[#f5bc00]" />
          </div>
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Conferences & Events
          </h2>
          <p
            className={`max-w-2xl mx-auto text-sm sm:text-base ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Sharing knowledge at international conferences and community events
            across the globe.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-6 mb-12"
        >
          <div className="flex items-center gap-2">
            <Mic size={18} className="text-[#2ea8ff]" />
            <span
              className={`font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {stats.totalEvents}
            </span>
            <span className="text-gray-500 text-sm">Events</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-[#00f56b]" />
            <span
              className={`font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {stats.yearsActive}
            </span>
            <span className="text-gray-500 text-sm">Years</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-[#907aea]" />
            <span
              className={`font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {stats.countries}
            </span>
            <span className="text-gray-500 text-sm">Countries</span>
          </div>
        </motion.div>

        {/* Featured Events Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {featuredEvents.map((event, index) => {
            const config =
              typeConfig[event.type as keyof typeof typeConfig] ||
              typeConfig.Participant;
            const IconComponent = config.icon;
            const hasLink = event.link && event.link.length > 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-xl p-5 border transition-all group relative overflow-hidden ${
                  hasLink ? "cursor-pointer" : ""
                } ${
                  theme === "dark"
                    ? "bg-[#141414] border-white/5 hover:border-white/10"
                    : "bg-gray-50 border-gray-100 hover:border-gray-300 shadow-sm hover:shadow-md"
                }`}
                onClick={() => {
                  if (hasLink) {
                    window.open(event.link, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                {/* Background gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${config.color}08 0%, transparent 50%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <span
                      className="px-2.5 py-1 text-xs font-medium rounded-full flex items-center gap-1.5"
                      style={{
                        backgroundColor: `${config.color}20`,
                        color: config.color,
                      }}
                    >
                      <IconComponent size={12} />
                      {event.type}
                    </span>
                    <span className="text-xs text-gray-500">{event.year}</span>
                  </div>

                  {/* Event Name */}
                  <h3
                    className={`text-base font-semibold mb-1.5 group-hover:text-[#2ea8ff] transition-colors line-clamp-1 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {event.event}
                  </h3>

                  {/* Topic */}
                  <p
                    className={`text-sm mb-3 leading-relaxed line-clamp-2 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {event.topic}
                  </p>

                  {/* Location */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <MapPin size={14} className="text-[#2ea8ff]" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    {hasLink && (
                      <ExternalLink
                        size={14}
                        className="text-gray-500 group-hover:text-[#2ea8ff] transition-colors flex-shrink-0"
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/speaking"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all group ${
              theme === "dark"
                ? "bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
            }`}
          >
            View all {stats.totalEvents} speaking engagements
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        {/* Speaking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div
            className={`rounded-2xl p-8 border ${
              theme === "dark"
                ? "bg-gradient-to-r from-[#2ea8ff]/10 via-[#907aea]/10 to-[#00f56b]/10 border-white/5"
                : "bg-gradient-to-r from-blue-50 via-purple-50 to-green-50 border-gray-200"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-3 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Interested in having me speak?
            </h3>
            <p
              className={`mb-6 max-w-lg mx-auto text-sm sm:text-base ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              I speak about blockchain protocols, Web3 development, Cloud
              infrastructure, AI, and building inclusive tech communities.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2ea8ff] text-black font-medium rounded-full hover:bg-[#2ea8ff]/90 hover:shadow-[0_0_20px_rgba(46,168,255,0.4)] transition-all"
            >
              <Mic size={18} />
              Invite me to speak
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
