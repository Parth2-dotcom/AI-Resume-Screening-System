const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 'is', 'it',
  'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 'there', 'these',
  'they', 'this', 'to', 'was', 'will', 'with', 'we', 'you', 'your', 'from', 'have', 'has', 'had',
  'what', 'when', 'where', 'who', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most',
  'other', 'some', 'such', 'than', 'too', 'very', 'can', 'could', 'should', 'would', 'may',
  'might', 'must', 'do', 'does', 'did', 'done', 'doing', 'experience', 'years', 'looking',
  'seeking', 'skills', 'work', 'working', 'ability', 'able', 'strong', 'good', 'excellent',
  'proficient', 'knowledge', 'understanding', 'using', 'used', 'related', 'candidate'
]);

function extractKeywords(text) {
  // Convert to lowercase and remove non-alphanumeric characters (keep spaces)
  const cleanedText = text.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  
  // Split by whitespace
  const words = cleanedText.split(/\s+/);
  
  // Filter out stop words and very short words
  const keywords = words.filter(word => word.length > 2 && !STOP_WORDS.has(word));
  
  // Return unique keywords
  return [...new Set(keywords)];
}

export const scoreCandidate = async (jobDescription, resumeText) => {
  // Extract keywords
  const jdKeywordsStr = extractKeywords(jobDescription);
  const resumeKeywordsStr = extractKeywords(resumeText);
  
  const jdKeywords = new Set(jdKeywordsStr);
  const resumeKeywords = new Set(resumeKeywordsStr);
  
  // If JD has no keywords, return a default response to avoid division by zero
  if (jdKeywords.size === 0) {
    return {
      score: 0,
      recommendation: "Not Fit",
      strengths: [],
      gaps: ["No clear keywords found in Job Description"]
    };
  }

  // Find matches and gaps
  const matchedKeywords = [];
  const missingKeywords = [];
  
  for (const keyword of jdKeywords) {
    if (resumeKeywords.has(keyword)) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  }

  // Calculate score (0-100)
  const matchPercentage = (matchedKeywords.length / jdKeywords.size) * 100;
  const score = Math.round(matchPercentage);
  
  let recommendation = 'Not Fit';
  if (score >= 75) {
    recommendation = 'Strong Fit';
  } else if (score >= 50) {
    recommendation = 'Moderate Fit';
  }

  // Format the output
  return {
    score,
    recommendation,
    strengths: matchedKeywords.slice(0, 5), // Return up to 5 strengths
    gaps: missingKeywords.slice(0, 5) // Return up to 5 gaps
  };
};
