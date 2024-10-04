import { useState, useEffect, useRef } from 'react';
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from 'recharts';
import { chartPalette } from '@/constants/color-palet';
import { ChartSize } from '@/components/enums/chart-size-enum';
import { ChartContent } from '@/components/interface/chart-content';
import { AlbumDataFields } from '@/components/enums/data-types-enum';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import { GraphTextService } from '@/services/translations';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';

interface DoughnutChartProps {
    chartContent: ChartContent;
    chartSize?: ChartSize;
    interactive?: boolean;
    filterData?: (dataField: AlbumDataFields, entry: any) => void;
}

const Doughnut: React.FC<DoughnutChartProps> = ({
    chartContent,
    chartSize = ChartSize.SMALL,
    filterData = (entry: any) => {},
}) => {
    const [activeSlice, setActiveSlice] = useState<string | null>(null);
    const originalOrder = useRef<
        ChartData[] | ChartDataMultipleFileds[] | undefined
    >(undefined);

    const [size, setSize] = useState<ChartSize>(chartSize);

    useEffect(() => {
        setSize(chartSize);
    }, [chartSize]);

    const [language, setLanguage] = useState<Language>(Language.FR);
    const { lang } = useDataStore((state) => ({
        lang: state.lang,
    }));

    useEffect(() => {
        setLanguage(lang);
    }, [lang]);

    const radiusMap = {
        [ChartSize.SMALL]: { inner: '30%', outer: '70%' },
        [ChartSize.MEDIUM]: { inner: '40%', outer: '85%' },
        [ChartSize.LARGE]: { inner: '35%', outer: '65%' },
    };

    const { inner, outer } = radiusMap[size];

    const [chartData, setChartData] = useState<
        (ChartData | ChartDataMultipleFileds)[] | undefined
    >(undefined);

    useEffect(() => {
        if (chartContent.data?.length > 0) {
            setChartData(chartContent.data);
        }
    }, [chartContent.data]);

    const width = size === ChartSize.SMALL ? size : size + 100;
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const customLabel = GraphTextService.getFieldLabel(
                chartContent.donnees[0],
                payload[0].name,
                language,
            );

            return (
                <div className="custom-tooltip bg-white p-2 shadow-lg rounded text-black max-w-[200px] text-wrap">
                    <p className="label font-bold text-black">{customLabel}</p>
                    <p className="intro text-black">{`${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="dark:text-white">
            <ResponsiveContainer height={size} width={width}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx={`${size === ChartSize.MEDIUM ? '50%' : '40%'}`}
                        cy="50%"
                        outerRadius={outer}
                        innerRadius={inner}
                        dataKey="value"
                        onClick={({ name }) =>
                            setActiveSlice(activeSlice === name ? null : name)
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
                                    onClick={() => {
                                        filterData(
                                            chartContent.donnees[0],
                                            entry,
                                        );
                                    }}
                                />
                            ))}
                        {!chartData && <div>Chargement...</div>}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        layout="vertical"
                        align="right"
                        verticalAlign="middle"
                        width={
                            size === ChartSize.MEDIUM
                                ? 100
                                : size === ChartSize.LARGE
                                  ? 150
                                  : 50
                        }
                        wrapperStyle={{
                            lineHeight:
                                size === ChartSize.SMALL ? '10px' : '24px',
                            maxHeight: `${size}px`, // Control the height of the legend area
                            overflowY: 'auto', // Enable vertical scrolling
                            overflowX: 'hidden', // Hide horizontal scroll if not needed
                        }}
                        iconSize={size === ChartSize.SMALL ? 8 : 12}
                        formatter={(value) => {
                            return size === ChartSize.SMALL ? (
                                <span
                                    style={{
                                        fontSize: '6px',
                                        color: 'currentColor',
                                    }}
                                >
                                    {GraphTextService.getFieldLabel(
                                        chartContent.donnees[0],
                                        value,
                                        language,
                                    )}
                                </span>
                            ) : (
                                <span
                                    style={{
                                        fontSize: '10px',
                                        color: 'currentColor',
                                    }}
                                >
                                    {GraphTextService.getFieldLabel(
                                        chartContent.donnees[0],
                                        value,
                                        language,
                                    )}
                                </span>
                            );
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Doughnut;
