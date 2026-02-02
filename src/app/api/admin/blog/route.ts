import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readJSONFile, writeJSONFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

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

export async function GET() {
    try {
        const data = await readJSONFile<{ posts: BlogPost[] }>("blog-posts.json");
        return NextResponse.json(data.posts || []);
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const newPost: BlogPost = {
            id: uuidv4(),
            ...body,
            slug: body.slug || body.title.toLowerCase().replace(/\s+/g, "-"),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        let data;
        try {
            data = await readJSONFile<{ posts: BlogPost[] }>("blog-posts.json");
        } catch {
            data = { posts: [] };
        }

        data.posts.push(newPost);
        await writeJSONFile("blog-posts.json", data);

        return NextResponse.json(newPost, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create blog post" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { id, ...updates } = body;

        const data = await readJSONFile<{ posts: BlogPost[] }>("blog-posts.json");
        const index = data.posts.findIndex((p) => p.id === id);

        if (index === -1) {
            return NextResponse.json(
                { error: "Blog post not found" },
                { status: 404 }
            );
        }

        data.posts[index] = {
            ...data.posts[index],
            ...updates,
            updated_at: new Date().toISOString(),
        };

        await writeJSONFile("blog-posts.json", data);
        return NextResponse.json(data.posts[index]);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update blog post" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        const data = await readJSONFile<{ posts: BlogPost[] }>("blog-posts.json");
        data.posts = data.posts.filter((p) => p.id !== id);
        await writeJSONFile("blog-posts.json", data);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete blog post" },
            { status: 500 }
        );
    }
}
