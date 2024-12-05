import { NextResponse } from 'next/server';
import { connectToDatabaseRepertoire } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import axios from 'axios';

const serverURL = process.env.SERVER_API;

export async function POST(req: Request) {
    try {
        const db = (await connectToDatabaseRepertoire()).db;
        const collection = db.collection(MongoDBPaths.REGISTRE_QC);

        const { entreprises } = await req.json();

        // Use Promise.all to wait for all async operations in the map
        const foundCompanies = await Promise.all(
            entreprises.map(async (company: any) => {
                const returnCompanies = await collection
                    .find(
                        {
                            NEQ: company.NEQ,
                        },
                        {
                            projection: {
                                _id: 0,
                                NEQ: 1,
                                NOM_ASSUJ: 1,
                                COD_ACT_ECON_CAE: 1,
                                ADR: 1,
                                COORD: 1,
                                NOM_ETAB: 1,
                                COD_POSTAL: 1,
                                NB_EMPLO: 1,
                                SCIAN: 1,
                                REG_IDU: 1,
                                MRC_IDU: 1,
                                MUNIC_IDU: 1,
                            },
                        },
                    )
                    .toArray();

                return returnCompanies; // Return the array of results
            }),
        );

        return NextResponse.json({ foundCompanies }, { status: 200 });
    } catch (e: any) {
        console.error(e.message);

        const errorResponse = NextResponse.json(
            { error: e.message },
            { status: 500 },
        );

        return errorResponse;
    }
}
