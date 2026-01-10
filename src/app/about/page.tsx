import PageWrapper from "../components/layout/PageWrapper";
import AboutHero from "../components/about/AboutHero";
import AboutStats from "../components/about/AboutStats";
import AboutValues from "../components/about/AboutValues";
import AboutComparison from "../components/about/AboutComparison";
import AboutTeam from "../components/about/AboutTeam";
import FinalCTA from "../components/sections/FinalCTA";
import dbConnect from "@/lib/db";
import { TrustedCompany, TeamMember } from "@/models/Content";

export const dynamic = "force-dynamic";

export default async function About() {
    await dbConnect();
    const [trustedByRaw, teamRaw] = await Promise.all([
        TrustedCompany.find({}).sort({ createdAt: -1 }).lean(),
        TeamMember.find({}).sort({ createdAt: -1 }).lean(),
    ]);
    const trustedBy = JSON.parse(JSON.stringify(trustedByRaw));
    const team = JSON.parse(JSON.stringify(teamRaw));

    return (
        <PageWrapper className="page-container">
            <main>
                <AboutHero trustedBy={trustedBy} />
                <AboutStats />
                <AboutValues />
                <AboutComparison />
                <AboutTeam team={team} />
                <FinalCTA />
            </main>
        </PageWrapper>
    );
}
