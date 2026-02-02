"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Save, Loader2, Heart, ExternalLink, ChevronLeft } from "lucide-react";

interface Community {
    id: string;
    name: string;
    role: string;
    description: string;
    url: string;
    logo: string;
    color: string;
    status: 'draft' | 'published';
}

export default function CommunitiesAdmin() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Partial<Community>>({
        name: "",
        role: "",
        description: "",
        url: "",
        logo: "",
        color: "#2ea8ff",
        status: 'published',
    });

    useEffect(() => {
        fetchCommunities();
    }, []);

    const fetchCommunities = async () => {
        try {
            const response = await fetch("/api/admin/communities");
            if (!response.ok) {
                // If API doesn't exist yet, we'll get an error.
                // Assuming I should have created it.
            }
            const data = await response.json();
            setCommunities(data);
        } catch (error) {
            console.error("Failed to fetch communities:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setSaving(true);
        try {
            const method = editingId ? "PUT" : "POST";
            const body = editingId ? { id: editingId, ...formData } : formData;
            const response = await fetch("/api/admin/communities", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!response.ok) throw new Error("Failed to save");
            await fetchCommunities();
            resetForm();
        } catch (error) {
            console.error("Error saving community:", error);
            alert("Failed to save");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (comm: Community) => {
        setFormData(comm);
        setEditingId(comm.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await fetch(`/api/admin/communities?id=${id}`, { method: "DELETE" });
            await fetchCommunities();
        } catch (error) {
            console.error("Failed to delete:", error);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", role: "", description: "", url: "", logo: "", color: "#2ea8ff", status: 'published' });
        setEditingId(null);
        setShowForm(false);
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Communities</h1>
                {!showForm && (
                    <button onClick={() => setShowForm(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Plus size={20} /> Add Community
                    </button>
                )}
            </div>

            {showForm && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        <button onClick={resetForm}><ChevronLeft /></button>
                        <h2 className="text-xl font-bold">{editingId ? "Edit" : "Add"} Community</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Community Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="p-2 border rounded dark:bg-gray-900"
                        />
                        <input
                            type="text"
                            placeholder="Role (e.g. Founder)"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="p-2 border rounded dark:bg-gray-900"
                        />
                        <input
                            type="url"
                            placeholder="URL"
                            value={formData.url}
                            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                            className="p-2 border rounded dark:bg-gray-900 md:col-span-2"
                        />
                        <textarea
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="p-2 border rounded dark:bg-gray-900 md:col-span-2"
                            rows={3}
                        />
                        <div className="flex items-center gap-2">
                            <label>Brand Color</label>
                            <input
                                type="color"
                                value={formData.color}
                                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                className="h-10 w-20"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <button onClick={handleSubmit} disabled={saving} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                            {saving ? "Saving..." : "Save Community"}
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {communities.map((comm) => (
                    <div key={comm.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${comm.color}20` }}>
                                <Heart style={{ color: comm.color }} />
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(comm)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"><Edit2 size={16} /></button>
                                <button onClick={() => handleDelete(comm.id)} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-1">{comm.name}</h3>
                        <p className="text-sm text-blue-500 mb-2">{comm.role}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{comm.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
