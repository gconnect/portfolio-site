import { NextResponse } from "next/server";
import { readJSONFile } from "@/lib/storage";

export async function GET() {
    try {
        const data = await readJSONFile<{ posts: any[] }>("blog-posts.json");
        // Only return published posts
        const published = (data.posts || []).filter(p => p.published);
        return NextResponse.json(published);
    } catch (error) {
        return NextResponse.json([]);
    }
}
