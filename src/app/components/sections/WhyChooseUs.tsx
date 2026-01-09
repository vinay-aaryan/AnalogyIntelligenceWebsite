"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Layers, User, Zap, Settings, TrendingUp, DollarSign, Activity, Cpu } from "lucide-react";
import { useRef } from "react";

// --- Visual Components ---

const GaugeVisual = () => (
    <div style={{ position: "relative", width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Gauge Background */}
        <div style={{
            width: 140, height: 140,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.05), 0 10px 20px rgba(0,0,0,0.05)", // Soft pressed look + shadow
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            {/* Ticks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                <div key={i} style={{
                    position: "absolute",
                    width: 4, height: 4,
                    background: "#ddd",
                    borderRadius: "50%",
                    transform: `rotate(${deg}deg) translate(55px)`
                }} />
            ))}

            {/* Needle */}
            <motion.div
                animate={{ rotate: [0, 60, 20, 90, 45] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    width: 60, height: 6,
                    background: "#000",
                    borderRadius: 4,
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transformOrigin: "left center", // Pivot from center
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}
            />

            {/* Center Cap */}
            <div style={{ width: 16, height: 16, background: "#333", borderRadius: "50%", position: "absolute", zIndex: 2 }} />
        </div>
    </div>
);

const BarChartVisual = () => (
    <div style={{ position: "relative", width: "100%", height: 160, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 12, paddingBottom: 20 }}>
        {/* Bars */}
        {[40, 70, 100, 60, 80].map((h, i) => (
            <motion.div
                key={i}
                initial={{ height: 20 }}
                whileInView={{ height: h }}
                transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                style={{
                    width: 24,
                    background: "#fff",
                    borderRadius: 6,
                    boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
                }}
            />
        ))}

        {/* Floating Labels */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            style={{
                position: "absolute", top: 20, left: "20%",
                background: "#f0f0f0", padding: "4px 8px", borderRadius: 100,
                fontSize: 10, fontWeight: 700, color: "#333",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
        >
            80% Automation
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            style={{
                position: "absolute", bottom: 60, right: "10%",
                background: "#f0f0f0", padding: "4px 8px", borderRadius: 100,
                fontSize: 10, fontWeight: 700, color: "#333",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)"
            }}
        >
            10% Cost
        </motion.div>

        <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%) rotate(-90deg)", fontSize: 10, fontWeight: 700, color: "#999", letterSpacing: "0.1em" }}>AFTER</div>
    </div>
);

const SyncVisual = () => (
    <div style={{ position: "relative", width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Rings */}
        <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.05)" }} />
        <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.05)" }} />

        {/* Center Hub */}
        <div style={{
            width: 64, height: 64, background: "#fff", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 16px rgba(0,0,0,0.1)", zIndex: 10
        }}>
            <Layers size={28} color="#000" />
        </div>

        {/* Orbiting Avatars */}
        {[0, 120, 240].map((deg, i) => (
            <motion.div
                key={i}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: i * -5 }}
                style={{ position: "absolute", width: 120, height: 120 }} // Orbit path container
            >
                <motion.div
                    style={{
                        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                        width: 32, height: 32, background: "#fff", borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.08)"
                    }}
                >
                    <User size={16} color="#333" />
                </motion.div>
            </motion.div>
        ))}
    </div>
);

const benefits = [
    {
        title: "Real-Time Analytics",
        description: "Stay ahead with accurate, real-time performance tracking",
        visual: <GaugeVisual />
    },
    {
        title: "AI-Driven Growth",
        description: "Make smarter moves with accurate, real-time business insights.",
        visual: <BarChartVisual />
    },
    {
        title: "Sync in real time",
        description: "connect with your team instantly to track progress and updates",
        visual: <SyncVisual />
    }
];

const marqueeItems = [
    { text: "Scalable Solutions", icon: <TrendingUp size={16} /> },
    { text: "Personalized Experiences", icon: <User size={16} /> },
    { text: "Cost Effective", icon: <DollarSign size={16} /> },
    { text: "Real-Time Insights", icon: <Activity size={16} /> },
    { text: "Automation", icon: <Settings size={16} /> },
    { text: "Data-Driven Decisions", icon: <TrendingUp size={16} /> },
    { text: "Faster Innovation", icon: <Zap size={16} /> },
    { text: "Virtual Assistance", icon: <Cpu size={16} /> }
];



function BenefitCard({ benefit, i }: { benefit: typeof benefits[0], i: number }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Middle card moves slightly differently for staggered feel
    const y = useTransform(scrollYProgress, [0, 1], [0, i % 2 !== 0 ? -40 : 0]);

    return (
        <motion.div
            ref={ref}
            style={{
                y,
                padding: "40px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 24,
                minHeight: 380,
                justifyContent: "space-between"
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="cement-card"
        >
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {benefit.visual}
            </div>

            <div style={{ textAlign: "left" }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#000", marginBottom: 12, fontFamily: "var(--font-heading)" }}>
                    {benefit.title}
                </h3>
                <p style={{ fontSize: 16, color: "#555", lineHeight: 1.5 }}>
                    {benefit.description}
                </p>
            </div>
        </motion.div>
    );
}

export default function WhyChooseUs() {
    return (
        <section style={{ padding: "120px 0 0", background: "var(--token-bg-page)", overflow: "hidden" }}>
            <div className="container" style={{ marginBottom: 100 }}>

                {/* Header */}
                <div style={{ marginBottom: 60, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div className="cement-badge" style={{ marginBottom: 24 }}>
                        <Zap size={14} fill="#000" /> BENEFITS
                    </div>
                    <h2 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 700, color: "#000", fontFamily: "var(--font-heading)", marginBottom: 16 }}>
                        Why Choose Us
                    </h2>
                    <p style={{ fontSize: 18, color: "#666" }}>
                        Partner with an AI agency delivering smart solutions.
                    </p>
                </div>

                {/* 3-Column Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
                    {benefits.map((benefit, i) => (
                        <BenefitCard key={i} benefit={benefit} i={i} />
                    ))}
                </div>
            </div>

            {/* Infinite Marquee */}
            <div style={{
                width: "calc(100% - 48px)", // Margin from left and right (24px each side)
                maxWidth: 1200, // Optional: Limit max width for better aesthetic on large screens
                margin: "0 auto", // Center it
                paddingBottom: 80,
                overflow: "hidden",
                whiteSpace: "nowrap",
                position: "relative",
                maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
            }}>
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ display: "inline-flex", gap: 32 }}
                >
                    {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => ( // Repeat heavily for smoothness
                        <div key={i} style={{
                            display: "flex", alignItems: "center", gap: 10,
                            background: "#F3F3F3", // Cement bg
                            border: "1px solid #ffffff", // Cement border
                            boxShadow: "0 4px 6px rgba(0,0,0,0.05), 0 10px 15px -3px rgba(0,0,0,0.1)", // Cement shadow
                            padding: "12px 24px",
                            borderRadius: 100,
                            flexShrink: 0
                        }}>
                            {item.icon}
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{item.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
