import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  FileText,
  AlertTriangle,
  Copy,
  Check,
  ChevronRight,
  Filter,
  Plus,
  Compass,
  Activity,
  Flame,
  Globe,
  Zap,
  Magnet,
  Cpu,
  Layers,
  Droplet,
  Sun,
  Atom,
  Eye,
} from 'lucide-react';
import { PHYSICS_TOPICS, DEFAULT_SHORT_NOTES } from '../data/physicsData';
import { ShortNote, PhysicsTopicId } from '../types';

export const ShortNotesTab: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<PhysicsTopicId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [notesList, setNotesList] = useState<ShortNote[]>(DEFAULT_SHORT_NOTES);
  const [customSubtopic, setCustomSubtopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const topicIconMap: Record<string, React.ReactNode> = {
    mechanics: <Compass className="w-4 h-4 text-amber-500" />,
    oscillations_waves: <Activity className="w-4 h-4 text-cyan-500" />,
    thermal_physics: <Flame className="w-4 h-4 text-rose-500" />,
    gravitational_fields: <Globe className="w-4 h-4 text-blue-500" />,
    electrostatic_fields: <Zap className="w-4 h-4 text-yellow-500" />,
    magnetic_fields: <Magnet className="w-4 h-4 text-indigo-500" />,
    current_electricity: <Cpu className="w-4 h-4 text-emerald-500" />,
    electronics: <Layers className="w-4 h-4 text-purple-500" />,
    properties_matter: <Droplet className="w-4 h-4 text-teal-500" />,
    matter_radiation: <Sun className="w-4 h-4 text-orange-500" />,
    nuclear_physics: <Atom className="w-4 h-4 text-red-500" />,
    geometrical_optics: <Eye className="w-4 h-4 text-pink-500" />,
  };

  const filteredNotes = notesList.filter((note) => {
    const matchesTopic = selectedTopicId === 'all' || note.topicId === selectedTopicId;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subtopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.topicName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const generateCustomNote = async () => {
    if (!customSubtopic.trim()) return;

    setIsGenerating(true);
    const targetTopicObj = PHYSICS_TOPICS.find((t) => t.id === selectedTopicId) || PHYSICS_TOPICS[0];
    const isSinhala = /[\u0D80-\u0DFF]/.test(customSubtopic);

    try {
      const response = await fetch('/api/generate-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicName: targetTopicObj.name,
          subtopic: customSubtopic,
          language: isSinhala ? 'sinhala' : 'english',
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate note');
      }

      const generated = data.note;
      const newNote: ShortNote = {
        id: `custom_${Date.now()}`,
        topicId: targetTopicObj.id,
        topicName: targetTopicObj.name,
        subtopic: customSubtopic,
        title: generated.title || customSubtopic,
        summary: generated.summary || '',
        coreConcepts: generated.coreConcepts || [],
        keyFormulas: (generated.keyFormulas || []).map((f: any) => ({
          name: f.name || 'Equation',
          symbolicFormula: f.symbolicFormula || f.formula || '',
          variableDefinitions: f.variableDefinitions || f.explanation || '',
          units: f.units || '',
        })),
        examTraps: generated.examTraps || [],
        derivationSummary: generated.derivationSummary || '',
      };

      setNotesList([newNote, ...notesList]);
      setCustomSubtopic('');
    } catch (err: any) {
      alert(`Error generating note: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyNoteText = (note: ShortNote) => {
    const text = `=== A/L PHYSICS SHORT NOTE: ${note.title} ===
Topic: ${note.topicName} (${note.subtopic})

SUMMARY:
${note.summary}

CORE CONCEPTS:
${note.coreConcepts.map((c, idx) => `${idx + 1}. ${c}`).join('\n')}

KEY FORMULAS:
${note.keyFormulas.map((f) => `- ${f.name}: ${f.symbolicFormula} [Units: ${f.units}] (${f.variableDefinitions})`).join('\n')}

EXAM TRAPS:
${note.examTraps.map((t) => `! ${t}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
            <span>A/L Physics Revision Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Structured Topic Short Notes & AI Note Generator
          </h1>
          <p className="text-white/70 text-sm sm:text-base leading-relaxed">
            Browse exam-focused short notes categorized by Advanced Level Physics topics, complete with physical laws, unit breakdowns, formula derivations, and common exam traps.
          </p>
        </div>
      </div>

      {/* AI Custom Short Note Generator Bar */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/10 space-y-3 text-white">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Generate AI Short Note for Any Subtopic</span>
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={customSubtopic}
            onChange={(e) => setCustomSubtopic(e.target.value)}
            placeholder="e.g. Doppler Effect frequency shift for moving source, Photoelectric cutoff potential, Bernoulli fluid flow..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/20 focus:border-blue-500/50 text-white text-sm outline-none placeholder:text-white/30"
          />
          <button
            onClick={generateCustomNote}
            disabled={isGenerating || !customSubtopic.trim()}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold border border-blue-400/30 shadow-lg shadow-blue-500/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-50 shrink-0"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Generate Note</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Topic Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search short notes by concept, formula, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/20 focus:border-blue-500/50 text-sm text-white placeholder:text-white/30 outline-none"
          />
        </div>

        {/* Topic Selector */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          <Filter className="w-4 h-4 text-white/40 shrink-0" />
          <button
            onClick={() => setSelectedTopicId('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedTopicId === 'all'
                ? 'bg-blue-600/80 text-white border-blue-400/40 shadow-lg shadow-blue-500/20'
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            All Topics ({notesList.length})
          </button>
          {PHYSICS_TOPICS.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center space-x-1.5 transition-all border ${
                selectedTopicId === topic.id
                  ? 'bg-blue-600/80 text-white border-blue-400/40 shadow-lg shadow-blue-500/20'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {topicIconMap[topic.id]}
              <span>{topic.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes List Display */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 space-y-3 text-white">
          <BookOpen className="w-10 h-10 text-white/30 mx-auto" />
          <h3 className="text-base font-bold text-white">No short notes match your filter</h3>
          <p className="text-xs text-white/50">Try searching for a different keyword or generate a new note above using Gemini AI.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10 space-y-5 text-white hover:border-white/20 transition-all"
            >
              {/* Note Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {note.topicName}
                    </span>
                    <span className="text-xs font-semibold text-white/50">• {note.subtopic}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white">{note.title}</h2>
                </div>

                <button
                  onClick={() => copyNoteText(note)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-blue-300 text-xs font-semibold border border-white/10 transition-all shrink-0"
                >
                  {copiedId === note.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === note.id ? 'Copied' : 'Copy Note'}</span>
                </button>
              </div>

              {/* Note Summary */}
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                {note.summary}
              </p>

              {/* Core Concepts */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider">Core Concepts & Physical Principles</h4>
                <ul className="space-y-2">
                  {note.coreConcepts.map((concept, i) => (
                    <li key={i} className="text-xs sm:text-sm text-white/80 flex items-start space-x-2 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                      <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Formulas */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white/50 uppercase tracking-wider flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Key Formulas & Variable Breakdown</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {note.keyFormulas.map((formula, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-200">{formula.name}</span>
                        {formula.units && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 border border-blue-400/30">
                            [{formula.units}]
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-mono font-bold text-cyan-300 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 inline-block my-1">
                        {formula.symbolicFormula}
                      </div>
                      <p className="text-xs text-white/70">{formula.variableDefinitions}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Derivation Summary if available */}
              {note.derivationSummary && (
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <h5 className="text-xs font-bold text-white/80">Key Derivation Logic:</h5>
                  <p className="text-xs text-white/70 leading-relaxed">{note.derivationSummary}</p>
                </div>
              )}

              {/* Exam Traps */}
              {note.examTraps && note.examTraps.length > 0 && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                  <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span>Exam Traps & Common Errors</span>
                  </h5>
                  <ul className="space-y-1 text-xs text-amber-200/80">
                    {note.examTraps.map((trap, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <span className="font-bold text-amber-400">!</span>
                        <span>{trap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
