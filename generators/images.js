const faker = require('faker');
const fs = require('fs');
const instructors = require('../data/instructors.json');
const offeredBysData = require('../data/offeredBys.json');


  const generateImages = () => {
    let images = [];
    let offeredBys = ['DeepLearning', 'EURA', 'IBM', 'Illinois', 'Penn', 'UVA'];

    //creates instructors data from instructors.json for image documents
    let primaryInstructorsObj = {}; //{courseNumber: primaryInstructor.id}
    let additionalInstructorsObj = {};//{courseNumber: [additionalInstructor.id, ...]}
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
      offeredBysData[id - 1] = offeredBys[offeredBy];

      //build additionalInstructors array
      let additionalInstructors = [];
      for (let i = 0; i < additionalInstructorsObj[id].length; i++) {
        let URL = {
          instructorImage: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/instructors/${additionalInstructorsObj[id][i]}.jpg`
        }
        additionalInstructors.push(URL);
      }


      //testimonials, choose 3 images from:
      //1-9
      let testimonialsArray = [];
      while (testimonialsArray.length < 3) {
        let random = Math.ceil(Math.random() * 9);
        if (!testimonialsArray.includes(random)) {
          testimonialsArray.push(random);
        }
      }
      let testimonial1 = `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/testimonials/${testimonialsArray[0]}.jpg`;
      let testimonial2 = `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/testimonials/${testimonialsArray[1]}.jpg`;
      let testimonial3 = `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/testimonials/${testimonialsArray[2]}.jpg`;


      let image = {
        id,
        offeredBy,
        offeredByAbout: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/offeredByAbouts/${offeredBys[offeredBy]}About.png`,
        offeredByMain: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/offeredByAbouts/${offeredBys[offeredBy]}Main.png`,
        primaryInstructor: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/instructors/${primaryInstructorsObj[id]}.jpg`,
        additionalInstructors,
        testimonial1,
        testimonial2,
        testimonial3,
        courseIcon: `https://rpt26-ingenuity.s3-us-west-1.amazonaws.com/courseIcons/${id}.png`
      };
      images.push(image);
    }
    return images;
  }

  let data = generateImages();

  fs.writeFileSync('../data/images.json', JSON.stringify(data, null, '\t'));



  //   return
  // }

  // let dataObj = generateImages();



// {
//   id: Number,
// courseNumber: Number,
//   offeredByAbout: String,
// offeredByMain: String,
// primaryInstructor: String,
//   additionalnstructors: [{
//   instructorIndex: Number,
//   instructorImage: String
// }],
//   testimonial1: String,
//   testimonial2 : String,
//   testimonial3: String,
//   courseIcon: String,
//
// }



// {
//   careerBenefitSVG: String,
//   careerDirectionSVG: String,
//   careerPromotionSVG: String,
//   courseMaterialsSVG: String,
//   deadlinesSVG: String,
//   exerciseSVG: String,
//   flexibleSVG: String,
//   hoursSVG: String,
//   languagesSVG: String,
//   levelSVG: String,
//   onlineSVG: String,
//   outcomesHoursSVG: String,
//   readingsSVG: String,
//   scheduleSVG: String
//   sharableCertificateSVG: String,
//   starSVG: String
//   userSVG: String,
//   videosSVG: String
//   }
