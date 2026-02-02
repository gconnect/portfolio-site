"use client";

import { useEffect, useState, use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowLeft, Loader2, Share2, MessageCircle, Clock, User } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { theme } = useTheme();
    const { slug } = use(params);
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await fetch("/api/public/blog");
                const posts = await response.json();
                const found = posts.find((p: any) => p.slug === slug || p.id === slug);
                setPost(found);
            } catch (error) {
                console.error("Failed to fetch blog post:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-[#050505]' : 'bg-white'}`}>
                <Loader2 className="w-10 h-10 animate-spin text-[#2ea8ff]" />
            </div>
        );
    }

    if (!post) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center p-4 text-center ${theme === 'dark' ? 'bg-[#050505]' : 'bg-white'}`}>
                <h1 className={`text-4xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Post Not Found</h1>
                <p className="text-gray-500 mb-8">The article you're looking for doesn't exist or has been removed.</p>
                <Link href="/blog" className="px-8 py-3 bg-[#2ea8ff] text-black font-bold rounded-full">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-[#050505]" : "bg-white"
            }`}>
            <Header />

            <main className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link href="/blog" className="group inline-flex items-center gap-2 text-gray-500 hover:text-[#2ea8ff] font-bold uppercase text-xs tracking-widest transition-colors">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Articles
                    </Link>
                </motion.div>

                {/* Article Header */}
                <header className="mb-12 space-y-8">
                    <div className="flex flex-wrap items-center gap-4">
                        <span className="px-4 py-1.5 bg-blue-600 text-white font-black text-xs uppercase tracking-widest rounded-full">
                            {post.tags?.[0] || 'Article'}
                        </span>
                        <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-wider">
                            <Calendar size={14} className="text-[#2ea8ff]" />
                            {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                    </div>

                    <h1 className={`text-4xl sm:text-6xl font-black leading-tight ${theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                        {post.title}
                    </h1>

                    <p className={`text-xl sm:text-2xl font-medium italic ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                        {post.excerpt}
                    </p>

                    <div className="flex items-center gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                                <User size={20} />
                            </div>
                            <div>
                                <p className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Glory Justin</p>
                                <p className="text-xs text-gray-500 font-bold uppercase">Author</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                {post.featured_image_url && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 relative h-[300px] sm:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src={post.featured_image_url}
                            fill
                            className="object-cover"
                            alt={post.title}
                            priority
                        />
                    </motion.div>
                )}

                {/* Article Content */}
                <article
                    className={`prose prose-lg sm:prose-xl dark:prose-invert max-w-none 
            prose-headings:text-gray-900 dark:prose-headings:text-white 
            prose-headings:font-black prose-p:leading-relaxed prose-p:text-gray-600 
            dark:prose-p:text-gray-300 prose-a:text-[#2ea8ff] prose-img:rounded-3xl 
            prose-code:text-[#2ea8ff] prose-code:bg-gray-100 dark:prose-code:bg-gray-900 
            prose-code:px-1.5 prose-code:rounded-md prose-code:before:content-none 
            prose-code:after:content-none mb-24`}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Article Footer */}
                <footer className="pt-12 border-t border-gray-100 dark:border-gray-800 space-y-8">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="flex gap-2">
                            {post.tags?.map((tag: string) => (
                                <span key={tag} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-black uppercase tracking-widest rounded-xl">#{tag}</span>
                            ))}
                        </div>
                        <div className="flex items-center gap-4">
                            <button className={`p-3 rounded-full border transition-colors ${theme === 'dark' ? 'border-gray-800 hover:bg-gray-800 text-white' : 'border-gray-200 hover:bg-gray-100 text-gray-900'}`}>
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>

                    <div className={`p-8 rounded-3xl text-center space-y-4 ${theme === 'dark' ? 'bg-[#141414]' : 'bg-gray-50'}`}>
                        <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Enjoyed the article?</h3>
                        <p className="text-gray-500">I share more about protocol engineering and AI on my social media.</p>
                        <div className="flex justify-center gap-4 pt-4">
                            <Link href="/#contact" className="px-8 py-3 bg-[#2ea8ff] text-black font-bold rounded-full hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">Let's Connect</Link>
                        </div>
                    </div>
                </footer>
            </main>

            <Footer />
        </div>
    );
}
