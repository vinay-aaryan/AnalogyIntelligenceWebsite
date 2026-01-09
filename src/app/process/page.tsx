"use client";

import { motion } from "framer-motion";
import { Search, Compass, Code2, TestTube2, Rocket, ArrowDown } from "lucide-react";

// --- Custom Stats / Visuals for Cards ---

const DiscoveryVisual = () => (
    <div style={{ position: "relative", width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)", overflow: "hidden" }}>
        {/* Radar/Search Animation */}
        <div style={{ position: "relative" }}>
            <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ position: "absolute", inset: -20, border: "1px solid #000", borderRadius: "50%" }}
            />
            <motion.div
                animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                style={{ position: "absolute", inset: -20, border: "1px solid #000", borderRadius: "50%" }}
            />
            <Search size={32} color="#000" strokeWidth={2.5} />
        </div>
        {/* Floating Data Points */}
        <motion.div
            animate={{ x: [20, 20, 20, 100], y: [-20, 20, -20, -50], opacity: [0, 1, 0, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ width: 8, height: 8, background: "#000", borderRadius: 2, position: "absolute" }}
        />
        <motion.div
            animate={{ x: [-20, -50, -30], y: [20, 50, -20], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            style={{ width: 6, height: 6, background: "#666", borderRadius: "50%", position: "absolute" }}
        />
    </div>
);

const StrategyVisual = () => (
    <div style={{ position: "relative", width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)", overflow: "hidden" }}>
        {/* Grid Background */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(#ddd 1px, transparent 1px)", backgroundSize: "20px 20px", opacity: 0.5 }} />

        {/* Cards moving / Flowchart */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 40, height: 50, background: "#000", borderRadius: 6, boxShadow: "0 4px 0 rgba(0,0,0,0.2)" }}
            />
            <div style={{ width: 20, height: 2, background: "#ccc" }} />
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 60, height: 70, background: "#fff", border: "2px solid #000", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <div style={{ width: 40, height: 2, background: "#000" }} />
            </motion.div>
            <div style={{ width: 20, height: 2, background: "#ccc" }} />
            <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: 40, height: 50, background: "#000", borderRadius: 6, boxShadow: "0 4px 0 rgba(0,0,0,0.2)" }}
            />
        </div>
    </div>
);

const DevelopmentVisual = () => (
    <div style={{ position: "relative", width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "#000", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ fontFamily: "monospace", fontSize: 12, color: "#0f0", padding: 20, width: "100%", opacity: 0.8 }}>
            <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 0.2, repeat: Infinity }}>&gt; git init</motion.div>
            <motion.div animate={{ opacity: [0, 1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>&gt; installing modules...</motion.div>
            <motion.div animate={{ x: [-5, 0] }} transition={{ duration: 0.1, repeat: Infinity }}>&gt; compiling... [OK]</motion.div>
            <div>&gt; deploying...</div>
        </div>
    </div>
);

const TestVisual = () => (
    <div style={{ position: "relative", width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)", overflow: "hidden" }}>
        {/* Checkmarks popping */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[1, 2, 3, 4].map(i => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
                    style={{ width: 40, height: 40, background: "#f0f0f0", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#000" }} />
                </motion.div>
            ))}
        </div>
    </div>
);

const LaunchVisual = () => (
    <div style={{ position: "relative", width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: 16, border: "1px solid rgba(0,0,0,0.05)", overflow: "hidden" }}>
        <motion.div
            animate={{ y: [20, -100] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeIn" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
            <Rocket size={32} color="#000" fill="#000" />
            <div style={{ width: 4, height: 40, background: "linear-gradient(to bottom, #000, transparent)", marginTop: -5 }} />
        </motion.div>
    </div>
);


const steps = [
    {
        num: "01",
        title: "Discovery",
        subtitle: "Understanding Your Vision",
        desc: "We start by diving deep into your business goals, pain points, and existing workflows. This is where we listen and map out the terrain.",
        icon: <Search size={24} color="#000" />,
        visual: <DiscoveryVisual />
    },
    {
        num: "02",
        title: "Strategy",
        subtitle: "Blueprinting the Solution",
        desc: "We design a comprehensive roadmap, selecting the right AI models and technologies. No guesswork—just a solid, actionable plan.",
        icon: <Compass size={24} color="#fff" />,
        visual: <StrategyVisual />
    },
    {
        num: "03",
        title: "Development",
        subtitle: "Building the Engine",
        desc: "Our engineers build your custom solution with clean, scalable code. We focus on performance, security, and future-proofing.",
        icon: <Code2 size={24} color="#000" />,
        visual: <DevelopmentVisual />
    },
    {
        num: "04",
        title: "Testing",
        subtitle: "Refining Perfection",
        desc: "Rigorous testing phases ensure reliability. We simulate real-world scenarios to catch edge cases before deployment.",
        icon: <TestTube2 size={24} color="#fff" />,
        visual: <TestVisual />
    },
    {
        num: "05",
        title: "Launch",
        subtitle: "Lift Off & Scale",
        desc: "We deploy your solution and monitor performance. But we don't stop there—we help you scale and optimize as you grow.",
        icon: <Rocket size={24} color="#000" />,
        visual: <LaunchVisual />
    }
];

export default function Process() {
    return (
        <main style={{ minHeight: "100vh", background: "var(--token-bg-page)", paddingTop: 140, paddingBottom: 120 }}>
            <div className="container" style={{ maxWidth: 1000 }}>

                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: 120 }}>
                    <div className="cement-badge" style={{ marginBottom: 24, fontSize: 12 }}>
                        <ArrowDown size={14} /> THE WORKFLOW
                    </div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, fontFamily: "var(--font-heading)", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 24 }}
                    >
                        From Plan to <br /> <span style={{ color: "rgba(0,0,0,0.3)" }}>Production.</span>
                    </motion.h1>
                    <p style={{ fontSize: 18, maxWidth: 500, margin: "0 auto", color: "var(--token-fg-secondary)" }}>
                        A transparent, step-by-step journey to building your customized AI solution.
                    </p>
                </div>

                {/* Vertical Timeline */}
                <div style={{ position: "relative", padding: "20px 0" }}>

                    {/* Central Line */}
                    {/* Central Line */}
                    <div className="timeline-center-line" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "rgba(0,0,0,0.06)", transform: "translateX(-50%)", zIndex: 0 }} />

                    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(40px, 8vw, 100px)" }}>
                        {steps.map((step, i) => {
                            const isEven = i % 2 === 1;
                            return (
                                <div key={i} className="timeline-wrapper" style={{ display: "flex", justifyContent: isEven ? "flex-start" : "flex-end", position: "relative", alignItems: "center" }}>

                                    {/* Desktop: Alternating Layout */}
                                    <style jsx>{`
                                        /* Default Mobile First */
                                        .step-card { width: 100%; position: relative; }
                                        .timeline-center-line { display: none; }
                                        .timeline-dot { display: none; }
                                        .timeline-wrapper { justify-content: flex-start; }

                                        /* Desktop Overrides */
                                        @media (min-width: 901px) {
                                            .step-card { width: 45%; }
                                            .timeline-center-line { display: block; }
                                            .timeline-dot { display: block; }
                                            /* Wrapper justification is handled by inline style conditional, which works for desktop */
                                        }
                                    `}</style>

                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className={`step-card ${isEven ? 'step-card-right' : 'step-card-left'}`}
                                        style={{
                                            position: "relative",
                                        }}
                                    >
                                        <div className="cement-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>

                                            {/* Visual Container (Top) */}
                                            <div style={{
                                                width: "100%",
                                                height: 220,
                                                background: "#fff", // contrast with cement card
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                borderBottom: "1px solid rgba(0,0,0,0.05)"
                                            }}>
                                                {step.visual}
                                            </div>

                                            {/* Content Container (Bottom) */}
                                            <div style={{ padding: 40 }}>
                                                <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
                                                    <span style={{
                                                        fontSize: 14,
                                                        fontWeight: 800,
                                                        color: "#fff",
                                                        background: "#000",
                                                        border: "1px solid #000",
                                                        padding: "4px 10px",
                                                        borderRadius: 100
                                                    }}>
                                                        {step.num}
                                                    </span>
                                                    <h3 style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-heading)", color: "#000", margin: 0 }}>
                                                        {step.title}
                                                    </h3>
                                                </div>

                                                <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "var(--token-fg-secondary)", marginBottom: 8, letterSpacing: "0.05em" }}>{step.subtitle}</h4>
                                                <p style={{ fontSize: 16, lineHeight: 1.6, color: "#555" }}>{step.desc}</p>
                                            </div>

                                        </div>
                                    </motion.div>

                                    {/* Central Dot */}
                                    <div className="timeline-dot" style={{
                                        position: "absolute",
                                        left: "50%",
                                        width: 16,
                                        height: 16,
                                        background: "#fff",
                                        border: "4px solid #000",
                                        borderRadius: "50%",
                                        transform: "translate(-50%, 0)",
                                        zIndex: 2,
                                        boxShadow: "0 0 0 4px var(--token-bg-page)" // Gap effect
                                    }} />

                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Final CTA Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    style={{ marginTop: 160, textAlign: "center" }}
                >
                    <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>Ready to start step 01?</h2>
                    <a href="/consultation" className="btn-cement-primary" style={{ display: "inline-flex", fontSize: 18 }}>
                        Book Strategy Call
                    </a>
                </motion.div>

            </div>
        </main>
    );
}
