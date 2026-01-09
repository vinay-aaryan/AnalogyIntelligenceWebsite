"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageSquare, Mic, GitBranch, Layout, Code, LineChart, Terminal, CheckCircle2, Layers, Bot, Github, Gamepad2, HardDrive, Zap } from "lucide-react";
import { useRef } from "react";

// Stronger, sharper shadow for "cement" look


const services = [
    {
        title: "AI Strategy Consulting",
        desc: "Get expert guidance to implement AI solutions that drive business growth",
        icon: <LineChart size={28} color="#000" />,
        span: "col-span-1",
        visual: (
            <div style={{ position: "relative", width: "100%", height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Central Hub */}
                <div
                    style={{ width: 60, height: 60, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 10, position: "relative" }}
                >
                    <div style={{ width: 24, height: 24, background: "#000", borderRadius: 4, transform: "rotate(45deg)" }} />
                </div>

                {/* Satellite 1 */}
                <motion.div
                    style={{ position: "absolute", top: 30, left: 40, width: 44, height: 44, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", zIndex: 5 }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <LineChart size={18} color="#333" />
                </motion.div>

                {/* Satellite 2 */}
                <motion.div
                    style={{ position: "absolute", bottom: 40, right: 40, width: 36, height: 36, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", zIndex: 5 }}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <div style={{ width: 12, height: 12, borderRadius: "50%", border: "2px solid #000" }} />
                </motion.div>

                {/* Connections - SVG lines fixed z-index/positioning */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
                    <line x1="62" y1="52" x2="50%" y2="50%" stroke="#ccc" strokeWidth="2" />
                    <line x1="calc(100% - 58px)" y1="calc(100% - 58px)" x2="50%" y2="50%" stroke="#ccc" strokeWidth="2" />
                </svg>
            </div>
        )
    },
    {
        title: "Custom Software Development",
        desc: "Custom software development for your business.",
        icon: <Terminal size={28} color="#000" />,
        span: "col-span-2",
        visual: (
            <div style={{ position: "relative", width: "100%", height: 180, display: "flex", alignItems: "center", justifyContent: "center", gap: 32 }}>
                {/* Code Window */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    style={{ background: "#fff", padding: 24, borderRadius: 24, boxShadow: "0 15px 35px rgba(0,0,0,0.1)", width: 320, display: "flex", flexDirection: "column", gap: 16 }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 16, borderBottom: "1px solid #f0f0f0" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
                            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, fontFamily: "monospace", fontSize: 12, color: "#333" }}>
                        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>&gt; initializing_build...</motion.div>
                        <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>&gt; optimizing_assets...</motion.div>

                        {/* Typing Animation Container */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                            gap: 24
                        }}>
                            <span style={{ marginRight: 8 }}>&gt;</span>
                            <motion.div
                                animate={{ width: ["0%", "100%", "100%", "0%"], opacity: [1, 1, 0, 0] }} // Type -> Wait -> FadeOut -> Reset
                                transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.8, 1] }}
                                style={{ overflow: "hidden", whiteSpace: "nowrap", display: "inline-block", verticalAlign: "bottom", maxWidth: "100%" }}
                            >
                                deployed_successfully
                            </motion.div>
                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                style={{ width: 8, height: 14, background: "#000", marginLeft: 4, flexShrink: 0 }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Floating 'Success' Badge */}
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ padding: "12px 24px", background: "#000", borderRadius: 100, boxShadow: "0 10px 20px rgba(0,0,0,0.15)", fontWeight: 700, fontSize: 14, color: "#fff", position: "absolute", right: 20, top: 40, border: "2px solid #fff" }}
                >
                    v1.0.0
                </motion.div>
            </div>
        )
    },
    {
        title: "AI-Powered Chatbots",
        desc: "We develop AI-driven chatbots with advanced cognitive technologies.",
        icon: <MessageSquare size={28} color="#000" />,
        span: "col-span-2",
        visual: (
            <div style={{ position: "relative", width: "100%", height: 180, display: "flex", alignItems: "center", justifyContent: "center", paddingRight: 0 }}>

                {/* Chat Bubble Interface - Width locked */}
                <div style={{ width: "100%", maxWidth: 450, display: "flex", flexDirection: "column", gap: 14, padding: "0 20px" }}>
                    {/* User Message (Right) */}
                    <motion.div
                        animate={{ opacity: [0, 1, 1, 1, 0], y: [10, 0, 0, 0, -10] }}
                        transition={{ duration: 6, repeat: Infinity, times: [0, 0.1, 0.85, 0.95, 1] }}
                        style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-end", marginLeft: "auto" }} // Forced alignment
                    >
                        <div style={{ background: "#fff", padding: "14px 24px", borderRadius: "20px 20px 4px 20px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: 14, fontWeight: 500, color: "#000" }}>
                            Set up a Zoom with Emily at 10 AM.
                        </div>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", flexShrink: 0 }}>
                            <div style={{ width: 14, height: 14, background: "#000", borderRadius: "50% 50% 0 0" }} />
                        </div>
                    </motion.div>

                    {/* Bot Reply (Left) */}
                    <motion.div
                        animate={{ opacity: [0, 0, 1, 1, 0], y: [10, 10, 0, 0, -10] }}
                        transition={{ duration: 6, repeat: Infinity, times: [0, 0.25, 0.35, 0.95, 1] }}
                        style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-start", marginRight: "auto" }} // Forced alignment
                    >
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", flexShrink: 0 }}>
                            <MessageSquare size={18} color="#fff" />
                        </div>
                        <div style={{ background: "#fff", padding: "14px 24px", borderRadius: "20px 20px 20px 4px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: 14, fontWeight: 500, color: "#000", border: "1px solid rgba(0,0,0,0.05)" }}>
                            Scheduling now...
                        </div>
                    </motion.div>

                    {/* New Bot Confirmation (Left) */}
                    <motion.div
                        animate={{ opacity: [0, 0, 0, 1, 0], y: [10, 10, 10, 0, -10] }}
                        transition={{ duration: 6, repeat: Infinity, times: [0, 0.5, 0.6, 0.95, 1] }}
                        style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-start", marginRight: "auto" }}
                    >
                        <div style={{ width: 36, height: 36, flexShrink: 0 }} />
                        <div style={{ background: "#fff", padding: "14px 24px", borderRadius: "20px 20px 20px 4px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", fontSize: 14, fontWeight: 500, color: "#000", border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 8 }}>
                            <CheckCircle2 size={16} color="green" /> Yes, scheduled.
                        </div>
                    </motion.div>
                </div>

            </div>
        )
    },
    {
        title: "Automated Workflows",
        desc: "Automate workflows to streamline tasks.",
        icon: <GitBranch size={28} color="#000" />,
        span: "col-span-1",
        visual: (
            <div style={{ position: "relative", width: "100%", height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Central Hub - Layers */}
                <motion.div
                    style={{
                        width: 80,
                        height: 80,
                        background: "#fff",
                        borderRadius: 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
                        zIndex: 10,
                        position: "relative"
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Layers size={40} color="#000" strokeWidth={1.5} />
                </motion.div>

                {/* Satellite: OpenAI (Bot) - Top Left */}
                <motion.div
                    style={{ position: "absolute", top: 25, left: "20%", width: 44, height: 44, background: "#fff", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.08)", zIndex: 5 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Bot size={22} color="#000" />
                </motion.div>

                {/* Satellite: Discord (Gamepad2) - Left */}
                <motion.div
                    style={{ position: "absolute", bottom: 40, left: "15%", width: 48, height: 48, background: "#fff", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.08)", zIndex: 6 }}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                    <Gamepad2 size={24} color="#000" />
                </motion.div>

                {/* Satellite: Github - Top Right */}
                <motion.div
                    style={{ position: "absolute", top: 30, right: "15%", width: 40, height: 40, background: "#fff", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.08)", zIndex: 5 }}
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                    <Github size={20} color="#000" />
                </motion.div>

                {/* Satellite: Drive (HardDrive) - Bottom Right */}
                <motion.div
                    style={{ position: "absolute", bottom: 20, right: "25%", width: 46, height: 46, background: "#fff", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 16px rgba(0,0,0,0.08)", zIndex: 7 }}
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                    <HardDrive size={22} color="#000" />
                </motion.div>
            </div>
        )
    },
    {
        title: "Website Development",
        desc: "High-performance, visually stunning web experiences.",
        icon: <Code size={28} color="#000" />,
        span: "col-span-1",
        visual: (
            <div style={{ position: "relative", width: "100%", height: 180, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.div
                    style={{ width: 140, height: 100, background: "#fff", borderRadius: 16, boxShadow: "0 15px 30px rgba(0,0,0,0.12)", padding: 12, display: "flex", flexDirection: "column", gap: 8 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <div style={{ display: "flex", gap: 4 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f56" }} />
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffbd2e" }} />
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#27c93f" }} />
                    </div>
                    <div style={{ flex: 1, background: "#f5f5f5", borderRadius: 4 }} />
                </motion.div>
            </div>
        )
    },
    {
        title: "Voice Agents",
        desc: "Human-like voice AI interactions.",
        icon: <Mic size={28} color="#000" />,
        span: "col-span-1",
        visual: (
            <div style={{ position: "relative", width: "100%", height: 180, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                {[1, 2, 3, 4, 3, 2, 1].map((h, i) => (
                    <motion.div
                        key={i}
                        animate={{ height: [12 * h, 24 * h, 12 * h] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                        style={{ width: 6, background: "#000", borderRadius: 10 }}
                    />
                ))}
            </div>
        )
    }
];


function ServiceCard({ service, i }: { service: typeof services[0], i: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Parallax effect for the visual graphic
    const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            style={{
                gridColumn: service.span === "col-span-2" ? "span 2" : "span 1",
                height: "100%",
                minHeight: 380,
            }}
            className={`${service.span === "col-span-2" ? "bento-card-wide" : "bento-card"} cement-card`}
        >
            <div style={{ flex: 1, minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center", background: "#F3F3F3", position: "relative", overflow: "hidden" }}>
                <motion.div style={{ y, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {service.visual}
                </motion.div>
            </div>

            <div style={{ padding: 40, paddingTop: 10 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-heading)", color: "#000", marginBottom: 12 }}>
                    {service.title}
                </h3>
                <p style={{ fontSize: 16, color: "#555", lineHeight: 1.5, marginBottom: 0 }}>
                    {service.desc}
                </p>
            </div>
        </motion.div>
    );
}

export default function DetailedServices() {
    return (
        <section style={{ padding: "120px 0", background: "var(--token-bg-page)" }}>
            <div className="container" style={{ padding: "0 24px" }}>

                <div style={{ marginBottom: 80, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div className="cement-badge" style={{ marginBottom: 24 }}>
                        <Zap size={14} fill="#000" /> SERVICES
                    </div>
                    <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#000", fontFamily: "var(--font-heading)", marginBottom: 16, lineHeight: 1.1 }}>
                        Our AI-Driven and Software Services
                    </h2>
                    <p style={{ fontSize: 18, color: "#666", maxWidth: 600, margin: "0 auto" }}>
                        Leverage AI features that boost performance to your business
                    </p>
                </div>

                {/* Bento Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 24,
                    gridAutoRows: "auto"
                }}>
                    {services.map((service, i) => (
                        <ServiceCard key={i} service={service} i={i} />
                    ))}
                </div>

                {/* CSS for Grid Responsiveness */}
                <style jsx global>{`
            @media (max-width: 968px) {
                .bento-card-wide, .bento-card {
                    grid-column: span 3 !important;
                }
            }
            @media (max-width: 640px) {
                div[style*="grid-template-columns"] {
                    display: flex !important;
                    flex-direction: column !important;
                }
                .bento-card-wide, .bento-card {
                    width: 100% !important;
                }
            }
        `}</style>
            </div>
        </section >
    );
}
