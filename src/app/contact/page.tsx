"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import ContactForm from "./ContactForm";

export default function Contact() {
    return (
        <main style={{ minHeight: "100vh", background: "var(--token-bg-page)", paddingTop: 140, paddingBottom: 120 }}>
            <div className="container" style={{ maxWidth: 1200 }}>

                {/* Header */}
                <div style={{ marginBottom: 60 }}>
                    <h1 style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 800, fontFamily: "var(--font-heading)", marginBottom: 24, lineHeight: 1 }}>
                        Get in Touch
                    </h1>
                    <p style={{ fontSize: 18, color: "var(--token-fg-secondary)", maxWidth: 500 }}>
                        Have a project in mind? Let's discuss how we can help you build the future.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 60, alignItems: "center" }}>

                    {/* Left: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <ContactForm />
                    </motion.div>

                    {/* Right: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        style={{ display: "flex", flexDirection: "column", gap: 40 }}
                    >

                        <div className="cement-card" style={{ padding: 40, background: "#fff", display: "flex", flexDirection: "column", gap: 32 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Mail size={20} color="#000" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Email</h3>
                                    <a href="mailto:hello@analogy.co" style={{ fontSize: 16, color: "#666" }}>hello@analogy.co</a>
                                </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Phone size={20} color="#000" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Phone</h3>
                                    <a href="tel:+15550000000" style={{ fontSize: 16, color: "#666" }}>+1 (555) 000-0000</a>
                                </div>
                            </div>

                            <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <MapPin size={20} color="#000" />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>Office</h3>
                                    <p style={{ fontSize: 16, color: "#666", lineHeight: 1.5 }}>
                                        123 Innovation Dr,<br />Tech City, TC 94043
                                    </p>
                                </div>
                            </div>
                        </div>

                    </motion.div>

                </div>
            </div>
        </main>
    );
}
