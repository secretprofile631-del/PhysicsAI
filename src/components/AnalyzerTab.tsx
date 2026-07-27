import React, { useState } from 'react';
import {
  Upload,
  Sparkles,
  BookOpen,
  FlaskConical,
  Youtube,
  Globe,
  CheckCircle2,
  AlertTriangle,
  FileText,
  X,
  ExternalLink,
  ArrowRight,
  Info,
  Download,
  Copy,
  Check,
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface AnalyzerTabProps {
  onSaveNoteToLibrary?: (note: any) => void;
  onOpenBotChatWithQuery?: (query: string) => void;
}

export const AnalyzerTab: React.FC<AnalyzerTabProps> = ({ onSaveNoteToLibrary, onOpenBotChatWithQuery }) => {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [selectedLanguage, setSelectedLanguage] = useState<'auto' | 'sinhala'>('auto');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedNote, setCopiedNote] = useState(false);

  const samplePrompts = [
    'මීටර් සේතුවක R = 10 Ω සහ S අඥාත ප්‍රතිරෝධයයි. තුලන ලක්ෂ්‍යය 40 cm දී ලැබේ නම් S හි අගය ගණනය කර කෙටි සටහනක් සාදන්න.',
    'ඩොප්ලර් ආචරණය යනු කුමක්ද? ප්‍රභවය නිශ්චල නිරීක්ෂකයා දෙසට චලනය වන විට ශ්‍රව්‍ය සංඛ්‍යාතය සඳහා සූත්‍රය පැහැදිලි කරන්න.',
    'Analyze my notes on Potentiometer internal resistance and compare with voltmeter.',
    'Explain Projectile motion trajectory equation s = ut + 0.5at^2 and maximum range angle.',
    'තනි වර්ණ ආලෝකයක් ප්‍රිස්මයක් හරහා ගමන් කරන විට අවම විචලන කෝණය D_min සහ වර්තනාංකය n සූත්‍රය පැහැදිලි කරන්න.',
    'Analyze semiconductor diode I-V characteristics, knee voltage, and dynamic resistance.',
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrorMsg('Image size exceeds 10MB limit.');
        return;
      }
      setMimeType(file.type);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setErrorMsg(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

  const runAnalysis = async () => {
    if (!inputText.trim() && !selectedImage) {
      setErrorMsg('Please enter physics text or upload an image of your educational work.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const isSinhalaInput = /[\u0D80-\u0DFF]/.test(inputText);
      const languageToPass = selectedLanguage === 'sinhala' || isSinhalaInput ? 'sinhala' : 'english';

      const response = await fetch('/api/analyze-work', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          imageBase64: selectedImage,
          mimeType,
          language: languageToPass,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze physics work.');
      }

      setAnalysisResult(data.result);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMsg(err.message || 'An error occurred while analyzing your work with Gemini.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyShortNote = () => {
    if (!analysisResult) return;
    const noteText = `=== A/L PHYSICS SHORT NOTE: ${analysisResult.shortNote.title} ===
Topic: ${analysisResult.topicName} (${analysisResult.subtopic})

CORE CONCEPTS:
${analysisResult.shortNote.coreConcepts.map((c, i) => `${i + 1}. ${c}`).join('\n')}

KEY FORMULAS:
${analysisResult.shortNote.keyFormulas.map((f) => `- ${f.name}: ${f.formula} (${f.explanation})`).join('\n')}

EXAM TIPS & TRAPS:
${analysisResult.shortNote.examTips.map((t) => `! ${t}`).join('\n')}
`;
    navigator.clipboard.writeText(noteText);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Banner / Intro */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Physics Work Analyzer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Analyze A/L Physics Work, Generate Notes & Discover Practicals
          </h1>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Upload your handwritten notes, past paper questions, or type any Advanced Level Physics topic. Gemini AI will analyze your work, build structured topic short notes, show relevant practicals, and fetch direct YouTube video tutorials & web reference links.
          </p>
        </div>
      </div>

      {/* Input Box & File Upload */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 space-y-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <label className="block text-sm font-semibold text-white/90">
            Paste educational work text, problem statement, or topic notes:
          </label>

          {/* Language Selector */}
          <div className="flex items-center space-x-1.5 bg-white/5 p-1 rounded-xl border border-white/10 text-xs self-start sm:self-auto">
            <span className="text-[10px] uppercase font-bold text-white/40 px-1">Language:</span>
            <button
              type="button"
              onClick={() => setSelectedLanguage('auto')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedLanguage === 'auto' ? 'bg-blue-600/80 text-white font-bold border border-blue-400/30' : 'text-white/60 hover:text-white'
              }`}
            >
              Auto / EN
            </button>
            <button
              type="button"
              onClick={() => setSelectedLanguage('sinhala')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                selectedLanguage === 'sinhala' ? 'bg-emerald-600/80 text-white font-bold border border-emerald-400/30' : 'text-white/60 hover:text-white'
              }`}
            >
              සිංහල (Sinhala)
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="e.g., මීටර් සේතුවක වම් කැඩුවේ 10 Ω, දකුණු කැඩුවේ S ඇත. තුලන දිග 40 cm නම් S සොයන්න... or Ask in Sinhala / English..."
            rows={4}
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/20 focus:border-blue-500/50 text-white text-sm transition-all resize-y placeholder:text-white/30 outline-none"
          />
        </div>

        {/* Quick Sample Chips */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/40">Try sample topics:</span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(prompt)}
                className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition-all text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Image Attachment Area */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-white/90">
            Attach photo of handwritten note, textbook page, or diagram (optional):
          </label>

          {selectedImage ? (
            <div className="relative inline-block border border-blue-500/30 rounded-2xl overflow-hidden bg-white/5 p-2">
              <img src={selectedImage} alt="Uploaded work" className="max-h-48 rounded-xl object-contain" />
              <button
                onClick={removeImage}
                className="absolute top-3 right-3 p-1.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-full shadow-md transition-all"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 hover:border-blue-400/50 rounded-2xl cursor-pointer bg-white/5 hover:bg-white/10 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-white/60">
                <Upload className="w-7 h-7 mb-2 text-blue-400" />
                <p className="text-xs font-medium text-white/80">Click to upload or drag & drop handwritten notes / question photo</p>
                <p className="text-[11px] text-white/40 mt-1">PNG, JPG, WEBP up to 10MB</p>
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          )}
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-start space-x-3 text-rose-300 text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">Analysis Notice</p>
              <p className="text-xs text-rose-300/80 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-500/20 border border-blue-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Analyzing Work with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Analyze Work & Generate Notes</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Output Section */}
      {analysisResult && (
        <div className="space-y-8 animate-fadeIn">
          {/* Header Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 text-white border border-white/10 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold block mb-1">Identified Topic</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{analysisResult.topicName}</h2>
                <p className="text-xs text-white/50 font-medium">{analysisResult.subtopic}</p>
              </div>
              <button
                onClick={copyShortNote}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-blue-300 border border-white/10 transition-all"
              >
                {copiedNote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNote ? 'Copied Note' : 'Copy Short Note'}</span>
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase text-white/40 tracking-wider">Work Breakdown & Concept Summary</h3>
              <p className="text-sm text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                {analysisResult.summary}
              </p>
            </div>

            {/* Solved Steps if numerical / problem */}
            {analysisResult.solvedBreakdown && analysisResult.solvedBreakdown.length > 0 && (
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Step-by-Step Derivation / Solution</h4>
                <div className="space-y-2">
                  {analysisResult.solvedBreakdown.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-white/80 bg-white/5 p-3 rounded-xl border border-white/10">
                      <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-blue-400/30">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Structured Topic Short Note */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 space-y-6 text-white">
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
              <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Topic Short Note: {analysisResult.shortNote.title}</h3>
                <p className="text-xs text-white/50">Generated according to Advanced Level Physics examination standards</p>
              </div>
            </div>

            {/* Core Concepts */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Core Concepts & Physical Laws</span>
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {analysisResult.shortNote.coreConcepts.map((concept, idx) => (
                  <li key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white/80 leading-relaxed flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-2"></span>
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Formulas */}
            {analysisResult.shortNote.keyFormulas && analysisResult.shortNote.keyFormulas.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>Key Equations & Formula Breakdown</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {analysisResult.shortNote.keyFormulas.map((f, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-1">
                      <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">{f.name}</span>
                      <div className="text-base font-mono font-bold text-cyan-300 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 inline-block my-1">
                        {f.formula}
                      </div>
                      <p className="text-xs text-white/70">{f.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Exam Traps & Common Pitfalls */}
            {analysisResult.shortNote.examTips && analysisResult.shortNote.examTips.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Exam Traps & Common Pitfalls</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-amber-200/80">
                  {analysisResult.shortNote.examTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="font-bold text-amber-400">!</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Related Practicals Section */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 space-y-6 text-white">
            <div className="flex items-center space-x-3 border-b border-white/10 pb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Related A/L Practical Experiments</h3>
                <p className="text-xs text-white/50">Key lab setups, formulas, and precautions connected to this topic</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisResult.relatedPracticals.map((prac, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <h4 className="font-bold text-emerald-300 text-sm">{prac.title}</h4>
                  <p className="text-xs text-white/70"><span className="font-semibold text-white">Objective:</span> {prac.objective}</p>
                  <div className="bg-white/10 p-2.5 rounded-lg border border-white/10 text-xs font-mono font-semibold text-cyan-300">
                    Formula: {prac.keyFormula}
                  </div>
                  <p className="text-xs text-emerald-200 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                    <span className="font-semibold text-emerald-300">Key Precaution:</span> {prac.keyPrecaution}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Video & Web Reference Finder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* YouTube Recommendations */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 space-y-4 text-white">
              <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
                <div className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-400">
                  <Youtube className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">YouTube Video Reference Queries</h3>
                  <p className="text-xs text-white/50">Recommended visual tutorials & demonstrations</p>
                </div>
              </div>

              <div className="space-y-3">
                {analysisResult.youtubeVideoRecommendations.map((video, idx) => {
                  const ytSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(video.searchQuery)}`;
                  return (
                    <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-rose-400/40 transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white">{video.title}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-medium border border-rose-500/30 shrink-0">
                          {video.recommendedChannel}
                        </span>
                      </div>
                      <p className="text-xs text-white/70">{video.description}</p>
                      <div className="pt-1">
                        <a
                          href={ytSearchUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 hover:underline"
                        >
                          <span>Watch on YouTube ("{video.searchQuery}")</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Website References */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 space-y-4 text-white">
              <div className="flex items-center space-x-3 border-b border-white/10 pb-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Web References & Simulations</h3>
                  <p className="text-xs text-white/50">PhET applets, HyperPhysics & online lecture materials</p>
                </div>
              </div>

              <div className="space-y-3">
                {analysisResult.websiteReferences.map((site, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 hover:border-cyan-400/40 transition-all">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-white">{site.title}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/30 shrink-0">
                        {site.siteName}
                      </span>
                    </div>
                    <p className="text-xs text-white/70">{site.description}</p>
                    <div className="pt-1">
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                      >
                        <span>Visit {site.siteName} Reference</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
