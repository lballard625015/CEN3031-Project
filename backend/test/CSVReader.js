const fs = require('fs');
const path = require('path');

//Function to read from a csv file
function readCSV(filePath) {

    fs.readFile(filePath, 'utf8', (err, data) => {//read the csv file in using plain text
        if (err) {
            console.error('Error reading the CSV file:', err);
            return;
        }

        //wherever there are newlines, thats a new row so split it up
        const rows = data.split('\n').map(row => row.trim()).filter(row => row);

        //Get the header information
        const headers = rows[0].split(',');  //Assuming the csv data is separated by commas
        const results = [];

        //For each row, not the header
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i].split(','); //Split the row into columns
            let rowData = {};

            //Create a map mapping the header to its row value
            for (let j = 0; j < headers.length; j++) {
                rowData[headers[j]] = row[j];
            }
            //Add the results to the array
            results.push(rowData);
        }

        //Now results should have all the csv data
        console.log('CSV Data:', results);//Print it out for testing
    });
}

const filePath = path.join(directory, 'dataset.csv');//Edit to match where we are reading the csv from

readCSV(filePath);//Read the csv
