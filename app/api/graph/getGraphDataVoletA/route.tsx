import { NextResponse } from 'next/server';
import {
    connectToDatabaseIndexe,
    connectToDatabaseStudy,
} from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

import { GraphTextService } from '@/services/translations';
import { AlbumDataFields } from '@/components/enums/data-types-enum';

// Define interfaces for the aggregation results
interface AggregationResult {
    name: string;
    value: number;
}

function generateAggregationQuery(
    field: string,
    filters: Record<string, any>,
    possibleValues: (string | number)[],
) {
    if (
        typeof filters[field] === 'number' ||
        typeof filters[field] === 'string'
    ) {
        filters[field] = {
            $nin: [null, NaN, 'NaN'],
            $in: [filters[field]],
        };
    } else {
        filters[field] = {
            $nin: [null, NaN, 'NaN'],
        };
    }

    const aggregationPipeline = [
        {
            $match: {
                ...filters,
            },
        },
        {
            $group: {
                _id: `$${field}`,
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                name: '$_id',
                value: '$count',
            },
        },
    ];
    return async (collection: any): Promise<AggregationResult[]> => {
        const result = await collection
            .aggregate(aggregationPipeline)
            .toArray();

        let resultMap = new Map<string, AggregationResult>(
            result.map((item: AggregationResult) => {
                if (Array.isArray(item.name)) {
                    return [JSON.stringify(item.name), item];
                }
                return [item.name.toString(), item];
            }),
        );

        // Ensure all possible values are in the result
        return possibleValues.map((value) => {
            return {
                name: value.toString(),
                value: resultMap.get(value.toString())?.value || 0,
            };
        });
    };
}

function generateDualFieldAggregationQuery(
    field1: string,
    field2: string,
    filters: Record<string, any>,
    possibleValues: { [key: string]: (string | number)[] },
) {
    if (
        typeof filters[field1] === 'number' ||
        typeof filters[field1] === 'string'
    ) {
        filters[field1] = {
            $exists: true,
            $nin: [null, NaN, 'NaN'],
            $in: [filters[field1]],
        };
    } else {
        filters[field1] = {
            $exists: true,
            $nin: [null, NaN, 'NaN'],
        };
    }
    if (
        typeof filters[field2] === 'number' ||
        typeof filters[field2] === 'string'
    ) {
        filters[field2] = {
            $exists: true,
            $nin: [null, NaN, 'NaN'],
            $in: [filters[field2]],
        };
    } else {
        filters[field2] = {
            $exists: true,
            $nin: [null, NaN, 'NaN'],
        };
    }
    const aggregationPipeline = [
        {
            $match: {
                // ...generateMatchStage(filters, [field1, field2]),
                // [field1]: { $exists: true, $ne: null },
                // [field2]: { $exists: true, $ne: null },
                ...filters,
            },
        },
        {
            $group: {
                _id: {
                    field1: `$${field1}`,
                    field2: `$${field2}`,
                },
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                _id: 0,
                name: { $getField: `_id` },

                count: '$count',
            },
        },
    ];

    return async (
        collection: any,
    ): Promise<
        {
            name: string;
            [key: string]: number | string; // Allow string for 'name' and array for dynamic fields
        }[]
    > => {
        const result: {
            name: { field1: string; field2: string };
            count: number;
        }[] = await collection.aggregate(aggregationPipeline).toArray();

        const resultMap = dualDataFormatting(
            result,
            field1,
            field2,
            possibleValues,
        );

        const returnValues: any = [];

        possibleValues[field1].flatMap((value1) => {
            const item: any = {
                name: value1,
            };
            possibleValues[field2].forEach((value2) => {
                // Type guard to ensure item[field2] is an array
                item[value2] = resultMap.get(`${value1}-${value2}`)?.count || 0;
            });

            returnValues.push(item);
        });

        return returnValues;
    };
}
function unclusterResultArrays(
    originalResult: any[],
    possibleValues: any[],
): Map<string, AggregationResult> {
    // Initialize the resultMap with all possible values set to 0
    const resultMap = new Map<string, AggregationResult>();

    possibleValues.forEach((value) => {
        resultMap.set(value.toString(), { name: value.toString(), value: 0 });
    });

    // Iterate over the original result and aggregate values
    originalResult.forEach(([key, aggregationResult]) => {
        aggregationResult.name.forEach((name: string) => {
            const currentResult = resultMap.get(name.toString());
            if (currentResult) {
                currentResult.value += aggregationResult.value;
            }
        });
    });

    return resultMap;
}

export async function GET(req: Request) {
    try {
        const db = (await connectToDatabaseIndexe()).db;
        const collection = db.collection(MongoDBPaths.VOLETA_2022);
        const url = new URL(req.url!);
        let donnes = url.searchParams.get('donnes');
        let filters = url.searchParams.get('filters');

        if (!donnes || !filters) {
            return NextResponse.json(
                { error: 'Missing donnes or filter parameter' },
                { status: 400 },
            );
        }

        const donnesObj: AlbumDataFields[] = JSON.parse(donnes);
        const filtersObj: Record<string, any> = JSON.parse(filters);

        if (!donnesObj || !filtersObj) {
            return NextResponse.json(
                { error: 'Format of donnes or filter param is wrong' },
                { status: 400 },
            );
        }

        let mongoQuery: (collection: any) => Promise<any[]>;

        if (donnesObj.length > 1) {
            const tableau1 = GraphTextService.getKeys(donnesObj[0]);
            const tableau2 = GraphTextService.getKeys(donnesObj[1]);

            const dynamicObject = {
                [donnesObj[0]]: tableau1,
                [donnesObj[1]]: tableau2,
            };

            mongoQuery = generateDualFieldAggregationQuery(
                donnesObj[0],
                donnesObj[1],
                filtersObj,
                dynamicObject,
            );
        } else {
            const tableau = GraphTextService.getKeys(donnesObj[0]);
            mongoQuery = generateAggregationQuery(
                donnesObj[0],
                filtersObj,
                tableau,
            );
        }

        const result = await mongoQuery(collection);

        if (!result || result.length === 0) {
            return NextResponse.json(
                { error: 'Data field not found' },
                { status: 404 },
            );
        }

        return NextResponse.json({
            message: 'Data field found successfully',
            chartData: result,
        });
    } catch (e: any) {
        console.error(e.message);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

function dualDataFormatting(
    result: any[],
    field1: string,
    field2: string,
    possibleValues: { [key: string]: any[] },
) {
    const returnMap = new Map();

    possibleValues[field1].map((value1) => {
        possibleValues[field2].map((value2) => {
            returnMap.set(`${value1}-${value2}`, { count: 0 });
        });
    });

    console.log('string - string');

    result.map((item: any) => {
        returnMap.set(
            `${item.name.field1.toString()}-${item.name.field2.toString()}`,
            {
                count:
                    returnMap.get(
                        `${item.name.field1.toString()}-${item.name.field2.toString()}`,
                    ).count + item.count,
            },
        );
    });

    return returnMap;
}
