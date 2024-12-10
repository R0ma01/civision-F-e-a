import { Fournisseur } from '@/components/interface/fournisseur';
import useGlobalDataStore from '@/stores/global-data-store';
import React, { useEffect, useState } from 'react';
import Dropdown from '../drop-down-menu/drop-down-menu';
import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';

import {
    AddCircleSVG,
    EditSVG,
    EmailSVG,
    GlobeSVG,
    InvisibleSVG,
    LinkedInSVG,
    PhoneSVG,
    ServiceSVG,
    TrashSVG,
    VisibleSVG,
    OpenArrowSVG,
    CloseArrowSVG,
} from '../svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '../buttons/button';
import { Language } from '@/components/enums/language';
import {
    SharedPromptsTranslations,
    FournisseurPromptsTranslations,
} from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';
import Image from 'next/image';

interface ListeFournisseurProps {
    admin?: boolean;
    openEditDialog?: any;
    openAddDialog?: any;
    openDeleteDialog?: any;
    toggleFournisseurVisibility?: any;
}

const emptyFournisseur = {
    contact: {
        lastName: '',
        firstName: '',
        email: '',
        cellPhone: '',
        company: '',
        title: '',
        linkedin: '',
    },
    secteurs_geographique: [],
    services_offerts: [],
};

export default function ListeFournisseurs({
    admin = false,
    openEditDialog = () => {},
    openAddDialog = () => {},
    openDeleteDialog = () => {},
    toggleFournisseurVisibility = () => {},
}: ListeFournisseurProps) {
    const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([]);
    const lang: Language = useDataStore((state) => state.lang);

    const { fournisseurData, loading } = useGlobalDataStore((state: any) => ({
        fournisseurData: state.fournisseurData,
        loading: state.loading,
    }));

    const [searchString, setSearchString] = useState<string>('');
    const [searchSecteur, setSearchSecteur] = useState<
        SecteursGeographiques | string
    >(SharedPromptsTranslations.all[lang]);
    const [searchService, setSearchService] = useState<ServiceOffert | string>(
        SharedPromptsTranslations.all[lang],
    );

    function sortAlphabetically(compagnies: Fournisseur[]): Fournisseur[] {
        return compagnies.sort((a, b) => {
            if (!a.contact.lastName) {
                return 1;
            }
            if (!b.contact.lastName) {
                return -1;
            }

            // Normalize the names to remove accents and special characters
            const normalize = (name: string) =>
                name
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .toLowerCase();

            const nameA = normalize(a.contact.lastName);
            const nameB = normalize(b.contact.lastName);

            // Regular expression to check if the first character is a letter
            const isLetter = (name: string) => /^[a-zA-Z]/.test(name);

            if (isLetter(nameA) && !isLetter(nameB)) {
                return -1; // `a` comes first
            } else if (!isLetter(nameA) && isLetter(nameB)) {
                return 1; // `b` comes first
            } else {
                return nameA.localeCompare(nameB);
            }
        });
    }

    const filterPredicate = (fournisseur: Fournisseur) => {
        let returnValue = false;

        if (
            fournisseur.contact.lastName
                .toLowerCase()
                .startsWith(searchString.toLowerCase(), 0) ||
            fournisseur.contact.firstName
                .toLowerCase()
                .startsWith(searchString.toLowerCase(), 0)
        ) {
            if (
                searchSecteur === 'Toutes' ||
                fournisseur.secteurs_geographique.includes(
                    searchSecteur as unknown as SecteursGeographiques,
                )
            ) {
                if (
                    searchService === 'Toutes' ||
                    fournisseur.services_offerts.includes(
                        searchService as unknown as ServiceOffert,
                    )
                ) {
                    returnValue = true;
                }
            }
        }
        return returnValue;
    };

    function filterSearchParams() {
        const newData = fournisseurData.filter(filterPredicate);

        setFournisseurs(sortAlphabetically(newData));
    }

    useEffect(() => {
        filterSearchParams();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fournisseurData, searchString, searchSecteur, searchService]);

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchString(e.target.value);
    }

    function populateTable() {
        if (fournisseurs.length > 0) {
            return fournisseurs.map((fournisseur, index) => {
                if (fournisseur.visible)
                    return (
                        <FournisseurListElement
                            key={index}
                            fournisseur={fournisseur}
                            index={index}
                            admin={admin}
                            onClickEdit={openEditDialog}
                            onClickDelete={openDeleteDialog}
                            onClickVisible={toggleFournisseurVisibility}
                        ></FournisseurListElement>
                    );

                if (admin)
                    return (
                        <FournisseurListElement
                            key={index}
                            fournisseur={fournisseur}
                            index={index}
                            admin={admin}
                            onClickEdit={openEditDialog}
                            onClickDelete={openDeleteDialog}
                            onClickVisible={toggleFournisseurVisibility}
                        ></FournisseurListElement>
                    );
            });
        }
    }

    return (
        <div
            className={`w-full h-full bg-[#F0F3F4] dark:bg-[#363636] dark:text-white backdrop-blur-md bg-opacity-50 shadow-3xl
                    pointer-events-auto flex flex-col items-center p-2`}
        >
            {/* Search and Filters */}
            <div className="flex flex-col w-full p-1">
                <Image
                    src="/images/ORIA_NV.png"
                    width={165}
                    height={100}
                    alt="logo-ORIA"
                    className=""
                />
                <div className="flex flex-row w-full">
                    <h1 className="w-[300px] text-smaller md:text-small dark:text-white text-black mt-6 ">
                        {
                            FournisseurPromptsTranslations
                                .fournisseur_box_title[lang]
                        }
                    </h1>
                    <Button
                        buttonType={ButtonType.CONFIRM}
                        onClick={() =>
                            window.open(
                                'https://forms.gle/x1rgzmTpfrT49LMG9',
                                '_blank',
                            )
                        }
                        className="w-[100px] text-xs absolute top-2 right-2"
                        title="redirect:https://forms.gle/x1rgzmTpfrT49LMG9"
                    >
                        {FournisseurPromptsTranslations.subscribe[lang]}
                    </Button>
                </div>
                <div className="flex flex-col items-center justify-between">
                    {/* Search Input */}
                    <div className="w-full">
                        <input
                            type="text"
                            placeholder={
                                FournisseurPromptsTranslations
                                    .rechercher_fournisseur[lang]
                            }
                            value={searchString}
                            onChange={handleSearchChange}
                            className="p-2 h-8 bg-transparent border border-logo-turquoise dark:border-logo-turquoise shadow-lg rounded cursor-pointer w-full mt-2"
                        />
                    </div>

                    {/* Dropdown Filters */}
                    <div className="flex flex-row justify-between w-full mt-2">
                        <div className="flex flex-col w-fit">
                            <p className="text-xs">
                                {FournisseurPromptsTranslations.region[lang]}
                            </p>
                            <Dropdown
                                options={[
                                    SharedPromptsTranslations.all[lang],
                                    ...Object.values(SecteursGeographiques),
                                ]}
                                width={'w-44'}
                                inputValue={searchSecteur}
                                onChange={(value: any) =>
                                    setSearchSecteur(value)
                                }
                                className="hover:border-logo-turquoise text-black"
                            />
                        </div>
                        <div className="flex flex-col w-fit">
                            <p className="text-xs">
                                {FournisseurPromptsTranslations.service[lang]}
                            </p>
                            <Dropdown
                                options={[
                                    SharedPromptsTranslations.all[lang],
                                    ...Object.values(ServiceOffert),
                                ]}
                                width={'w-44'}
                                inputValue={searchService}
                                onChange={(value: any) =>
                                    setSearchService(value)
                                }
                                className="hover:border-logo-turquoise text-black"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table with Suppliers */}
            {!loading ? (
                <>
                    <div className="w-full overflow-y-auto h-[70%] max-h-[70%] rounded-md mt-2">
                        <table className="min-w-full">
                            <tbody>{populateTable()}</tbody>
                        </table>
                    </div>
                    {admin && (
                        <Button
                            buttonType={ButtonType.ICON}
                            onClick={() => openAddDialog()}
                        >
                            <AddCircleSVG className="fill-black dark:fill-white"></AddCircleSVG>
                        </Button>
                    )}
                </>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="loader-circle"></div>
                </div>
            )}
        </div>
    );
}

interface FournisseurListElementProps {
    fournisseur: Fournisseur;
    index: number;
    admin: boolean;
    onClickEdit: (fournisseur: Fournisseur) => void;
    onClickDelete: (fournisseur: Fournisseur) => void;
    onClickVisible: (fournisseur: Fournisseur) => void;
}
function FournisseurListElement({
    fournisseur,
    index,
    admin = false,
    onClickEdit,
    onClickDelete,
    onClickVisible,
}: FournisseurListElementProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleRowClick = () => {
        setIsOpen(!isOpen);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
    };

    return (
        <tr
            key={index}
            className={`border-b border-gray-400 dark:border-gray-700  hover:shadow-[0px_1px_5px_rgba(0,0,0,0.25)] dark:hover:shadow-[0px_1px_5px_rgba(255,255,255,0.45)] ursor-pointer relative transition-all ease-in-out duration-300 transform ${
                isOpen ? 'h-auto' : 'h-9'
            } group flex flex-col`}
            onClick={handleRowClick}
        >
            <div className="flex flex-col w-full justify-center h-9">
                <p className="">
                    {fournisseur.contact.firstName +
                        ' ' +
                        fournisseur.contact.lastName}
                </p>
            </div>
            <Button
                buttonType={ButtonType.ICON}
                onClick={(e) => {
                    handleButtonClick(e);
                    handleRowClick();
                }}
                className="absolute top-1.5 right-1 z-10"
                scaleOnHover={false}
            >
                {isOpen ? (
                    <div className="w-fit h-fit p-1 bg-logo-turquoise rounded-lg">
                        <OpenArrowSVG className="w-4 h-4 fill-custom-grey group-hover:fill-white"></OpenArrowSVG>
                    </div>
                ) : (
                    <div className="w-fit h-fit p-1 bg-logo-turquoise rounded-lg">
                        <CloseArrowSVG className="w-4 h-4 fill-custom-grey group-hover:fill-white"></CloseArrowSVG>
                    </div>
                )}
            </Button>
            <div className="flex-row justify-evenly mb-4 hidden group-hover:flex absolute top-1.5 right-4 space-x-1 p-1 bg-logo-turquoise rounded-l-md pr-3">
                {admin && (
                    <Button
                        buttonType={ButtonType.ICON}
                        onClick={(e) => {
                            handleButtonClick(e);
                            onClickEdit(fournisseur);
                        }}
                    >
                        <EditSVG className="hover:fill-white fill-custom-grey w-4 h-4"></EditSVG>
                    </Button>
                )}
                {admin && (
                    <Button
                        buttonType={ButtonType.ICON}
                        onClick={(e) => {
                            handleButtonClick(e);
                            onClickDelete(fournisseur);
                        }}
                    >
                        <TrashSVG className="hover:fill-white fill-custom-grey w-4 h-4"></TrashSVG>
                    </Button>
                )}
                {admin && (
                    <Button
                        buttonType={ButtonType.ICON}
                        onClick={(e) => {
                            handleButtonClick(e);
                            onClickVisible(fournisseur);
                        }}
                    >
                        {fournisseur.visible ? (
                            <VisibleSVG className=" hover:fill-white fill-custom-grey w-4 h-4"></VisibleSVG>
                        ) : (
                            <InvisibleSVG className=" hover:fill-white fill-custom-grey w-4 h-4"></InvisibleSVG>
                        )}
                    </Button>
                )}
            </div>
            {/* Main Row */}
            {isOpen && (
                <>
                    <td className="align-top flex flex-row justify-between text-sm border-gray-200 dark:border-gray-700">
                        <div>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                                Companie:{' '}
                                <span className="font-normal">
                                    {fournisseur.contact.company}
                                </span>
                            </p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                                Phone:{' '}
                                <span className="font-normal">
                                    {fournisseur.contact.cellPhone}
                                </span>
                            </p>
                            <p className="font-semibold text-gray-800 dark:text-gray-200">
                                Email:{' '}
                                <span className="font-normal">
                                    {fournisseur.contact.email}
                                </span>
                            </p>
                            {fournisseur.contact.linkedIn && (
                                <a
                                    href={fournisseur.contact.linkedIn}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:opacity-75 transition-opacity font-bold underline"
                                    onClick={(e: any) => handleButtonClick(e)}
                                >
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    </td>
                    {isOpen && (
                        <td colSpan={2} className="">
                            <div className="flex flex-col gap-2">
                                <div className="">
                                    <h4 className="text-xs font-semibold mb-1">
                                        Secteurs géographiques
                                    </h4>
                                    <div className="flex flex-wrap gap-0.5 text-xs text-gray-700 dark:text-gray-300">
                                        {fournisseur.secteurs_geographique.map(
                                            (secteur, i) => (
                                                <span
                                                    key={`${secteur}-${i}`}
                                                    className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-lg"
                                                >
                                                    {secteur}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>
                                <div className="">
                                    <h4 className="text-xs font-semibold mb-1">
                                        Services offerts
                                    </h4>
                                    <div className="flex flex-wrap gap-0.5 text-xs text-gray-700 dark:text-gray-300">
                                        {fournisseur.services_offerts.map(
                                            (service, i) => (
                                                <span
                                                    key={`${service}-${i}`}
                                                    className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-lg"
                                                >
                                                    {service}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </div>
                        </td>
                    )}
                </>
            )}
        </tr>
    );
}
