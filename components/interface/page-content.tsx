import { Traductions } from '../enums/language';
import DataCardContent from './data-card-content';

export default interface PageContent {
    _id: string;
    title: Traductions;
    description: Traductions;
    cards: DataCardContent[];
    backgroundImage: string;
    visible: boolean;
}
