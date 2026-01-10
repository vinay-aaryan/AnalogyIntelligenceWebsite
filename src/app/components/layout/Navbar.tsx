"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isAdmin = pathname?.startsWith("/admin");
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    if (isAdmin) return null;

    const navLinks = [
        { name: "Work", path: "/work" },
        { name: "Services", path: "/services" },
        { name: "About", path: "/about" },
        { name: "Process", path: "/process" },
    ];

    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        setMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: "fixed",
                    top: 24, // Floating from top
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    display: "flex",
                    justifyContent: "center",
                    pointerEvents: "none" // Let clicks pass through outside the pill
                }}
            >
                {/* Glass Pill Container */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 8px 8px 24px",
                    background: "rgba(23, 23, 23, 0)", // Darker semi-transparent background
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: 100,
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
                    width: "min(90%, 800px)", // Responsive width
                    pointerEvents: "auto", // Re-enable clicks
                }}>
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={handleLogoClick}
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginRight: 40
                        }}
                    >
                        <div style={{
                            width: 32,
                            height: 32,
                            background: "linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <img src="/logo.svg" alt="" style={{ height: 30, width: 30, borderRadius: "50%", objectFit: "cover" }} />
                        </div>
                        Analogy
                    </Link>

                    {/* Desktop Menu */}
                    <div className="desktop-menu" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ display: "flex", background: "rgba(93, 93, 93, 0.06)", borderRadius: 100, padding: 4 }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    style={{
                                        position: "relative",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: pathname === link.path ? "black" : "rgba(0, 0, 0, 0.7)",
                                        padding: "8px 20px",
                                        borderRadius: 100,
                                        transition: "all 0.3s ease",
                                        background: pathname === link.path ? "white" : "transparent",
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <Link href="/consultation" className="group" style={{ marginLeft: 8 }}>
                            <div style={{
                                padding: "12px 24px",
                                background: "black",
                                color: "white",
                                borderRadius: 100,
                                fontSize: 14,
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                transition: "transform 0.2s ease"
                            }}>
                                Book Call
                                <span style={{ padding: "2px 6px", background: "white", color: "black", borderRadius: 100, fontSize: 10 }}>→</span>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            background: "rgba(255,255,255,0.1)",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            padding: 12,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "#050505",
                            zIndex: 101, // Behind the navbar text/toggle but above everything else
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 32
                        }}
                    >
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                            style={{
                                position: "absolute",
                                top: 24,
                                right: 24,
                                background: "none",
                                border: "none",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            <X size={32} />
                        </button>

                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.path}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    href={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{ fontSize: 40, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link
                                href="/consultation"
                                onClick={() => setMobileMenuOpen(false)}
                                style={{ padding: "16px 32px", background: "white", color: "black", borderRadius: 100, fontSize: 18, fontWeight: 600, display: "inline-block", marginTop: 20 }}
                            >
                                Book Consultation
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .mobile-toggle {
                    display: none !important;
                }
                @media (max-width: 1024px) {
                    .desktop-menu {
                        display: none !important;
                    }
                    .mobile-toggle {
                        display: block !important;
                    }
                }
            `}</style>
        </>
    );
}
