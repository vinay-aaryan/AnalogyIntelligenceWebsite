import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Product, Work, TeamMember, Testimonial, TrustedCompany, Stat } from '@/models/Content';

export async function GET() {
    await dbConnect();

    // 1. Products / Selected Work
    await Product.deleteMany({});
    await Product.create([
        {
            title: "Analogy",
            category: "Design System",
            desc: "A comprehensive design system for modern web applications.",
            visualUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
            tags: "UI/UX,React,Design"
        },
        {
            title: "Orbai",
            category: "AI Platform",
            desc: "Conversational AI platform for enterprise customer support.",
            visualUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
            tags: "AI,Machine Learning,Python"
        },
        {
            title: "Luma",
            category: "Fintech App",
            desc: "Next-generation banking application with predictive analytics.",
            visualUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
            tags: "Mobile,Finance,Flutter"
        }
    ]);

    // 2. Work (Detailed Projects)
    await Work.deleteMany({});
    await Work.create([
        {
            title: "Nebula",
            category: "Space Tech",
            desc: "Telemetry dashboard for satellite constellations.",
            visualUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"
        },
        {
            title: "Flow",
            category: "Productivity",
            desc: "Task management for high-velocity teams.",
            visualUrl: "https://images.unsplash.com/photo-1506784365377-90f93a3dac21?q=80&w=2670&auto=format&fit=crop"
        }
    ]);

    // 3. Team
    await TeamMember.deleteMany({});
    await TeamMember.create([
        {
            name: "Vinay",
            role: "Founder & Lead",
            bio: "Visionary designer and engineer with a passion for impossible interfaces.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop"
        },
        {
            name: "Sarah",
            role: "Head of AI",
            bio: "Expert in LLMs and agentic workflows.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop"
        }
    ]);

    // 4. Testimonials
    await Testimonial.deleteMany({});
    await Testimonial.create([
        {
            text: "Analogy transformed our digital presence. They didn't just build a website, they crafted an experience.",
            author: "Elena Fisher",
            role: "CMO, TechNova",
            visualUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
        },
        {
            text: "The speed and polish of their work is unmatched. An absolute pleasure to partner with.",
            author: "David Chang",
            role: "Founder, Streamline",
            visualUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop"
        }
    ]);

    // 5. Trusted Companies
    await TrustedCompany.deleteMany({});
    await TrustedCompany.create([
        { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
        { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" }
    ]);

    // 6. Stats
    await Stat.deleteMany({});
    await Stat.create([
        { label: "Projects", value: 150, suffix: "+" },
        { label: "Awards", value: 12, suffix: "" },
        { label: "Revenue", value: 10, suffix: "M+" }
    ]);

    return NextResponse.json({ message: "Database seeded successfully" });
}
