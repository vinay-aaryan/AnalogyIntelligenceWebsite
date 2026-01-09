"use client";

import { motion } from "framer-motion";

export default function TrustedBy({ companies }: { companies: any[] }) {
    if (!companies || companies.length === 0) return null;

    return (
        <section style={{ padding: "80px 0", background: "var(--token-bg-page)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
            <div className="container" style={{ textAlign: "center" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--token-fg-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 40 }}>
                    Trusted by Forward-Thinking Businesses
                </p>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: 40 }}>
                    {companies.map((company, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                opacity: 0.6,
                                filter: "grayscale(100%)",
                                transition: "all 0.3s"
                            }}
                            whileHover={{ opacity: 1, filter: "grayscale(0%)", scale: 1.05 }}
                        >
                            {/* If logo is present, show image, else text fallback */}
                            {company.logo ? (
                                <img src={company.logo} alt={company.name} style={{ height: 32, objectFit: "contain" }} />
                            ) : (
                                <span style={{ fontSize: 20, fontWeight: 800, color: "#000" }}>{company.name}</span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
