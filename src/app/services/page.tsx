"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Brain,
    MessageSquare,
    Mic,
    Code,
    Terminal,
    Cloud,
    Globe,
    AppWindow,
    Smartphone,
    Monitor,
    Palette,
    CheckCircle2,
    Zap,
    ArrowRight
} from "lucide-react";

// --- Data ---
interface ServiceItem {
    id: string;
    title: string;
    tagline: string;
    fullDesc: string;
    icon: any;
    benefits: string[];
    color: string;
}

const servicesList: ServiceItem[] = [
    {
        id: "ai-automation",
        title: "AI Automation",
        tagline: "Streamline workflows & reduce manual effort.",
        fullDesc: "We design AI-powered automation tailored to your business workflows. Systems are built around your existing tools, ensuring smooth integration and measurable efficiency gains. By identifying bottlenecks and repetitive tasks, we deploy intelligent agents that handle the heavy lifting, freeing your team to focus on strategic initiatives.",
        icon: Brain,
        color: "#FF5F56",
        benefits: [
            "Reduces repetitive manual tasks",
            "Improves operational efficiency",
            "Minimizes human errors",
            "Scales processes instantly"
        ]
    },
    {
        id: "ai-chatbot",
        title: "AI Chatbot",
        tagline: "Intelligent bots for support and lead gen.",
        fullDesc: "We build intelligent AI chatbots customized to your business goals. These chatbots analyze user intent, qualify potential clients, and route high-value leads automatically. Unlike standard rule-based bots, our AI models learn from interactions, constantly improving their accuracy and helpfulness over time.",
        icon: MessageSquare,
        color: "#FFBD2E",
        benefits: [
            "Generates and qualifies leads",
            "Provides instant 24/7 support",
            "Improves conversion rates",
            "Reduces support costs"
        ]
    },
    {
        id: "ai-voice",
        title: "AI Voice Agent",
        tagline: "Human-like voice interactions at scale.",
        fullDesc: "Handling inbound and outbound calls, lead qualification, and appointment booking with unprecedented realism. Voice interactions are analyzed in real-time to extract intent and sentiment insights, allowing for dynamic conversation flows that feel natural and engaging to your customers.",
        icon: Mic,
        color: "#27C93F",
        benefits: [
            "Automates calling operations",
            "Improves lead engagement",
            "Collects actionable data",
            "Reduces call center costs"
        ]
    },
    {
        id: "ai-dev",
        title: "Custom AI Solutions",
        tagline: "Predictive analytics & decision support.",
        fullDesc: "We build custom AI solutions based on your proprietary data. From predictive analytics to recommendation systems, our AI architectures are designed to solve your specific business problems. We turn raw data into actionable intelligence that drives smarter decision-making.",
        icon: Code,
        color: "#60A5FA",
        benefits: [
            "Data-driven decision making",
            "Improves personalization",
            "Optimizes complex processes",
            "Long-term competitive advantage"
        ]
    },
    {
        id: "software",
        title: "Custom Software",
        tagline: "Tailored software for your internal operations.",
        fullDesc: "Organize workflows, reduce dependency on spreadsheets, and centralize business data into a single, robust system tailored to your needs. We build secure, scalable, and intuitive platforms that grow with your company, ensuring you never outgrow your infrastructure.",
        icon: Terminal,
        color: "#818CF8",
        benefits: [
            "Organizes disjointed workflows",
            "Reduces manual tracking",
            "Improves team collaboration",
            "Increases transparency"
        ]
    },
    {
        id: "saas",
        title: "SaaS Development",
        tagline: "Scalable products built for growth.",
        fullDesc: "We build scalable SaaS products based on your business model. The architecture is designed for high performance, bank-grade security, and future expansion. Whether you are launching a startup or enterprise tool, we ensure your product is market-ready and robust.",
        icon: Cloud,
        color: "#C084FC",
        benefits: [
            "Recurring revenue models",
            "Enables easy scaling",
            "Centralized management",
            "Global accessibility"
        ]
    },
    {
        id: "website",
        title: "Website Development",
        tagline: "High-performance sites that convert.",
        fullDesc: "Business-focused websites designed around your goals—lead generation, brand positioning, or conversions. Structured to support your marketing funnel with blindingly fast load times and SEO-first architecture.",
        icon: Globe,
        color: "#F472B6",
        benefits: [
            "Builds trust and credibility",
            "Captures and converts leads",
            "Supports marketing campaigns",
            "Professional brand image"
        ]
    },
    {
        id: "uiux",
        title: "UI/UX Design",
        tagline: "Intuitive designs that drive adoption.",
        fullDesc: "User interfaces based on behavior and business objectives. We ensure clarity, usability, and smooth interaction across all digital products. Great design isn't just about looks—it's about how it works and how it makes your users feel.",
        icon: Palette,
        color: "#FBBF24",
        benefits: [
            "Improves user adoption",
            "Reduces drop-offs",
            "Enhances satisfaction",
            "Increases conversions"
        ]
    }
];

export default function Services() {
    return (
        <main className="page-container">
            <div style={{ background: "var(--token-bg-page)", minHeight: "100vh" }}>

                {/* Global Header */}
                <section style={{ padding: "120px 24px 80px", textAlign: "center" }}>
                    <div className="container" style={{ maxWidth: 1000, margin: "0 auto" }}>
                        <div className="cement-badge" style={{ marginBottom: 24 }}>
                            <Zap size={14} fill="#000" /> OUR EXPERTISE
                        </div>
                        <h1 style={{
                            fontSize: "clamp(3rem, 6vw, 5rem)",
                            fontWeight: 800,
                            letterSpacing: "-0.02em",
                            color: "var(--foreground)",
                            lineHeight: 1,
                            marginBottom: 24
                        }}>
                            Comprehensive <span style={{ color: "rgba(0,0,0,0.4)" }}>Solutions</span>
                        </h1>
                        <p style={{ fontSize: "1.2rem", color: "var(--token-fg-secondary)", maxWidth: 600, margin: "0 auto" }}>
                            We build autonomous AI systems and scalable software infrastructure for forward-thinking companies.
                        </p>
                    </div>
                </section>

                <div className="container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 120px" }}>
                    {servicesList.map((service, index) => (
                        <ArticleSection key={service.id} service={service} index={index} />
                    ))}
                </div>

            </div>
        </main>
    );
}

function ArticleSection({ service, index }: { service: ServiceItem, index: number }) {
    return (
        <article style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 40,
            paddingTop: 80,
            paddingBottom: 80,
            borderTop: index === 0 ? "none" : "1px solid rgba(0,0,0,0.1)"
        }} className="service-section">

            {/* Left Column: Sticky Header */}
            <div className="sticky-col">
                <div className="sticky-content cement-card" style={{ padding: 32 }}>
                    <div style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background: service.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 24,
                        boxShadow: `0 8px 16px ${service.color}40`
                    }}>
                        <service.icon size={28} color="#fff" />
                    </div>

                    <h2 style={{
                        fontSize: "clamp(2rem, 3vw, 2.8rem)",
                        fontWeight: 700,
                        letterSpacing: "-0.03em",
                        lineHeight: 1.1,
                        marginBottom: 16,
                        fontFamily: "var(--font-heading)"
                    }}>
                        {service.title}
                    </h2>

                    <p style={{
                        fontSize: "1.1rem",
                        fontWeight: 500,
                        color: "var(--token-fg-secondary)",
                        maxWidth: 340,
                        marginBottom: 32
                    }}>
                        {service.tagline}
                    </p>

                    <Link href="/consultation" className="btn-base btn-cement-primary">
                        Discuss with Us <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            {/* Right Column: Scrolling Content */}
            <div className="content-col">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <p style={{
                        fontSize: "1.25rem",
                        lineHeight: 1.7,
                        color: "var(--foreground)",
                        marginBottom: 40,
                        fontWeight: 400
                    }}>
                        {service.fullDesc}
                    </p>

                    <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#999", marginBottom: 24 }}>
                        Key Benefits
                    </h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {service.benefits.map((benefit, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                <div style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    background: "#fff",
                                    border: "1px solid rgba(0,0,0,0.1)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0
                                }}>
                                    <CheckCircle2 size={16} color="var(--foreground)" />
                                </div>
                                <span style={{ fontSize: 16, fontWeight: 500, color: "var(--token-fg-secondary)" }}>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                /* Desktop Layout: Grid */
                @media (min-width: 968px) {
                    .service-section {
                        grid-template-columns: 0.8fr 1.2fr !important; /* 40/60 Split */
                        align-items: start;
                        min-height: 80vh; /* Ensure enough height to see sticky effect */
                    }

                    .sticky-col {
                        position: relative;
                        height: 100%; 
                    }

                    .sticky-content {
                        position: sticky;
                        top: 140px; /* Offset from top */
                    }

                    .content-col {
                        padding-top: 120px; /* Push content down slightly for visual balance */
                        padding-left: 60px;
                    }
                }

                /* Mobile Layout: Stacked */
                @media (max-width: 967px) {
                    .sticky-content {
                        position: relative;
                        top: 0;
                        margin-bottom: 32px;
                    }
                    
                    .content-col {
                        padding-top: 0;
                        padding-left: 0;
                    }
                }
            `}</style>
        </article>
    );
}
