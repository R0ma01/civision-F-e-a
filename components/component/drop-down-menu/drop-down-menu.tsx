import React, { useState, useRef, useEffect } from 'react';
import { TableauxTraductionsMainDataFields } from '@/services/translations';
import { value_constants } from '@/constants/constants';
import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';
import { DropDownType } from '@/components/interface/drop-down-type';
import {
    CloseArrowSVG,
    OpenArrowSVG,
} from '@/components/component/svg-icons/svg-icons';

import {
    SharedPromptsTranslations,
    FournisseurPromptsTranslations,
} from '@/constants/translations/page-prompts';

interface DropdownProps {
    inputValue?: any;
    options: any;
    dataField?: any;
    color?: boolean;
    onChange?: (value: any) => void;
    displayValue?: (value: any, lang: Language, field?: any) => string; // Function to display the value
    onMenuClick?: (value: any) => void;
    className?: string;
    style?: any;
    dropType?: DropDownType;
}

const Dropdown = ({
    dropType = DropDownType.NORMAL,
    inputValue,
    options,
    color = false,
    dataField = undefined,
    onChange = () => {},
    onMenuClick = (e) => {},
    displayValue = (
        value: string | number, // Assuming value is either a string or a number
        lang: Language = Language.FR, // Default language is French
        field?: string, // field can be undefined, hence using `?`
    ): string => {
        // If field is provided
        if (field) {
            const fieldData = TableauxTraductionsMainDataFields.get(field);

            // Check if field exists in the map and if dataLabels exist for the given value and language
            if (fieldData?.dataLabels?.[value]?.[lang]) {
                return fieldData.dataLabels[value][lang];
            }
        } else {
            const fieldData = TableauxTraductionsMainDataFields.get(
                value.toString(),
            );

            // Check if field exists in the map and if dataLabels exist for the given value and language
            if (fieldData?.label) {
                return fieldData.label[lang];
            }
        }

        // Return the value as a string if no translation is found or if no field is provided
        return value.toString();
    },
    className = '',
    style = {},
}: DropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<any | undefined>(
        inputValue,
    );

    const lang: Language = useDataStore((state) => state.lang);
    const [displayText, setDisplayText] = useState<string>('');

    useEffect(() => {
        if (inputValue) {
            setDisplayText(displayValue(inputValue, lang, dataField));
        } else {
            setDisplayText(SharedPromptsTranslations.all[lang]);
        }
    }, []);

    useEffect(() => {
        if (
            selectedValue === value_constants.toutes_values_string_filter ||
            selectedValue === value_constants.all_values_string_filter
        ) {
            setSelectedValue(SharedPromptsTranslations.all[lang]);
        } else {
            setDisplayText(displayValue(inputValue, lang, dataField)); // This line is incorrect.
        }
    }, [lang]);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setSelectedValue(inputValue);
        setDisplayText(displayValue(inputValue, lang, dataField));
    }, [inputValue]);

    const toggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDropdownOpen((prev) => !prev);
    };

    const handleSelection = (value: any) => {
        setSelectedValue(value);
        onChange(value);
        setDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block text-left">
            <button
                ref={buttonRef}
                onClick={(e) => {
                    e.preventDefault();
                    onMenuClick(e);
                    toggleDropdown(e);
                }}
                className={`flex items-center justify-between ${color ? 'w-10' : 'w-48'} px-2 py-1 bg-gray-100 border max-h-8 h-8 
                border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2
                 focus:ring-blue-500 focus:ring-opacity-50 text-xs ${className} shadow-sm`}
                style={style}
            >
                {!color && (
                    <span className="overflow-hidden w-40 max-h-8">
                        {displayText}
                    </span>
                )}
                {color && (
                    <div
                        className="w-4 pl-1 h-3 hover:border-2 hover:border-black cursor-pointer transition-colors"
                        style={{ backgroundColor: selectedValue }}
                    ></div>
                )}
                {dropdownOpen ? (
                    <div className="w-fit h-fit p-1">
                        <OpenArrowSVG className="fill-black w-4 h-4"></OpenArrowSVG>
                    </div>
                ) : (
                    <div className="w-fit h-fit p-1 ">
                        <CloseArrowSVG className="fill-black w-4 h-4"></CloseArrowSVG>
                    </div>
                )}
            </button>
            {dropdownOpen && (
                <div
                    ref={dropdownRef}
                    className={`absolute mt-1 p-1 bg-white border border-gray-300 dark:bg-gray-700 rounded-lg shadow-lg z-10  ${color ? 'w-10' : 'w-52'}`}
                >
                    <ul className="max-h-64 rounded-lg overflow-y-auto dark:bg-gray-700">
                        {options.map((option: any) => {
                            if (!color) {
                                return (
                                    <li
                                        key={option as unknown as string}
                                        className="w-48 pl-1 text-gray-700 hover:bg-gray-100 cursor-pointer transition-colors text-wrap text-xs dark:text-white dark:hover:bg-black"
                                        onClick={() => handleSelection(option)}
                                    >
                                        {displayValue(option, lang, dataField)}
                                    </li>
                                );
                            } else {
                                return (
                                    <li
                                        key={option as unknown as string}
                                        className="w-4 m-1 h-3 hover:border-2 hover:border-black cursor-pointer transition-colors"
                                        style={{ backgroundColor: option }}
                                        onClick={() => handleSelection(option)}
                                    >
                                        {' '}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
