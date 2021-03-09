const faker = require('faker');
const fs = require('fs');
const instructors = require('../data/instructors.json');
const offeredBysData = require('../data/offeredBys.json');


  const generateImages = () => {
    let images = [];
    let offeredBys = ['DeepLearning', 'EURA', 'IBM', 'Illinois', 'Penn', 'UVA'];

    //creates instructors data from instructors.json for image documents
    let primaryInstructorsObj = {}; //{courseNumber: primaryInstructor.id}
    let additionalInstructorsObj = {};//{courseNumber: [additionalInstructor1.id, additionalInstructor2.id...]}
    for (let i = 1; i <= 100; i++) {
      additionalInstructorsObj[i] = [];
    }
    for (let instructor of instructors) {
      for (let i = 0; i < instructor.courses.length; i++) {
        if (instructor.courses[i].isPrimaryInstructor) {
          primaryInstructorsObj[instructor.courses[i].courseNumber] = instructor.id
        } else {
          additionalInstructorsObj[instructor.courses[i].courseNumber].push(instructor.id);
        }
      }
    }

    //creates 100 image documents
    for (let id = 1; id <= 100; id++) {

      //create offeredBys index
      let offeredBy = Math.floor(Math.random() * offeredBys.length);
      offeredBysData[id - 1] = offeredBys[offeredBy]; //changes 'offeredBysData', I should have generated this data in offeredBys.js and imported it here.  It'll do the job.

      //builds additionalInstructors array for each course
      let additionalInstructors = [];
      for (let i = 0; i < additionalInstructorsObj[id].length; i++) {
        let URL = {
          instructorId: additionalInstructorsObj[id][i],
          instructorImage: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/instructors/${additionalInstructorsObj[id][i]}.jpg`
        }
        additionalInstructors.push(URL);
      }

      //assigns 3 of 9 testimonials to each course
      let testimonialsArray = [];
      while (testimonialsArray.length < 3) {
        let random = Math.ceil(Math.random() * 9);
        if (!testimonialsArray.includes(random)) {
          testimonialsArray.push(random);
        }
      }
      let testimonial1Id = testimonialsArray[0];
      let testimonial2Id = testimonialsArray[1];
      let testimonial3Id = testimonialsArray[2];

      let testimonial1Image = `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/testimonials/${testimonialsArray[0]}.jpg`;
      let testimonial2Image = `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/testimonials/${testimonialsArray[1]}.jpg`;
      let testimonial3Image = `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/testimonials/${testimonialsArray[2]}.jpg`;

      //brings together each 'image' then pushes to images
      let image = {
        id,
        offeredBy,
        offeredByAbout: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/offeredByAbouts/${offeredBys[offeredBy]}About.png`,
        offeredByMain: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/offeredByAbouts/${offeredBys[offeredBy]}Main.png`,
        primaryInstructor: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/instructors/${primaryInstructorsObj[id]}.jpg`,
        additionalInstructors,
        testimonial1Image,
        testimonial1Id,
        testimonial2Image,
        testimonial2Id,
        testimonial3Image,
        testimonial3Id,
        courseIcon: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/courseIcons/${id}.png`
      };
      images.push(image);
    }
    return images;
  }

  let data = generateImages();

  fs.writeFileSync('../data/images.json', JSON.stringify(data, null, '\t'));