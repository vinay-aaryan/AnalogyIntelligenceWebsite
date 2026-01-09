"use client";

import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Link from "next/link";

export default function AboutTeam({ team }: { team: any[] }) {
    if (!team) return null;
    return (
        <section style={{ padding: "80px 20px 120px" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                <div style={{ textAlign: "center", marginBottom: 60 }}>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700 }}>Meet the Minds</h2>
                    <p style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "var(--token-fg-secondary)", marginTop: 16 }}>
                        The visionaries leading Analogy into the future.
                    </p>
                </div>

                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 32 }}>
                    {team.map((member) => (
                        <motion.div
                            key={member._id}
                            whileHover={{ y: -5 }}
                            className="cement-card"
                            style={{
                                width: "100%",
                                maxWidth: 350,
                                padding: 24,
                                alignItems: "center",
                                textAlign: "center"
                            }}
                        >
                            <div style={{
                                width: 120, height: 120,
                                borderRadius: "50%",
                                background: "#ddd",
                                marginBottom: 24,
                                overflow: "hidden",
                                backgroundColor: "#f0f0f0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 40,
                                fontWeight: 700,
                                color: "#ccc"
                            }}>
                                {member.image ?
                                    <img src={member.image} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                    : member.role}
                            </div>

                            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{member.name}</h3>

                            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--token-fg-tertiary)", marginBottom: 24 }}>
                                {member.bio}
                            </p>

                            <Link href="https://linkedin.com" target="_blank" style={{
                                padding: 10,
                                borderRadius: "50%",
                                background: "var(--token-bg-page)",
                                border: "1px solid var(--token-border)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--foreground)",
                                transition: "background 0.2s"
                            }}>
                                <Linkedin size={18} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
