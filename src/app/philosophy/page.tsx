"use client";

import PageWrapper from "../components/layout/PageWrapper";
import { motion } from "framer-motion";

const insights = [
    { title: "AI Like a Helper", desc: "AI should light the way, not overwhelm—like a friend with good advice." },
    { title: "Tech as a Map", desc: "We see tech as a simple map, guiding you through complex ideas." },
    { title: "Simplicity First", desc: "Clear solutions over complicated ones, always." },
    { title: "Human Touch", desc: "We build with care, like sharing ideas over coffee." },
    { title: "Growth with Calm", desc: "Grow your business steadily, without the chaos." },
];

export default function Philosophy() {
    return (
        <PageWrapper className="page-container">
            <section style={{ maxWidth: 1000, margin: "0 auto", padding: "120px 20px" }}>
                <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, textAlign: "center", marginBottom: 80 }}>Solar Insights.</h1>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {insights.map((insight, i) => (
                        <motion.div
                            key={insight.title}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            style={{
                                padding: 40,
                                background: "rgba(255,255,255,0.02)",
                                borderLeft: "4px solid var(--color-gold-muted)",
                                borderRadius: "0 16px 16px 0",
                            }}
                        >
                            <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8, color: "var(--color-starlight)" }}>{insight.title}</h2>
                            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)" }}>{insight.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </PageWrapper>
    );
}
