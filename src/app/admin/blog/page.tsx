"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Save, Loader2, FileText, Eye, EyeOff, LayoutPanelTop, Calendar, Tag, ChevronLeft } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import RichTextEditor from "@/components/admin/RichTextEditor";
import Image from "next/image";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featured_image_url?: string;
    tags: string[];
    published: boolean;
    published_at?: string;
    created_at: string;
    updated_at: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [formData, setFormData] = useState<Partial<BlogPost>>({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        featured_image_url: "",
        tags: [],
        published: false,
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch("/api/admin/blog");
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Failed to fetch blog posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (publish?: boolean) => {
        setSaving(true);

        let newStatus = formData.published;
        if (publish !== undefined) {
            newStatus = publish;
        }

        const dataToSave = {
            ...formData,
            published: newStatus,
            published_at: newStatus ? (formData.published_at || new Date().toISOString()) : formData.published_at
        };

        try {
            const url = "/api/admin/blog";
            const method = editingId ? "PUT" : "POST";
            const body = editingId
                ? { id: editingId, ...dataToSave }
                : dataToSave;

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) throw new Error("Failed to save");

            await fetchPosts();
            resetForm();
        } catch (error) {
            console.error("Failed to save blog post:", error);
            alert("Failed to save blog post");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (post: BlogPost) => {
        setFormData(post);
        setEditingId(post.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog post?")) return;

        try {
            const response = await fetch(`/api/admin/blog?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete");

            await fetchPosts();
        } catch (error) {
            console.error("Failed to delete post:", error);
            alert("Failed to delete blog post");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            slug: "",
            content: "",
            excerpt: "",
            featured_image_url: "",
            tags: [],
            published: false,
        });
        setEditingId(null);
        setShowForm(false);
        setIsPreview(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Blog Posts
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Write insights, tutorials, and protocol updates
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        <Plus size={20} />
                        Write Post
                    </button>
                )}
            </div>

            {/* Form Interface */}
            {showForm && (
                <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-4">
                            <button onClick={resetForm} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                                <ChevronLeft size={20} />
                            </button>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {editingId ? "Edit" : "Write"} Post
                            </h3>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsPreview(!isPreview)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isPreview
                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <Eye size={18} />
                                {isPreview ? "Edit Mode" : "Preview"}
                            </button>
                            <div className="flex gap-2">
                                <button
                                    disabled={saving}
                                    onClick={() => handleSubmit(false)}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                >
                                    Save Draft
                                </button>
                                <button
                                    disabled={saving}
                                    onClick={() => handleSubmit(editingId ? undefined : true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
                                >
                                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                                    {editingId ? "Update" : "Publish"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {isPreview ? (
                        <div className="p-8 max-w-4xl mx-auto space-y-8">
                            {formData.featured_image_url && (
                                <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
                                    <Image src={formData.featured_image_url} fill className="object-cover" alt="Featured" />
                                </div>
                            )}
                            <div className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags?.map(tag => (
                                        <span key={tag} className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">#{tag}</span>
                                    ))}
                                </div>
                                <h1 className="text-5xl font-black text-gray-900 dark:text-white leading-tight">
                                    {formData.title || "Untitled Post"}
                                </h1>
                                <p className="text-xl text-gray-500 dark:text-gray-400 font-medium italic">
                                    {formData.excerpt || "No excerpt provided..."}
                                </p>
                            </div>
                            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-a:text-blue-600 dark:prose-a:text-blue-400"
                                dangerouslySetInnerHTML={{ __html: formData.content || "<i>No content yet...</i>" }}
                            />
                        </div>
                    ) : (
                        <div className="p-6 space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Title</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full text-3xl font-black px-4 py-3 border-none bg-transparent dark:text-white focus:ring-0 placeholder:text-gray-300 dark:placeholder:text-gray-700"
                                        placeholder="Enter post title..."
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Slug (URL path)</label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                            placeholder="my-great-post"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
                                        <input
                                            type="text"
                                            value={formData.tags?.join(", ")}
                                            onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(s => s.trim()).filter(s => s !== "") })}
                                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                            placeholder="Ethereum, AI, Technical"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Excerpt / Summary</label>
                                    <textarea
                                        value={formData.excerpt}
                                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                        rows={2}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                                        placeholder="Briefly describe what this post is about..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Featured Image</label>
                                    <ImageUpload
                                        value={formData.featured_image_url ? [formData.featured_image_url] : []}
                                        onChange={(urls) => setFormData({ ...formData, featured_image_url: urls[0] })}
                                        onRemove={() => setFormData({ ...formData, featured_image_url: "" })}
                                        category="blog"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Content</label>
                                    <RichTextEditor
                                        content={formData.content || ""}
                                        onChange={(content) => setFormData({ ...formData, content })}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Posts List */}
            {!showForm && (
                <>
                    {posts.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center shadow-sm">
                            <FileText size={48} className="mx-auto mb-4 text-gray-400 opacity-20" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                No blog posts written yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Start sharing your insights with the world
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all"
                            >
                                <Plus size={20} />
                                Create First Post
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {posts.map((post) => (
                                <div key={post.id} className="group flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                                    <div className="relative w-full md:w-64 h-40 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
                                        {post.featured_image_url ? (
                                            <Image src={post.featured_image_url} fill className="object-cover" alt={post.title} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <FileText size={40} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-2">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md ${post.published ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                    }`}>
                                                    {post.published ? 'Published' : 'Draft'}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 font-medium">
                                                    <Calendar size={12} />
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex gap-1.5">
                                                {post.tags?.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-[10px] font-bold text-gray-500 bg-gray-100 dark:bg-gray-900 px-2.5 py-1 rounded-md">#{tag}</span>
                                                ))}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
