import { NextResponse } from "next/server";
import { readJSONFile } from "@/lib/storage";

export async function GET() {
    try {
        const data = await readJSONFile<{ communities: any[] }>("communities.json");
        return NextResponse.json(data.communities || []);
    } catch (error) {
        return NextResponse.json([]);
    }
}
