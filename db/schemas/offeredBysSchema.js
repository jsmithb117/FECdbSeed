const mongoose = require('mongoose');
const { Schema } = mongoose;

const offeredBysSchema = new Schema({
  id: Number,
  offeredByName: String,
  offeredByDescription: String
});