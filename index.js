// Working Witth CSV-Parse files in NODE
// Trying to pulling in Kepler_Data from CSV


const { parse } = require('csv-parse');
const fs = require('fs');
// const { resourceLimits } = require('worker_threads');

const results = [];

const habitablePlanets = [];

function isHabitablePlanet(planet){
    return planet['koi_disposition'] === 'CONFIRMED'
     && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
     && planet['koi_prad'] < 1.6;
}


fs.createReadStream('kepler_data.csv')
// Piping CSV files from LEFT to RIGHT in a readable FORMAT
// Ignore comment # || ***provide readable data back in COLUMNS || 
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)){
            habitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
})
    .on('end', () => {
        console.log(habitablePlanets.map((planet) =>{
            return planet['kepler_name']
                }))
        console.log(`${habitablePlanets.length} habitable planets found!`);
    });

// parse()