const mongoose = require('mongoose');
const instructorsData = require('../../data/instructors.json');

let instructorsInsert = () => {
  mongoose.connect('mongodb://localhost/instructors', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'instructors connection error'));
  db.once('open', () => {
    console.log('instructors connected to db');
  });

  const instructorSchema = new mongoose.Schema({
    id: Number,
    firstName: String,
    middleInitial: String,
    lastName: String,
    academicTitle: String,
    title: String,
    organization: String,
    learners: Number,
    courses: [{
      courseNumber: Number,
      isPrimaryInstructor: Boolean
    }],
    instructorAverageRating: String,
    numberOfRatings: Number
  });

  const Instructor = mongoose.model('Instructor', instructorSchema);

  Instructor.insertMany(instructorsData, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('Instructors success');
    process.exit();
  })
};

instructorsInsert();