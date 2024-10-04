export interface CompanyInfo {
    CAE_FAMILLE: string | null;
    CAE_NAME: string | null;
    CAE_SECTION: string | null;
    CAE_SUBSECTION: string | null;
    COD_ACT_ECON_CAE: string | null;
    CodeScian: string | null;
    Cree_ou_repris: number | null;
    DAT_STAT_IMMAT: string | null;
    J_aurai_le_temps_de_démarrer_une_nouvelle_entreprise: number | null;
    J_aurai_le_temps_de_faire_du_bénévolat_travailler_pour_une_œuvre_caritative:
        | number
        | null;
    Je_continuerai_à_avoir_un_rôle_informel_auprès_des_entrepreneurs_qui_reprennent:
        | number
        | null;
    Je_n_ai_pas_l_intention_de_suivre_l_évolution_de_mon_entreprise_après_sa_vente_transfert:
        | number
        | null;
    NB_EMPLO: number | null;
    NEQ: string | null;
    QREP7r8: number | null;
    a_determiner: string | null;
    actionnaires: string | null;
    annee_fondation: number | null;
    autres_entreprises: string | null;
    continuite_familiale: string | null;
    coordonnees: {
        region: number;
        latitude: number;
        longitude: number;
    } | null;
    dirigeant: {
        sexe: string;
        age: string;
        generation: string;
    } | null;
    exports: string | null;
    femmes_direction_: string | null;
    gestion_familiale: string | null;
    gouvernance: string | null;
    imports: string | null;
    nom_entreprise: string | null;
    questionnaires: string | null;
    repondant: {
        niveau_etude: number;
    } | null;
    revenus_rang: string | null;
    secteur_activite: string | null;
    succession: {
        plan: number;
    } | null;
    taille_entreprise: string | null;
}
