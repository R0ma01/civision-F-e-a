import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { closeDatabase, connectToDatabase } from '@/utils/auth-mongoDB-utils';
import { validationTranslations } from '@/constants/translations/auth';
import { generateAdminToken, generateToken } from '@/utils/token-utils';

const { ADMIN_ID } = process.env;

export async function POST(req) {
    try {
        const collection = await connectToDatabase();
        const { credentials } = await req.json();
        // const t = validationTranslations[credentials.lang];

        const response = { validLogin: false, adminUser: false, tutorials: [] };

        if (!credentials) {
        }
        const user = await collection.findOne({ email: credentials.email });
        if (!user) {
            return NextResponse.json(
                { error: 'user not found' },
                { status: 404 },
            );
        }

        const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password,
        );
        if (isPasswordValid) {
            response.validLogin = true;
            const lastLoginDate = new Date();
            await collection.updateOne(
                { email: credentials.email },
                { $set: { lastLoginDate } },
            );
            response.tutorials = user.tutorials;
        }
        if (user.admin) {
            response.adminUser = true;
        }

        return NextResponse.json({ ...response }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: ' t.failedToLogin' },
            { status: 500 },
        );
    } finally {
        await closeDatabase();
    }
}
