import { scoreCandidate } from './services/matcherService.js';

const jd = 'Looking for a skilled backend developer with Node.js, Express, JavaScript, SQL, and Git experience.';
const resume = 'I am a backend developer. My skills include Node.js, Express, Javascript, MongoDB. I have 5 years experience.';

async function run() {
  try {
    const result = await scoreCandidate(jd, resume);
    console.log(JSON.stringify(result, null, 2));
  } catch(e) {
    console.error('Error:', e);
  }
}
run();
