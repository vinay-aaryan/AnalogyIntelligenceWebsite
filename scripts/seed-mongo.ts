
import mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { Product, Work, TeamMember, Testimonial, TrustedCompany, Stat } from '../src/models/Content';

// Load .env.local explicitly
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI not found in environment variables.");
    process.exit(1);
}

const dataPath = path.join(process.cwd(), 'src', 'data', 'db.json');
const rawData = fs.readFileSync(dataPath, 'utf-8');
const data = JSON.parse(rawData);

async function seed() {
    console.log("🌱 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI!);
    console.log("✅ Connected.");

    console.log("🧹 Clearing existing data...");
    await Promise.all([
        Product.deleteMany({}),
        Work.deleteMany({}),
        TeamMember.deleteMany({}),
        Testimonial.deleteMany({}),
        TrustedCompany.deleteMany({}),
        Stat.deleteMany({})
    ]);

    console.log("🚀 Seeding data...");

    // Transform products (tags handling)
    const products = data.products.map((p: any) => ({
        ...p,
        tags: Array.isArray(p.tags) ? p.tags.join(',') : p.tags, // Convert array tags to string
        createdAt: new Date(),
        updatedAt: new Date()
    }));
    if (products.length) await Product.insertMany(products);
    console.log(` - Inserted ${products.length} Products`);

    // Transform work
    const work = data.work.map((w: any) => ({
        ...w,
        createdAt: new Date(),
        updatedAt: new Date()
    }));
    if (work.length) await Work.insertMany(work);
    console.log(` - Inserted ${work.length} Work items`);

    // Team
    const team = data.team.map((t: any) => ({
        ...t,
        createdAt: new Date(),
        updatedAt: new Date()
    }));
    if (team.length) await TeamMember.insertMany(team);
    console.log(` - Inserted ${team.length} Team members`);

    // Testimonials
    const testimonials = data.testimonials.map((t: any) => ({
        ...t,
        createdAt: new Date(),
        updatedAt: new Date()
    }));
    if (testimonials.length) await Testimonial.insertMany(testimonials);
    console.log(` - Inserted ${testimonials.length} Testimonials`);

    // TrustedBy
    const trustedBy = data.trustedBy.map((t: any) => ({
        ...t,
        createdAt: new Date(),
        updatedAt: new Date()
    }));
    if (trustedBy.length) await TrustedCompany.insertMany(trustedBy);
    console.log(` - Inserted ${trustedBy.length} Trusted Companies`);

    // Stats
    const stats = data.stats.map((s: any) => ({
        ...s,
        createdAt: new Date(),
        updatedAt: new Date()
    }));
    if (stats.length) await Stat.insertMany(stats);
    console.log(` - Inserted ${stats.length} Stats`);

    console.log("✨ Seeding completed successfully.");
    await mongoose.disconnect();
}

seed().catch((err) => {
    console.error("❌ Seeding failed:", err);
    mongoose.disconnect();
    process.exit(1);
});
