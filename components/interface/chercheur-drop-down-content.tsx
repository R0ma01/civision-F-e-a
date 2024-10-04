import { AlbumDataFields } from '@/components/enums/data-types-enum';
import { GraphBoxType } from '../enums/graph-box-enum';

export interface ChercheurDropdownItem {
    label: string;
    selected: boolean;
    graphType: GraphBoxType;
    donnees: AlbumDataFields[];
}

export interface ChercheurDropdownSection {
    label: string;
    items: (ChercheurDropdownItem | ChercheurDropdownSection)[];
}
