import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readJSONFile, writeJSONFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

interface SpeakingEngagement {
    id: string;
    event: string;
    location: string;
    year: number;
    topic: string;
    type: string;
    photos: string[];
    link: string;
    featured?: boolean;
    status: 'draft' | 'published';
    created_at: string;
    updated_at: string;
}

export async function GET() {
    try {
        const data = await readJSONFile<{ engagements: SpeakingEngagement[] }>(
            "speaking-engagements.json"
        );
        return NextResponse.json(data.engagements || []);
    } catch (error) {
        // Return empty array if file doesn't exist yet
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
        const newEngagement: SpeakingEngagement = {
            id: uuidv4(),
            ...body,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        let data;
        try {
            data = await readJSONFile<{ engagements: SpeakingEngagement[] }>(
                "speaking-engagements.json"
            );
        } catch {
            data = { engagements: [] };
        }

        data.engagements.push(newEngagement);
        await writeJSONFile("speaking-engagements.json", data);

        return NextResponse.json(newEngagement, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create speaking engagement" },
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

        const data = await readJSONFile<{ engagements: SpeakingEngagement[] }>(
            "speaking-engagements.json"
        );

        const index = data.engagements.findIndex((e) => e.id === id);
        if (index === -1) {
            return NextResponse.json(
                { error: "Speaking engagement not found" },
                { status: 404 }
            );
        }

        data.engagements[index] = {
            ...data.engagements[index],
            ...updates,
            updated_at: new Date().toISOString(),
        };

        await writeJSONFile("speaking-engagements.json", data);

        return NextResponse.json(data.engagements[index]);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update speaking engagement" },
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

        const data = await readJSONFile<{ engagements: SpeakingEngagement[] }>(
            "speaking-engagements.json"
        );

        data.engagements = data.engagements.filter((e) => e.id !== id);
        await writeJSONFile("speaking-engagements.json", data);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete speaking engagement" },
            { status: 500 }
        );
    }
}
