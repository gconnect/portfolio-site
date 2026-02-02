"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Save, Loader2, MapPin, Calendar, ExternalLink, Eye, EyeOff, LayoutPanelTop, Mic, Sparkles } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

interface SpeakingEngagement {
    id: string;
    event: string;
    location: string;
    year: number;
    topic: string;
    type: string;
    photos: string[];
    link: string;
    featured?: boolean;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
}

const EVENT_TYPES = ["Speaker", "Panelist", "Organizer", "Keynote Speaker", "Co-Speaker & Organizer", "Facilitator", "Coach", "Participant", "Contributor"];

export default function SpeakingPage() {
    const [engagements, setEngagements] = useState<SpeakingEngagement[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [formData, setFormData] = useState<Partial<SpeakingEngagement>>({
        event: "",
        location: "",
        year: new Date().getFullYear(),
        topic: "",
        type: "Speaker",
        photos: [],
        link: "",
        featured: false,
        status: 'draft',
    });

    useEffect(() => {
        fetchEngagements();
    }, []);

    const fetchEngagements = async () => {
        try {
            const response = await fetch("/api/admin/speaking");
            const data = await response.json();
            setEngagements(data);
        } catch (error) {
            console.error("Failed to fetch engagements:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (status?: 'draft' | 'published') => {
        setSaving(true);

        let newStatus = formData.status || 'draft';
        if (status !== undefined) {
            newStatus = status;
        }

        const dataToSave = { ...formData, status: newStatus };

        try {
            const url = "/api/admin/speaking";
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

            await fetchEngagements();
            resetForm();
        } catch (error) {
            console.error("Failed to save engagement:", error);
            alert("Failed to save speaking engagement");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (engagement: SpeakingEngagement) => {
        setFormData(engagement);
        setEditingId(engagement.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this speaking engagement?")) return;

        try {
            const response = await fetch(`/api/admin/speaking?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete");

            await fetchEngagements();
        } catch (error) {
            console.error("Failed to delete engagement:", error);
            alert("Failed to delete speaking engagement");
        }
    };

    const resetForm = () => {
        setFormData({
            event: "",
            location: "",
            year: new Date().getFullYear(),
            topic: "",
            type: "Speaker",
            photos: [],
            link: "",
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
                        Speaking Engagements
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage your conference talks and speaking events
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        <Plus size={20} />
                        Add Event
                    </button>
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {editingId ? "Edit" : "Add"} Speaking Engagement
                        </h3>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsPreview(!isPreview)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isPreview
                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <LayoutPanelTop size={18} />
                                {isPreview ? "Exit Preview" : "Preview"}
                            </button>
                            <button
                                onClick={resetForm}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {isPreview ? (
                        <div className="space-y-6">
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl border border-gray-200 dark:border-gray-800">
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                {formData.type}
                                            </span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                {formData.year}
                                            </span>
                                        </div>
                                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                                            {formData.event || "Event Name"}
                                        </h1>
                                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {formData.topic || "Talk topic will appear here..."}
                                        </p>
                                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                            <MapPin size={18} />
                                            <span className="font-medium">{formData.location || "Location"}</span>
                                        </div>
                                        {formData.link && (
                                            <a href={formData.link} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium">
                                                View Event <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>
                                    <div className="w-full md:w-80 grid grid-cols-2 gap-2">
                                        {formData.photos?.length ? formData.photos.map((photo, i) => (
                                            <div key={i} className={`relative rounded-xl overflow-hidden ${i === 0 && formData.photos!.length % 2 !== 0 ? 'col-span-2 h-48' : 'h-32'}`}>
                                                <Image src={photo} fill className="object-cover" alt="Event" />
                                            </div>
                                        )) : (
                                            <div className="col-span-2 h-48 bg-gray-200 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                                                No photos uploaded
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-3">
                                <button onClick={() => setIsPreview(false)} className="px-6 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 font-medium">Back to Editor</button>
                                <button onClick={() => handleSubmit('draft')} className="px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Save as Draft</button>
                                <button onClick={() => handleSubmit(editingId ? undefined : 'published')} className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-colors">
                                    {editingId ? "Update" : "Publish Now"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); }} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Event Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.event}
                                        onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="City, Country"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Year
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        min="2000"
                                        max="2100"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Role / Type
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        required
                                    >
                                        {EVENT_TYPES.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Talk Topic / Description
                                </label>
                                <textarea
                                    value={formData.topic}
                                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    required
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Event Link
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="https://..."
                                    />
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="featured" className="text-sm font-bold text-blue-900 dark:text-blue-100 cursor-pointer select-none">
                                        Featured Session (Display on Landing Page)
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Photos
                                </label>
                                <ImageUpload
                                    value={formData.photos || []}
                                    onChange={(urls) => setFormData({ ...formData, photos: urls })}
                                    onRemove={(url) => setFormData({ ...formData, photos: formData.photos?.filter(p => p !== url) })}
                                    category="events"
                                />
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${formData.status === 'published' ? 'bg-green-500' : 'bg-gray-400'}`} />
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Status: {formData.status}
                                    </span>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        disabled={saving}
                                        onClick={() => handleSubmit('draft')}
                                        className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all disabled:opacity-50"
                                    >
                                        Save as Draft
                                    </button>
                                    <button
                                        type="button"
                                        disabled={saving}
                                        onClick={() => handleSubmit(editingId ? undefined : 'published')}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
                                    >
                                        {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                        {editingId ? "Update" : "Publish Now"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            )}

            {/* Engagements List */}
            {engagements.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center shadow-sm">
                    <Calendar size={48} className="mx-auto mb-4 text-gray-400 opacity-20" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        No speaking engagements yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Start by adding your first conference talk or speaking event
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {engagements.map((engagement) => (
                        <div
                            key={engagement.id}
                            className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative h-44 bg-gray-100 dark:bg-gray-900">
                                {engagement.photos?.length ? (
                                    <Image src={engagement.photos[0]} fill className="object-cover" alt={engagement.event} />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-600">
                                        <Mic size={48} />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md ${engagement.status === 'published'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-yellow-500 text-white'
                                        }`}>
                                        {engagement.status}
                                    </span>
                                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white shadow-sm">
                                        {engagement.type}
                                    </span>
                                    {engagement.featured && (
                                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-blue-600 text-white shadow-sm flex items-center gap-1">
                                            <Sparkles size={10} />
                                            Featured
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tight">
                                        {engagement.year}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                        <MapPin size={12} />
                                        {engagement.location}
                                    </div>
                                </div>

                                <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                    {engagement.event}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                                    {engagement.topic}
                                </p>

                                <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <button
                                        onClick={() => handleEdit(engagement)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                                    >
                                        <Edit2 size={12} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(engagement.id)}
                                        className="flex items-center justify-center p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-red-100 dark:border-red-900/30"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
