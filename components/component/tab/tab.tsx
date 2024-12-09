import { TabContent, YearTab } from '@/components/interface/tab-content';
import { useEffect, useState, useMemo } from 'react';
import DataCard from '../data-card/data-card';
import useDataStore from '@/reducer/dataStore';
import { Language } from '@/components/enums/language';
import { StudyYears } from '@/components/enums/data-types-enum';
import Dropdown from '@/components/component/drop-down-menu/drop-down-menu';
import useGlobalDataStore from '@/stores/global-data-store';

interface TabProps {
    content: TabContent;
    className?: string;
}
//some comment
export function Tab({ content, className }: TabProps) {
    const [tabContent, setTabContent] = useState<TabContent>(content);

    const lang: Language = useDataStore((state) => state.lang);
    const { year, setYear } = useGlobalDataStore((state: any) => ({
        year: state.year,
        setYear: state.setYear,
    }));

    useEffect(() => {
        setTabContent(content);
        if (content.years[0]) {
            setYear(content.years[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);

    const memoizedDataCards = useMemo(() => {
        return tabContent.cards.map((card, idx) => (
            <DataCard key={idx} content={card} year={year} />
        ));
    }, [tabContent.cards, year]);

    return (
        <div
            className={`p-4 space-y-6 rounded-lg transition-all duration-300 ${className}`}
        >
            {year && (
                <>
                    <div className="flex flex-row justify-between w-[550px]">
                        <p className="text-base text-gray-600 dark:text-gray-300 w-[80%]">
                            {tabContent.description[lang]}
                        </p>
                        <Dropdown
                            inputValue={year}
                            options={tabContent.years}
                            dataField={'none'}
                            onChange={(value: any) => {
                                setYear(value);
                            }}
                        />
                    </div>
                    {/* Render Data Cards */}
                    <div className="grid gap-4">{memoizedDataCards}</div>
                </>
            )}
        </div>
    );
}
