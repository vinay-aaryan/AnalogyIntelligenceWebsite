"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StarBackground from "../ui/StarBackground";
import { useRef } from "react";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={ref}
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
                paddingTop: 80,
                background: "radial-gradient(circle at 50% 50%, var(--token-bg-surface) 0%, var(--token-bg-page) 100%)"
            }}
        >
            {/* Star Background */}
            <StarBackground />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                    y,
                    opacity,
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >


                {/* Heading */}
                <h1 style={{
                    fontSize: "clamp(3.5rem, 8vw, 7rem)",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: "-0.04em",
                    color: "var(--foreground)",
                    maxWidth: 1100,
                    margin: "0 auto 24px",
                    fontFamily: "var(--font-heading)",
                    textShadow: "0 0 12px rgba(255, 255, 255, 0.6)"
                }}>
                    Analogy Intelligence
                    <span style={{
                        display: "block",
                        fontSize: "0.25em",
                        lineHeight: 1,
                        marginTop: -13,
                        textAlign: "right",
                        color: "var(--token-fg-secondary)",
                        fontWeight: 600,
                        transform: "translateX(35px)",
                        letterSpacing: "0em"
                    }}>
                        Simplifies Complexes
                    </span>
                </h1>

                {/* Subheading */}
                <p style={{
                    fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                    color: "var(--foreground)", // Darker for contrast
                    maxWidth: 640,
                    margin: "0 auto 48px",
                    lineHeight: 1.6,
                    fontWeight: 500,
                    textShadow: "0 0 12px rgba(255, 255, 255, 0.6)" // Halo to separate from dark nebula
                }}>
                    We build autonomous AI systems and scalable software infrastructure for forward-thinking companies.
                </p>

                {/* CTA */}
                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                    <Link
                        href="/work"
                        className="btn-base btn-cement-primary"
                    >
                        Our Services
                    </Link>
                    <Link
                        href="/consultation"
                        className="btn-base btn-cement-secondary"
                    >
                        Book a Call
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
