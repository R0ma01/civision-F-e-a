import React, { useState, useRef, useEffect } from 'react';
import { TableauxTraductionsMainDataFields } from '@/services/translations';

import { Language } from '@/components/enums/language';
import useDataStore from '@/reducer/dataStore';
import {
    CloseArrowSVG,
    OpenArrowSVG,
} from '@/components/component/svg-icons/svg-icons';

interface DropdownProps {
    title: string;
    inputValue?: any;
    options: any;
    dataField?: any;
    onChange?: (value: any) => void;
    displayValue?: (value: any, lang: Language, field?: any) => string; // Function to display the value
    onMenuClick?: (value: any) => void;
    className?: string;
}

const DropdownSelect = ({
    title,
    inputValue,
    options,
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
}: DropdownProps) => {
    const [selectedValue, setSelectedValue] = useState<any[]>([...inputValue]);
    const lang: Language = useDataStore((state) => state.lang);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setSelectedValue(inputValue);
    }, [inputValue]);

    const toggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDropdownOpen((prev) => !prev);
    };

    const handleSelection = (value: any) => {
        onChange(value);
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
                className={`flex items-center justify-between w-48 px-2 py-1 bg-gray-100 border max-h-8 h-8 
                border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2
                 focus:ring-blue-500 focus:ring-opacity-50 text-xs ${className} shadow-sm`}
            >
                <span className="overflow-hidden w-40 max-h-8">{title}</span>
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
                    className={`absolute mt-1 p-1 bg-white border border-gray-300 rounded-lg 
                        shadow-lg z-10 w-48`}
                >
                    <ul className="max-h-60 rounded-lg overflow-y-auto overflow-x-hidden">
                        {options.map((option: any) => {
                            const isSelected = selectedValue.includes(option);
                            return (
                                <li
                                    key={option as unknown as string}
                                    className={`w-[98%] px-2 text-gray-700 cursor-pointer transition-colors text-wrap text-[10px] h-fit m-0.5 text-left py-1 flex items-center rounded-lg ${
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

export default DropdownSelect;
