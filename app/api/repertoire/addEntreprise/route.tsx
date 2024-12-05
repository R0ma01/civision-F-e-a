import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import axios from 'axios';

const serverURL = process.env.SERVER_API;

export async function POST(req: Request) {
    try {
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.EXTRA_COMPANIES);

        const { companies } = await req.json();

        console.log(companies);

        if (!Array.isArray(companies)) {
            return NextResponse.json(
                { error: 'Invalid data format. Expected an array.' },
                { status: 400 },
            );
        }

        const validDocuments = [];

        for (const item of companies) {
            // Check if the email already exists in the collection
            const existingDocument = await collection.findOne({
                NEQ: item.NEQ,
                ADR: item.ADR,
            });
            if (existingDocument) {
                console.warn(`Document already exists`);
                continue;
            }
            validDocuments.push(item);
        }

        if (validDocuments.length === 0) {
            return NextResponse.json(
                { message: 'No valid documents to insert.' },
                { status: 200 },
            );
        }
        console.log(validDocuments);
        // Insert the valid documents
        const result = await collection.insertMany(validDocuments);

        console.log(result);

        return NextResponse.json({
            message: 'Documents inserted successfully',
            insertedIds: Object.keys(result.insertedIds).length, // Contains inserted IDs as an object
        });

        // const exists = await collection.findOne({ NEQ: company.NEQ });

        // if (exists) {
        //     return NextResponse.json('Company Already exists', { status: 409 });
        // }

        // console.log(coords);

        // // const response = await axios.post(serverURL + 'api/get-idus', {
        // //     realm: 'canada',
        // //     coordinates: coords,
        // // });

        // console.log(response);

        // if (response.status === 200) {
        //     delete company.LAT;
        //     delete company.LONG;

        //     company.COORD = coords;

        //     company.AD_IDU = response.data.AD_IDU;
        //     company.MRC_IDU = response.data.MRC_IDU;
        //     company.MUNIC_IDU = response.data.MUNIC_IDU;
        // } else {
        //     return NextResponse.json('Failed to convert geometries', {
        //         status: 400,
        //     });
        // }

        // console.log(company);

        // const added = await collection.insertOne({ ...company });

        // console.log(added);

        // if (added.insertedId) {
        //     return NextResponse.json(
        //         { entreprise: { _id: added.insertedId, ...company } },
        //         {
        //             status: 200,
        //         },
        //     );
        // }
        // Add Cache-Control headers to prevent caching

        return NextResponse.json('Document not Added', { status: 400 });
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
