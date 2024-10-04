export interface StudyDataPoint {
    _id: string;
    coordonnees: {
        longitude: number;
        latitude: number;
    };
}
export interface StudyDataPopUp {
    _id: string;
    coordonnees: {
        longitude: number;
        latitude: number;
    };
    annee_fondation: number;
    secteur_activite: number;
    nom_entreprise: string;
    taille_entreprise: string;
}
