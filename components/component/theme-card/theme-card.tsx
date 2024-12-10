import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import {
    EditSVG,
    InvisibleSVG,
    TrashSVG,
    VisibleSVG,
} from '../svg-icons/svg-icons';
import Button from '../buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import PageTabContent from '@/components/interface/page-tabs-content';
import { TabContent } from '@/components/interface/tab-content';
import { tabColors } from '@/constants/color-palet';
import useDataStore from '@/reducer/dataStore';
import { TableauxTraductionsTabs } from '@/services/translations';
import { Language } from '@/components/enums/language';

interface ThemeCardProps {
    index: string;
    page: PageTabContent;
    admin?: boolean;
    onClickEdit?: (e: any) => void;
    onClickDelete?: (e: any) => void;
    onClickVisible?: () => void;
}

const ThemeCard: React.FC<ThemeCardProps> = ({
    index,
    page,
    admin = false,
    onClickEdit = (e: any) => {},
    onClickDelete = (e: any) => {},
    onClickVisible = () => {},
}) => {
    const [localContent, setLocalContent] = useState<PageTabContent>(page);
    const lang: Language = useDataStore((state) => state.lang);
    useEffect(() => {
        setLocalContent(page);
    }, [page]);
    const adminArticleCss = admin ? '' : 'cursor-pointer';
    const reference = admin
        ? ''
        : `/thematiques/page-information?_id=${localContent._id}`;

    return (
        <Link href={reference} id={`${index}`}>
            <article
                className={`inline-block m-2 w-[245px] xl:w-[300px] rounded-xl shadow-xl bg-cover bg-center transform 
                duration-500 hover:-translate-y-2 ${adminArticleCss} group`}
                style={{
                    backgroundImage: `url('${page.backgroundImage}')`,
                }}
            >
                <div
                    className="bg-gradient-to-b from-transparent to-black justify-end inset-0 rounded-xl px-6 flex 
                flex-wrap flex-col h-[350px] xl:h-[410px] hover:bg-black hover:bg-opacity-60 transform duration-300"
                >
                    <div
                        key={index}
                        className="group-hover:overflow-y-auto max-h-[225px] top-0"
                    >
                        <TabNotches
                            tabs={localContent.tabs}
                            className="absolute top-3 right-0"
                            admin={admin}
                            index={index}
                        />

                        <h2 className="text-white text-2xl xl:text-3xl mb-7">
                            {localContent.title[lang]}
                        </h2>
                        <p className="hidden mb-5 text-white text-sm xl:text-medium group-hover:block">
                            {localContent.description[lang]}
                        </p>
                    </div>
                    <div className="flex-row justify-evenly mb-4 hidden group-hover:flex">
                        {admin && (
                            <Button
                                buttonType={ButtonType.ICON}
                                onClick={onClickEdit}
                            >
                                <EditSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></EditSVG>
                            </Button>
                        )}
                        {admin && (
                            <Button
                                buttonType={ButtonType.ICON}
                                onClick={onClickDelete}
                            >
                                <TrashSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></TrashSVG>
                            </Button>
                        )}
                        {admin && (
                            <Button
                                buttonType={ButtonType.ICON}
                                onClick={onClickVisible}
                            >
                                {localContent.visible ? (
                                    <VisibleSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></VisibleSVG>
                                ) : (
                                    <InvisibleSVG className="hover:scale-150 hover:fill-white fill-custom-grey"></InvisibleSVG>
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ThemeCard;

interface TabNotchesProps {
    className?: string;
    tabs: TabContent[];
    admin: boolean;
    index: any;
}
function TabNotches({ className, tabs, admin, index }: TabNotchesProps) {
    const lang: Language = useDataStore((state) => state.lang);

    return (
        <div
            key={'notches-' + index}
            className={`${className} flex flex-col space-y-1`}
        >
            {tabs.map((tab, indexNotch) => {
                const tabTitle = TableauxTraductionsTabs.get(tab.tabType);
                const title = tabTitle
                    ? tabTitle.titre[lang] || 'No title'
                    : 'No title';
                const acronym = tabTitle
                    ? tabTitle.acronym[lang] || '??'
                    : '??';
                const color = admin
                    ? tab.visible
                        ? tabColors[tab.tabType]
                        : '#374151AA'
                    : tabColors[tab.tabType];

                // Ensure the key is unique and present in every iteration
                return (
                    (tab.visible || admin) && (
                        <div
                            key={`${index}-tabNotch-${indexNotch}`} // Use a unique key here
                            style={{
                                backgroundColor: color + 'AA',
                            }}
                            className={`p-2 relative group-hover:w-48 transition-all duration-300 bg-opacity-40 border-none rounded-l-full text-white w-9 h-7 overflow-hidden ${admin && !tab.visible ? 'opacity-35' : ''}`}
                            title={title}
                        >
                            <p className="absolute top-1.5 left-2 text-xs opacity-100 group-hover:opacity-0 transition-all duration-300">
                                {acronym}
                            </p>
                            <p className="absolute top-1.5 left-2 text-xs opacity-0 group-hover:opacity-100 transition-all duration-100 w-48">
                                {title}
                            </p>
                        </div>
                    )
                );
            })}
        </div>
    );
}
