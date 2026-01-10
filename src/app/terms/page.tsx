"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
    return (
        <main className="page-container">
            <div style={{ background: "var(--token-bg-page)", minHeight: "100vh" }}>

                {/* Header */}
                <section style={{ padding: "120px 24px 60px", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: 800, margin: "0 auto" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24, padding: "8px 16px", background: "#F3F3F3", borderRadius: 100, fontSize: 13, fontWeight: 700, border: "1px solid #fff" }}>
                            LEGAL AGREEMENT
                        </div>
                        <h1 style={{
                            fontSize: "clamp(2.5rem, 5vw, 4rem)",
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            lineHeight: 1,
                            marginBottom: 24,
                            color: "var(--foreground)"
                        }}>
                            Terms of Service
                        </h1>
                        <p style={{ fontSize: "1.2rem", color: "var(--token-fg-secondary)", maxWidth: 600, margin: "0 auto" }}>
                            Please read these terms carefully before using our services.
                        </p>
                    </div>
                </section>

                {/* Content */}
                <section style={{ padding: "0 24px 120px" }}>
                    <div className="cement-card" style={{ maxWidth: 900, margin: "0 auto", padding: "60px 40px", background: "#ffffff" }}>
                        <div style={{ maxWidth: 700, margin: "0 auto" }}>
                            <p style={{ marginBottom: 32, fontSize: "0.9rem", color: "#999", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>Last Updated: January 10, 2025</p>

                            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

                                <Section title="1. Agreement to Terms">
                                    <p>These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Analogy Intelligence ("we", "us", or "our"), concerning your access to and use of the Analogy website and services.</p>
                                </Section>

                                <Section title="2. Intellectual Property">
                                    <p>Unless otherwise indicated, the Site and our services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
                                </Section>

                                <Section title="3. User Representations">
                                    <p>By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Terms of Service.</p>
                                </Section>

                                <Section title="4. Prohibited Activities">
                                    <p>You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>
                                </Section>

                                <Section title="5. AI & Automation Services">
                                    <p>Our AI and automation services are provided "as is". While we strive for high accuracy and reliability, AI systems are probabilistic by nature and we cannot guarantee 100% accuracy in all outputs. You agree to human-in-the-loop verification for critical decision-making processes derived from our AI systems.</p>
                                </Section>

                                <Section title="6. Limitation of Liability">
                                    <p>In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site or services.</p>
                                </Section>

                                <Section title="7. Contact Us">
                                    <p>In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:</p>
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
