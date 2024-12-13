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
import Image from 'next/image';
import { AddManyFournisseursDialog } from '@/components/component/dialogs/add-many-fournisseurs-dialog';
import axios from 'axios';
import { getAuthSession } from '@/services/credentials-login';
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

    const [user, setUser] = useState(UserType.VISITOR);

    useEffect(() => {
        async function fectchSession() {
            const session: any = await getAuthSession();

            if (session && session.user && session.user.email) {
                if (session.user.admin) {
                    setUser(UserType.ADMIN);
                } else {
                    setUser(UserType.USER);
                }
            }
        }
        fectchSession();
    }, []);
    const { tutorials, updateCompletedTutorials } = useGlobalUserStore(
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

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    return (
        <>
            <PageContentContainer
                filterMenu={true}
                className="relative overflow-auto pb-10 pt-10 h-full w-[400px]"
            >
                <div className="absolute top-0 left-0 w-[400px] h-[100%]">
                    <ListeFournisseurs
                        admin={user === UserType.ADMIN}
                        openEditDialog={openEditDialog}
                        openAddDialog={() => {
                            setIsAddDialogOpen(true);
                        }}
                        openDeleteDialog={openDeleteDialog}
                        toggleFournisseurVisibility={
                            toggleFournisseurVisibility
                        }
                    ></ListeFournisseurs>
                </div>

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
            {isAddDialogOpen && (
                <AddManyFournisseursDialog
                    closeDialog={() => {
                        setIsAddDialogOpen(false);
                    }}
                    handleSubmit={async (fournisseurs) => {
                        await axios.post('/api/fournisseurs/addMany', {
                            fournisseurs,
                        });
                    }}
                ></AddManyFournisseursDialog>
            )}
        </>
    );
}

export default Fournisseurs;
