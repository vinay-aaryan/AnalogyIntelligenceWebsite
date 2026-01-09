import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Product, Work, TeamMember, Testimonial, TrustedCompany, Stat } from '@/models/Content';

// Helper to map collection name to Mongoose Model
function getModel(collection: string) {
    switch (collection) {
        case 'products': return Product;
        case 'work': return Work;
        case 'team': return TeamMember;
        case 'testimonials': return Testimonial;
        case 'trustedBy': return TrustedCompany;
        case 'stats': return Stat;
        default: return null;
    }
}

export async function GET() {
    await dbConnect();
    try {
        const [products, work, team, testimonials, trustedBy, stats] = await Promise.all([
            Product.find({}).sort({ createdAt: -1 }),
            Work.find({}).sort({ createdAt: -1 }),
            TeamMember.find({}).sort({ createdAt: -1 }),
            Testimonial.find({}).sort({ createdAt: -1 }),
            TrustedCompany.find({}).sort({ createdAt: -1 }),
            Stat.find({}).sort({ createdAt: -1 }),
        ]);

        const data = {
            products,
            work,
            team,
            testimonials,
            trustedBy,
            stats
        };
        return NextResponse.json(data);
    } catch (error) {
        console.error('Database Read Error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    await dbConnect();
    try {
        const body = await request.json();
        const { collection, item, action, id } = body;
        const Model: any = getModel(collection);

        if (!Model) {
            return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
        }

        if (action === 'create') {
            const { _id, ...data } = item;
            // Handle specific field transformations
            if (collection === 'products' && typeof data.tags === 'string') {
                // tags are already string in schema, but good to check inputs
            }
            await Model.create(data);
        } else if (action === 'update') {
            const { _id, ...data } = item;
            await Model.findByIdAndUpdate(id, data, { new: true });
        } else if (action === 'delete') {
            await Model.findByIdAndDelete(id);
        }

        return GET();

    } catch (error) {
        console.error('Database Write Error:', error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
