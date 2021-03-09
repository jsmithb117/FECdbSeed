const mongoose = require('mongoose');
const syllabusesData = require('../../data/syllabuses.json');

let syllabusesInsert = () => {
  mongoose.connect('mongodb://localhost/syllabuses', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'syllabuses connection error'));
  db.once('open', () => {
    console.log('syllabuses connected to db');
  });

  const syllabusSchema = new mongoose.Schema({
    id: Number,
    weeks: [{
      weekNumber: Number,
      hoursToCompleteWeek: Number,
      title: String,
      description: String,
      videos: [{
        videoIndex: Number,
        videoTitle: String,
        videoLengthMinutes: Number,
        videoLengthSeconds: Number
      }],
      videosLength: Number,
      readings: [{
        readingIndex: Number,
        readingTitle: String,
        readingLengthMinutes: Number
      }],
      readingsLength: Number,
      exercises: [{
        exerciseIndex: Number,
        exerciseTitle: String,
        exerciseLengthMinutes: String
      }],
      exercisesLength: Number
    }]
  });

  const Syllabus = mongoose.model('Syllabus', syllabusSchema);

  Syllabus.insertMany(syllabusesData, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('Syllabus success');
    process.exit();
  })
};

syllabusesInsert();