"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { eb1Achievements } from "@/lib/data";
import { MapPin, Calendar, Mic, Video, Users, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

const typeConfig = {
  Speaker: { color: "#2ea8ff", icon: Mic },
  Panelist: { color: "#907aea", icon: Users },
  Contributor: { color: "#00f56b", icon: Video },
  Participant: { color: "#f5bc00", icon: Users },
};

type SpeakingEvent = {
  event: string;
  location: string;
  year: number;
  topic: string;
  type: string;
  photos?: string[];
};

export function Speaking() {
  const [selectedEvent, setSelectedEvent] = useState<SpeakingEvent | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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
            across the globe. Click on any event to view photos.
          </p>
        </motion.div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {eb1Achievements.speakingEngagements.map((event, index) => {
            const config =
              typeConfig[event.type as keyof typeof typeConfig] ||
              typeConfig.Participant;
            const IconComponent = config.icon;
            const hasPhotos = event.photos && event.photos.length > 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => openGallery(event)}
                className={`bg-[#141414] rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden ${
                  hasPhotos ? "cursor-pointer" : ""
                }`}
              >
                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${config.color}05 0%, transparent 50%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5"
                        style={{
                          backgroundColor: `${config.color}20`,
                          color: config.color,
                        }}
                      >
                        <IconComponent size={12} />
                        {event.type}
                      </span>
                      {hasPhotos && (
                        <span className="px-2 py-1 text-xs rounded-full bg-white/5 text-gray-400 flex items-center gap-1">
                          <ImageIcon size={12} />
                          {event.photos?.length}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-500 text-sm flex items-center gap-1.5">
                      <Calendar size={14} />
                      {event.year}
                    </span>
                  </div>

                  {/* Event Name */}
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#2ea8ff] transition-colors">
                    {event.event}
                  </h3>

                  {/* Topic */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {event.topic}
                  </p>

                  {/* Location */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                      <MapPin size={14} className="text-[#2ea8ff]" />
                      {event.location}
                    </div>
                    {hasPhotos && (
                      <span className="text-xs text-gray-500 group-hover:text-[#2ea8ff] transition-colors">
                        Click to view photos →
                      </span>
                    )}
                  </div>
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at top right, ${config.color}, transparent 70%)`,
                  }}
                />
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
        {selectedEvent && selectedEvent.photos && (
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
                <div>
                  <h3 className="text-white font-semibold">{selectedEvent.event}</h3>
                  <p className="text-gray-400 text-sm">{selectedEvent.location} • {selectedEvent.year}</p>
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
