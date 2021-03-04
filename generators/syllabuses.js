const faker = require('faker');
const fs = require('fs')

function generateSyllabus() {
  let syllabuses = [];

  //creates syllabuses for each of the 100 courses
  for (let id=1; id <= 100; id++) {
    var numberOfWeeks = Math.ceil(Math.random() * 4);
    let hoursToCompleteCourse = 0;
    let weeks = [];
    let starters = [
      'Basics of',
      'Steps to',
      'Ethics of',
      'Skills for',
      'What is',
      'Building',
      'Types of'
    ]

    //creates 1 to 4 weeks per course
    for (let weekNumber = 1; weekNumber <= numberOfWeeks; weekNumber++) {
      let starter = starters[Math.floor(Math.random() * starters.length + 1)];
      let numberOfFakeWords = Math.ceil(Math.random() * 4);
      let weekTitle = ' '
      let numberOfVideos = Math.ceil(Math.random() * 2);
      let videos = [];
      let videosSeconds = 0;
      let videosLength = 0; //in minutes
      let numberOfReadings = Math.ceil(Math.random() * 3);
      let readings = [];
      let readingsLength = 0; //in minutes
      let numberOfExercises = Math.ceil(Math.random() * 4);
      let exercises = [];
      let exercisesLength = 0; //in minutes
      let minutesToComplete = 0;
      let hoursToCompleteWeek;

      for (let i = 0; i <= numberOfFakeWords; i++) {
        weekTitle = weekTitle.concat(faker.random.word(), ' ');
      }

      //creates 1 to 3 videos per week
      for (let videoIndex = 0; videoIndex <= numberOfVideos; videoIndex++) {
        let videoTitle = faker.company.catchPhraseAdjective();
        videoTitle = videoTitle.charAt(0).toUpperCase() + videoTitle.slice(1).concat(' ', faker.hacker.verb(), ' ', faker.hacker.noun());

        let video = {
          videoIndex,
          videoTitle,
          videoLengthMinutes: Math.ceil(Math.random() * 90),
          videoLengthSeconds: Math.ceil(Math.random() * 58)
        };
        videos.push(video);
        videosSeconds += video.videoLengthSeconds;
        videosLength += video.videoLengthMinutes;
      }
      videosLength += (videosSeconds -= videosSeconds % 60) / 60;

      //creates 1 to 4 readings per week
      for (let readingIndex = 0; readingIndex <= numberOfReadings; readingIndex++) {
        let readingLengthMinutes = Math.ceil(Math.random() * 75);
        let readingTitle = '';
        for (let i = 0; i <= numberOfFakeWords; i++) {
          readingTitle = readingTitle.concat(faker.random.word(), ' ');
        }
        readingTitle = readingTitle.trimEnd();
        let reading = {
          readingIndex,
          readingTitle,
          readingLengthMinutes
        }
        readings.push(reading);
        readingsLength += readingLengthMinutes;
      }

      //creates 1 to 5 exercises per week
      for (let exerciseIndex = 0; exerciseIndex < numberOfExercises; exerciseIndex++) {
        let starterIndex = Math.floor(Math.random() * starters.length);
        let exerciseTitle = starters[starterIndex].concat(' ', faker.hacker.verb(), ' ', faker.hacker.adjective(), ' ', faker.hacker.noun());
        let exerciseLengthMinutes = Math.ceil(Math.random() * 75);
        let exercise = {
          exerciseIndex,
          exerciseTitle,
          exerciseLengthMinutes
        }
        exercises.push(exercise);
        exercisesLength += exerciseLengthMinutes;
      }

      //calculate times
      minutesToComplete += videosLength;
      minutesToComplete += readingsLength;
      minutesToComplete += exercisesLength;
      if (minutesToComplete % 60 < 30) {
        minutesToComplete -= minutesToComplete % 60;
      } else {
        minutesToComplete += minutesToComplete % 60;
      }
      hoursToCompleteWeek = Math.floor(minutesToComplete / 60);

      //bring together all elements of a weekly syllabus and push
      let weekSyllabus = {
        weekNumber,
        hoursToCompleteWeek,
        title: weekTitle.trimEnd(),
        description: faker.lorem.paragraph(),
        videos,
        videosLength,
        readings,
        readingsLength,
        exercises,
        exercisesLength
      }
      weeks.push(weekSyllabus);
      hoursToCompleteCourse += hoursToCompleteWeek;
    }

    //combines syllabus elements for each course and pushes to syllabuses
    let syllabus = {
      id,
      weeks,
      hoursToCompleteCourse
    }
    syllabuses.push(syllabus);
  }

  return syllabuses;
}

let dataObj = generateSyllabus();

fs.writeFileSync('../data/syllabuses.json', JSON.stringify(dataObj, null, '\t'));