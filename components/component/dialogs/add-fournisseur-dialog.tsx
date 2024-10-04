'use client';

import { Formik, Form, Field } from 'formik';
import React, { useState, useEffect, useRef } from 'react';

import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';
import ListeFournisseurs from '../liste-fournisseurs/liste-fournisseurs';

interface AddFournisseurDialogProps {
    closeDialog: (e: any) => void;
    handleSubmit: (values: any) => void;
}

export function AddFournisseurDialog({
    closeDialog,
    handleSubmit,
}: AddFournisseurDialogProps) {
    const INITIAL_VALUES = {
        firstName: '',
        lastName: '',
        organization: '',
        email: '',
        secteursGeographiques: [] as string[],
        servicesOfferts: [] as string[],
    };

    const [secteursOptions, setSecteursOptions] = useState<string[]>([]);
    const [servicesOptions, setServicesOptions] = useState<string[]>([]);
    const [isSecteurDropdownVisible, setSecteurDropdownVisible] =
        useState(false);
    const [isServiceDropdownVisible, setServiceDropdownVisible] =
        useState(false);

    const dialogRef = useRef<HTMLDivElement>(null);
    const secteurDropdownRef = useRef<HTMLDivElement>(null);
    const serviceDropdownRef = useRef<HTMLDivElement>(null);

    const addSecteur = (secteur: string) => {
        if (!secteursOptions.includes(secteur)) {
            setSecteursOptions([...secteursOptions, secteur]);
        }
        setSecteurDropdownVisible(false); // Close the dropdown after selection
    };

    const removeSecteur = (secteur: string) => {
        setSecteursOptions(secteursOptions.filter((s) => s !== secteur));
    };

    const addService = (service: string) => {
        if (!servicesOptions.includes(service)) {
            setServicesOptions([...servicesOptions, service]);
        }
        setServiceDropdownVisible(false); // Close the dropdown after selection
    };

    const removeService = (service: string) => {
        setServicesOptions(servicesOptions.filter((s) => s !== service));
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
                !secteurDropdownRef.current.contains(target)
            ) {
                setSecteurDropdownVisible(false);
            }
            if (
                serviceDropdownRef.current &&
                !serviceDropdownRef.current.contains(target)
            ) {
                setServiceDropdownVisible(false);
            }

            // Keep the dialog open, only close if clicking outside the dialog and not on the dropdowns
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

    return (
        <div className="fixed z-40 h-[100%] left-[40px] backdrop-blur-md flex items-center justify-center w-screen overflow-hidden">
            <div
                ref={dialogRef}
                className="bg-white dark:bg-[#262626] p-2 rounded-lg shadow-2xl w-[80%] h-[95%] relative space-y-8 flex flex-row justify-evenly items-center"
            >
                <div className="w-[40%] h-full flex justify-center items-center">
                    <ListeFournisseurs></ListeFournisseurs>
                </div>
                <Formik
                    initialValues={INITIAL_VALUES}
                    onSubmit={(values) => {
                        values.secteursGeographiques = secteursOptions;
                        values.servicesOfferts = servicesOptions;
                        handleSubmit(values);
                    }}
                >
                    {({ isSubmitting, status }) => (
                        <Form className="space-y-4 flex flex-col items-center">
                            <div className="flex gap-4 mb-3">
                                <Field
                                    name="firstName"
                                    className="input-field w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder="First Name"
                                />
                                <Field
                                    name="lastName"
                                    className="input-field w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                    placeholder="Last Name"
                                />
                            </div>
                            <Field
                                name="organization"
                                className="input-field w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                placeholder="Organization"
                            />
                            <Field
                                name="email"
                                className="input-field w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none"
                                placeholder="Email"
                                type="email"
                            />

                            {/* Secteurs Geographiques */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-800 mb-1">
                                    Secteurs Géographiques
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {secteursOptions.map((secteur) => (
                                        <div
                                            key={secteur}
                                            className="bg-gray-200 dark:bg-gray-700 rounded-md p-2 flex items-center space-x-2"
                                        >
                                            <span className="text-sm">
                                                {secteur}
                                            </span>
                                            <button
                                                type="button"
                                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500"
                                                onClick={() =>
                                                    removeSecteur(secteur)
                                                }
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                                        onClick={() =>
                                            setSecteurDropdownVisible(true)
                                        }
                                    >
                                        + Ajouter un secteur
                                    </button>
                                </div>
                                {isSecteurDropdownVisible && (
                                    <DropDownSelector
                                        ref={secteurDropdownRef}
                                        values={Object.values(
                                            SecteursGeographiques,
                                        ).filter(
                                            (secteur: string) =>
                                                !secteursOptions.includes(
                                                    secteur,
                                                ),
                                        )}
                                        select={addSecteur}
                                    />
                                )}
                            </div>

                            {/* Services Offerts */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium dark:text-gray-300 text-gray-800 mb-1">
                                    Services Offerts
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {servicesOptions.map((service) => (
                                        <div
                                            key={service}
                                            className="bg-gray-200 dark:bg-gray-700 rounded-md p-2 flex items-center space-x-2"
                                        >
                                            <span className="text-sm">
                                                {service}
                                            </span>
                                            <button
                                                type="button"
                                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500"
                                                onClick={() =>
                                                    removeService(service)
                                                }
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                                        onClick={() =>
                                            setServiceDropdownVisible(true)
                                        }
                                    >
                                        + Ajouter un service
                                    </button>
                                </div>
                                {isServiceDropdownVisible && (
                                    <DropDownSelector
                                        ref={serviceDropdownRef}
                                        values={Object.values(
                                            ServiceOffert,
                                        ).filter(
                                            (service: string) =>
                                                !servicesOptions.includes(
                                                    service,
                                                ),
                                        )}
                                        select={addService}
                                    />
                                )}
                            </div>

                            <div className="flex items-center justify-evenly mt-4">
                                <Button
                                    onClick={closeDialog}
                                    buttonType={ButtonType.CANCEL}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    buttonType={ButtonType.CONFIRM}
                                >
                                    Ajouter Fournisseur
                                </Button>
                            </div>
                            {status && (
                                <div className="text-red-600 mt-2 text-sm">
                                    {status}
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

interface DropDownSelectorProps {
    values: string[];
    select: (value: string) => void;
}

const DropDownSelector = React.forwardRef<
    HTMLDivElement,
    DropDownSelectorProps
>(({ values, select }, ref) => {
    return (
        <div
            ref={ref}
            className="w-52 h-52 bg-black text-white rounded p-2 shadow-lg absolute overflow-auto z-20"
        >
            <ul>
                {values.map((value: string) => (
                    <li
                        key={value}
                        className="cursor-pointer hover:bg-gray-700 p-1"
                        onClick={() => select(value)}
                    >
                        {value}
                    </li>
                ))}
            </ul>
        </div>
    );
});

DropDownSelector.displayName = 'DropDownSelector';
