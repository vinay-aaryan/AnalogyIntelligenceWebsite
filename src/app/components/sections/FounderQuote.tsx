"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function FounderQuote({ founder }: { founder?: any }) {
    if (!founder) return null;

    // Helper to render quote with highlighted spans if coming from DB as plain text, 
    // or just render it. For now, let's assume raw text and maybe simple regex or just render raw.
    // The previous quote had spans. If the user puts HTML in DB, we'd need dangerouslySetInnerHTML.
    // For safety and simplicity, we'll render text. If they want highlighting, we can parse *markdown* or something later.
    // But for this specific requests, let's render the text. 
    // To keep the style, we might want to allow basic HTML or just simple text for now.
    // Let's render the text directly.

    return (
        <section style={{ padding: "120px 0", background: "var(--token-bg-page)" }}>
            <div className="container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                        background: "linear-gradient(135deg, #e0e0e0 0%, #ffffff 100%)", // Metallic/Cement gradient
                        width: 60, height: 60,
                        borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: 32,
                        boxShadow: "0 10px 20px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,1)", // 3D effect
                        border: "1px solid #fff"
                    }}
                >
                    <Quote size={20} color="#666" fill="#666" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                        fontWeight: 500,
                        lineHeight: 1.4,
                        color: "#6e6d6dff", /* Light grey base */
                        maxWidth: 880,
                        marginBottom: 48,
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.02em"
                    }}
                    dangerouslySetInnerHTML={{ __html: `"${founder.quote || "Building future-ready types."}"` }}
                />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                >
                    <div style={{
                        width: 100, height: 100, borderRadius: "50%",
                        background: "#ffffffff",
                        boxShadow: "0 8px 18px rgba(0, 0, 0, 0.32), 0 10px 15px -3px rgba(0,0,0,0.1)",
                        border: "2px solid #fff",
                        overflow: "hidden",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        {founder.image ? (
                            <img src={founder.image} alt={founder.name} style={{ width: "118%", height: "118%", objectFit: "contain" }} />
                        ) : (
                            <span style={{ fontWeight: 700, color: "#666" }}>{founder.name?.charAt(0)}</span>
                        )}
                    </div>
                    <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 22, fontWeight: 600, color: "#000" }}>{founder.name}</div>
                        {founder.role && <div style={{ fontSize: 14, color: "#666" }}>{founder.role}</div>}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
