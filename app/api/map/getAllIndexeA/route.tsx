import { NextResponse } from 'next/server';
import { connectToDatabaseIndexe } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { GraphTextService } from '@/services/translations';
import {
    IndexeDataFieldsA,
    StudyYears,
} from '@/components/enums/data-types-enum';
import { Language } from '@/components/enums/language';
import { MapType } from '@/components/enums/map-type-enum';
import { MapRegions } from '@/components/enums/map-regions';
// Define interfaces for the aggregation results
interface AggregationResult {
    name: string;
    value: number;
}
export const revalidate = 0;
export const dynamic = 'force-dynamic';
export async function GET(req: Request) {
    try {
        // Parse request parameters
        const url = new URL(req.url!);
        let filters = url.searchParams.get('filters');
        let year = url.searchParams.get('year');
        if (!filters || !year) {
            return NextResponse.json(
                { error: 'Missing filters parameter' },
                { status: 400 },
            );
        }
        let dbString = '';
        switch (year) {
            case StudyYears.YEAR_2022.toString():
                dbString = MongoDBPaths.VOLETA_2022;
                break;

            default:
                dbString = MongoDBPaths.VOLETA_2022;
                break;
        }

        const db = (await connectToDatabaseIndexe()).db;
        const collection = db.collection(dbString);
        const filtersObj: Record<string, any> = JSON.parse(filters);

        if (!filtersObj) {
            return NextResponse.json(
                { error: 'Format of filters param is wrong' },
                { status: 400 },
            );
        }

        const matchStage: any = { ...filtersObj };

        const aggregationPipeline = [
            {
                $match: matchStage,
            },
            {
                $group: {
                    _id: '$Q0QC',
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    region: '$_id',
                    count: 1,
                },
            },
        ];

        const aggregationResult = await collection
            .aggregate(aggregationPipeline)
            .toArray();

        if (!aggregationResult) {
            return NextResponse.json(
                { error: 'No regions found' },
                { status: 404 },
            );
        }
        const regionCountsMap = new Map<string, number>(
            aggregationResult.reduce<[string, number][]>((acc, item) => {
                if (item.region) {
                    acc.push([item.region.toString(), item.count]);
                }
                return acc;
            }, []),
        );

        const result = Array.from(
            MapRegions.get(MapType.PAGE_INFORMATION_INDEX_VOLETA)?.entries() ||
                [], // Use entries() from the map
        ).map(([key, regionName]) => ({
            region: regionName,
            count: regionCountsMap.get(key.toString()) || 0, // Ensure key is treated as a string
        }));

        const response = NextResponse.json({
            message: 'Regions counted successfully',
            points: result,
        });

        // Add Cache-Control headers to prevent caching
        response.headers.set('Cache-Control', 'no-store, max-age=0');

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
// function removeAccents(str: string): string {
//     return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
// }
