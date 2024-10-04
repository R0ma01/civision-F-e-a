import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { decodeToken } from '@/utils/token-utils';

export async function PATCH(req: Request) {
    try {
        // Connect to the database
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.COLLECTION_USERS);

        // Parse the request body as JSON
        const body = await req.json();

        // Extract the tutorials from the body
        const { token, tutorials } = body;

        // Dummy userId for testing. Replace with actual token decoding logic.
        const decodedToken = await decodeToken(token);

        // Validate the presence of tutorials
        if (!tutorials) {
            return NextResponse.json(
                { error: 'Missing tutorials data' },
                { status: 400 },
            );
        }

        // Validate the presence of decodedToken
        if (!decodedToken) {
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 401 },
            );
        }

        const objectId = new ObjectId(decodedToken);

        // Update the document with the new tutorials data
        const result = await collection.updateOne(
            { _id: objectId },
            { $set: { tutorials } }, // Correctly format the update operation
        );

        // Check if any document was matched and modified
        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'No document found with the given userId' },
                { status: 404 },
            );
        }

        // Return a successful response
        return NextResponse.json({
            message: 'Document updated successfully',
            modifiedCount: result.modifiedCount,
        });
    } catch (e: any) {
        console.error('Error in PATCH request:', e.message);

        // Return an error response
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
