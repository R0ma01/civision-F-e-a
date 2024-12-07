import React from 'react';
import DataCard from '@/components/component/data-card/data-card';
import DataCardContent from '@/components/interface/data-card-content';
import { StudyYears } from '@/components/enums/data-types-enum';
import { ChartSize } from '@/components/enums/chart-size-enum';

interface DataCardContainerProps {
    cards: DataCardContent[];
    className?: string;
    year: StudyYears;
}

const DataCardContainer: React.FC<DataCardContainerProps> = ({
    cards,
    className,
    year,
}) => {
    return (
        <div className={`flex ${className}`}>
            {cards.map((content, index) => (
                <DataCard
                    key={index}
                    content={content}
                    className="m-4"
                    year={year}
                    size={ChartSize.MEDIUM}
                />
            ))}
        </div>
    );
};

export default DataCardContainer;
