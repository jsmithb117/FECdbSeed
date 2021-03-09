const mongoose = require('mongoose');
const testimonialsData = require('../../data/testimonials.json');

let testimonialsInsert = () => {
  mongoose.connect('mongodb://localhost/instructors', { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'testimonials connection error'));
  db.once('open', () => {
    console.log('testimonials connected to db');
  });

  const testimonialSchema = new mongoose.Schema({
    id: Number,
    name: String,
    testimonialText: String
  });

  const Testimonial = mongoose.model('Testimonial', testimonialSchema);

  Testimonial.insertMany(testimonialsData, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('Testimonials success');
    process.exit();
  })
};

testimonialsInsert();