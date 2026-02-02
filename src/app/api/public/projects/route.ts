import { NextResponse } from "next/server";
import { readJSONFile } from "@/lib/storage";

export async function GET() {
    try {
        const data = await readJSONFile<{ projects: any[] }>("projects.json");
        // Only return published projects
        const published = (data.projects || []).filter(p => p.status === 'published');
        return NextResponse.json(published);
    } catch (error) {
        return NextResponse.json([]);
    }
}
