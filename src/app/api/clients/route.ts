
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Client from '../../../models/Client';

export const dynamic = "force-dynamic";

export async function GET() {
    await dbConnect();
    try {
        const clients = await Client.find({}).sort({ createdAt: -1 });
        return NextResponse.json(clients);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const client = await Client.create(body);
        return NextResponse.json(client, { status: 201 });
    } catch (error: any) { // Type 'any' to catch duplicate key errors
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Client with this email already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create client' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    await dbConnect();
    try {
        const body = await req.json();
        const { id, _id, ...updateData } = body;
        const targetId = _id || id;

        if (!targetId) return NextResponse.json({ error: 'Client ID required' }, { status: 400 });

        const client = await Client.findByIdAndUpdate(targetId, updateData, { new: true });
        return NextResponse.json(client);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update client' }, { status: 500 });
    }
}
