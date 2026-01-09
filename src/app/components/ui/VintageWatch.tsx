"use client";

import { motion } from "framer-motion";

export default function VintageWatch() {
    return (
        <div style={{ position: "absolute", top: "50%", right: "-10%", transform: "translateY(-50%)", zIndex: 0, opacity: 0.1, pointerEvents: "none" }}>
            <motion.svg
                width="800"
                height="1000"
                viewBox="0 0 500 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                initial={{ rotate: -15 }}
            >
                {/* Watch Body / Case */}
                <circle cx="250" cy="350" r="200" stroke="#c5a059" strokeWidth="4" />
                <circle cx="250" cy="350" r="190" stroke="#c5a059" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="250" cy="350" r="180" stroke="#c5a059" strokeWidth="2" />

                {/* Top Winder */}
                <rect x="230" y="110" width="40" height="40" rx="5" stroke="#c5a059" strokeWidth="2" />
                <rect x="235" y="115" width="30" height="30" rx="2" stroke="#c5a059" strokeWidth="1" />
                {/* Ring on top */}
                <path d="M210 110 Q250 50 290 110" stroke="#c5a059" strokeWidth="4" fill="none" />

                {/* Clock Face Details */}
                {[...Array(12)].map((_, i) => (
                    <line
                        key={i}
                        x1="250" y1="180"
                        x2="250" y2="200"
                        transform={`rotate(${i * 30} 250 350)`}
                        stroke="#c5a059"
                        strokeWidth="2"
                    />
                ))}

                {/* Hands */}
                {/* Hour Hand */}
                <motion.line
                    x1="250" y1="350"
                    x2="250" y2="250"
                    stroke="#c5a059"
                    strokeWidth="6"
                    strokeLinecap="round"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "250px", originY: "350px" }}
                />

                {/* Minute Hand */}
                <motion.line
                    x1="250" y1="350"
                    x2="250" y2="200"
                    stroke="#c5a059"
                    strokeWidth="4"
                    strokeLinecap="round"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ originX: "250px", originY: "350px" }}
                />

            </motion.svg>
        </div>
    );
}
