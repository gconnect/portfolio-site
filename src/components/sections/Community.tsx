"use client";

import { motion } from "framer-motion";
import { communities } from "@/lib/data";
import { Users, ExternalLink, Crown, Heart } from "lucide-react";

export function Community() {
  return (
    <section id="community" className="py-24 bg-[#0a0a0a]">
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
            <span className="w-12 h-px bg-[#fa3d8c]" />
            <span className="text-[#fa3d8c] text-sm font-mono tracking-wider">
              COMMUNITY
            </span>
            <span className="w-12 h-px bg-[#fa3d8c]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Communities I Lead
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Building and nurturing tech communities across Africa. Passionate about
            empowering developers and creating inclusive spaces for growth.
          </p>
        </motion.div>

        {/* Communities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {communities.map((community, index) => {
            const isFounder = community.role === "Founder";
            const RoleIcon = isFounder ? Crown : Users;

            return (
              <motion.a
                key={index}
                href={community.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-[#141414] rounded-xl p-6 border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden block"
              >
                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${community.color}10 0%, transparent 50%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Header with Role Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {/* Community Logo Placeholder */}
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${community.color}20` }}
                      >
                        <Heart
                          size={24}
                          style={{ color: community.color }}
                          className="opacity-80"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-[#2ea8ff] transition-colors">
                          {community.name}
                        </h3>
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full mt-1"
                          style={{
                            backgroundColor: `${community.color}20`,
                            color: community.color,
                          }}
                        >
                          <RoleIcon size={12} />
                          {community.role}
                        </span>
                      </div>
                    </div>
                    <ExternalLink
                      size={18}
                      className="text-gray-500 group-hover:text-[#2ea8ff] transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {community.description}
                  </p>
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at top right, ${community.color}, transparent 70%)`,
                  }}
                />

                {/* Founder badge accent */}
                {isFounder && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-50"
                    style={{
                      background: `linear-gradient(90deg, ${community.color}, transparent)`,
                    }}
                  />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* Community Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-[#fa3d8c]/10 via-[#907aea]/10 to-[#2ea8ff]/10 rounded-2xl p-8 border border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  4+
                </div>
                <div className="text-gray-400 text-sm">Communities</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#00f56b] mb-1">
                  1
                </div>
                <div className="text-gray-400 text-sm">Founded</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#2ea8ff] mb-1">
                  5+
                </div>
                <div className="text-gray-400 text-sm">Years Leading</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-[#fa3d8c] mb-1">
                  1000+
                </div>
                <div className="text-gray-400 text-sm">Developers Reached</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
