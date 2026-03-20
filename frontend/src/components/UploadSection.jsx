import { UploadCloud, FileText, Loader2 } from 'lucide-react';

export const UploadSection = ({ jobDescription, setJobDescription, files, setFiles, onAnalyze, loading }) => {
  return (
    <form onSubmit={onAnalyze} className="glass rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl">
      <div className="space-y-3">
        <label className="block text-lg font-medium text-slate-200">
          Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here (skills, requirements, etc)..."
          rows={6}
          className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl p-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono text-sm resize-none"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-lg font-medium text-slate-200">
          Candidate Resumes (PDFs)
        </label>
        <div className="mt-1 flex justify-center px-6 pt-8 pb-10 border-2 border-slate-700 border-dashed rounded-2xl hover:border-indigo-500/50 hover:bg-slate-800/30 transition-all cursor-pointer relative">
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-2 text-center">
            <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
            <div className="flex text-lg text-slate-300 justify-center">
              <span className="relative rounded-md font-medium text-indigo-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-300">
                <span>Upload files</span>
              </span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-sm text-slate-500">PDF up to 10MB each (Max 10 files)</p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center space-x-2 bg-slate-800/70 border border-slate-700 rounded-lg px-4 py-2">
                <FileText className="h-4 w-4 text-indigo-400" />
                <span className="text-sm text-slate-300 truncate max-w-[150px]">{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || files.length === 0 || !jobDescription}
        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" />
            Analyzing candidates...
          </>
        ) : (
          'Screen Resumes'
        )}
      </button>
    </form>
  );
};
