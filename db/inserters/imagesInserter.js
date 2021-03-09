const mongoose = require('mongoose');
const imagesData = require('../../data/images.json');

let imagesInsert = () => {
  mongoose.connect('mongodb://localhost/images', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'images connection error'));
  db.once('open', () => {
    console.log('images connected to db');
  });

  const imageSchema = new mongoose.Schema({
    id: Number,
    offeredBy: Number,
    offeredByAbout: String,
    offeredByMain: String,
    primaryInstructor: String,
    additionalInstructors: [{
      instructorId: Number,
      instructorImage: String
    }],
    testimonial1Image: String,
    testimonial1Id: Number,
    testimonial2Image: String,
    testimonial2Id: Number,
    testimonial3Image: String,
    testimonial3Id: Number,
    courseIcon: String
  });

  const Image = mongoose.model('Image', imageSchema);

  Image.insertMany(imagesData, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('Images success');
    process.exit();
  })
};

imagesInsert();