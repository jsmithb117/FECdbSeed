const faker = require('faker');
const fs = require('fs')

function generateTestimonials() {
  let testimonials = [];


  for (let id=1; id <= 100; id++) {
    let name = faker.name.firstName().concat(faker.name.lastName().slice(0,1), '.');
    let testimonial = {
      name: name,
      testimonial: faker.lorem.paragraph()
    }
    testimonials.push(testimonials);
  }
  console.log(testimonials);
  return testimonials;
}

let dataObj = generateTestimonials();

fs.writeFileSync('offeredBys.json', JSON.stringify(dataObj));