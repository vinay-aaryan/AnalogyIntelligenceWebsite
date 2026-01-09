"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Zap } from "lucide-react";

export default function AboutStats() {
    return (
        <section style={{ padding: "80px 20px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>

                {/* Intro Section */}
                <div style={{ textAlign: "center", marginBottom: 60, maxWidth: 700, margin: "0 auto 80px" }}>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 20 }}>Who We Are</h2>
                    <p style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "var(--token-fg-secondary)" }}>
                        Analogy Intelligence is a team of engineers and strategists dedicated to automating the mundane so you can focus on the extraordinary. We don't just build software; we build engines for growth.
                    </p>
                </div>

                {/* Stats Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>

                    {/* Card 1 */}
                    <Card
                        icon={<TrendingUp size={24} color="var(--foreground)" />}
                        title="Generate Revenue"
                        stat="10x ROI"
                        description="AI systems that directly impact your bottom line through optimization."
                    />

                    {/* Card 2 */}
                    <Card
                        icon={<Clock size={24} color="var(--foreground)" />}
                        title="Save Time"
                        stat="50+ Hours"
                        description="Weekly hours saved per client by automating manual workflows."
                    />

                    {/* Card 3 */}
                    <Card
                        icon={<Zap size={24} color="var(--foreground)" />}
                        title="Deploy Fast"
                        stat="2 Weeks"
                        description="Rapid manufacturing and deployment of custom AI agents."
                    />

                </div>
            </div>
        </section>
    );
}

function Card({ icon, title, stat, description }: { icon: any, title: string, stat: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="cement-card"
            style={{
                padding: 40,
                gap: 16
            }}
        >
            <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "var(--token-bg-page)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--token-border)"
            }}>
                {icon}
            </div>
            <div>
                <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>{stat}</h3>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: "var(--token-fg-secondary)", marginBottom: 12 }}>{title}</h4>
                <p style={{ fontSize: 14, color: "var(--token-fg-tertiary)", lineHeight: 1.5 }}>
                    {description}
                </p>
            </div>
        </motion.div>
    );
}
