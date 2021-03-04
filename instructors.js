const faker = require('faker');
const fs = require('fs')

function generateUsers() {
  let users = [];

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
    "	Xavier University",
    "Youngstown State University",
    "Zaytuna College"
  ] //From https://nces.ed.gov/collegenavigator

  for (let id=1; id <= 100; id++) {
    let bool;
    let random = Math.random();
    let rating = random;
    while (!bool) {
      if (rating < 3.9) {
        rating++;
      } else {
        bool = true;
      }
    }

    let user = {
      firstName: faker.name.firstName(),
      middleInitial: faker.name.middleName().slice(0,1).toUpperCase(),
      lastName: faker.name.lastName(),
      academicTitle: random < .4 ? 'Associate Professor'
        : random < .85 ? 'Professor'
        : 'PhD',
      title: faker.name.title(),
      organization: schools[Math.floor(random * schools.length)],
      learners: Math.floor(random * 5000),
      //courseNumbers needs to be completed later
      instructorAverageRating: Number.parseFloat(rating).toPrecision(2),
      numberOfRatings: Math.floor(rating * random * 2345)
    }
    users.push(user);
  }

  return users;
}

let dataObj = generateUsers();

fs.writeFileSync('instructors.json', JSON.stringify(dataObj, null, '\t'));