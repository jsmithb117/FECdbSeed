const faker = require('faker');
const fs = require('fs')

function generateOfferedBys() {
  let offeredBys = [];

  let schools = [
    "Alfred University",
    "Baylor University",
    "Centenary University",
    "Dallas Christian College",
    "East Carolina University",
    "Farmingdale State College",
    "Georgia Institute of Technology-Main Campus",
    "Hofstra University",
    "Indiana Institute of Technology",
    "Jewish Theological Seminary of America",
    "Keiser University-Ft Lauderdale",
    "Lewis University",
    "Marian University",
    "Northwestern State University of Louisiana",
    "Ohio State University",
    "Pacific Islands University",
    "Queens University of Charlotte",
    "Radford University",
    "Saint Mary's College of California",
    "Toccoa Falls College",
    "University of Central Arkansas",
    "Vincennes University",
    "Wright State University",
    "Xavier University",
    "Youngstown State University",
    "Zaytuna College"
  ] //From https://nces.ed.gov/collegenavigator

  for (let id=1; id <= 100; id++) {
    let random = Math.random();

    let offeredBy = {
      id,
      offeredByName: schools[Math.floor(random * schools.length)]
      //offeredByCourses needs to be completed later
    }
    offeredBys.push(offeredBy);
  }

  return offeredBys;
}

let dataObj = generateOfferedBys();

fs.writeFileSync('../data/offeredBys.json', JSON.stringify(dataObj, null, '\t'));