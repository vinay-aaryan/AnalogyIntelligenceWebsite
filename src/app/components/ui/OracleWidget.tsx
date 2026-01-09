"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";

export default function OracleWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        try {
            await fetch("/api/enquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: "Anonymous Oracle User",
                    email: "anonymous@oracle.widget",
                    subject: "Oracle Widget Message",
                    message: message,
                    status: "new"
                })
            });
            setSent(true);
            setTimeout(() => {
                setSent(false);
                setIsOpen(false);
                setMessage("");
            }, 2000);
        } catch (err) {
            console.error("Oracle Failed", err);
        }
    };

    return (
        <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 50 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        style={{
                            marginBottom: 16,
                            background: "rgba(10, 10, 10, 0.8)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid var(--color-gold-muted)",
                            borderRadius: 16,
                            padding: 20,
                            width: 300,
                            boxShadow: "0 0 20px rgba(197, 160, 89, 0.1)",
                        }}
                    >
                        {!sent ? (
                            <>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                                    <h4 style={{ fontSize: 14, color: "var(--color-gold-bright)" }}>Oracle</h4>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        style={{ background: "none", border: "none", color: "var(--color-starlight)", cursor: "pointer" }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <p style={{ fontSize: 14, marginBottom: 12, opacity: 0.8 }}>What challenge are you solving today?</p>
                                <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Tell us..."
                                        style={{
                                            flex: 1,
                                            background: "rgba(255, 255, 255, 0.05)",
                                            border: "1px solid rgba(255, 255, 255, 0.1)",
                                            borderRadius: 8,
                                            padding: "8px 12px",
                                            color: "white",
                                            fontSize: 14,
                                            outline: "none",
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        style={{
                                            background: "var(--color-gold-muted)",
                                            border: "none",
                                            borderRadius: 8,
                                            width: 36,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "black",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Send size={16} />
                                    </button>
                                </form>
                            </>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ textAlign: "center", padding: "10px 0" }}
                            >
                                <p style={{ color: "var(--color-gold-bright)", fontSize: 14 }}>Message received in the cosmos.</p>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--color-gold-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 0 20px rgba(197, 160, 89, 0.3)",
                    position: "relative",
                    zIndex: 51,
                }}
            >
                <MessageSquare size={24} color="#0a0a0a" />

                {/* Pulse effect */}
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        top: 0, left: 0, right: 0, bottom: 0,
                        borderRadius: "50%",
                        border: "1px solid var(--color-gold-muted)",
                        zIndex: -1,
                    }}
                />
            </motion.button>
        </div>
    );
}
