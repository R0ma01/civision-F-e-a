import { NextResponse } from 'next/server';
import { connectToDatabaseStudy } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';

import { GraphTextService } from '@/services/translations';
import {
    AlbumDataFields,
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
        typeof filters[field] === 'number' ||
        typeof filters[field] === 'string'
    ) {
        filters[field] = {
            $nin: [null, NaN],
            $in: [filters[field]],
        };
    } else {
        filters[field] = {
            $nin: [null, NaN],
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
        if (Array.from(resultMap.keys())[0]?.includes('[')) {
            resultMap = unclusterResultArrays(
                Array.from(resultMap.entries()),
                possibleValues,
            );
        }

        if (needsNumberFiltering(field)) {
            resultMap = numberData(field, resultMap, possibleValues);
        }

        if (needsAglomerationFiltering(field)) {
            resultMap = aglomerateData(field, resultMap, possibleValues);
        }

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

        const dataMap = new Map();

        possibleValues[field1].map((value1) =>
            possibleValues[field2].map((value2) =>
                dataMap.set([`${value1}-${value2}`], {
                    name: { field1: value1, field2: value2 },
                    count: 0,
                }),
            ),
        );

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
        const url = new URL(req.url!);
        let donnes = url.searchParams.get('donnes');
        let filters = url.searchParams.get('filters');
        let year = url.searchParams.get('year');

        if (!donnes || !filters || !year) {
            return NextResponse.json(
                { error: 'Missing donnes or filter parameter' },
                { status: 400 },
            );
        }
        let dbString = '';
        switch (year) {
            case StudyYears.YEAR_2022.toString():
                dbString = MongoDBPaths.COLLECTION_DATA;
                break;

            default:
                dbString = MongoDBPaths.COLLECTION_DATA;
                break;
        }

        const db = (await connectToDatabaseStudy()).db;
        const collection = db.collection(dbString);

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

function needsNumberFiltering(donnes: string) {
    return (
        donnes === AlbumDataFields.ANNEE_FONDATION ||
        donnes === AlbumDataFields.REPONDANT_ANNEE_NAISSANCE ||
        donnes ===
            AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES ||
        donnes === AlbumDataFields.REPONDANT_ANNEE_TRAVAILLEES ||
        donnes === AlbumDataFields.ACTIONNAIRES_NOMBRE
    );
}

function needsAglomerationFiltering(donnes: string) {
    return donnes === AlbumDataFields.NOMBRE_EMPLOYE;
}

function convertNumber(donnes: string, data: any, possibleValues: any) {
    if (donnes === AlbumDataFields.ANNEE_FONDATION) {
        if (data < 1900) {
            return possibleValues[0].toString();
        } else if (data < 1960) {
            return possibleValues[1].toString();
        } else if (data < 1970) {
            return possibleValues[2].toString();
        } else if (data < 1980) {
            return possibleValues[3].toString();
        } else if (data < 1990) {
            return possibleValues[4].toString();
        } else if (data < 2000) {
            return possibleValues[5].toString();
        } else if (data < 2010) {
            return possibleValues[6].toString();
        } else if (data >= 2010) {
            return possibleValues[7].toString();
        } else if (data.toString() === 'NaN') {
            return possibleValues[8].toString();
        }
    } else if (donnes === AlbumDataFields.REPONDANT_ANNEE_NAISSANCE) {
        if (data < 1960) {
            return possibleValues[0].toString();
        } else if (data < 1970) {
            return possibleValues[1].toString();
        } else if (data < 1980) {
            return possibleValues[2].toString();
        } else if (data < 1990) {
            return possibleValues[3].toString();
        } else if (data < 2000) {
            return possibleValues[4].toString();
        } else if (data < 2010) {
            return possibleValues[5].toString();
        } else if (data >= 2010) {
            return possibleValues[6].toString();
        }
    } else if (
        donnes ===
        AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES
    ) {
        if (data < 10) {
            return possibleValues[0].toString();
        } else if (data < 25) {
            return possibleValues[1].toString();
        } else if (data < 50) {
            return possibleValues[2].toString();
        } else if (data < 75) {
            return possibleValues[3].toString();
        } else if (data >= 75) {
            return possibleValues[4].toString();
        } else if (data.toString() === ' NaN') {
            return possibleValues[5].toString();
        }
    } else if (donnes === AlbumDataFields.REPONDANT_ANNEE_TRAVAILLEES) {
        if (data < 10) {
            return possibleValues[0].toString();
        } else if (data < 20) {
            return possibleValues[1].toString();
        } else if (data < 30) {
            return possibleValues[2].toString();
        } else if (data < 40) {
            return possibleValues[3].toString();
        } else if (data >= 40) {
            return possibleValues[4].toString();
        } else if (data.toString() === ' NaN') {
            return possibleValues[5].toString();
        }
    } else if (donnes === AlbumDataFields.ACTIONNAIRES_NOMBRE) {
        if (data == 0) {
            return possibleValues[0].toString();
        } else if (data === 1) {
            return possibleValues[1].toString();
        } else if (data === 2) {
            return possibleValues[2].toString();
        } else if (data === 3) {
            return possibleValues[3].toString();
        } else if (data === 4) {
            return possibleValues[4].toString();
        } else if (data >= 5) {
            return possibleValues[5].toString();
        } else if (data.toString() === ' NaN') {
            return possibleValues[6].toString();
        }
    }
}

function numberData(
    donnes: string,
    result: Map<any, any>,
    possibleValues: any,
) {
    const returnMap = new Map();

    possibleValues.map((value: any) =>
        returnMap.set(value.toString(), { name: value.toString(), value: 0 }),
    );
    Array.from(result.values()).map((item) => {
        const conversion = convertNumber(donnes, item.name, possibleValues);
        returnMap.set(conversion, {
            name: conversion,
            value: returnMap.get(conversion).value + item.value,
        });
    });

    return returnMap;
}

function aglomerateData(
    donnes: string,
    result: Map<any, any>,
    possibleValues: any,
) {
    const returnMap = result;
    console.log(result);
    let none = result.get('aucun').value || 0;
    none += result.get('AUCUN').value || 0;
    none += result.get('Aucun').value || 0;

    console.log(none);
    returnMap.set('aucun', { name: 'aucun', value: none });
    returnMap.delete('Aucun');
    returnMap.delete('AUCUN');

    return returnMap;
}

// function generateMatchStage(filters: CompanyInfo, fields: string[]): any {
//     const matchStage: any = {};

//     for (const [key, value] of Object.entries(filters)) {
//         if (value === 'toutes' || value === null || value === -1) continue;

//         if (typeof value === 'object' && value !== null) {
//             for (const [nestedKey, nestedValue] of Object.entries(value)) {
//                 if (
//                     nestedValue !== 'toutes' &&
//                     nestedValue !== null &&
//                     nestedValue !== -1
//                 ) {
//                     matchStage[`${key}.${nestedKey}`] = nestedValue;
//                 }
//             }
//         } else {
//             matchStage[key] = value;
//         }
//     }

//     fields.map((field) => {
//         if (matchStage[field]) {
//             matchStage[field] = {
//                 $exists: true,
//                 $nin: [null, NaN],
//                 $in: [matchStage[field]],
//             };
//         } else {
//             matchStage[field] = {
//                 $exists: true,
//                 $nin: [null, NaN],
//             };
//         }
//     });

//     return matchStage;
// }

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

    if (Array.isArray(result[0].name.field1)) {
        if (Array.isArray(result[0].name.field2)) {
            // F1 -> [] F2 -> []
            result.map((item: any) => {
                item.name.field1.map((value1: any) => {
                    item.name.field2.map((value2: any) => {
                        returnMap.set(`${value1}-${value2}`, {
                            count:
                                returnMap.get(`${value1}-${value2}`).count +
                                item.count,
                        });
                    });
                });
            });
        } else if (needsNumberFiltering(field2)) {
            // F1 -> [] F2 -> number
            result.map((item: any) => {
                item.name.field1.map((value1: any) => {
                    const value2 = convertNumber(
                        field2,
                        item.name.field2,
                        possibleValues[field2],
                    );
                    returnMap.set(`${value1}-${value2}`, {
                        count:
                            returnMap.get(`${value1}-${value2}`).count +
                            item.count,
                    });
                });
            });
        } else {
            // F1 -> [] F2 -> string
            result.map((item: any) => {
                item.name.field1.map((value1: any) => {
                    if (
                        possibleValues[field2].find(
                            (something) =>
                                something.toString() ===
                                item.name.field2.toString(),
                        )
                    ) {
                        returnMap.set(`${value1}-${item.name.field2}`, {
                            count:
                                returnMap.get(`${value1}-${item.name.field2}`)
                                    .count + item.count,
                        });
                    }
                });
            });
        }
    } else if (needsNumberFiltering(field1)) {
        if (Array.isArray(result[0].name.field2)) {
            console.log('number - array');
            // F1 -> number F2 -> []
            result.map((item: any) => {
                item.name.field2.map((value2: any) => {
                    const value1 = convertNumber(
                        field1,
                        item.name.field1,
                        possibleValues[field1],
                    );
                    returnMap.set(`${value1}-${value2}`, {
                        count:
                            returnMap.get(`${value1}-${value2}`).count +
                            item.count,
                    });
                });
            });
        } else if (needsNumberFiltering(field2)) {
            console.log('number - number');
            // F1 -> number F2 -> number
            result.map((item: any) => {
                const value1 = convertNumber(
                    field1,
                    item.name.field1,
                    possibleValues[field1],
                );
                const value2 = convertNumber(
                    field2,
                    item.name.field2,
                    possibleValues[field2],
                );
                returnMap.set(`${value1}-${value2}`, {
                    count:
                        returnMap.get(`${value1}-${value2}`).count + item.count,
                });
            });
        } else {
            // F1 -> number F2 -> string
            console.log('number - string ');
            result.map((item: any) => {
                const value1 = convertNumber(
                    field1,
                    item.name.field1,
                    possibleValues[field1],
                );
                if (
                    possibleValues[field2].find(
                        (something) =>
                            something.toString() ===
                            item.name.field2.toString(),
                    )
                ) {
                    returnMap.set(`${value1}-${item.name.field2}`, {
                        count:
                            returnMap.get(`${value1}-${item.name.field2}`)
                                .count + item.count,
                    });
                }
            });
        }
    } else {
        if (Array.isArray(result[0].name.field2)) {
            // F1 -> string F2 -> []

            console.log('string - array');
            result.map((item: any) => {
                item.name.field2.map((value2: any) => {
                    if (
                        possibleValues[field1].find(
                            (something) =>
                                something.toString() ===
                                item.name.field1.toString(),
                        )
                    ) {
                        returnMap.set(`${item.name.field1}-${value2}`, {
                            count:
                                returnMap.get(`${item.name.field1}-${value2}`)
                                    .count + item.count,
                        });
                    }
                });
            });
        } else if (needsNumberFiltering(field2)) {
            // F1 -> string F2 -> number
            console.log('string - number');
            result.map((item: any) => {
                const value2 = convertNumber(
                    field2,
                    item.name.field2,
                    possibleValues[field2],
                );
                if (
                    possibleValues[field1].find(
                        (something) =>
                            something.toString() ===
                            item.name.field1.toString(),
                    )
                ) {
                    returnMap.set(`${item.name.field1}-${value2}`, {
                        count:
                            returnMap.get(`${item.name.field1}-${value2}`)
                                .count + item.count,
                    });
                }
            });
        } else {
            // F1 -> string F2 -> string
            console.log('string - string');

            result.map((item: any) => {
                if (
                    possibleValues[field1].findIndex(
                        (something) =>
                            something.toString() ===
                            item.name.field1.toString(),
                    ) >= 0 &&
                    possibleValues[field2].findIndex(
                        (something) =>
                            something.toString() ===
                            item.name.field2.toString(),
                    ) >= 0
                ) {
                    returnMap.set(
                        `${item.name.field1.toString()}-${item.name.field2.toString()}`,
                        {
                            count:
                                returnMap.get(
                                    `${item.name.field1.toString()}-${item.name.field2.toString()}`,
                                ).count + item.count,
                        },
                    );
                }
            });
        }
    }

    return returnMap;
}
