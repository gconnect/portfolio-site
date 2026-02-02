"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Undo,
    Redo,
    Code,
    Heading1,
    Heading2,
    Link as LinkIcon,
} from "lucide-react";

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        if (url === null) {
            return;
        }

        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-xl">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${editor.isActive("bold") ? "text-blue-600 bg-gray-200 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400"}`}
                type="button"
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${editor.isActive("italic") ? "text-blue-600 bg-gray-200 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400"}`}
                type="button"
            >
                <Italic size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${editor.isActive("heading", { level: 1 }) ? "text-blue-600 bg-gray-200 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400"}`}
                type="button"
            >
                <Heading1 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${editor.isActive("heading", { level: 2 }) ? "text-blue-600 bg-gray-200 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400"}`}
                type="button"
            >
                <Heading2 size={18} />
            </button>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 self-center mx-1" />
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${editor.isActive("bulletList") ? "text-blue-600 bg-gray-200 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400"}`}
                type="button"
            >
                <List size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${editor.isActive("orderedList") ? "text-blue-600 bg-gray-200 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400"}`}
                type="button"
            >
                <ListOrdered size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${editor.isActive("blockquote") ? "text-blue-600 bg-gray-200 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400"}`}
                type="button"
            >
                <Quote size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${editor.isActive("code") ? "text-blue-600 bg-gray-200 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400"}`}
                type="button"
            >
                <Code size={18} />
            </button>
            <button
                onClick={setLink}
                className={`p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors ${editor.isActive("link") ? "text-blue-600 bg-gray-200 dark:bg-gray-800" : "text-gray-600 dark:text-gray-400"}`}
                type="button"
            >
                <LinkIcon size={18} />
            </button>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 self-center mx-1" />
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
                type="button"
            >
                <Undo size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
                type="button"
            >
                <Redo size={18} />
            </button>
        </div>
    );
};

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
            }),
            Image,
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm dark:prose-invert max-w-none focus:outline-none min-h-[300px] p-4",
            },
        },
    });

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
