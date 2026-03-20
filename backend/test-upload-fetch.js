export const testFetch = async () => {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    console.log('Reading file...');
    const buffer = fs.readFileSync('c:/Users/aush/Downloads/resume_26.pdf');
    const blob = new Blob([buffer], { type: 'application/pdf' });
    
    const formData = new FormData();
    formData.append('jobDescription', 'Looking for IT professional Linux');
    formData.append('resumes', blob, 'resume_26.pdf');

    console.log('Sending request to API...');
    const response = await fetch('http://localhost:5000/api/score', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
};
testFetch();
