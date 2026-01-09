"use client";

import { motion } from "framer-motion";

export default function HowWeHelp() {
    return (
        <section style={{ padding: "120px 20px", display: "flex", justifyContent: "center" }}>
            <div style={{ maxWidth: 1000, width: "100%", display: "flex", flexDirection: "column", gap: 60 }}>

                <motion.h2
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    style={{ fontSize: 32, fontWeight: 700, textAlign: "center" }}
                >
                    How We Help
                </motion.h2>

                <div style={{ display: "grid", gap: 32 }}>
                    {[
                        { label: "Reduce Time", desc: "We handle the tech so you focus on your work. Our strategies are designed to dramatically shrink project timelines." },
                        { label: "Generate Revenue", desc: "Tools that help you sell more and grow. We unlock new revenue streams through strategic technology implementation." },
                        { label: "Reduce Manual Work", desc: "Automate tasks to free your team. We eliminate repetitive tasks by integrating intelligent automation." }
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                padding: 32,
                                borderLeft: "2px solid var(--color-gold-muted)",
                                background: "linear-gradient(to right, rgba(197, 160, 89, 0.05), transparent)",
                            }}
                        >
                            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8, color: "var(--color-gold-bright)" }}>
                                {item.label}
                            </h3>
                            <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
