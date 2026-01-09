"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const logos = [
    "Webflow", "Relume", "Webflow", "Relume", "Webflow", "Relume"
];

export default function FinalCTA() {
    return (
        <section style={{ padding: "120px 0 80px", background: "var(--token-bg-page)", textAlign: "center" }}>
            <div className="container" style={{ maxWidth: 800 }}>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    style={{
                        fontSize: "clamp(2.5rem, 5vw, 4rem)",
                        fontWeight: 700,
                        color: "var(--foreground)",
                        marginBottom: 24,
                        fontFamily: "var(--font-heading)"
                    }}
                >
                    Ready to move forward
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ fontSize: 18, color: "var(--token-fg-secondary)", marginBottom: 40, maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.6 }}
                >
                    Let's talk about what's holding your business back. We provide <strong>free consultancy</strong> to help you push your revenue with cutting-edge AI automations and technology.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ display: "flex", gap: 16, justifyContent: "center" }}
                >
                    <Link
                        href="/consultation"
                        className="btn-base btn-cement-primary"
                    >
                        Consult
                    </Link>
                    <Link
                        href="/services"
                        className="btn-base btn-cement-secondary"
                    >
                        Learn
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
