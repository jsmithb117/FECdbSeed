const mongoose = require('mongoose');
const { Schema } = mongoose;

const testimonialsSchema = new Schema({
  id: Number,
  name: String,
  testimonialText: String
});