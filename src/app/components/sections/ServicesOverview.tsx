"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Globe, Rocket, Layers, Smartphone } from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: Globe,
        title: "Web Development",
        description: "High-performance websites built with Next.js and React. Fast, SEO-optimized, and beautiful.",
    },
    {
        icon: Smartphone,
        title: "App Development",
        description: "Native and cross-platform mobile apps that deliver seamless user experiences on iOS and Android.",
    },
    {
        icon: Cpu,
        title: "AI Solutions",
        description: "Custom AI integration, chatbots, and automation workflows to modernize your business operations.",
    },
    {
        icon: Layers,
        title: "SaaS Platforms",
        description: "Scalable software-as-a-service architectures designed for growth and reliability.",
    },
    {
        icon: Code,
        title: "Software Engineering",
        description: " robust backend systems and APIs tailored to your specific organizational needs.",
    },
    {
        icon: Rocket,
        title: "Digital Transformation",
        description: "End-to-end consulting to digitize your workflows and future-proof your tech stack.",
    }
];

export default function ServicesOverview() {
    return (
        <section style={{ padding: "120px 24px", background: "var(--token-bg-page)" }}>
            <div className="container" style={{ maxWidth: 1200, margin: "0 auto" }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 80 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{
                            display: "inline-flex", // changed from inline-block for flex centering
                            marginBottom: 32, // Increased margin
                        }}
                        className="cement-badge"
                    >
                        OUR SERVICES
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 600, marginBottom: 24, color: "#000", letterSpacing: "-0.02em" }}
                    >
                        Comprehensive digital <br />
                        <span style={{ color: "rgba(0,0,0,0.5)" }}>solutions for growth.</span>
                    </motion.h2>
                </div>

                {/* Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 32 }}>
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            style={{
                                background: "#fff",
                                padding: 40,
                                borderRadius: 24,
                                boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
                                border: "1px solid rgba(0,0,0,0.03)",
                                display: "flex",
                                flexDirection: "column",
                                gap: 20
                            }}
                        >
                            <div style={{
                                width: 56,
                                height: 56,
                                borderRadius: 16,
                                background: "#f5f5f5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#000"
                            }}>
                                <service.icon size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#000" }}>{service.title}</h3>
                                <p style={{ fontSize: 16, lineHeight: 1.6, color: "#666" }}>{service.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
