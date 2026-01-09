"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isMobile, setIsMobile] = useState(true); // Default to true to prevent hydration mismatch flash
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Check if mobile or touch device
        const checkMobile = () => {
            const isTouch = window.matchMedia("(pointer: coarse)").matches;
            const isSmallScreen = window.innerWidth < 1024;
            setIsMobile(isTouch || isSmallScreen);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the cursor
    const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        if (isMobile) return;

        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 16); // Center offset for 32px ring
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === "A" || target.tagName === "BUTTON" || target.closest('a') || target.closest('button')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [mouseX, mouseY, isMobile]);

    if (isMobile) return null;

    return (
        <>
            {/* Ring */}
            <motion.div
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    translateX: cursorX,
                    translateY: cursorY,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    border: "1px solid #000",
                    pointerEvents: "none",
                    zIndex: 9999,
                }}
                animate={{
                    scale: isHovered ? 2.5 : 1,
                    backgroundColor: isHovered ? "rgba(0,0,0,0.05)" : "transparent",
                }}
                transition={{ duration: 0.2 }}
            />
            {/* Center dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: mouseX,
                    y: mouseY,
                    translateX: 12, // Offset to center 8px dot within 32px coord system (-16 offset) -> -4 real offset
                    translateY: 12,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#000',
                    pointerEvents: 'none',
                    zIndex: 9999,
                }}
            />
        </>
    );
}
