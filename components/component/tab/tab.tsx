import { TabContent, YearTab } from '@/components/interface/tab-content';
import { useEffect, useState } from 'react';
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
    const [currentYear, setCurrentYear] = useState<StudyYears | undefined>(
        undefined,
    );
    const lang: Language = useDataStore((state) => state.lang);
    const { setYear } = useGlobalDataStore((state: any) => ({
        setYear: state.setYear,
    }));

    useEffect(() => {
        setTabContent(content);
        if (content.years[0]) {
            setCurrentYear(content.years[0]);
            setYear(content.years[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content]);

    useEffect(() => {
        setYear(currentYear);
    }, [currentYear, setYear]);

    return (
        <div
            className={`p-4 space-y-6 rounded-lg transition-all duration-300 ${className}`}
        >
            {currentYear && (
                <>
                    <div className="flex flex-row w-full justify-evenly">
                        <p className="text-base text-gray-600 dark:text-gray-300 w-[60%]">
                            {tabContent.description[lang]}
                        </p>
                        <Dropdown
                            inputValue={currentYear}
                            options={tabContent.years}
                            dataField={'none'}
                            onChange={(value: any) => {
                                setCurrentYear(value);
                            }}
                            className="w-[40%]"
                        />
                    </div>
                    {/* Render Data Cards */}
                    <div className="grid gap-4">
                        {tabContent.cards.map((card, idx) => (
                            <DataCard
                                key={idx}
                                content={card}
                                year={currentYear}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
