const Papa = require('papaparse');
const fs = require('fs');

function loadCsvData() {
    const csvFilePath = './public/data/contentDataBase.csv'; 
    const csvFileContent = fs.readFileSync(csvFilePath, 'utf-8');

    const results = Papa.parse(csvFileContent, {
        header: true,
        skipEmptyLines: true,
    });

    return results.data;
}

const data = loadCsvData();
console.log(data);
