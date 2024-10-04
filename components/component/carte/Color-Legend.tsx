import { MapType } from '@/components/enums/map-type-enum';
import { useEffect, useState } from 'react';
import useMapStore from '@/stores/global-map-store';

interface LegendProps {
    gradientValues: (string | number)[];
    className?: string;
    mapType: MapType;
}

const ColorLegend = ({
    gradientValues,
    className = '',
    mapType,
}: LegendProps) => {
    const [colors, setColors] = useState<string[]>([]);
    const [values, setValues] = useState<number[]>([]); // should be numbers instead of strings
    const legend = useMapStore((state) => state.legend);
    useEffect(() => {
        // Extract values and colors alternately from the gradientValues array
        const extractedColors: string[] = [];
        const extractedValues: number[] = [];

        gradientValues.forEach((item, index) => {
            if (typeof item === 'number') {
                extractedValues.push(item); // Collect values
            } else if (typeof item === 'string') {
                extractedColors.push(item); // Collect colors
            }
        });

        setColors(extractedColors);
        setValues(extractedValues);
    }, [gradientValues]);

    function opacity() {
        return mapType != MapType.REPERTOIRE ? '0.45' : '1';
    }

    function lastNumber(index: number) {
        // Check if the current index is the last one in the array
        if (mapType !== MapType.REPERTOIRE) {
            return index === values.length - 1 ? '+' : '';
        } else {
            return index === values.length ? '+' : '';
        }
    }

    function blockWidth() {
        return mapType !== MapType.REPERTOIRE ? 'w-6' : 'w-10';
    }

    if (legend) {
        return (
            <div className={`legend-container flex ${className} w-fit h-hit`}>
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={`flex flex-col ${blockWidth()}`}
                    >
                        <div className="text-xs font-light dark:text-white text-center">
                            {values[index]}
                            {lastNumber(index)}
                        </div>
                        <div className="w-6 h-6 bg-light-map-green dark:bg-dark-map-gray">
                            <div
                                className={`${blockWidth()} h-6`}
                                style={{
                                    backgroundColor: color,
                                    opacity: opacity(),
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default ColorLegend;
