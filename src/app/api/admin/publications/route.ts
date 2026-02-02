import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readJSONFile, writeJSONFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

interface Publication {
    id: string;
    title: string;
    type: string;
    publication?: string;
    description?: string;
    date?: string;
    co_authors: string[];
    url?: string;
    tutorials: Array<{ title: string; url: string }>;
    created_at: string;
    updated_at: string;
}

export async function GET() {
    try {
        const data = await readJSONFile<{ publications: Publication[] }>("publications.json");
        return NextResponse.json(data.publications || []);
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
        const newPublication: Publication = {
            id: uuidv4(),
            ...body,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        let data;
        try {
            data = await readJSONFile<{ publications: Publication[] }>("publications.json");
        } catch {
            data = { publications: [] };
        }

        data.publications.push(newPublication);
        await writeJSONFile("publications.json", data);

        return NextResponse.json(newPublication, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create publication" }, { status: 500 });
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

        const data = await readJSONFile<{ publications: Publication[] }>("publications.json");
        const index = data.publications.findIndex((p) => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: "Publication not found" }, { status: 404 });
        }

        data.publications[index] = {
            ...data.publications[index],
            ...updates,
            updated_at: new Date().toISOString(),
        };

        await writeJSONFile("publications.json", data);
        return NextResponse.json(data.publications[index]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update publication" }, { status: 500 });
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

        const data = await readJSONFile<{ publications: Publication[] }>("publications.json");
        data.publications = data.publications.filter((p) => p.id !== id);
        await writeJSONFile("publications.json", data);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete publication" }, { status: 500 });
    }
}
