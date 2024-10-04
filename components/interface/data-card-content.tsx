import { DataCardType } from '@/components/enums/data-card-type-enum';
import { Traductions } from '@/components/enums/language';

import { ChercheurDropdownItem } from './chercheur-drop-down-content';
import GraphBoxContent from './graph-box-content';

export default interface DataCardContent {
    type: DataCardType;
    title: Traductions;
    description: Traductions;
    graphData: GraphBoxContent[];
    searchBox?: any;
    chercheurDropdownOnCLick?: (item: ChercheurDropdownItem) => void;
}
