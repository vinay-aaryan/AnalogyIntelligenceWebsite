import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// Initialize Adapter
const dbUrl = process.env.DATABASE_URL?.replace('file:', '') || './dev.db';
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

const dbPath = path.join(process.cwd(), 'src/data/db.json');

async function main() {
    const rawData = fs.readFileSync(dbPath, 'utf8');
    const data = JSON.parse(rawData);

    // Seed Products
    if (data.products) {
        for (const p of data.products) {
            await prisma.product.create({
                data: {
                    title: p.title,
                    category: p.category,
                    desc: p.desc,
                    tags: Array.isArray(p.tags) ? p.tags.join(',') : p.tags || '',
                    visualType: p.visualType,
                    visualUrl: p.visualUrl,
                    youtubeUrl: p.youtubeUrl,
                }
            });
        }
        console.log(`Seeded ${data.products.length} products`);
    }

    // Seed Work
    if (data.work) {
        for (const w of data.work) {
            await prisma.work.create({
                data: {
                    title: w.title,
                    category: w.category,
                    desc: w.desc,
                    visualUrl: w.visualUrl,
                    youtubeUrl: w.youtubeUrl,
                    videoColor: w.videoColor,
                }
            });
        }
        console.log(`Seeded ${data.work.length} work items`);
    }

    // Seed Team
    if (data.team) {
        for (const t of data.team) {
            await prisma.teamMember.create({
                data: {
                    name: t.name,
                    role: t.role,
                    bio: t.bio,
                    image: t.image,
                }
            });
        }
        console.log(`Seeded ${data.team.length} team members`);
    }

    // Seed Testimonials
    if (data.testimonials) {
        for (const t of data.testimonials) {
            await prisma.testimonial.create({
                data: {
                    text: t.text,
                    author: t.author,
                    role: t.role,
                    visualUrl: t.visualUrl,
                    layout: t.layout || 'standard',
                }
            });
        }
        console.log(`Seeded ${data.testimonials.length} testimonials`);
    }

    // Seed TrustedBy
    if (data.trustedBy) {
        for (const c of data.trustedBy) {
            await prisma.trustedCompany.create({
                data: {
                    name: c.name,
                    logo: c.logo,
                }
            });
        }
        console.log(`Seeded ${data.trustedBy.length} companies`);
    }

    // Seed Stats
    if (data.stats) {
        for (const s of data.stats) {
            await prisma.stat.create({
                data: {
                    label: s.label,
                    value: Number(s.value),
                    suffix: s.suffix,
                }
            });
        }
        console.log(`Seeded ${data.stats.length} stats`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
