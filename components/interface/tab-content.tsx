import { StudyOrigin, StudyYears } from '../enums/data-types-enum';
import { Traductions } from '../enums/language';
import DataCardContent from './data-card-content';

export interface TabContent {
    tabType: StudyOrigin;
    visible: boolean;
    years: StudyYears[];
    description: Traductions;
    cards: DataCardContent[];
}
//some compoennt

export interface YearTab {}
