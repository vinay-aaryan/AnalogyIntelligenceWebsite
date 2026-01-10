import "dotenv/config";
import mongoose from "mongoose";
import { Work } from "../models/Content";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable");
    process.exit(1);
}

const seedData = {
    title: "AI Financial Planning",
    slug: "ai-financial-planning",
    category: "AI Solutions",
    desc: "A revolutionary AI-driven platform for automated financial forecasting and personalized wealth management strategies.",
    challenge: "Traditional financial planning is slow, expensive, and manual. Advisors spend hours on data entry, and cookie-cutter strategies fail to address unique client goals. The client needed a way to democratize high-end financial intelligence.",
    solution: "We engineered a multi-agent AI system capable of ingesting diverse financial data in real-time. By leveraging Large Language Models (LLMs) and predictive analytics, the platform generates comprehensive, hyper-personalized financial roadmaps in seconds, not weeks.",
    results: "The platform reduced plan generation time by 98%, allowing advisors to serve 5x more clients. User engagement increased by 300% due to the interactive, conversational interface.",
    features: [
        "Real-time Portfolio Analysis",
        "Natural Language Querying",
        "Predictive Market Modeling",
        "Automated Risk Assessment",
        "Secure Data Integration"
    ],
    techStack: "Next.js, Python, TensorFlow, OpenAI GPT-4, MongoDB, AWS",
    visualUrl: "https://cdn.dribbble.com/users/3809633/screenshots/16287955/media/3c1d94358a9e6900f64c6778f5a2f55e.mp4", // Placeholder rich video
    featured: true,
    videoColor: "linear-gradient(45deg, #FFD700, #333)"
};

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log("Connected to DB");

        await Work.deleteMany({ slug: seedData.slug });
        await Work.create(seedData);

        console.log("Seed successful: Created Project 'AI Financial Planning'");
        process.exit(0);
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    }
}

seed();
