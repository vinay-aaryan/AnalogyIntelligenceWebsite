"use client";

import { motion } from "framer-motion";

export default function JupiterPlanet() {
    return (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 240, height: 240, borderRadius: "50%", zIndex: 0 }}>
            {/* Planet sphere with gradient */}
            <div style={{
                width: "100%", height: "100%", borderRadius: "50%",
                background: "radial-gradient(circle at 30% 30%, #d8ca9d, #a57c52, #5e4335, #2a1d18)",
                boxShadow: "inset -20px -20px 60px rgba(0,0,0,0.8), 0 0 50px rgba(197, 160, 89, 0.2)"
            }} />

            {/* Atmopshere bands (CSS patterns) */}
            <div style={{
                position: "absolute", inset: 0, borderRadius: "50%", opacity: 0.6,
                background: `
                repeating-linear-gradient(
                    0deg,
                    transparent 0,
                    transparent 10%,
                    rgba(94, 67, 53, 0.3) 10%,
                    rgba(94, 67, 53, 0.3) 15%,
                    transparent 20%
                )
            `,
                mixBlendMode: "overlay"
            }} />

            {/* The Great Red Spot simulation */}
            <div style={{
                position: "absolute",
                top: "60%", left: "30%",
                width: 50, height: 30,
                background: "rgba(168, 62, 36, 0.6)",
                borderRadius: "50%",
                filter: "blur(4px)",
                mixBlendMode: "multiply",
                transform: "rotate(-10deg)"
            }} />

            {/* Inner glow */}
            <div style={{ position: "absolute", inset: -10, borderRadius: "50%", boxShadow: "inset 10px 10px 40px rgba(255,255,255,0.1)" }} />
        </div>
    );
}
