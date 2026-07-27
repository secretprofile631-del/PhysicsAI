import React, { useState } from 'react';
import {
  FlaskConical,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  BarChart2,
  ListOrdered,
  ChevronDown,
  ChevronUp,
  RefreshCw,
} from 'lucide-react';
import { DEFAULT_PRACTICALS } from '../data/physicsData';
import { PracticalExperiment } from '../types';

export const PracticalsTab: React.FC = () => {
  const [selectedPracticalId, setSelectedPracticalId] = useState<string>(DEFAULT_PRACTICALS[0].id);
  const [expandedVivaIndex, setExpandedVivaIndex] = useState<number | null>(null);

  const activePractical = DEFAULT_PRACTICALS.find((p) => p.id === selectedPracticalId) || DEFAULT_PRACTICALS[0];

  // Interactive Calculator State for Active Practical
  const [calcInputs, setCalcInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    if (activePractical.sampleCalculation) {
      activePractical.sampleCalculation.inputs.forEach((inp) => {
        initial[inp.name] = inp.defaultValue;
      });
    }
    return initial;
  });

  const [calcResult, setCalcResult] = useState<{ result: number; unit: string; errorMargin?: string } | null>(() => {
    if (activePractical.sampleCalculation) {
      return activePractical.sampleCalculation.calculate(calcInputs);
    }
    return null;
  });

  const handlePracticalSelect = (id: string) => {
    setSelectedPracticalId(id);
    const prac = DEFAULT_PRACTICALS.find((p) => p.id === id);
    if (prac && prac.sampleCalculation) {
      const initial: Record<string, number> = {};
      prac.sampleCalculation.inputs.forEach((inp) => {
        initial[inp.name] = inp.defaultValue;
      });
      setCalcInputs(initial);
      setCalcResult(prac.sampleCalculation.calculate(initial));
    } else {
      setCalcResult(null);
    }
  };

  const handleInputChange = (fieldName: string, val: number) => {
    const updated = { ...calcInputs, [fieldName]: val };
    setCalcInputs(updated);
    if (activePractical.sampleCalculation) {
      setCalcResult(activePractical.sampleCalculation.calculate(updated));
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <FlaskConical className="w-3.5 h-3.5 text-emerald-300" />
            <span>A/L Physics Practical Experiments</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Standard Practicals, Graph Guides & Lab Data Calculator
          </h1>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Detailed guides for standard Advanced Level Physics practicals: apparatus lists, theory formulas, linear graph analysis, precautions, sources of error, and interactive lab calculation tools.
          </p>
        </div>
      </div>

      {/* Practical Selector Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
        {DEFAULT_PRACTICALS.map((prac) => (
          <button
            key={prac.id}
            onClick={() => handlePracticalSelect(prac.id)}
            className={`px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 border ${
              selectedPracticalId === prac.id
                ? 'bg-blue-600/80 text-white border-blue-400/40 shadow-lg shadow-blue-500/20 backdrop-blur-md'
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FlaskConical className="w-4 h-4 shrink-0 text-emerald-300" />
            <span>{prac.title}</span>
          </button>
        ))}
      </div>

      {/* Active Practical Content Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 space-y-8 text-white">
        {/* Title & Objective */}
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {activePractical.topicName}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{activePractical.title}</h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
            <span className="font-bold text-emerald-300">Objective:</span> {activePractical.objective}
          </p>
        </div>

        {/* Apparatus & Theory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Apparatus Needed */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold uppercase text-emerald-300 tracking-wider flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Required Apparatus & Tools</span>
            </h3>
            <ul className="space-y-2">
              {activePractical.apparatus.map((item, idx) => (
                <li key={idx} className="text-xs text-white/80 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Theory & Formula */}
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-3">
            <h3 className="text-xs font-bold uppercase text-blue-300 tracking-wider flex items-center space-x-2">
              <Calculator className="w-4 h-4 text-blue-400" />
              <span>Theory & Mathematical Relation</span>
            </h3>
            <p className="text-xs text-white/80 leading-relaxed">{activePractical.theory}</p>
            <div className="p-3 bg-white/10 rounded-lg border border-white/10 text-sm font-mono font-bold text-cyan-300">
              {activePractical.formula}
            </div>
          </div>
        </div>

        {/* Graph Analysis Guide */}
        <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-white space-y-3">
          <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center space-x-2">
            <BarChart2 className="w-4 h-4 text-emerald-400" />
            <span>Linear Graph Plotting & Slope Interpretation</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-white/40 block text-[10px] uppercase font-bold">X-Axis Plot</span>
              <span className="font-semibold text-white">{activePractical.variablesToGraph.xAxis}</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-white/40 block text-[10px] uppercase font-bold">Y-Axis Plot</span>
              <span className="font-semibold text-white">{activePractical.variablesToGraph.yAxis}</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-emerald-300 block text-[10px] uppercase font-bold">Graph Gradient Represents</span>
              <span className="font-semibold text-emerald-200">{activePractical.variablesToGraph.gradientRepresents}</span>
            </div>
          </div>
        </div>

        {/* Interactive Lab Data Calculator */}
        {activePractical.sampleCalculation && (
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Interactive Lab Data Calculator</h3>
                <p className="text-xs text-white/50">Enter your experimental readings to compute exact target physical quantity</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {activePractical.sampleCalculation.inputs.map((inp, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="block text-xs font-bold text-white/80">
                    {inp.name} ({inp.unit}):
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={calcInputs[inp.name] !== undefined ? calcInputs[inp.name] : inp.defaultValue}
                    onChange={(e) => handleInputChange(inp.name, parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/20 focus:border-blue-500/50 text-sm font-semibold text-white outline-none"
                  />
                </div>
              ))}
            </div>

            {calcResult && (
              <div className="p-4 rounded-xl bg-white/10 text-white flex flex-wrap items-center justify-between gap-3 border border-white/10">
                <div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">
                    Calculated Result ({activePractical.sampleCalculation.formulaDescription})
                  </span>
                  <div className="text-2xl font-extrabold text-cyan-300 font-mono">
                    {calcResult.result} <span className="text-sm font-normal text-white/70">{calcResult.unit}</span>
                  </div>
                </div>
                {calcResult.errorMargin && (
                  <div className="text-xs px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-medium">
                    Estimated Uncertainty: {calcResult.errorMargin}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Procedure Steps */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider flex items-center space-x-2">
            <ListOrdered className="w-4 h-4 text-blue-400" />
            <span>Step-by-Step Procedure</span>
          </h3>
          <div className="space-y-2">
            {activePractical.procedureSteps.map((step, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white/80 flex items-start space-x-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Safety Precautions & Sources of Error */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Safety Precautions</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-amber-200/80">
              {activePractical.precautions.map((p, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-2">
            <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center space-x-1.5">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>Key Sources of Error</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-rose-200/80">
              {activePractical.sourcesOfError.map((err, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Common Viva / Exam Questions */}
        {activePractical.commonVivaQuestions && activePractical.commonVivaQuestions.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h3 className="text-sm font-bold text-white/80 uppercase tracking-wider flex items-center space-x-2">
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>Common Viva & Exam Questions</span>
            </h3>

            <div className="space-y-2">
              {activePractical.commonVivaQuestions.map((qa, idx) => {
                const isExpanded = expandedVivaIndex === idx;
                return (
                  <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-white/5">
                    <button
                      onClick={() => setExpandedVivaIndex(isExpanded ? null : idx)}
                      className="w-full text-left p-3.5 hover:bg-white/10 flex items-center justify-between text-xs sm:text-sm font-bold text-white transition-all"
                    >
                      <span className="pr-2">Q{idx + 1}: {qa.question}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-white/50 shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/50 shrink-0" />}
                    </button>

                    {isExpanded && (
                      <div className="p-3.5 bg-white/5 text-xs text-white/80 leading-relaxed border-t border-white/10">
                        <span className="font-bold text-blue-300 block mb-1">Answer:</span>
                        {qa.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
