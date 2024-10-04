import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

export async function PATCH(req: Request) {
    try {
        // Connect to the database
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.COLLECTION_PAGES_TABS);

        // Parse the request body as JSON
        const body = await req.json();

        // Extract _id and updateData from the body
        const { _id, ...updateData } = body;

        // Validate the presence of _id and updateData
        if (!_id || !updateData) {
            return NextResponse.json(
                { error: 'Missing _id or updateData' },
                { status: 400 },
            );
        }
        // Convert _id to ObjectId
        const objectId = new ObjectId(_id);

        // Update the document with the given _id
        const result = await collection.updateOne(
            { _id: objectId },
            { $set: updateData },
        );

        // Check if any document was matched and modified
        if (result.matchedCount === 0) {
            return NextResponse.json(
                { error: 'No document found with the given _id' },
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
