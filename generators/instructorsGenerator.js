const faker = require('faker');
const fs = require('fs')

function generateInstructors() {
  let instructors = [];

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
  ] //Pulled manually from https://nces.ed.gov/collegenavigator

  //creates 100 instructors
  const createInstructors = () => {
    for (let id = 1; id <= 100; id++) {
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

      let instructor = {
        id: id,
        firstName: faker.name.firstName(),
        middleInitial: faker.name.middleName().slice(0, 1).toUpperCase(),
        lastName: faker.name.lastName(),
        academicTitle: random < .2 ? 'Instructor'
          : random < .4 ? 'Associate Professor'
          : random < .85 ? 'Professor'
          : 'PhD',
        title: faker.name.title(),
        organization: schools[Math.floor(random * schools.length)],
        learners: Math.floor(random * 5000),
        courses: [],
        instructorAverageRating: Number.parseFloat(rating).toPrecision(2),
        numberOfRatings: Math.floor(rating * random * 2345)
      }
      instructors.push(instructor);
    }
  }

  //adds one primary instructor per course
  const addPrimaryInstructors = () => {
    for (let i = 1; i <= 100; i++) {
      let index = Math.floor(Math.random() * 40) + 1; //uses only first 40 instructors as primaryInstructor
      let courseObj = {
        courseNumber: i,
        isPrimaryInstructor: true
      };
      let filtered = instructors.filter((instructor) => instructor.id === index);
      let id = filtered[0].id;
      if (instructors[id + 1].courses.length < 4) { //assigns from 0 to 4 courses per instructor
        instructors[id + 1].courses.push(courseObj);
      } else {
        i--;
      }
    }
  }

  //assigns 0 to 3 assistant instructors per course, no min or max courses per assistant
  const addAssistantInstructors = () => {
    for (let courseNumber = 1; courseNumber <= 100; courseNumber++) {
      let numberOfAssistants = Math.floor(Math.random() * 4);
      let assistants = [];

      while (assistants.length < numberOfAssistants) {
        let assistantIndex = Math.floor(Math.random() * 61) + 39;
        if (!assistants.includes(assistantIndex)) { //prevents the same instructor from being added twice to the same course
          assistants.push(assistantIndex);
        }
      }
      for (let i = 0; i < assistants.length; i++) {
        let assistantObject = {
          courseNumber,
          isPrimaryInstructor: false
        }
        instructors[assistants[i]].courses.push(assistantObject);
      }
    }
  }

  createInstructors();
  addPrimaryInstructors();
  addAssistantInstructors();
  return instructors;
}

let dataObj = generateInstructors();

fs.writeFileSync('../data/instructors.json', JSON.stringify(dataObj, null, '\t'));