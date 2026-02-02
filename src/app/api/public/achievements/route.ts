import { NextResponse } from "next/server";
import { readJSONFile } from "@/lib/storage";

export async function GET() {
    try {
        const results: any = {};

        try {
            const speakingData = await readJSONFile<{ engagements: any[] }>("speaking-engagements.json");
            results.speakingEngagements = (speakingData.engagements || []).filter(e => e.status === 'published');
        } catch { results.speakingEngagements = []; }

        try {
            const awardsData = await readJSONFile<{ awards: any[] }>("awards.json");
            const allAwards = (awardsData.awards || []).filter(a => a.status === 'published');

            results.awards = allAwards.filter(a => a.id?.startsWith('legacy-award'));
            results.hackathonWins = allAwards.filter(a => a.id?.startsWith('legacy-win'));
            results.originalContributions = allAwards.filter(a => a.id?.startsWith('legacy-contrib'));
            results.judgingExperience = allAwards.filter(a => a.id?.startsWith('legacy-judge'));
            results.associations = allAwards.filter(a => a.id?.startsWith('legacy-assoc'));
        } catch {
            results.awards = [];
            results.hackathonWins = [];
            results.originalContributions = [];
            results.judgingExperience = [];
            results.associations = [];
        }

        try {
            const publicationsData = await readJSONFile<{ publications: any[] }>("publications.json");
            results.publications = (publicationsData.publications || []).filter(p => p.status === 'published');
        } catch { results.publications = []; }

        return NextResponse.json(results);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
    }
}
