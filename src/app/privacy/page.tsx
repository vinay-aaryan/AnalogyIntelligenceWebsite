"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <main className="page-container">
            <div style={{ background: "var(--token-bg-page)", minHeight: "100vh" }}>

                {/* Header */}
                <section style={{ padding: "120px 24px 60px", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: 800, margin: "0 auto" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, padding: "8px 16px", background: "#F3F3F3", borderRadius: 100, fontSize: 13, fontWeight: 700, border: "1px solid #fff" }}>
                            LEGAL IMPERATIVES
                        </div>
                        <h1 style={{
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            lineHeight: 1,
                            marginBottom: 24,
                            color: "var(--foreground)"
                        }}>
                            Privacy Policy
                        </h1>
                        <p style={{ fontSize: "1.2rem", color: "var(--token-fg-secondary)", maxWidth: 600, margin: "0 auto" }}>
                            We take your privacy seriously. This document clearly states how we collect, use, and protect your data.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section style={{ padding: "0 24px 120px" }}>
                    <div className="cement-card" style={{ maxWidth: 900, margin: "0 auto", padding: "60px 40px", background: "#ffffff" }}>
                        <div style={{ maxWidth: 700, margin: "0 auto" }}>
                            <p style={{ marginBottom: 32, fontSize: "0.9rem", color: "#999", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>Last Updated: January 10, 2025</p>

                            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

                                <Section title="1. Introduction">
                                    <p>Welcome to Analogy Intelligence ("Analogy", "we", "our"). We strictly respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
                                </Section>

                                <Section title="2. Information We Collect">
                                    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                                    <ul style={{ listStyle: "disc", paddingLeft: 20, marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                                        <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                        <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                                        <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
                                    </ul>
                                </Section>

                                <Section title="3. How We Use Your Data">
                                    <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                                    <ul style={{ listStyle: "disc", paddingLeft: 20, marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                                        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                                        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                                        <li>Where we need to comply with a legal or regulatory obligation.</li>
                                    </ul>
                                </Section>

                                <Section title="4. Intelligent Systems & Data">
                                    <p>As an AI consultancy, we may process data provided by you to train specific models or automate workflows. We strictly adhere to Non-Disclosure Agreements (NDAs) and ensure that your proprietary data is never used to train our general public models without your explicit written consent.</p>
                                </Section>

                                <Section title="5. Data Security">
                                    <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
                                </Section>

                                <Section title="6. Contact Us">
                                    <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
                                    <p style={{ marginTop: 16, fontWeight: 600 }}>aaryanpatel20.08.2004@gmail.com</p>
                                </Section>

                            </div>

                            <div style={{ marginTop: 60, height: 1, background: "#eee", width: "100%" }} />

                            <div style={{ marginTop: 40 }}>
                                <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#000" }}>
                                    <ArrowLeft size={16} /> Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 16, letterSpacing: "-0.02em" }}>{title}</h2>
            <div style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#555" }}>
                {children}
            </div>
        </div>
    );
}
