"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Services", path: "/services" },
    { name: "Process", path: "/process" },
    { name: "Work", path: "/work" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="glass-panel"
            style={{
                position: "fixed",
                top: 24,
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 8px 8px 32px", // Adjusted padding
                borderRadius: 100,
                width: "auto",
                minWidth: 500, // Slightly wider
                maxWidth: "90%",
                background: "rgba(255, 255, 255, 0.65)", // More opaque for "cement" feel but still glass
                backdropFilter: "blur(20px) saturate(180%)", // Stronger blur
                border: "1px solid rgba(255, 255, 255, 0.8)", // Crisp border
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)", // Deeper shadow
            }}
        >
            {/* Logo */}
            <Link
                href="/"
                onClick={() => pathname === "/" && window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{ fontSize: 18, fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.03em", paddingRight: 32, fontFamily: "var(--font-heading)" }}
            >
                Analogy
            </Link>

            {/* Links */}
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                {navItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            style={{
                                position: "relative",
                                padding: "8px 20px",
                                fontSize: 14,
                                fontWeight: 500,
                                color: isActive ? "var(--foreground)" : "var(--token-fg-secondary)",
                                transition: "color 0.2s",
                                zIndex: 1,
                            }}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="navPill"
                                    style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "var(--token-bg-surface)",
                                        borderRadius: 100,
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                        zIndex: -1,
                                    }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* CTA */}
            <div style={{ paddingLeft: 12 }}>
                <Link
                    href="/consultation"
                    className="btn-base btn-cement-primary"
                    style={{ fontSize: 14, padding: "10px 24px" }} // Override padding/font for navbar sizing if needed
                >
                    Book Call
                </Link>
            </div>
        </motion.nav>
    );
}
