import React, { useState } from 'react';
import { DataCardType } from '@/components/enums/data-card-type-enum';
import DataCardContent from '@/components/interface/data-card-content';
import GraphBox from '@/components/component/graph-box/graph-box';
import SearchBox from '@/components/component/search-box/search-box';
import { ChartSize } from '@/components/enums/chart-size-enum';
import ListeFournisseurs from '@/components/component/liste-fournisseurs/liste-fournisseurs';
import StaticDropdown from '../drop-down-menu/chercheur-drop-down';
import { UserType } from '@/components/enums/user-type-enum';
import useDataStore from '@/reducer/dataStore';
import { Language } from '@/components/enums/language';
import { StudyYears } from '@/components/enums/data-types-enum';
import { CloseArrowSVG, OpenArrowSVG } from '../svg-icons/svg-icons';

interface DataCardProps {
    className?: string;
    content: DataCardContent;
    year: StudyYears;
    admin?: boolean;
    size?: ChartSize;
    children?: React.ReactNode;
}

const DataCard: React.FC<DataCardProps> = ({
    content,
    className,
    year,
    admin = false,
    size = ChartSize.LARGE,
    children = <></>,
}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const lang: Language = useDataStore((state) => state.lang);

    const DataCardDiv: React.FC<{
        children: React.ReactNode;
        title: string;
        width?: number;
        className?: string;
    }> = ({ children, title, width = ChartSize.LARGE, className = '' }) => {
        const sizing = () => {
            switch (width) {
                case ChartSize.SMALL:
                    return 'w-[200px]';

                case ChartSize.MEDIUM:
                    return 'w-[300px]';

                case ChartSize.LARGE:
                    return 'w-[500px]';

                default:
                    return 'w-[300px]';
            }
        };

        return (
            <div
                className={`${sizing()} bg-[#f5ebe0] dark:bg-[#363636] dark:bg-opacity-50 dark:text-white backdrop-filter
                     backdrop-blur bg-opacity-50 saturate-100 backdrop-contrast-100 rounded-xl shadow-3xl py-2 pointer-events-auto
                     flex flex-col items-center h-auto ${className} min-h-12`}
            >
                <button
                    onClick={() => setIsCollapsed((prev) => !prev)}
                    className="absolute top-2 right-2 z-20"
                >
                    {isCollapsed ? (
                        <div className="w-fit h-fit p-1 bg-logo-dark-blue rounded-lg">
                            <CloseArrowSVG></CloseArrowSVG>
                        </div>
                    ) : (
                        <div className="w-fit h-fit p-1 bg-logo-dark-blue rounded-lg">
                            <OpenArrowSVG></OpenArrowSVG>
                        </div>
                    )}
                </button>
                <span
                    className={`text-md font-bold text-md text-center w-[80%] mr-5`}
                >
                    {title}
                </span>
                {!isCollapsed && children}
            </div>
        );
    };
    interface DescriptionComponentProps {
        children: string;
    }

    const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
        children,
    }) => {
        return <p className="text-xs">{children}</p>;
    };

    switch (content.type) {
        case DataCardType.SIMPLE:
            return (
                <DataCardDiv title={content.title[lang]}>
                    <DescriptionComponent>
                        {content.description[lang]}
                    </DescriptionComponent>
                    {children}
                </DataCardDiv>
            );

        case DataCardType.SIMPLE_GRAPH:
            return (
                <DataCardDiv title={content.title[lang]} width={size}>
                    <div className="pt-1 w-full flex justify-center ">
                        <GraphBox
                            content={content.graphData[0]}
                            year={year}
                            chartSize={size}
                        />
                    </div>
                    <DescriptionComponent>
                        {content.description[lang]}
                    </DescriptionComponent>
                    {children}
                </DataCardDiv>
            );

        case DataCardType.MULTIPLE_GRAPH:
            return (
                <DataCardDiv title={content.title[lang]} width={size}>
                    <div className="gap-2 pt-1">
                        {content.graphData?.map((graph, index) => (
                            <GraphBox
                                key={index}
                                content={graph}
                                year={year}
                                chartSize={size}
                            />
                        ))}
                    </div>
                    <DescriptionComponent>
                        {content.description[lang]}
                    </DescriptionComponent>
                    {children}
                </DataCardDiv>
            );

        case DataCardType.SEARCH:
            return (
                <DataCardDiv title={''}>
                    <SearchBox />
                    {children}
                </DataCardDiv>
            );

        case DataCardType.SOLO_GRAPH:
            return (
                <DataCardDiv title={content.title[lang]} width={size}>
                    <div className="pt-1">
                        {content.graphData !== undefined && (
                            <GraphBox
                                content={content.graphData[0]}
                                year={year}
                                chartSize={size}
                            />
                        )}
                    </div>
                    {children}
                </DataCardDiv>
            );

        case DataCardType.CHERCHEUR_DROPDOWN:
            return (
                <DataCardDiv
                    title={content.title[lang]}
                    width={300}
                    className={className}
                >
                    <StaticDropdown
                        onClick={content.chercheurDropdownOnCLick}
                    />
                    {children}
                </DataCardDiv>
            );

        default:
            return (
                <DataCardDiv title="ERROR">
                    SOME ERROR OCCURRED HERE
                </DataCardDiv>
            );
    }
};

export default DataCard;
