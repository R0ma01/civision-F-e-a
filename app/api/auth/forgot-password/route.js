import { sendNoReplyEmail } from '@/services/email-service';
import { NextResponse } from 'next/server';
import { generateToken } from '@/utils/token-utils';
import { closeDatabase, connectToDatabase } from '@/utils/auth-mongoDB-utils';
import { validationTranslations } from '@/constants/translations/auth';

export async function POST(req) {

  try {
      const collection = await connectToDatabase();
      const { email, lang } = await req.json();
      const t = validationTranslations[lang];

      const user = await collection.findOne({ email });
      if (!user) {
          return NextResponse.json({ error: t.userNotFound }, { status: 401 });
      }

      const token = generateToken({ _id: user._id }, '15m');

      const responseStatus = await sendNoReplyEmail(email, token, 'password_reset');
      if (responseStatus && (responseStatus !== 200 && responseStatus !== 202)) {
          return NextResponse.json({ error: t.invalidEmailRequest }, { status: 400 });
      }

      return NextResponse.json({ message: t.passwordResetEmailSent }, { status: 200 });
  } catch (error) {
      console.error(error);
      return NextResponse.json({ error: t.errorSendingResetEmail }, { status: 500 });
  } finally {
      await closeDatabase();
  }
}