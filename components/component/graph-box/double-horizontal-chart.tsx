import { ChartSize } from '@/components/enums/chart-size-enum';
import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { chartPalette } from '@/constants/color-palet';
import { ChartContent } from '@/components/interface/chart-content';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { GraphTextService } from '@/services/translations';
import useDataStore from '@/reducer/dataStore';

interface SimpleDoubleHorizontalBarChartProps {
    chartContent: ChartContent;
    chartSize?: ChartSize;
}

// Custom label component to handle long text
const CustomYAxisLabel = (props: any) => {
    const { x, y, value } = props;
    const text = value ?? ''; // Default to an empty string if value is undefined
    const textLength = text.length;
    const rotateAngle = textLength > 15 ? -45 : 0; // Adjust threshold as needed

    return (
        <text
            x={x}
            y={y}
            dy={4}
            textAnchor="end"
            fill="inherit"
            fontSize={12}
            transform={`rotate(${rotateAngle} ${x} ${y})`}
        >
            {text}
        </text>
    );
};

const DoubleHorizontalBarChart: React.FC<
    SimpleDoubleHorizontalBarChartProps
> = ({ chartContent, chartSize = ChartSize.SMALL }) => {
    const [chartData, setChartData] = useState<
        (ChartData | ChartDataMultipleFileds)[] | undefined
    >(undefined);
    const { lang } = useDataStore((state) => ({
        lang: state.lang,
    }));

    // Update the chart data whenever chartContent.data changes
    useEffect(() => {
        if (chartContent.data.length > 0) {
            // Simply set the new data directly, discarding previous state
            setChartData(chartContent.data);
        }
    }, [chartContent.data]);

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
                                <p className="intro text-black">{`${customLabel2} : ${item.value}`}</p>
                            </>
                        );
                    })}
                </div>
            );
        }

        return null;
    };

    return (
        <div className="dark:text-white">
            <ResponsiveContainer width={chartSize} height={chartSize}>
                <BarChart layout="vertical" data={chartData}>
                    <XAxis
                        type="number"
                        stroke="currentColor"
                        fill="currentColor"
                    />
                    <YAxis
                        dataKey="name"
                        type="category"
                        width={70}
                        tick={<CustomYAxisLabel fill="currentColor" />}
                        stroke="currentColor"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {chartData &&
                        chartData.length > 0 &&
                        Object.keys(chartData[0])
                            .filter((key) => key !== 'name') // Exclude the 'name' key
                            .map((key, index) => (
                                <Bar
                                    key={key}
                                    dataKey={key}
                                    fill={
                                        chartPalette[
                                            index % chartPalette.length
                                        ]
                                    }
                                    barSize={chartSize / 20} // Adjust the bar size as needed
                                />
                            ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DoubleHorizontalBarChart;
