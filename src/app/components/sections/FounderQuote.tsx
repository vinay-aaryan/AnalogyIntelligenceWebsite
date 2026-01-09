"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function FounderQuote() {
    return (
        <section style={{ padding: "120px 0", background: "var(--token-bg-page)" }}>
            <div className="container" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{
                        background: "linear-gradient(135deg, #e0e0e0 0%, #ffffff 100%)", // Metallic/Cement gradient
                        width: 80, height: 80,
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
                        color: "#6e6d6dff", /* Light grey base for unhighlighted text */
                        maxWidth: 880,
                        marginBottom: 48,
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.02em"
                    }}
                >
                    "Our focus isn’t just <span style={{ color: "#000", fontWeight: 500 }}>building software</span>. It’s <span style={{ color: "#000", fontWeight: 500 }}>understanding business problems deeply</span> and delivering solutions that <span style={{ color: "#000", fontWeight: 500 }}>actually work</span> in the real world."
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{ display: "flex", alignItems: "center", gap: 16 }}
                >
                    <div style={{
                        width: 56, height: 56, borderRadius: "50%",
                        background: "#ddd",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.5)",
                        border: "2px solid #fff",
                        overflow: "hidden"
                    }}>
                        {/* Placeholder for founder image */}
                        <img src="https://framerusercontent.com/images/8rS6PqQ59H0w6q0.jpg" alt="Founder" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div style={{ textAlign: "left" }}>
                        <div style={{ fontSize: 22, fontWeight: 600, color: "#000" }}>Vinay</div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
