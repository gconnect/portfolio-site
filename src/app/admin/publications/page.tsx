"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Save, Loader2, BookOpen, Eye, EyeOff, LayoutPanelTop, ExternalLink, Calendar, ChevronLeft, Link as LinkIcon, User } from "lucide-react";

interface Publication {
    id: string;
    title: string;
    type: string;
    publication?: string;
    description?: string;
    date?: string;
    co_authors: string[];
    url?: string;
    tutorials: Array<{ title: string; url: string }>;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
}

const PUB_TYPES = ["Article", "Paper", "Tutorial", "Guide", "Documentation", "Case Study"];

export default function PublicationsPage() {
    const [publications, setPublications] = useState<Publication[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [formData, setFormData] = useState<Partial<Publication>>({
        title: "",
        type: "Article",
        publication: "",
        description: "",
        date: new Date().toISOString().split('T')[0],
        co_authors: [],
        url: "",
        tutorials: [],
        status: 'draft',
    });

    useEffect(() => {
        fetchPublications();
    }, []);

    const fetchPublications = async () => {
        try {
            const response = await fetch("/api/admin/publications");
            const data = await response.json();
            setPublications(data);
        } catch (error) {
            console.error("Failed to fetch publications:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (status: 'draft' | 'published') => {
        setSaving(true);
        const dataToSave = { ...formData, status };

        try {
            const url = "/api/admin/publications";
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

            await fetchPublications();
            resetForm();
        } catch (error) {
            console.error("Failed to save publication:", error);
            alert("Failed to save publication");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (publication: Publication) => {
        setFormData(publication);
        setEditingId(publication.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this publication?")) return;

        try {
            const response = await fetch(`/api/admin/publications?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete");

            await fetchPublications();
        } catch (error) {
            console.error("Failed to delete publication:", error);
            alert("Failed to delete publication");
        }
    };

    const updateCoAuthors = (value: string) => {
        setFormData({ ...formData, co_authors: value.split(",").map(s => s.trim()).filter(s => s !== "") });
    };

    const addTutorial = () => {
        setFormData({ ...formData, tutorials: [...(formData.tutorials || []), { title: "", url: "" }] });
    };

    const updateTutorial = (index: number, field: 'title' | 'url', value: string) => {
        const newTutorials = [...(formData.tutorials || [])];
        newTutorials[index] = { ...newTutorials[index], [field]: value };
        setFormData({ ...formData, tutorials: newTutorials });
    };

    const removeTutorial = (index: number) => {
        const newTutorials = formData.tutorials?.filter((_, i) => i !== index);
        setFormData({ ...formData, tutorials: newTutorials });
    };

    const resetForm = () => {
        setFormData({
            title: "",
            type: "Article",
            publication: "",
            description: "",
            date: new Date().toISOString().split('T')[0],
            co_authors: [],
            url: "",
            tutorials: [],
            status: 'draft',
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
                        Publications
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage your technical articles, tutorials, and research papers
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        <Plus size={20} />
                        Add Publication
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
                                {editingId ? "Edit" : "Add"} Publication
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
                                    onClick={() => handleSubmit('draft')}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                >
                                    Save Draft
                                </button>
                                <button
                                    disabled={saving}
                                    onClick={() => handleSubmit('published')}
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
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1 text-xs font-black rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 uppercase tracking-widest">{formData.type}</span>
                                    <span className="text-sm text-gray-500 font-bold">{formData.date}</span>
                                </div>
                                <h1 className="text-4xl font-black text-gray-900 dark:text-white leading-tight">
                                    {formData.title || "Publication Title"}
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                    {formData.description || "Description will appear here..."}
                                </p>
                                <div className="flex items-center gap-3 py-4 border-y border-gray-100 dark:border-gray-800">
                                    <User size={18} className="text-gray-400" />
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                        Co-authored with: {formData.co_authors?.length ? formData.co_authors.join(", ") : "None"}
                                    </span>
                                </div>
                                {formData.url && (
                                    <a href={formData.url} target="_blank" className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-blue-500/20 hover:scale-105 transition-transform">
                                        Read Publication <ExternalLink size={20} />
                                    </a>
                                )}
                            </div>

                            {formData.tutorials?.length! > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter flex items-center gap-2">
                                        <LinkIcon size={18} /> Related Tutorials
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {formData.tutorials?.map((tut, i) => (
                                            <a key={i} href={tut.url} target="_blank" className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-500 transition-colors flex items-center justify-between group">
                                                <span className="font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600">{tut.title || "Tutorial Title"}</span>
                                                <ExternalLink size={14} className="text-gray-400" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); }} className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-bold"
                                            placeholder="e.g. Deep Dive into Ethereum Node Operations"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Type</label>
                                            <select
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                            >
                                                {PUB_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Date</label>
                                            <input
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Publication / Forum</label>
                                        <input
                                            type="text"
                                            value={formData.publication}
                                            onChange={(e) => setFormData({ ...formData, publication: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                            placeholder="e.g. Medium / GitHub / Academic Journal"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Main URL</label>
                                        <input
                                            type="url"
                                            value={formData.url}
                                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Co-authors (comma separated)</label>
                                        <input
                                            type="text"
                                            value={formData.co_authors?.join(", ")}
                                            onChange={(e) => updateCoAuthors(e.target.value)}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                            placeholder="Name 1, Name 2"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Related Tutorials</label>
                                            <button onClick={addTutorial} type="button" className="text-blue-600 hover:text-blue-700 transition-colors">
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {formData.tutorials?.map((tut, index) => (
                                                <div key={index} className="flex gap-2 items-start relative p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                                                    <div className="flex-1 space-y-2">
                                                        <input
                                                            type="text"
                                                            value={tut.title}
                                                            onChange={(e) => updateTutorial(index, 'title', e.target.value)}
                                                            className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs"
                                                            placeholder="Title"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={tut.url}
                                                            onChange={(e) => updateTutorial(index, 'url', e.target.value)}
                                                            className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs"
                                                            placeholder="URL"
                                                        />
                                                    </div>
                                                    <button onClick={() => removeTutorial(index)} type="button" className="text-red-500 p-1">
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Description / Abstract</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                                    placeholder="Short summary of what this publication covers..."
                                    required
                                />
                            </div>
                        </form>
                    )}
                </div>
            )}

            {/* Publications List */}
            {!showForm && (
                <>
                    {publications.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center shadow-sm">
                            <BookOpen size={48} className="mx-auto mb-4 text-gray-400 opacity-20" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                No publications added yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Keep track of your articles, research, and tutorials
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all"
                            >
                                <Plus size={20} />
                                Add First Publication
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {publications.map((pub) => (
                                <div
                                    key={pub.id}
                                    className="group bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{pub.type}</span>
                                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md ${pub.status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                                                }`}>
                                                {pub.status}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 min-h-[56px]">
                                            {pub.title}
                                        </h3>

                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Published on: {pub.date}</p>

                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                                            {pub.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 pt-6">
                                        <button
                                            onClick={() => handleEdit(pub)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
                                        >
                                            <Edit2 size={12} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(pub.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-red-100 dark:border-red-900/30"
                                        >
                                            <Trash2 size={16} />
                                        </button>
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
