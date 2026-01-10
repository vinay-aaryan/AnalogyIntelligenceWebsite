"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, BarChart3, Bot, Lock, Search } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { getYouTubeEmbedUrl } from "../../../utils/mediaUtils";

const FinTechVisual = () => (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {/* Grid BG */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#ddd 1px, transparent 1px)", backgroundSize: "20px 20px", opacity: 0.5 }} />

        {/* Abstract UI: Dashboard */}
        <div style={{ width: "80%", height: "60%", background: "#fff", border: "1px solid #eee", borderRadius: 12, boxShadow: "0 10px 40px rgba(0,0,0,0.05)", position: "relative", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ height: 40, borderBottom: "1px solid #eee", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
            </div>
            {/* Content: Graph */}
            <div style={{ flex: 1, padding: 20, display: "flex", alignItems: "flex-end", gap: 8 }}>
                {[40, 60, 45, 70, 55, 80, 65].map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        style={{ flex: 1, background: i === 5 ? "#000" : "#eee", borderRadius: 4 }}
                    />
                ))}
            </div>
        </div>

        {/* Floating Badge */}
        <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "20%", right: "15%", padding: "8px 16px", background: "#000", color: "#fff", borderRadius: 100, fontSize: 12, fontWeight: 700, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
        >
            +124% APY
        </motion.div>
    </div>
);

const NLPVisual = () => (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {/* Dot Pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#eee 2px, transparent 2px)", backgroundSize: "16px 16px" }} />

        {/* Abstract UI: Chat/Doc */}
        <div style={{ width: "70%", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Message 1 */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{ alignSelf: "flex-start", padding: "12px 20px", background: "#fff", border: "1px solid #eee", borderRadius: "16px 16px 16px 4px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
            >
                <div style={{ width: 120, height: 8, background: "#eee", borderRadius: 4, marginBottom: 6 }} />
                <div style={{ width: 80, height: 8, background: "#eee", borderRadius: 4 }} />
            </motion.div>

            {/* Message 2 (AI) */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                style={{ alignSelf: "flex-end", padding: "12px 20px", background: "#000", color: "#fff", borderRadius: "16px 16px 4px 16px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            >
                <div style={{ width: 140, height: 8, background: "rgba(255,255,255,0.3)", borderRadius: 4, marginBottom: 6 }} />
                <div style={{ width: 100, height: 8, background: "rgba(255,255,255,0.3)", borderRadius: 4 }} />
            </motion.div>

            {/* Message 3 */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                style={{ alignSelf: "flex-start", padding: "12px 20px", background: "#fff", border: "1px solid #eee", borderRadius: "16px 16px 16px 4px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
            >
                <div style={{ width: 100, height: 8, background: "#eee", borderRadius: 4 }} />
            </motion.div>
        </div>

        <div style={{ position: "absolute", bottom: 20, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "#fff", border: "1px solid #eee", borderRadius: 100 }}>
            <Search size={14} color="#000" />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#000" }}>Semantic Analysis</span>
        </div>
    </div>
);

const Visuals: Record<string, React.FC> = {
    FinTechVisual,
    NLPVisual
};

function ProductCard({ project, i }: { project: any, i: number }) {
    // Resolve Media
    const isVideo = project.visualUrl && project.visualUrl.match(/\.(mp4|webm|mov)$/i);
    const hasVisual = !!project.visualUrl;

    // YouTube
    const hasYoutube = !!project.youtubeUrl;
    const isYoutube = hasYoutube || (hasVisual && getYouTubeEmbedUrl(project.visualUrl));

    // State
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Fallback ID-based visual
    const VisualComponent = Visuals[project.visualType] || Visuals.FinTechVisual;

    return (
        <Link href={`/work/${project.slug || '#'}`} style={{ display: "block", textDecoration: "none", height: "100%" }}>
            <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, margin: "-50px", amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="cement-card"
                style={{ height: "100%" }}
            >
                <div style={{
                    borderRadius: 24,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    background: "#F3F3F3",
                    border: "1px solid rgba(0,0,0,0.05)",
                    position: "relative",
                    height: "100%"
                }}>
                    {/* Visual Header */}
                    <div style={{ height: 320, width: "100%", position: "relative", borderBottom: "1px solid rgba(0,0,0,0.05)", background: "#fff", overflow: "hidden" }}>
                        {hasVisual || hasYoutube ? (
                            isYoutube ? (
                                <iframe
                                    src={getYouTubeEmbedUrl(project.youtubeUrl || project.visualUrl)!}
                                    style={{ width: "100%", height: "100%", border: "none", pointerEvents: "auto" }}
                                    title={project.title}
                                    allow="autoplay; encrypted-media; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : isVideo ? (
                                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                                    <video
                                        ref={videoRef}
                                        src={project.visualUrl}
                                        autoPlay
                                        loop
                                        muted={isMuted}
                                        playsInline
                                        controls={false}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (videoRef.current) {
                                                videoRef.current.muted = !isMuted;
                                                setIsMuted(!isMuted);
                                            }
                                        }}
                                        style={{
                                            position: "absolute", bottom: 16, right: 16,
                                            width: 32, height: 32, borderRadius: "50%",
                                            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            border: "none", cursor: "pointer", zIndex: 10
                                        }}
                                    >
                                        {isMuted ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                                        )}
                                    </button>
                                </div>
                            ) : (
                                <img
                                    src={project.visualUrl}
                                    alt={project.title}
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            )
                        ) : (
                            <VisualComponent />
                        )}
                    </div>

                    {/* Content Body */}
                    <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 16, flex: 1, background: "#F3F3F3" }}>
                        {/* Tags */}
                        {(() => {
                            const tags = typeof project.tags === 'string'
                                ? project.tags.split(',').filter(Boolean)
                                : Array.isArray(project.tags) ? project.tags : [];

                            if (tags.length === 0) return null;

                            return (
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                                    {tags.map((tag: string) => (
                                        <div key={tag} style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", background: "#e5e5e5", borderRadius: 100, color: "#666" }}>
                                            {tag.trim()}
                                        </div>
                                    ))}
                                </div>
                            )
                        })()}

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <h3 style={{ fontSize: 24, fontWeight: 700, color: "var(--foreground)", fontFamily: "var(--font-heading)", maxWidth: "80%" }}>
                                {project.title}
                            </h3>
                            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,0,0,0.05)" }}>
                                <ArrowUpRight size={20} color="#000" />
                            </div>
                        </div>

                        <p style={{ color: "var(--token-fg-secondary)", fontSize: 16, lineHeight: 1.6 }}>
                            {project.desc}
                        </p>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

export default function SelectedWork({ projects }: { projects: any[] }) {
    if (!projects || projects.length === 0) return null;
    return (
        <section style={{ padding: "120px 0", background: "var(--token-bg-page)" }}>
            <div className="container">

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80 }}>
                    <div style={{ maxWidth: 600 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: "var(--foreground)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Our Products</div>
                        <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "var(--foreground)", fontFamily: "var(--font-heading)", lineHeight: 1 }}>
                            Innovation, <br /> <span style={{ color: "var(--token-fg-secondary)" }}>Productized</span>
                        </h2>
                    </div>

                    <Link href="/work" style={{ padding: "16px 32px", borderRadius: 100, border: "2px solid #000", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8, background: "transparent", color: "#000", transition: "all 0.2s" }}>
                        View All Products <ArrowUpRight size={18} />
                    </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, justifyContent: "center" }}>
                    {projects.map((project, i) => (
                        <ProductCard key={i} project={project} i={i} />
                    ))}
                </div>

            </div>
        </section>
    );
}
