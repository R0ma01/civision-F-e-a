import { AlbumDataFields } from '../enums/data-types-enum';
import { ChartData, ChartDataMultipleFileds } from './chart-data';

export interface ChartContent {
    donnees: AlbumDataFields[];
    data: (ChartData | ChartDataMultipleFileds)[];
    matchFields: any;
    totalData: number;
    median?: number;
    midPoint?: number;
    doNotSort?: boolean;
    multiple_mentions?: any;
    nonNullCount?: any;
    width?: number;
    smallerSize?: boolean;
    noWrap?: boolean;
}
