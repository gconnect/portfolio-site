"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { eb1Achievements } from "@/lib/data";
import {
  BookOpen,
  Users,
  Mic,
  Trophy,
  Building,
  Sparkles,
  ImageIcon,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Define a union type for all possible item shapes
type AchievementItem = {
  title?: string;
  name?: string;
  event?: string;
  role?: string;
  url?: string;
  link?: string;
  organization?: string;
  photos?: string[];
  [key: string]: any;
};

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
    subtitle: "Conference Presentations",
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
  const { theme } = useTheme();
  const [selectedItem, setSelectedItem] = useState<AchievementItem | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});

  // Helper to extract common props from diverse item types
  const getItemProps = (item: AchievementItem) => {
    const label = item.title || item.name || item.event || item.role || "";
    // Check various link properties; for organization, strictly check if it looks like a URL
    const href =
      item.url ||
      item.link ||
      (item.organization?.startsWith("http") ? item.organization : undefined);
    const photos = item.photos || [];
    return { label, href, photos };
  };

  const openGallery = (item: AchievementItem) => {
    if (item.photos && item.photos.length > 0) {
      setSelectedItem(item);
      setCurrentPhotoIndex(0);
    }
  };

  const closeGallery = () => {
    setSelectedItem(null);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (selectedItem?.photos) {
      setCurrentPhotoIndex((prev) =>
        prev === selectedItem.photos!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = () => {
    if (selectedItem?.photos) {
      setCurrentPhotoIndex((prev) =>
        prev === 0 ? selectedItem.photos!.length - 1 : prev - 1
      );
    }
  };

  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <section
      id="achievements"
      className={`py-24 transition-colors duration-300 ${theme === "dark" ? "bg-[#141414]" : "bg-gray-50"
        }`}
    >
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
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
              }`}
          >
            Impact & Recognition
          </h2>
          <p
            className={`max-w-2xl mx-auto ${theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
          >
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
              className={`rounded-xl p-6 text-center border transition-all ${theme === "dark"
                ? "bg-[#1a1a1a] border-white/5 hover:border-white/10"
                : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
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
              <div
                className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                {stat.label}
              </div>
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
              className={`rounded-2xl p-6 border transition-all group ${theme === "dark"
                ? "bg-[#1a1a1a] border-white/5 hover:border-white/10"
                : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
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
                  <h3
                    className={`font-semibold text-lg ${theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {category.title}
                  </h3>
                  <p className="text-gray-500 text-xs">{category.subtitle}</p>
                </div>
              </div>

              {/* Items */}
              <ul className="space-y-3">
                {category.items
                  .slice(
                    0,
                    expandedCategories[category.title] ? undefined : 3
                  )
                  .map((item, i) => {
                    const { label, href, photos } = getItemProps(item);
                    return (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + i * 0.05 }}
                        className={`text-sm flex items-start gap-2 group/item ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all group-hover/item:scale-150"
                          style={{ backgroundColor: category.color }}
                        />

                        <div className="flex-1 min-w-0">
                          {href ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-1 transition-colors hover:underline decoration-1 underline-offset-4 ${theme === "dark"
                                ? "group-hover/item:text-gray-300 hover:text-[#2ea8ff]"
                                : "group-hover/item:text-gray-900 hover:text-[#2ea8ff]"
                                }`}
                            >
                              <span className="truncate">{label}</span>
                              <ExternalLink
                                size={10}
                                className="flex-shrink-0 opacity-50"
                              />
                            </a>
                          ) : (
                            <span
                              className={`transition-colors ${theme === "dark"
                                ? "group-hover/item:text-gray-300"
                                : "group-hover/item:text-gray-900"
                                }`}
                            >
                              {label}
                            </span>
                          )}
                        </div>

                        {/* Photo Button */}
                        {photos.length > 0 && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              openGallery(item);
                            }}
                            className={`p-1 rounded-full transition-colors flex-shrink-0 ${theme === "dark"
                              ? "bg-white/5 hover:bg-white/20 text-gray-400 hover:text-white"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-black"
                              }`}
                            title="View photos"
                          >
                            <ImageIcon size={12} />
                          </button>
                        )}
                      </motion.li>
                    );
                  })}
                {category.items.length > 3 && (
                  <li className="pt-1">
                    <button
                      onClick={() => toggleCategory(category.title)}
                      className={`text-xs flex items-center gap-1 transition-colors ${theme === "dark"
                        ? "text-gray-500 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                      {expandedCategories[category.title] ? (
                        <>
                          Show less <ChevronUp size={12} />
                        </>
                      ) : (
                        <>
                          +{category.items.length - 3} more achievements{" "}
                          <ChevronDown size={12} />
                        </>
                      )}
                    </button>
                  </li>
                )}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {selectedItem && selectedItem.photos && selectedItem.photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeGallery}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-[#141414] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-semibold flex items-center gap-2">
                    {getItemProps(selectedItem).label}
                  </h3>
                </div>
                <button
                  onClick={closeGallery}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Image Container */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <Image
                  src={selectedItem.photos[currentPhotoIndex]}
                  alt={`Photo ${currentPhotoIndex + 1}`}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-event.jpg";
                  }}
                />

                {/* Navigation arrows */}
                {selectedItem.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft size={24} className="text-white" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight size={24} className="text-white" />
                    </button>
                  </>
                )}
              </div>

              {/* Photo counter */}
              <div className="p-4 text-center text-gray-400 text-sm">
                {currentPhotoIndex + 1} / {selectedItem.photos.length}
              </div>

              {/* Thumbnail strip */}
              {selectedItem.photos.length > 1 && (
                <div className="p-4 pt-0 flex justify-center gap-2 overflow-x-auto">
                  {selectedItem.photos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${idx === currentPhotoIndex
                        ? "border-[#2ea8ff]"
                        : "border-transparent opacity-50 hover:opacity-100"
                        }`}
                    >
                      <Image
                        src={photo}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
