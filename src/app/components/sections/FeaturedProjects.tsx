"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        title: "Helio AI Assistant",
        type: "AI Tool",
        description: "Custom AI tool for solar energy predictions.",
    },
    {
        title: "Aethered Space Tourism",
        type: "Web Platform",
        description: "Seamless booking experience for future travel.",
    },
    {
        title: "Orbital Dashboard",
        type: "SaaS",
        description: "Real-time mission control data visualization.",
    },
];

export default function FeaturedProjects() {
    return (
        <section style={{ padding: "120px 0", maxWidth: "100%", margin: "0 100px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 100 }}>
                <div>
                    <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Featured Projects</h2>
                    <p style={{ color: "rgba(255,255,255,0.6)" }}>A glimpse into our solar archive.</p>
                </div>
                <Link
                    href="/work"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 14,
                        color: "var(--color-gold-bright)"
                    }}
                >
                    View All Work <ArrowUpRight size={16} />
                </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 160 }}>
                {projects.map((project, i) => (
                    <motion.div
                        key={project.title}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{
                            display: "flex",
                            flexDirection: i % 2 === 0 ? "row" : "row-reverse", // Zig-Zag: Image Left (Row) then Image Right (Row-Reverse)
                            alignItems: "center",
                            justifyContent: "space-between", // Ensure spacing
                            gap: "80px", // Explicit massive gap (approx 5-10% depending on screen)
                            flexWrap: "nowrap" // Prevent wrapping on large screens to force layout
                        }}
                    >
                        {/* Image Side - 50% to allow ample gap */}
                        <div
                            style={{
                                flex: "0 0 50%", // Allow shrinking/growing but base is smaller
                                aspectRatio: "16/9",
                                background: "#111",
                                borderRadius: 32,
                                overflow: "hidden",
                                border: "1px solid rgba(255,255,255,0.1)",
                                position: "relative",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
                            }}
                        >
                            {/* Placeholder Styling */}
                            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${i % 2 === 0 ? '#4a2c4a' : '#2c3a5a'}, #0a0a0a)` }} />

                            {/* Decorative Number */}
                            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", opacity: 0.2 }}>
                                <span style={{ fontSize: 160, fontWeight: 800, color: "white" }}>0{i + 1}</span>
                            </div>
                        </div>

                        {/* Text Side - 40% leaves 10% for gap/margins */}
                        <div style={{ flex: "0 0 40%", textAlign: "left" }}>
                            <span style={{ fontSize: 13, color: "var(--color-gold-muted)", textTransform: "uppercase", letterSpacing: "0.2em", display: "block", marginBottom: 24 }}>
                                {project.type}
                            </span>
                            <h3 style={{ fontSize: 48, fontWeight: 700, marginBottom: 32, lineHeight: 1.1 }}>{project.title}</h3>
                            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 48 }}>
                                {project.description}
                            </p>
                            <Link
                                href={`/work/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 12,
                                    fontSize: 16,
                                    fontWeight: 600,
                                    color: "var(--color-starlight)",
                                    paddingBottom: 8,
                                    borderBottom: "1px solid var(--color-gold-muted)"
                                }}
                            >
                                View Case Study <ArrowUpRight size={18} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
