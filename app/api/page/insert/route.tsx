import { NextResponse } from 'next/server'; // Import NextResponse
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

export async function POST(req: Request) {
    try {
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.COLLECTION_PAGES_TABS);
        const body = await req.json(); // Parse the request body as JSON

        // Insert the object received in the request body
        const result = await collection.insertOne(body);

        // Return a successful response
        return NextResponse.json({
            message: 'Document inserted successfully',
            insertedId: result.insertedId.toString(), // Convert ObjectId to string
        });
    } catch (e: any) {
        console.error(e.message);

        // Return an error response
        return NextResponse.json(
            {
                error: e.message,
            },
            { status: 500 },
        );
    }
}
