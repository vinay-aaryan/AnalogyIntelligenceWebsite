
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Enquiry from '../../../models/Enquiry';

export const dynamic = "force-dynamic";

export async function GET() {
    await dbConnect();
    try {
        const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
        return NextResponse.json(enquiries);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const enquiry = await Enquiry.create(body);
        return NextResponse.json(enquiry, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create enquiry' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const { _id, ...updateData } = body;
        const enquiry = await Enquiry.findByIdAndUpdate(_id, updateData, { new: true });
        return NextResponse.json(enquiry);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
    }
}
