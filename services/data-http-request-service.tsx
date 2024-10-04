import { StudyOrigin, StudyYears } from '@/components/enums/data-types-enum';
import { APIPaths } from '@/components/enums/page-api-paths-enum';
import {
    ChartData,
    ChartDataMultipleFileds,
} from '@/components/interface/chart-data';
import {
    EntreprisePointData,
    MapChloroplethePointData,
    MapClusterPointData,
} from '@/components/interface/point-data';

import axios from 'axios';

export const GraphDataHttpRequestService = {
    getAllStudyData: getAllStudyData,
    getAllRepertoireData: getAllRepertoireData,
    getAllIndexVoletAData: getAllIndexeAData,
    getAllIndexVoletBData: getAllIndexeBData,
    getChartData: getChartData,
    getEntrepriseInformation: getEntrepriseInformation,
    getLengthRepertoireData: getLengthRepertoireData,
};

async function getAllStudyData(
    filters: Record<string, any>,
    year: StudyYears,
): Promise<MapChloroplethePointData[]> {
    try {
        const response = await axios.get(APIPaths.MAP_GET_ALL_STUDY, {
            params: {
                filters: JSON.stringify(filters),
                year: year,
            },
        });
        return response.data.points;
    } catch (error: any) {
        console.error(
            'Error fetching points:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function getAllRepertoireData(
    filters: Record<string, any>,
): Promise<MapClusterPointData[]> {
    try {
        const response = await axios.get(APIPaths.MAP_GET_ALL_REPERTOIRE, {
            params: {
                filters: JSON.stringify(filters),
            },
        });

        return response.data.points;
    } catch (error: any) {
        console.error(
            'Error fetching points:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function getLengthRepertoireData(): Promise<number> {
    try {
        const response = await axios.get(APIPaths.LENGTH_REPERTOIRE);

        return response.data.length;
    } catch (error: any) {
        console.error(
            'Error fetching points:',
            error.response?.data?.error || error.message,
        );
    }
    return 0;
}

async function getAllIndexeAData(
    filters: Record<string, any>,
    year: StudyYears,
): Promise<MapChloroplethePointData[]> {
    try {
        const response = await axios.get(APIPaths.MAP_GET_ALL_INDEXEA, {
            params: {
                filters: JSON.stringify(filters),
                year: year,
            },
        });

        return response.data.points;
    } catch (error: any) {
        console.error(
            'Error fetching points:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}
async function getAllIndexeBData(
    filters: Record<string, any>,
    year: StudyYears,
): Promise<MapChloroplethePointData[]> {
    try {
        const response = await axios.get(APIPaths.MAP_GET_ALL_INDEXEB, {
            params: {
                filters: JSON.stringify(filters),
                year: year,
            },
        });

        return response.data.points;
    } catch (error: any) {
        console.error(
            'Error fetching points:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function getChartData(
    donnes: any[],
    filters: Record<string, any>,
    dataOrigin: StudyOrigin,
    year: StudyYears,
): Promise<ChartData[] | ChartDataMultipleFileds[]> {
    try {
        let response = { data: { chartData: [] } };

        if (dataOrigin === StudyOrigin.INDEX_VOLETA) {
            response = await axios.get(APIPaths.GRAPH_GET_DATA_VOLETA, {
                params: {
                    donnes: JSON.stringify(donnes),
                    filters: JSON.stringify(filters),
                    year: year,
                },
            });
        } else if (dataOrigin === StudyOrigin.INDEX_VOLETB) {
            response = await axios.get(APIPaths.GRAPH_GET_DATA_VOLETB, {
                params: {
                    donnes: JSON.stringify(donnes),
                    filters: JSON.stringify(filters),
                    year: year,
                },
            });
        } else {
            response = await axios.get(APIPaths.GRAPH_GET_DATA_ALBUM, {
                params: {
                    donnes: JSON.stringify(donnes),
                    filters: JSON.stringify(filters),
                    year: year,
                },
            });
        }

        return response.data.chartData;
    } catch (error: any) {
        console.error(
            'Error fetching chartData:',
            error.response?.data?.error || error.message,
        );
    }
    return [];
}

async function getEntrepriseInformation(
    id: string,
): Promise<EntreprisePointData> {
    try {
        const response = await axios.get(APIPaths.MAP_GET_ENTREPRISE, {
            params: {
                id: id,
            },
        });
        return response.data.entreprise;
    } catch (error: any) {
        console.error(
            'Error fetching entreprise:',
            error.response?.data?.error || error.message,
        );
    }
    return undefined as unknown as EntreprisePointData;
}
