'use client';
import DataCard from '@/components/component/data-card/data-card';
import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import RepertoirePageTutorial from '@/components/component/tutorials/repertoire-page-tutorial';
import useMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';
import { useEffect, useState } from 'react';
import { Language } from '@/components/enums/language';
import { RepertoirePromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';
import useGlobalUserStore from '@/stores/global-user-store';
import { TutorialPages, UserType } from '@/components/enums/user-type-enum';
import {
    UpArrowSVG,
    FactorySVG,
} from '@/components/component/svg-icons/svg-icons';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';
import { AddEntrepriseDialog } from '@/components/component/dialogs/add-many-entreprises-dialog';
import SearchBox from '@/components/component/search-box/search-box';

import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import { AddCircleSVG } from '@/components/component/svg-icons/svg-icons';
import axios from 'axios';
import { getAuthSession } from '@/services/credentials-login';

const DataCardDiv: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <div
            className={`w-[270px] max-w-[270px] h-[130px] bg-[#f5ebe0] dark:bg-[#363636] dark:bg-opacity-50 dark:text-white backdrop-filter
                 backdrop-blur bg-opacity-50 saturate-100 backdrop-contrast-100 rounded-xl shadow-3xl pointer-events-auto
                 flex flex-col items-center`}
        >
            {children}
        </div>
    );
};

function Repertoire() {
    const lang: Language = useDataStore((state) => state.lang);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { mapType, setMapStyle } = useMapStore((state) => ({
        setMapStyle: state.setMapStyle,
        mapType: state.mapType,
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
        newTuts[TutorialPages.REPERTOIRE] = true;
        updateCompletedTutorials(newTuts);
    }

    useEffect(() => {
        if (user !== UserType.VISITOR) {
            if (!tutorials[TutorialPages.REPERTOIRE]) {
                const tour = RepertoirePageTutorial(onComplete);
                tour.start();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [nombreEntreprises, setNombreEntreprises] = useState<number | null>(
        null,
    );
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchNombreEntreprises() {
            const nombre =
                await GraphDataHttpRequestService.getLengthRepertoireData();
            if (nombre > 0) {
                setNombreEntreprises(nombre);
            } else {
                setLoading(false);
            }
        }

        if (!loading && !nombreEntreprises) {
            setLoading(true);
            fetchNombreEntreprises();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (mapType !== MapType.REPERTOIRE) {
            setMapStyle(MapType.REPERTOIRE);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapType, setMapStyle]);

    const fetchedData = {
        thirdField: {
            type: DataCardType.SEARCH,
            title: RepertoirePromptsTranslations.data_card3_title,
            description: { FR: '', EN: '' },
            graphData: [],
        },
    };
    return (
        <PageContentContainer
            filterMenu={true}
            className="overflow-visible relative"
        >
            <div className="flex flex-col h-[100%] bg-[#F0F3F4] dark:bg-[#363636] items-center">
                <div className="flex h-fit relative w-full pl-2">
                    <div className="w-[300px] h-fit dark:text-white flex flex-col mt-2 ml-1 text-wrap whitespace-normal ">
                        <p className="text-xs font-bold">
                            {RepertoirePromptsTranslations.div1_sentence[lang]}
                        </p>
                        <div className="w-[100px] h-[30px] flex flex-row gap-1">
                            {nombreEntreprises && (
                                <>
                                    <UpArrowSVG className="w-7 h-7 "></UpArrowSVG>
                                    <p className="text-2xl ">
                                        {nombreEntreprises}
                                    </p>
                                </>
                            )}
                            {!nombreEntreprises && (
                                <div className="loader-circle-small "></div>
                            )}
                        </div>
                        <p className="text-xs ">
                            {
                                RepertoirePromptsTranslations.div1_descriptive[
                                    lang
                                ]
                            }
                        </p>
                    </div>

                    <Button
                        buttonType={ButtonType.CONFIRM}
                        onClick={() =>
                            window.open(
                                'https://forms.gle/AYNdESgqbf48U73P8',
                                '_blank',
                            )
                        }
                        className="w-[100px] text-xs absolute top-2 right-2"
                        title="redirect:https://forms.gle/AYNdESgqbf48U73P8"
                    >
                        {RepertoirePromptsTranslations.subscribe[lang]}
                    </Button>
                </div>
                {user === UserType.ADMIN && (
                    <Button
                        buttonType={ButtonType.ICON}
                        onClick={() => {
                            setIsDialogOpen(true);
                        }}
                        className="absolute bottom-2 w-[400px] flex justify-center"
                    >
                        <AddCircleSVG
                            className={'fill-black dark:fill-white'}
                        ></AddCircleSVG>
                    </Button>
                )}
                <div className="h-[90%] mt-4">
                    <SearchBox></SearchBox>
                </div>
            </div>

            {isDialogOpen && (
                <AddEntrepriseDialog
                    closeDialog={() => {
                        setIsDialogOpen(false);
                    }}
                    handleSubmit={async (companies: any) => {
                        try {
                            const response = await axios.post(
                                '/api/repertoire/addEntreprise',
                                { companies },
                            );

                            return response.data?.insertedIds || 0;
                        } catch (e) {
                            return 0;
                        }
                    }}
                ></AddEntrepriseDialog>
            )}
        </PageContentContainer>
    );
}

export default Repertoire;
