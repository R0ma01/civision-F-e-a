import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const response = NextResponse.json(
            { message: 'Déconnexion' },
            { status: 200 },
        );

        response.cookies.set('adminToken', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: -1, // Set the maxAge to -1 to expire the cookie immediately
            path: '/',
        });

        response.cookies.set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: -1, // Set the maxAge to -1 to expire the cookie immediately
            path: '/',
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Déconnexion échouée' },
            { status: 500 },
        );
    }
}
