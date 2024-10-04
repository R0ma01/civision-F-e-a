import { ButtonType } from '@/components/enums/button-type-enum';
import PageTabContent from '@/components/interface/page-tabs-content';
import Button from '../buttons/button';
import { useEffect, useRef, useState } from 'react';
import { EditTabContainer } from '../tab/edit-tab-container';
import { TabContent } from '@/components/interface/tab-content';
import { StudyOrigin, StudyYears } from '@/components/enums/data-types-enum';
import { SharedPromptsTranslations } from '@/constants/translations/page-prompts';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';
import ImageDropdown from '../drop-down-menu/image-drop-down';

interface AdminModalProps {
    page: PageTabContent;
    closeDialog: () => void;
    submitDialog: (page: PageTabContent) => void;
}
export function AdminModal({
    page,
    closeDialog,
    submitDialog,
}: AdminModalProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const [editPage, setEditPage] = useState<PageTabContent>(page);
    const lang: Language = useDataStore((state) => state.lang);
    const [langEdit, setLang] = useState<Language>(Language.FR);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                closeDialog();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node)
            ) {
                closeDialog();
            }
        };

        window.addEventListener('keydown', handleEsc);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDialog]);

    const handleTextInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        lang: Language, // 'EN' or 'FR'
    ) => {
        const { name, value } = e.target;

        const updatedPage = { ...editPage };

        if (name === 'title') {
            updatedPage.title[lang] = value;
        } else if (name === 'description') {
            updatedPage.description[lang] = value;
        }

        setEditPage(updatedPage);
    };

    const handleImageInputChange = (image: string) => {
        const updatedPage = { ...editPage };

        if (image) {
            updatedPage.backgroundImage = image;
        }

        setEditPage(updatedPage);
    };

    function handleTabChange(index: number, tab: TabContent | undefined) {
        const updatedPage = { ...editPage };
        let updatedTabs = [...updatedPage.tabs];
        if (tab) {
            if (updatedTabs.length > index) {
                updatedTabs[index] = tab;
            } else {
                updatedTabs.push(tab);
            }
        } else {
            updatedTabs = updatedTabs.filter(
                (tab, tabIndex) => tabIndex !== index,
            );
        }
        updatedPage.tabs = updatedTabs;
        setEditPage(updatedPage);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitDialog(editPage);
    };

    function handleTabAdd(e: any) {
        e.preventDefault();
        const updatedPage = { ...editPage };
        let updatedTabs = [...updatedPage.tabs];
        updatedTabs.push({
            tabType: StudyOrigin.INDEX_VOLETA,
            years: [StudyYears.YEAR_2023],
            description: { FR: '', EN: '' },
            cards: [],
            visible: false,
        });

        updatedPage.tabs = updatedTabs;

        setEditPage(updatedPage);
    }

    function handleTabDelete(index: number) {
        const updatedPage = { ...editPage };
        let updatedTabs = [...updatedPage.tabs];
        updatedTabs = updatedTabs.filter((tab, tabIndex) => tabIndex !== index);

        updatedPage.tabs = updatedTabs;

        setEditPage(updatedPage);
    }

    enum Sides {
        Left = 'left',
        Right = 'right',
    }

    function handleTabMove(
        index: number,
        side: Sides,
        setActiveIndex: (index: number) => void,
        activeIndex: number,
    ) {
        let updatedEditPage = { ...editPage };
        const newTabs = [...updatedEditPage.tabs];
        let currentTab = { ...newTabs[index] };

        switch (side) {
            case Sides.Left:
                if (index > 0) {
                    let replacementTab: TabContent = {
                        ...newTabs[index - 1],
                    };
                    newTabs[index] = { ...replacementTab };
                    newTabs[index - 1] = { ...currentTab };
                    if (activeIndex === index) {
                        setActiveIndex(index - 1);
                    } else if (activeIndex === index - 1) {
                        setActiveIndex(index);
                    }
                }
                break;
            case Sides.Right:
                if (index < newTabs.length - 1) {
                    let replacementTab: TabContent = { ...newTabs[index + 1] };
                    newTabs[index] = { ...replacementTab };
                    newTabs[index + 1] = { ...currentTab };
                    if (activeIndex === index) {
                        setActiveIndex(index + 1);
                    } else if (activeIndex === index + 1) {
                        setActiveIndex(index);
                    }
                }
                break;
        }

        updatedEditPage.tabs = newTabs;

        setEditPage(updatedEditPage);
    }

    return (
        <div className="fixed z-40 h-[100%] backdrop-blur-md flex items-center justify-center w-full overflow-hidden">
            <div
                ref={dialogRef}
                className="bg-[#DFDFDF] dark:bg-[#262626] rounded-lg shadow-2xl w-[95%] h-[95%] relative p-2 overflow-hidden"
            >
                <LanguageEditToggle
                    handleLanguageChange={(lang: Language) => {
                        setLang(lang);
                    }}
                    language={Language.FR}
                    className="ml-2 mb-1"
                ></LanguageEditToggle>
                <form className="w-full h-full flex flex-col overflow-auto">
                    <div className="flex-col flex w-[80%] mb-3 m-1 ml-2 gap-1">
                        <input
                            type="text"
                            placeholder="titre"
                            name="title"
                            value={editPage.title[langEdit]}
                            onChange={(e) => handleTextInputChange(e, langEdit)} // Uncomment and implement this function
                            className="rounded-md border border-logo-dark-blue dark:border-white  text-lg tracking-wide w-full text-black shadow-sm p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            placeholder="description"
                            type="text"
                            name="description"
                            value={editPage.description[langEdit]}
                            onChange={(e) => handleTextInputChange(e, langEdit)}
                            className="rounded-md text-md border border-logo-dark-blue dark:border-white tracking-wide w-full text-black 
                            shadow-sm p-1 dark:text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <EditTabContainer
                        tabs={editPage.tabs}
                        handleInputChange={handleTabChange}
                        handleTabAdd={handleTabAdd}
                        handleTabDelete={handleTabDelete}
                        handleTabMove={handleTabMove}
                        langEdit={langEdit}
                    ></EditTabContainer>
                </form>
                <ImageDropdown
                    handleImageChange={handleImageInputChange}
                    selectedImage={editPage.backgroundImage}
                    className="absolute top-14 right-10 z-10"
                />
                <Button
                    buttonType={ButtonType.ICON_ROUNDED}
                    onClick={closeDialog}
                    className="absolute top-2 right-2 border bg-logo-dark-blue px-3"
                >
                    X
                </Button>
                <Button
                    onClick={handleSubmit}
                    buttonType={ButtonType.ICON_ROUNDED}
                    className="absolute top-2 right-12 border-logo-dark-blue bg-white text-black"
                >
                    <p className="text-black">
                        {SharedPromptsTranslations.save[lang]}
                    </p>
                </Button>
            </div>
        </div>
    );
}

interface LanguageEditToggleProps {
    handleLanguageChange: (language: Language) => void;
    language: Language;
    className?: string;
}

function LanguageEditToggle({
    handleLanguageChange,
    language,
    className = '',
}: LanguageEditToggleProps) {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // Get the keys from the Language object
    const languages = Object.keys(Language);

    // Update active index whenever the `language` prop changes
    useEffect(() => {
        const index = languages.findIndex((lang) => lang === language);
        setActiveIndex(index);
    }, [language]);

    return (
        <div
            className={`flex flex-row bg-logo-dark-blue rounded-xl space-x-1 w-fit h-8 items-center ${className}`}
        >
            {languages.map((lang, index) => {
                const isActive = index === activeIndex;
                return (
                    <div
                        key={index}
                        className={`cursor-pointer w-8 h-8 rounded-xl flex items-center justify-center ${
                            isActive
                                ? 'bg-white text-black scale-110 font-bold shadow-xl border-black border'
                                : 'bg-logo-dark-blue text-white'
                        } transition-colors duration-300`}
                        onClick={() => {
                            setActiveIndex(index); // Update the active index
                            handleLanguageChange(lang as Language); // Trigger language change on click
                        }}
                    >
                        <p>{lang}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default LanguageEditToggle;
