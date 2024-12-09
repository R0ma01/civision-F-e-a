import { ChartSize } from '@/components/enums/chart-size-enum';
import React, { useEffect, useState, useRef } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    Legend,
    CartesianGrid,
} from 'recharts';
import { chartPalette } from '@/constants/color-palet';
import { ChartContent } from '@/components/interface/chart-content';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { GraphTextService } from '@/services/translations';
import useDataStore from '@/reducer/dataStore';

interface StackedBarChartProps {
    chartContent: ChartContent;
    filterRows: any;
    chartSize?: ChartSize;
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({
    chartContent,
    filterRows,

    chartSize = ChartSize.SMALL,
}) => {
    const [chartData, setChartData] = useState<
        (ChartData | ChartDataMultipleFileds)[] | undefined
    >(undefined);
    const [stackedKeys, setStackedKey] = useState<string[]>([]);
    const { lang } = useDataStore((state) => ({
        lang: state.lang,
    }));
    useEffect(() => {
        if (chartContent.data.length > 0) {
            // No transformation needed, we can directly use the data
            setChartData(chartContent.data);
            console.log(chartContent.totalData);
        }
    }, [chartContent.data]);

    // Extract all fields (keys) from the first element of chartData (excluding 'name')
    useEffect(() => {
        if (chartData) {
            if (chartData.length > 0) {
                setStackedKey(Object.keys(chartData[0]));
            }
        }
    }, [chartData]);

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
                    {payload.map((item: any) => {
                        const customLabel2 = GraphTextService.getFieldLabel(
                            chartContent.donnees[1],
                            item.name,
                            lang,
                        );
                        return (
                            <>
                                <p className="intro text-black">{`${customLabel2} : ${((item.value / chartContent.totalData) * 100).toFixed(2)} %`}</p>
                            </>
                        );
                    })}
                </div>
            );
        }

        return null;
    };

    return (
        <div>
            <ResponsiveContainer width={chartSize} height={chartSize}>
                <BarChart
                    data={chartData}
                    margin={
                        chartSize !== ChartSize.SMALL
                            ? {
                                  top: 20,
                                  right: 30,
                                  left: 20,
                                  bottom: 5,
                              }
                            : {}
                    }
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    {chartSize !== ChartSize.SMALL && <Legend />}

                    {stackedKeys.map((key, index) => {
                        if (key !== 'name') {
                            return (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    stackId="a"
                                    fill={
                                        filterRows.length > 0
                                            ? filterRows.includes(key)
                                                ? chartPalette[
                                                      index %
                                                          chartPalette.length
                                                  ]
                                                : '#000'
                                            : chartPalette[
                                                  index % chartPalette.length
                                              ]
                                    }
                                />
                            );
                        }
                    })}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StackedBarChart;
