"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, ArrowRight, Loader2, FileText } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function BlogListingPage() {
    const { theme } = useTheme();
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch("/api/public/blog");
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error("Failed to fetch blog posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-[#050505]" : "bg-white"
            }`}>
            <Header />

            <main className="pt-32 pb-24 max-w-6xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className={`text-4xl sm:text-6xl font-black mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                        Blog & Insights
                    </h1>
                    <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        Deep dives into protocol engineering, AI research, and technical guides.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-[#2ea8ff]" />
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
                        <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className={`text-xl font-medium ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                            No articles published yet. Stay tuned!
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 ${theme === "dark"
                                    ? "bg-[#141414] border-white/5 hover:border-white/10 hover:shadow-2xl hover:shadow-blue-500/5"
                                    : "bg-gray-50 border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100"
                                    }`}
                            >
                                <Link href={`/blog/${post.slug || post.id}`} className="block">
                                    <div className="relative h-56 w-full overflow-hidden">
                                        {post.featured_image_url ? (
                                            <Image
                                                src={post.featured_image_url}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                alt={post.title}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                                                <FileText size={40} className="text-blue-500/40" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col h-full">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-xs font-black text-[#2ea8ff] uppercase tracking-widest">
                                                {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>

                                        <h3 className={`text-xl font-bold mb-3 line-clamp-2 leading-tight group-hover:text-[#2ea8ff] transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"
                                            }`}>
                                            {post.title}
                                        </h3>

                                        <p className={`text-sm mb-6 line-clamp-3 leading-relaxed flex-grow ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                            }`}>
                                            {post.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex gap-2">
                                                {post.tags?.slice(0, 2).map((tag: string) => (
                                                    <span key={tag} className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                            <span className="text-[#2ea8ff] flex items-center gap-1 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                                Read More <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
