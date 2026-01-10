import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';



export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file received' }, { status: 400 });
        }

        // Check if Vercel Blob is configured (Production)
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            // Lazy import to avoid build errors if package issues exist (though we installed it)
            const { put } = await import('@vercel/blob');
            const blob = await put(file.name, file, { access: 'public' });
            return NextResponse.json({ url: blob.url });
        }

        // Fallback: Local Filesystem (Development / Render Disk)
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);

        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
