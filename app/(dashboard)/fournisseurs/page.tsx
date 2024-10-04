'use client';

import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import useMapStore from '@/stores/global-map-store';
import { useEffect, useState } from 'react';
import { EditFournisseurDialog } from '@/components/component/dialogs/edit-fournisseur-dialog';
import { MapType } from '@/components/enums/map-type-enum';
import { useFournisseurActions } from './use-fournisseur-actions';
import DeleteItemDialog from '@/components/component/dialogs/delete-page-dialog';
import ListeFournisseurs from '@/components/component/liste-fournisseurs/liste-fournisseurs';
import useGlobalDataStore from '@/stores/global-data-store';
import { Language } from '@/components/enums/language';
import { FournisseurPromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';
import useGlobalFilterStore from '@/stores/global-filter-store';
import { Fournisseur } from '@/components/interface/fournisseur';
import useGlobalUserStore from '@/stores/global-user-store';
import FournisseurPageTutorial from '@/components/component/tutorials/fournisseur-page-tutorial';
import { TutorialPages, UserType } from '@/components/enums/user-type-enum';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '@/components/component/buttons/button';

function Fournisseurs() {
    const lang: Language = useDataStore((state) => state.lang);

    const { matchStage, resetFilters } = useGlobalFilterStore((state) => ({
        resetFilters: state.resetFilters,
        matchStage: state.matchStage,
    }));

    useEffect(() => {
        resetFilters();
    }, [resetFilters]);

    const {
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
    } = useFournisseurActions();

    const { mapType, setMapStyle } = useMapStore((state) => ({
        setMapStyle: state.setMapStyle,
        mapType: state.mapType,
    }));

    const {
        fournisseurDataFetched,
        fetchFournisseurData,
        loading,
        filterFournisseurData,
    } = useGlobalDataStore((state: any) => ({
        fournisseurDataFetched: state.fournisseurDataFetched,
        fetchFournisseurData: state.fetchFournisseurData,
        loading: state.loading,
        filterFournisseurData: state.filterFournisseurData,
    }));

    const { user, tutorials, updateCompletedTutorials } = useGlobalUserStore(
        (state: any) => ({
            user: state.user,
            tutorials: state.tutorials,
            updateCompletedTutorials: state.updateCompletedTutorials,
        }),
    );

    function onComplete() {
        const newTuts = [...tutorials];
        newTuts[TutorialPages.FOURNISSEUR] = true;
        updateCompletedTutorials(newTuts);
    }
    useEffect(() => {
        if (user !== UserType.VISITOR) {
            if (!tutorials[TutorialPages.FOURNISSEUR]) {
                const tour = FournisseurPageTutorial(onComplete);
                tour.start();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function fetch() {
            await fetchFournisseurData(matchStage);
        }

        if (mapType !== MapType.FOURNISSEURS) {
            setMapStyle(MapType.FOURNISSEURS);
        }

        if (!fournisseurDataFetched && !loading) {
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType, setMapStyle]);

    return (
        <>
            <PageContentContainer
                filterMenu={true}
                className="overflow-auto pb-10 pl-[30px] pt-10"
            >
                <ListeFournisseurs
                    admin={user === UserType.ADMIN}
                    openEditDialog={openEditDialog}
                    openDeleteDialog={openDeleteDialog}
                    toggleFournisseurVisibility={toggleFournisseurVisibility}
                ></ListeFournisseurs>

                <Button
                    buttonType={ButtonType.CONFIRM}
                    onClick={() =>
                        window.open(
                            'https://forms.gle/x1rgzmTpfrT49LMG9',
                            '_blank',
                        )
                    }
                    className="m-3 self-center"
                    title="redirect:https://forms.gle/x1rgzmTpfrT49LMG9"
                >
                    Inscrivez-vous sur la liste
                </Button>

                {isEditDialogOpen && currentFournisseur && (
                    <EditFournisseurDialog
                        closeDialog={closeEditDialog}
                        submitDialog={(fournisseur: Fournisseur) => {
                            submitEditDialog(fournisseur);
                            filterFournisseurData();
                        }}
                        fournisseur={currentFournisseur}
                    />
                )}
                {isDeleteDialogOpen && currentFournisseur && (
                    <DeleteItemDialog
                        closeDialog={closeDeleteDialog}
                        submitDialog={submitDeleteDialog}
                        deleteItem={currentFournisseur}
                    />
                )}
            </PageContentContainer>
        </>
    );
}

export default Fournisseurs;
