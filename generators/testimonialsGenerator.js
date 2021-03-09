const faker = require('faker');
const fs = require('fs')

//creates 9 testimonials
function generateTestimonials() {
  let testimonials = [];

  for (let id=1; id <= 9; id++) {
    let testimonial = {
      id,
      name: faker.name.firstName().concat(' ', faker.name.lastName().slice(0,1), '.'),
      testimonialText: faker.lorem.paragraph()
    }
    testimonials.push(testimonial);
  }
  return testimonials;
}

let dataObj = generateTestimonials();

fs.writeFileSync('../data/testimonials.json', JSON.stringify(dataObj, null, '\t'));