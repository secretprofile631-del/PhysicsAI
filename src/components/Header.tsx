import React from 'react';
import {
  Sparkles,
  BookOpen,
  FlaskConical,
  Youtube,
  Calculator,
  Bot,
  Atom,
  Globe,
  GraduationCap,
  FileText,
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyzer' | 'notes' | 'practicals' | 'references' | 'quiz' | 'papers';
  setActiveTab: (tab: 'analyzer' | 'notes' | 'practicals' | 'references' | 'quiz' | 'papers') => void;
  onOpenBotChat: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenBotChat }) => {
  return (
    <header className="relative z-30 bg-slate-950/80 backdrop-blur-2xl border-b border-white/10 sticky top-0 text-white shadow-2xl">
      {/* Top Portal Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/60 to-purple-900/60 border-b border-white/10 py-1.5 px-4 text-center text-[11px] font-medium text-blue-200 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 truncate">
          <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded font-bold uppercase tracking-wider text-[10px]">
            🇱🇰 A/L Physics Portal
          </span>
          <span className="truncate">
            ශ්‍රී ලංකා උසස් පෙළ භෞතික විද්‍යා අධ්‍යයන පීඨය • Full Sinhala (සිංහල) & English Step-by-Step AI Solutions
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-3 shrink-0 text-white/60">
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-cyan-300" /> Sinhala & English Medium
          </span>
          <span className="flex items-center gap-1 text-amber-300 font-semibold">
            <GraduationCap className="w-3 h-3" /> G.C.E. A/L Syllabus
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Website Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('analyzer')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/30 border border-white/20">
              <Atom className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-white">
                  Physix<span className="text-blue-400">Lanka</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold uppercase tracking-wider">
                  Web Portal
                </span>
              </div>
              <p className="text-[11px] text-emerald-400 font-medium hidden sm:block">භෞතික විද්‍යා පීඨය • Online A/L Physics Learning System</p>
            </div>
          </div>

          {/* Quick AI Bot Trigger Button */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenBotChat}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600/80 hover:bg-blue-500 border border-blue-400/30 backdrop-blur-md text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/20"
              title="Open Gemini Physics Bot Chat"
            >
              <Bot className="w-4 h-4 text-cyan-300" />
              <span>AI Physics Tutor (සිංහල)</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* Website Navigation Bar Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-2.5 border-t border-white/10">
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
              activeTab === 'analyzer'
                ? 'bg-blue-600/80 text-white border-blue-400/40 shadow-lg shadow-blue-500/20 backdrop-blur-md'
                : 'text-white/70 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>AI Work Solver (ගණන් විසඳීම)</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
              activeTab === 'notes'
                ? 'bg-blue-600/80 text-white border-blue-400/40 shadow-lg shadow-blue-500/20 backdrop-blur-md'
                : 'text-white/70 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-300" />
            <span>Topic Short Notes (කෙටි සටහන්)</span>
          </button>

          <button
            onClick={() => setActiveTab('practicals')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
              activeTab === 'practicals'
                ? 'bg-blue-600/80 text-white border-blue-400/40 shadow-lg shadow-blue-500/20 backdrop-blur-md'
                : 'text-white/70 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-emerald-300" />
            <span>Practicals & Lab Guide (ප්‍රායෝගික)</span>
          </button>

          <button
            onClick={() => setActiveTab('references')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
              activeTab === 'references'
                ? 'bg-blue-600/80 text-white border-blue-400/40 shadow-lg shadow-blue-500/20 backdrop-blur-md'
                : 'text-white/70 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <Youtube className="w-4 h-4 text-rose-400" />
            <span>Videos & Web Links (වීඩියෝ පාඩම්)</span>
          </button>

          <button
            onClick={() => setActiveTab('papers')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
              activeTab === 'papers'
                ? 'bg-blue-600/80 text-white border-blue-400/40 shadow-lg shadow-blue-500/20 backdrop-blur-md'
                : 'text-white/70 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4 text-emerald-300" />
            <span>Past Papers & Schemes (ප්‍රශ්න පත්‍ර)</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
              activeTab === 'quiz'
                ? 'bg-blue-600/80 text-white border-blue-400/40 shadow-lg shadow-blue-500/20 backdrop-blur-md'
                : 'text-white/70 border-transparent hover:text-white hover:bg-white/5'
            }`}
          >
            <Calculator className="w-4 h-4 text-purple-300" />
            <span>Formulas & AI Quiz</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

