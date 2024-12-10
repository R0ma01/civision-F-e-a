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
    width?: string;
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
    width = 'w-48',
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lang]);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setSelectedValue(inputValue);
        setDisplayText(displayValue(inputValue, lang, dataField));
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                className={`flex items-center justify-between ${width} px-2 py-1 bg-gray-100 border max-h-8 h-8 
                border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2
                 focus:ring-blue-500 focus:ring-opacity-50 text-xs ${className} shadow-sm`}
                style={style}
            >
                <span className="overflow-hidden w-40 max-h-8">
                    {displayText}
                </span>

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
                    className={`absolute mt-1 bg-white border max-h-64 f-fit border-gray-300 dark:bg-gray-700 rounded-lg shadow-lg z-10  ${width} overflow-hidden`}
                >
                    <ul className="px-0.5 rounded-md dark:bg-gray-700 max-h-64 overflow-y-scroll overflow-x-hidden py-1 flex flex-col gap-1">
                        {options.map((option: any) => {
                            const isSelected = selectedValue === option;

                            return (
                                <li
                                    key={option as unknown as string}
                                    className={`w-full px-1 text-gray-700 cursor-pointer transition-colors text-wrap text-[10px] h-fit text-left py-1 flex items-center rounded-lg ${
                                        isSelected
                                            ? 'bg-logo-turquoise'
                                            : 'bg-gray-100 hover:bg-gray-300'
                                    }`}
                                    onClick={() => handleSelection(option)}
                                >
                                    {displayValue(option, lang, dataField)}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
