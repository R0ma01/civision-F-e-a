import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { closeDatabase, connectToDatabase } from '@/utils/auth-mongoDB-utils';
import { validationTranslations } from '@/constants/translations/auth';
import { generateAdminToken, generateToken } from '@/utils/token-utils';

const { ADMIN_ID } = process.env;

export async function POST(req) {
    try {
        const collection = await connectToDatabase();
        const { email, password, lang } = await req.json();
        const t = validationTranslations[lang];

        const user = await collection.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: t.invalidCredentials },
                { status: 401 },
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: t.invalidCredentials },
                { status: 401 },
            );
        }

        const lastLoginDate = new Date();
        await collection.updateOne({ email }, { $set: { lastLoginDate } });

        const token = generateToken({ userId: user._id }, '24h');
        let adminToken = null;

        if (user._id == ADMIN_ID) {
            adminToken = generateAdminToken({ userId: user._id }, '24h');
        }

        // Set the token in a cookie
        const response = NextResponse.json(
            {
                message: t.loginSuccess,
                token: token,
                admin: user._id == ADMIN_ID,
                tutorials: user.tutorials,
            },
            { status: 200 },
        );

        response.cookies.set('token', token, {
            httpOnly: true, // Makes the cookie inaccessible to JavaScript on the client
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/', // The cookie is available for all routes
        });
        response.cookies.set('adminToken', adminToken, {
            httpOnly: true, // Makes the cookie inaccessible to JavaScript on the client
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 24 hours
            path: '/', // The cookie is available for all routes
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: t.failedToLogin }, { status: 500 });
    } finally {
        await closeDatabase();
    }
}
