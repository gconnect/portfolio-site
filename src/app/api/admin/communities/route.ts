import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readJSONFile, writeJSONFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

interface Community {
    id: string;
    name: string;
    role: string;
    description: string;
    url: string;
    logo: string;
    color: string;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
}

export async function GET() {
    try {
        const data = await readJSONFile<{ communities: Community[] }>("communities.json");
        return NextResponse.json(data.communities || []);
    } catch (error) {
        return NextResponse.json([]);
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const newItem: Community = {
            id: uuidv4(),
            ...body,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        const data = await readJSONFile<{ communities: Community[] }>("communities.json");
        data.communities.push(newItem);
        await writeJSONFile("communities.json", data);

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { id, ...updates } = body;
        const data = await readJSONFile<{ communities: Community[] }>("communities.json");
        const index = data.communities.findIndex(i => i.id === id);
        if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

        data.communities[index] = { ...data.communities[index], ...updates, updated_at: new Date().toISOString() };
        await writeJSONFile("communities.json", data);
        return NextResponse.json(data.communities[index]);
    } catch (error) {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const data = await readJSONFile<{ communities: Community[] }>("communities.json");
        data.communities = data.communities.filter(i => i.id !== id);
        await writeJSONFile("communities.json", data);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
