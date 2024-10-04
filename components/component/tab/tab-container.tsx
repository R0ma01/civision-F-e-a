import { TabContent } from '@/components/interface/tab-content';
import { useEffect, useState } from 'react';
import { Tab } from './tab';
import { tabColors } from '@/constants/color-palet';
import { TableauxTraductionsTabs } from '@/services/translations';
import useDataStore from '@/reducer/dataStore';
import { StudyOrigin } from '@/components/enums/data-types-enum';
import { Language } from '@/components/enums/language';
import useGlobalFilterStore from '@/stores/global-filter-store';
import { html_object_constants } from '@/constants/constants';

interface TabProps {
    tabs: TabContent[];
    className?: string;
    setMap?: (dataType: StudyOrigin) => void;
}

export function TabContainer({
    tabs,
    className,
    setMap = (temp) => {},
}: TabProps) {
    const [containerContent, setContainerContent] = useState<
        TabContent[] | undefined
    >(undefined);
    const [selectedTab, setSelectedTab] = useState<number>(0); // Initialize with 0

    const lang: Language = useDataStore((state) => state.lang);
    const { resetFilters } = useGlobalFilterStore((state) => ({
        resetFilters: state.resetFilters,
    }));
    useEffect(() => {
        if (tabs !== containerContent && tabs) {
            setContainerContent(tabs);

            if (!selectedTab) {
                resetFilters();
                setSelectedTab(tabs.findIndex((tab) => tab.visible)); // Set first tab as active if none is selected
                setMap(tabs[selectedTab].tabType);
            }
        }
    }, [tabs, containerContent, selectedTab, resetFilters, setMap]);

    useEffect(() => {
        if (containerContent) {
            resetFilters();

            setMap(containerContent[selectedTab].tabType);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTab]);

    return (
        <div className="w-fit z-10">
            {/* Tab Headers */}
            <div
                className={`flex flex-wrap items-center justify-start space-x-2 mb-4 ${className}`}
            >
                {containerContent &&
                    containerContent.map((tab, index) => {
                        if (tab.visible) {
                            const isActive = index === selectedTab;

                            const tabTitle = TableauxTraductionsTabs.get(
                                tab.tabType,
                            );
                            const title = tabTitle
                                ? tabTitle.titre[lang] || 'No title'
                                : 'No title';
                            const color = tabColors[tab.tabType];

                            return (
                                <div
                                    id={`${html_object_constants.tab_notch_id}-${index}`}
                                    key={`${tab.tabType}-${index}`} // Unique key
                                    onClick={() => setSelectedTab(index)} // Set the active tab
                                    className={`text-black cursor-pointer hover:bg-logo-dark-blue hover:text-white md:text-xs lg:tx-sm px-4 py-2 transition-all duration-200 rounded-lg ${isActive ? 'bg-logo-dark-blue text-white ' : 'bg-white text-logo-dark-blue bg-opacity-65'} ${className}`}
                                >
                                    <p>{title.toUpperCase()}</p>
                                </div>
                            );
                        }
                        return null;
                    })}
            </div>

            {/* Selected Tab Content */}
            {containerContent && selectedTab !== undefined && (
                <Tab
                    content={containerContent[selectedTab]}
                    className={className}
                />
            )}
        </div>
    );
}
