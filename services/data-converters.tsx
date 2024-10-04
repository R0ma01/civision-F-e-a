export const dataConverters = {
    annee_fondation: convertYearToDecadeString,
    'actionnaires.nombre': convertNombreActionnairesToString,
    'succession.plan': convertSuccessionPlan,
    'succession.accompagnement_type': convertTypeAccompagnement,
    revenus_rang: convertRevenusRang,
    'repondant.niveau_etude': convertEducationLevel,
    'repondant.annees_travaillees': convertAnneesTravaillees,
    secteur_activite: convertSecteurActivite,
    femmes_direction: convertPercentageToStep,

    // Add other mappings here if required in the future
};

// Recursive function to access nested properties
export function getNestedValue(obj: any, path: string) {
    const keys = path.split('.');
    const result = keys.reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : null),
        obj,
    );

    // If the result is an empty array, return null
    if (Array.isArray(result) && result.length === 0) {
        return null;
    }

    return result;
}

export function convertYearToDecadeString(yearIn: string): string {
    const year: number = parseInt(yearIn, 10); // Ensure year is a number

    let decadeGroup = 'Pas de réponse';

    if (isNaN(year)) {
        return decadeGroup; // or a default value if you prefer
    }

    if (year < 1900) {
        decadeGroup = 'avant 1900';
    } else if (year < 1961) {
        decadeGroup = '1900 à 1960';
    } else if (year <= 1970) {
        decadeGroup = '1961 à 1970';
    } else if (year <= 1980) {
        decadeGroup = '1971 à 1980';
    } else if (year <= 1990) {
        decadeGroup = '1981 à 1990';
    } else if (year <= 2000) {
        decadeGroup = '1991 à 2000';
    } else if (year <= 2010) {
        decadeGroup = '2001 à 2010';
    } else {
        decadeGroup = 'après 2010';
    }

    return decadeGroup;
}
export function convertLienParenteToString(
    item: number | string,
): string | null {
    // If item is falsey (null, undefined, 0, "", etc.) but not the number 0, return null
    // Inside convertNombreActionnairesToString
    if (!item && item !== 0) {
        return null;
    }

    switch (item) {
        case '01':
            return 'Grand-Père/Grand-Mère';
        case '02':
            return 'Père/Mère';
        case '03':
            return 'Oncle/Tante';
        case '04':
            return 'Cousin(e)';
        case '05':
            return 'Frère/Soeur';
        case '06':
            return 'Fils/Fille';
        case '07':
            return 'Autre';
        default:
            return 'Pas de réponse';
    }
}

export function convertNombreActionnairesToString(
    item: number | string,
): string | null {
    // If item is falsey (null, undefined, 0, "", etc.) but not the number 0, return null
    // Inside convertNombreActionnairesToString
    if (!item && item !== 0) {
        return null;
    }

    switch (item) {
        case 0:
            return '0';
        case 1:
            return '1';
        case 2:
            return '2';
        case 3:
            return '3';
        case 4:
            return '4';
        case '0':
            return '0';
        case '1':
            return '1';
        case '2':
            return '2';
        case '3':
            return '3';
        case '4':
            return '4';
        case '5+':
            return '5+';
        default:
            return '5+';
    }
}

export function convertSuccessionPlan(item: string): string | null {
    // Defining nombre_groupe
    let plan_group = null;
    if (item) {
        switch (item) {
            case '1':
                plan_group = 'Plan informel';
                break;
            case '2':
                plan_group = 'Plan formel';
                break;
            case '3':
                plan_group = 'Plan inexistant';
                break;

            case 'Plan informel':
                plan_group = 'Plan informel';
                break;
            case 'Plan formel':
                plan_group = 'Plan formel';
                break;
            case 'Plan inexistant':
                plan_group = 'Plan inexistant';
                break;

            default:
                plan_group = 'N/A';
                break;
        }
    }

    return plan_group;
}

export function convertTypeAccompagnement(item: string) {
    // Filter out null, undefined, or empty string values if item is an array
    if (Array.isArray(item)) {
        return item
            .filter((singleItem) => singleItem != null && singleItem !== '')
            .map((singleItem) => convertSingleAccompagnement(singleItem))
            .join(', ');
    }

    // If it's a string containing a comma, split it into an array, filter, and process each item
    if (typeof item === 'string' && item.includes(',')) {
        return item
            .split(', ')
            .filter((singleItem) => singleItem != null && singleItem !== '')
            .map((singleItem) => convertSingleAccompagnement(singleItem));
    }

    // If it's a single string, process it directly
    return convertSingleAccompagnement(item);
}

export function convertSingleAccompagnement(item: string): string {
    switch (item) {
        case '01':
            return 'Comptable';
        case '02':
            return 'Fiscaliste';
        case '03':
            return 'Coach';
        case '04':
            return 'Mentor';
        case '05':
            return "Professionel en relève d'entreprises";
        case '06':
            return 'Avocat';
        case '07':
            return 'Analyste financier';
        case '08':
            return 'Notaire';
        case '96':
            return 'Autre';
        case 'Comptable':
            return 'Comptable';
        case 'Fiscaliste':
            return 'Fiscaliste';
        case 'Coach':
            return 'Coach';
        case 'Mentor':
            return 'Mentor';
        case "Professionel en relève d'entreprise":
            return "Professionel en relève d'entreprises";
        case 'Avocat':
            return 'Avocat';
        case 'Analyste financier':
            return 'Analyste financier';
        case 'Notaire':
            return 'Notaire';
        case 'Autre':
            return 'Autre';

        default:
            return 'Autre';
    }
}
export function convertEducationLevel(level: string): string {
    switch (level) {
        case '0':
            return 'Secondaire';
        case '1':
            return "Certificat d'apprenti";
        case '2':
            return "Certificat d'un collège";
        case '3':
            return 'Certificat universitaire inférieur';
        case '4':
            return 'Baccalauréat';
        case '5':
            return 'Études supérieures';
        case '6':
            return 'Autre';
        case 'Secondaire':
            return 'Secondaire';
        case "Certificat d'apprenti":
            return "Certificat d'apprenti";
        case "Certificat d'un collège":
            return "Certificat d'un collège";
        case 'Certificat universitaire inférieur':
            return 'Certificat universitaire inférieur';
        case 'Baccalauréat':
            return 'Baccalauréat';
        case 'Études supérieures':
            return 'Études supérieures';
        case 'Autre':
            return 'Autre';
        default:
            return 'Autre'; // Assign all other values, including null, to "Other"
    }
}

export function convertRevenusRang(rang: number | string): string {
    switch (rang) {
        case 1:
            return 'Moins de 500 000 $';
        case 2:
            return '500 000 $ à 2 500 000 $';
        case 3:
            return '2 500 000 $ à 10 000 000 $';
        case 4:
            return '10 000 000 $ à 100 000 000 $';
        case 5:
            return 'Plus de 100 000 000 $';
        case 9:
            return 'Pas de réponse';
        case 'Moins de 500 000 $':
            return 'Moins de 500 000 $';
        case '500 000 $ à 2 500 000 $':
            return '500 000 $ à 2 500 000 $';
        case '2 500 000 $ à 10 000 000 $':
            return '2 500 000 $ à 10 000 000 $';
        case '10 000 000 $ à 100 000 000 $':
            return '10 000 000 $ à 100 000 000 $';
        case 'Plus de 100 000 000 $':
            return 'Plus de 100 000 000 $';
        case 'Pas de réponse':
            return 'Pas de réponse';
        default:
            return 'Pas de réponse'; // Assign all other values, including null, to "Other"
    }
}

export function convertAnneesTravaillees(yearIn: string): string | null {
    const year: number = parseInt(yearIn, 10); // Ensure year is a number

    let decadeGroup;

    if (isNaN(year)) {
        return null; // or a default value if you prefer
    }

    if (year < 10) {
        decadeGroup = '0 à 9 ans';
    } else if (year < 20) {
        decadeGroup = '10 à 19 ans';
    } else if (year < 30) {
        decadeGroup = '20 à 29 ans';
    } else if (year < 40) {
        decadeGroup = '30 à 39 ans';
    } else {
        decadeGroup = '40 ans ou plus';
    }

    return decadeGroup;
}

export function convertSecteurActivite(secteur: string | number): string {
    switch (secteur) {
        case 1:
            return 'Manufacture, fabrication et exploitation';
        case 2:
            return 'Financier';
        case 3:
            return 'Hébergement et hôtellerie';
        case 4:
            return "Technologies de l'information et logiciels";
        case 5:
            return 'Autres services';
        case 6:
            return 'Santé';
        case 7:
            return 'Environnement';
        case 8:
            return 'Autres';
        case 9:
            return 'Électronique et communications';
        case 10:
            return 'Logement';
        case 11:
            return 'Biotechnologie';
        case 12:
            return 'Construction';
        case 13:
            return 'Énergie';
        case 14:
            return 'Alimentation, agriculture et pêche';
        case 15:
            return 'Pharmaceutique';
        case 16:
            return 'Restaurantation';
        case 17:
            return 'Services professionels';
        case 18:
            return 'Vente de détail';
        case 19:
            return 'Entreposage, transport et distribution';
        case 96:
            return 'Pas de réponse';
        case 'Manufacture, fabrication et exploitation':
            return 'Manufacture, fabrication et exploitation';
        case 'Financier':
            return 'Financier';
        case 'Hébergement et hôtellerie':
            return 'Hébergement et hôtellerie';
        case "Technologies de l'information et logiciels":
            return "Technologies de l'information et logiciels";
        case 'Autres services':
            return 'Autres services';
        case 'Santé':
            return 'Santé';
        case 'Environnement':
            return 'Environnement';
        case 'Autres':
            return 'Autres';
        case 'Électronique et communications':
            return 'Électronique et communications';
        case 'Logement':
            return 'Logement';
        case 'Biotechnologie':
            return 'Biotechnologie';
        case 'Construction':
            return 'Construction';
        case 'Énergie':
            return 'Énergie';
        case 'Alimentation, agriculture et pêche':
            return 'Alimentation, agriculture et pêche';
        case 'Pharmaceutique':
            return 'Pharmaceutique';
        case 'Restaurantation':
            return 'Restaurantation';
        case 'Services professionels':
            return 'Services professionels';
        case 'Vente de détail':
            return 'Vente de détail';
        case 'Entreposage, transport et distribution':
            return 'Entreposage, transport et distribution';
        case 'Pas de réponse':
            return 'Pas de réponse';
        default:
            return 'Pas de réponse'; // Assign all other values, including null, to "Other"
    }
}

// Function to calculate the size of properties
const calculatePropertiesSize = (properties: any): number => {
    return Object.values(properties).reduce((size: number, value: any) => {
        if (value !== null && value !== undefined) {
            if (typeof value === 'object' && !Array.isArray(value)) {
                return size + calculatePropertiesSize(value);
            }
            return size + 1;
        }
        return size;
    }, 0);
};

// Function to normalize strings to ignore accents
export const normalizeString = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// Function to remove duplicates
export const removeDuplicates = (features: any) => {
    const seen = new Map();

    features.forEach((feature: any) => {
        const normalizedNom = normalizeString(
            feature.properties?.nom?.toLowerCase() || '',
        );
        const key = `${normalizedNom}_${feature.geometry.coordinates.join(',')}`;
        const currentSize = calculatePropertiesSize(feature.properties);

        if (!seen.has(key)) {
            seen.set(key, feature);
        } else {
            const existingFeature = seen.get(key);
            const existingSize = calculatePropertiesSize(
                existingFeature.properties,
            );

            if (currentSize > existingSize) {
                seen.set(key, feature);
            }
        }
    });

    return Array.from(seen.values());
};

export function convertPercentageToStep(percentageWomen: string): string {
    const percentage: number = parseInt(percentageWomen, 10); // Ensure year is a number

    let percentageGroup;

    if (isNaN(percentage)) {
        return 'Pas de réponse'; // or a default value if you prefer
    }

    if (percentage < 10) {
        percentageGroup = 'Moins de 10%';
    } else if (percentage < 25) {
        percentageGroup = '10 à 25%';
    } else if (percentage <= 50) {
        percentageGroup = '25 à 50%';
    } else if (percentage <= 75) {
        percentageGroup = '50 à 75%';
    } else if (percentage <= 100) {
        percentageGroup = 'plus de 75%';
    } else {
        percentageGroup = 'Pas de réponse';
    }

    return percentageGroup;
}
