"use client";

import { motion } from "framer-motion";
import React from "react";
import { Layers, Zap, CheckCircle2, BarChart3, Smartphone, Server, Activity } from "lucide-react";

// --- Custom Visuals ---

const PhoneVisual = () => (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5", borderRadius: 24, overflow: "hidden" }}>
        {/* Phone Frame */}
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
                width: 160, height: 280,
                background: "#000",
                borderRadius: 24,
                padding: 8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
        >
            {/* Screen */}
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #FFD700 0%, #FF5F56 100%)", borderRadius: 18, position: "relative", overflow: "hidden" }}>
                {/* Simulated UI Elements */}
                <motion.div
                    animate={{ y: [0, -40, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: "absolute", inset: 0, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}
                >
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} style={{ width: "100%", height: 40, background: "rgba(255,255,255,0.3)", borderRadius: 8 }} />
                    ))}
                </motion.div>
            </div>
        </motion.div>
    </div>
);

const ServerVisual = () => (
    <div style={{ position: "relative", width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "#e0e0e0", borderRadius: 24, overflow: "hidden" }}>
        <motion.div
            style={{ width: 200, height: 80, background: "#333", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }}
        >
            <div style={{ display: "flex", gap: 8 }}>
                {[1, 2, 3].map(i => (
                    <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        style={{ width: 8, height: 8, borderRadius: "50%", background: "#00ff00" }}
                    />
                ))}
            </div>
            <div style={{ width: 40, height: 4, background: "#555", borderRadius: 2 }} />
        </motion.div>
    </div>
);

const PulseVisual = () => (
    <div style={{ position: "relative", width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "#000", borderRadius: 24, overflow: "hidden" }}>
        {/* Waveform */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, height: 40 }}>
            {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((h, i) => (
                <motion.div
                    key={i}
                    animate={{ height: [10, 30 * (h / 2), 10] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                    style={{ width: 6, background: "#fff", borderRadius: 10 }}
                />
            ))}
        </div>
        <div style={{ position: "absolute", top: 16, right: 16 }}>
            <Activity size={16} color="#444" />
        </div>
    </div>
);

const steps = [
    {
        num: "01",
        title: "Workflow Assessment",
        desc: "We begin by examining your existing workflows to identify where our product can deliver the greatest impact.",
        visual: <PhoneVisual />,
        span: "row-span-2", // Tall Left
        icon: <BarChart3 size={20} color="#000" />
    },
    {
        num: "02",
        title: "Deploy with Confidence",
        desc: "Our team develops custom AI systems built around your goals, ensuring safe and reliable deployment.",
        visual: <ServerVisual />,
        span: "col-span-1",
        icon: <Server size={20} color="#000" />
    },
    {
        num: "03",
        title: "Ongoing Support & Optimization",
        desc: "After deployment, we provide support and refine your products to keep them performing at their best.",
        visual: <PulseVisual />,
        span: "col-span-1",
        icon: <CheckCircle2 size={20} color="#000" />
    }
];

export default function Process() {
    return (
        <section style={{ padding: "120px 0", background: "var(--token-bg-page)" }}>
            <div className="container">

                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <div className="cement-badge" style={{ marginBottom: 24 }}>
                        <Layers size={14} fill="#000" /> PROCESS
                    </div>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 16, color: "var(--foreground)", fontFamily: "var(--font-heading)" }}>
                        Simple & Scalable
                    </h2>
                    <p style={{ fontSize: 18, color: "#666" }}>
                        A transparent process of collaboration and feedback
                    </p>
                </div>

                <div className="bento-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: 24
                }}>
                    <style jsx>{`
                        @media (min-width: 968px) {
                            .bento-grid {
                                grid-template-columns: 1fr 1fr;
                                grid-template-rows: auto auto;
                            }
                            .bento-item-0 { /* First item (01) - Tall Left */
                                grid-row: 1 / 3;
                                grid-column: 1 / 2;
                            }
                        }
                    `}</style>

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`cement-card bento-item-${i}`}
                            style={{
                                padding: 32,
                                gap: 24,
                                height: "100%"
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ width: 48, height: 48, borderRadius: 12, background: "#000", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
                                    {/* Make icon white for contrast against black box */
                                        React.cloneElement(step.icon as React.ReactElement<any>, { color: "#fff" })
                                    }
                                </div>
                            </div>

                            <div>
                                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#000", marginBottom: 8, fontFamily: "var(--font-heading)" }}>{step.title}</h3>
                                <p style={{ fontSize: 16, color: "#666", lineHeight: 1.5 }}>{step.desc}</p>
                            </div>

                            <div style={{ fontSize: 40, fontWeight: 300, color: "#000", opacity: 1, fontFamily: "var(--font-heading)", letterSpacing: "-0.03em" }}>
                                {step.num}
                            </div>

                            {/* Visual Container */}
                            <div style={{ flex: 1, minHeight: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                {step.visual}
                            </div>
                        </motion.div>
                    ))}
                </div>
                
            </div>
        </section>
    );
}