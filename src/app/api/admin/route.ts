import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Product, Work, TeamMember, Testimonial, TrustedCompany, Stat, FounderInfo } from '@/models/Content';

// Helper to map collection name to Mongoose Model
function getModel(collection: string) {
    switch (collection) {
        case 'products': return Product;
        case 'work': return Work;
        case 'team': return TeamMember;
        case 'testimonials': return Testimonial;
        case 'trustedBy': return TrustedCompany;
        case 'stats': return Stat;
        case 'founderInfo': return FounderInfo;
        default: return null;
    }
}

export async function GET() {
    await dbConnect();
    try {
        const [products, work, team, testimonials, trustedBy, stats, founderInfo] = await Promise.all([
            Product.find({}).sort({ createdAt: -1 }),
            Work.find({}).sort({ createdAt: -1 }),
            TeamMember.find({}).sort({ createdAt: -1 }),
            Testimonial.find({}).sort({ createdAt: -1 }),
            TrustedCompany.find({}).sort({ createdAt: -1 }),
            Stat.find({}).sort({ createdAt: -1 }),
            FounderInfo.find({}).sort({ createdAt: -1 }),
        ]);

        const data = {
            products,
            work,
            team,
            testimonials,
            trustedBy,
            stats,
            founderInfo
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

        console.log(`[Admin API] ${action.toUpperCase()} ${collection}`, { id, item });

        const Model: any = getModel(collection);

        if (!Model) {
            return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
        }

        if (action === 'create') {
            const { _id, ...data } = item;

            // Auto-generate slug for Work and Products if missing
            if ((collection === 'work' || collection === 'products') && !data.slug && data.title) {
                data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }

            // Handle specific field transformations
            if (collection === 'products' && typeof data.tags === 'string') {
                // tags are already string in schema
            }

            const newItem = await Model.create(data);
            console.log(`[Admin API] Created:`, newItem._id);

        } else if (action === 'update') {
            const { _id, ...data } = item;

            // Ensure slug is present if title changed and slug is empty (though usually it exists)
            if ((collection === 'work' || collection === 'products') && !data.slug && data.title) {
                data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }

            const updated = await Model.findByIdAndUpdate(id, data, { new: true });
            if (!updated) {
                console.error(`[Admin API] Update failed: Document ${id} not found.`);
                return NextResponse.json({ error: 'Document not found' }, { status: 404 });
            }
            console.log(`[Admin API] Updated:`, updated._id);

        } else if (action === 'delete') {
            await Model.findByIdAndDelete(id);
            console.log(`[Admin API] Deleted:`, id);
        }

        return GET();

    } catch (error: any) {
        console.error('Database Write Error:', error);
        // Return clearer error for duplicate keys (slugs)
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Duplicate key error (likely Slug). Change title or slug.' }, { status: 400 });
        }
        return NextResponse.json({ error: error.message || 'Database error' }, { status: 500 });
    }
}
