// Working Witth CSV-Parse files in NODE
// Trying to pulling in Kepler_Data from CSV


const { parse } = require('csv-parse');
const fs = require('fs');
const { resourceLimits } = require('worker_threads');

const results = [];


fs.createReadStream('kepler_data.csv')
// Piping CSV files from LEFT to RIGHT in a readable FORMAT
// Ignore comment # || ***provide readable data back in COLUMNS || 
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        results.push(data);

    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(results);
        console.log('done');
    });

// parse()