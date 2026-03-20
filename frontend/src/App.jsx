import { useState } from 'react';
import axios from 'axios';
import { UploadSection } from './components/UploadSection';
import { ResultsTable } from './components/ResultsTable';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!jobDescription || files.length === 0) {
      setError('Please provide a job description and at least one resume.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('jobDescription', jobDescription);
    Array.from(files).forEach((file) => {
      formData.append('resumes', file);
    });

    try {
      const response = await axios.post('/api/score', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Sort the results by score descending
      const sortedResults = response.data.results.sort((a, b) => {
        if (a.status !== 'success') return 1;
        if (b.status !== 'success') return -1;
        return b.data.score - a.data.score;
      });
      
      setResults(sortedResults);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to analyze resumes.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setFiles([]);
    setError(null);
    setJobDescription('');
  };

  return (
    <div className="min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-4">
            AI Resume Screener
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Upload a job description and resumes to automatically rank candidates based on keyword matching logic.
          </p>
        </header>

        <main className="space-y-10">
          {!results ? (
            <div className="max-w-4xl mx-auto">
              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                  {error}
                </div>
              )}
              <UploadSection 
                jobDescription={jobDescription}
                setJobDescription={setJobDescription}
                files={files}
                setFiles={setFiles}
                onAnalyze={handleAnalyze}
                loading={loading}
              />
            </div>
          ) : (
             <ResultsTable results={results} onReset={handleReset} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
