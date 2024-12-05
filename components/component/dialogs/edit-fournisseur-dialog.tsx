'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
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
import { string, number, object, ref, boolean } from 'yup';

import { Language } from '@/components/enums/language';
import { TableauxTraductionsMainDataFields } from '@/services/translations';

interface EditFournisseurDialogProps {
    closeDialog: (e: any) => void;
    submitDialog: (fournisseur: Fournisseur) => void;
    fournisseur: Fournisseur;
    dialogRef?: any;
}

export function EditFournisseurDialog({
    closeDialog,
    submitDialog,
    fournisseur,
}: EditFournisseurDialogProps) {
    const dialogRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                closeDialog(event);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (dialogRef.current && !dialogRef.current.contains(target)) {
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
    return (
        <div className="fixed z-40 h-screen left-[40px] top-0 backdrop-blur-md flex items-center justify-center w-screen overflow-hidden">
            <div
                ref={dialogRef}
                className="bg-white dark:bg-[#262626] p-6 rounded-lg w-[80%] shadow-2xl h-fit flex flex-row justify-evenly"
            >
                <EditFournisseurContent
                    closeDialog={closeDialog}
                    submitDialog={submitDialog}
                    fournisseur={fournisseur}
                ></EditFournisseurContent>
            </div>
        </div>
    );
}

interface EditFournisseurContentProps {
    closeDialog?: (e: any) => void;
    submitDialog: (fournisseur: Fournisseur) => void;
    fournisseur: Fournisseur;
    submitMany?: boolean;
}

export function EditFournisseurContent({
    closeDialog,
    submitDialog,
    fournisseur,
    submitMany,
}: EditFournisseurContentProps) {
    const lang: Language = useDataStore((state) => state.lang);
    const [secteursOptions, setSecteursOptions] = useState<
        SecteursGeographiques[]
    >(fournisseur.secteurs_geographique || []);
    const [servicesOptions, setServicesOptions] = useState<ServiceOffert[]>(
        fournisseur.services_offerts || [],
    );

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

    const initialFournisseurValues = {
        firstName: fournisseur.contact?.firstName || '',
        lastName: fournisseur.contact?.lastName || '',
        compagnie: fournisseur.contact?.company || '',
        courriel: fournisseur.contact?.email || '',
        telephone: fournisseur.contact?.cellPhone || '',
        titre: fournisseur.contact?.title || '',
        secteurs_geographiques: secteursOptions,
        services_offerts: servicesOptions,
        visible: fournisseur.visible || false,
        website: fournisseur.contact?.website || '',
        linkedIn: fournisseur.contact?.linkedIn || '',
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
                linkedIn: values.linkedIn || '',
                website: values.website || '',
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
        <div className={'w-full flex items-center justify-center'}>
            <Formik
                initialValues={initialFournisseurValues}
                onSubmit={(values: any) => {
                    handleSubmit(values);
                }}
                validationSchema={object().shape({
                    lastName: string().required('aaaaaaaaaaa'),
                    firstName: string().required('aaaaaaaa'),
                    courriel: string().email('aaaaaaaaa').required('aaaaaaaa'),
                    telephone: number().required('aaaaaaaaaaaa'),
                    compagnie: string().required('aaaaaaa'),
                    titre: string().required('aaaaaa'),
                    linkedIn: string().url(),
                    website: string().url(),
                })}
            >
                {({ isSubmitting, values }) => {
                    let isComplete = true;
                    const keys = Object.keys(values);

                    keys.map((key: any) => {
                        if (values[key] === '') {
                            isComplete = false;
                        }
                    });
                    if (secteursOptions.length === 0) {
                        isComplete = false;
                    }

                    if (servicesOptions.length === 0) {
                        isComplete = false;
                    }

                    return (
                        <Form className="space-y-4 flex flex-col items-center w-[90%]">
                            <div className="flex gap-4 w-full">
                                <CustomFormInput
                                    name="firstName"
                                    className="input-field w-full p-2 dark:bg-gray-500 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder={
                                        FournisseurPromptsTranslations.prenom[
                                            lang
                                        ]
                                    }
                                    type={'text'}
                                />
                                <CustomFormInput
                                    name="lastName"
                                    className="input-field w-full p-2 dark:bg-gray-500 border dark:text-white border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder={
                                        FournisseurPromptsTranslations.nom[lang]
                                    }
                                    type={'text'}
                                />
                            </div>
                            <div className="flex gap-4 w-full">
                                <CustomFormInput
                                    name="compagnie"
                                    className="input-field w-full p-2 dark:bg-gray-500 border dark:text-white border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder={
                                        FournisseurPromptsTranslations
                                            .entreprise[lang]
                                    }
                                    type={'text'}
                                />
                                <CustomFormInput
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
                                <CustomFormInput
                                    name="courriel"
                                    className="input-field dark:bg-gray-500 p-2 border dark:text-white border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder="Courriel"
                                    type={'email'}
                                />
                                <CustomFormInput
                                    name="telephone"
                                    className="input-field dark:bg-gray-500 p-2 border dark:text-white border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder={
                                        FournisseurPromptsTranslations
                                            .telephone[lang]
                                    }
                                    type="phone"
                                />
                            </div>{' '}
                            <div className="flex gap-4 w-full">
                                <CustomFormInput
                                    name="website"
                                    className="input-field dark:bg-gray-500 p-2 border dark:text-white border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder="Website"
                                    type={'text'}
                                />
                                <CustomFormInput
                                    name="linkedIn"
                                    className="input-field dark:bg-gray-500 p-2 border dark:text-white border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder={'linkedin'}
                                    type={'text'}
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
                                                        className={`w-[98%] px-2 text-gray-700 cursor-pointer transition-colors text-wrap text-[10px] h-6 m-0.5 text-left flex items-center rounded-lg ${
                                                            isSelected
                                                                ? 'bg-logo-turquoise'
                                                                : ' dark:text-white hover:bg-gray-300 hover:dark:text-gray-800'
                                                        }`}
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
                                                        className={`w-[98%] px-2 text-gray-700 cursor-pointer transition-colors text-wrap text-[10px] h-6 m-0.5 text-left flex items-center rounded-lg ${
                                                            isSelected
                                                                ? 'bg-logo-turquoise'
                                                                : 'dark:text-white hover:bg-gray-300'
                                                        }`}
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
                                {closeDialog && (
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
                                )}
                                {isComplete && (
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={
                                            submitMany
                                                ? 'absolute top-3 right-20'
                                                : ''
                                        }
                                        buttonType={
                                            submitMany
                                                ? ButtonType.LAMBDA
                                                : ButtonType.CONFIRM
                                        }
                                    >
                                        <p>
                                            {' '}
                                            {!submitMany
                                                ? SharedPromptsTranslations.save[
                                                      lang
                                                  ].toString()
                                                : 'Soumettre'}
                                        </p>
                                    </Button>
                                )}
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

function CustomFormInput({
    name,
    placeholder = '',
    type,
    className = '',
    disabled = false,
}: {
    name: any;
    placeholder: any;
    type: any;
    className?: any;
    disabled?: any;
}) {
    return (
        <div className={`flex flex-col w-full`}>
            <Field
                name={name}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                className={`${className}`}
            />
            <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 text-[8px] font-medium w-full"
            />
        </div>
    );
}
