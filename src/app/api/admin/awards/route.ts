import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readJSONFile, writeJSONFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

interface Award {
    id: string;
    title: string;
    year: string;
    significance: string;
    evidence: Array<{ photo?: string; link?: string }>;
    created_at: string;
    updated_at: string;
}

export async function GET() {
    try {
        const data = await readJSONFile<{ awards: Award[] }>("awards.json");
        return NextResponse.json(data.awards || []);
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
        const newAward: Award = {
            id: uuidv4(),
            ...body,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        let data;
        try {
            data = await readJSONFile<{ awards: Award[] }>("awards.json");
        } catch {
            data = { awards: [] };
        }

        data.awards.push(newAward);
        await writeJSONFile("awards.json", data);

        return NextResponse.json(newAward, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create award" }, { status: 500 });
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

        const data = await readJSONFile<{ awards: Award[] }>("awards.json");
        const index = data.awards.findIndex((a) => a.id === id);

        if (index === -1) {
            return NextResponse.json({ error: "Award not found" }, { status: 404 });
        }

        data.awards[index] = {
            ...data.awards[index],
            ...updates,
            updated_at: new Date().toISOString(),
        };

        await writeJSONFile("awards.json", data);
        return NextResponse.json(data.awards[index]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update award" }, { status: 500 });
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

        const data = await readJSONFile<{ awards: Award[] }>("awards.json");
        data.awards = data.awards.filter((a) => a.id !== id);
        await writeJSONFile("awards.json", data);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete award" }, { status: 500 });
    }
}
