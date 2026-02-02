import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readJSONFile, writeJSONFile } from "@/lib/storage";
import { v4 as uuidv4 } from "uuid";

interface Project {
    id: string;
    name: string;
    description: string;
    role?: string;
    url?: string;
    github?: string;
    demo?: string;
    image_url?: string;
    technologies: string[];
    category: string;
    project_type: 'founder' | 'experimental' | 'open_source';
    year?: string;
    status: 'draft' | 'published';
    project_status?: string; // e.g., "Building", "Active", "Completed"
    highlight: boolean;
    created_at: string;
    updated_at: string;
}

export async function GET() {
    try {
        const data = await readJSONFile<{ projects: Project[] }>("projects.json");
        return NextResponse.json(data.projects || []);
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
        const newProject: Project = {
            id: uuidv4(),
            ...body,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        let data;
        try {
            data = await readJSONFile<{ projects: Project[] }>("projects.json");
        } catch {
            data = { projects: [] };
        }

        data.projects.push(newProject);
        await writeJSONFile("projects.json", data);

        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
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

        const data = await readJSONFile<{ projects: Project[] }>("projects.json");
        const index = data.projects.findIndex((p) => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        data.projects[index] = {
            ...data.projects[index],
            ...updates,
            updated_at: new Date().toISOString(),
        };

        await writeJSONFile("projects.json", data);
        return NextResponse.json(data.projects[index]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
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

        const data = await readJSONFile<{ projects: Project[] }>("projects.json");
        data.projects = data.projects.filter((p) => p.id !== id);
        await writeJSONFile("projects.json", data);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
