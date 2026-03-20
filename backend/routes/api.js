import express from 'express';
import multer from 'multer';
import { extractTextFromPdf } from '../services/pdfService.js';
import { scoreCandidate } from '../services/matcherService.js';

const router = express.Router();
// Use memory storage for multer
const upload = multer({ storage: multer.memoryStorage() });

router.post('/score', upload.array('resumes', 10), async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const files = req.files;

    if (!jobDescription || typeof jobDescription !== 'string') {
      return res.status(400).json({ error: 'Job description is required.' });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'At least one resume PDF is required.' });
    }

    if (files.length > 10) {
      return res.status(400).json({ error: 'Maximum of 10 resumes allowed.' });
    }

    const evaluations = await Promise.all(
      files.map(async (file) => {
        try {
          if (file.mimetype !== 'application/pdf') {
             throw new Error('Only PDF files are supported.');
          }
          const text = await extractTextFromPdf(file.buffer);
          const evaluation = await scoreCandidate(jobDescription, text);
          
          return {
            filename: file.originalname,
            status: 'success',
            data: evaluation
          };
        } catch (err) {
          console.error(`Error processing ${file.originalname}:`, err);
          return {
            filename: file.originalname,
            status: 'error',
            error: err.message
          };
        }
      })
    );

    res.json({ results: evaluations });
  } catch (error) {
    console.error('Error in /score route:', error);
    res.status(500).json({ error: 'Internal server error processing resumes.' });
  }
});

export default router;
