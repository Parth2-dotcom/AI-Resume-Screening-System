import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

/**
 * Extracts text content from a PDF buffer.
 * Uses pdf-parse v1.x via createRequire for ESM compatibility.
 * @param {Buffer} buffer - The PDF file buffer (e.g. from multer memory storage)
 * @returns {Promise<string>} The extracted text content
 */
export const extractTextFromPdf = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    console.error('Error parsing PDF:', error.message);
    throw new Error('Failed to parse PDF: ' + (error.message || error));
  }
};
