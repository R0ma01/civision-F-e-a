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
            return NextResponse.json('No company Attached', { status: 204 });
        }
        const coords = [company.LONG, company.LAT];

        const exists = await collection.findOne({ NEQ: company.NEQ });

        if (exists) {
            return NextResponse.json('Company Already exists', { status: 409 });
        }

        console.log(coords);

        const response = await axios.post(serverURL + 'api/get-idus', {
            realm: 'canada',
            coordinates: coords,
        });

        console.log(response);

        if (response.status === 200) {
            delete company.LAT;
            delete company.LONG;

            company.COORD = coords;

            company.AD_IDU = response.data.AD_IDU;
            company.MRC_IDU = response.data.MRC_IDU;
            company.MUNIC_IDU = response.data.MUNIC_IDU;
        } else {
            return NextResponse.json('Failed to convert geometries', {
                status: 400,
            });
        }

        console.log(company);

        const added = await collection.insertOne({ ...company });

        console.log(added);

        if (added.insertedId) {
            return NextResponse.json(
                { entreprise: { _id: added.insertedId, ...company } },
                {
                    status: 200,
                },
            );
        }
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
