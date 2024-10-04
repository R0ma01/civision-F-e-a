import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { ObjectId } from 'mongodb'; // Import ObjectId
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

export async function DELETE(req: Request) {
    console.error('delete is Called');
    try {
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.COLLECTION_PAGES_TABS);
        const url = new URL(req.url!);
        const id = url.searchParams.get('_id');

        if (!id) {
            return NextResponse.json(
                { error: 'Missing _id parameter' },
                { status: 400 },
            );
        }

        const objectId = new ObjectId(id);
        const result = await collection.deleteOne({ _id: objectId });

        if (!result) {
            return NextResponse.json(
                { error: 'Document not deleted' },
                { status: 404 },
            );
        }

        // Return a successful response
        return NextResponse.json({
            message: 'Document deleted successfully',
            page: result,
        });
    } catch (e: any) {
        console.error(e.message);

        // Return an error response
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
