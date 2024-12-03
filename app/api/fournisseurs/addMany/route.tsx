import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

export async function POST(req: Request) {
    try {
        console.log('hello');
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.FOURNISSEURS2);
        const { fournisseurs } = await req.json(); // Parse the request body as JSON (expected to be an array)

        if (!Array.isArray(fournisseurs)) {
            return NextResponse.json(
                { error: 'Invalid data format. Expected an array.' },
                { status: 400 },
            );
        }

        const validDocuments = [];

        for (const item of fournisseurs) {
            const email = item?.contact?.email;

            if (!email) {
                console.warn(
                    `Skipping document without contact.email: ${JSON.stringify(item)}`,
                );
                continue; // Skip items without an email
            }

            // Check if the email already exists in the collection
            const existingDocument = await collection.findOne({
                'contact.email': email,
            });

            if (existingDocument) {
                console.warn(`Email already exists: ${email}`);
                continue; // Skip duplicate email
            }

            validDocuments.push(item);
        }

        if (validDocuments.length === 0) {
            return NextResponse.json(
                { message: 'No valid documents to insert.' },
                { status: 400 },
            );
        }

        // Insert the valid documents
        const result = await collection.insertMany(validDocuments);

        return NextResponse.json({
            message: 'Documents inserted successfully',
            insertedIds: result.insertedIds, // Contains inserted IDs as an object
        });
    } catch (e: any) {
        console.error(e.message);

        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
