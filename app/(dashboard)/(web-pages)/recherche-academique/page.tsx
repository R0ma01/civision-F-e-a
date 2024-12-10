'use client';
import React, { useEffect, useState } from 'react';

import PageContentContainer from '@/components/component/page-content-container/page-content-container';
import useMapStore from '@/stores/global-map-store';
import DataCardContent from '@/components/interface/data-card-content';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import DataCard from '@/components/component/data-card/data-card';
import DataCardContainer from '@/components/component/data-card/data-card-container';
import { ChercheurDropdownItem } from '@/components/interface/chercheur-drop-down-content';
import { MapType } from '@/components/enums/map-type-enum';
import { Language } from '@/components/enums/language';
import { RecherchePromptsTranslations } from '@/constants/translations/page-prompts';
import StaticDropdown from '@/components/component/drop-down-menu/chercheur-drop-down';

import useDataStore from '@/reducer/dataStore';

export default function RechercheAcademique() {
    const lang: Language = useDataStore((state) => state.lang);

    const [cards, setCards] = useState<Map<string, DataCardContent>>(new Map());

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

    function showGraph(item: ChercheurDropdownItem) {
        setCards((prevCards) => {
            const newCards = new Map(prevCards);

            if (newCards.has(item.label)) {
                newCards.delete(item.label);
            } else {
                const newDataCard: DataCardContent = {
                    title: { FR: item.label, EN: '' },
                    description: { FR: '', EN: '' },
                    type: DataCardType.SIMPLE_GRAPH,
                    graphData: [
                        {
                            graphType: item.graphType,
                            donnes: item.donnees,
                        },
                    ],
                };
                newCards.set(item.label, newDataCard);
            }

            return newCards;
        });
    }

    const firstItem: DataCardContent = {
        title: { FR: 'Sélecteur de données', EN: '' },
        description: { FR: '', EN: '' },
        graphData: [],
        chercheurDropdownOnCLick: showGraph,
        type: DataCardType.CHERCHEUR_DROPDOWN,
    };

    return (
        <PageContentContainer
            className="overflow-y-hidden pb-10 relative w-full h-[100vh]"
            filterMenu={true}
        >
            <div className="absolute w-[400px] top-0 left-0 h-screen max-h-[100%] overflow-visible bg-[#F0F3F4] dark:bg-[#363636]">
                <StaticDropdown onClick={showGraph} />
            </div>
            <div className="flex flex-row w-full h-screen pl-[320px] pr-[70px] py-5">
                <div className="flex flex-col overflow-y-scroll scroll-hide">
                    <DataCardContainer
                        cards={[...Array.from(cards.values())]}
                        className="flex-wrap z-10 gap-2 justify-center"
                        year={2022}
                    />
                </div>
            </div>
        </PageContentContainer>
    );
}
