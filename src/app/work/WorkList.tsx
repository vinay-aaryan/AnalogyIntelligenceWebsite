"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getMediaType, getYouTubeEmbedUrl } from "../../utils/mediaUtils";

export default function WorkList({ works }: { works: any[] }) {
    if (works.length === 0) {
        return (
            <div style={{ textAlign: "center", padding: 60, background: "#f5f5f5", borderRadius: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#999" }}>No projects added yet.</h3>
                <p style={{ color: "#aaa" }}>Visit the Admin Panel to add your work.</p>
            </div>
        );
    }

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))", gap: 40 }}>
            {works.map((work: any, i: number) => {
                const hasYoutube = !!work.youtubeUrl;
                const mediaType = hasYoutube
                    ? 'youtube'
                    : getMediaType(work.visualUrl);

                // Get correct embed URL
                const youtubeEmbed = getYouTubeEmbedUrl(work.youtubeUrl || work.visualUrl);

                return (
                    <Link href={`/work/${work.slug || '#'}`} key={work._id || i} style={{ textDecoration: "none" }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="cement-card"
                            style={{
                                cursor: "pointer",
                                background: "#F3F3F3",
                                borderRadius: 24,
                                overflow: "hidden",
                                display: "flex",
                                flexDirection: "column",
                                border: "1px solid rgba(0,0,0,0.05)",
                                position: "relative",
                                height: "100%"
                            }}
                            whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}
                        >
                            {/* Video/Image Area */}
                            <div style={{ aspectRatio: "16/9", width: "100%", background: "#f2f2f2", position: "relative", overflow: "hidden" }}>

                                {mediaType === 'youtube' && youtubeEmbed ? (
                                    <div style={{ pointerEvents: "none", width: "100%", height: "100%" }}>
                                        <iframe
                                            src={youtubeEmbed}
                                            style={{ width: "100%", height: "100%", border: "none" }}
                                            title={work.title}
                                            loading="lazy"
                                        />
                                    </div>
                                ) : mediaType === 'video' ? (
                                    <video src={work.visualUrl} autoPlay loop muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                ) : mediaType === 'image' ? (
                                    <img src={work.visualUrl} alt={work.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                ) : (
                                    // Fallback Color Gradient
                                    <div style={{ position: "absolute", inset: 0, background: work.videoColor || "linear-gradient(45deg, #333, #000)" }} />
                                )}

                                {/* Overlay Badge */}
                                <div style={{ position: "absolute", top: 24, left: 24, padding: "8px 16px", background: "#fff", borderRadius: 100, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#000" }}>
                                    {work.category || "Project"}
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 16 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <h3 style={{ fontSize: 32, fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>{work.title}</h3>
                                    <ArrowUpRight size={24} color="var(--token-fg-secondary)" />
                                </div>
                                <p style={{ fontSize: 16, color: "var(--token-fg-secondary)", lineHeight: 1.6, maxWidth: "90%" }}>
                                    {work.desc}
                                </p>
                            </div>

                        </motion.div>
                    </Link>
                );
            })}
        </div>
    );
}
