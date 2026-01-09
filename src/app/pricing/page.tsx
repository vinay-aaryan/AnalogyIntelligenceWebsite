"use client";

import PageWrapper from "../components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
    { name: "Discovery", price: "$2,500+", desc: "First Steps", features: ["Chat & Idea Map", "Basic Plan", "Plant the seed"] },
    { name: "Foundation", price: "$10,000+", desc: "Build Basics", features: ["Custom prototype", "Tweaks & Polish", "Strong Start"], highlight: true },
    { name: "Full System", price: "$30,000+", desc: "All-In", features: ["Complete Build", "Launch Strategy", "Big Results"] },
    { name: "Support", price: "$1,500/mo", desc: "Keep Going", features: ["Updates", "Maintenance", "Lasting Partnership"] },
];

export default function Pricing() {
    return (
        <PageWrapper className="page-container">
            <section style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 20px" }}>
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800 }}>Value Map.</h1>
                    <p style={{ color: "rgba(255,255,255,0.6)", marginTop: 16 }}>Clear and fair. No hidden costs.</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 32 }}>
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                padding: 32,
                                background: tier.highlight ? "rgba(197, 160, 89, 0.1)" : "rgba(255,255,255,0.02)",
                                border: tier.highlight ? "1px solid var(--color-gold-muted)" : "1px solid rgba(255,255,255,0.05)",
                                borderRadius: 24,
                                textAlign: "center"
                            }}
                        >
                            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{tier.name}</h3>
                            <p style={{ fontSize: 32, fontWeight: 800, color: "var(--color-gold-bright)", marginBottom: 8 }}>{tier.price}</p>
                            <p style={{ fontSize: 14, opacity: 0.6, marginBottom: 32 }}>{tier.desc}</p>

                            <ul style={{ listStyle: "none", textAlign: "left", display: "flex", flexDirection: "column", gap: 12 }}>
                                {tier.features.map(f => (
                                    <li key={f} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
                                        <Check size={16} color="var(--color-gold-muted)" /> {f}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>
        </PageWrapper>
    );
}
