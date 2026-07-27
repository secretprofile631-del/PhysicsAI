import React, { useState } from 'react';
import {
  Calculator,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  FileText,
  ChevronRight,
  Award,
} from 'lucide-react';
import { PHYSICS_TOPICS, SAMPLE_QUIZ } from '../data/physicsData';
import { QuizQuestion, PhysicsTopicId } from '../types';

export const FormulaQuizTab: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<PhysicsTopicId>('mechanics');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(SAMPLE_QUIZ);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [quizLanguage, setQuizLanguage] = useState<'english' | 'sinhala'>('sinhala');
  const [isGenerating, setIsGenerating] = useState(false);

  const activeTopicObj = PHYSICS_TOPICS.find((t) => t.id === selectedTopicId) || PHYSICS_TOPICS[0];

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIndex });
    setShowExplanations({ ...showExplanations, [questionId]: true });
  };

  const generateNewQuiz = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicName: activeTopicObj.name,
          language: quizLanguage,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate quiz');
      }

      setQuizQuestions(data.questions);
      setSelectedAnswers({});
      setShowExplanations({});
    } catch (err: any) {
      alert(`Quiz generation error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5 text-purple-300" />
            <span>Formulas & AI Exam Practice</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            A/L Physics Equation Cheat Sheet & AI Practice Quiz
          </h1>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Quick formula lookup across all Advanced Level Physics units, variable definitions, and interactive AI-generated practice questions with step-by-step solutions.
          </p>
        </div>
      </div>

      {/* Topic Switcher Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
        {PHYSICS_TOPICS.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setSelectedTopicId(topic.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              selectedTopicId === topic.id
                ? 'bg-blue-600/80 text-white border-blue-400/40 shadow-lg shadow-blue-500/20 backdrop-blur-md'
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span>{topic.name}</span>
          </button>
        ))}
      </div>

      {/* Formula Cheat Sheet Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 space-y-4 text-white">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-purple-300 tracking-wider block mb-1">{activeTopicObj.code}</span>
            <h2 className="text-xl font-bold text-white">{activeTopicObj.name} Formula Cheat Sheet</h2>
          </div>
        </div>

        <p className="text-xs text-white/70 leading-relaxed">{activeTopicObj.description}</p>

        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Core Equations:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {activeTopicObj.keyEquations.map((eq, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between">
                <span className="text-sm font-mono font-bold text-cyan-300">{eq}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-400/30">SI Units</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Quiz Practice Generator */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 space-y-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>A/L Physics AI Practice Quiz: {activeTopicObj.name}</span>
            </h2>
            <p className="text-xs text-white/50">Test your knowledge with exam-style questions & instant step-by-step solutions</p>
          </div>

          <div className="flex items-center space-x-3">
            {/* Quiz Language Selector */}
            <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              <button
                type="button"
                onClick={() => setQuizLanguage('sinhala')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  quizLanguage === 'sinhala' ? 'bg-emerald-600/80 text-white font-bold border border-emerald-400/30' : 'text-white/60 hover:text-white'
                }`}
              >
                සිංහල (Sinhala)
              </button>
              <button
                type="button"
                onClick={() => setQuizLanguage('english')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  quizLanguage === 'english' ? 'bg-blue-600/80 text-white font-bold border border-blue-400/30' : 'text-white/60 hover:text-white'
                }`}
              >
                English
              </button>
            </div>

            <button
              onClick={generateNewQuiz}
              disabled={isGenerating}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600/80 hover:bg-blue-500 border border-blue-400/30 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating New Quiz...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Generate Fresh AI Quiz</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {quizQuestions.map((q, qIdx) => {
            const selectedOpt = selectedAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.correctAnswerIndex;

            return (
              <div key={q.id} className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug">{q.questionText}</h3>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 font-bold shrink-0">
                    {q.difficulty || 'A/L Style'}
                  </span>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    let optionStyle = 'bg-white/5 border-white/10 hover:border-blue-400/50 text-white/80';

                    if (isAnswered) {
                      if (optIdx === q.correctAnswerIndex) {
                        optionStyle = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200 font-bold';
                      } else if (optIdx === selectedOpt) {
                        optionStyle = 'bg-rose-500/20 border-rose-500/40 text-rose-200 font-bold';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start space-x-2 ${optionStyle}`}
                      >
                        <span className="font-bold shrink-0 text-blue-300">{String.fromCharCode(65 + optIdx)}.</span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Solution Explanation Box */}
                {isAnswered && (
                  <div
                    className={`p-4 rounded-xl border text-xs leading-relaxed space-y-1 ${
                      isCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2 font-bold">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Correct Answer!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-400" />
                          <span>Incorrect. Correct Option is {String.fromCharCode(65 + q.correctAnswerIndex)}</span>
                        </>
                      )}
                    </div>
                    <p className="pt-1 text-white/80"><span className="font-bold text-white">Step-by-Step Solution:</span> {q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
