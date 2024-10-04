import { APIPaths } from '@/components/enums/page-api-paths-enum';
import { Fournisseur } from '@/components/interface/fournisseur';
import axios from 'axios';

export const FournisseursHttpRequestService = {
    getAll: getAllData,
    update: updateOne,
    insert: addOne,
    delete: deleteOne,
};

async function getAllData(
    filters: Record<string, any>,
): Promise<Fournisseur[]> {
    try {
        const response = await axios.get(APIPaths.FOURNISSEURS_GET_ALL, {
            params: {
                filters: JSON.stringify(filters),
            },
        });
        return response.data.pages;
    } catch (error: any) {
        console.error(
            'Error fetching fournisseurs:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function updateOne(fournisseur: Fournisseur) {
    try {
        const response = await axios.patch(
            APIPaths.FOURNISSEURS_UPDATE_ONE,
            fournisseur,
        );
    } catch (error: any) {
        console.error(
            'Error updating fournisseur:',
            error.response ? error.response.data : error.message,
        );
    }
}

async function addOne(fournisseur: Fournisseur) {
    try {
        const response = await axios.post(
            APIPaths.FOURNISSEURS_ADD_ONE,
            fournisseur,
        );
    } catch (error: any) {
        console.error(
            'Error inserting fournisseur:',
            error.response ? error.response.data : error.message,
        );
    }
}

async function deleteOne(_id: string) {
    try {
        const response = await axios.delete(APIPaths.FOURNISSEURS_DELETE_ONE, {
            params: { _id },
        });
    } catch (error: any) {
        console.error(
            'Error deleting fournisseur:',
            error.response?.data?.error || error.message,
        );
    }
}
