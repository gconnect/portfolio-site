"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
    category?: string;
}

export default function ImageUpload({
    value,
    onChange,
    onRemove,
    category = "general"
}: ImageUploadProps) {
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setLoading(true);
        const newUrls: string[] = [];

        for (const file of acceptedFiles) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("category", category);

            try {
                const res = await fetch("/api/admin/upload", {
                    method: "POST",
                    body: formData,
                });

                if (res.ok) {
                    const data = await res.json();
                    newUrls.push(data.url);
                }
            } catch (error) {
                console.error("Upload failed:", error);
            }
        }

        onChange([...value, ...newUrls]);
        setLoading(false);
    }, [value, onChange, category]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"]
        },
        maxFiles: 10
    });

    return (
        <div className="space-y-4 w-full">
            <div className="flex flex-wrap gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <div className="z-10 absolute top-2 right-2">
                            <button
                                type="button"
                                onClick={() => onRemove(url)}
                                className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors shadow-sm"
                            >
                                <X size={14} />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Uploaded image"
                            src={url}
                        />
                    </div>
                ))}
            </div>

            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-2
          ${isDragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10" : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"}
        `}
            >
                <input {...getInputProps()} />
                {loading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                ) : (
                    <Upload className="w-8 h-8 text-gray-400" />
                )}
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {isDragActive ? "Drop images here" : "Click or drag images to upload"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        PNG, JPG, WebP up to 10MB
                    </p>
                </div>
            </div>
        </div>
    );
}
