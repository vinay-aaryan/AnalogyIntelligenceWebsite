"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, ReactNode } from "react";

// --- Bento Grid Container ---
export function BentoGrid({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={className}
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Responsive base
                gap: "24px",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 24px",
            }}
        >
            {children}
        </div>
    );
}

// --- Bento Grid Item with 3D Tilt ---
export function BentoItem({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
}: {
    children: ReactNode;
    className?: string;
    colSpan?: number;
    rowSpan?: number;
}) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the mouse movement
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const rotateX = useSpring(useMotionValue(0), springConfig);
    const rotateY = useSpring(useMotionValue(0), springConfig);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;

        // Calculate rotation (max 15 degrees)
        const rotateXValue = ((y - height / 2) / height) * -10; // Inverted Y for natural tilt
        const rotateYValue = ((x - width / 2) / width) * 10;

        rotateX.set(rotateXValue);
        rotateY.set(rotateYValue);

        // For spotlight/gradient effect
        mouseX.set(x);
        mouseY.set(y);
    }

    function handleMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
        mouseX.set(0);
        mouseY.set(0);
    }

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
                perspective: "1000px",
                transformStyle: "preserve-3d",
            }}
            className={className}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                    height: "100%",
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.03)", // Very subtle glass
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "24px",
                    overflow: "hidden", // Keep content inside
                    position: "relative",
                    boxShadow: "0 4px 24px -1px rgba(0,0,0,0.2)",
                }}
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -5px rgba(0,0,0,0.4)" }}
            >
                {/* Mouse Spotlight Effect */}
                <motion.div
                    style={{
                        background: useMotionTemplate`radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.06),
              transparent 80%
            )`,
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        pointerEvents: "none",
                    }}
                />

                <div style={{ position: "relative", zIndex: 2, height: "100%" }}>
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
}
