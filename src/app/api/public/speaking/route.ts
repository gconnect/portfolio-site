import { NextResponse } from "next/server";
import { readJSONFile } from "@/lib/storage";

export async function GET() {
    try {
        const data = await readJSONFile<{ engagements: any[] }>("speaking-engagements.json");
        // Only return published engagements
        const published = (data.engagements || []).filter(e => e.status === 'published');
        return NextResponse.json(published);
    } catch (error) {
        return NextResponse.json([]);
    }
}
