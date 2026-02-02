"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Save, Loader2, FolderGit2, Eye, EyeOff, LayoutPanelTop, ExternalLink, Github, Monitor, Calendar, Tag, ChevronLeft } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

interface Project {
    id: string;
    name: string;
    description: string;
    role?: string;
    url?: string;
    github?: string;
    demo?: string;
    image_url?: string;
    technologies: string[];
    category: string;
    project_type: 'founder' | 'experimental' | 'open_source';
    year?: string;
    status: 'draft' | 'published';
    project_status?: string;
    highlight: boolean;
    created_at: string;
    updated_at: string;
}

const PROJECT_TYPES = [
    { value: 'founder', label: 'Founder' },
    { value: 'experimental', label: 'Experimental' },
    { value: 'open_source', label: 'Open Source' }
];

const CATEGORIES = ["Blockchain", "Backend", "Fullstack", "AI", "Mobile", "DevTool", "Security", "Other"];

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const [formData, setFormData] = useState<Partial<Project>>({
        name: "",
        description: "",
        role: "",
        url: "",
        github: "",
        demo: "",
        image_url: "",
        technologies: [],
        category: "Blockchain",
        project_type: "experimental",
        year: new Date().getFullYear().toString(),
        status: 'draft',
        project_status: "Building",
        highlight: false,
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch("/api/admin/projects");
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (status: 'draft' | 'published') => {
        setSaving(true);
        const dataToSave = { ...formData, status };

        try {
            const url = "/api/admin/projects";
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

            await fetchProjects();
            resetForm();
        } catch (error) {
            console.error("Failed to save project:", error);
            alert("Failed to save project");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (project: Project) => {
        setFormData(project);
        setEditingId(project.id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const response = await fetch(`/api/admin/projects?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete");

            await fetchProjects();
        } catch (error) {
            console.error("Failed to delete project:", error);
            alert("Failed to delete project");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            role: "",
            url: "",
            github: "",
            demo: "",
            image_url: "",
            technologies: [],
            category: "Blockchain",
            project_type: "experimental",
            year: new Date().getFullYear().toString(),
            status: 'draft',
            project_status: "Building",
            highlight: false,
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
                        Projects
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Showcase your startup ventures and experimental builds
                    </p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                        <Plus size={20} />
                        Add Project
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
                                {editingId ? "Edit" : "Add"} Project
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
                            <div className="relative h-[480px] w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800">
                                {formData.image_url ? (
                                    <Image src={formData.image_url} fill className="object-cover" alt="Project" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-gray-700">
                                        <FolderGit2 size={80} />
                                    </div>
                                )}
                                <div className="absolute top-6 left-6 flex gap-3">
                                    <span className="px-4 py-1.5 bg-black/50 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest rounded-full border border-white/20">
                                        {formData.project_type}
                                    </span>
                                    <span className="px-4 py-1.5 bg-blue-600/90 backdrop-blur-md text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/20">
                                        {formData.category}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-tighter">{formData.year}</span>
                                            <div className="w-1 h-4 bg-gray-200 dark:bg-gray-800" />
                                            <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">{formData.project_status}</span>
                                        </div>
                                        <h1 className="text-5xl font-black text-gray-900 dark:text-white leading-tight">
                                            {formData.name || "Untitled Project"}
                                        </h1>
                                    </div>
                                    <div className="flex gap-4">
                                        {formData.url && <a href={formData.url} target="_blank" className="p-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full hover:scale-110 transition-transform"><ExternalLink size={24} /></a>}
                                        {formData.github && <a href={formData.github} target="_blank" className="p-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full hover:scale-110 transition-transform"><Github size={24} /></a>}
                                    </div>
                                </div>

                                <p className="text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed max-w-3xl">
                                    {formData.description || "Project description will appear here..."}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-4">
                                    {formData.technologies?.map(tech => (
                                        <span key={tech} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-bold border border-gray-200 dark:border-gray-700">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); }} className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Project Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-bold"
                                            placeholder="e.g. Movve.xyz"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Type</label>
                                            <select
                                                value={formData.project_type}
                                                onChange={(e) => setFormData({ ...formData, project_type: e.target.value as any })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                            >
                                                {PROJECT_TYPES.map(type => <option key={type.value} value={type.value}>{type.label}</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Category</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                            >
                                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Year</label>
                                            <input
                                                type="text"
                                                value={formData.year}
                                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                                placeholder="2025"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Current Status</label>
                                            <input
                                                type="text"
                                                value={formData.project_status}
                                                onChange={(e) => setFormData({ ...formData, project_status: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                                placeholder="Building / Active"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Technologies (comma separated)</label>
                                        <input
                                            type="text"
                                            value={formData.technologies?.join(", ")}
                                            onChange={(e) => setFormData({ ...formData, technologies: e.target.value.split(",").map(s => s.trim()).filter(s => s !== "") })}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
                                            placeholder="Solidity, React, Node.js"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Main Image</label>
                                        <ImageUpload
                                            value={formData.image_url ? [formData.image_url] : []}
                                            onChange={(urls) => setFormData({ ...formData, image_url: urls[0] })}
                                            onRemove={() => setFormData({ ...formData, image_url: "" })}
                                            category="projects"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Project Website</label>
                                            <input
                                                type="url"
                                                value={formData.url}
                                                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                                                placeholder="https://example.com"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">GitHub URL</label>
                                            <input
                                                type="url"
                                                value={formData.github}
                                                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm"
                                                placeholder="https://github.com/..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 px-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                                    placeholder="Describe the project goals and your role..."
                                    required
                                />
                            </div>

                            <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.highlight}
                                        onChange={(e) => setFormData({ ...formData, highlight: e.target.checked })}
                                        className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700"
                                    />
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Highlight this project on home page</span>
                                </label>
                            </div>
                        </form>
                    )}
                </div>
            )}

            {/* Projects List */}
            {!showForm && (
                <>
                    {projects.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center shadow-sm">
                            <FolderGit2 size={48} className="mx-auto mb-4 text-gray-400 opacity-20" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                No projects added yet
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Build your portfolio by adding your key projects
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all"
                            >
                                <Plus size={20} />
                                Add First Project
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 border-b-4 border-b-gray-200 dark:border-b-gray-900 hover:border-b-blue-500"
                                >
                                    <div className="relative h-48 bg-gray-100 dark:bg-gray-900">
                                        {project.image_url ? (
                                            <Image src={project.image_url} fill className="object-cover" alt={project.name} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                <FolderGit2 size={40} />
                                            </div>
                                        )}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md ${project.status === 'published' ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                                                }`}>
                                                {project.status}
                                            </span>
                                            <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md bg-black text-white">
                                                {project.project_type}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-tighter">{project.year}</span>
                                            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded uppercase">{project.category}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-6 line-clamp-2 min-h-[32px]">
                                            {project.description}
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleEdit(project)}
                                                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
                                            >
                                                <Edit2 size={12} /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.id)}
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
