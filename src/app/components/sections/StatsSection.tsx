"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, suffix = "" }: { value: number, suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString() + suffix);

    useEffect(() => {
        if (isInView) {
            animate(count, value, { duration: 2.5, ease: "easeOut" });
        } else {
            count.set(0);
        }
    }, [isInView, count, value]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function StatsSection({ stats }: { stats: any[] }) {
    const items = stats && stats.length > 0 ? stats : [
        { id: 1, label: "Companies", value: 12, suffix: "+" },
        { id: 2, label: "Projects", value: 85, suffix: "+" },
        { id: 3, label: "Hours Saved", value: 1, suffix: "M+" }
    ];

    return (
        <section style={{ padding: "0 0 80px 0", background: "var(--token-bg-page)" }}>
            <div className="container">
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: 32,
                    background: "#F3F3F3", // Cement fill
                    borderRadius: 32,
                    padding: "60px 20px",
                    border: "1px solid #fff",
                    boxShadow: "0px 16px 20px -5px rgba(0,0,0,0.1)"
                }}>
                    {items.map((stat: any, i: number) => (
                        <div key={stat._id || stat.id || i} style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                            <h3 style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 700, color: "#000", fontFamily: "var(--font-heading)", lineHeight: 1 }}>
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p style={{ color: "var(--token-fg-secondary)", fontSize: 16, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
