import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { closeDatabase, connectToDatabase } from '@/utils/auth-mongoDB-utils';
import { validationTranslations } from '@/constants/translations/auth';

const { JWT_SECRET } = process.env;

export async function POST(req) {
    try {
        const collection = await connectToDatabase();
        const { token, lang } = await req.json();
        const { email, firstName, lastName, organization, password } =
            jwt.verify(token, JWT_SECRET);
        const t = validationTranslations[lang];

        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: t.userAlreadyExists },
                { status: 400 },
            );
        }

        const creationDate = new Date();
        const lastLoginDate = new Date();
        //admin, repertoire, recherche, thematiques, page information
        const tutorials = [false, false, false, false, false];

        const hashPassword = await bcrypt.hash(password, 10);
        await collection.insertOne({
            email,
            firstName,
            lastName,
            userDetails: { organization },
            password: hashPassword,
            creationDate,
            lastLoginDate,
            tutorials,
        });

        return NextResponse.json(
            { message: t.userCreatedSuccessfully },
            { status: 200 },
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: t.failedToCreateUser },
            { status: 500 },
        );
    } finally {
        await closeDatabase();
    }
}
