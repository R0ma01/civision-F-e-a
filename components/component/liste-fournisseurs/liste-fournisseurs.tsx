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
} from '../svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import Button from '../buttons/button';
import { Language } from '@/components/enums/language';
import {
    SharedPromptsTranslations,
    FournisseurPromptsTranslations,
} from '@/constants/translations/page-prompts';
import useDataStore from '@/reducer/dataStore';

interface ListeFournisseurProps {
    admin?: boolean;
    openEditDialog?: any;
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

    return (
        <div
            className={`w-[500px] bg-[#fefefe] dark:bg-[#2a2a2a] dark:text-white backdrop-blur-md bg-opacity-50 shadow-3xl
                    rounded-xl py-8 px-10 pointer-events-auto flex flex-col items-center space-y-6 h-auto max-h-[80%] `}
        >
            {/* Search and Filters */}
            <div className="flex flex-col w-full space-y-4">
                <h1 className="font-semibold text-xl">
                    {FournisseurPromptsTranslations.fournisseur_box_title[lang]}
                </h1>
                <div className="flex flex-col items-center justify-between">
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder={
                            FournisseurPromptsTranslations
                                .rechercher_fournisseur[lang]
                        }
                        value={searchString}
                        onChange={handleSearchChange}
                        className="w-full p-3 bg-white dark:bg-[#3a3a3a] border border-logo-turquoise dark:border-[#4fc3f7] 
                               rounded-lg focus:outline-none focus:ring-2 focus:ring-logo-turquoise dark:focus:ring-[#4fc3f7] 
                               shadow-sm transition ease-in-out duration-200"
                    />

                    {/* Dropdown Filters */}
                    <div className="flex flex-row justify-evenly space-x-4 mt-2">
                        <div className="flex flex-col">
                            <p className="text-xs">
                                {FournisseurPromptsTranslations.region[lang]}
                            </p>
                            <Dropdown
                                options={[
                                    SharedPromptsTranslations.all[lang],
                                    ...Object.values(SecteursGeographiques),
                                ]}
                                inputValue={searchSecteur}
                                onChange={(value: any) =>
                                    setSearchSecteur(value)
                                }
                                className="hover:border-logo-turquoise text-black"
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-xs">
                                {FournisseurPromptsTranslations.service[lang]}
                            </p>
                            <Dropdown
                                options={[
                                    SharedPromptsTranslations.all[lang],
                                    ...Object.values(ServiceOffert),
                                ]}
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
                    <div className="w-full overflow-y-auto max-h-[60%] rounded-md">
                        <table className="min-w-full">
                            <tbody>{populateTable()}</tbody>
                        </table>
                    </div>
                    {admin && (
                        <Button
                            buttonType={ButtonType.ICON}
                            onClick={() =>
                                openEditDialog(
                                    emptyFournisseur as unknown as Fournisseur,
                                )
                            }
                        >
                            <AddCircleSVG></AddCircleSVG>
                        </Button>
                    )}
                </>
            ) : (
                <div className="w-full h-32 flex justify-center items-center">
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
            className={`border-b border-gray-400 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-md cursor-pointer relative transition-all ease-in-out duration-300 transform ${
                isOpen ? 'h-auto' : 'h-12'
            } group flex flex-col`}
            onClick={handleRowClick}
        >
            {/* Main Row */}
            {!isOpen ? (
                <td colSpan={2} className="p-2">
                    <div className="flex-row justify-evenly mb-4 hidden group-hover:flex absolute top-[25%] right-3 space-x-4">
                        {admin && (
                            <Button
                                buttonType={ButtonType.ICON}
                                onClick={(e) => {
                                    handleButtonClick(e);
                                    onClickEdit(fournisseur);
                                }}
                            >
                                <EditSVG className="hover:scale-150 hover:fill-black dark:hover:fill-white dark:fill-custom-grey"></EditSVG>
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
                                <TrashSVG className="hover:scale-150 hover:fill-black dark:hover:fill-white dark:fill-custom-grey"></TrashSVG>
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
                                    <VisibleSVG className="hover:scale-150 hover:fill-black dark:hover:fill-white dark:fill-custom-grey"></VisibleSVG>
                                ) : (
                                    <InvisibleSVG className="hover:scale-150 hover:fill-black dark:hover:fill-white dark:fill-custom-grey"></InvisibleSVG>
                                )}
                            </Button>
                        )}
                    </div>
                    <div className="flex space-x-4 w-full">
                        <p className="font-bold">
                            {fournisseur.contact.firstName +
                                ' ' +
                                fournisseur.contact.lastName.toUpperCase()}
                        </p>
                    </div>
                </td>
            ) : (
                <>
                    <td className="p-2 align-top flex flex-row justify-between">
                        <div className="flex-row justify-evenly mb-4 hidden group-hover:flex absolute top-[25%] right-3 space-x-4">
                            {admin && (
                                <Button
                                    buttonType={ButtonType.ICON}
                                    onClick={(e) => {
                                        handleButtonClick(e);
                                        onClickEdit(fournisseur);
                                    }}
                                >
                                    <EditSVG className="hover:scale-150 hover:fill-black dark:hover:fill-white dark:fill-custom-grey"></EditSVG>
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
                                    <TrashSVG className="hover:scale-150 hover:fill-black dark:hover:fill-white dark:fill-custom-grey"></TrashSVG>
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
                                        <VisibleSVG className="hover:scale-150 hover:fill-black dark:hover:fill-white dark:fill-custom-grey"></VisibleSVG>
                                    ) : (
                                        <InvisibleSVG className="hover:scale-150 hover:fill-black dark:hover:fill-white dark:fill-custom-grey"></InvisibleSVG>
                                    )}
                                </Button>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold">
                                {fournisseur.contact.firstName +
                                    ' ' +
                                    fournisseur.contact.lastName.toUpperCase()}
                            </p>
                            <p>{fournisseur.contact.company}</p>
                        </div>

                        <div className="flex flex-row justify-end space-x-2">
                            <a
                                href={`tel:+1${fournisseur.contact.cellPhone}`}
                                onClick={(e: any) => {
                                    handleButtonClick(e);
                                }}
                            >
                                <PhoneSVG className="bg-black fill-white p-1" />
                            </a>
                            <a
                                href={`mailto:${fournisseur.contact.email}`}
                                className="text-blue-500 underline"
                                onClick={(e: any) => {
                                    handleButtonClick(e);
                                }}
                            >
                                <EmailSVG className="bg-black fill-white p-1" />
                            </a>
                            <a
                                href={fournisseur.contact.linkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e: any) => {
                                    handleButtonClick(e);
                                }}
                            >
                                <LinkedInSVG className="bg-black fill-white p-1" />
                            </a>
                        </div>
                    </td>
                    {/* Expandable content */}
                    {isOpen && (
                        <td colSpan={2} className="p-2">
                            <div className="flex flex-col space-y-2">
                                <div className="flex space-x-1">
                                    <GlobeSVG className="bg-black fill-white p-1" />
                                    <div className="flex flex-wrap">
                                        {fournisseur.secteurs_geographique.map(
                                            (secteur, i) => (
                                                <span
                                                    key={`${secteur}-${i}`}
                                                    className="mr-2"
                                                >
                                                    {secteur}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    <ServiceSVG className="bg-black fill-white p-1" />
                                    <div className="flex flex-wrap">
                                        {fournisseur.services_offerts.map(
                                            (service, i) => (
                                                <span
                                                    key={`${service}-${i}`}
                                                    className="mr-2"
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
