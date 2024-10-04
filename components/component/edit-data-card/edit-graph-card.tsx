import React from 'react';
import Dropdown from '@/components/component/drop-down-menu/drop-down-menu';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import GraphBox from '../graph-box/graph-box';
import { TrashSVG } from '../svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '../buttons/button';
import { ChartSize } from '@/components/enums/chart-size-enum';
import GraphBoxContent from '@/components/interface/graph-box-content';
import {
    AlbumDataFields,
    StudyOrigin,
    IndexeDataFieldsA,
    IndexeDataFieldsB,
    StudyYears,
} from '@/components/enums/data-types-enum';
function options(tabType: StudyOrigin) {
    switch (tabType) {
        case StudyOrigin.ALBUM_FAMILLE: {
            return Object.values(AlbumDataFields);
        }
        case StudyOrigin.INDEX_VOLETA: {
            return Object.values(IndexeDataFieldsA);
        }
        case StudyOrigin.INDEX_VOLETB: {
            return Object.values(IndexeDataFieldsB);
        }
    }
    return [];
}

function yearDett(tabType: StudyOrigin) {
    switch (tabType) {
        case StudyOrigin.ALBUM_FAMILLE:
            return StudyYears.YEAR_2022;
        case StudyOrigin.INDEX_VOLETA:
        case StudyOrigin.INDEX_VOLETB:
            return StudyYears.YEAR_2023;
    }
}

interface GraphCardProps {
    graph: GraphBoxContent;
    graphIndex: number;
    cardIndex: number;
    tabType: StudyOrigin;
    handleGraphDataChange: (
        cardIndex: number,
        graphIndex: number,
        field: string,
        value: any,
        yValue?: boolean,
    ) => void;
    handleGraphDelete: (e: any, cardIndex: number, graphIndex: number) => void;
}

const EditGraphCard: React.FC<GraphCardProps> = ({
    graph,
    graphIndex,
    cardIndex,
    tabType,
    handleGraphDataChange,
    handleGraphDelete,
}) => {
    return (
        <div className="bg-[#CFCFCF] dark:bg-gray-900 p-4 rounded-lg shadow-md relative w-fit h-[200px] border border-logo-dark-blue">
            <Button
                onClick={(e) => {
                    handleGraphDelete(e, cardIndex, graphIndex);
                }}
                buttonType={ButtonType.ICON_ROUNDED}
                className="absolute -top-2 -right-2 hover:scale-125 bg-logo-dark-blue"
            >
                {/* <TrashSVG className="fill-white w-4 h-4"></TrashSVG> */}
                <p className="text-white text-sm px-1">X</p>
            </Button>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 justify-center space-x-2">
                <div className="flex flex-col w-full space-y-4 justify-center items-center">
                    <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Type de Graphique
                        </label>
                        <Dropdown
                            inputValue={graph.graphType}
                            options={Object.values(GraphBoxType)}
                            onChange={(value: any) =>
                                handleGraphDataChange(
                                    cardIndex,
                                    graphIndex,
                                    'graphType',
                                    value,
                                )
                            }
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            Données Affichées
                        </label>

                        <Dropdown
                            inputValue={graph.donnes[0]}
                            options={options(tabType)}
                            onChange={(value: any) =>
                                handleGraphDataChange(
                                    cardIndex,
                                    graphIndex,
                                    'donnes',
                                    value,
                                )
                            }
                        />
                        {graph.donnes.length > 1 && (
                            <Dropdown
                                inputValue={graph.donnes[1]}
                                options={options(tabType)}
                                onChange={(value: any) =>
                                    handleGraphDataChange(
                                        cardIndex,
                                        graphIndex,
                                        'donnes',
                                        value,
                                        true,
                                    )
                                }
                            />
                        )}
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <GraphBox
                        content={graph}
                        chartSize={ChartSize.SMALL}
                        year={yearDett(tabType)}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditGraphCard;
