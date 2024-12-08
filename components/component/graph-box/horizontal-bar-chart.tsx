import React, { useEffect, useState } from 'react';
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

interface SimpleHorizontalBarChartProps {
    chartContent: ChartContent;
    chartSize?: ChartSize;
    filterRows: any;
    filterData?: (dataField: AlbumDataFields, entry: any) => void;
}

const HorizontalBarChart: React.FC<SimpleHorizontalBarChartProps> = ({
    chartContent,
    chartSize = ChartSize.SMALL,
    filterData = () => {},
    filterRows,
}) => {
    const [chartData, setChartData] = useState<
        (ChartData | ChartDataMultipleFileds)[] | undefined
    >(undefined);

    const [yAxisWidth, setYAxisWidth] = useState<number>(40);
    const [language, setLanguage] = useState<Language>(Language.FR);
    const { lang } = useDataStore((state) => ({
        lang: state.lang,
    }));

    const [activeBar, setActiveBar] = useState<number | null>(null); // Track the active bar index

    useEffect(() => {
        setLanguage(lang);
    }, [lang]);

    const calculateHeight = () => {
        const dataLength = chartContent.data.length;
        const baseHeight = chartSize === ChartSize.SMALL ? 150 : 300;
        return chartSize === ChartSize.SMALL
            ? baseHeight
            : Math.max(baseHeight, dataLength * 40);
    };

    useEffect(() => {
        if (chartContent.data?.length > 0) {
            setChartData(chartContent.data);
            const calculatedWidth = chartSize / 3;
            setYAxisWidth(calculatedWidth);
        }
    }, [chartContent.data, chartContent.donnees, chartSize]);

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const customLabel = GraphTextService.getFieldLabel(
                chartContent.donnees[0],
                payload[0].payload.name,
                language,
            );

            return (
                <div className="custom-tooltip bg-white p-2 shadow-lg rounded text-black max-w-[200px] text-wrap">
                    <p className="label font-bold text-black">{customLabel}</p>
                    <p className="intro text-black">{`${((payload[0].payload.value / chartContent.totalData) * 100).toFixed(2)} %`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="dark:text-white text-wrap">
            <ResponsiveContainer width={chartSize} height={calculateHeight()}>
                <BarChart layout="vertical" data={chartData}>
                    <XAxis
                        type="number"
                        fontSize={chartSize === ChartSize.SMALL ? 6 : 10}
                        stroke="currentColor"
                    />
                    <YAxis
                        dataKey="name"
                        type="category"
                        width={yAxisWidth}
                        fontSize={chartSize === ChartSize.SMALL ? 6 : 10}
                        stroke="currentColor"
                        tickFormatter={(value: any) =>
                            GraphTextService.getFieldLabel(
                                chartContent.donnees[0],
                                value,
                                language,
                            ).toString()
                        }
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="value"
                        barSize={
                            chartSize === ChartSize.SMALL
                                ? 10
                                : chartSize === ChartSize.MEDIUM
                                  ? 15
                                  : 20
                        }
                    >
                        {chartData &&
                            chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        filterRows.length > 0
                                            ? filterRows.includes(entry.name)
                                                ? chartPalette[
                                                      index %
                                                          chartPalette.length
                                                  ]
                                                : '#000'
                                            : chartPalette[
                                                  index % chartPalette.length
                                              ]
                                    }
                                    onClick={() => {
                                        filterData(
                                            chartContent.donnees[0],
                                            entry,
                                        );
                                    }}
                                />
                            ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HorizontalBarChart;
