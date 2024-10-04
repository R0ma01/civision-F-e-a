import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { closeDatabase, connectToDatabase } from "@/utils/auth-mongoDB-utils";
import { validationTranslations } from "@/constants/translations/auth";

const { JWT_SECRET } = process.env;

export async function POST(req) {
  
  try {
      const { token, password, lang } = await req.json();
      const decoded = jwt.verify(token, JWT_SECRET);

      const t = validationTranslations[lang];
      
      const userId = new ObjectId(decoded._id);
      const hashPassword = await bcrypt.hash(password, 10);

      const collection = await connectToDatabase();
      const result = await collection.updateOne({ _id: userId }, { $set: { password: hashPassword } });

      return result.modifiedCount === 1 
          ? NextResponse.json({ message: t.passwordResetSuccess }, { status: 200 }) 
          : NextResponse.json({ error: t.failedToResetPassword }, { status: 500 });
  } catch (error) {
      console.error('Error setting new password:', error);
      return NextResponse.json({ error: t.errorSettingNewPassword }, { status: 500 });
  } finally {
      await closeDatabase();
  }
}