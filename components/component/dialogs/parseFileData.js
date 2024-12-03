//----------------------------------------------------------------------------------------------
// XLSX parsing
//----------------------------------------------------------------------------------------------

import * as XLSX from 'xlsx';

export const parseXLSXFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            resolve(jsonData);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsBinaryString(file);
    });
};

//----------------------------------------------------------------------------------------------
// JSON parsing
//----------------------------------------------------------------------------------------------

export const parseJSONFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const jsonData = JSON.parse(e.target.result);
            resolve(jsonData);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
};

//----------------------------------------------------------------------------------------------
// CSV parsing
//----------------------------------------------------------------------------------------------

import Papa from 'papaparse';

export const parseCSVFile = async (file) => {
    console.log('i am called');
    console.log(file);
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            complete: (result) => {
                if (result.errors.length) {
                    // Handle errors here if needed
                    console.warn(
                        'There were errors parsing the CSV:',
                        result.errors,
                    );
                }
                resolve(result.data);
            },
            error: (err) => {
                console.error('Error parsing CSV:', err);
                reject(new Error('Error reading file'));
            },
            header: true,
            skipEmptyLines: true, // this will skip any empty lines in the csv
        });
    });
};
