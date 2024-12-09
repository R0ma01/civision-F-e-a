import { NextResponse } from 'next/server';
import {
    connectToDatabaseRepertoire,
    connectToDatabaseStudy,
} from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

export async function GET() {
    try {
        const db = (await connectToDatabaseRepertoire()).db;
        const collection = db.collection(MongoDBPaths.REGISTRE_QC);
        const extraDb = (await connectToDatabaseStudy()).db;
        const collectionExtra = extraDb.collection(
            MongoDBPaths.EXTRA_COMPANIES,
        );
        // Get the documents and count them

        const count = await collection.countDocuments({
            ENT_FAM: { $exists: true },
        });

        const countExtra = await collectionExtra.countDocuments({
            ENT_FAM: { $exists: true },
        });

        // Create the response
        const response = NextResponse.json({
            message: 'Documents found successfully',
            length: count + countExtra, // Use the count of documents here
        });

        // Add Cache-Control headers to prevent caching

        return response;
    } catch (e: any) {
        console.error(e.message);

        // Return an error response with no-cache headers as well
        const errorResponse = NextResponse.json(
            { error: e.message },
            { status: 500 },
        );

        return errorResponse;
    }
}
