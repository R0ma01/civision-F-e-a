import { NextResponse } from 'next/server';
import { connectToDatabaseRepertoire } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import axios from 'axios';

const serverURL = process.env.SERVER_API;

export async function POST(req: Request) {
    try {
        const db = (await connectToDatabaseRepertoire()).db;
        const collection = db.collection(MongoDBPaths.EXTRA_COMPANIES);

        const { company } = await req.json();

        console.log(company);

        if (!company) {
            return NextResponse.json('No company Attached');
        }

        const exists = await collection.findOne({ NEQ: company.NEQ });

        if (exists) {
            return NextResponse.json('Company already exists');
        }
        // Get the documents and count them

        console.log('hello');

        const adaptedCompany = {};

        const response = await axios.post(serverURL + '/api/get-idus', {
            realm: 'canada',
            coordinates: [company.LONG, company.LAT],
        });

        console.log(response);

        // Add Cache-Control headers to prevent caching

        return NextResponse.json('SDomething');
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
