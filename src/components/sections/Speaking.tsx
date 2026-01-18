"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { eb1Achievements } from "@/lib/data";
import {
  MapPin,
  Mic,
  Video,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  ChevronDown,
  ExternalLink,
  Calendar,
  Award,
} from "lucide-react";

const typeConfig = {
  Speaker: { color: "#2ea8ff", icon: Mic },
  Panelist: { color: "#907aea", icon: Users },
  Contributor: { color: "#00f56b", icon: Video },
  Participant: { color: "#f5bc00", icon: Users },
  Organizer: { color: "#fa3d8c", icon: Award },
  Facilitator: { color: "#00d4ff", icon: Users },
  Coach: { color: "#ff6b6b", icon: Users },
};

type SpeakingEvent = {
  event: string;
  location: string;
  year: number;
  topic: string;
  type: string;
  photos?: string[];
  link?: string;
};

export function Speaking() {
  const [selectedEvent, setSelectedEvent] = useState<SpeakingEvent | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [expandedYears, setExpandedYears] = useState<number[]>([]);

  // Group events by year, sorted descending
  const eventsByYear = useMemo(() => {
    const grouped = eb1Achievements.speakingEngagements.reduce((acc, event) => {
      const year = event.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(event);
      return acc;
    }, {} as Record<number, typeof eb1Achievements.speakingEngagements>);

    // Sort years descending
    const sortedYears = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => b - a);

    return sortedYears.map((year) => ({
      year,
      events: grouped[year],
    }));
  }, []);

  const toggleYear = (year: number) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const openGallery = (event: SpeakingEvent) => {
    if (event.photos && event.photos.length > 0) {
      setSelectedEvent(event);
      setCurrentPhotoIndex(0);
    }
  };

  const closeGallery = () => {
    setSelectedEvent(null);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (selectedEvent?.photos) {
      setCurrentPhotoIndex((prev) =>
        prev === selectedEvent.photos!.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = () => {
    if (selectedEvent?.photos) {
      setCurrentPhotoIndex((prev) =>
        prev === 0 ? selectedEvent.photos!.length - 1 : prev - 1
      );
    }
  };

  return (
    <section id="speaking" className="py-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-12 h-px bg-[#f5bc00]" />
            <span className="text-[#f5bc00] text-sm font-mono tracking-wider">
              SPEAKING
            </span>
            <span className="w-12 h-px bg-[#f5bc00]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Conferences & Events
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Sharing knowledge at international conferences and community events
            across the globe. Click on a year to view events.
          </p>
        </motion.div>

        {/* Year Accordion */}
        <div className="space-y-4">
          {eventsByYear.map(({ year, events }, yearIndex) => {
            const isExpanded = expandedYears.includes(year);

            return (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: yearIndex * 0.05 }}
                className="border border-white/10 rounded-xl overflow-hidden bg-[#141414]"
              >
                {/* Year Header - Clickable */}
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full flex items-center justify-between p-5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-3xl font-bold text-white">
                      {year}
                    </span>
                    <span className="text-sm text-gray-500 font-mono">
                      {events.length} event{events.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={24} className="text-gray-400" />
                  </motion.div>
                </button>

                {/* Events Content - Expandable */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 pt-0 grid md:grid-cols-2 gap-4">
                        {events.map((event, index) => {
                          const config =
                            typeConfig[event.type as keyof typeof typeConfig] ||
                            typeConfig.Participant;
                          const IconComponent = config.icon;
                          const hasPhotos = event.photos && event.photos.length > 0;
                          const hasLink = event.link && event.link.length > 0;

                          const handleCardClick = () => {
                            if (hasLink) {
                              window.open(event.link, "_blank", "noopener,noreferrer");
                            }
                          };

                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className={`bg-[#1a1a1a] rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden ${
                                hasLink ? "cursor-pointer" : ""
                              }`}
                              onClick={handleCardClick}
                            >
                              {/* Background gradient on hover */}
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
                                  {hasLink && (
                                    <ExternalLink size={16} className="text-gray-500 group-hover:text-[#2ea8ff] transition-colors" />
                                  )}
                                </div>

                                {/* Event Name */}
                                <h3 className="text-lg font-semibold text-white mb-1.5 group-hover:text-[#2ea8ff] transition-colors">
                                  {event.event}
                                </h3>

                                {/* Topic */}
                                <p className="text-gray-400 text-sm mb-3 leading-relaxed line-clamp-2">
                                  {event.topic}
                                </p>

                                {/* Location */}
                                <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
                                  <MapPin size={14} className="text-[#2ea8ff]" />
                                  {event.location}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-2">
                                  {hasPhotos && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openGallery(event);
                                      }}
                                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
                                    >
                                      <ImageIcon size={14} />
                                      View Photos ({event.photos?.length})
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Decorative corner */}
                              <div
                                className="absolute top-0 right-0 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity"
                                style={{
                                  background: `radial-gradient(circle at top right, ${config.color}, transparent 70%)`,
                                }}
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Speaking CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-[#2ea8ff]/10 via-[#907aea]/10 to-[#00f56b]/10 rounded-2xl p-8 border border-white/5">
            <h3 className="text-xl font-semibold text-white mb-3">
              Interested in having me speak?
            </h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              I speak about blockchain protocols, Web3 development, backend
              architecture, and building inclusive tech communities.
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

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {selectedEvent && selectedEvent.photos && selectedEvent.photos.length > 0 && (
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
                  <h3 className="text-white font-semibold">{selectedEvent.event}</h3>
                  <div className="flex items-center gap-3 text-gray-400 text-sm mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {selectedEvent.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {selectedEvent.year}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {selectedEvent.link && (
                    <a
                      href={selectedEvent.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2 text-sm text-gray-400 hover:text-[#2ea8ff]"
                    >
                      <ExternalLink size={16} />
                      <span className="hidden sm:inline">View Event</span>
                    </a>
                  )}
                  <button
                    onClick={closeGallery}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <X size={20} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Image Container */}
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <Image
                  src={selectedEvent.photos[currentPhotoIndex]}
                  alt={`${selectedEvent.event} photo ${currentPhotoIndex + 1}`}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/images/placeholder-event.jpg";
                  }}
                />

                {/* Navigation arrows */}
                {selectedEvent.photos.length > 1 && (
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
                {currentPhotoIndex + 1} / {selectedEvent.photos.length}
              </div>

              {/* Thumbnail strip */}
              {selectedEvent.photos.length > 1 && (
                <div className="p-4 pt-0 flex justify-center gap-2 overflow-x-auto">
                  {selectedEvent.photos.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIndex(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                        idx === currentPhotoIndex
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
