import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { readJSONFile, writeJSONFile } from "@/lib/storage";

export async function GET() {
    try {
        const data = await readJSONFile("personal-info.json");
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch personal info" },
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
        const updatedData = {
            ...body,
            updated_at: new Date().toISOString(),
        };

        await writeJSONFile("personal-info.json", updatedData);

        return NextResponse.json(updatedData);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update personal info" },
            { status: 500 }
        );
    }
}
