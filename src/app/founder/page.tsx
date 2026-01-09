"use client";

import PageWrapper from "../components/layout/PageWrapper";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Founder() {
    return (
        <PageWrapper className="page-container">
            <section style={{ maxWidth: 1000, margin: "0 auto", padding: "140px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h5 style={{ color: "var(--color-gold-muted)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>The Tech Cartographer</h5>
                    <h1 style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 800, marginBottom: 32, lineHeight: 1.1 }}>
                        Vinay Patel.<br /><span style={{ opacity: 0.5 }}>Your Guide to Simple Tech.</span>
                    </h1>
                    <p style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.8)", marginBottom: 32 }}>
                        Vinay Patel is a technologist with a passion for simplifying complexities. With a background in software engineering and design, he founded Analogy to bridge the gap between innovative ideas and practical digital solutions.
                        <br /><br />
                        Vinay's philosophy centers on creating technology that serves people, not the other way around. From conceptualizing unique AI tools to overseeing comprehensive digital transformations, Vinay leads with a calm, strategic approach.
                    </p>
                    <Link
                        href="/contact"
                        style={{
                            display: "inline-block",
                            padding: "16px 32px",
                            background: "var(--color-gold-muted)",
                            color: "#0a0a0a",
                            borderRadius: 100,
                            fontWeight: 600,
                        }}
                    >
                        Schedule a Call
                    </Link>
                </motion.div>

                {/* Visual / Image Placeholder */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        aspectRatio: "1",
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 30% 30%, #333, #000)",
                        border: "1px solid var(--color-gold-muted)",
                        position: "relative",
                        display: "grid",
                        placeItems: "center"
                    }}
                >
                    <div style={{ position: "absolute", inset: -20, border: "1px solid rgba(197, 160, 89, 0.2)", borderRadius: "50%" }} />
                    <div style={{ position: "absolute", inset: -40, border: "1px dashed rgba(197, 160, 89, 0.1)", borderRadius: "50%" }} />

                    <span style={{ color: "var(--color-gold-muted)", opacity: 0.5 }}>[Founder Image Placeholder]</span>
                </motion.div>

            </section>
        </PageWrapper>
    );
}
