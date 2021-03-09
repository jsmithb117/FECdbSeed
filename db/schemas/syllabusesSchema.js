const mongoose = require('mongoose');
const { Schema } = mongoose;

const syllabusesSchema = new Schema({
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