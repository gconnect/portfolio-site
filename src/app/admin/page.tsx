"use client";

import { useEffect, useState } from "react";
import { Mic, FileText, FolderGit2, Award, TrendingUp, Heart } from "lucide-react";
import Link from "next/link";

interface Stats {
    speakingEngagements: number;
    blogPosts: number;
    projects: number;
    awards: number;
    communities: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        speakingEngagements: 0,
        blogPosts: 0,
        projects: 0,
        awards: 0,
        communities: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [speakingRes, blogRes, projectsRes, awardsRes, commsRes] = await Promise.all([
                    fetch("/api/admin/speaking"),
                    fetch("/api/admin/blog"),
                    fetch("/api/admin/projects"),
                    fetch("/api/admin/awards"),
                    fetch("/api/admin/communities"),
                ]);

                const [speaking, blog, projects, awards, communities] = await Promise.all([
                    speakingRes.json(),
                    blogRes.json(),
                    projectsRes.json(),
                    awardsRes.json(),
                    commsRes.json(),
                ]);

                setStats({
                    speakingEngagements: Array.isArray(speaking) ? speaking.length : (speaking.engagements?.length || 0),
                    blogPosts: Array.isArray(blog) ? blog.length : (blog.posts?.length || 0),
                    projects: Array.isArray(projects) ? projects.length : (projects.projects?.length || 0),
                    awards: Array.isArray(awards) ? awards.length : (awards.awards?.length || 0),
                    communities: Array.isArray(communities) ? communities.length : (communities.communities?.length || 0),
                });
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        {
            name: "Speaking",
            value: stats.speakingEngagements,
            icon: Mic,
            color: "blue",
            href: "/admin/speaking",
        },
        {
            name: "Communities",
            value: stats.communities || 0, // Need to update Stats interface too
            icon: Heart,
            color: "pink",
            href: "/admin/communities",
        },
        {
            name: "Projects",
            value: stats.projects,
            icon: FolderGit2,
            color: "green",
            href: "/admin/projects",
        },
        {
            name: "Awards",
            value: stats.awards,
            icon: Award,
            color: "yellow",
            href: "/admin/awards",
        },
    ];

    const colorClasses = {
        blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
        pink: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
        green:
            "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
        yellow:
            "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome back! 👋
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Manage your portfolio content from this dashboard
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]
                                    }`}
                            >
                                <stat.icon size={24} />
                            </div>
                            <TrendingUp size={16} className="text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                            {loading ? "..." : stat.value}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {stat.name}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                        href="/admin/speaking"
                        className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-center"
                    >
                        <Mic size={24} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Add Speaking
                        </p>
                    </Link>
                    <Link
                        href="/admin/communities"
                        className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors text-center"
                    >
                        <Heart size={24} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            New Community
                        </p>
                    </Link>
                    <Link
                        href="/admin/blog"
                        className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-colors text-center"
                    >
                        <FileText size={24} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Write Blog Post
                        </p>
                    </Link>
                    <Link
                        href="/admin/projects"
                        className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors text-center"
                    >
                        <FolderGit2 size={24} className="mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Add Project
                        </p>
                    </Link>
                </div>
            </div>

            {/* Getting Started Guide */}
            <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    🚀 Getting Started
                </h3>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>
                            Update your personal information and bio in{" "}
                            <Link
                                href="/admin/personal-info"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            >
                                Personal Info
                            </Link>
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>
                            Add your speaking engagements and conference talks in{" "}
                            <Link
                                href="/admin/speaking"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            >
                                Speaking
                            </Link>
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>
                            Share your thoughts and insights by creating blog posts in{" "}
                            <Link
                                href="/admin/blog"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            >
                                Blog Posts
                            </Link>
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        <span>
                            All changes are automatically saved to JSON files and version
                            controlled with Git
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
