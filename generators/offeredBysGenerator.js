const faker = require('faker');
const fs = require('fs')
const imagesData = require('../data/images.json');

//assigns one of six sponsors to each course
function generateOfferedBys() {
  let offeredBys = [];
  let offeredByNames = ['DeepLearning.AI', 'Erasmus University Rotterdam', 'IBM', 'University of Illinois at Urbana-Champaign', 'University of Pennsylvania', 'University of Virginia'];
  let offeredBysDescription = ['DeepLearning.AI is an education technology company that develops a global community of AI talent.', 'Erasmus University: a top-100 ranked international research university based in Rotterdam, the Netherlands. Our academic teaching and research focuses on four areas: health, wealth, culture and governance. Erasmus University Rotterdam: make it happen. ', 'IBM is the global leader in business transformation through an open hybrid cloud platform and AI, serving clients in more than 170 countries around the world. Today 47 of the Fortune 50 Companies rely on the IBM Cloud to run their business, and IBM Watson enterprise AI is hard at work in more than 30,000 engagements. IBM is also one of the world’s most vital corporate research organizations, with 28 consecutive years of patent leadership. Above all, guided by principles for trust and transparency and support for a more inclusive society, IBM is committed to being a responsible technology innovator and a force for good in the world. For more information about IBM visit: www.ibm.com', 'The University of Illinois at Urbana-Champaign is a world leader in research, teaching and public engagement, distinguished by the breadth of its programs, broad academic excellence, and internationally renowned faculty and alumni. Illinois serves the world by creating knowledge, preparing students for lives of impact, and finding solutions to critical societal needs.', 'The University of Pennsylvania (commonly referred to as Penn) is a private university, located in Philadelphia, Pennsylvania, United States. A member of the Ivy League, Penn is the fourth-oldest institution of higher education in the United States, and considers itself to be the first university in the United States with both undergraduate and graduate studies.', 'A premier institution of higher education, The University of Virginia offers outstanding academics, world-class faculty, and an inspiring, supportive environment. Founded by Thomas Jefferson in 1819, the University is guided by his vision of discovery, innovation, and development of the full potential of students from all walks of life. Through these courses, global learners have an opportunity to study with renowned scholars and thought leaders.'];

  for (let id=1; id <= 100; id++) {
    let index = imagesData[id - 1].offeredBy //refers to images data for continuity
    let offeredBy = {
      id,
      offeredByName: offeredByNames[index],
      offeredByDescription: offeredBysDescription[index]
    }
    offeredBys.push(offeredBy);
  }

  return offeredBys;
}

let dataObj = generateOfferedBys();

fs.writeFileSync('../data/offeredBys.json', JSON.stringify(dataObj, null, '\t'));