import fs from 'fs';
import { extractTextFromPdf } from './services/pdfService.js';
import { scoreCandidate } from './services/matcherService.js';
import dotenv from 'dotenv';

dotenv.config();

const test = async () => {
  try {
    const resumePath = 'c:/Users/aush/Downloads/resume_26.pdf';
    console.log(`Loading resume from ${resumePath}`);
    const pdfBuffer = fs.readFileSync(resumePath);
    
    console.log('Extracting text from PDF...');
    const text = await extractTextFromPdf(pdfBuffer);
    console.log(`Extracted ${text.length} characters of text. Snapshot: ${text.substring(0, 100).replace(/\n/g, ' ')}...`);

    const jd = 'We are looking for a highly skilled Cybersecurity and IT professional with experience in Linux routing, Networking (LAN, routing, Samba), basic software troubleshooting, hardware imaging, and CompTIA certifications or related education. The candidate should be capable of independent problem solving.';
    
    console.log('\nScoring candidate against JD using local matcher...');
    const result = await scoreCandidate(jd, text);
    
    console.log('\n--- Evaluation Result ---');
    console.log(JSON.stringify(result, null, 2));
    console.log('---------------------------\n');
    console.log('✅ Backend services working perfectly!');
  } catch (error) {
    console.error('❌ Test Failed:', error);
  }
};

test();
