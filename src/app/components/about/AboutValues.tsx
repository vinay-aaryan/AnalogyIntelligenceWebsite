"use client";

import { motion } from "framer-motion";
import { Lightbulb, ShieldCheck, BarChart3, Users } from "lucide-react";

export default function AboutValues() {
    return (
        <section style={{ padding: "80px 20px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>

                <div style={{ marginBottom: 60, textAlign: "center" }}>
                    <div style={{
                        display: "inline-flex",
                        padding: "8px 16px",
                        borderRadius: 8, // Sharp
                        background: "#F3F3F3", // Cement
                        border: "1px solid #ffffff",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                        fontSize: 12,
                        fontWeight: 800, // Bold
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: 16,
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#333"
                    }}>
                        Our Values
                    </div>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>The Values Behind Analogy</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 32 }}>

                    <ValueCard
                        icon={<Lightbulb size={24} />}
                        title="Innovation First"
                        description="We explore the cutting edge of AI to bring you solutions that didn't exist yesterday."
                    />

                    <ValueCard
                        icon={<ShieldCheck size={24} />}
                        title="Integrity & Trust"
                        description="We build systems you can rely on. Transparency and security are at the core of our code."
                    />

                    <ValueCard
                        icon={<BarChart3 size={24} />}
                        title="Business Growth"
                        description="Technology is a means to an end. That end is the scalable growth of your enterprise."
                    />

                    <ValueCard
                        icon={<Users size={24} />}
                        title="Customer Partners"
                        description="We don't just have clients; we have partners. Your success is our metric for success."
                    />

                </div>
            </div>
        </section>
    );
}

function ValueCard({ icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="cement-card"
            style={{
                padding: 40,
            }}
        >
            <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                // background: "var(--token-bg-page)", 
                border: "1px solid var(--token-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 24,
                color: "var(--foreground)"
            }}>
                {icon}
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
            <p style={{ lineHeight: 1.6, color: "var(--token-fg-secondary)" }}>
                {description}
            </p>
        </motion.div>
    )
}
