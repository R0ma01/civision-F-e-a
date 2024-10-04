export interface ChartData {
    name: string;
    value: any;
}

export interface ChartDataMultipleFileds {
    name: string;
    [key: string]: number | string; // Allow string for 'name' and array for dynamic fields
}
