import { useState } from 'react';

import { Fournisseur } from '@/components/interface/fournisseur';
import { FournisseursHttpRequestService } from '@/services/fournisseur-http-request-service';
import useGlobalDataStore from '@/stores/global-data-store';

export function useFournisseurActions() {
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentFournisseur, setCurrentFournisseur] =
        useState<Fournisseur | null>(null);

    const { filterFournisseurData } = useGlobalDataStore((state: any) => {
        return {
            filterFournisseurData: state.filterFournisseurData,
        };
    });

    const openEditDialog = (fournisseur: Fournisseur) => {
        setCurrentFournisseur(fournisseur);
        setEditDialogOpen(true);
    };

    const closeEditDialog = () => {
        setEditDialogOpen(false);
        setCurrentFournisseur(null);
    };

    const submitEditDialog = async (fournisseur: Fournisseur) => {
        if (fournisseur._id) {
            await FournisseursHttpRequestService.update(fournisseur);
        } else {
            await FournisseursHttpRequestService.insert(fournisseur);
        }
        filterFournisseurData();

        closeEditDialog();
    };

    const openDeleteDialog = (fournisseur: Fournisseur) => {
        setCurrentFournisseur(fournisseur);
        setDeleteDialogOpen(true);
    };

    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setCurrentFournisseur(null);
    };

    const submitDeleteDialog = async (id?: string) => {
        if (id) {
            await FournisseursHttpRequestService.delete(id);
            filterFournisseurData();
        }
        closeDeleteDialog();
    };

    const toggleFournisseurVisibility = async (fournisseur: Fournisseur) => {
        if (fournisseur) {
            const newFournisseur = {
                ...fournisseur,
                visible: !fournisseur.visible,
            };
            await FournisseursHttpRequestService.update(newFournisseur);
            filterFournisseurData();
        }
    };

    return {
        isEditDialogOpen,
        isDeleteDialogOpen,
        currentFournisseur,
        openEditDialog,
        closeEditDialog,
        submitEditDialog,
        openDeleteDialog,
        closeDeleteDialog,
        submitDeleteDialog,
        toggleFournisseurVisibility,
    };
}
