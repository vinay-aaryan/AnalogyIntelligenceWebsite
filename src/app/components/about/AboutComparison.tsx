"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function AboutComparison() {
    return (
        <section style={{ padding: "80px 20px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>

                <div style={{ textAlign: "center", marginBottom: 60 }}>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>Why Choose Analogy?</h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32 }}>

                    {/* Old Way */}
                    <div style={{
                        padding: 40,
                        borderRadius: 16, // Sharp
                        background: "#F3F3F3", // Cement
                        border: "1px solid #ffffff",
                        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
                    }}>
                        <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 32, color: "var(--token-fg-secondary)" }}>Traditional Agencies</h3>
                        <ul style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <ListItem negative text="Slow turnaround times" />
                            <ListItem negative text="Generic, templated solutions" />
                            <ListItem negative text="High ongoing maintenance costs" />
                            <ListItem negative text="Disconnect between tech & business" />
                            <ListItem negative text="Opaque pricing models" />
                        </ul>
                    </div>

                    {/* Our Way */}
                    <div
                        className="cement-card"
                        style={{
                            padding: 40,
                            position: "relative",
                            overflow: "hidden"
                        }}
                    >
                        <div style={{
                            position: "absolute",
                            top: 0, left: 0, width: "100%", height: 4,
                            background: "linear-gradient(90deg, var(--foreground), transparent)"
                        }} />

                        <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Analogy Intelligence</h3>
                        <ul style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            <ListItem text="Rapid AI-driven development" />
                            <ListItem text="Custom neural architectures" />
                            <ListItem text="Self-healing autonomous systems" />
                            <ListItem text="ROI-focused implementation" />
                            <ListItem text="Transparent, milestone-based delivery" />
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
}

function ListItem({ text, negative = false }: { text: string, negative?: boolean }) {
    return (
        <li style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
                minWidth: 24, height: 24,
                borderRadius: "50%",
                background: negative ? "rgba(255,0,0,0.1)" : "var(--foreground)",
                color: negative ? "red" : "var(--background)",
                display: "flex", alignItems: "center", justifyContent: "center"
            }}>
                {negative ? <X size={14} /> : <Check size={14} />}
            </div>
            <span style={{ fontSize: 16, color: negative ? "var(--token-fg-secondary)" : "var(--foreground)", fontWeight: negative ? 400 : 500 }}>{text}</span>
        </li>
    )
}
