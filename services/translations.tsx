import {
    AlbumDataFields,
    FournisseurDataFields,
    IndexeDataFieldsA,
    IndexeDataFieldsB,
} from '@/components/enums/data-types-enum';
import { GraphBoxType } from '@/components/enums/graph-box-enum';
import { Language } from '@/components/enums/language';
import { StudyOrigin } from '@/components/enums/data-types-enum';
import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';
import { Traductions } from '@/components/enums/language';

interface dataInformations {
    label: Traductions;
    dataLabels: Record<any, Traductions>;
}

const satisfactionChartValues = {
    3: {
        FR: 'Neutre/Sans opinion',
        EN: 'Neutral, No opinion',
    },
    5: {
        FR: 'Très important',
        EN: 'Very important',
    },
    4: {
        FR: 'Assez important',
        EN: 'Quite Important',
    },
    2: {
        FR: 'Peu important',
        EN: 'Somewhat Important',
    },
    1: {
        FR: 'Pas du tout important',
        EN: 'Unimportant',
    },
    '-97': {
        FR: 'Ne s’applique pas / Mes démarches concrètes sont déjà commencées',
        EN: 'Does not apply / My concrete actions are already underway',
    },
};

const non0oui1 = {
    0: {
        FR: 'Non',
        EN: 'No',
    },
    1: {
        FR: 'Oui',
        EN: 'Yes',
    },
};

const oui0non1 = {
    1: {
        FR: 'Non',
        EN: 'No',
    },
    0: {
        FR: 'Oui',
        EN: 'Yes',
    },
};

const oui1non2 = {
    2: {
        FR: 'Non',
        EN: 'No',
    },
    1: {
        FR: 'Oui',
        EN: 'Yes',
    },
};

const keyValuePairs: [string, dataInformations][] = [
    [
        AlbumDataFields.ANNEE_FONDATION,
        {
            label: { FR: 'Année Fondation', EN: 'Foundation Year' },
            dataLabels: {
                'avant 1900': {
                    FR: 'avant 1900',
                    EN: 'before 1900',
                },
                '1900 a 1960': {
                    FR: '1900 à 1960',
                    EN: '1900 to 1960',
                },
                '1961 a 1970': {
                    FR: '1961 à 1970',
                    EN: '1961 to 1970',
                },
                '1971 a 1980': {
                    FR: '1971 à 1980',
                    EN: '1971 to 1980',
                },
                '1981 a 1990': {
                    FR: '1981 à 1990',
                    EN: '1981 to 1990',
                },
                '1991 a 2000': {
                    FR: '1991 à 2000',
                    EN: '1991 to 2000',
                },
                '2001 a 2010': {
                    FR: '2001 à 2010',
                    EN: '2001 to 2010',
                },
                'apres 2010': {
                    FR: 'après 2010',
                    EN: 'after 2010',
                },
            },
        },
    ],
    [
        AlbumDataFields.REVENUS_RANG,
        {
            label: { FR: 'Rang de Revenu', EN: 'Revenue Rank' },
            dataLabels: {
                1: { FR: 'Moins de 500 000$', EN: "Less than 500'000 $" },
                2: {
                    FR: '500 000$ à 2 500 000$',
                    EN: "500'000$ to 2'500'000$",
                },
                3: {
                    FR: '2 500 000$ à 10 000 000$',
                    EN: "2'500'000$ to 10'000'000$",
                },
                4: {
                    FR: '10 000 000$ à 100 000 000$',
                    EN: "10'000'000$ à 100'000'000$",
                },
                5: {
                    FR: 'Plus de 100 000 000$',
                    EN: "More than 100'000'000$",
                },
                9: { FR: 'Pas de réponse', EN: 'No answer' },
            },
        },
    ],
    [
        AlbumDataFields.SECTEUR_ACTIVITE,
        {
            label: { FR: "Secteur d'Activité", EN: 'Sector of Activity' },
            dataLabels: {
                1: { FR: 'Ressources Naturelles', EN: 'Natural Resources' },
                2: {
                    FR: 'Industries des Biens Transformés',
                    EN: 'Processed Goods Industries',
                },
                3: {
                    FR: 'Transformation Industriel et Minéral',
                    EN: 'Industrial and Mineral Processing',
                },
                4: {
                    FR: 'Construction et Services Connexes',
                    EN: 'Construction and Related Services',
                },
                5: {
                    FR: 'Transports et Logistique',
                    EN: 'Transport and Logistics',
                },
                6: {
                    FR: 'Services Publics et Communications',
                    EN: 'Public Services and Communications',
                },
                7: { FR: 'Commerce de Gros', EN: 'Wholesale Trade' },
                8: { FR: 'Commerce de Détail', EN: 'Retail Trade' },
                9: {
                    FR: 'Intermédiaires Financiers',
                    EN: 'Financial Intermediaries',
                },
                10: {
                    FR: 'Immobilier et Services Connexes',
                    EN: 'Real Estate and Related Services',
                },
                11: {
                    FR: 'Services aux Entreprises et Administratifs',
                    EN: 'Business and Administrative Services',
                },
                12: {
                    FR: 'Education et Service de Santé',
                    EN: 'Education and Health Services',
                },
                13: {
                    FR: 'Divertissement, Services Personnels & Autres',
                    EN: 'Entertainment, Personal Services & Others',
                },
                14: { FR: 'quatorze', EN: 'fourteen' },
                15: { FR: 'quize', EN: 'fifteen' },
                16: { FR: 'seize', EN: 'sixteen' },
                17: { FR: 'dix-sept', EN: 'seventeen' },
                18: { FR: 'dix-huit', EN: 'eighteen' },
                19: { FR: 'dix-neuf', EN: 'nineteen' },
            },
        },
    ],
    [
        AlbumDataFields.FEMMES_DIRECTION_POURCENTAGE,
        {
            label: {
                FR: 'Pourcentage de Femmes à la direction',
                EN: 'Percentage of Women in Leadership',
            },
            dataLabels: {
                '- de 10%': { FR: 'moins de 10%', EN: 'less than 10%' },
                '10% a 24%': { FR: '10% à 24%', EN: '10% to 24%' },
                '25% a 49%': { FR: '25% à 49%', EN: '25% to 49%' },
                '50% a 75%': { FR: '50% à 75%', EN: '50% to 75%' },
                '+ de 75%': { FR: 'plus de 75%', EN: 'More than 75%' },
            },
        },
    ],
    [
        AlbumDataFields.TAILLE_ENTREPRISE,
        {
            label: { FR: "Taille de l'Entreprise", EN: 'Company Size' },
            dataLabels: {
                'tres petite': { FR: 'très petite', EN: 'very small' },
                petite: { FR: 'petite', EN: 'small' },
                moyenne: { FR: 'moyenne', EN: 'medium' },
                grande: { FR: 'grande', EN: 'large' },
                'tres grande': { FR: 'très grande', EN: 'very large' },
            },
        },
    ],
    [
        AlbumDataFields.CONTINUITE_FAMILIALE,
        {
            label: { FR: 'Continuité Familiale', EN: 'Family Continuity' },
            dataLabels: {
                true: { FR: 'Oui', EN: 'Yes' },
                false: { FR: 'Non', EN: 'No' },
            },
        },
    ],

    [
        AlbumDataFields.REPONDANT_SEXE,
        {
            label: { FR: 'Sexe du Répondant', EN: 'Respondent Gender' },
            dataLabels: {
                homme: { FR: 'homme', EN: 'Man' },
                femme: { FR: 'femme', EN: 'woman' },
            },
        },
    ],
    [
        AlbumDataFields.REPONDANT_NIVEAU_ETUDE,
        {
            label: {
                FR: "Niveau d'Étude du Répondant",
                EN: 'Respondent Education Level',
            },
            dataLabels: {
                1: { FR: 'Secondaire', EN: 'Secondary' },
                2: {
                    FR: "Certificat d'apprenti",
                    EN: 'Apprentice Certificate',
                },
                3: {
                    FR: "Certificat d'un college",
                    EN: 'College Certificate',
                },
                4: {
                    FR: 'Certificat universitaire inferieur',
                    EN: 'Lower University Certificate',
                },
                5: { FR: 'Baccalauréat', EN: 'Bachelors degree' },
                6: { FR: 'Études superieures', EN: "Graduate's degree" },
                7: { FR: 'Autre', EN: 'Other' },
                8: { FR: 'Aucun', EN: 'None' },
            },
        },
    ],
    [
        AlbumDataFields.REPONDANT_NIVEAU_SANTE,
        {
            label: {
                FR: 'Niveau de Santé du Répondant',
                EN: 'Respondent Health Level',
            },
            dataLabels: {
                excellente: { FR: 'Excellente', EN: 'Excellent' },
                'tres bonne': { FR: 'Très bonne', EN: 'Very good' },
                bonne: { FR: 'Bonne', EN: 'Good' },
                'assez bonne': { FR: 'Assez bonne', EN: 'Quite good' },
                'pas tres bonne': { FR: 'Pas très bonne', EN: 'Not very good' },
            },
        },
    ],
    [
        AlbumDataFields.REPONDANT_POSTE,
        {
            label: { FR: 'Poste du Répondant', EN: 'Respondent Position' },
            dataLabels: {
                "president du conseil d'administration": {
                    FR: "Président du conseil d'administration",
                    EN: 'President of the board of directors',
                },
                employe: { FR: 'Employé', EN: 'Employee' },
                'equipe de direction': {
                    FR: 'Équipe de direction',
                    EN: 'Management team',
                },
                autre: { FR: 'Autre', EN: 'Other' },
                dirigeant: { FR: 'Dirigeant', EN: 'Leader' },
            },
        },
    ],
    [
        AlbumDataFields.REPONDANT_MEMBRE_FAMILLE,
        {
            label: {
                FR: 'Position du Répondant par rapport à la Famille',
                EN: "Respondent's Family Position",
            },
            dataLabels: {
                '1ere generation': {
                    FR: '1ère génération',
                    EN: '1st generation',
                },
                '2eme generation': {
                    FR: '2ème génération',
                    EN: '2nd generation',
                },
                '3eme generation': {
                    FR: '3ème génération',
                    EN: '3rn generation',
                },
                '4eme generation ou +': {
                    FR: '4ième génération ou plus',
                    EN: '4rth generation or more',
                },
                'Pas membre de la famille': {
                    FR: 'Pas memebre de la famille',
                    EN: 'Not a family member',
                },
            },
        },
    ],
    [
        AlbumDataFields.REPONDANT_ANNEE_TRAVAILLEES,
        {
            label: {
                FR: "Années Travaillées au Sein de l'Entreprise par le Répondant",
                EN: 'Years Worked in the Company by the Respondent',
            },
            dataLabels: {
                '0 a 9 ans': { FR: '0 à 9 ans', EN: '0 to 9 years' },
                '10 a 19 ans': { FR: '10 à 19 ans', EN: '10 to 19 years' },
                '20 a 29 ans': { FR: '20 à 29 ans', EN: '20 to 29 years' },
                '30 a 39 ans': { FR: '30 à 39 ans', EN: '30 to 39 years' },
                '40 ans ou plus': {
                    FR: '40 ans ou plus',
                    EN: '40 years or more',
                },
            },
        },
    ],
    [
        AlbumDataFields.REPONDANT_ANNEE_NAISSANCE,
        {
            label: {
                FR: 'Année de Naissance du Répondant',
                EN: 'Respondent Year of Birth',
            },
            dataLabels: {
                'avant 1960': { FR: 'Avant 1960', EN: 'Before 1960' },
                '1961 a 1970': { FR: '1961 à 1970', EN: '1961 to 1970' },
                '1971 a 1980': { FR: '1971 à 1980', EN: '1971 to 1980' },
                '1981 a 1990': { FR: '1981 à 1990', EN: '1981 to 1990' },
                '1991 a 2000': { FR: '1991 à 2000', EN: '1991 to 2000' },
                '2001 a 2010': { FR: '2001 à 2010', EN: '2001 to 2010' },
                'apres 2010': { FR: 'Après 2010', EN: 'After 2010' },
            },
        },
    ],

    [
        AlbumDataFields.IMPORT_POURCENTAGE,
        {
            label: { FR: "Pourcentage d'Imports", EN: 'Percentage of Imports' },
            dataLabels: {
                jamais: { FR: 'Jamais', EN: 'Never' },
                '- de 10%': { FR: 'Moins de 10%', EN: 'Less than 10%' },
                '~30%': { FR: 'Environ 30%', EN: 'Around 30%' },
                '~50%': { FR: 'Environ 50%', EN: 'Around 50%' },
                '~70%': { FR: 'Environ 70%', EN: 'Around 70%' },
                '~90%': { FR: 'Environ 90%', EN: 'Around 90%' },
                'non indique': { FR: 'Non indiqué', EN: 'Not indicated' },
            },
        },
    ],
    [
        AlbumDataFields.IMPORT_MARCHES,
        {
            label: { FR: "Marchés d'Import", EN: 'Import Markets' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
                'non indique': { FR: 'Non indiqué', EN: 'Not indicated' },
            },
        },
    ],
    [
        AlbumDataFields.IMPORT_PRINCIPAL,
        {
            label: { FR: 'Import Principal', EN: 'Main Import' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
            },
        },
    ],
    [
        AlbumDataFields.IMPORT_MARGINAL,
        {
            label: { FR: 'Import Marginal', EN: 'Marginal Import' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
            },
        },
    ],

    [
        AlbumDataFields.EXPORT_POURCENTAGE,
        {
            label: { FR: "Pourcentage d'Export", EN: 'Percentage of Exports' },
            dataLabels: {
                jamais: { FR: 'Jamais', EN: 'Never' },
                '- de 10%': { FR: 'Moins de 10%', EN: 'Less than 10%' },
                '~30%': { FR: 'Environ 30%', EN: 'Around 30%' },
                '~50%': { FR: 'Environ 50%', EN: 'Around 50%' },
                '~70%': { FR: 'Environ 70%', EN: 'Around 70%' },
                '~90%': { FR: 'Environ 90%', EN: 'Around 90%' },
                'non indique': { FR: 'Non indiqué', EN: 'Not indicated' },
            },
        },
    ],
    [
        AlbumDataFields.EXPORT_MARCHES,
        {
            label: { FR: "Marchés d'Export", EN: 'Export Markets' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
                'non indique': { FR: 'Non indiqué', EN: 'Not indicated' },
            },
        },
    ],
    [
        AlbumDataFields.EXPORT_PRINCIPAL,
        {
            label: { FR: 'Export Principal', EN: 'Main Export' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
            },
        },
    ],
    [
        AlbumDataFields.EXPORT_MARGINAL,
        {
            label: { FR: 'Export Marginal', EN: 'Marginal Export' },
            dataLabels: {
                afrique: { FR: 'Afrique', EN: 'Africa' },
                'amerique centrale & sud': {
                    FR: 'Amérique centrale et sud',
                    EN: 'South and central america',
                },
                'amerique du nord': {
                    FR: 'Amérique du nord',
                    EN: 'North America',
                },
                asie: { FR: 'Asie', EN: 'Asia' },
                europe: { FR: 'Europe', EN: 'Europe' },
                oceanie: { FR: 'Océanie', EN: 'Oceania' },
            },
        },
    ],

    [
        AlbumDataFields.ACTIONNAIRES_MAJORITAIRE,
        {
            label: {
                FR: 'Actionnaires Majoritaires',
                EN: 'Majority Shareholders',
            },
            dataLabels: {
                '1ere generation': {
                    FR: '1ère génération',
                    EN: '1st generation',
                },
                '2eme generation': {
                    FR: '2ème génération',
                    EN: '2nd generation',
                },
                '3eme generation': {
                    FR: '3ème génération',
                    EN: '3rd generation',
                },
                '4eme generation ou plus': {
                    FR: '4ième génération ou plus',
                    EN: '4rth generation or more',
                },
            },
        },
    ],
    [
        AlbumDataFields.ACTIONNAIRES_NOMBRE,
        {
            label: {
                FR: "Nombre d'Actionnaires",
                EN: 'Number of Shareholders',
            },
            dataLabels: {
                '0': { FR: '0 Actionnaires', EN: '0 Shareholders' },
                '1': { FR: '1 Actionnaire', EN: '1 Shareholder' },
                '2': { FR: '2 Actionnaires', EN: '2 Shareholders' },
                '3': { FR: '3 Actionnaires', EN: '3 Shareholders' },
                '4': { FR: '4 Actionnaires', EN: '4 Shareholders' },
                '5+': {
                    FR: '5 Actionnaires et plus',
                    EN: '5 Shareholders or more',
                },
            },
        },
    ],
    [
        AlbumDataFields.ACTIONNAIRES_EXTERNE,
        {
            label: { FR: 'Actionnaires Externes', EN: 'External Shareholders' },
            dataLabels: {
                true: {
                    FR: 'A des actionnnaires externes',
                    EN: 'Has external shareholders',
                },
                false: {
                    FR: "N'a pas d'actionnaires externes",
                    EN: 'Does not have external shareholders',
                },
            },
        },
    ],
    [
        AlbumDataFields.ACTIONNAIRES_TYPE,
        {
            label: { FR: "Type d'Actionnaires", EN: 'Type of Shareholders' },
            dataLabels: {
                employe: {
                    FR: 'Employé',
                    EN: 'Employee',
                },
                'fonds d’investissement': {
                    FR: "Fonds d'investissement",
                    EN: 'Investment fund',
                },
                'ami proche de la famille': {
                    FR: 'Ami proche de la famille',
                    EN: 'Close family friend',
                },
                banque: {
                    FR: 'Banque',
                    EN: 'Bank',
                },
                autre: {
                    FR: 'Autre',
                    EN: 'Other',
                },
                investisseur: {
                    FR: 'Investisseur',
                    EN: 'Investor',
                },
                'personne physique externe a la famille': {
                    FR: 'Personne physique externe à la famille',
                    EN: 'Individual external to the family',
                },
                'autre entreprise': {
                    FR: 'Autre entreprise',
                    EN: 'Another company',
                },
                'ange investisseur': {
                    FR: 'Ange investisseur',
                    EN: 'Angel investor',
                },
                'membre de la famille qui ne travaille pas dans l’entreprise': {
                    FR: "Membre de la famille qui ne travaille pas dans l'entreprise",
                    EN: 'Family member not working in the company',
                },
                'investisseur, personne physique externe a la famille': {
                    FR: 'Investisseur, personne physique externe à la famille',
                    EN: 'Investor, individual external to the family',
                },
                'investisseur de risque': {
                    FR: 'Investisseur de risque',
                    EN: 'Venture capitalist',
                },
            },
        },
    ],

    [
        AlbumDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_POSSEDE,
        {
            label: {
                FR: 'Autres Entreprises Familiales Possédées',
                EN: 'Other Family-Owned Businesses',
            },
            dataLabels: {
                true: {
                    FR: "Possèdent d'autres entreprises familiales",
                    EN: 'Has other familial businesses',
                },
                false: {
                    FR: "Ne possèdent pas d'autres entreprises familiales",
                    EN: 'Does not have other familial businesses',
                },
            },
        },
    ],
    [
        AlbumDataFields.AUTRES_ENTREPRISES_FAMILLE_PROPRIETAIRE_SECTEURS,
        {
            label: {
                FR: 'Secteurs des autres Entreprises Familiales Possédées',
                EN: 'Sectors of Other Family-Owned Businesses',
            },
            dataLabels: {
                1: { FR: 'Ressources Naturelles', EN: 'Natural Resources' },
                2: {
                    FR: 'Industries des Biens Transformés',
                    EN: 'Processed Goods Industries',
                },
                3: {
                    FR: 'Transformation Industriel et Minéral',
                    EN: 'Industrial and Mineral Processing',
                },
                4: {
                    FR: 'Construction et Services Connexes',
                    EN: 'Construction and Related Services',
                },
                5: {
                    FR: 'Transports et Logistique',
                    EN: 'Transport and Logistics',
                },
                6: {
                    FR: 'Services Publics et Communications',
                    EN: 'Public Services and Communications',
                },
                7: { FR: 'Commerce de Gros', EN: 'Wholesale Trade' },
                8: { FR: 'Commerce de Détail', EN: 'Retail Trade' },
                9: {
                    FR: 'Intermédiaires Financiers',
                    EN: 'Financial Intermediaries',
                },
                10: {
                    FR: 'Immobilier et Services Connexes',
                    EN: 'Real Estate and Related Services',
                },
                11: {
                    FR: 'Services aux Entreprises et Administratifs',
                    EN: 'Business and Administrative Services',
                },
                12: {
                    FR: 'Education et Service de Santé',
                    EN: 'Education and Health Services',
                },
                13: {
                    FR: 'Divertissement, Services Personnels & Autres',
                    EN: 'Entertainment, Personal Services & Others',
                },
                14: { FR: 'quatorze', EN: 'fourteen' },
                15: { FR: 'quize', EN: 'fifteen' },
                16: { FR: 'seize', EN: 'sixteen' },
                17: { FR: 'dix-sept', EN: 'seventeen' },
                18: { FR: 'dix-huit', EN: 'eighteen' },
                19: { FR: 'dix-neuf', EN: 'nineteen' },
                96: { FR: 'Pas de secteur', EN: 'No sector' },
            },
        },
    ],
    [
        AlbumDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_POSSEDE,
        {
            label: {
                FR: "Autres Entreprises Familiales Possédées par d'autres Membres",
                EN: 'Other Family-Owned Businesses Owned by Other Members',
            },
            dataLabels: {
                true: {
                    FR: "D'autres membres de la famille possèdent des entreprises familiales",
                    EN: 'Other family members own family businesses',
                },
                false: {
                    FR: 'Les autres membres de la famille ne possèdent pas des entreprises familiales',
                    EN: 'Does not have other family businesses',
                },
            },
        },
    ],
    [
        AlbumDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_LIENS_PARENTE,
        {
            label: {
                FR: "Relation Génétiques avec les autres Propriétaires d'Entreprises dans la Famille",
                EN: 'Genetic Relations with Other Family Business Owners',
            },
            dataLabels: {
                '01': { FR: ' Grand-Père/Grand-Mère', EN: 'Grandpa/Grandma' },
                '02': { FR: 'Père/Mère', EN: 'Father/Mother' },
                '03': { FR: 'Oncle/Tante', EN: 'Uncle/Aunt' },
                '04': { FR: 'Cousin(e)', EN: 'Cousin' },
                '05': { FR: 'Frère/Sœur', EN: 'Brother/Sister' },
                '06': { FR: 'Fils/Fille', EN: 'Son/Daughter' },
                '07': { FR: ' Autre', EN: 'Other' },
                '96': { FR: 'Aucun', EN: 'None' },
            },
        },
    ],
    [
        AlbumDataFields.AUTRES_ENTREPRISES_AUTRES_MEMBRES_FAMILLE_RELATIONS_AFFAIRES,
        {
            label: {
                FR: "Relation D'Affaires avec les autres Propriétaires d'Entreprises dans la Famille",
                EN: 'Business Relations with Other Family Business Owners',
            },
            dataLabels: {
                client: { FR: 'Client', EN: 'Client' },
                investisseur: { FR: 'Investisseur', EN: 'Investor' },
                fournisseur: { FR: 'Fournisseur', EN: 'Supplier' },
                autre: { FR: 'Autre', EN: 'Other' },
            },
        },
    ],
    [
        AlbumDataFields.DIRIGEANT_GENERATION,
        {
            label: {
                FR: 'Génération Familiale du Dirigeant',
                EN: 'Family Generation of the Leader',
            },
            dataLabels: {
                '1ere generation': {
                    FR: '1ère génération',
                    EN: '1st generation',
                },
                '2eme generation': {
                    FR: '2ème génération',
                    EN: '2nd generation',
                },
                '3eme generation': {
                    FR: '3ème génération',
                    EN: '3rd generation',
                },
                '4eme generation ou +': {
                    FR: '4ième génération ou plus',
                    EN: '4rth generation or more',
                },
                'membre non-familial': {
                    FR: 'Pas memebre de la famille',
                    EN: 'Not a family member',
                },
            },
        },
    ],
    [
        AlbumDataFields.DIRIGEANT_SEXE,
        {
            label: { FR: 'Sexe du Dirigeant', EN: 'Gender of the Leader' },
            dataLabels: {
                homme: { FR: 'homme', EN: 'Man' },
                femme: { FR: 'femme', EN: 'woman' },
            },
        },
    ],
    [
        AlbumDataFields.DIRIGEANT_AGE,
        {
            label: { FR: 'Age du Dirigeant', EN: 'Age of the Leader' },
            dataLabels: {
                '18 a 24 ans': { FR: '18 à 24ans', EN: '18 to 24 years old' },
                '25 a 34 ans': { FR: '25 à 34ans', EN: '25 to 34 years old' },
                '35 a 44 ans': { FR: '35 à 44ans', EN: '35 to 44 years old' },
                '45 a 54 ans': { FR: '45 à 54ans', EN: '45 to 54 years old' },
                '55 a 64 ans': { FR: '55 à 64ans', EN: '55 to 64 years old' },
                '65 et +': { FR: '65ans et plus', EN: '65 years old and more' },
            },
        },
    ],
    [
        AlbumDataFields.DIRIGEANT_PRESIDE_CONSEIL,
        {
            label: {
                FR: 'Conseil présidé par le Dirigeant',
                EN: 'Council Led by the Leader',
            },
            dataLabels: {
                true: {
                    FR: 'Le dirigeant préside le conseil',
                    EN: 'The leader chairs the council',
                },
                false: {
                    FR: 'Le dirigeant ne préside pas le conseil',
                    EN: 'The leader doesn not chair the council',
                },
            },
        },
    ],
    [
        AlbumDataFields.GOUVERNANCE_STRUCTURES,
        {
            label: {
                FR: 'Structure de Gouvernance',
                EN: 'Gouvernance Structure',
            },
            dataLabels: {
                'assemblee d’actionnaires': {
                    FR: "Assemblée d'actionnaires",
                    EN: "Shareholders' assembly",
                },
                "conseil d'administration": {
                    FR: "Conseil d'administration",
                    EN: 'Board of Directors',
                },
                'conseil de famille': {
                    FR: 'Conseil de famille',
                    EN: 'Family Council',
                },
                'conseil aviseur (ou consultatif)': {
                    FR: 'Conseil aviseur (ou consultatif)',
                    EN: 'Advisory (or consultative) Council',
                },
                autre: { FR: 'Autre', EN: 'Other' },
                aucune: { FR: 'Aucune', EN: 'None' },
            },
        },
    ],
    [
        AlbumDataFields.GOUVERNANCE_ACCOMPAGNEMENT_PRO,
        {
            label: {
                FR: 'Acompagnement Professionnel',
                EN: 'Professional Support',
            },
            dataLabels: {
                true: {
                    FR: "La gouvernance bénéficie d'un accompagnement professionnel",
                    EN: 'Governance benefits from professional support',
                },
                false: {
                    FR: "La gouvernance ne bénéficie pas d'un accompagnement professionnel",
                    EN: 'Governance does not benefit from professional support',
                },
            },
        },
    ],
    [
        AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_COMPOSITION,
        {
            label: {
                FR: 'Composition du Conseil Consultatif',
                EN: 'Composition of the Advisory Council',
            },
            dataLabels: {
                'employe non membre de la famille en affaires': {
                    FR: 'Employé non membre de la famille',
                    EN: 'Non-family employee',
                },
                'entrepreneur externe a la famille': {
                    FR: 'Entrepreneur externe à la famille',
                    EN: 'Entrepreneur outside the family',
                },
                'membre de la famille qui travaille dans l’entreprise': {
                    FR: 'Membre de la famille qui travaille dans l’entreprise',
                    EN: 'Family member who works in the business',
                },
                'professionnel, expert externe a l’entreprise': {
                    FR: 'Professionnel, expert externe à l’entreprise',
                    EN: 'professional, expert external to the company',
                },
                'membre de la famille qui ne travaille pas dans l’entreprise': {
                    FR: 'Membre de la famille qui ne travaille pas dans l’entreprise',
                    EN: 'family member who does not work in the business',
                },
                autre: { FR: 'Autre', EN: 'Other' },
            },
        },
    ],
    [
        AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_POURCENTAGE_FEMMES,
        {
            label: {
                FR: 'Pourcentage de Femmes sur le Conseil Consultatif',
                EN: 'Percentage of Women on the Advisory Board',
            },
            dataLabels: {
                'Moins de 10%': { FR: 'Moins de 10%', EN: 'Less than 10%' },
                '10 a 25%': { FR: '10 à 25%', EN: '10 to 25%' },
                '25 a 50%': { FR: '25 à 50%', EN: '25 to 50%' },
                '50 a 75%': { FR: '50 à 75%', EN: '50 to 75%' },
                'plus de 75%': { FR: '75% et plus', EN: '75% and more' },
            },
        },
    ],
    [
        AlbumDataFields.GOUVERNANCE_CONSEIL_CONSULTATIF_RINCIPALES_ACTIVITES,
        {
            label: {
                FR: 'Principales Responsabilités du Conseil Consultatif',
                EN: 'Key Responsibilities of the Advisory Board',
            },
            dataLabels: {
                'approuver les orientations strategiques, le plan d’affaires et les budgets qui en decoulent, en assurant que la direction y donne suite':
                    {
                        FR: 'Approuver les orientations strategiques, le plan d’affaires et les budgets qui en découlent, en assurant que la direction y donne suite',
                        EN: 'Approve the strategic orientations, the business plan and the resulting budgets, ensuring that management follows up on them',
                    },
                'approuver les reglements generaux': {
                    FR: 'Approuver les règlements généraux',
                    EN: 'Approve general regulations',
                },
                'assurer la mise en place d’un systeme integre de gestion des risques':
                    {
                        FR: 'Assurer la mise en place d’un systeme intégré de gestion des risques',
                        EN: 'Ensure the implementation of an integrated risk management system',
                    },
                'assurer que la gestion de l’entreprise est effectuee avec efficacite et efficience':
                    {
                        FR: 'Assurer que la gestion de l’entreprise est effectuée avec efficacité et éfficience',
                        EN: 'Ensure that the management of the business is carried out effectively and efficiently',
                    },
                'determiner la remuneration des hauts dirigeants et les criteres d’evaluation de leur performance':
                    {
                        FR: 'Determiner la rémuneration des hauts dirigeants et les critères d’évaluation de leur performance',
                        EN: 'Determine the remuneration of senior executives and the criteria for evaluating their performance',
                    },
                'faire un suivi du processus de releve': {
                    FR: 'Faire un suivi du processus de relève',
                    EN: 'Follow up on the succession process',
                },
                'surveiller l’integrite financiere : assurer la qualite de l’information financiere et des mecanismes de divulgation, approuver les etats financiers et attester de leur fiabilite, assurer l’efficacite du controle interne':
                    {
                        FR: 'Surveiller l’intégrité financière : assurer la qualité de l’information financière et des mécanismes de divulgation, approuver les états financiers et attester de leur fiabilité, assurer l’efficacité du controle interne',
                        EN: 'Monitor financial integrity: ensure the quality of financial information and disclosure mechanisms, approve financial statements and certify their reliability, ensure the effectiveness of internal control',
                    },
                'faire rapport aux actionnaires sur la performance de l’entreprise':
                    {
                        FR: 'Faire rapport aux actionnaires sur la performance de l’entreprise',
                        EN: 'Report to shareholders on company performance',
                    },
                'elire et pourvoir a la nomination du president et des membres du conseil, du president de l’entreprise ainsi que des autres hauts dirigeants, determiner leurs responsabilites et la portee de leur autorite':
                    {
                        FR: 'Élire et pourvoir a la nomination du président et des membres du conseil, du président de l’entreprise ainsi que des autres hauts dirigeants, déterminer leurs responsabilités et la portée de leur autorité',
                        EN: 'Elect and provide for the appointment of the president and members of the board, the president of the company as well as other senior managers, determine their responsibilities and the scope of their authority',
                    },
                autre: { FR: 'Autre', EN: 'Other' },
            },
        },
    ],
    [
        AlbumDataFields.GESTION_FAMILIALE_MULTIPLES_FAMILLES,
        {
            label: {
                FR: "Présence de Multiples Familles dans l'Équipe de Gouvernance",
                EN: 'Presence of Multiple Families in the Governance Team',
            },
            dataLabels: {
                true: {
                    FR: "Présence de multiples familles dans l'équipe de gouvernance",
                    EN: 'Presence of multiple families in the governance team',
                },
                false: {
                    FR: "Présence d'une seule famille dans l'équipe de gouvernance",
                    EN: 'Presence of only one family in the governance team',
                },
            },
        },
    ],
    [
        AlbumDataFields.GESTION_FAMILIALE_GENERATIONS_IMPLIQUEES,
        {
            label: {
                FR: 'Générations Impliquées dans la Gestion Familiale',
                EN: 'Generations Involved in Family Management',
            },
            dataLabels: {
                '1ere': {
                    FR: '1ère génération',
                    EN: '1st generation',
                },
                '2eme': {
                    FR: '2ème génération',
                    EN: '2nd generation',
                },
                '3eme': {
                    FR: '3ème génération',
                    EN: '3rn generation',
                },
                '4eme ou +': {
                    FR: '4ième génération ou plus',
                    EN: '4rth generation or more',
                },
                'membre non-familial': {
                    FR: 'Pas memebre de la famille',
                    EN: 'Not a family member',
                },
            },
        },
    ],
    [
        AlbumDataFields.GESTION_FAMILIALE_PROTOCOLE_FAMILIAL,
        {
            label: {
                FR: 'Protocole Familial Établi',
                EN: 'Established Family Protocol',
            },
            dataLabels: {
                aucun: { FR: 'Aucun', EN: 'None' },
                'formel et explicite': {
                    FR: 'Formel et Explicite',
                    EN: 'Formal and Explicite',
                },
                informel: { FR: 'Informel', EN: 'Informal' },
            },
        },
    ],
    [
        AlbumDataFields.GESTION_FAMILIALE_POLITIQUES_FAMILIALES,
        {
            label: {
                FR: 'Politiques Familiales Établies',
                EN: 'Established Family Policies',
            },
            dataLabels: {
                'dans la convention d’actionnaires': {
                    FR: 'Informel',
                    EN: 'Informal',
                },
                'document informel': {
                    FR: 'Document informel',
                    EN: 'Informal document',
                },
                'protocole ou charte': {
                    FR: 'Protocole ou charte',
                    EN: 'Protocol or chart',
                },
                'politiques implicites': {
                    FR: 'Politiques implicite',
                    EN: 'Implicite policies',
                },
                'politiques prevues au manuel de l’employe': {
                    FR: 'Politiques prévues au manuel de l’employé',
                    EN: 'Policies provided for in the employee handbook',
                },
                autre: { FR: 'Autre', EN: 'Other' },
                aucune: { FR: 'Aucune', EN: 'None' },
            },
        },
    ],
    [
        AlbumDataFields.COORDONNES_REGION,
        {
            label: { FR: 'Régions', EN: 'Regions' },
            dataLabels: {
                'Abitibi-Temiscamingue': {
                    FR: 'Abitibi-Témiscamingue',
                    EN: 'Abitibi-Témiscamingue',
                },
                'Bas-Saint-Laurent': {
                    FR: 'Bas-Saint-Laurent',
                    EN: 'Bas-Saint-Laurent',
                },
                'Saguenay–Lac-Saint-Jean': {
                    FR: 'Saguenay–Lac-Saint-Jean',
                    EN: 'Saguenay–Lac-Saint-Jean',
                },
                'Capitale-Nationale': {
                    FR: 'Capitale-Nationale',
                    EN: 'Capitale-Nationale',
                },
                Mauricie: { FR: 'Mauricie', EN: 'Mauricie' },
                Estrie: { FR: 'Estrie', EN: 'Estrie' },
                Montreal: { FR: 'Montréal', EN: 'Montréal' },
                Outaouais: { FR: 'Outaouais', EN: 'Outaouais' },
                'Cote-Nord': { FR: 'Côte-Nord', EN: 'Côte-Nord' },
                'Nord-du-Quebec': {
                    FR: 'Nord-du-Québec',
                    EN: 'Nord-du-Québec',
                },
                'Gaspesie–Îles-de-la-Madeleine': {
                    FR: 'Gaspésie–Îles-de-la-Madeleine',
                    EN: 'Gaspésie–Îles-de-la-Madeleine',
                },
                'Chaudiere-Appalaches': {
                    FR: 'Chaudière-Appalaches',
                    EN: 'Chaudière-Appalaches',
                },
                Laval: { FR: 'Laval', EN: 'Laval' },
                Lanaudiere: { FR: 'Lanaudière', EN: 'Lanaudière' },
                Laurentides: { FR: 'Laurentides', EN: 'Laurentides' },
                Monteregie: { FR: 'Montérégie', EN: 'Montérégie' },
                'Centre-du-Quebec': {
                    FR: 'Centre-du-Québec',
                    EN: 'Centre-du-Québec',
                },
            },
        },
    ],
    [
        AlbumDataFields.SUCCESSION_PLAN,
        {
            label: { FR: 'Plan de Succession', EN: 'Succession Plan' },
            dataLabels: {
                'N/A': { FR: 'Non applicable', EN: 'Not applicable' },
                'Plan inexistant': {
                    FR: 'Plan inexistant',
                    EN: 'Inexistant plan',
                },
                'Plan informel': { FR: 'Plan informel', EN: 'Informal plan' },
                'Plan formel': { FR: 'Plan formel', EN: 'Formal plan' },
            },
        },
    ],
    [
        AlbumDataFields.SUCCESSION_ACCOMPAGNEMENT_PRO,
        {
            label: {
                FR: 'Accompagnement Professionnel pour la Succession',
                EN: 'Professional Support for Succession',
            },
            dataLabels: {
                true: {
                    FR: 'Accompagnement professionel pendant la succession',
                    EN: 'Professional support during succession',
                },
                false: {
                    FR: 'Aucun accompagnement professionel pendant la succession',
                    EN: 'No professional support during succession',
                },
            },
        },
    ],
    [
        AlbumDataFields.SUCCESSION_ACCOMPAGNEMENT_TYPE,
        {
            label: {
                FR: "Type d'Accompagnement pour la Succession",
                EN: 'Type of Support for Succession',
            },
            dataLabels: {
                '01': { FR: 'Comptable', EN: 'Acountant' },
                '02': { FR: 'Fiscaliste', EN: 'Tax expert' },
                '03': { FR: 'Coach', EN: 'Coach' },
                '04': { FR: 'Menteur', EN: 'Mentor' },
                '05': {
                    FR: 'Professionnel en relève d’entreprises',
                    EN: 'Business succession professional',
                },
                '06': { FR: 'Avocat', EN: 'Lawyer' },
                '07': { FR: 'Analyste financier', EN: 'Financial Analyst' },
                '08': { FR: 'Autre', EN: 'Other' },
                '96': { FR: 'Aucun acompagnement', EN: 'No support' },
            },
        },
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_CONTROLE_INFLUENCE,
        {
            label: {
                FR: "Questionnaire sur le Contrôle d'Influence",
                EN: 'Influence Control Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_LIENS_SOCIAUX,
        {
            label: {
                FR: 'Questionnaire sur les Liens Sociaux',
                EN: 'Social Connections Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_IDENTIFICATION_INFLUENCE,
        {
            label: {
                FR: "Questionnaire sur l'Identification d'Influence",
                EN: 'Influence Identification Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_ASPECTS_EMOTIONNELS,
        {
            label: {
                FR: 'Questionnaire sur les Aspects Émotionnels',
                EN: 'Emotional Aspects Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_SUCCESION,
        {
            label: {
                FR: 'Questionnaire sur la Succession',
                EN: 'Succession Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_CONSCIENCE_ENV_RECRUTEMENT,
        {
            label: {
                FR: 'Questionnaire sur la Consicence Environnementale lors du Recrutement',
                EN: 'Environmental Awareness in Recruitment Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_FORMATION_ENV,
        {
            label: {
                FR: 'Questionnaire sur la Formation Environnementale',
                EN: 'Environmental Training Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_DEVELOPPEMENT_ENV,
        {
            label: {
                FR: 'Questionnaire sur le Développement Environnementale',
                EN: 'Environmental Development Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_REDISTRIBUTION_ENV,
        {
            label: {
                FR: 'Questionnaire sur la Redistribution Environnementale',
                EN: 'Environmental Redistribution Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        AlbumDataFields.QUESTIONNAIRE_PARTICIPATION_ENV,
        {
            label: {
                FR: 'Questionnaire sur la Participation Environnementale',
                EN: 'Environmental Participation Questionnaire',
            },
            dataLabels: {
                1: { FR: '1', EN: '1' },
                2: { FR: '2', EN: '2' },
                3: { FR: '3', EN: '3' },
                4: { FR: '4', EN: '4' },
                5: { FR: '5', EN: '5' },
                6: { FR: '6', EN: '6' },
            },
        },
    ],
    [
        AlbumDataFields.CREE_OU_REPRISE,
        {
            label: {
                FR: 'Entreprise Crée ou Reprise',
                EN: 'Business Created or Takenover',
            },
            dataLabels: {
                1: {
                    FR: "L'entreprise a été créée",
                    EN: 'The company was created',
                },
                2: {
                    FR: "L'entreprise a été reprise",
                    EN: 'The company was taken over',
                },
            },
        },
    ],
    [
        AlbumDataFields.TEMPS_NOUVELLE_ENTREPRISE,
        {
            label: {
                FR: 'Temps pour créer une nouvelle entreprise',
                EN: 'Time to start a new business?',
            },
            dataLabels: {
                0: {
                    FR: 'Le répondant aurait le temps',
                    EN: 'The respondent would have time',
                },
                1: {
                    FR: "Le répondant n'aurait pas le temps",
                    EN: 'The respondent would not have time',
                },
            },
        },
    ],
    [
        AlbumDataFields.BENEVOLAT,
        {
            label: {
                FR: 'Bénévolat/activités caritatives',
                EN: 'Volunteering/charity work',
            },
            dataLabels: {
                0: {
                    FR: 'Le répondant aurait le temps',
                    EN: 'The respondent would have time',
                },
                1: {
                    FR: "Le répondant n'aurait pas le temps",
                    EN: 'The respondent would not have time',
                },
            },
        },
    ],
    [
        AlbumDataFields.ROLE_INFORMEL,
        {
            label: {
                FR: 'Rôle informel aprèes vente',
                EN: 'informal role after sales',
            },
            dataLabels: {
                0: {
                    FR: 'Le répondant souhaite un rôle informel',
                    EN: 'The respondent would like an informal role',
                },
                1: {
                    FR: 'Le répondant ne souhaite pas avoir un rôle informel',
                    EN: 'The respondent would not like to have an informal role',
                },
            },
        },
    ],
    [
        AlbumDataFields.APRES_VENTE,
        {
            label: {
                FR: "Suivi de l'évolution après vente",
                EN: 'Follow the growth after sale',
            },
            dataLabels: {
                0: {
                    FR: "Le répondant souhaite suivre l'évolution de son entreprise après sa vente / tranfert",
                    EN: 'The respondent would like to keep track of their company after sale / tranfert',
                },
                1: {
                    FR: "Le répondant ne souhaite pas suivre l'évolution de son entreprise après sa vente / tranfert",
                    EN: 'The respondent would not like to keep track of their company after sale / tranfert',
                },
            },
        },
    ],

    [
        AlbumDataFields.NOMBRE_EMPLOYE,
        {
            label: {
                FR: "Nombre d'employés",
                EN: 'Number of employees',
            },
            dataLabels: {
                '1 à 5': {
                    FR: '1 à 5',
                    EN: '1 to 5',
                },
                aucun: {
                    FR: 'aucun',
                    EN: 'none',
                },

                '11 à 25': {
                    FR: '11 à 25',
                    EN: '11 to 25',
                },
                Aucun: {
                    FR: 'aucun',
                    EN: 'none',
                },
                '100 à 249': {
                    FR: '100 à 249',
                    EN: '100 to 249',
                },
                '500 a 749': {
                    FR: '500 à 749',
                    EN: '500 to 749',
                },
                inconnu: {
                    FR: 'inconnu',
                    EN: 'unknown',
                },
                AUCUN: {
                    FR: 'aucun',
                    EN: 'none',
                },
                '750 a 999': {
                    FR: '750 à 999',
                    EN: '750 to 999',
                },
                '6 à 10': {
                    FR: '6 à 10',
                    EN: '6 to 10',
                },
                '26 à 49': {
                    FR: '26 à 49',
                    EN: '26 to 49',
                },
                '250 a 499': {
                    FR: '250 à 499',
                    EN: '250 to 499',
                },
                '50 à 99': {
                    FR: '50 à 99',
                    EN: '50 to 99',
                },
                '1000 a 2499': {
                    FR: '1000 à 2499',
                    EN: '1000 to 2499',
                },
                '2500 a 4999': {
                    FR: '2500 à 4999',
                    EN: '2500 to 4999',
                },
            },
        },
    ],

    [
        IndexeDataFieldsB.GENRE,
        {
            label: {
                FR: 'Identité de genre',
                EN: 'Gender identity',
            },
            dataLabels: {
                1: {
                    FR: 'Masculin',
                    EN: 'Man',
                },
                2: {
                    FR: 'Féminin',
                    EN: 'Woman',
                },
                99: {
                    FR: 'Autre identité de genre',
                    EN: 'Other gender identity',
                },
            },
        },
    ],

    [
        IndexeDataFieldsB.AGE,
        {
            label: {
                FR: 'Âge des entrepreneurs',
                EN: 'Age of the entrepreneurs',
            },
            dataLabels: {
                0: {
                    FR: 'Moins de 18 ans',
                    EN: 'Younger than 18 years old',
                },
                1: {
                    FR: 'Entre 18 et 19 ans',
                    EN: 'Between 18 and 19 years old',
                },
                2: {
                    FR: 'Entre 20 et 24 ans',
                    EN: 'Between 20 and 24 years old',
                },
                3: {
                    FR: 'Entre 25 et 29 ans',
                    EN: 'Betweem 25 and 29 years old',
                },
                4: {
                    FR: 'Entre 30 et 34 ans',
                    EN: 'Betweem 30 and 34 years old',
                },
                5: {
                    FR: 'Entre 35 et 39 ans',
                    EN: 'Betweem 35 and 39 years old',
                },
                6: {
                    FR: 'Entre 40 et 44 ans',
                    EN: 'Betweem 40 and 44 years old',
                },
                7: {
                    FR: 'Entre 44 et 49 ans',
                    EN: 'Betweem 44 and 49 years old',
                },
                8: {
                    FR: 'Entre 50 et 54 ans',
                    EN: 'Betweem 50 and 54 years old',
                },
                9: {
                    FR: 'Entre 55 et 59 ans',
                    EN: 'Betweem 55 and 59 years old',
                },
                10: {
                    FR: 'Entre 60 et 64 ans',
                    EN: 'Betweem 60 and 64 years old',
                },
                11: {
                    FR: 'Entre 65 et 69 ans',
                    EN: 'Betweem 65 and 69 years old',
                },
                12: {
                    FR: 'Entre 70 et 74 ans',
                    EN: 'Betweem 70 and 74 years old',
                },
                13: {
                    FR: '75 ans et plus',
                    EN: '75 years or older',
                },
                99: {
                    FR: 'Pas de réponses',
                    EN: 'No answer',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.AGER,
        {
            label: {
                FR: 'Âge des entrepreneurs',
                EN: 'Age of entrepreneurs',
            },
            dataLabels: {
                1: {
                    FR: '18 à 34 ans',
                    EN: '18 to 34 years old',
                },
                2: {
                    FR: '35 et 49 ans',
                    EN: '35 to 49 years old',
                },
                3: {
                    FR: '50 à 64 ans',
                    EN: '50 to 64 years old',
                },
                4: {
                    FR: '65 ans et plus',
                    EN: '65 years and older',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QZ13,
        {
            label: {
                FR: 'Dernier niveau de scolarité complété',
                EN: 'Last degree obtained',
            },
            dataLabels: {
                1: {
                    FR: 'Primaire ou moins',
                    EN: 'Primary school or less',
                },
                2: {
                    FR: 'Secondaire - DES de formation générale',
                    EN: 'Highschool, DES of general training',
                },
                3: {
                    FR: 'Secondaire - DEP de formation professionnelle',
                    EN: 'Highschool - DEP of professionnal training',
                },
                4: {
                    FR: 'Collégial (DEC de formation pré-universitaire, de formation technique, certificats (CEP), attestations (AEC) ou diplômé',
                    EN: 'Collegial (pre-university, technical training, certificate (CEP), attestation (AEC) or graduate',
                },
                5: {
                    FR: 'Universitaire certificats et diplômes',
                    EN: 'University, certificate or diplôma',
                },
                6: {
                    FR: 'Universitaire 1er cycle Baccalauréat (incluant cours classique)',
                    EN: 'University, Bachelors',
                },
                7: {
                    FR: 'Universitaire 2ième cycle Maîtrise',
                    EN: 'University, Masters',
                },
                8: {
                    FR: 'Universitaire 3ième cycle Doctorat',
                    EN: 'University, Doctorat',
                },
                9: {
                    FR: 'Je préfère ne pas répondre',
                    EN: 'No answer',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.Q0QC,
        {
            label: {
                FR: 'Région de domicile au Québec',
                EN: 'Region of residence in Quebec',
            },
            dataLabels: {
                1: {
                    FR: 'Bas-Saint-Laurent',
                    EN: 'Bas-Saint-Laurent',
                },
                2: {
                    FR: 'Saguenay-Lac-Saint-Jean',
                    EN: 'Saguenay-Lac-Saint-Jean',
                },
                3: {
                    FR: 'Capitale-Nationale',
                    EN: 'Capitale-Nationale',
                },
                4: {
                    FR: 'Mauricie',
                    EN: 'Mauricie',
                },
                5: {
                    FR: 'Estrie',
                    EN: 'Estrie',
                },
                6: {
                    FR: 'Montréal',
                    EN: 'Montréal',
                },
                7: {
                    FR: 'Outaouais',
                    EN: 'Outaouais',
                },
                8: {
                    FR: 'Abitibi-Témiscamingue',
                    EN: 'Abitibi-Témiscamingue',
                },
                9: {
                    FR: 'Côte-Nord',
                    EN: 'Côte-Nord',
                },
                10: {
                    FR: 'Gaspésie-Îles-de-la-Madeleine',
                    EN: 'Gaspésie-Îles-de-la-Madeleine',
                },
                11: {
                    FR: 'Nord-du-Québec',
                    EN: 'Nord-du-Québec',
                },
                12: {
                    FR: 'Chaudière-Appalaches',
                    EN: 'Chaudière-Appalaches',
                },
                13: {
                    FR: 'Laval',
                    EN: 'Laval',
                },
                14: {
                    FR: 'Lanaudière',
                    EN: 'Lanaudière',
                },
                15: {
                    FR: 'Laurentides',
                    EN: 'Laurentides',
                },
                16: {
                    FR: 'Montérégie',
                    EN: 'Montérégie',
                },
                17: {
                    FR: 'Centre-du-Quebec',
                    EN: 'Centre-du-Quebec',
                },
            },
        },
    ],

    [
        IndexeDataFieldsB.REGIO,
        {
            label: {
                FR: 'Régions calculées',
                EN: 'Regions regrouped',
            },
            dataLabels: {
                1: {
                    FR: 'MTL RMR',
                    EN: 'MTL RMR',
                },
                2: {
                    FR: 'QC RMR',
                    EN: 'QC RMR',
                },
                3: {
                    FR: 'AUTRES RÉGIONS',
                    EN: 'AUTRES RÉGIONS',
                },
            },
        },
    ],

    [
        IndexeDataFieldsB.QD8,
        {
            label: {
                FR: "Nombre d'employés permanents",
                EN: 'Number of full time employees',
            },
            dataLabels: {
                1: {
                    FR: '0 employés',
                    EN: '0 employees',
                },
                2: {
                    FR: '1 à 3 employés',
                    EN: '1 to 3 employees',
                },
                3: {
                    FR: '4 à 5 employés',
                    EN: '4 to 5 employees',
                },
                4: {
                    FR: '6 à 10 employés',
                    EN: '6 to 10 employees',
                },
                5: {
                    FR: '11 à 20 employés',
                    EN: '11 to 20 employees',
                },
                6: {
                    FR: '21 à 50 employés',
                    EN: '21 to 50 employees',
                },
                7: {
                    FR: 'Plus de 50 employés',
                    EN: 'More than 50 employees',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QDA1r6, //TODO DIMINUE MOI
        {
            label: {
                FR: 'Entreprise Familiale ?',
                EN: 'Family Company ?',
            },
            dataLabels: {
                1: {
                    FR: 'Oui',
                    EN: 'Yes',
                },
                0: {
                    FR: 'Non',
                    EN: 'No',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QDD3x,
        {
            label: {
                FR: 'Création / reprise',
                EN: 'creation / take over',
            },
            dataLabels: {
                1: {
                    FR: 'Créé cette entreprise',
                    EN: 'Created a new company',
                },
                0: {
                    FR: "Repris l'entreprise",
                    EN: 'Taken it over',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QDD3Cx,
        {
            label: {
                FR: 'Création/ reprise seule / en équipe',
                EN: 'Creation/ take over alone / team ',
            },
            dataLabels: {
                1: {
                    FR: 'Seul(e)',
                    EN: 'Alone',
                },
                0: {
                    FR: 'En équipe',
                    EN: 'With a team',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QD2,
        {
            label: {
                FR: 'Années de possession',
                EN: 'Years of ownership',
            },
            dataLabels: {
                1: {
                    FR: 'Moins de 3 mois',
                    EN: 'Less than 3 months',
                },
                2: {
                    FR: '3 à 12 mois',
                    EN: '3 to 12 months',
                },
                3: {
                    FR: '1 à 3 an(s)',
                    EN: '1 to 3 years',
                },
                4: {
                    FR: '4 à 5 ans',
                    EN: '4 to 5 years',
                },
                5: {
                    FR: '6 à 10 ans',
                    EN: '6 to 10 years',
                },
                6: {
                    FR: '11 à 20 ans',
                    EN: '11 to 20 years',
                },
                7: {
                    FR: 'Plus de 20 ans',
                    EN: 'More than 20 years',
                },
                8: {
                    FR: 'Inconnu',
                    EN: 'Unknown',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QDD3Ar1, // TODO FIX ME // needs number filtering function
        {
            label: {
                FR: "Nombre d'entreprises crées par le propriétaire",
                EN: 'Number of compagnies created by the owner ',
            },
            dataLabels: {
                0: {
                    FR: '0 autres entreprises',
                    EN: '0 other companies',
                },
                1: {
                    FR: '1 autre entreprise',
                    EN: '1 other company',
                },
                2: {
                    FR: '2 autres entreprises',
                    EN: '2 other compagnies',
                },
                3: {
                    FR: 'Entre 3 et 5 autres entreprises',
                    EN: 'Between 3 to 5 other companies',
                },
                4: {
                    FR: 'Entre 5 et 15 autres entreprises',
                    EN: 'Between 5 to 15 other companies',
                },
                5: {
                    FR: 'Plus de 15 autres entreprises',
                    EN: 'More than 15 other compagnies',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QDD3Ar2,
        {
            label: {
                FR: "Nombre d'entreprises crées toujours actives",
                EN: 'Number of companies created still active',
            },
            dataLabels: {
                0: {
                    FR: '0 entreprises',
                    EN: '0 companies',
                },
                1: {
                    FR: '1 entreprise',
                    EN: '1 company',
                },
                2: {
                    FR: '2 entreprises',
                    EN: '2 compagnies',
                },
                3: {
                    FR: 'Entre 3 et 5 entreprises',
                    EN: 'Between 3 to 5 companies',
                },
                4: {
                    FR: 'Entre 5 et 15 entreprises',
                    EN: 'Between 5 to 15 companies',
                },
                5: {
                    FR: 'Plus de 15 entreprises',
                    EN: 'More than 15 compagnies',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QD11,
        {
            label: {
                FR: "Secteur d'activité principal de l'entreprise",
                EN: 'Main sector of activity of the company',
            },
            dataLabels: {
                1: {
                    FR: 'Commerce de détail (SCIAN 44-45)',
                    EN: 'Retail trade (NAICS 44-45)',
                },
                2: {
                    FR: 'Autres services, sauf les administrations publiques',
                    EN: 'Other services, except public administration',
                },
                3: {
                    FR: 'Services professionnels, scientifiques et techniques (services juridiques, comptables, architecture, génie, arpentage,',
                    EN: 'Professional, scientific, and technical services (legal, accounting, architectural, engineering, surveying services)',
                },
                4: {
                    FR: 'Arts, spectacles et loisirs (SCIAN 71)',
                    EN: 'Arts, entertainment, and recreation (NAICS 71)',
                },
                5: {
                    FR: 'Finance et assurances (SCIAN 52)',
                    EN: 'Finance and insurance (NAICS 52)',
                },
                6: {
                    FR: 'Soins de santé et assistance sociale (SCIAN 62)',
                    EN: 'Health care and social assistance (NAICS 62)',
                },
                7: {
                    FR: 'Construction (SCIAN 23)',
                    EN: 'Construction (NAICS 23)',
                },
                8: {
                    FR: 'Hébergement et services de restauration (SCIAN 72)',
                    EN: 'Accommodation and food services (NAICS 72)',
                },
                9: {
                    FR: 'Services d’enseignement (SCIAN 61)',
                    EN: 'Educational services (NAICS 61)',
                },
                10: {
                    FR: 'Commerce de gros (SCIAN 41)',
                    EN: 'Wholesale trade (NAICS 41)',
                },
                11: {
                    FR: 'Fabrication (SCIAN 31-33)',
                    EN: 'Manufacturing (NAICS 31-33)',
                },
                12: {
                    FR: 'Industrie de l’information et industrie culturelle (SCIAN 51)',
                    EN: 'Information and cultural industries (NAICS 51)',
                },
                13: {
                    FR: 'Transport et entreposage (SCIAN 48-49)',
                    EN: 'Transportation and warehousing (NAICS 48-49)',
                },
                14: {
                    FR: 'Agriculture, foresterie, pêche et chasse (SCIAN 11)',
                    EN: 'Agriculture, forestry, fishing, and hunting (NAICS 11)',
                },
                15: {
                    FR: 'Gestion de sociétés et d’entreprises (SCIAN 55)',
                    EN: 'Management of companies and enterprises (NAICS 55)',
                },
                16: {
                    FR: 'Services immobiliers et services de location et de location à bail (SCIAN 53)',
                    EN: 'Real estate and rental and leasing services (NAICS 53)',
                },
                17: {
                    FR: 'Services administratifs, services de soutien, services de gestion des déchets et services d’assainissement (SCIAN 56)',
                    EN: 'Administrative and support services, waste management and remediation services (NAICS 56)',
                },
                96: {
                    FR: 'Autre',
                    EN: 'Other',
                },
                98: {
                    FR: 'Je ne sais pas',
                    EN: 'I don’t know',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QD14A,
        {
            label: {
                FR: "Activité à l'exterieur de la zone administrative",
                EN: 'Activity outside of administrative region',
            },
            dataLabels: {
                ...oui1non2,
            },
        },
    ],
    [
        IndexeDataFieldsB.QD14B,
        {
            label: {
                FR: "Activité à l'exterieur de sa province",
                EN: 'Activity outside of its province',
            },
            dataLabels: {
                ...oui1non2,
            },
        },
    ],
    [
        IndexeDataFieldsB.QD14C,
        {
            label: {
                FR: "Activité à l'exterieur du Canada",
                EN: 'Activity outside of Canada',
            },
            dataLabels: {
                ...oui1non2,
            },
        },
    ],
    [
        IndexeDataFieldsB.ND32,
        {
            label: {
                FR: 'Besoins spécifiques des entreprises',
                EN: 'Specific needs of the companies',
            },
            dataLabels: {
                ND32r1: {
                    FR: 'Subventions',
                    EN: 'Subventions',
                },
                ND32r2: {
                    FR: 'Financement Privé (investisseur privé)',
                    EN: 'Private Financing (private investor)',
                },
                ND32r3: {
                    FR: 'Conseil Spécialisé (juridique, fiscal, comptable)',
                    EN: 'Specialized councel (legal, tax, acounting)',
                },
                ND32r4: {
                    FR: "Acompagnement par des entrepreneurs d'experience",
                    EN: 'Mentoring from seasoned entrepreneurs',
                },
                ND32r5: {
                    FR: "Accès à un réseau d'entrepreneurs",
                    EN: 'Access to a network of entrepreneurs',
                },
                ND32r6: {
                    FR: 'Contacts influents',
                    EN: 'Influential connexions',
                },
                ND32r7: {
                    FR: 'Conseil juridique',
                    EN: 'Legal councel',
                },
                ND32r8: {
                    FR: 'Conseil fiscal et comptable',
                    EN: 'Tax and acounting councel',
                },
                ND32r9: {
                    FR: "Accès à de l'information et des ressources sur le transfert d'entreprises",
                    EN: 'Access to information and resources on company transfert',
                },
            },
        },
    ],
    // [
    //     IndexeDataFieldsB.ND32r1,
    //     {
    //         label: {
    //             FR: "L'entreprise a-t-elle besoin de subventions ?",
    //             EN: 'Does the company need subventions ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.ND32r2,
    //     {
    //         label: {
    //             FR: "L'entreprise a-t-elle besoin de financement privé ?",
    //             EN: 'Does the company need private financing ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.ND32r3,
    //     {
    //         label: {
    //             FR: "L'entreprise a-t-elle besoin de conseil spécialisé (juridique, fiscal, comptable) ?",
    //             EN: 'Does the company need specialized advice (legal, tax, accounting) ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.ND32r7,
    //     {
    //         label: {
    //             FR: "L'entreprise a-t-elle besoin de conseil juridique ?",
    //             EN: 'Does the company need legal advice ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.ND32r8,
    //     {
    //         label: {
    //             FR: "L'entreprise a-t-elle besoin de conseil fiscal et comptable (ex. CPA) ?",
    //             EN: 'Does the company need tax or acounting advice (e.g. CPA) ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.ND32r4,
    //     {
    //         label: {
    //             FR: "L'entreprise a-t-elle besoin d'accompagnement par des entrepreneur(e)s d'expérience (mentor(e)s) ?",
    //             EN: 'Does the company need support from experienced entrepreneurs (mentors)?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.ND32r5,
    //     {
    //         label: {
    //             FR: "L'entreprise a-t-elle besoin d'un accès à des réseaux d'entrepreneurs ?",
    //             EN: 'Does the company need access to a netword of entrepreneurs ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.ND32r6,
    //     {
    //         label: {
    //             FR: "L'entreprise a-t-elle besoin de contacts influents ?",
    //             EN: 'Does the company need influential contacts ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.ND32r9,
    //     {
    //         label: {
    //             FR: "L'entreprise a-t-elle besoin d'un accès à de l’information et des ressources relatives au transfert d’entreprise ?",
    //             EN: 'Does the company need access to information and resources relating to business transfer?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    [
        IndexeDataFieldsB.QH1,
        {
            label: {
                FR: 'Horizons de retraite propriétaire',
                EN: 'Retierement horizons owner',
            },
            dataLabels: {
                1: {
                    FR: "Moins d'un an",
                    EN: 'Less than a year',
                },
                2: {
                    FR: 'De 1 à 3 an(s)',
                    EN: '1 to 3 years',
                },
                3: {
                    FR: 'De 4 à 5 ans',
                    EN: '4 to 5 years',
                },
                4: {
                    FR: 'De 6 à 10 ans',
                    EN: '6 to 10 years',
                },
                5: {
                    FR: 'Plus de 10 ans',
                    EN: 'More than 10 years',
                },
                97: {
                    FR: 'Pas encore considéré',
                    EN: 'Not yet considered',
                },
                98: {
                    FR: 'Je ne sais pas',
                    EN: 'I don’t know',
                },
            },
        },
    ],

    [
        IndexeDataFieldsB.QH2,
        {
            label: {
                FR: 'Plans après retraite, propriétaire',
                EN: 'Post retierment plans, owner',
            },
            dataLabels: {
                1: {
                    FR: "Fermer l'entreprise",
                    EN: 'Close the business',
                },
                2: {
                    FR: "Vendre l'entreprise au plus offrant",
                    EN: 'Sell the business to the highest bidder',
                },
                3: {
                    FR: "Vendre l'entreprise conditionnellement au maintien des emplois",
                    EN: 'Sell the business on condition that jobs are retained',
                },
                4: {
                    FR: "Transmettre et/ou vendre l'entreprise aux enfants/membres de la famille",
                    EN: 'Transfer and/or sell the business to children/family members',
                },
                5: {
                    FR: "Transmettre et/ou vendre l'entreprise à un ou des employés (rachat par les cadres)",
                    EN: 'Transfer and/or sell the business to employees (management buyout)',
                },
                6: {
                    FR: "Transmettre et/ou vendre l'entreprise à un membre de la famille (autres)",
                    EN: 'Transfer and/or sell the business to a family member (other)',
                },
                7: {
                    FR: 'Référer ma clientèle à une personne de confiance / compétente',
                    EN: 'Refer my clients to a trustworthy/competent person',
                },
                8: {
                    FR: 'Transformer l’entreprise en coopérative de travailleurs(-euses) actionnaires',
                    EN: 'Convert the business into a worker-shareholder cooperative',
                },
                9: {
                    FR: "Transmettre et/ou vendre l'entreprise à un ou des membre(s) de la famille ET à un ou des employé(e)s",
                    EN: 'Transfer and/or sell the business to family members AND employees',
                },
                10: {
                    FR: 'Vendre l’entreprise à l’externe (SANS LIEN avec la famille ni les employé(e)s)',
                    EN: 'Sell the business externally (NO connection to family or employees)',
                },
                11: {
                    FR: 'Vendre l’entreprise à l’externe et aux employé(e)s',
                    EN: 'Sell the business externally and to employees',
                },
                12: {
                    FR: 'Vendre l’entreprise à l’externe et à un ou des membre(s) de la famille',
                    EN: 'Sell the business externally and to family members',
                },
                13: {
                    FR: 'Vendre l’entreprise à un ou des membre(s) de la famille, à un ou des employé(e)s ainsi qu’à une ou des personne(',
                    EN: 'Sell the business to family members, employees, and others',
                },
                96: {
                    FR: 'Autre',
                    EN: 'Other',
                },
                97: {
                    FR: 'Pas de préférence',
                    EN: 'No preference',
                },
                98: {
                    FR: 'Inconnu',
                    EN: 'Unknown',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QREP2B,
        {
            label: {
                FR: 'Achteurs/successeurs potentiels',
                EN: 'Perspective buyers/successors',
            },
            dataLabels: {
                1: {
                    FR: 'Oui, une personne',
                    EN: 'Yes, one person',
                },
                2: {
                    FR: "Oui, une équipe d'acheteurs protentiels",
                    EN: 'Yes, a team of potential buyers',
                },
                3: {
                    FR: 'Non',
                    EN: 'No',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QREP1x,
        {
            label: {
                FR: 'Plan de succession',
                EN: 'Succession plan',
            },
            dataLabels: {
                0: {
                    FR: 'Non-existant',
                    EN: 'Nonexistant',
                },
                1: {
                    FR: 'Informel',
                    EN: 'Informal',
                },
                2: {
                    FR: 'Formel',
                    EN: 'Formal',
                },
            },
        },
    ],
    // [
    //     IndexeDataFieldsB.QREP3r4,
    //     {
    //         label: {
    //             FR: 'Do you know the exact market value of your company?',
    //             EN: 'How old are you ?',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'Oui',
    //                 EN: 'Yes',
    //             },
    //             1: {
    //                 FR: 'Non',
    //                 EN: 'Financement privé (investisseurs privés)',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP4,
    //     {
    //         label: {
    //             FR: "QREP3r4: Do you know the exact market value of your company?-No, I don't know the value",
    //             EN: 'How old are you ?',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'Non',
    //                 EN: 'Yes',
    //             },
    //             1: {
    //                 FR: 'Oui',
    //                 EN: 'Financement privé (investisseurs privés)',
    //             },
    //         },
    //     },
    // ],

    [
        IndexeDataFieldsB.QREP5, // Wait for answer
        {
            label: {
                FR: 'Support externe',
                EN: 'External support',
            },
            dataLabels: {
                QREP5r1: { FR: 'Conseil Légal', EN: 'Legal Advice' },
                QREP5r2: {
                    FR: 'Conseil fiscal et/ou comptable',
                    EN: 'Tax and acounting advice',
                },
                QREP5r3: { FR: 'Choaching', EN: 'Coaching' },
                QREP5r4: { FR: 'Mentorat', EN: 'Mentoring' },
                QREP5r5: {
                    FR: "Expert en succession/transfert d'entreprise",
                    EN: 'Expert in business transfert/succession',
                },
                QREP5r6: {
                    FR: 'Psycologue Industriel (tests psychométriques...)',
                    EN: 'No to: Industrial psychologist (psychometric tests, etc.)',
                },
                QREP5r7: {
                    FR: 'Institutions Financières (banques ou autre)',
                    EN: 'Financial Institutions (banks or otherwise)',
                },
            },
        },
    ],

    // [
    //     IndexeDataFieldsB.QREP5r1, // Wait for answer
    //     {
    //         label: {
    //             FR: 'Le propriétaire a-t-il déjà eut recours à du support externe pour des conseils juridiques ?',
    //             EN: 'Has the owner used external support for legal advice ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP5r2, // Wait for answer
    //     {
    //         label: {
    //             FR: 'Le propriétaire a-t-il déjà eut recours à du support externe pour du fiscal et/ou la comptabilité ?',
    //             EN: 'Has the owner used external support for tax and/or accounting ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],

    // [
    //     IndexeDataFieldsB.QREP5r3, // Wait for answer
    //     {
    //         label: {
    //             FR: 'Le propriétaire a-t-il déjà eut recours à un choach externe ?',
    //             EN: 'Has the owner used an external coach ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP5r4, // Wait for answer
    //     {
    //         label: {
    //             FR: 'Le propriétaire a-t-il déjà eut recours à un mentor externe ?',
    //             EN: 'Has the owner used an external mentor ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP5r5, // Wait for answer
    //     {
    //         label: {
    //             FR: "Le propriétaire a-t-il déjà eut recours à un consultant externe expert en succession et tranfert d'entreprise ?",
    //             EN: 'Has the owner used an external consultant expert in business succession and transfer?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP5r6, // Wait for answer
    //     {
    //         label: {
    //             FR: 'Le propriétaire a-t-il déjà eu recours à un psycologue industriel (tests psychométriques, etc...) ?',
    //             EN: 'Has the owner used an industrial psychologist (psychometric tests, etc.) ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP5r7, // Wait for answer
    //     {
    //         label: {
    //             FR: "Le propriétaire a-t-il déjà eu recours à un support externe provenant d'une institution financière (banques ou autre) ?",
    //             EN: 'Has the owner used external support from a financial institution (bank or otherwise) ?',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],

    [
        IndexeDataFieldsB.QREP7, // Wait for answer
        {
            label: {
                FR: 'Plans après vente/transfert, propriétaire',
                EN: 'Plans post sale/transfert, owner',
            },
            dataLabels: {
                QREP5r1: {
                    FR: "Continuera de s'impliquer dans l'entreprise",
                    EN: 'Will stay involved with the company',
                },
                QREP5r2: {
                    FR: 'Incertain par rapport à leur vie après',
                    EN: 'Unsure about how their life will be afterwards',
                },
                QREP5r3: {
                    FR: "N'aura plus de réseau d'ffaires ensuite",
                    EN: "Won't have a business network anymore",
                },
                QREP5r4: {
                    FR: 'Trouvera un autre sens a leur vie',
                    EN: 'Will have to find a new meaning for their life',
                },
                QREP5r5: {
                    FR: 'Adaptation au changement',
                    EN: 'Will adapt to the change',
                },
                QREP5r6: {
                    FR: 'Commencera une nouvelle entreprise',
                    EN: 'Start a new company',
                },
                QREP5r7: {
                    FR: 'Temps pour du bénévolat ou des activités caritatives',
                    EN: 'Time for charity work',
                },
            },
        },
    ],
    // [
    //     IndexeDataFieldsB.QREP7r1, // Wait for answer
    //     {
    //         label: {
    //             FR: "Suite à la vente de son entreprise, le propriétaire actuel souhaiterai continuer son implication au sein de l'entreprise d'une autre façon.",
    //             EN: 'Following the sale of his business, the current owner would like to continue his involvement in the company in another way.',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP7r2, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP7r2: Ce sera un vide, je ne sais pas comment sera ma vie ensuite - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Comment envisagez-vous votre vie après cette étape?',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: Ce sera un vide, je ne sais pas comment sera ma vie ensuite',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'Ce sera un vide, je ne sais pas comment sera ma vie ensuite',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP7r3, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP7r3: Je n’aurai plus de réseau d’affaires - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Comment envisagez-vous votre vie après cette étape?',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: Je n’aurai plus de réseau d’affaires',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'Je n’aurai plus de réseau d’affaires',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP7r4, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP7r4: Je devrai trouver un autre sens à ma vie - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Comment envisagez-vous votre vie après cette étape?',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: Je devrai trouver un autre sens à ma vie',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'Je devrai trouver un autre sens à ma vie',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP7r5, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP7r5: C’est simplement une autre étape de ma vie, je m’adapterai - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Comment envisagez-vous votre vie après cette étape?',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: C’est simplement une autre étape de ma vie, je m’adapterai',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'C’est simplement une autre étape de ma vie, je m’adapterai',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP7r6, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP7r6: J’aurai du temps pour lancer une nouvelle entreprise - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Comment envisagez-vous votre vie après cette étape?',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: J’aurai du temps pour lancer une nouvelle entreprise',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'J’aurai du temps pour lancer une nouvelle entreprise',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP7r7, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP7r7: J’aurai du temps pour faire du bénévolat/des activités caritatives - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Comment envisagez-vous votre vie après cette étape?',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: J’aurai du temps pour faire du bénévolat/des activités caritatives',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'J’aurai du temps pour faire du bénévolat/des activités caritatives',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP7r8, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP7r8: J’aurai du temps pour prendre soin de moi et/ou de ma famille - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Comment envisagez-vous votre vie après cette étape?',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: J’aurai du temps pour prendre soin de moi et/ou de ma famille',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'J’aurai du temps pour prendre soin de moi et/ou de ma famille',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],

    [
        IndexeDataFieldsB.QREP8, // Wait for answer
        {
            label: {
                FR: 'Role après vente/transfert, propriétaire',
                EN: 'Role post sale/transfert, owner',
            },
            dataLabels: {
                QREP5r1: {
                    FR: 'Rôle opérationel, pas de direction',
                    EN: 'Operational role, no leadership',
                },
                QREP5r2: {
                    FR: 'Rôle stratégique, pas de direction',
                    EN: 'Strategic role, no leadership',
                },
                QREP5r3: {
                    FR: 'Rôle informel (mentor, coach...)',
                    EN: 'Informal role (mentor, coacj...)',
                },
                QREP5r4: {
                    FR: 'Pas de rôle',
                    EN: 'No role at all',
                },
                QREP5r5: {
                    FR: 'Siège sur le conseil (administratif ou consultatif)',
                    EN: 'Seat on the board (administrative or advisory)',
                },
                QREP5r6: {
                    FR: 'Siège sur le conseil familial',
                    EN: 'Seat on the family council',
                },
                QREP5r7: {
                    FR: 'Actionnaire minoritaire',
                    EN: 'Minor shareholder',
                },
                QREP5r8: {
                    FR: 'Actionnaire de contrôle',
                    EN: 'Controling shareholder',
                },
            },
        },
    ],

    // [
    //     IndexeDataFieldsB.QREP8r1, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP8r1: Je continuerai de travailler pour l’entreprise dans un rôle OPÉRATIONNEL, sans la diriger - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Quel sera en principe votre rôle par l',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: Je continuerai de travailler pour l’entreprise dans un rôle OPÉRATIONNEL, sans la diriger',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'Je continuerai de travailler pour l’entreprise dans un rôle OPÉRATIONNEL, sans la diriger',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],

    // [
    //     IndexeDataFieldsB.QREP8r2, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP8r2: Je continuerai de travailler pour l’entreprise dans un rôle STRATÉGIQUE, sans la diriger - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Quel sera en principe votre rôle par la',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: Je continuerai de travailler pour l’entreprise dans un rôle STRATÉGIQUE, sans la diriger',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'Je continuerai de travailler pour l’entreprise dans un rôle STRATÉGIQUE, sans la diriger',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP8r3, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP8r3: Je continuerai d’avoir un rôle informel auprès des repreneurs(-eures) (ex. : mentor, coach, etc.) - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Quel sera en principe votre rô',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: Je continuerai d’avoir un rôle informel auprès des repreneurs(-eures) (ex. : mentor, coach, etc.)',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'Je continuerai d’avoir un rôle informel auprès des repreneurs(-eures) (ex. : mentor, coach, etc.)',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP8r4, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP8r4: Je ne compte pas suivre l’évolution de mon entreprise après sa vente/son transfert - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Quel sera en principe votre rôle par la suite',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: Je ne compte pas suivre l’évolution de mon entreprise après sa vente/son transfert',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'Je ne compte pas suivre l’évolution de mon entreprise après sa vente/son transfert',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP8r5, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP8r5: Je siègerai sur son conseil (administratif ou consultatif) - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Quel sera en principe votre rôle par la suite?',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: Je siègerai sur son conseil (administratif ou consultatif)',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'Je siègerai sur son conseil (administratif ou consultatif)',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP8r6, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP8r6: Je siègerai sur un conseil familial - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Quel sera en principe votre rôle par la suite?',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: Je siègerai sur un conseil familial',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'Je siègerai sur un conseil familial',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP8r7, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP8r7: Je resterai actionnaire minoritaire - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Quel sera en principe votre rôle par la suite?',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: Je resterai actionnaire minoritaire',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'Je resterai actionnaire minoritaire',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],
    // [
    //     IndexeDataFieldsB.QREP8r8, // Wait for answer
    //     {
    //         label: {
    //             FR: 'QREP8r8: Je resterai actionnaire avec des actions de contrôle - ***Inactiver en 2024 *** Vous avez indiqué avoir l’intention de vendre ou de transmettre votre entreprise. Quel sera en principe votre rôle par la suite?',
    //             EN: '',
    //         },
    //         dataLabels: {
    //             0: {
    //                 FR: 'NO TO: Je resterai actionnaire avec des actions de contrôle',
    //                 EN: '',
    //             },
    //             1: {
    //                 FR: 'Je resterai actionnaire avec des actions de contrôle',
    //                 EN: '',
    //             },
    //         },
    //     },
    // ],

    [
        IndexeDataFieldsB.QD16,
        {
            label: {
                FR: "Plans d'être actif à l'international",
                EN: 'Plans for international activity',
            },
            dataLabels: {
                1: {
                    FR: 'Oui',
                    EN: 'Yes',
                },
                2: {
                    FR: 'Non',
                    EN: 'No',
                },
                3: {
                    FR: 'Inconnu',
                    EN: 'Unknown',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QD16A,
        {
            label: {
                FR: "Raisons pour la non-considération de l'acivité internationale",
                EN: 'Reasonsexplain the non-consideration of international activity',
            },
            dataLabels: {
                1: {
                    FR: 'Le produit/service ne se prête pas à l’exportation',
                    EN: "Product/service doesn't lend itself to export",
                },
                2: {
                    FR: 'Complexité du processus d’internationalisation',
                    EN: 'Complexity of the internationalization process',
                },
                3: {
                    FR: 'Trop de risques associés à l’internationalisation',
                    EN: 'Too many risks associated with internationalization',
                },
                4: {
                    FR: 'Manque de ressources (financières, humaines, etc.)',
                    EN: 'Lack of resources (financial, human, etc.)',
                },
                5: {
                    FR: 'Le marché local est assez grand pour atteindre les objectifs de l’entreprise',
                    EN: 'Local market is big enough to meet business objectives',
                },
                6: {
                    FR: 'Manque de compétences',
                    EN: 'Lack of skills',
                },
                7: {
                    FR: 'Manque d’information',
                    EN: 'Lack of information',
                },
                13: {
                    FR: 'Les conséquences de la pandémie de COVID-19 sont trop importantes (économie, conditions de santé, etc.)',
                    EN: 'Consequences of the COVID-19 pandemic are too significant (economy, health conditions, etc.)',
                },
                96: {
                    FR: 'Autre',
                    EN: 'Other',
                },
                98: {
                    FR: 'Unknown',
                    EN: 'Inconnu',
                },
            },
        },
    ],
    [
        IndexeDataFieldsB.QZ19,
        {
            label: {
                FR: "Chiffre d'affaire annuel",
                EN: 'Annual revenue',
            },
            dataLabels: {
                1: {
                    FR: '49 999 $ et moins',
                    EN: '49,999 $ or less',
                },
                2: {
                    FR: 'entre 50 000 $ et 99 999 $',
                    EN: '50,000 $ to 99,999 $',
                },
                3: {
                    FR: 'entre 100 000 $ et 199 999 $',
                    EN: '100,000 $ to 199,999 $',
                },
                4: {
                    FR: 'entre 200 000 $ et 499 999 $',
                    EN: '200,000 $ to 499,999 $',
                },
                5: {
                    FR: 'entre 500 000 $ et 999 999 $',
                    EN: '500,000 $ to 999,999 $',
                },
                6: {
                    FR: 'entre 1 000 000 $ et 1 499 999 $',
                    EN: '1,000,000 $ to 1,499,999 $',
                },
                7: {
                    FR: 'entre 1 500 000 $ et 4 999 999 $',
                    EN: '1,500,000 $ to 4,999,999 $',
                },
                8: {
                    FR: 'entre 5 000 000 $ et 9 999 999 $',
                    EN: '5,000,000 $ to 9,999,999 $',
                },
                9: {
                    FR: '10 000 000 $ et plus',
                    EN: '10,000,000 $ or more',
                },
                97: {
                    FR: "Ne s'applique pas",
                    EN: 'Not applicable',
                },
                99: {
                    FR: 'Je préfère ne pas répondre',
                    EN: 'Prefers not to answer',
                },
            },
        },
    ],
    // [
    //     IndexeDataFieldsA.TYPETYPE2,
    //     {
    //         label: {
    //             FR: "Le répondant à l'intention d'entreprendre",
    //             EN: 'The respondent intends to become an entrepreneur',
    //         },
    //         dataLabels: {
    //             ...non0oui1,
    //         },
    //     },
    // ],
    [
        IndexeDataFieldsA.QE1x,
        {
            label: {
                FR: 'Intentions du répondant',
                EN: "Respondents' intentions",
            },
            dataLabels: {
                1: {
                    FR: 'Créer une nouvelle entreprise',
                    EN: 'Start a new business',
                },
                2: {
                    FR: 'Reprendre une entreprise',
                    EN: 'Acquire a business',
                },
                3: {
                    FR: 'Reprendre une entreprise familliale',
                    EN: 'Take over a family business',
                },
                96: {
                    FR: 'Je ne sais pas encore',
                    EN: 'Not sure yet',
                },
            },
        },
    ],
    [
        IndexeDataFieldsA.QE1Cx,
        {
            label: {
                FR: 'Intention dentreprendre équipe',
                EN: '',
            },
            dataLabels: {
                1: {
                    FR: 'Seul(e)',
                    EN: 'Alone',
                },
                2: {
                    FR: "Avec d'autres personnes",
                    EN: 'With other peoplle',
                },

                96: {
                    FR: 'Inconnu',
                    EN: 'Unknown',
                },
            },
        },
    ],
    [
        IndexeDataFieldsA.QE3,
        {
            label: {
                FR: 'Délais création / reprise',
                EN: '',
            },
            dataLabels: {
                0: {
                    FR: 'Dès que les conditions économiques seront revenues à la normale',
                    EN: 'As soon as economic conditions return to normal',
                },
                1: {
                    FR: 'Moins de 1 an',
                    EN: 'Less than 1 year',
                },
                2: {
                    FR: 'De 1 à 3 an(s)',
                    EN: '1 to 3 years',
                },
                3: {
                    FR: 'De 4 à 5 ans',
                    EN: '4 to 5 years',
                },
                4: {
                    FR: 'De 6 à 10 ans',
                    EN: '6 to 10 years',
                },
                5: {
                    FR: 'Plus de 10 ans',
                    EN: 'More than 10 years',
                },
                7: {
                    FR: 'Mes démarches concrètes sont déjà commencées',
                    EN: 'My concrete steps have already begun',
                },
                96: {
                    FR: 'Je ne sais pas encore',
                    EN: 'Not sure yet',
                },
            },
        },
    ],
    [
        IndexeDataFieldsA.QE6,
        {
            label: {
                FR: "Les secteurs d'activité considérés",
                EN: 'The sectors of activity considered',
            },
            dataLabels: {
                1: {
                    FR: 'Commerce de détail (SCIAN 44-45)',
                    EN: 'Retail Trade (NAICS 44-45)',
                },
                2: {
                    FR: 'Autres services, sauf les administrations publiques (réparation et entretien, services personnels et de blanchissage, m',
                    EN: 'Other Services, except Public Administration (repair and maintenance, personal services, laundering, etc.)',
                },
                3: {
                    FR: 'Services professionnels, scientifiques et techniques (services juridiques, comptables, architecture, génie, arpentage,',
                    EN: 'Professional, Scientific, and Technical Services (legal, accounting, architecture, engineering, surveying, etc.)',
                },
                4: {
                    FR: 'Arts, spectacles et loisirs (SCIAN 71)',
                    EN: 'Arts, Entertainment, and Recreation (NAICS 71)',
                },
                5: {
                    FR: 'Finance et assurances (SCIAN 52)',
                    EN: 'Finance and Insurance (NAICS 52)',
                },
                6: {
                    FR: 'Soins de santé et assistance sociale (SCIAN 62)',
                    EN: 'Health Care and Social Assistance (NAICS 62)',
                },
                7: {
                    FR: 'Construction (SCIAN 23)',
                    EN: 'Construction (NAICS 23)',
                },
                8: {
                    FR: 'Hébergement et services de restauration (SCIAN 72)',
                    EN: 'Accommodation and Food Services (NAICS 72)',
                },
                9: {
                    FR: 'Services d’enseignement (SCIAN 61)',
                    EN: 'Educational Services (NAICS 61)',
                },
                10: {
                    FR: 'Commerce de gros (SCIAN 41)',
                    EN: 'Wholesale Trade (NAICS 41)',
                },
                11: {
                    FR: 'Fabrication (SCIAN 31-33)',
                    EN: 'Manufacturing (NAICS 31-33)',
                },
                12: {
                    FR: 'Industrie de l’information et industrie culturelle (SCIAN 51)',
                    EN: 'Information and Cultural Industries (NAICS 51)',
                },
                13: {
                    FR: 'Transport et entreposage (SCIAN 48-49)',
                    EN: 'Transportation and Warehousing (NAICS 48-49)',
                },
                14: {
                    FR: 'Agriculture, foresterie, pêche et chasse (SCIAN 11)',
                    EN: 'Agriculture, Forestry, Fishing, and Hunting (NAICS 11)',
                },
                15: {
                    FR: 'Gestion de sociétés et d’entreprises (SCIAN 55)',
                    EN: 'Management of Companies and Enterprises (NAICS 55)',
                },
                16: {
                    FR: 'Services immobiliers et services de location et de location à bail (SCIAN 53)',
                    EN: 'Real Estate and Rental and Leasing (NAICS 53)',
                },
                17: {
                    FR: 'Services administratifs, services de soutien, services de gestion des déchets et services d’assainissement (SCIAN 56)',
                    EN: 'Administrative and Support Services, Waste Management and Remediation Services (NAICS 56)',
                },
                97: {
                    FR: 'Autre',
                    EN: 'Other',
                },
                96: {
                    FR: 'Je ne sais pas encore',
                    EN: 'Not sure yet',
                },
            },
        },
    ],
    [
        IndexeDataFieldsA.QE8r1,
        {
            label: {
                FR: "Importance d'un mentor",
                EN: 'Importance of a mentor',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r2,
        {
            label: {
                FR: "Importance d'un partenaire d'affaires",
                EN: 'Importance of a buisness partner',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r3,
        {
            label: {
                FR: "Importance de l'information sur des entreprises existantes à reprendre",
                EN: 'Importance of  information on existing companies in need of a successor',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r4,
        {
            label: {
                FR: "Inportance d'une occasion d'affaires",
                EN: 'Importance of a business opportunity ',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r5,
        {
            label: {
                FR: "Importance de l'information sur le démarrage d'entreprises",
                EN: 'Importance of information on starting a business',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r6,
        {
            label: {
                FR: "Importance de l'aide gouvernementale/le financement public sous toutes formes",
                EN: 'Importance of governmental/public financing',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r7,
        {
            label: {
                FR: "Importance de l'aide aux entreprises/le financement privé (taux bancaire réduit, services professionnels avantageux, etc.)",
                EN: 'Importance of business assistance/private financing (reduced bank rates, advantageous professional services, etc.)',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r8,
        {
            label: {
                FR: "Importance du changement dans le contexte économique (perte massive d'emploi, dégradation des conditions de travail, etc.)",
                EN: 'Importance of the change in the economic context (massive loss of jobs, including mine, deterioration of working conditions, etc.)',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r9,
        {
            label: {
                FR: "Importance de l'accompagnement d'un conseiller pour aider à démarrer ou reprendre une entreprise",
                EN: 'Importance of the support of an advisor to help start or take over a business',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r10,
        {
            label: {
                FR: "Importance de la motivation personnelle à passer à l'action",
                EN: 'Importance of having personal motivation to take action',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r11,
        {
            label: {
                FR: "Importance l'augmentation des compétences / expériences du répondant",
                EN: "Importance of the move to action, increasing the respondent's skills/experience",
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r12,
        {
            label: {
                FR: "Importance de la perte d'emploi du répondant",
                EN: "Importance of the respondent's job loss",
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r13,
        {
            label: {
                FR: "Importance du soutien de l'entourage du répondant",
                EN: 'Importance the support from those around the respondent',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r14,
        {
            label: {
                FR: 'Importance de finir les études en cours du répondant',
                EN: "Importance of finishing the respondent's current studies",
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r15,
        {
            label: {
                FR: 'Importance de la situation familiale (que les enfants grandissent, etc.) du répondant',
                EN: 'Importance of the family situation (whether the children are growing up, etc.) of the respondent',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r16,
        {
            label: {
                FR: "Importance de mieux définir et évaluer l'idée du répondant",
                EN: "Importance of better define and evaluate the respondent's idea",
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r17,
        {
            label: {
                FR: 'Importance des conditions économiques davantage favorables',
                EN: 'Importance of more favorable economic conditions',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r18,
        {
            label: {
                FR: 'Importance de l’information sur les avantages et inconvénients des différentes formes juridiques',
                EN: 'Importance of information on the advantages and disadvantages of the different legal forms',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],
    [
        IndexeDataFieldsA.QE8r19,
        {
            label: {
                FR: "Importance de connaître les intentions de transfert (vente) de la(des) propriétaire(s) de l'entreprise pour laquelle le répondant travaille",
                EN: 'Importance of knowing the transfer (sale) intentions of the owner(s) of the company for which the respondent works',
            },
            dataLabels: { ...satisfactionChartValues },
        },
    ],

    [
        FournisseurDataFields.SECTEURS_GEOGRAPHIQUES,
        {
            label: {
                FR: 'Secteur Géographique',
                EN: 'Geographic Region',
            },
            dataLabels: {
                [SecteursGeographiques.ABITIBI]: {
                    FR: 'Abitibi-Témiscamingue',
                    EN: 'Abitibi-Témiscamingue',
                },
                [SecteursGeographiques.BAS_ST_LAURENT]: {
                    FR: 'Bas-Saint-Laurent',
                    EN: 'Bas-Saint-Laurent',
                },
                [SecteursGeographiques.SAGUENEY]: {
                    FR: 'Saguenay–Lac-Saint-Jean',
                    EN: 'Saguenay–Lac-Saint-Jean',
                },
                [SecteursGeographiques.CAPITALE_NATIONALE]: {
                    FR: 'Capitale-Nationale',
                    EN: 'Capitale-Nationale',
                },
                [SecteursGeographiques.MAURICIE]: {
                    FR: 'Mauricie',
                    EN: 'Mauricie',
                },
                [SecteursGeographiques.ESTRIE]: {
                    FR: 'Estrie',
                    EN: 'Estrie',
                },
                [SecteursGeographiques.MONTREAL]: {
                    FR: 'Montréal',
                    EN: 'Montréal',
                },
                [SecteursGeographiques.OUTAOUAIS]: {
                    FR: 'Outaouais',
                    EN: 'Outaouais',
                },
                [SecteursGeographiques.COTE_NORD]: {
                    FR: 'Côte-Nord',
                    EN: 'Côte-Nord',
                },
                [SecteursGeographiques.NORD_QUEBEC]: {
                    FR: 'Nord-du-Québec',
                    EN: 'Nord-du-Québec',
                },
                [SecteursGeographiques.GASPESIE]: {
                    FR: 'Gaspésie–Îles-de-la-Madeleine',
                    EN: 'Gaspésie–Îles-de-la-Madeleine',
                },
                [SecteursGeographiques.CHAUDIERE_APALACHE]: {
                    FR: 'Chaudière-Appalaches',
                    EN: 'Chaudière-Appalaches',
                },
                [SecteursGeographiques.LAVAL]: {
                    FR: 'Laval',
                    EN: 'Laval',
                },
                [SecteursGeographiques.LANAUDIERE]: {
                    FR: 'Lanaudière',
                    EN: 'Lanaudière',
                },
                [SecteursGeographiques.LAURENTIDES]: {
                    FR: 'Laurentides',
                    EN: 'Laurentides',
                },
                [SecteursGeographiques.MONTEREGIE]: {
                    FR: 'Montérégie',
                    EN: 'Montérégie',
                },
                [SecteursGeographiques.CENTRE_QUEBEC]: {
                    FR: 'Centre-du-Québec',
                    EN: 'Centre-du-Québec',
                },
            },
        },
    ],
    [
        FournisseurDataFields.SERVICES_OFFERTS,
        {
            label: {
                FR: 'Services Offerts',
                EN: 'Offered Services',
            },
            dataLabels: {
                [ServiceOffert.COMPTABILITE]: {
                    FR: 'Comptabilité',
                    EN: 'Acounting',
                },
                [ServiceOffert.PLANIF_FINANCIERE]: {
                    FR: 'Planification financière',
                    EN: 'Financial Planification',
                },
                [ServiceOffert.CONSEIL_ASSURANCES]: {
                    FR: 'Conseiller en assurances',
                    EN: 'Insurance Advisor',
                },
                [ServiceOffert.CONSEIL_INVESTISSEMENT]: {
                    FR: 'Conseiller en investissement, gestionnaire de placements',
                    EN: 'Investment Advisor, asset manager',
                },
                [ServiceOffert.FUSION_ACQUISITIONS]: {
                    FR: 'Fusions et acquisitions',
                    EN: 'Mergers and acquisitions',
                },
                [ServiceOffert.BANQUE_PRIVEE]: {
                    FR: 'Banque privée',
                    EN: 'Private banking',
                },
                [ServiceOffert.IMMOBILIER]: {
                    FR: 'Immobilier',
                    EN: 'Real estate',
                },
                [ServiceOffert.GESTION_PATRIMOINE]: {
                    FR: 'Gestion de patrimoine',
                    EN: 'Wealth management',
                },
                [ServiceOffert.PLANIF_SUCCESSORALE]: {
                    FR: 'Planification successorale',
                    EN: 'Succession advisor',
                },
                [ServiceOffert.PLANIF_FISCALE]: {
                    FR: 'Planification fiscale',
                    EN: 'Tax planning',
                },
                [ServiceOffert.CONSEIL_JURIDIQUE]: {
                    FR: 'Conseils juridiques',
                    EN: 'Legal advisor',
                },
                [ServiceOffert.PHLANTROPIE]: {
                    FR: 'Philantropie',
                    EN: 'Philantropy',
                },
                [ServiceOffert.DEV_DURABLE]: {
                    FR: 'Développement durable et impact',
                    EN: 'Sustainable development and impact',
                },
                [ServiceOffert.CONSEIL_GESTION_RISQUES]: {
                    FR: 'Conseil en gestion de risque divers',
                    EN: 'Consulting in various risk management',
                },
                [ServiceOffert.GOUV_CORPO]: {
                    FR: 'Gouvernance corporative',
                    EN: 'Corporative governance',
                },
                [ServiceOffert.GOUV_FAMILIALE]: {
                    FR: 'Gouvernance familiale',
                    EN: 'Family governance',
                },
                [ServiceOffert.ADMIN_INDEP]: {
                    FR: 'Administrateur indépendant',
                    EN: 'Independant administrator',
                },
                [ServiceOffert.PLANIF_STRAT]: {
                    FR: 'Planification stratégique',
                    EN: 'Strategic planning',
                },
                [ServiceOffert.BUREAU_AFFAIRES_FAM]: {
                    FR: 'Bureau des affaires familiales',
                    EN: 'Family Affairs Office',
                },
                [ServiceOffert.DEV_LEADERSHIP]: {
                    FR: 'Développement du leadership',
                    EN: 'Leadership development',
                },
                [ServiceOffert.CONSEIL_MANAGEMENT]: {
                    FR: 'Conseil en management',
                    EN: 'Management Advisor',
                },
                [ServiceOffert.RESSOURCE_HUMAINES]: {
                    FR: 'Ressources humaines',
                    EN: 'Human ressources',
                },
                [ServiceOffert.PLANIF_TRANSITION_DIRECTION]: {
                    FR: 'Planification de la transition de direction',
                    EN: 'Leadership transition planning',
                },
                [ServiceOffert.DIRIGEANT_NON_FAMILIAL]: {
                    FR: 'Dirigeant non familial',
                    EN: 'Non-family manager',
                },
                [ServiceOffert.PLANIF_STRAT_APPRENTISSAGE]: {
                    FR: 'Planification des stratégies d’apprentissage',
                    EN: 'Planning learning strategies',
                },
                [ServiceOffert.COACHING_FORMATIONS_SPE]: {
                    FR: 'Coaching et formations spécifiques',
                    EN: 'Coaching and specific training',
                },
                [ServiceOffert.ORIENTATION_PRO]: {
                    FR: 'Orientation professionnelle',
                    EN: 'Profesional goals',
                },
                [ServiceOffert.MENTORAT]: {
                    FR: 'Mentorat',
                    EN: 'Mentoring',
                },
                [ServiceOffert.PLAN_DEV_COMPETENCES]: {
                    FR: 'Plan de développement de compétences',
                    EN: 'Skill development plan',
                },
                [ServiceOffert.FACILITATION]: {
                    FR: 'Facilitation',
                    EN: 'Facilitation',
                },
                [ServiceOffert.MEDIATION_PRO]: {
                    FR: 'Médiation professionnelle',
                    EN: 'Profesionnal mediation',
                },
                [ServiceOffert.FAMILY_BUILDING]: {
                    FR: 'Family building',
                    EN: 'Family building',
                },
                [ServiceOffert.GESTION_EMOTIONS]: {
                    FR: 'Gestion des émotions',
                    EN: 'Emotion management',
                },
                [ServiceOffert.COMMUNICATION]: {
                    FR: 'Communication',
                    EN: 'Communication',
                },
                [ServiceOffert.THERAPIE_FAMILIALE]: {
                    FR: 'Thérapie familiale',
                    EN: 'Family Therapy',
                },
                [ServiceOffert.PSYCHOLOGIE]: {
                    FR: 'Psychologie',
                    EN: 'Psycology',
                },
                [ServiceOffert.GESTION_DEPENDANCES]: {
                    FR: 'Gestion des dépendances',
                    EN: 'Dependency management',
                },
                [ServiceOffert.SANTE_MENTALE]: {
                    FR: 'Santé mentale',
                    EN: 'Mental health',
                },
                [ServiceOffert.DIRECTION_STRATEGIQUE]: {
                    FR: 'Direction stratégique',
                    EN: 'Strategic direction',
                },
            },
        },
    ],
];

export const TableauxTraductionsMainDataFields = new Map<
    string,
    dataInformations
>(keyValuePairs);

const keyValuePairsGraphs: [string, { FR: string; EN: string }][] = [
    [GraphBoxType.DOUGHNUT, { FR: 'En Beignet', EN: 'Doughnut' }],
    [
        GraphBoxType.DOUBLE_HORIZONTAL_BARCHART,
        {
            FR: 'Barres (y(x))',
            EN: 'Horizontal Bars (y(x))',
        },
    ],
    [
        GraphBoxType.STACKED_BARCHART,
        {
            FR: 'Barres Empliées (y(x))',
            EN: 'Stacked Bars (y(x))',
        },
    ],
    [
        GraphBoxType.VERTICAL_BARCHART,
        {
            FR: 'Barres Horizontales',
            EN: 'Vertical Bars',
        },
    ],
    [
        GraphBoxType.HORIZONTAL_BARCHART,
        {
            FR: 'Barres Verticales',
            EN: 'Horizontal Bars',
        },
    ],
];

export const TableauxTraductionsGraphiques = new Map<
    string,
    { FR: string; EN: string }
>(keyValuePairsGraphs);

export const GraphTextService = {
    getKeys: getKeys,
    getKey: getKey,
    getFieldLabels: getFieldLabels,
    getFieldLabel: getFieldLabel,
    getLabel: getLabel,
};

function getKeys(dataField: any): (number | string)[] {
    const keys = Object.keys(
        TableauxTraductionsMainDataFields.get(dataField)?.dataLabels ?? {},
    );

    return keys.map((key) => {
        const numKey = Number(key);
        // Check if the key is a valid number
        return isNaN(numKey) ? key : numKey;
    });
}

function getKey(dataField: any, value: any): number | string | null {
    const dataLabels =
        TableauxTraductionsMainDataFields.get(dataField)?.dataLabels ?? {};

    // Find the key corresponding to the value
    const foundKey = Object.keys(dataLabels).find(
        (key) => dataLabels[key][Language.FR] === value,
    );
    // Return the key if found, or null if not found
    return foundKey ?? null;
}
function getFieldLabels(dataField: any, language: Language): string[] {
    return Object.values(
        TableauxTraductionsMainDataFields.get(dataField)?.dataLabels ?? {},
    ).map((value) => value[language]);
}

function getFieldLabel(dataField: any, field: any, language: Language): string {
    const dataLabels =
        TableauxTraductionsMainDataFields.get(dataField)?.dataLabels;
    const fieldLabel = dataLabels?.[field]?.[language];

    // If the label is undefined, return field.toString()
    return fieldLabel !== undefined ? fieldLabel : field.toString();
}

function getLabel(dataField: any, language: Language): string {
    return (
        TableauxTraductionsMainDataFields.get(dataField)?.label[language] ?? ''
    );
}

interface TabsProps {
    titre: Traductions;
    acronym: Traductions;
}
const keyValuePairsTabs: [string, TabsProps][] = [
    [
        StudyOrigin.ALBUM_FAMILLE,
        {
            titre: {
                FR: 'Album de Familles',
                EN: 'Family Album',
            },
            acronym: {
                FR: 'AF',
                EN: 'FA',
            },
        },
    ],

    [
        StudyOrigin.INDEX_VOLETA,
        {
            titre: {
                FR: 'IÉQ: Intentions',
                EN: 'IÉQ: Intensions',
            },
            acronym: {
                FR: 'I',
                EN: 'I',
            },
        },
    ],
    [
        StudyOrigin.INDEX_VOLETB,
        {
            titre: {
                FR: 'IÉQ: Entrepreneur Familial',
                EN: 'IÉQ: Family Entrepreneur',
            },
            acronym: {
                FR: 'EF',
                EN: 'FE',
            },
        },
    ],
];

export const TableauxTraductionsTabs = new Map<string, TabsProps>(
    keyValuePairsTabs,
);
