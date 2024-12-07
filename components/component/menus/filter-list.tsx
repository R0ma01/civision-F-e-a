import useGlobalFilterStore from '@/stores/global-filter-store';
import { TableauxTraductionsMainDataFields } from '@/services/translations';
import { useEffect, useState } from 'react';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '@/components/component/buttons/button';
import { RelaodArrowSVG } from '@/components/component/svg-icons/svg-icons';
import useGlobalDataStore from '@/stores/global-data-store';
import useGlobalMapStore from '@/stores/global-map-store';
import { MapType } from '@/components/enums/map-type-enum';

interface FilterItemContent {
    filter: string;
    value: any;
}

interface FilterListProps {
    className?: string;
}

export function FilterList({ className = '' }: FilterListProps) {
    const { matchStage, setFilter, resetFilters } = useGlobalFilterStore(
        (state: any) => ({
            matchStage: state.matchStage,
            setFilter: state.setFilter,
            resetFilters: state.resetFilters,
        }),
    );

    const mapType = useGlobalMapStore((state) => state.mapType);

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

    async function handleChange() {
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

    const [filters, setFilters] = useState<FilterItemContent[]>([]);

    useEffect(() => {
        const newFilters: FilterItemContent[] = [];
        Object.entries(matchStage).map((entry: any) => {
            (entry[1] as any).$in.forEach((value: any) => {
                newFilters.push({ filter: entry[0], value: value });
            });
        });

        setFilters(newFilters);
    }, [matchStage]);

    const lang = useDataStore((state) => state.lang);

    const displayValue = (
        value: string | number, // Assuming value is either a string or a number
        lang: Language = Language.FR, // Default language is French
        field?: string, // field can be undefined, hence using `?`
    ): string => {
        // If field is provided
        if (field) {
            const fieldData = TableauxTraductionsMainDataFields.get(field);

            // Check if field exists in the map and if dataLabels exist for the given value and language
            if (fieldData?.dataLabels?.[value]?.[lang]) {
                return fieldData.dataLabels[value][lang];
            }
        } else {
            const fieldData = TableauxTraductionsMainDataFields.get(
                value.toString(),
            );

            // Check if field exists in the map and if dataLabels exist for the given value and language
            if (fieldData?.label) {
                return fieldData.label[lang];
            }
        }

        // Return the value as a string if no translation is found or if no field is provided
        return value.toString();
    };

    interface FilterItemProps {
        filter: FilterItemContent;
    }
    function FilterItem({ filter }: FilterItemProps) {
        return (
            <div
                className={`flex flex-row w-fit border bg-custom-grey border-logo-dark-blue px-1
             rounded-lg bg-opacity-45 justify-center items-center gap-1 ${className}`}
            >
                <p>{displayValue(filter.value, lang, filter.filter)}</p>
                <div
                    onClick={(e) => {
                        e.preventDefault();
                        setFilter(filter.filter, filter.value);
                    }}
                    className="hover:scale-125 bg-logo-dark-blue h-fit w-fit border-white cursor-pointer rounded-full flex items-center justify-center"
                >
                    <p className="text-white text-[6px] px-[5px] py-[3px]">✕</p>
                </div>
            </div>
        );
    }
    return (
        <div className="mt-2">
            <div className="flex flex-row gap-2 items-center justify-center">
                <p>{SharedPromptsTranslations.applied_filters[lang]}</p>
                <Button
                    buttonType={ButtonType.ICON_ROUNDED}
                    onClick={(e: any) => {
                        e.stopPropagation();
                        resetFilters();
                        handleChange();
                    }}
                    className="bg-logo-dark-blue"
                >
                    <RelaodArrowSVG className="w-4 h-4" />
                </Button>
            </div>
            <div className="flex flex-wrap mt-2 w-full gap-2 max-h-[100px] overflow-auto">
                {filters.map((filter, index) => {
                    return <FilterItem key={index} filter={filter} />;
                })}
            </div>
        </div>
    );
}
