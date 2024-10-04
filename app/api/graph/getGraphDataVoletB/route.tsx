import { NextResponse } from 'next/server';
import {
    connectToDatabaseIndexe,
    connectToDatabaseStudy,
} from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

import { GraphTextService } from '@/services/translations';
import {
    IndexeDataFieldsB,
    StudyYears,
} from '@/components/enums/data-types-enum';

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
        field !== IndexeDataFieldsB.QREP5 &&
        field !== IndexeDataFieldsB.QREP7 &&
        field !== IndexeDataFieldsB.QREP8
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
    }
    let aggregationPipeline: any[] = [];

    if (
        field === IndexeDataFieldsB.QREP5 ||
        field === IndexeDataFieldsB.QREP7 ||
        field === IndexeDataFieldsB.QREP8
    ) {
        let group: Record<any, any> = { _id: null };
        let projection: Record<any, any> = { _id: 0 };
        const matchArray: any[] = [];
        possibleValues.map((param) => {
            let paramName: string = param.toString() + 'Count';
            group[paramName] = {
                $sum: { $cond: [{ $eq: [`$${param}`, 1] }, 1, 0] },
            };
            matchArray.push({ [param]: 1 });
            projection[param] = { name: param, value: `$${paramName}` };
        });

        let match: Record<any, any> = {
            _id: null,
            $or: [...matchArray],
        };

        aggregationPipeline = [
            {
                $match: {
                    ...filters,
                },
            },
            {
                $group: {
                    ...group,
                },
            },
            {
                $project: {
                    ...projection,
                },
            },
        ];
    } else {
        aggregationPipeline = [
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
    }

    return async (collection: any): Promise<AggregationResult[]> => {
        const result = await collection
            .aggregate(aggregationPipeline)
            .toArray();

        let formattedResult = result;
        if (
            field === IndexeDataFieldsB.QREP5 ||
            field === IndexeDataFieldsB.QREP7 ||
            field === IndexeDataFieldsB.QREP8
        ) {
            formattedResult = Object.values(result[0]);
        }

        let resultMap = new Map<string, AggregationResult>(
            formattedResult.map((item: AggregationResult) => {
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

export async function GET(req: Request) {
    try {
        const url = new URL(req.url!);
        let donnes = url.searchParams.get('donnes');
        let filters = url.searchParams.get('filters');

        let year = url.searchParams.get('year');
        if (!filters || !donnes || !year) {
            return NextResponse.json(
                { error: 'Missing filters parameter' },
                { status: 400 },
            );
        }
        let dbString = '';
        switch (year) {
            case StudyYears.YEAR_2022.toString():
                dbString = MongoDBPaths.VOLETB_2022;
                break;

            default:
                dbString = MongoDBPaths.VOLETB_2022;
                break;
        }

        const db = (await connectToDatabaseIndexe()).db;
        const collection = db.collection(dbString);

        const donnesObj: IndexeDataFieldsB[] = JSON.parse(donnes);
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
            console.log('hello');
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
