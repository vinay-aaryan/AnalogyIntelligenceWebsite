"use client";

import { motion } from "framer-motion";
import MediaRenderer from "@/components/ui/MediaRenderer";

export default function AboutHero({ trustedBy }: { trustedBy: any[] }) {
    // Use passed data or empty array
    const logos = trustedBy && trustedBy.length > 0 ? trustedBy : [];

    return (
        <section style={{ padding: "120px 20px 80px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center" }}
            >
                {/* Badge */}
                <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "8px 16px",
                    background: "#F3F3F3",
                    borderRadius: 8, // Sharp
                    marginBottom: 32,
                    border: "1px solid #ffffff",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#333", letterSpacing: "0.02em", textTransform: "uppercase" }}>About Analogy</span>
                </div>

                {/* Heading */}
                <h1 style={{
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    marginBottom: 24,
                    color: "var(--foreground)",
                    letterSpacing: "-0.02em"
                }}>
                    Empowering Business with<br />Autonomous Intelligence
                </h1>

                {/* Subheading */}
                <p style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
                    color: "var(--token-fg-secondary)",
                    maxWidth: 600,
                    lineHeight: 1.6,
                    marginBottom: 60
                }}>
                    We bridge the gap between complex AI technology and practical business growth, building systems that work for you.
                </p>

                {/* Logo Cloud Placeholder */}
                {/* Infinite Marquee of Logos */}
                <div style={{ width: "100%", maxWidth: 1200, marginTop: 40 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--token-fg-tertiary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 32 }}>
                        Trusted by Forward-Thinking Businesses
                    </p>

                    {logos.length > 0 ? (
                        <div style={{
                            width: "100%",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            position: "relative",
                            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                            paddingBottom: 20
                        }}>

                            <div className="animate-marquee" style={{ paddingRight: 32 }}>
                                {/* Duplicate 30 times to ensure seamless infinite scroll even on wide screens and few logos */}
                                {Array(30).fill(logos).flat().map((item, i) => (
                                    <div key={i} style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        background: "#F3F3F3", // Cement bg
                                        border: "1px solid #ffffff", // Cement border
                                        boxShadow: "0 4px 6px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.1)", // Cement shadow
                                        padding: "12px 24px",
                                        borderRadius: 100,
                                        flexShrink: 0
                                    }}>
                                        {item.logo ? (
                                            <MediaRenderer
                                                src={item.logo}
                                                alt={item.name}
                                                width={100} // Sufficient resolution
                                                height={40}
                                                style={{ height: 20, width: "auto", objectFit: "contain" }}
                                            />
                                        ) : null}
                                        <span style={{ fontSize: 14, fontWeight: 700, color: "#333" }}>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ padding: 20, opacity: 0.5 }}>
                            No partners added yet.
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
}
