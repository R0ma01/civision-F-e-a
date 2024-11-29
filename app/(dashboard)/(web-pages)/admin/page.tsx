'use client';
import React, { useCallback, useEffect, useState } from 'react';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import ThemeCard from '@/components/component/theme-card/theme-card';
import useGlobalUserStore from '@/stores/global-user-store';
import DeleteItemDialog from '@/components/component/dialogs/delete-page-dialog';
import { AddCircleSVG } from '@/components/component/svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '@/components/component/buttons/button';
import PageTabContent from '@/components/interface/page-tabs-content';
import { usePageActions } from './use-page-actions'; // Import the custom hook
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { AdminPromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';
import { AdminModal } from '@/components/component/admin-modal/admin-modal';
import { Language } from '@/components/enums/language';
import { PageHttpRequestService } from '@/services/page-http-request-service';
import AdminPageTutorial from '@/components/component/tutorials/admin-page-tutorial';
import { TutorialPages, UserType } from '@/components/enums/user-type-enum';
import { html_object_constants } from '@/constants/constants';

import { getAuthSession } from '@/services/credentials-login';
export default function Admin() {
    const lang: Language = useDataStore((state) => state.lang);
    const [pages, setPages] = useState<PageTabContent[]>([]);
    const newPage: PageTabContent = {
        title: { FR: 'Nouvelle Page', EN: 'New Page' },
        description: { FR: 'Nouvelle Description', EN: 'New Description' },
        tabs: [],
        backgroundImage: '',
        visible: false,
    };

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
            tutorials: state.tutorials,
            updateCompletedTutorials: state.updateCompletedTutorials,
        }),
    );

    function onComplete() {
        const newTuts = [...tutorials];
        newTuts[TutorialPages.ADMIN] = true;
        updateCompletedTutorials(newTuts);
    }

    useEffect(() => {
        if (user !== UserType.VISITOR) {
            if (!tutorials[TutorialPages.ADMIN]) {
                const tour: any = AdminPageTutorial(onComplete);
                tour.start();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [fetchData, setFetch] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchPages = useCallback(async () => {
        const newPages = await PageHttpRequestService.getAll();
        console.log('Fetched pages:', newPages); // Log
        if (newPages) {
            setPages([...newPages]);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!fetchData && !loading) {
            setLoading(true);
            setFetch(true);
            fetchPages();
        }
    }, [fetchData, loading, fetchPages]);

    const { mapType, setMapStyle } = useMapStore((state) => ({
        setMapStyle: state.setMapStyle,
        mapType: state.mapType,
    }));

    useEffect(() => {
        if (mapType !== MapType.PAGE_INFORMATION_ALBUM) {
            setMapStyle(MapType.PAGE_INFORMATION_ALBUM);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType, setMapStyle]);

    const {
        isEditDialogOpen,
        isDeleteDialogOpen,
        currentPage,
        openEditDialog,
        closeEditDialog,

        openDeleteDialog,
        closeDeleteDialog,
    } = usePageActions();

    async function submitEditDialog(page: PageTabContent) {
        closeEditDialog();
        let resp = false;
        if (page._id) {
            resp = await PageHttpRequestService.update(page);
        } else {
            resp = await PageHttpRequestService.insert(page);
        }

        if (resp) {
            setFetch(false);
        }
    }

    async function submitDeleteDialog(id: string) {
        closeDeleteDialog();
        let resp = false;
        if (id) {
            resp = await PageHttpRequestService.delete(id);
        }

        if (resp) {
            setFetch(false);
        }
    }

    async function togglePageVisibility(id: string | undefined) {
        let resp = false;
        if (id) {
            const page: PageTabContent = pages.filter(
                (pageItem) => pageItem._id === id,
            )[0];
            if (page) {
                page.visible = !page.visible;
                resp = await PageHttpRequestService.update(page);
            }
        }

        if (resp) {
            setFetch(false);
        }
    }

    return (
        <PageContentContainer className="h-screen overflow-y-auto relative flex items-center w-[100%]">
            <div className="justify-center flex flex-col w-[80%] items-center relative">
                {loading ? (
                    <div className="loader-circle absolute top-[35vh] left-[45vw] w-fit"></div>
                ) : (
                    <div className="justify-center flex flex-wrap mt-8">
                        {pages
                            ? pages.map(
                                  (page: PageTabContent, index: number) => (
                                      <ThemeCard
                                          index={`${html_object_constants.theme_card_id}-${index}`}
                                          key={index} // Ensure unique key
                                          page={page}
                                          admin={user === UserType.ADMIN} // Correct comparison with user
                                          onClickEdit={() =>
                                              openEditDialog(page)
                                          } // Pass page data to openEditDialog
                                          onClickDelete={() =>
                                              openDeleteDialog(page)
                                          }
                                          onClickVisible={async () =>
                                              togglePageVisibility(page._id)
                                          }
                                      />
                                  ),
                              )
                            : AdminPromptsTranslations.unavailable[lang]}
                    </div>
                )}

                <Button
                    buttonType={ButtonType.ICON}
                    onClick={() => openEditDialog(newPage)}
                >
                    <AddCircleSVG className="w-[100px] h-[100px] fill-black dark:fill-white" />
                </Button>
            </div>
            {isEditDialogOpen && currentPage && (
                <AdminModal
                    page={currentPage}
                    closeDialog={closeEditDialog}
                    submitDialog={submitEditDialog}
                ></AdminModal>
            )}
            {isDeleteDialogOpen && currentPage && (
                <DeleteItemDialog
                    closeDialog={closeDeleteDialog}
                    submitDialog={submitDeleteDialog}
                    deleteItem={currentPage}
                />
            )}
        </PageContentContainer>
    );
}
