import React, { useState, useEffect } from 'react';
import Button from '@/components/component/buttons/button';
import {
    FilterSVG,
    InvisibleSVG,
    VisibleSVG,
} from '@/components/component/svg-icons/svg-icons';

import {
    AlbumDataFields,
    FournisseurDataFields,
    RepertoireDataFields,
    IndexeDataFieldsA,
    IndexeDataFieldsB,
} from '@/components/enums/data-types-enum';
import useGlobalFilterStore from '@/stores/global-filter-store';
import useGlobalDataStore from '@/stores/global-data-store';
import { ButtonType } from '@/components/enums/button-type-enum';
import useMapStore from '@/stores/global-map-store';
import { html_object_constants, value_constants } from '@/constants/constants';
import { MapType } from '@/components/enums/map-type-enum';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';
import { GraphTextService } from '@/services/translations';
import { LanguageToggle } from '@/components/component/language-toggle/language-toggle';
import { FilterList } from './filter-list';
import DropdownSelect from '@/components/component/drop-down-menu/drop-down-menu-selected-field';

const filterConfigurations = {
    [MapType.REPERTOIRE]: {
        general: [RepertoireDataFields.NB_EMPLO],
    },
    [MapType.PAGE_INFORMATION_ALBUM]: {
        general: [
            AlbumDataFields.TAILLE_ENTREPRISE,
            AlbumDataFields.ANNEE_FONDATION,
            AlbumDataFields.DIRIGEANT_GENERATION,
        ],
        advanced: [
            AlbumDataFields.COORDONNES_REGION,
            AlbumDataFields.SECTEUR_ACTIVITE,
            AlbumDataFields.REVENUS_RANG,
        ],
    },
    [MapType.FOURNISSEURS]: {
        general: [
            FournisseurDataFields.SECTEURS_GEOGRAPHIQUES,
            FournisseurDataFields.SERVICES_OFFERTS,
        ],
    },
    [MapType.PAGE_INFORMATION_INDEX_VOLETA]: {
        general: [IndexeDataFieldsA.Q0QC, IndexeDataFieldsA.QE6],
        advanced: [
            IndexeDataFieldsA.QE1x,
            IndexeDataFieldsA.QE1Cx,
            IndexeDataFieldsA.QE3,
        ],
    },
    [MapType.PAGE_INFORMATION_INDEX_VOLETB]: {
        general: [
            IndexeDataFieldsB.Q0QC,
            IndexeDataFieldsB.QD8,
            IndexeDataFieldsB.QZ19,
        ],
        advanced: [IndexeDataFieldsB.QDA1r6, IndexeDataFieldsB.QD11],
    },
};

interface FilterMenuProps {
    toggleContentVisibility?: () => void;
    className?: string;
}
const FilterMenu: React.FC<FilterMenuProps> = ({
    toggleContentVisibility = () => {},
    className = '',
}) => {
    const lang: Language = useDataStore((state) => state.lang);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedTab, setSelectedTab] = useState<string>('general');

    const { matchStage, setFilter, resetFilters } = useGlobalFilterStore(
        (state: any) => ({
            matchStage: state.matchStage,
            setFilter: state.setFilter,
            resetFilters: state.resetFilters,
        }),
    );

    const { mapType } = useMapStore((state) => ({
        mapType: state.mapType,
    }));

    const {
        filterStudyData,
        filterRepertoireData,
        filterFournisseurData,
        filterIndexeAData,
        filterIndexeBData,
    } = useGlobalDataStore((state: any) => ({
        filterStudyData: state.filterStudyData,
        filterRepertoireData: state.filterRepertoireData,
        filterFournisseurData: state.filterFournisseurData,
        filterIndexeAData: state.filterIndexeAData,
        filterIndexeBData: state.filterIndexeBData,
    }));

    const [visible, setVisible] = useState<boolean>(true);

    const toggleTab = () => {
        setIsOpen(!isOpen);
    };

    const toggleVisibility = () => {
        setVisible(!visible);
        toggleContentVisibility();
    };

    async function handleChange(field: any, newFieldValue: any) {
        setFilter(field, newFieldValue);
        switch (mapType) {
            case MapType.REPERTOIRE:
                filterRepertoireData();
                break;
            case MapType.PAGE_INFORMATION_ALBUM:
                filterStudyData();
                break;
            case MapType.PAGE_INFORMATION_INDEX_VOLETA:
                filterIndexeAData();
                break;
            case MapType.PAGE_INFORMATION_INDEX_VOLETB:
                filterIndexeBData();
                break;
            case MapType.FOURNISSEURS:
                filterFournisseurData();
                break;
            default:
                break;
        }
    }

    const renderFilters = () => {
        const filters: Record<string, string[]> = filterConfigurations[mapType];
        if (!filters) return null;

        return (
            <div className="mt-2 flex flex-col gap-2 items-center">
                {filters[selectedTab]?.map((filter: any, index: number) => (
                    <FilterItem
                        key={index}
                        filterData={filter}
                        lang={lang}
                        matchStage={matchStage}
                        handleChange={handleChange}
                    />
                ))}
            </div>
        );
    };

    return (
        <>
            <div
                className={`z-20 w-fit h-fit pt-4 pb-4 pl-2 pr-2 bg-white flex flex-col items-center gap-4 rounded-lg ${className} transition-transform duration-300 ease-in-out ${!isOpen ? 'translate-x-0' : '-translate-x-64'}`}
            >
                <Button
                    id={html_object_constants.toggle_filter_tab_id}
                    buttonType={ButtonType.ICON}
                    onClick={toggleTab}
                    scaleOnHover={false}
                    className={`p-1 hover:scale-110 group`}
                >
                    <FilterSVG className="group-hover:fill-black" />
                </Button>
                <div className="h-[1px] w-7 bg-black"></div>
                <LanguageToggle className=""></LanguageToggle>
                <div className="h-[1px] w-7 bg-black"></div>

                <Button
                    id={html_object_constants.hide_content_tab_id}
                    buttonType={ButtonType.ICON}
                    onClick={toggleVisibility}
                    scaleOnHover={false}
                    className={`p-1 hover:scale-110 group`}
                >
                    {visible && (
                        <VisibleSVG className="group-hover:fill-black fill-gray-500" />
                    )}
                    {!visible && (
                        <InvisibleSVG className="group-hover:fill-black fill-gray-500" />
                    )}
                </Button>
            </div>
            <div
                className={`z-10 fixed top-5 right-0 h-fit w-64 bg-white p-4 transform ${isOpen ? 'translate-x-0' : 'translate-x-64'} transition-transform duration-300 ease-in-out`}
            >
                <div className="relative">
                    <h2 className="text-2xl font-bold">
                        {SharedPromptsTranslations.filters[lang]}
                    </h2>
                    <div className="mt-2 flex border-b border-black">
                        {Object.keys(filterConfigurations[mapType]).map(
                            (tab) => (
                                <button
                                    key={tab}
                                    className={`flex-1 text-center py-2 ${selectedTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-500'}`}
                                    onClick={() => setSelectedTab(tab)}
                                >
                                    {
                                        SharedPromptsTranslations[
                                            `${tab}_filters`
                                        ][lang]
                                    }
                                </button>
                            ),
                        )}
                    </div>
                    {renderFilters()}

                    <FilterList className=""></FilterList>
                </div>
            </div>
        </>
    );
};

export default FilterMenu;

interface FilterItemProps {
    filterData: any;
    lang: Language;
    matchStage: any;
    handleChange: (param1: any, param2: any) => void;
}

function FilterItem({
    lang,
    matchStage,
    handleChange,
    filterData,
}: FilterItemProps) {
    const labelTitle =
        GraphTextService.getLabel(filterData, lang) ||
        SharedPromptsTranslations.error[lang];

    return (
        <DropdownSelect
            title={labelTitle}
            inputValue={
                matchStage[filterData]
                    ? matchStage[filterData]['$in']
                    : [SharedPromptsTranslations.all[lang]]
            }
            options={[
                SharedPromptsTranslations.all[lang],
                ...GraphTextService.getKeys(filterData),
            ]}
            dataField={filterData}
            onChange={(value: any) => {
                handleChange(filterData, value);
            }}
        />
    );
}
