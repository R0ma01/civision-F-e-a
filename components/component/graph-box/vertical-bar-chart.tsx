import React, { useEffect, useState, useRef } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Cell,
} from 'recharts';
import { chartPalette } from '@/constants/color-palet';
import { ChartSize } from '@/components/enums/chart-size-enum';
import { ChartContent } from '@/components/interface/chart-content';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { AlbumDataFields } from '@/components/enums/data-types-enum';
import { GraphTextService } from '@/services/translations';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';

interface VerticalBarChartProps {
    chartContent: ChartContent;
    chartSize?: ChartSize;
    filterData?: (dataField: AlbumDataFields, entry: any) => void;
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({
    chartContent,
    chartSize = ChartSize.SMALL,
    filterData = () => {},
}) => {
    const [chartData, setChartData] = useState<
        (ChartData | ChartDataMultipleFileds)[] | undefined
    >(undefined);

    const [xAxisHeight, setXAxisHeight] = useState<number>(40);

    const { lang } = useDataStore((state) => ({
        lang: state.lang,
    }));

    // Calculate dynamic width based on the number of data points
    const calculateWidth = () => {
        const dataLength = chartContent.data.length;
        const baseWidth = chartSize;
        return chartSize === ChartSize.SMALL
            ? baseWidth
            : Math.max(baseWidth, dataLength * 60);
    };

    useEffect(() => {
        if (chartContent.data?.length > 0) {
            setChartData(chartContent.data);

            // Calculate the longest label's height and set the X-axis height
            const calculatedHeight = chartSize / 3;
            setXAxisHeight(calculatedHeight);
        }
    }, [chartContent.data, chartContent.donnees, chartSize]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const customLabel = GraphTextService.getFieldLabel(
                chartContent.donnees[0],
                payload[0].payload.name,
                lang,
            );

            return (
                <div className="custom-tooltip bg-white p-2 shadow-lg rounded text-black max-w-[200px] text-wrap">
                    <p className="label font-bold text-black">{customLabel}</p>
                    <p className="intro text-black">{`${payload[0].payload.value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="dark:text-white text-wrap w-fit">
            <ResponsiveContainer
                width={chartSize}
                height={chartSize}
                className="flex justify-center items-center"
            >
                <BarChart data={chartData}>
                    <XAxis
                        dataKey="name"
                        type="category"
                        height={
                            chartSize === ChartSize.SMALL
                                ? 20
                                : chartSize === ChartSize.MEDIUM
                                  ? 30
                                  : 50
                        }
                        fontSize={chartSize === ChartSize.SMALL ? 6 : 10}
                        stroke="currentColor"
                        tickFormatter={(value: any, index: number) =>
                            GraphTextService.getFieldLabel(
                                chartContent.donnees[0],
                                value,
                                lang,
                            ).toString()
                        }
                    />
                    <YAxis
                        type="number"
                        fontSize={chartSize === ChartSize.SMALL ? 6 : 10}
                        stroke="currentColor"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="value"
                        barSize={
                            chartSize === ChartSize.SMALL
                                ? 10
                                : chartSize === ChartSize.MEDIUM
                                  ? 15
                                  : chartData && chartData.length > 8
                                    ? Math.round(
                                          chartSize - 100 / chartData?.length,
                                      )
                                    : 20
                        }
                    >
                        {chartData &&
                            chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        chartPalette[
                                            index % chartPalette.length
                                        ]
                                    }
                                    onClick={() =>
                                        filterData(
                                            chartContent.donnees[0],
                                            entry,
                                        )
                                    }
                                />
                            ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default VerticalBarChart;
