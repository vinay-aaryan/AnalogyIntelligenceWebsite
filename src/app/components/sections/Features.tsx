"use client";

import { motion } from "framer-motion";
import { Brain, Database, Lock, Globe, Code, Layers } from "lucide-react";

const features = [
    { title: "Advanced LLMs", desc: "Custom Large Language Model integration for specific business needs.", icon: <Brain size={24} color="var(--foreground)" /> },
    { title: "Computer Vision", desc: "Automated visual inspection and analysis systems.", icon: <Globe size={24} color="var(--foreground)" /> },
    { title: "Predictive Analytics", desc: "Turn data into foresight with machine learning models.", icon: <Layers size={24} color="var(--foreground)" /> },
    { title: "Auto Workflows", desc: "End-to-end automation of repetitive business processes.", icon: <Database size={24} color="var(--foreground)" /> },
    { title: "Cloud Infra", desc: "Scalable, secure cloud architecture on AWS/GCP/Azure.", icon: <Code size={24} color="var(--foreground)" /> },
    { title: "Enterprise Security", desc: "SOC2 compliant systems with bank-grade encryption.", icon: <Lock size={24} color="var(--foreground)" /> },
];

export default function Features() {
    return (
        <section style={{ padding: "120px 0", background: "var(--token-bg-page)" }}>
            <div className="container">

                <div style={{ marginBottom: 80, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div className="cement-badge" style={{ marginBottom: 24 }}>
                        <Brain size={14} fill="#000" /> CAPABILITIES
                    </div>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 16, color: "var(--foreground)", fontFamily: "var(--font-heading)" }}>
                        Comprehensive Capabilities
                    </h2>
                    <p style={{ maxWidth: 600, fontSize: 16, color: "var(--token-fg-secondary)" }}>
                        We combine cutting-edge AI research with industrial-grade software engineering.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                    {features.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="cement-card"
                            style={{
                                padding: 32,
                                gap: 16,
                            }}
                        >
                            <div style={{ width: 48, height: 48, background: "var(--token-bg-surface)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,0,0,0.05)" }}>
                                {item.icon}
                            </div>
                            <h3 style={{ fontSize: 20, fontWeight: 700, color: "var(--foreground)", fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                            <p style={{ fontSize: 14, color: "var(--token-fg-secondary)", lineHeight: 1.6 }}>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
