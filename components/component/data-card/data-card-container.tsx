import React from 'react';
import DataCard from '@/components/component/data-card/data-card';
import DataCardContent from '@/components/interface/data-card-content';
import { StudyYears } from '@/components/enums/data-types-enum';

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
        <div className={`flex z-10 justify-center items-center ${className}`}>
            {cards.map((content, index) => (
                <DataCard
                    key={index}
                    content={content}
                    className="m-4"
                    year={year}
                />
            ))}
        </div>
    );
};

export default DataCardContainer;
