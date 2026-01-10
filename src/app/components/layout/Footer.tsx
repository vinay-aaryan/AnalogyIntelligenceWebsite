"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Github, Mail, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith("/admin")) return null;
    return <FooterContent />;
}

function FooterContent() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    });

    // Parallax effect: Content moves slower than container
    const y = useTransform(scrollYProgress, [0, 1], [-200, 0]);

    return (
        <footer ref={container} style={{ background: "#050505", color: "#ffffff", position: "relative", overflow: "hidden" }}>

            {/* Background Texture (Optional subtle noise or grid) */}
            <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(#333 1px, transparent 1px)", backgroundSize: "30px 30px", pointerEvents: "none" }} />

            <motion.div style={{ y, padding: "125px 0 40px" }}>
                <div className="container" style={{ position: "relative", zIndex: 1 }}>

                    {/* Massive CTA Section */}
                    <div style={{ marginBottom: -35, display: "flex", flexDirection: "column", gap: 50 }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{
                                fontSize: "clamp(3rem, 8vw, 8rem)",
                                fontWeight: 800,
                                lineHeight: 0.9,
                                color: "#f1f1f1ff",
                                letterSpacing: "-0.03em",
                                fontFamily: "var(--font-heading)"
                            }}
                        >
                            LET'S BUILD <br /> THE <span style={{ color: "#9f9f9fff" }}>FUTURE</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <Link href="/contact" style={{ display: "inline-flex", textDecoration: "none" }}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 16,
                                    background: "#fff",
                                    color: "#000",
                                    padding: "24px 48px",
                                    borderRadius: 100,
                                    fontSize: 20,
                                    fontWeight: 700,
                                    transition: "transform 0.2s"
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    Start a Project <ArrowUpRight size={24} />
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 80 }} />

                    {/* Links Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 60, marginBottom: 80 }}>

                        {/* Column 1: Brand */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            <h3 style={{ fontSize: 24, color: "#fff", fontWeight: 800 }}>Analogy Intelligence</h3>
                            <p style={{ color: "#888", lineHeight: 1.6, maxWidth: 250 }}>
                                Crafting digital experiences that merge logic with creativity.
                            </p>
                            <div style={{ display: "flex", gap: 16 }}>
                                {[
                                    { icon: <Twitter size={20} />, href: "https://x.com/analogyAI" },
                                    { icon: <Instagram size={20} />, href: "https://www.instagram.com/betweenpauses.aaryan?igsh=MW9yODBubXVjMXRkaA%3D%3D&utm_source=qr" },
                                    { icon: <Linkedin size={20} />, href: "https://linkedin.com/company/analogy-intelligence" },
                                    { icon: <Github size={20} />, href: "https://github.com/vinay-aaryan" }
                                ].map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            width: 40, height: 40,
                                            borderRadius: "50%",
                                            background: "#1a1a1a",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            cursor: "pointer",
                                            color: "#fff",
                                            transition: "background 0.2s"
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
                                        onMouseLeave={(e) => (e.currentTarget.style.background = "#1a1a1a")}
                                    >
                                        {item.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Column 2: Sitemaps */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            <h4 style={{ fontSize: 14, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>SITEMAP</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {["Home", "Work", "Services", "About", "Process"].map(link => (
                                    <Link key={link} href={`/${link === "Home" ? "" : link.toLowerCase()}`} className="footer-link" style={{ fontSize: 16, color: "#888", transition: "color 0.2s" }}>
                                        {link}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Contact */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                            <h4 style={{ fontSize: 14, fontWeight: 700, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em" }}>CONTACT</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                <a href="mailto:aaryanpatel20.08.2004@gmail.com" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 16, color: "#fff" }}>
                                    <Mail size={18} color="#888" /> hello@analogy.com
                                </a>
                                <div style={{ display: "flex", alignItems: "start", gap: 12, fontSize: 16, color: "#888", lineHeight: 1.5 }}>
                                    <MapPin size={18} style={{ marginTop: 4, flexShrink: 0 }} />
                                    <span>India<br /></span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
                        <p style={{ fontSize: 14, color: "#444" }}>© 2025 Analogy Intelligence</p>
                        <div style={{ display: "flex", gap: 32 }}>
                            <Link href="/privacy" style={{ fontSize: 14, color: "#444" }}>Privacy Policy</Link>
                            <Link href="/terms" style={{ fontSize: 14, color: "#444" }}>Terms</Link>
                        </div>
                    </div>

                </div>

            </motion.div >

            <style jsx global>{`
                .footer-link:hover {
                    color: #fff !important;
                }
            `}</style>
        </footer >
    );
}
