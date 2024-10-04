'use client';

import { Formik, Form, Field } from 'formik';
import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';
import useDataStore from '@/reducer/dataStore';
import { Fournisseur } from '@/components/interface/fournisseur';
import {
    FournisseurPromptsTranslations,
    SharedPromptsTranslations,
} from '@/constants/translations/page-prompts';

import DropdownSelect from '@/components/component/drop-down-menu/drop-down-menu-selected-field';
import { Language } from '@/components/enums/language';
import { TableauxTraductionsMainDataFields } from '@/services/translations';

interface EditFournisseurDialogProps {
    closeDialog: (e: any) => void;
    submitDialog: (fournisseur: Fournisseur) => void;
    fournisseur: Fournisseur;
}

export function EditFournisseurDialog({
    closeDialog,
    submitDialog,
    fournisseur,
}: EditFournisseurDialogProps) {
    const lang: Language = useDataStore((state) => state.lang);
    const [secteursOptions, setSecteursOptions] = useState<
        SecteursGeographiques[]
    >(fournisseur.secteurs_geographique);
    const [servicesOptions, setServicesOptions] = useState<ServiceOffert[]>(
        fournisseur.services_offerts,
    );
    const [isSecteurDropdownVisible, setSecteurDropdownVisible] =
        useState(false);
    const [isServiceDropdownVisible, setServiceDropdownVisible] =
        useState(false);

    const dialogRef = useRef<HTMLDivElement>(null);
    const secteurDropdownRef = useRef<HTMLDivElement>(null);
    const serviceDropdownRef = useRef<HTMLDivElement>(null);
    const secteurButtonRef = useRef<HTMLButtonElement>(null);
    const serviceButtonRef = useRef<HTMLButtonElement>(null);

    const handleServiceEdit = (service: ServiceOffert) => {
        if (!servicesOptions.includes(service)) {
            setServicesOptions([...servicesOptions, service]);
        } else {
            const newOptions: ServiceOffert[] = servicesOptions.filter(
                (serv) => serv !== service,
            );

            setServicesOptions(newOptions);
        }
    };
    const handleSecteurEdit = (secteur: SecteursGeographiques) => {
        if (!secteursOptions.includes(secteur)) {
            setSecteursOptions([...secteursOptions, secteur]);
        } else {
            const newOptions: SecteursGeographiques[] = secteursOptions.filter(
                (serv) => serv !== secteur,
            );

            setSecteursOptions(newOptions);
        }
    };

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                closeDialog(event);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                secteurDropdownRef.current &&
                !secteurDropdownRef.current.contains(target) &&
                secteurButtonRef.current &&
                !secteurButtonRef.current.contains(event.target as Node)
            ) {
                setSecteurDropdownVisible(false);
            }
            if (
                serviceDropdownRef.current &&
                !serviceDropdownRef.current.contains(target) &&
                serviceButtonRef.current &&
                !serviceButtonRef.current.contains(event.target as Node)
            ) {
                setServiceDropdownVisible(false);
            }

            if (
                dialogRef.current &&
                !dialogRef.current.contains(target) &&
                !(
                    secteurDropdownRef.current?.contains(target) ||
                    serviceDropdownRef.current?.contains(target)
                )
            ) {
                closeDialog(event);
            }
        };

        window.addEventListener('keydown', handleEsc);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDialog]);

    const initialFournisseurValues = {
        firstName: fournisseur.contact.firstName || '',
        lastName: fournisseur.contact.lastName || '',
        compagnie: fournisseur.contact.company || '',
        courriel: fournisseur.contact.email || '',
        telephone: fournisseur.contact.cellPhone || '',
        titre: fournisseur.contact.title || '',
        secteurs_geographiques: secteursOptions,
        services_offerts: servicesOptions,
        visible: fournisseur.visible || false,
    };

    function handleSubmit(values: any) {
        const fournisseurData: Fournisseur = {
            _id: fournisseur._id,
            contact: {
                lastName: values.lastName,
                firstName: values.firstName,
                email: values.courriel,
                cellPhone: values.telephone,
                company: values.compagnie,
                title: values.titre,
                linkedIn: values.profil_linkedin,
            },
            secteurs_geographique: secteursOptions,
            services_offerts: servicesOptions,
            visible: values.visible,
        };

        submitDialog(fournisseurData);
    }

    function displayValue(
        value: string | number, // Assuming value is either a string or a number
        lang: Language = Language.FR, // Default language is French
        field?: string, // field can be undefined, hence using `?`
    ) {
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
    }

    return (
        <div className="fixed z-40 h-screen left-[40px] top-0 backdrop-blur-md flex items-center justify-center w-screen overflow-hidden">
            <div
                ref={dialogRef}
                className="bg-white dark:bg-[#262626] p-6 rounded-lg shadow-2xl w-[80%] h-fit relative space-y-8 flex flex-row justify-evenly"
            >
                <Formik
                    initialValues={initialFournisseurValues}
                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4 flex flex-col items-center w-[90%]">
                            <div className="flex gap-4 w-full">
                                <Field
                                    name="firstName"
                                    className="input-field w-full p-2 dark:bg-gray-500 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder={
                                        FournisseurPromptsTranslations.prenom[
                                            lang
                                        ]
                                    }
                                />
                                <Field
                                    name="lastName"
                                    className="input-field w-full p-2 dark:bg-gray-500 border dark:text-white border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder={
                                        FournisseurPromptsTranslations.nom[lang]
                                    }
                                />
                            </div>
                            <div className="flex gap-4 w-full">
                                <Field
                                    name="compagnie"
                                    className="input-field w-full p-2 dark:bg-gray-500 border dark:text-white border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder={
                                        FournisseurPromptsTranslations
                                            .entreprise[lang]
                                    }
                                />
                                <Field
                                    name="titre"
                                    className="input-field w-full p-2 dark:bg-gray-500 border dark:text-white border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder={
                                        FournisseurPromptsTranslations.titre[
                                            lang
                                        ]
                                    }
                                    type="text"
                                />
                            </div>
                            <div className="flex gap-4 w-full">
                                <Field
                                    name="courriel"
                                    className="w-[50%] input-field dark:bg-gray-500 p-2 border dark:text-white border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder="Courriel"
                                    type={
                                        FournisseurPromptsTranslations.courriel[
                                            lang
                                        ]
                                    }
                                />
                                <Field
                                    name="telephone"
                                    className="input-field dark:bg-gray-500 w-[50%] p-2 border dark:text-white border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder={
                                        FournisseurPromptsTranslations
                                            .telephone[lang]
                                    }
                                    type="tel"
                                />
                            </div>
                            <div className="w-[100%] flex flex-row gap-4">
                                <div
                                    className={`mt-1 p-1 bg-white border border-gray-300 dark:bg-gray-700 rounded-lg 
                        shadow-lg z-10 w-full`}
                                >
                                    <ul className="max-h-60 rounded-lg overflow-y-auto dark:bg-gray-700">
                                        {Object.values(
                                            SecteursGeographiques,
                                        ).map(
                                            (option: SecteursGeographiques) => {
                                                const isSelected =
                                                    secteursOptions.includes(
                                                        option,
                                                    );
                                                return (
                                                    <li
                                                        key={
                                                            option as unknown as string
                                                        }
                                                        className={`w-fit m-1 h-fit hover:border-2 cursor-pointer transition-colors ${isSelected ? 'text-teal-300' : 'text-black dark:text-white'}`}
                                                        onClick={() =>
                                                            handleSecteurEdit(
                                                                option,
                                                            )
                                                        }
                                                    >
                                                        {displayValue(
                                                            option,
                                                            lang,
                                                        )}
                                                    </li>
                                                );
                                            },
                                        )}
                                    </ul>
                                </div>
                                <div
                                    className={`mt-1 p-1 bg-white border border-gray-300 dark:bg-gray-700 rounded-lg 
                        shadow-lg z-10 w-full`}
                                >
                                    <ul className="max-h-60 rounded-lg overflow-y-auto dark:bg-gray-700">
                                        {Object.values(ServiceOffert).map(
                                            (option: ServiceOffert) => {
                                                const isSelected =
                                                    servicesOptions.includes(
                                                        option,
                                                    );
                                                return (
                                                    <li
                                                        key={
                                                            option as unknown as string
                                                        }
                                                        className={`w-fit m-1 h-fit hover:border-2 cursor-pointer transition-colors ${isSelected ? 'text-teal-300' : 'text-black dark:text-white'}`}
                                                        onClick={() =>
                                                            handleServiceEdit(
                                                                option,
                                                            )
                                                        }
                                                    >
                                                        {displayValue(
                                                            option,
                                                            lang,
                                                        )}
                                                    </li>
                                                );
                                            },
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex justify-evenly flex-row w-[50%]">
                                <Button
                                    onClick={closeDialog}
                                    buttonType={ButtonType.CANCEL}
                                >
                                    <p>
                                        {SharedPromptsTranslations.cancel[
                                            lang
                                        ].toString()}
                                    </p>
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    buttonType={ButtonType.CONFIRM}
                                >
                                    <p>
                                        {' '}
                                        {SharedPromptsTranslations.save[
                                            lang
                                        ].toString()}
                                    </p>
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

const DropDownSelector = React.forwardRef(
    (
        {
            values,
            select,
        }: {
            values: (SecteursGeographiques | ServiceOffert)[];
            select: (value: string) => void;
        },
        ref: React.Ref<HTMLDivElement>,
    ) => {
        return (
            <div
                ref={ref}
                className="bg-white dark:bg-gray-800 shadow-md p-2 rounded-lg space-y-2 absolute z-50 w-64"
            >
                {values.map((value: string) => (
                    <div
                        key={value}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                        onClick={() => select(value)}
                    >
                        {value}
                    </div>
                ))}
            </div>
        );
    },
);
DropDownSelector.displayName = 'DropDownSelector';
