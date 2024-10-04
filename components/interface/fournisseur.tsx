import {
    SecteursGeographiques,
    ServiceOffert,
} from '@/components/enums/fournisseur-filter-enum';

import { FournisseurDataFields } from '@/components/enums/data-types-enum';

export interface Fournisseur {
    _id?: string;
    contact: {
        lastName: string;
        firstName: string;
        email: string;
        cellPhone: number;
        company: string;
        title: string;
        linkedIn: string;
    };
    [FournisseurDataFields.SECTEURS_GEOGRAPHIQUES]: SecteursGeographiques[];
    [FournisseurDataFields.SERVICES_OFFERTS]: ServiceOffert[];
    visible: boolean;
}
