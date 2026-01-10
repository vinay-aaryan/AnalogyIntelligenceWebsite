import React from "react";
import dbConnect from "@/lib/db";
import { Work as WorkModel } from "@/models/Content";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Zap, BarChart3, Layers, Calendar } from "lucide-react";
import { notFound } from "next/navigation";
import { getYouTubeEmbedUrl } from "@/utils/mediaUtils";

// Server Component
export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    await dbConnect();
    const { slug } = await params;

    // Find project by slug (or fallback to ID if we implemented that logic, but sticking to slug for now)
    const projectRaw = await WorkModel.findOne({ slug }).lean();

    if (!projectRaw) {
        return notFound();
    }

    const project = JSON.parse(JSON.stringify(projectRaw));

    // Media Logic
    const hasYoutube = !!project.youtubeUrl;
    const isVideo = project.visualUrl?.endsWith(".mp4") || project.visualUrl?.endsWith(".webm");
    const youtubeEmbed = getYouTubeEmbedUrl(project.youtubeUrl || project.visualUrl);

    return (
        <main className="page-container" style={{ background: "var(--token-bg-page)", minHeight: "100vh" }}>

            {/* Sticky Request Demo Button (Mobile/Desktop) */}
            <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 100 }}>
                <Link
                    href={`/consultation?demo=true&project=${project.slug}`}
                    className="btn-base btn-cement-primary"
                    style={{
                        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "16px 32px", borderRadius: 100
                    }}
                >
                    Request Demo <ArrowUpRight size={20} />
                </Link>
            </div>

            <div style={{ paddingBottom: 160 }}>

                {/* Navigation */}
                <div style={{ padding: "120px 24px 0", maxWidth: 1400, margin: "0 auto" }}>
                    <Link href="/work" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#666", marginBottom: 40, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        <ArrowLeft size={16} /> Back to Projects
                    </Link>
                </div>

                {/* Hero Section */}
                <section style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px" }}>
                    <div style={{ marginBottom: 60 }}>
                        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
                            {project.category && (
                                <span style={{ padding: "8px 16px", background: "#f0f0f0", borderRadius: 100, fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    {project.category}
                                </span>
                            )}
                            {project.tags?.split(",").map((tag: string, i: number) => (
                                <span key={i} style={{ padding: "8px 16px", border: "1px solid #eee", borderRadius: 100, fontSize: 13, fontWeight: 600, color: "#666" }}>
                                    {tag.trim()}
                                </span>
                            ))}
                        </div>

                        <h1 style={{
                            fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            fontWeight: 800,
                            lineHeight: 1,
                            marginBottom: 32,
                            fontFamily: "var(--font-heading)",
                            maxWidth: 1000
                        }}>
                            {project.title}
                        </h1>

                        <p style={{ fontSize: "1.25rem", color: "var(--token-fg-secondary)", maxWidth: 700, lineHeight: 1.6 }}>
                            {project.desc}
                        </p>
                    </div>

                    {/* Wide Visual */}
                    <div className="cement-card" style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden", borderRadius: 32, position: "relative", background: "#000" }}>
                        {hasYoutube && youtubeEmbed ? (
                            <iframe
                                src={youtubeEmbed}
                                style={{ width: "100%", height: "100%", border: "none" }}
                                title={project.title}
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        ) : isVideo ? (
                            <video src={project.visualUrl} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : project.visualUrl ? (
                            <img src={project.visualUrl} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                            <div style={{ position: "absolute", inset: 0, background: project.videoColor || "linear-gradient(45deg, #111, #333)" }} />
                        )}
                    </div>
                </section>

                {/* Content Grid */}
                <section style={{ maxWidth: 1200, margin: "80px auto 0", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 60 }}>

                    {/* Column 1: The Narrative */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
                        {project.challenge && (
                            <div>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>The Challenge</h3>
                                <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--foreground)" }}>{project.challenge}</p>
                            </div>
                        )}
                        {project.solution && (
                            <div>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>The Solution</h3>
                                <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--foreground)" }}>{project.solution}</p>
                            </div>
                        )}
                        {project.results && (
                            <div>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>The Results</h3>
                                <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--foreground)" }}>{project.results}</p>
                            </div>
                        )}
                    </div>

                    {/* Column 2: Specs & Features */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

                        {/* Features Card */}
                        {project.features && project.features.length > 0 && (
                            <div className="cement-card" style={{ padding: 40, background: "#fff" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                                    <Zap size={20} fill="#000" />
                                    <h3 style={{ fontSize: 18, fontWeight: 700 }}>Key Capabilities</h3>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                    {project.features.map((feature: string, i: number) => (
                                        <div key={i} style={{ display: "flex", gap: 12 }}>
                                            <div style={{ marginTop: 2, flexShrink: 0 }}>
                                                <CheckCircle2 size={16} color="var(--token-fg-secondary)" />
                                            </div>
                                            <span style={{ fontSize: 15, fontWeight: 500, color: "#444" }}>{feature.trim()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tech Stack */}
                        {project.techStack && (
                            <div className="cement-card" style={{ padding: 40, background: "#f9f9f9" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                                    <Layers size={20} color="#666" />
                                    <h3 style={{ fontSize: 18, fontWeight: 700 }}>Technology</h3>
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {project.techStack.split(",").map((tech: string, i: number) => (
                                        <span key={i} style={{ padding: "6px 12px", background: "#fff", border: "1px solid #eee", borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Date / Metadata */}
                        <div style={{ display: "flex", gap: 32, padding: "24px 0", borderTop: "1px solid #eee" }}>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 4 }}>Date</div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>
                                    {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#999", textTransform: "uppercase", marginBottom: 4 }}>Client</div>
                                <div style={{ fontSize: 14, fontWeight: 600 }}>Confidential</div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Big CTA */}
                <section style={{ maxWidth: 800, margin: "120px auto 0", textAlign: "center", padding: "0 24px" }}>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: 24, letterSpacing: "-0.02em" }}>
                        Need something like this?
                    </h2>
                    <p style={{ fontSize: 18, color: "#666", maxWidth: 500, margin: "0 auto 40px" }}>
                        This system was custom built to solve specific operational bottlenecks. Let's discuss how we can adapt this architecture for your business.
                    </p>
                    <Link
                        href={`/consultation?demo=true&project=${project.slug}`}
                        className="btn-base btn-cement-primary"
                        style={{ display: "inline-flex", alignItems: "center", gap: 12, padding: "20px 48px", borderRadius: 100, fontSize: 18 }}
                    >
                        Book a Strategy Call <ArrowUpRight size={20} />
                    </Link>
                </section>

            </div>
        </main>
    );
}
