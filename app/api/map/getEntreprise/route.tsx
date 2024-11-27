import { NextResponse } from 'next/server';
import { connectToDatabaseRepertoire } from '@/utils/mongodb';
import { MongoDBPaths } from '@/components/enums/mongodb-paths-enum';
import { EntreprisePointData } from '@/components/interface/point-data';
import { ObjectId } from 'mongodb';
import traductionCAE from '@/services/cae_to_name.json';

export async function GET(request: Request) {
    try {
        // Extract the ID from the request URL
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 },
            );
        }

        const db = (await connectToDatabaseRepertoire()).db;
        const collection = db.collection(MongoDBPaths.REGISTRE_QC);

        // Query the database for the document with the given ID
        const document = await collection.findOne(
            { _id: new ObjectId(id) },
            {
                projection: {
                    _id: 1,
                    COORD: 1,
                    NOM_ASSUJ: 1,
                    COD_ACT_ECON_CAE: 1,
                    DESC_ACT_ECON_ASSUJ: 1,
                    ADR_DOMCL_LIGN1_ADR: 1,
                    ADR_DOMCL_LIGN2_ADR: 1,
                    ADR_DOMCL_LIGN4_ADR: 1,
                    NB_EMPLO: 1,
                },
            },
        );

        if (!document) {
            return NextResponse.json(
                { error: 'Document not found' },
                { status: 404 },
            );
        }

        const CAE_CODE: string =
            document.COD_ACT_ECON_CAE as keyof typeof traductionCAE;
        const CAE_translation: string =
            CAE_CODE in traductionCAE
                ? traductionCAE[CAE_CODE as keyof typeof traductionCAE]
                : 'default value'; // Handle invalid keys

        // Transform the document to PointData format
        const entreprise: EntreprisePointData = {
            _id: document._id.toString(),
            coords: document.COORD,
            nom: document.NOM_ASSUJ[0] || 'Non Disponible',
            adresse:
                `${document.ADR_DOMCL_LIGN1_ADR || ''} ${document.ADR_DOMCL_LIGN2_ADR || ''} ${document.ADR_DOMCL_LIGN4_ADR || ''}`.trim(),
            secteur_activite: CAE_translation || 'Non Disponible',
            taille_entreprise: document.NB_EMPLO
                ? `${document.NB_EMPLO} employés`
                : 'Non Disponible',
        };

        // Return a successful response
        return NextResponse.json({
            message: 'Document found successfully',
            entreprise: entreprise,
        });
    } catch (e: any) {
        console.error(e.message);

        // Return an error response
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
