export interface EntreprisePointData {
    _id: string;
    coords: number[];
    nom: string;
    adresse: string;
    secteur_activite: string;
    taille_entreprise: string;
}

export interface MapClusterPointData {
    _id: string;
    nom: string;
    coords: number[];
}

export interface MapChloroplethePointData {
    _id: string;
    region: number;
}

export interface FournisseurPointData {
    _id: string;
    nom: string;
    regions: string[];
    secteurs: string[];
    contact: {
        email: string;
        telephone: string;
    };
}
