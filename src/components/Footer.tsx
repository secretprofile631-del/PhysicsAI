import React from 'react';
import { Atom, BookOpen, FlaskConical, Sparkles, Youtube, ShieldCheck, Heart, ExternalLink, FileText } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'analyzer' | 'notes' | 'practicals' | 'references' | 'quiz' | 'papers') => void;
  onOpenBotChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenBotChat }) => {
  return (
    <footer className="relative z-10 bg-slate-950/80 backdrop-blur-2xl border-t border-white/10 text-white pt-12 pb-8 mt-16 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10">
                <Atom className="w-6 h-6 text-white animate-spin-slow" />
              </div>
              <div>
                <h2 className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                  PhysixLanka <span className="text-blue-400">Portal</span>
                </h2>
                <p className="text-[11px] text-emerald-400 font-medium">භෞතික විද්‍යා අධ්‍යාපන පීඨය</p>
              </div>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Official Sri Lankan G.C.E. Advanced Level (A/L) Physics online study portal providing step-by-step problem solving, Sinhala (සිංහල) & English medium AI tutoring, topic short notes, standard practical guides, and exam quizzes.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400/90 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-xl w-max">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Sinhala (සිංහල) & English Medium Supported</span>
            </div>
          </div>

          {/* Col 2: Core Learning Modules */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">අධ්‍යයන අංශ (Portal Modules)</h3>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => setActiveTab('analyzer')} className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>AI Work Solver (ගණන් විසඳීම)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('notes')} className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Topic Short Notes (කෙටි සටහන්)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('practicals')} className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <FlaskConical className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Practicals & Lab Guide (ප්‍රායෝගික)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('references')} className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <Youtube className="w-3.5 h-3.5 text-rose-400" />
                  <span>Video Lectures (වීඩියෝ පාඩම්)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('papers')} className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <FileText className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Past Papers & Schemes (ප්‍රශ්න පත්‍ර)</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quiz')} className="hover:text-blue-400 transition-colors flex items-center space-x-2">
                  <Atom className="w-3.5 h-3.5 text-purple-300" />
                  <span>A/L MCQ Quiz & Formulas (ස්වයං ඇගයීම්)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Syllabus Topics */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">A/L Physics Syllabus Topics</h3>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] text-white/60">
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveTab('notes')}>• Mechanics (යාන්ත්‍රික)</span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveTab('notes')}>• Oscillations & Waves</span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveTab('notes')}>• Thermal Physics (තාපය)</span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveTab('notes')}>• Gravitational Fields</span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveTab('notes')}>• Electric Fields (විද්‍යුත්)</span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveTab('notes')}>• Current Electricity</span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveTab('notes')}>• Electronics (ඉලෙක්ට්‍රොනික)</span>
              <span className="hover:text-white transition-colors cursor-pointer" onClick={() => setActiveTab('notes')}>• Matter & Radiation</span>
            </div>
          </div>

          {/* Col 4: AI Tutor & External Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider">AI Physics Tutor & Resources</h3>
            <p className="text-xs text-white/60">
              Need instant step-by-step guidance on any past paper or complex diagram? Ask the Gemini AI Tutor.
            </p>
            <button
              onClick={onOpenBotChat}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600/80 hover:bg-blue-500 border border-blue-400/30 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2"
            >
              <Atom className="w-4 h-4 text-blue-200 animate-spin-slow" />
              <span>Ask AI Physics Tutor (සිංහලෙන්)</span>
            </button>
            <div className="pt-2 text-[11px] text-white/40 space-y-1">
              <a href="https://phet.colorado.edu/" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-cyan-300">
                <ExternalLink className="w-3 h-3" />
                <span>PhET Physics Simulations</span>
              </a>
              <a href="http://hyperphysics.phy-astr.gsu.edu/hbase/index.html" target="_blank" rel="noreferrer" className="flex items-center space-x-1 hover:text-cyan-300">
                <ExternalLink className="w-3 h-3" />
                <span>HyperPhysics Online Reference</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-3">
          <p>© {new Date().getFullYear()} PhysixLanka Portal - G.C.E. Advanced Level Physics Study System.</p>
          <div className="flex items-center space-x-1">
            <span>Designed for Sri Lankan A/L Students with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>& AI Technology</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
