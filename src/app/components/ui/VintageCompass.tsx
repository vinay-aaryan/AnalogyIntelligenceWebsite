"use client";

import { motion } from "framer-motion";

export default function VintageCompass() {
    return (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 0, opacity: 0.15, pointerEvents: "none" }}>
            <motion.svg
                width="800"
                height="800"
                viewBox="0 0 800 800"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: 360 }}
                transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            >
                {/* Outer Ring */}
                <circle cx="400" cy="400" r="390" stroke="#c5a059" strokeWidth="2" strokeDasharray="10 10" />
                <circle cx="400" cy="400" r="370" stroke="#c5a059" strokeWidth="1" />

                {/* Roman Numerals Ring (Simulated with dashes) */}
                <motion.circle
                    cx="400" cy="400" r="350"
                    stroke="#c5a059"
                    strokeWidth="20"
                    strokeDasharray="2 60"
                    opacity="0.5"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "400px", originY: "400px" }}
                />

                {/* Inner Mechanics */}
                <circle cx="400" cy="400" r="200" stroke="#c5a059" strokeWidth="1" strokeOpacity="0.5" />
                <circle cx="400" cy="400" r="100" stroke="#c5a059" strokeWidth="1" strokeOpacity="0.8" />

                {/* Star/Compass Shape */}
                <path d="M400 50 L450 350 L750 400 L450 450 L400 750 L350 450 L50 400 L350 350 Z" stroke="#c5a059" strokeWidth="2" fill="none" />

            </motion.svg>
        </div>
    );
}
