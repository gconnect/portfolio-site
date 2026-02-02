"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Save, Loader2, Award as AwardIcon, Eye, EyeOff, LayoutPanelTop, ExternalLink, Calendar, ChevronLeft, Link as LinkIcon, Camera } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

interface Award {
    id: string;
    title: string;
    year: string;
    significance: string;
    evidence: Array<{ photo?: string; link?: string }>;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
}

export default function AwardsPage() {
    const [awards, setAwards] = useState<Award[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [formData, setFormData] = useState<Partial<Award>>({
        title: "",
        year: new Date().getFullYear().toString(),
        significance: "",
        evidence: [{ photo: "", link: "" }],
        status: 'draft',
    });

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            const response = await fetch("/api/admin/awards");
            const data = await response.json();
            setAwards(data);
        } catch (error) {
            console.error("Failed to fetch awards:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (status: 'draft' | 'published') => {
        setSaving(true);
        const dataToSave = { ...formData, status };

        try {
            const url = "/api/admin/awards";
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

            await fetchAwards();
            resetForm();
        } catch (error) {
            console.error("Failed to save award:", error);
            alert("Failed to save award");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (award: Award) => {
        setFormData(award);
        setEditingId(award.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this award?")) return;

        try {
            const response = await fetch(`/api/admin/awards?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete");

            await fetchAwards();
        } catch (error) {
            console.error("Failed to delete award:", error);
            alert("Failed to delete award");
        }
    };

    const addEvidence = () => {
        setFormData({
            ...formData,
            evidence: [...(formData.evidence || []), { photo: "", link: "" }]
        });
    };

    const updateEvidence = (index: number, field: 'photo' | 'link', value: string) => {
        const newEvidence = [...(formData.evidence || [])];
        newEvidence[index] = { ...newEvidence[index], [field]: value };
        setFormData({ ...formData, evidence: newEvidence });
    };

    const removeEvidence = (index: number) => {
        const newEvidence = formData.evidence?.filter((_, i) => i !== index);
        setFormData({ ...formData, evidence: newEvidence });
    };

    const resetForm = () => {
        setFormData({
            title: "",
            year: new Date().getFullYear().toString(),
            significance: "",
            evidence: [{ photo: "", link: "" }],
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
                        Awards & Recognition
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Manage your achievements, scholarships, and honors
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        <Plus size={20} />
                        Add Award
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
                                {editingId ? "Edit" : "Add"} Award
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
                        <div className="p-8 max-w-4xl mx-auto space-y-10">
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-10 rounded-3xl border border-gray-200 dark:border-gray-800 text-center space-y-6">
                                <div className="mx-auto w-20 h-20 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20 rotate-3">
                                    <AwardIcon size={40} />
                                </div>
                                <div className="space-y-4">
                                    <span className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{formData.year}</span>
                                    <h1 className="text-4xl font-black text-gray-900 dark:text-white leading-tight">
                                        {formData.title || "Award Title"}
                                    </h1>
                                    <p className="text-xl text-gray-600 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
                                        {formData.significance || "State the significance of this award..."}
                                    </p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-4 pt-6">
                                    {formData.evidence?.map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            {item.photo && (
                                                <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-800 -rotate-2">
                                                    <Image src={item.photo} fill className="object-cover" alt="Evidence" />
                                                </div>
                                            )}
                                            {item.link && (
                                                <a href={item.link} target="_blank" className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-bold border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform">
                                                    View Certificate <ExternalLink size={18} />
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); }} className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Award Title</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-bold"
                                            placeholder="e.g. Ethereum Foundation Scholarship"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Year</label>
                                        <input
                                            type="text"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                            placeholder="2024"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Significance / Description</label>
                                        <textarea
                                            value={formData.significance}
                                            onChange={(e) => setFormData({ ...formData, significance: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                                            placeholder="Describe why this award is important..."
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Evidence (Photos/Links)</label>
                                        <button onClick={addEvidence} type="button" className="text-blue-600 hover:text-blue-700 transition-colors">
                                            <Plus size={18} />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {formData.evidence?.map((item, index) => (
                                            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 space-y-3 relative">
                                                {formData.evidence!.length > 1 && (
                                                    <button onClick={() => removeEvidence(index)} className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-sm transition-colors">
                                                        <X size={12} />
                                                    </button>
                                                )}
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase px-1">
                                                        <Camera size={12} /> Photo URL
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={item.photo}
                                                        onChange={(e) => updateEvidence(index, 'photo', e.target.value)}
                                                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs"
                                                        placeholder="Paste image URL..."
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase px-1">
                                                        <LinkIcon size={12} /> Proof Link
                                                    </div>
                                                    <input
                                                        type="text"
                                                        value={item.link}
                                                        onChange={(e) => updateEvidence(index, 'link', e.target.value)}
                                                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-xs"
                                                        placeholder="https://certificate.com/..."
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            )}

            {/* Awards List */}
            {!showForm && (
                <>
                    {awards.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center shadow-sm">
                            <AwardIcon size={48} className="mx-auto mb-4 text-gray-400 opacity-20" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                No awards added yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Add your achievements and honors here
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all"
                            >
                                <Plus size={20} />
                                Add First Award
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {awards.map((award) => (
                                <div
                                    key={award.id}
                                    className="group bg-white dark:bg-gray-800 p-6 rounded-3xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-bl-full -z-0 group-hover:bg-blue-600/10 transition-colors" />

                                    <div className="relative z-10 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{award.year}</span>
                                            <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-md ${award.status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                                                }`}>
                                                {award.status}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">
                                            {award.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                                            {award.significance}
                                        </p>

                                        <div className="flex items-center gap-2 pt-4">
                                            <button
                                                onClick={() => handleEdit(award)}
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
                                            >
                                                <Edit2 size={12} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(award.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors border border-red-100 dark:border-red-900/30"
                                            >
                                                <Trash2 size={16} />
                                            </button>
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
