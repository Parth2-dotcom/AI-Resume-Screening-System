import { Download, ArrowLeft, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const ResultsTable = ({ results, onReset }) => {
  const handleExportCSV = () => {
    if (!results || results.length === 0) return;

    // Filter to successful
    const successLogs = results.filter(r => r.status === 'success');
    
    const headers = ['Filename', 'Score', 'Recommendation', 'Strengths', 'Gaps'];
    const csvContent = [
      headers.join(','),
      ...successLogs.map(item => {
        const { filename, data } = item;
        const strengths = data.strengths.join('; ');
        const gaps = data.gaps.join('; ');
        return `"${filename}","${data.score}","${data.recommendation}","${strengths}","${gaps}"`;
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume_screening_results.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRecommendationColor = (rec) => {
    switch(rec) {
      case 'Strong Fit': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Moderate Fit': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      default: return 'text-red-400 bg-red-400/10 border-red-400/20';
    }
  };

  const getRecommendationIcon = (rec) => {
    switch(rec) {
      case 'Strong Fit': return <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />;
      case 'Moderate Fit': return <HelpCircle className="w-5 h-5 text-amber-400 mr-2" />;
      default: return <AlertCircle className="w-5 h-5 text-red-400 mr-2" />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-xl">
        <button 
          onClick={onReset}
          className="flex items-center text-slate-400 hover:text-white transition-colors py-2 px-4 rounded-xl hover:bg-slate-700/50"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Upload
        </button>
        <button 
          onClick={handleExportCSV}
          className="mt-4 sm:mt-0 flex items-center bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-6 rounded-xl font-medium transition-all shadow-lg hover:shadow-indigo-500/25"
        >
          <Download className="w-5 h-5 mr-2" />
          Export to CSV
        </button>
      </div>

      <div className="grid gap-6">
        {results.map((result, idx) => {
          if (result.status === 'error') {
            return (
              <div key={idx} className="glass rounded-2xl p-6 border-red-500/20">
                <h3 className="text-xl font-semibold text-white mb-2">{result.filename}</h3>
                <p className="text-red-400 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Failed to parse: {result.error}
                </p>
              </div>
            );
          }

          const { data, filename } = result;
          
          return (
            <div key={idx} className="glass rounded-3xl overflow-hidden hover:border-slate-600 transition-all duration-300">
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{filename}</h3>
                    <div className={`inline-flex items-center px-4 py-1.5 rounded-full border ${getRecommendationColor(data.recommendation)} font-medium backdrop-blur-md`}>
                      {getRecommendationIcon(data.recommendation)}
                      {data.recommendation}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center w-24 h-24 rounded-full border-4 border-slate-700 bg-slate-800/50 relative shrink-0">
                    <div className="text-center">
                      <span className="block text-2xl font-bold text-white">{data.score}</span>
                      <span className="block text-xs uppercase text-slate-400 font-semibold tracking-wider">Score</span>
                    </div>
                    {/* Circle pseudo-progress could go here */}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-slate-700/50">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-widest mb-4 flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Strengths
                    </h4>
                    {data.strengths.length > 0 ? (
                      <ul className="space-y-2">
                        {data.strengths.map((str, i) => (
                          <li key={i} className="flex items-start text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 mr-3 shrink-0"></span>
                            <span className="capitalize">{str}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-500 italic text-sm">No matched keywords</p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-red-400 uppercase tracking-widest mb-4 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Gaps
                    </h4>
                    {data.gaps.length > 0 ? (
                      <ul className="space-y-2">
                        {data.gaps.map((gap, i) => (
                          <li key={i} className="flex items-start text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 mr-3 shrink-0"></span>
                            <span className="capitalize">{gap}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-slate-500 italic text-sm">No missing keywords detected</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
