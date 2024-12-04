'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
    VisibleSVG,
    InvisibleSVG,
} from '@/components/component/svg-icons/svg-icons';
import Button from '@/components/component/buttons/button';
import { ButtonType } from '@/components/enums/button-type-enum';
import { RepertoirePromptsTranslations } from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';
import { string, object, date } from 'yup';
import UploadFileModal from './UploadFileModal';
import { Fournisseur } from '@/components/interface/fournisseur';
import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';

interface AddEntrepriseDialogProps {
    closeDialog: () => void;

    handleSubmit: (values: any) => any;
}

export function AddManyFournisseursDialog({
    closeDialog,

    handleSubmit,
}: AddEntrepriseDialogProps) {
    const [file, setFile] = useState<any>([]);
    const lang = useDataStore((state) => state.lang);

    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                closeDialog();
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            // Keep the dialog open, only close if clicking outside the dialog and not on the dropdowns
            if (dialogRef.current && !dialogRef.current.contains(target)) {
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

    const [isShown, setIsShown] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<any>(false);
    const localHandleSubmit = async () => {
        console.log('hi');
        setIsSubmitting(true);
        const response = await handleSubmit(file);
        setIsSubmitting(false);
        if (response) {
            snack('success');
        } else {
            snack('fail');
        }
    };

    function snack(confirm: string) {
        setIsShown(confirm);

        setTimeout(() => {
            setIsShown('');
        }, 5000);
    }

    return (
        <div className="fixed z-40 h-[100%] left-[40px] backdrop-blur-md flex items-center justify-center w-screen overflow-hidden">
            <div
                ref={dialogRef}
                className="dark:bg-[#262626] bg-white rounded-lg overflow-hidden shadow-2xl w-[80%] h-[95%] relative flex flex-col p-4 text-white"
            >
                <div
                    className={`absolute ${isShown === 'success' ? 'bg-green-200 right-2 opacity-100' : isShown === 'fail' ? 'bg-red-200 right-2 opacity-100' : 'right-2 translate-x-20 opacity-0'} rounded-md bottom-2 shadow-md h-fit w-fit p-2 transition-all duration-200`}
                >
                    Added !
                </div>

                <div className="absolute right-4 top-3 flex flex-row gap-3">
                    {' '}
                    <div
                        className={`${file.length > 0 ? 'opacity-100' : 'translate-x-20 opacity-0'} h-fit w-fit transition-all duration-200`}
                    >
                        <Button
                            pending={isSubmitting}
                            onClick={localHandleSubmit}
                        >
                            Soumettre
                        </Button>
                    </div>
                    <Button
                        onClick={closeDialog}
                        pending={isSubmitting}
                        buttonType={ButtonType.CANCEL}
                    >
                        ✕
                    </Button>
                </div>
                <div className="flex flex-col gap-4 pt-1">
                    <span className="font-bold uppercase pl-2 w-[95%] text-center text-lg">
                        INSÉRER PLUSIEURS FOURNISSEURS À PARTIR D&lsquo;UN
                        FICHIER
                    </span>
                    <UploadFileModal
                        handleStartUpload={async (fileName: any, file: any) => {
                            const fournisseurs = formatFileNames(file);

                            setFile(fournisseurs);
                        }}
                    ></UploadFileModal>
                </div>
                <div className="h-full overflow-auto gap-1 flex flex-col">
                    {file.map((fournisseur: any, index: number) => {
                        const toggleVisibility = (state: boolean) => {
                            setFile((prev: any) => {
                                return prev.map(
                                    (item: Fournisseur, localIndex: number) => {
                                        if (index === localIndex) {
                                            return { ...item, visible: state };
                                        }
                                        return item;
                                    },
                                );
                            });
                        };
                        return (
                            <div
                                key={index}
                                className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white text-black"
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                }}
                            >
                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex flex-col">
                                        {' '}
                                        <p className="text-lg font-bold">
                                            {fournisseur.contact.firstName}{' '}
                                            {fournisseur.contact.lastName}
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {fournisseur.contact.title} -{' '}
                                            {fournisseur.contact.company}
                                        </p>
                                    </div>
                                    <div className="mt-2 text-sm">
                                        <VisibilityToggle
                                            toggleState={fournisseur.visible}
                                            setToggleState={toggleVisibility}
                                        ></VisibilityToggle>
                                        {/* {fournisseur.visible ? 'Yes' : 'No'} */}
                                    </div>
                                </div>

                                <p className="mt-2 text-sm">
                                    <strong>Email:</strong>{' '}
                                    {fournisseur.contact.email}
                                </p>
                                <p className="text-sm">
                                    <strong>Phone:</strong>{' '}
                                    {fournisseur.contact.cellPhone}
                                </p>
                                <p className="mt-2 text-sm">
                                    <strong>Sectors:</strong>{' '}
                                    {fournisseur.secteurs_geographique.join(
                                        ', ',
                                    )}
                                </p>
                                <p className="text-sm">
                                    <strong>Services:</strong>{' '}
                                    {fournisseur.services_offerts.join(', ')}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function formatFileNames(file: any) {
    const formattedFile: any[] = [];

    if (!file) {
        return [];
    }

    const keys = Object.keys(file[0]);

    file.map((something: any) => {
        const fournisseurData: Fournisseur = {
            contact: {
                lastName: something[keys[0]],
                firstName: something[keys[1]],
                email: something[keys[2]],
                cellPhone: something[keys[3]],
                company: something[keys[4]],
                website: something[keys[5]],
                title: something[keys[6]],
                linkedIn: something[keys[7]],
            },
            secteurs_geographique: formatSecteurArray(something[keys[8]]),
            services_offerts: formatServiceArray(something[keys[9]]),
            visible: true,
        };
        formattedFile.push(fournisseurData);
        console.log(fournisseurData);
    });
    return formattedFile;
}

const Secteurs = Object.values(SecteursGeographiques);
const Services = Object.values(ServiceOffert);

function formatSecteurArray(secteurs: any) {
    const secteursArray = secteurs.split(' - ');

    const returnArray = secteursArray.map((item: string) => {
        // Remove non-letter characters and make case-insensitive comparisons
        const cleanedItem = item.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const response = Secteurs.findIndex(
            (secteur) =>
                secteur.replace(/[^a-zA-Z]/g, '').toLowerCase() === cleanedItem,
        );
        if (response > -1) {
            return item;
        } else {
            return SecteursGeographiques.AUTRE;
        }
    });

    return returnArray;
}
function formatServiceArray(secteurs: any) {
    const secteursArray = secteurs.split(' - ');

    const returnArray = secteursArray.map((item: string) => {
        // Remove non-letter characters and make case-insensitive comparisons
        const cleanedItem = item.replace(/[^a-zA-Z]/g, '').toLowerCase();
        const response = Services.findIndex(
            (secteur) =>
                secteur.replace(/[^a-zA-Z]/g, '').toLowerCase() === cleanedItem,
        );
        if (response > -1) {
            return item;
        } else {
            return ServiceOffert.AUTRE;
        }
    });

    return returnArray;
}

function VisibilityToggle({
    toggleState = false,
    setToggleState = () => {},
}: {
    toggleState: boolean;
    setToggleState?: (state: boolean) => void;
}) {
    return (
        <div>
            <div className="flex flex-row gap-1 bg-gray-100 w-fit h-fit rounded-lg">
                <div
                    onClick={async () => {
                        if (!toggleState) {
                            await setToggleState(true);
                        }
                    }}
                    className={`${
                        toggleState
                            ? 'scale-125 bg-logo-dark-blue'
                            : 'bg-gray-100'
                    } p-1 rounded-md transition-transform duration-200 cursor-pointer`}
                >
                    <VisibleSVG className="fill-gray-300"></VisibleSVG>
                </div>
                <div
                    onClick={async () => {
                        if (toggleState) {
                            await setToggleState(false);
                        }
                    }}
                    className={`${
                        !toggleState
                            ? 'scale-125  bg-logo-dark-blue'
                            : 'bg-gray-100'
                    } p-1 rounded-md transition-transform duration-200 cursor-pointer`}
                >
                    <InvisibleSVG className="fill-gray-300"></InvisibleSVG>
                </div>
            </div>
        </div>
    );
}
