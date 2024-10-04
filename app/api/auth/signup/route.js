import { sendNoReplyEmail } from '@/services/email-service';
import { NextResponse } from 'next/server';
import { generateToken } from '@/utils/token-utils';
import { closeDatabase, connectToDatabase } from '@/utils/auth-mongoDB-utils';
import { validationTranslations } from '@/constants/translations/auth';

export async function POST(req) {
    
    try {
        const { email, firstName, lastName, organization, password, lang } = await req.json();

        const t = validationTranslations[lang];
        
        const collection = await connectToDatabase();

        const existingUser = await collection.findOne({ email });

        if (existingUser) {
            return NextResponse.json({ error: t.userWithEmailExists }, { status: 400 });
        }

        const token = generateToken({ email, firstName, lastName, organization, password }, '15m');

        const responseStatus = await sendNoReplyEmail(email, token, 'account_activation');

        if (responseStatus !== 200 && responseStatus !== 202) {
            return NextResponse.json({ error: t.invalidEmailRequest }, { status: 400 });
        }
        
        return NextResponse.json({ message: t.activationEmailSent }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: t.failedToSendActivationEmail }, { status: 500 });
    } finally {
        await closeDatabase();
    }
}
