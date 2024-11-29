import { Traductions } from '@/components/enums/language';

type PromptsTranslations = {
    [key: string]: Traductions;
};

export const SharedPromptsTranslations: PromptsTranslations = {
    loading: {
        FR: 'Chargement ...',
        EN: 'Loading ...',
    },
    all: {
        FR: 'Toutes',
        EN: 'All',
    },
    error: {
        FR: 'Erreur: ',
        EN: 'Error: ',
    },
    search: {
        FR: 'Rechercher',
        EN: 'Search',
    },
    save: {
        FR: 'Enregistrer',
        EN: 'Save',
    },
    cancel: {
        FR: 'Annuler',
        EN: 'Cancel',
    },
    confirm: {
        FR: 'Confirmer',
        EN: 'Confirm',
    },
    image: {
        FR: 'Sélectionner une image',
        EN: 'Select an image',
    },
    filters: { FR: 'Filtres', EN: 'Filters' },
    applied_filters: { FR: 'Filtres Appliqués', EN: 'Applied Filters' },
    reset_filters: { FR: 'Réinitialiser', EN: 'Reset' },
    general_filters: { FR: 'Général', EN: 'General' },
    advanced_filters: { FR: 'Avancé', EN: 'Advanced' },
};

export const AdminPromptsTranslations: PromptsTranslations = {
    new_page_title: {
        FR: 'Votre titre ICI',
        EN: 'Your title HERE',
    },
    new_page_description: {
        FR: 'Votre description ICI',
        EN: 'Your description HERE',
    },
    page_title: {
        FR: 'Page Administrative',
        EN: 'Admin Page',
    },
    unavailable: {
        FR: 'Pages indisponibles',
        EN: 'No pages available',
    },
    years: {
        FR: 'Années visées',
        EN: 'Select years',
    },
};

export const ThematiquePromptsTranslations: PromptsTranslations = {
    page_title: {
        FR: 'Thématiques',
        EN: 'Themes',
    },
};

export const RecherchePromptsTranslations: PromptsTranslations = {
    page_title: {
        FR: 'Recherche Académique',
        EN: 'Academic Search',
    },
};

export const RepertoirePromptsTranslations: PromptsTranslations = {
    search_box_title: {
        FR: 'Liste des entreprises familiales recensées au Québec',
        EN: 'List of all the family companies in Quebec',
    },
    div1_sentence: {
        FR: "NOMBRE D' ENTREPRISES FAMILIALES RÉPERTOIRIÉES",
        EN: 'NUMBER OF FAMILY COMPANIES LISTED',
    },
    div1_descriptive: {
        FR: 'en 2023 au Québec',
        EN: 'in 2023 in Quebec',
    },

    data_card3_title: {
        FR: 'Rechercher une Entreprise',
        EN: 'Search for a company',
    },
    graph_description: {
        FR: 'des entreprises privées au Québec sont familiales',
        EN: 'of the private companies in Quebec are family owned',
    },
    DAT_IMMAT: {
        FR: "Date d'immatriculation",
        EN: 'Immatriculation date',
    },
    DAT_CONSTI: {
        FR: 'Date de constitution',
        EN: 'Constitution date',
    },
    CAE: {
        FR: 'Code CAE',
        EN: 'CAE code',
    },
    ADR1: {
        FR: 'Adresse civile',
        EN: 'Civic adress',
    },
    ADR2: {
        FR: 'Ville',
        EN: 'City',
    },
    ADR4: {
        FR: 'Code postal',
        EN: 'Postal code',
    },
    NB_EMPLO: {
        FR: "Nombre d'employés",
        EN: 'Number of employees',
    },
    NOM_ASSUJ: {
        FR: "Nom de l'entrprise",
        EN: 'Company Name',
    },
    LONG: {
        FR: 'Longitude',
        EN: 'Longitude',
    },
    LAT: {
        FR: 'Latitude',
        EN: 'LAtitude',
    },
    NEQ: {
        FR: 'NEQ',
        EN: 'NEQ',
    },
    infoLegales: {
        FR: 'Informations Légales',
        EN: 'Legal information',
    },
    infosGenerales: {
        FR: 'Informations Générales',
        EN: 'General Information',
    },
    adresse: {
        FR: 'Adresse Civile',
        EN: 'Civic Adress',
    },
    coordonnesGeographiques: {
        FR: 'Coordonnées Géographiques',
        EN: 'Geographic Coordinates',
    },
    addCompany: {
        FR: 'Ajouter une Entreprise',
        EN: 'Add a Company',
    },
    requiered: {
        FR: '*requis',
        EN: '*requiered',
    },
    subscribe: {
        FR: 'Inscrivez votre entreprise',
        EN: 'Submit your company',
    },
};

export const FournisseurPromptsTranslations: PromptsTranslations = {
    fournisseur_box_title: {
        FR: 'Liste et profils des accompagnateurs',
        EN: 'List and profiles of all service providers',
    },

    rechercher_fournisseur: {
        FR: 'Rechercher un Accompagnateur',
        EN: 'Search for a Service Provider',
    },

    region: {
        FR: 'Régions',
        EN: 'Regions',
    },

    service: {
        FR: 'Services Offerts',
        EN: 'Offered Services',
    },

    page_title: {
        FR: 'Accompagnateurs',
        EN: 'Service Providers',
    },
    prenom: {
        FR: 'Prénom',
        EN: 'Name',
    },
    nom: {
        FR: 'Nom de Famille',
        EN: 'Last Name',
    },
    entreprise: {
        FR: 'Entreprise',
        EN: 'Comapny',
    },
    titre: {
        FR: 'Titre de Poste',
        EN: 'Title',
    },
    courriel: {
        FR: 'Courriel',
        EN: 'Email',
    },
    telephone: {
        FR: 'Téléphone',
        EN: 'Phone number',
    },
    toutes_regions: {
        FR: 'Toutes les régions',
        EN: 'All regions',
    },
    subscribe: {
        FR: 'Soumettez votre profile',
        EN: 'Submit your profile',
    },
};

export const ConnexionDialogPromptsTranslations: PromptsTranslations = {
    disconnect_confirmation: {
        FR: 'Êtes-vous sur de vouloir vous déconnecter ?',
        EN: 'Are you sure you want to disconnect ?',
    },
};

export const SideBarPromptsTranslations: PromptsTranslations = {
    repertoire: {
        FR: 'Répertoire',
        EN: 'Repertory',
    },
    suppliers: {
        FR: 'Accompagnateurs',
        EN: 'Service Providers',
    },
    thematiques: {
        FR: 'Thématiques',
        EN: 'Themes',
    },
    acad_search: {
        FR: 'Recherche Académique',
        EN: 'Academic Research',
    },
    a_propos: {
        FR: 'À Propos',
        EN: 'About',
    },
    admin: {
        FR: 'Admin',
        EN: 'Admin',
    },
    connexion: {
        FR: 'Se Connecter',
        EN: 'Connect',
    },
    deconnexion: {
        FR: 'Se Déconnecter',
        EN: 'Disconnect',
    },
};
