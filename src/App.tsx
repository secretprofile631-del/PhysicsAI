import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AnalyzerTab } from './components/AnalyzerTab';
import { ShortNotesTab } from './components/ShortNotesTab';
import { PracticalsTab } from './components/PracticalsTab';
import { ReferenceTab } from './components/ReferenceTab';
import { FormulaQuizTab } from './components/FormulaQuizTab';
import { PastPapersTab } from './components/PastPapersTab';
import { BotChatModal } from './components/BotChatModal';
import { Atom, Sparkles, BookOpen, FlaskConical, Youtube, GraduationCap, Calculator, FileText } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'notes' | 'practicals' | 'references' | 'quiz' | 'papers'>('analyzer');
  const [isBotChatOpen, setIsBotChatOpen] = useState(false);
  const [botInitialQuery, setBotInitialQuery] = useState<string | undefined>(undefined);

  const handleOpenBotWithQuery = (query: string) => {
    setBotInitialQuery(query);
    setIsBotChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070a14] text-white font-sans flex flex-col relative overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200 antialiased">
      {/* Mesh Gradient Blur Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-blue-600/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-purple-600/20 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] left-[35%] w-[35%] h-[35%] bg-emerald-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenBotChat={() => {
          setBotInitialQuery(undefined);
          setIsBotChatOpen(true);
        }}
      />

      {/* Hero Portal Header */}
      <section className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="bg-gradient-to-r from-blue-900/40 via-slate-900/60 to-purple-900/40 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <GraduationCap className="w-4 h-4 text-amber-300" />
              <span>G.C.E. Advanced Level Physics Online Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              PhysixLanka <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">භෞතික විද්‍යා අධ්‍යයන පීඨය</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Step-by-step problem solver for Sri Lankan A/L students. Solve past papers, generate topic short notes, view standard practical guides, and practice MCQs with AI explanations in Sinhala (සිංහල) & English.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 shrink-0 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('analyzer')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-400/40 transition-all text-center space-y-1"
            >
              <Sparkles className="w-5 h-5 text-amber-300 mx-auto" />
              <div className="text-[11px] font-bold">Problem Solver</div>
              <div className="text-[9px] text-white/50">ගණන් විසඳීම</div>
            </button>

            <button
              onClick={() => setActiveTab('notes')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-400/40 transition-all text-center space-y-1"
            >
              <BookOpen className="w-5 h-5 text-cyan-300 mx-auto" />
              <div className="text-[11px] font-bold">Short Notes</div>
              <div className="text-[9px] text-white/50">කෙටි සටහන්</div>
            </button>

            <button
              onClick={() => setActiveTab('practicals')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-400/40 transition-all text-center space-y-1"
            >
              <FlaskConical className="w-5 h-5 text-emerald-300 mx-auto" />
              <div className="text-[11px] font-bold">Lab Guide</div>
              <div className="text-[9px] text-white/50">ප්‍රායෝගික</div>
            </button>

            <button
              onClick={() => setActiveTab('papers')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-400/40 transition-all text-center space-y-1"
            >
              <FileText className="w-5 h-5 text-emerald-300 mx-auto" />
              <div className="text-[11px] font-bold">Past Papers</div>
              <div className="text-[9px] text-white/50">ප්‍රශ්න පත්‍ර</div>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-400/40 transition-all text-center space-y-1"
            >
              <Calculator className="w-5 h-5 text-purple-300 mx-auto" />
              <div className="text-[11px] font-bold">MCQ Quizzes</div>
              <div className="text-[9px] text-white/50">ස්වයං ඇගයීම්</div>
            </button>

            <button
              onClick={() => setActiveTab('references')}
              className="p-3 rounded-2xl bg-white/5 hover:bg-blue-600/30 border border-white/10 hover:border-blue-400/40 transition-all text-center space-y-1"
            >
              <Youtube className="w-5 h-5 text-rose-400 mx-auto" />
              <div className="text-[11px] font-bold">Video Lessons</div>
              <div className="text-[9px] text-white/50">වීඩියෝ පාඩම්</div>
            </button>

            <button
              onClick={() => {
                setBotInitialQuery(undefined);
                setIsBotChatOpen(true);
              }}
              className="p-3 rounded-2xl bg-blue-600/80 hover:bg-blue-500 border border-blue-400/40 transition-all text-center space-y-1 text-white shadow-lg shadow-blue-500/20"
            >
              <Atom className="w-5 h-5 text-white animate-spin-slow mx-auto" />
              <div className="text-[11px] font-bold">AI Tutor</div>
              <div className="text-[9px] text-emerald-300 font-semibold">සිංහලෙන් අසන්න</div>
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {activeTab === 'analyzer' && (
          <AnalyzerTab onOpenBotChatWithQuery={handleOpenBotWithQuery} />
        )}

        {activeTab === 'notes' && <ShortNotesTab />}

        {activeTab === 'practicals' && <PracticalsTab />}

        {activeTab === 'references' && <ReferenceTab />}

        {activeTab === 'papers' && (
          <PastPapersTab onOpenBotChatWithQuery={handleOpenBotWithQuery} />
        )}

        {activeTab === 'quiz' && <FormulaQuizTab />}
      </main>

      {/* Floating Action Button for AI Physics Tutor */}
      <button
        onClick={() => {
          setBotInitialQuery(undefined);
          setIsBotChatOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 p-3.5 bg-blue-600/90 hover:bg-blue-500 text-white rounded-2xl shadow-2xl shadow-blue-500/30 border border-blue-400/40 backdrop-blur-xl transition-all transform hover:scale-105 flex items-center space-x-2"
        title="Open Gemini A/L Physics AI Tutor"
      >
        <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping absolute -top-1 -right-1" />
        <Atom className="w-5 h-5 text-white animate-spin-slow" />
        <span className="text-xs font-extrabold hidden sm:inline text-white">AI Physics Tutor (සිංහල)</span>
      </button>

      {/* Physics Bot Modal */}
      <BotChatModal
        isOpen={isBotChatOpen}
        onClose={() => setIsBotChatOpen(false)}
        initialQuery={botInitialQuery}
      />

      {/* Website Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenBotChat={() => {
          setBotInitialQuery(undefined);
          setIsBotChatOpen(true);
        }}
      />
    </div>
  );
}

