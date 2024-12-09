import { NextResponse } from 'next/server';
import {
    connectToDatabaseRepertoire,
    connectToDatabaseStudy,
} from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { MapClusterPointData } from '@/components/interface/point-data';

export async function GET(req: Request) {
    try {
        const db = (await connectToDatabaseRepertoire()).db;
        const collection = db.collection(MongoDBPaths.REGISTRE_QC);
        const extraDb = (await connectToDatabaseStudy()).db;
        const collectionExtra = extraDb.collection(
            MongoDBPaths.EXTRA_COMPANIES,
        );
        const url = new URL(req.url!);
        let filters = url.searchParams.get('filters');
        if (!filters) {
            return NextResponse.json(
                { error: 'Missing donnes or filter parameter' },
                { status: 400 },
            );
        }

        const filtersObj: Record<string, any> = JSON.parse(filters);

        if (!filtersObj) {
            return NextResponse.json(
                { error: 'Format of donnes or filter param is wrong' },
                { status: 400 },
            );
        }

        const result = await collection
            .find(
                {
                    ...filtersObj, // Dynamic filters
                    ENT_FAM: true, // Query based on the indexed field, not index name
                },
                {
                    projection: {
                        COORD: 1,
                        NOM_ETAB: 1,
                        NOM_ASSUJ: 1,
                    },
                },
            )
            .toArray();

        if (!result) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 },
            );
        }

        let extras: any = await collectionExtra
            .find(
                {
                    ...filtersObj, // Dynamic filters
                    ENT_FAM: true, // Query based on the indexed field, not index name
                },
                {
                    projection: {
                        COORD: 1,
                        NOM_ETAB: 1,
                        NOM_ASSUJ: 1,
                    },
                },
            )
            .toArray();

        if (!extras) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 },
            );
        }

        const combinedResults = [...extras, ...result];

        const newResult: MapClusterPointData[] = combinedResults.map(
            (item: any) => {
                return {
                    _id: item._id,
                    nom: item.NOM_ETAB || item.NOM_ASSUJ[0],
                    coords: item.COORD,
                };
            },
        );

        // Return a successful response
        const response = NextResponse.json({
            message: 'Repertoire Points found successfully',
            points: newResult,
        });

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
