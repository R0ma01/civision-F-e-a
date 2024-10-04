import { CompanyInfo } from '@/components/interface/company';

const allData = 'toutes';

export function filterPredicate(filters: CompanyInfo, data: CompanyInfo) {
    if (
        filters.taille_entreprise !== allData &&
        filters.taille_entreprise !== data.taille_entreprise
    ) {
        return false;
    }
    // if (     FIX ME IN DATABASE TREATEMENT
    //     filterData.General.anneFondation !== allData &&
    //     filterData.General.anneFondation !== data.annee_fondation
    // ) {
    //     return false;
    // }
    if (
        filters.dirigeant?.generation !== allData &&
        filters.dirigeant?.generation !== data.dirigeant?.generation
    ) {
        return false;
    }
    // if ( FIX ME IN DATABASE TREATEMENT
    //     filterData.Avancee.Entreprise.region !== allData &&
    //     filterData.Avancee.Entreprise.region !== data.coordonnees?.region
    // ) {
    //     return false;
    // }
    if (
        filters.revenus_rang !== allData &&
        filters.revenus_rang !== data.revenus_rang
    ) {
        return false;
    }
    if (
        filters.revenus_rang !== allData &&
        filters.revenus_rang !== data.revenus_rang
    ) {
        return false;
    }
    if (
        filters.secteur_activite !== allData &&
        filters.secteur_activite !== data.secteur_activite
    ) {
        return false;
    }
    // if ( FIX MEEEEEEEE IN DATABASE TREATREMENT
    //     filterData.Avancee.Gouvernance.nombreActionnaire !== allData &&
    //     filterData.Avancee.Gouvernance.nombreActionnaire !==
    //         data.gouvernance.nombre_actionnaires
    // ) {
    //     return false;
    // }
    // if ( FIX MEEEEEEEE IN DATABASE TREATREMENT
    //     filterData.Avancee.Gouvernance.planSuccession !== allData &&
    //     filterData.Avancee.Gouvernance.planSuccession !==
    //         data.gouvernance.plan_succession
    // ) {
    //     return false;
    // }
    return true;
}
