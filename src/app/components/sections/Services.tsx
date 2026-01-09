"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "AI Strategy & Consultation",
        desc: "Expert guidance on integrating AI into your business model for maximum impact."
    },
    {
        title: "Custom Software Solutions",
        desc: "Tailored, scalable software infrastructure built for high operational performance."
    },
    {
        title: "Modern Website Development",
        desc: "High-performance, visually stunning web experiences that convert."
    },
    {
        title: "AI Systems & Automation",
        desc: "Chatbots, Voice Agents, LLMs, and end-to-end workflow automation."
    }
];

export default function Services() {
    return (
        <section style={{ padding: "120px 0", background: "var(--token-bg-page)" }}>
            <div className="container">

                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 60, gap: 24 }}>
                    <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "var(--foreground)", fontFamily: "var(--font-heading)", maxWidth: 600, lineHeight: 1.1 }}>
                        Services designed for scale
                    </h2>
                    <Link href="/services" style={{ padding: "16px 32px", borderRadius: 100, border: "1px solid rgba(0,0,0,0.1)", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8, background: "var(--token-bg-surface)" }}>
                        View All Services <ArrowUpRight size={16} />
                    </Link>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    {services.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            whileHover={{ paddingLeft: 32, background: "rgba(0,0,0,0.03)" }}
                            style={{
                                padding: "40px 0",
                                borderTop: "1px solid rgba(0,0,0,0.1)",
                                display: "grid",
                                gridTemplateColumns: "1.5fr 2fr auto", // Fixed columns for perfect alignment
                                alignItems: "center",
                                gap: 32,
                                cursor: "pointer",
                                transition: "all 0.3s ease"
                            }}
                        >
                            <h3 style={{ fontSize: 24, fontWeight: 600, color: "var(--foreground)", fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                            <p style={{ color: "var(--token-fg-secondary)", fontSize: 16, maxWidth: 500 }}>{item.desc}</p>
                            <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <ArrowUpRight size={20} color="var(--foreground)" />
                            </div>
                        </motion.div>
                    ))}
                    <div style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }} />
                </div>

            </div>
        </section>
    );
}
