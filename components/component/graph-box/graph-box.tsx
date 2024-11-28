/* eslint-disable react-hooks/rules-of-hooks */
// GraphBox.tsx
import React, { useEffect, useState } from 'react';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import Doughnut from './doughnut-chart';
import GraphBoxContent from '@/components/interface/graph-box-content';
import HorizontalBarChart from './horizontal-bar-chart';
import VerticalBarChart from './vertical-bar-chart';
import StackedBarChart from './stacked-bar-chart';
import DoubleHorizontalChart from './double-horizontal-chart';
import { ChartContent } from '@/components/interface/chart-content';
import { ChartSize } from '@/components/enums/chart-size-enum';
import { StudyOrigin, StudyYears } from '@/components/enums/data-types-enum';
import useGlobalFilterStore from '@/stores/global-filter-store';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';
import useGlobalDataStore from '@/stores/global-data-store';
import useDataStore from '@/reducer/dataStore';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';

interface GraphBoxProps {
    content: GraphBoxContent;
    year: StudyYears;
    chartSize?: ChartSize;
}

const GraphBox: React.FC<GraphBoxProps> = ({ content, chartSize, year }) => {
    const [chartContent, setChartContent] = useState<ChartContent | null>(null);
    const matchStage = useGlobalFilterStore((state) => state.matchStage);
    const setFilter = useGlobalFilterStore((state) => state.setFilter);
    const getFilter = useGlobalFilterStore((state) => state.getFilter);
    const [loading, setLoading] = useState<boolean>(false);
    const [frozen, setFrozen] = useState<boolean>(false);
    const [size, setChartSize] = useState<ChartSize>(
        chartSize ? chartSize : ChartSize.MEDIUM,
    );
    const lang = useDataStore((state) => state.lang);
    const { filterStudyData, filterIndexeAData, filterIndexeBData } =
        useGlobalDataStore((state: any) => ({
            filterStudyData: state.filterStudyData,
            filterIndexeAData: state.filterIndexeAData,
            filterIndexeBData: state.filterIndexeBData,
        }));

    function filterNewData(dataField: any, entry: ChartData) {
        const currentFilter = getFilter(dataField);

        if (currentFilter === entry.name) {
            setFilter(dataField, SharedPromptsTranslations.all[lang]);
        } else {
            setFilter(dataField, entry.name);
        }
        setFrozen(true);

        switch (content.dataOrigin) {
            case StudyOrigin.INDEX_VOLETA:
                filterIndexeAData();
                break;
            case StudyOrigin.INDEX_VOLETB:
                filterIndexeBData();
                break;

            default:
            case StudyOrigin.ALBUM_FAMILLE:
                filterStudyData();
                break;
        }
    }

    const [chartData, setChartData] = useState<
        (ChartData | ChartDataMultipleFileds)[]
    >([]);

    const [nanData, setNanData] = useState<ChartData | ChartDataMultipleFileds>(
        { name: 'NaN', value: 0 },
    );

    useEffect(() => {
        async function fetchMultiple(donnes: any[]) {
            const result = await GraphDataHttpRequestService.getChartData(
                donnes,
                matchStage,
                content.dataOrigin ?? StudyOrigin.ALBUM_FAMILLE,
                year,
            );
            const tempResult: ChartDataMultipleFileds[] = [
                {
                    name: 'groupe1',
                    value1: 1,
                    value2: 3,
                },
                {
                    name: 'groupe2',
                    value1: 1,
                    value2: 3,
                },
            ];

            setChartData(result ? result : tempResult);

            setLoading(false);
        }

        async function fetch(donnes: any[]) {
            const result = await GraphDataHttpRequestService.getChartData(
                donnes,
                matchStage,
                content.dataOrigin ?? StudyOrigin.ALBUM_FAMILLE,
                year,
            );

            // const nanResult = result.findIndex(
            //     (item) => item.name.toString() === 'NaN',
            // );
            // const newResult = result.filter(
            //     (item) => item.name.toString() !== 'NaN',
            // );
            // if (nanResult > -1) setNanData(result[nanResult]);

            const tempResult: ChartData[] = [
                {
                    name: 'groupe1',
                    value: 1,
                },
                {
                    name: 'groupe2',
                    value: 1,
                },
            ];
            setChartData(result ?? tempResult);

            setLoading(false);
        }

        if (
            (content.graphType === GraphBoxType.DOUGHNUT ||
                content.graphType === GraphBoxType.VERTICAL_BARCHART ||
                content.graphType === GraphBoxType.HORIZONTAL_BARCHART) &&
            !loading
        ) {
            setLoading(true);
            fetch(content.donnes);
        } else {
            setLoading(true);
            fetchMultiple(content.donnes);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, matchStage]);

    useEffect(() => {
        const filterChartData = () => {
            if (frozen) {
                setFrozen(false);
                return;
            }
            switch (content.graphType) {
                case GraphBoxType.HORIZONTAL_BARCHART:

                case GraphBoxType.VERTICAL_BARCHART:

                case GraphBoxType.DOUGHNUT:

                case GraphBoxType.DOUBLE_HORIZONTAL_BARCHART:

                case GraphBoxType.STACKED_BARCHART:

                default:
                    const tempChartData: ChartContent = {
                        donnees: content.donnes,
                        data: chartData,
                        totalData: 1000,
                    };

                    setChartContent(tempChartData);
                    break;
            }
        };
        filterChartData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, chartData, matchStage]);

    useEffect(() => {
        if (!chartSize) {
            if (chartData) {
                setChartSize(ChartSize.LARGE);
            } else {
                setChartSize(ChartSize.MEDIUM);
            }
        }
    }, [chartData, chartSize]);

    if (!chartContent) {
        return (
            <div className="py-8 px-8 pointer-events-auto">
                <p>No data available or an error occurred.</p>
            </div>
        );
    }

    switch (content.graphType) {
        case GraphBoxType.DOUBLE_HORIZONTAL_BARCHART:
            return (
                <>
                    <DoubleHorizontalChart
                        chartContent={chartContent}
                        chartSize={size}
                    />{' '}
                    {/* {size !== ChartSize.SMALL && (
                        <p className="text-red-600 text-left">
                            *les {nanData.value} valeurs de {nanData.name} ne
                            sont pas prises en compte ici
                        </p>
                    )} */}
                </>
            );
        case GraphBoxType.DOUGHNUT:
            return (
                <>
                    <div>
                        <Doughnut
                            chartContent={chartContent}
                            chartSize={size}
                            filterData={filterNewData}
                        />{' '}
                    </div>
                    {/* {size !== ChartSize.SMALL && (
                        <p className="text-red-600 text-left">
                            *les {nanData.value} valeurs de {nanData.name} ne
                            sont pas prises en compte ici
                        </p>
                    )} */}
                </>
            );
        case GraphBoxType.HORIZONTAL_BARCHART:
            return (
                <div className="w-full overflow-auto bg-orange-200">
                    <HorizontalBarChart
                        chartContent={chartContent}
                        chartSize={size}
                        filterData={filterNewData}
                    />
                    {/* {size !== ChartSize.SMALL && (
                        <p className="text-red-600 text-left">
                            *les {nanData.value} valeurs de {nanData.name} ne
                            sont pas prises en compte ici
                        </p>
                    )} */}
                </div>
            );
        case GraphBoxType.VERTICAL_BARCHART:
            return (
                <div className="w-[520px] overflow-auto flex justify-center">
                    <VerticalBarChart
                        chartContent={chartContent}
                        chartSize={size}
                        filterData={filterNewData}
                    />
                    {/* {size !== ChartSize.SMALL && (
                        <p className="text-red-600 text-left">
                            *les {nanData.value} valeurs de {nanData.name} ne
                            sont pas prises en compte ici
                        </p>
                    )} */}
                </div>
            );
        case GraphBoxType.STACKED_BARCHART:
            return (
                <>
                    <div>
                        {' '}
                        <StackedBarChart
                            chartContent={chartContent}
                            chartSize={size}
                        />
                    </div>

                    {/* {size !== ChartSize.SMALL && (
                        <p className="text-red-600 text-left">
                            *les {nanData.value} valeurs de {nanData.name} ne
                            sont pas prises en compte ici
                        </p>
                    )} */}
                </>
            );
        default:
            return (
                <div className="py-8 px-8 pointer-events-auto">
                    <p>No data available or an error occurred.</p>
                </div>
            );
    }
};

export default GraphBox;
