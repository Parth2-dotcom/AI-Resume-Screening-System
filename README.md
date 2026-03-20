# AI Resume Screener

A smart hiring tool that lets recruiters paste a job description, upload candidate resumes as PDFs, and instantly see each candidate ranked and scored based on how well they match the role.

## How It Works

The app extracts text from uploaded PDF resumes and compares it against the job description using keyword matching. It pulls out important words from the JD, checks which ones appear in each resume, and calculates a match score from 0 to 100. Candidates scoring 75 or above are marked as Strong Fit, 50 to 74 as Moderate Fit, and below 50 as Not Fit. Matched keywords show up as strengths and missing ones as gaps so you can see exactly why someone scored the way they did.

## Features

- Upload up to 10 PDF resumes at once
- Paste or type any job description
- Instant scoring and ranking with no external API calls
- Color coded result cards sorted by score
- Export results as CSV
- Single server setup, everything runs on one port

## Tech Stack

- React, Vite, Tailwind CSS (frontend)
- Node.js, Express (backend)
- pdf parse (PDF text extraction)
- Multer (file upload handling)

## Getting Started

```bash
# Install backend dependencies
cd backend
npm install

# Build the frontend
cd ../frontend
npm install
npm run build

# Start the server
cd ../backend
npm start
```

Then open http://localhost:5000 in your browser.

## Project Structure

```
ai-resume-screener/
├── backend/
│   ├── server.js              # Express server serving API and frontend
│   ├── routes/api.js          # POST /api/score endpoint
│   └── services/
│       ├── pdfService.js      # PDF text extraction
│       └── matcherService.js  # Keyword matching and scoring logic
└── frontend/
    └── src/
        ├── App.jsx            # Main app with upload and results flow
        └── components/
            ├── UploadSection.jsx   # JD input and file upload UI
            └── ResultsTable.jsx    # Scored results and CSV export
```
