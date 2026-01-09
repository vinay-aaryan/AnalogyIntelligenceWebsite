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

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    padding: "20px 0",
                    mixBlendMode: mobileMenuOpen ? "normal" : "difference",
                    color: "white"
                }}
            >
                <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Link href="/" style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.03em", position: "relative", zIndex: 102 }}>
                        Analogy
                    </Link>

                    {/* Desktop Menu */}
                    <div className="desktop-menu" style={{ display: "flex", gap: 40, alignItems: "center" }}>
                        {navLinks.map((link) => (
                            <Link key={link.path} href={link.path} style={{ fontSize: 15, fontWeight: 500, opacity: pathname === link.path ? 1 : 0.6, transition: "opacity 0.2s" }}>
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/consultation" style={{ padding: "12px 24px", background: "white", color: "black", borderRadius: 100, fontSize: 15, fontWeight: 600 }}>
                            Book Call
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", position: "relative", zIndex: 102 }}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.path}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.1 }}
                            >
                                <Link
                                    href={link.path}
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
                            <Link href="/consultation" style={{ padding: "16px 32px", background: "white", color: "black", borderRadius: 100, fontSize: 18, fontWeight: 600, display: "inline-block", marginTop: 20 }}>
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
