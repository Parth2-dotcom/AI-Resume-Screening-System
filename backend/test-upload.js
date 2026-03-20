import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

const testApi = async () => {
  try {
    const form = new FormData();
    form.append('jobDescription', 'Looking for IT professional Linux');
    form.append('resumes', fs.createReadStream('c:/Users/aush/Downloads/resume_26.pdf'));

    console.log('Sending request to API...');
    const response = await axios.post('http://localhost:5000/api/score', form, {
      headers: {
        ...form.getHeaders()
      }
    });

    console.log('Response:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    if (error.response) {
      console.error('API Error Response:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
    }
  }
};

testApi();
