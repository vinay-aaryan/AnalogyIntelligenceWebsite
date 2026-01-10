"use client";

import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
import MediaRenderer from "@/components/ui/MediaRenderer";
import { getMediaType } from "../../../utils/mediaUtils";

export default function Testimonials({ testimonials }: { testimonials: any[] }) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section style={{ padding: "120px 0", background: "var(--token-bg-page)" }}>
            <div className="container">

                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 16, color: "var(--foreground)", fontFamily: "var(--font-heading)" }}>
                        What our clients say
                    </h2>
                    <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "var(--foreground)", fontFamily: "var(--font-heading)" }}>Join customers who trust AI to transform their business</p>
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gridAutoRows: "minmax(260px, auto)",
                    gap: 24,
                    gridAutoFlow: "dense",
                }}>
                    {testimonials.map((t, i) => {
                        const layout = t.layout || "standard";
                        const mediaType = getMediaType(t.visualUrl);
                        const isVideo = mediaType === 'video' || mediaType === 'youtube';

                        // Precise Layout Logic
                        let colSpan = "span 1";
                        let rowSpan = "span 1";

                        if (layout === "tall") {
                            colSpan = "span 1";
                            rowSpan = "span 2";
                        } else if (layout === "wide" || layout === "big") {
                            colSpan = "span 2";
                            rowSpan = "span 2";
                        } else if (isVideo) {
                            // Auto-upgrade unconfigured videos to Wide/Big for impact
                            colSpan = "span 2";
                            rowSpan = "span 2";
                        }

                        const hasTopMedia = isVideo || (layout !== "standard" && t.visualUrl);
                        const isTall = rowSpan === "span 2" && colSpan === "span 1";

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="cement-card"
                                style={{
                                    gridColumn: colSpan,
                                    gridRow: rowSpan,
                                    padding: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 0,
                                    overflow: "hidden",
                                    background: "#F3F3F3",
                                    color: "var(--foreground)",
                                    height: "100%",
                                }}
                            >
                                {/* TOP MEDIA SECTION */}
                                {hasTopMedia && (
                                    <div style={
                                        isTall
                                            ? { flex: 1, width: "100%", background: "#000", position: "relative", minHeight: 200 }
                                            : { width: "100%", height: isVideo ? 400 : 250, background: "#000", position: "relative", flexShrink: 0 }
                                    }>
                                        <MediaRenderer
                                            src={t.visualUrl}
                                            alt={t.author + " Testimonial"}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                )}

                                {/* CONTENT SECTION */}
                                <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 24, flexShrink: 0, background: "#F3F3F3" }}>

                                    <div style={{ display: "flex", gap: 4 }}>
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FFD700" color="#FFD700" />)}
                                    </div>

                                    <p style={{ fontSize: 18, lineHeight: 1.6, fontWeight: 500 }}>"{t.text}"</p>

                                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                        {!hasTopMedia && (
                                            t.visualUrl ? (
                                                <MediaRenderer src={t.visualUrl} alt={t.author} width={64} height={64} style={{ borderRadius: "50%", objectFit: "cover" }} />
                                            ) : (
                                                <div style={{
                                                    width: 64, height: 64, borderRadius: "50%",
                                                    background: "#e0e0e0",
                                                    display: "flex", alignItems: "center", justifyContent: "center"
                                                }}>
                                                    <User size={32} color="#666" />
                                                </div>
                                            )
                                        )}

                                        <div>
                                            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--foreground)" }}>{t.author}</div>
                                            <div style={{ fontSize: 13, color: "var(--token-fg-secondary)" }}>{t.role}</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
