import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // Only protect /admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        const authHeader = req.headers.get('authorization');

        if (authHeader) {
            // Basic Auth Credentials
            const authValue = authHeader.split(' ')[1];
            const [user, pwd] = atob(authValue).split(':');

            const validUser = process.env.ADMIN_USER || 'admin';
            const validPass = process.env.ADMIN_PASSWORD || 'Analogy#1111';

            if (user === validUser && pwd === validPass) {
                return NextResponse.next();
            }
        }

        // Request Basic Auth
        return new NextResponse('Authentication Required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"',
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
