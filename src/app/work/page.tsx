import PageWrapper from "../components/layout/PageWrapper";
import dbConnect from "@/lib/db";
import { Work as WorkModel } from "@/models/Content";
import WorkList from "./WorkList";

// Server Component
export const dynamic = "force-dynamic";

export default async function Work() {
    await dbConnect();
    const worksRaw = await WorkModel.find({}).sort({ createdAt: -1 }).lean();
    const works = JSON.parse(JSON.stringify(worksRaw));

    return (
        <PageWrapper className="page-container">
            <section style={{ maxWidth: 1400, margin: "0 auto", padding: "160px 20px 120px" }}>

                <div style={{ textAlign: "center", marginBottom: 80, maxWidth: 900, marginInline: "auto" }}>
                    <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 24, color: "var(--token-fg-secondary)", textTransform: "uppercase", letterSpacing: "0.2em" }}>Selected Projects</div>
                    <h1 style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", fontWeight: 800, fontFamily: "var(--font-heading)", lineHeight: 1, marginBottom: 32 }}>
                        Building the <span style={{ color: "var(--token-fg-secondary)" }}>Unimaginable</span>
                    </h1>
                    <p style={{ fontSize: 20, color: "var(--token-fg-secondary)", maxWidth: 600, lineHeight: 1.6, marginInline: "auto" }}>
                        We partner with visionaries to engineer digital experiences that redefine industries. From autonomous AI agents to immersive spatial interfaces, explore our archive of impossible things made real.
                    </p>
                </div>

                <WorkList works={works} />

            </section>
        </PageWrapper>
    );
}
