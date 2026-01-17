"use client";

import { motion } from "framer-motion";
import { eb1Achievements } from "@/lib/data";
import {
  BookOpen,
  Users,
  Mic,
  Trophy,
  Building,
  Sparkles,
} from "lucide-react";

const achievementCategories = [
  {
    icon: Sparkles,
    title: "Original Contributions",
    subtitle: "Major Significance to the Field",
    color: "#2ea8ff",
    items: eb1Achievements.originalContributions,
  },
  {
    icon: BookOpen,
    title: "Publications",
    subtitle: "Professional Publications",
    color: "#907aea",
    items: eb1Achievements.publications,
  },
  {
    icon: Mic,
    title: "Speaking",
    subtitle: "International Presentations",
    color: "#00f56b",
    items: eb1Achievements.speakingEngagements,
  },
  {
    icon: Trophy,
    title: "Awards",
    subtitle: "Prizes for Excellence",
    color: "#f5bc00",
    items: eb1Achievements.awards,
  },
  {
    icon: Users,
    title: "Associations",
    subtitle: "Professional Memberships",
    color: "#fa3d8c",
    items: eb1Achievements.associations,
  },
  {
    icon: Building,
    title: "Leadership",
    subtitle: "Critical Roles",
    color: "#2ea8ff",
    items: eb1Achievements.leadershipRoles,
  },
];

const impactStats = [
  { value: "50K+", label: "Developers Impacted", color: "#2ea8ff" },
  { value: "$2M+", label: "Trading Volume Enabled", color: "#907aea" },
  { value: "100K+", label: "Transactions Processed", color: "#00f56b" },
  { value: "300%", label: "Engagement Growth", color: "#f5bc00" },
];

export function Achievements() {
  return (
    <section id="achievements" className="py-24 bg-[#141414]">
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
            <span className="w-12 h-px bg-[#00f56b]" />
            <span className="text-[#00f56b] text-sm font-mono tracking-wider">
              ACHIEVEMENTS
            </span>
            <span className="w-12 h-px bg-[#00f56b]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Impact & Recognition
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Demonstrating sustained national and international acclaim through
            original contributions, publications, and leadership in technology.
          </p>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-[#1a1a1a] rounded-xl p-6 text-center border border-white/5 hover:border-white/10 transition-all"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievement Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievementCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#1a1a1a] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <category.icon size={22} style={{ color: category.color }} />
                </motion.div>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {category.title}
                  </h3>
                  <p className="text-gray-500 text-xs">{category.subtitle}</p>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-3">
                {category.items.slice(0, 3).map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="text-sm text-gray-400 flex items-start gap-2 group/item"
                  >
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover/item:scale-150"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="group-hover/item:text-gray-300 transition-colors">
                      {"title" in item
                        ? item.title
                        : "name" in item
                        ? item.name
                        : "event" in item
                        ? item.event
                        : "role" in item
                        ? item.role
                        : ""}
                    </span>
                  </motion.li>
                ))}
                {category.items.length > 3 && (
                  <li className="text-xs text-gray-500 pt-1">
                    +{category.items.length - 3} more achievements
                  </li>
                )}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
