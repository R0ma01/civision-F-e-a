import { Traductions } from '../enums/language';
import { TabContent } from './tab-content';

export default interface PageTabContent {
    _id?: string;
    title: Traductions;
    description: Traductions;
    tabs: TabContent[];
    backgroundImage: string;
    visible: boolean;
}
