"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { eb1Achievements } from "@/lib/data";
import { Zap } from "lucide-react";
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
  Scale,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

// Define a union type for all possible item shapes
type EvidenceItem = { photo: string; link: string };

type AchievementItem = {
  title?: string;
  name?: string;
  event?: string;
  role?: string;
  url?: string;
  link?: string;
  organization?: string;
  photos?: string[];
  evidence?: string | EvidenceItem[];
  [key: string]: unknown;
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
    icon: Zap,
    title: "Hackathon Wins",
    subtitle: "Competition Victories",
    color: "#ff6b35",
    items: eb1Achievements.hackathonWins,
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
  {
    icon: Scale,
    title: "Judging & Review",
    subtitle: "Expert Evaluation",
    color: "#14b8a6",
    items: eb1Achievements.judgingExperience,
  },
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

    // Handle photos from different sources: photos array or evidence array
    let photos: string[] = [];
    let photoLinks: string[] = [];

    if (item.photos && item.photos.length > 0) {
      photos = item.photos;
      photoLinks = item.photos.map(() => ""); // No individual links for regular photos
    } else if (Array.isArray(item.evidence)) {
      const evidenceItems = item.evidence as EvidenceItem[];
      photos = evidenceItems.map(e => e.photo);
      photoLinks = evidenceItems.map(e => e.link || "");
    }

    // Check various link properties; for organization, strictly check if it looks like a URL
    // Also use the first evidence link if no top-level link exists
    const firstEvidenceLink = photoLinks.find(link => link && link.length > 0);
    const href =
      item.url ||
      item.link ||
      (typeof item.organization === 'string' && item.organization?.startsWith("http") ? item.organization : undefined) ||
      firstEvidenceLink;

    return { label, href, photos, photoLinks };
  };

  const openGallery = (item: AchievementItem) => {
    const { photos } = getItemProps(item);
    if (photos.length > 0) {
      setSelectedItem(item);
      setCurrentPhotoIndex(0);
    }
  };

  const closeGallery = () => {
    setSelectedItem(null);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (selectedItem) {
      const { photos } = getItemProps(selectedItem);
      if (photos.length > 0) {
        setCurrentPhotoIndex((prev) =>
          prev === photos.length - 1 ? 0 : prev + 1
        );
      }
    }
  };

  const prevPhoto = () => {
    if (selectedItem) {
      const { photos } = getItemProps(selectedItem);
      if (photos.length > 0) {
        setCurrentPhotoIndex((prev) =>
          prev === 0 ? photos.length - 1 : prev - 1
        );
      }
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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
            className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"
              }`}
          >
            Impact & Recognition
          </h2>
          <p
            className={`max-w-2xl mx-auto text-sm sm:text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
          >
            Demonstrating sustained national and international acclaim through
            original contributions, publications, and leadership in technology.
          </p>
        </motion.div>

        {/* Achievement Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {achievementCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`rounded-2xl p-4 sm:p-6 border transition-all group overflow-hidden ${theme === "dark"
                ? "bg-[#1a1a1a] border-white/5 hover:border-white/10"
                : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                }`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all flex-shrink-0"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <category.icon size={20} className="sm:hidden" style={{ color: category.color }} />
                  <category.icon size={22} className="hidden sm:block" style={{ color: category.color }} />
                </motion.div>
                <div className="min-w-0">
                  <h3
                    className={`font-semibold text-base sm:text-lg truncate ${theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {category.title}
                  </h3>
                  <p className="text-gray-500 text-xs truncate">{category.subtitle}</p>
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

                        <div className="flex-1 min-w-0 overflow-hidden">
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
                              <span className="break-words line-clamp-2">{label}</span>
                              <ExternalLink
                                size={10}
                                className="flex-shrink-0 opacity-50"
                              />
                            </a>
                          ) : (
                            <span
                              className={`break-words line-clamp-2 transition-colors ${theme === "dark"
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
        {selectedItem && (() => {
          const { label, photos, photoLinks } = getItemProps(selectedItem);
          const currentLink = photoLinks[currentPhotoIndex];
          return photos.length > 0 && (
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
                      {label}
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
                    src={photos[currentPhotoIndex]}
                    alt={`Photo ${currentPhotoIndex + 1}`}
                    fill
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder-event.jpg";
                    }}
                  />

                  {/* Navigation arrows */}
                  {photos.length > 1 && (
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

                {/* Photo counter and link */}
                <div className="p-4 text-center">
                  <span className="text-gray-400 text-sm">
                    {currentPhotoIndex + 1} / {photos.length}
                  </span>
                  {currentLink && (
                    <a
                      href={currentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 inline-flex items-center gap-1 text-[#2ea8ff] text-sm hover:underline"
                    >
                      View Source <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                {/* Thumbnail strip */}
                {photos.length > 1 && (
                  <div className="p-4 pt-0 flex justify-center gap-2 overflow-x-auto">
                    {photos.map((photo, idx) => (
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
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
