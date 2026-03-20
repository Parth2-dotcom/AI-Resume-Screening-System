import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

console.log('--- Backend Environment Check ---');
if (!process.env.GEMINI_API_KEY) {
  console.log('Error: GEMINI_API_KEY is not set in the environment or .env file!');
} else {
  console.log('Success: GEMINI_API_KEY is set.');
}
console.log('Backend setup is ready. You can start it with `npm start`\\n----');
