'use client';
import React, { useState } from 'react';
import {
    ChercheurDropdownItem,
    ChercheurDropdownSection,
} from '@/components/interface/chercheur-drop-down-content';
import { AlbumDataFields } from '@/components/enums/data-types-enum';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import {
    CloseArrowSVG,
    OpenArrowSVG,
} from '@/components/component/svg-icons/svg-icons';
import { logoPalette } from '@/constants/color-palet';

// Static dropdown structure
const dropdownStructure: ChercheurDropdownSection[] = [
    {
        label: 'Profil des Entreprises Familiales',
        items: [
            {
                label: 'Année de fondation des entreprises',
                selected: false,
                graphType: GraphBoxType.DOUGHNUT,
                donnees: [AlbumDataFields.ANNEE_FONDATION],
            },
            {
                label: 'Taille des entreprises',
                selected: false,
                graphType: GraphBoxType.DOUGHNUT,
                donnees: [AlbumDataFields.TAILLE_ENTREPRISE],
            },
            {
                label: "Secteur d'activité des entreprises",
                selected: false,
                graphType: GraphBoxType.VERTICAL_BARCHART,
                donnees: [AlbumDataFields.SECTEUR_ACTIVITE],
            },
            {
                label: "Région d'opération des entreprises",
                selected: false,
                graphType: GraphBoxType.VERTICAL_BARCHART,
                donnees: [AlbumDataFields.COORDONNES_REGION],
            },
        ],
    },
    {
        label: 'Profil socio-démographique des dirrigeants',
        items: [
            {
                label: "Structure des dirigeants par groupe d'âge",
                selected: false,
                graphType: GraphBoxType.DOUGHNUT,
                donnees: [AlbumDataFields.DIRIGEANT_AGE],
            },
            {
                label: 'Position générationelle des dirrigeants',
                selected: false,
                graphType: GraphBoxType.VERTICAL_BARCHART,
                donnees: [AlbumDataFields.DIRIGEANT_GENERATION],
            },
            {
                label: 'Distribution du dirigeant de la famille propriétaire selon le sexe',
                selected: false,
                graphType: GraphBoxType.DOUGHNUT,
                donnees: [AlbumDataFields.DIRIGEANT_SEXE],
            },
            {
                label: "Niveau d'études des dirigeants",
                selected: false,
                graphType: GraphBoxType.DOUGHNUT,
                donnees: [AlbumDataFields.REPONDANT_NIVEAU_ETUDE],
            },
            {
                label: "Niveau d'études des dirigeants en fonction de leur âge",
                selected: false,
                graphType: GraphBoxType.STACKED_BARCHART,
                donnees: [
                    AlbumDataFields.REPONDANT_NIVEAU_ETUDE,
                    AlbumDataFields.DIRIGEANT_AGE,
                ],
            },
            {
                label: "Niveau d'études des dirigeants en fonction de leur génération",
                selected: false,
                graphType: GraphBoxType.STACKED_BARCHART,
                donnees: [
                    AlbumDataFields.REPONDANT_NIVEAU_ETUDE,
                    AlbumDataFields.DIRIGEANT_GENERATION,
                ],
            },
            {
                label: "Nombre d'années travaillées par les dirigeants dans l'entreprise",
                selected: false,
                graphType: GraphBoxType.DOUGHNUT,
                donnees: [AlbumDataFields.DIRIGEANT_AGE], //TODO ADD FIELD TO MAIN DATA FIELDS
            },
        ],
    },
    {
        label: 'Structure du capital',
        items: [
            {
                label: 'Nombre d’actionnaires dans l’entreprise',
                selected: false,
                graphType: GraphBoxType.HORIZONTAL_BARCHART,
                donnees: [AlbumDataFields.ACTIONNAIRES_NOMBRE], //TODO ADD FIELD
            },
            {
                label: 'Type d’actionnaires externe à la famille',
                selected: false,
                graphType: GraphBoxType.VERTICAL_BARCHART,
                donnees: [AlbumDataFields.ACTIONNAIRES_EXTERNE],
            },
            {
                label: 'Revenus annuels des entreprises familiales',
                selected: false,
                graphType: GraphBoxType.DOUGHNUT,
                donnees: [AlbumDataFields.REVENUS_RANG],
            },
            {
                label: "Répartition des femmes directrices générales en fonction des revenus d'entreprise",
                selected: false,
                graphType: GraphBoxType.STACKED_BARCHART,
                donnees: [
                    AlbumDataFields.REVENUS_RANG,
                    AlbumDataFields.DIRIGEANT_SEXE,
                ],
            },
        ],
    },
    {
        label: 'Gouvernance',
        items: [
            {
                label: 'Structure de gouvernance des entreprises familiales',
                selected: false,
                graphType: GraphBoxType.VERTICAL_BARCHART,
                donnees: [AlbumDataFields.GOUVERNANCE_STRUCTURES], //TODO ADD FIELD
            },
            {
                label: "Types de personnes qui siègent au comité consultatif ou conseil d'administration",
                selected: false,
                graphType: GraphBoxType.VERTICAL_BARCHART,
                donnees: [
                    AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_COMPOSITION,
                ], // TODO ADD FIELD
            },
        ],
    },
    {
        label: 'Succession',
        items: [
            {
                label: "Possession d'un plan de succession dans les entreprises",
                selected: false,
                graphType: GraphBoxType.DOUGHNUT,
                donnees: [AlbumDataFields.SUCCESSION_PLAN],
            },
            {
                label: "Type d'accompagnement dans le processus de succession",
                selected: false,
                graphType: GraphBoxType.VERTICAL_BARCHART,
                donnees: [AlbumDataFields.SUCCESSION_ACCOMPAGNEMENT_TYPE],
            },
        ],
    },
    {
        label: "Rôle de la femme dans l'entreprise",
        items: [
            {
                label: 'Proportion de femmes dans l’équipe de direction',
                selected: false,
                graphType: GraphBoxType.DOUGHNUT,
                donnees: [AlbumDataFields.FEMMES_DIRECTION_POURCENTAGE],
            },
            {
                label: 'Structure de gouvernance en fonction du sexe du dirigeant',
                selected: false,
                graphType: GraphBoxType.DOUBLE_HORIZONTAL_BARCHART,
                donnees: [
                    AlbumDataFields.GOUVERNANCE_STRUCTURES,
                    AlbumDataFields.DIRIGEANT_SEXE,
                ],
            },
            {
                label: 'Répartition des femmes directrices générales en fonction de la taille des entreprises',
                selected: false,
                graphType: GraphBoxType.STACKED_BARCHART,
                donnees: [
                    AlbumDataFields.FEMMES_DIRECTION_POURCENTAGE,
                    AlbumDataFields.TAILLE_ENTREPRISE,
                ],
            },
            {
                label: "Niveau d'études des dirigeants en fonction du sexe",
                selected: false,
                graphType: GraphBoxType.DOUBLE_HORIZONTAL_BARCHART,
                donnees: [
                    AlbumDataFields.REPONDANT_NIVEAU_ETUDE,
                    AlbumDataFields.DIRIGEANT_SEXE,
                ],
            },
        ],
    },
];

interface StaticDropdownProps {
    onClick?: (item: ChercheurDropdownItem) => void;
}

const StaticDropdown: React.FC<StaticDropdownProps> = ({
    onClick = (item: ChercheurDropdownItem) => {},
}) => {
    // Helper function to collect all section and subsection labels
    const collectAllLabels = (
        items: (ChercheurDropdownItem | ChercheurDropdownSection)[],
    ): string[] => {
        let labels: string[] = [];

        items.forEach((item) => {
            if ('items' in item) {
                labels.push(item.label);
                labels = labels.concat(collectAllLabels(item.items));
            }
        });

        return labels;
    };

    // Initialize all sections and subsections as expanded
    const [expandedSections, setExpandedSections] = useState<string[]>(
        collectAllLabels(dropdownStructure),
    );

    const toggleSection = (sectionLabel: string) => {
        setExpandedSections((prev) =>
            prev.includes(sectionLabel)
                ? prev.filter((label) => label !== sectionLabel)
                : [...prev, sectionLabel],
        );
    };

    const renderItems = (
        items: (ChercheurDropdownItem | ChercheurDropdownSection)[],
    ) => {
        return items.map((item, index) => {
            if ('items' in item) {
                return (
                    <div key={index}>
                        <button
                            onClick={() => toggleSection(item.label)}
                            className="flex justify-between items-center w-full text-xs font-semibold text-gray-800 dark:text-white hover:text-gray-600 hover:dark:text-logo-turquoise focus:outline-none border-b-logo-turquoise border-b-2 p-2"
                        >
                            {item.label}
                            <span className="text-gray-500">
                                {expandedSections.includes(item.label) ? (
                                    <div className="w-fit h-fit p-1">
                                        <OpenArrowSVG
                                            fill={logoPalette.logo_turquoise}
                                        ></OpenArrowSVG>
                                    </div>
                                ) : (
                                    <div className="w-fit h-fit p-1 ">
                                        <CloseArrowSVG
                                            fill={logoPalette.logo_turquoise}
                                        ></CloseArrowSVG>
                                    </div>
                                )}
                            </span>
                        </button>
                        {expandedSections.includes(item.label) && (
                            <div className="ml-4 border-l border-gray-200 pl-4 mt-2">
                                {renderItems(item.items)}
                            </div>
                        )}
                    </div>
                );
            }

            return (
                <button
                    key={index}
                    onClick={() => {
                        item.selected = !item.selected;
                        onClick(item);
                    }}
                    className={`w-full text-left py-2 text-xs font-normal text-gray-700 dark:text-gray-400 ${item.selected ? 'bg-logo-turquoise bg-opacity-20' : ''} hover:text-logo-turquoise hover:bg-opacity-50 rounded transition duration-150 ease-in-out pl-2`}
                >
                    {item.label}
                </button>
            );
        });
    };

    return (
        <div className="w-full h-full flex flex-row justify-center overflow-y-auto max-h-[100%]">
            <div className="w-full overflow-y-auto px-1 ">
                {renderItems(dropdownStructure)}
            </div>
        </div>
    );
};

export default StaticDropdown;
