import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { decodeToken } from '@/utils/token-utils';
import { auth } from '@/auth';

export const GET = auth(async function GET(req) {
    try {
        if (!req.auth.user) {
            return NextResponse.json(
                { error: 'not logged in' },
                { status: 500 },
            );
        }
        // Connect to the database
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.COLLECTION_USERS);

        // Update the document with the new tutorials data
        const response = await collection.findOne(
            { email: req.auth.user.email },
            {
                projection: {
                    tutorials: 1,
                },
            },
        );

        // Return a successful response
        return NextResponse.json(
            {
                tutorials: response.tutorials,
            },
            { status: 200 },
        );
    } catch (e) {
        console.error('Error in POST request:', e.message);

        // Return an error response
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
});
