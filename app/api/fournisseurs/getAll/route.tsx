import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    console.log('Dynamic get for fournisseurs');
    try {
        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(MongoDBPaths.FOURNISSEURS2);
        const url = new URL(req.url!);
        let filters = url.searchParams.get('filters');
        if (!filters) {
            return NextResponse.json(
                { error: 'Missing filters parameter' },
                { status: 400 },
            );
        }

        const filtersObj: Record<string, any> = JSON.parse(filters);

        console.log(filtersObj);

        if (filtersObj['secteurs_geographique']) {
            if (filtersObj['secteurs_geographique']['$in']) {
                filtersObj['secteurs_geographique']['$in'].push(
                    'Tout le Québec',
                );
            }
        }
        console.log(filtersObj);

        if (!filtersObj) {
            return NextResponse.json(
                { error: 'Format of filters param is wrong' },
                { status: 400 },
            );
        }
        const result = await collection
            .find({
                ...filtersObj, // This will inject the filters object into the query
            })
            .toArray();

        if (!result) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 },
            );
        }
        // console.log(result);
        const response = NextResponse.json({
            message: 'Documents found successfully',
            pages: result,
        });

        response.headers.set('Cache-Control', 'no-store, max-age=0');

        // Return a successful response
        return response;
    } catch (e: any) {
        console.error(e.message);

        // Return an error response with no-cache headers as well
        const errorResponse = NextResponse.json(
            { error: e.message },
            { status: 500 },
        );
        errorResponse.headers.set('Cache-Control', 'no-store, max-age=0');

        return errorResponse;
    }
}
