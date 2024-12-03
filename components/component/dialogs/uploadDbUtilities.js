import axios from 'axios';
import { parseXLSXFile, parseJSONFile, parseCSVFile } from './parseFileData';

export const truncateFileName = (name, maxLength = 15) => {
    if (typeof name !== 'string') {
        console.error('Invalid filename:', name);
        return 'Invalid filename';
    }
    return name.length > maxLength ? name.slice(0, maxLength) + '...' : name;
};

export function createUploadDbChartList(variables, database_id) {
    const chartList = variables.map((variable) => ({
        chart: `${variable.title}*_${database_id}`,
        FR: variable.title,
        EN: variable.title,
        var: variable.var,
        type: variable.type,
    }));

    return {
        [`upload_database`]: chartList,
    };
}

export const startUploadProcess = async (
    filename,
    fileContent,
    setProgress,
    pollForStatus,
    setProcessStatus,
) => {
    try {
        const response = await axios.post(
            '/api/civia-db/upload-db',
            { filename: filename, fileContent: fileContent, type: 'file' },
            {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            },
        );

        if (response.status === 200) {
            console.log('starting the real upload process');
            pollForStatus(response.data.database_id);
        } else {
            throw new Error('File upload failed');
        }
    } catch (error) {
        console.error('Error during upload:', error);
        setProcessStatus('Failed');
        setProgress(0);

        return false;
    }

    return true;
};

export const startApiLoadProcess = async (
    name,
    url,
    setProgress,
    pollForStatus,
    setProcessStatus,
) => {
    try {
        const response = await axios.post(
            '/api/civia-db/upload-db',
            { url: url, name: name, type: 'api' },
            {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' },
            },
        );

        if (response.status === 200) {
            console.log('starting the real upload process');
            pollForStatus(response.data.database_id);
        } else {
            setProcessStatus('Failed');
            setProgress(0);
            throw new Error('File upload failed');
        }
    } catch (error) {
        console.error('Error during upload:', error);
        setProcessStatus('Failed');
        setProgress(0);

        return false;
    }

    return true;
};

export const pollForStatus = async (
    database_id,
    filename,
    fetchUploadedDatabases,
    setFile,
    POLL_INTERVAL,
    setProcessStatus,
) => {
    return new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(
                    '/api/civia-db/poll-analysis',
                    {
                        params: {
                            filename: filename,
                            database_id: database_id,
                        },
                    },
                );

                console.log('response', response);
                const { statut } = response.data;

                setProcessStatus(statut);

                if (statut === 'Done') {
                    await fetchUploadedDatabases(true);

                    clearInterval(interval);
                    setFile(null);
                    resolve();

                    return statut;
                } else if (
                    statut === 'Error' ||
                    statut === 'Failed' ||
                    statut === 'Not Found'
                )
                    throw new Error('Processing failed');
            } catch (error) {
                console.error('Error polling collection:', error);

                clearInterval(interval);
                setFile(null);
                setProcessStatus('Failed');
                reject(error);
            }
        }, POLL_INTERVAL);
    });
};

export const fetchUploadedDatabases = async (
    setIsRefreshing,
    setUploadedDbItems,
    forceRefresh = false,
) => {
    setIsRefreshing(true);
    const now = new Date().getTime();

    if (!forceRefresh) {
        setIsRefreshing(false);
    } else {
        try {
            const response = await axios.post('/api/civia-db/get-players');
            const databases = response.data.databases;

            setUploadedDbItems(databases);

            for (const database of databases) {
                for (const variable of database.civgeo_data.variables) {
                    const chartName = `${variable.title}*_${database._id}`;
                    const chartData = {
                        realm: database?.data_realm || 'canada',
                        source: 'user upload',
                        id: database._id,
                        chart: variable.title,
                        format: 'totals',
                        sort: 'desc',
                        options: ['compare'],
                        graphs: ['bar'],
                        decimals: 0,
                        visus: ['Nb'],
                        fetch: '/api/civia-db/get-var-data',
                        variable: variable.var,
                        type: variable.type,
                        unit: variable.unit || '',
                        enableIndicator: true,
                    };

                    console.log('chartData', chartData);
                    console.log('chartName', chartName);
                }
            }

            return now;
        } catch (error) {
            console.error('Error fetching uploaded databases:', error);
            return null;
        } finally {
            setIsRefreshing(false);
        }
    }
};

export const parseFile = async (file) => {
    if (
        file.type ===
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel'
    )
        return await parseXLSXFile(file);
    else if (file.type === 'application/json') {
        return await parseJSONFile(file);
    } else if (file.type === 'text/csv') {
        return await parseCSVFile(file);
    } else {
        throw new Error('Unsupported file type');
    }
};

export function serializeCharts(chartsObject, dictReferences) {
    return Object.entries(chartsObject)
        .map(([key, value]) => {
            const chartString = value
                .map((chart) => {
                    const labelsDictString = getLabelsDictString(
                        chart.labels.dict,
                        dictReferences,
                    );

                    const labelsString = `labels: { dict: ${labelsDictString}, path: "${chart.labels.path}" }`;

                    return `{
            realm: "${chart.realm}",
            source: "${chart.source}",
            chart: "${chart.chart}",
            format: "${chart.format}",
            options: ${JSON.stringify(chart.options, null, 2)},
            graphs: ${JSON.stringify(chart.graphs, null, 2)},
            periods: ${JSON.stringify(chart.periods, null, 2)},
            fetch: "${chart.fetch}",
            ${labelsString}, // Manually inserted labels string
            visus: ${JSON.stringify(chart.visus, null, 2)},
            sideBarLevel: "${chart.sideBarLevel}"
          }`;
                })
                .join(',\n');
            return `"${key}": [${chartString}]`;
        })
        .join(',\n');
}

function getLabelsDictString(dict, dictReferences) {
    const { labelsCanada, labelsFrance } = dictReferences;

    if (dict === labelsCanada) {
        return 'labelsCanada';
    } else if (dict === labelsFrance) {
        return 'labelsFrance';
    }
    return JSON.stringify(dict); // Fallback to stringify
}
