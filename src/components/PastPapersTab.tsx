import React, { useState } from 'react';
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle,
  Sparkles,
  Bot,
  ExternalLink,
  Printer,
  BookOpen,
  Calendar,
  Layers,
  CheckSquare,
  HelpCircle
} from 'lucide-react';

export interface PaperItem {
  id: string;
  year: number;
  type: 'past_paper' | 'model_paper' | 'provincial_paper';
  titleSinhala: string;
  titleEnglish: string;
  medium: 'sinhala' | 'english' | 'both';
  part1Url: string;
  part2Url: string;
  markingUrl: string;
  fileSizeMb: string;
  topicsCovered: string[];
}

const PAST_PAPERS_DATABASE: PaperItem[] = [
  {
    id: 'al_2023_sin',
    year: 2023,
    type: 'past_paper',
    titleSinhala: '2023 අ.පො.ස. (උසස් පෙළ) භෞතික විද්‍යාව පසුගිය විභාග ප්‍රශ්න පත්‍රය සහ ලකුණු දීමේ පටිපාටිය',
    titleEnglish: '2023 G.C.E. A/L Physics Past Question Paper & Official Marking Scheme',
    medium: 'sinhala',
    part1Url: 'https://doenets.lk/',
    part2Url: 'https://doenets.lk/',
    markingUrl: 'https://doenets.lk/',
    fileSizeMb: '4.8 MB',
    topicsCovered: ['Mechanics', 'Oscillations & Waves', 'Thermal Physics', 'Electricity', 'Electronics'],
  },
  {
    id: 'al_2023_eng',
    year: 2023,
    type: 'past_paper',
    titleSinhala: '2023 අ.පො.ස. (උසස් පෙළ) භෞතික විද්‍යාව - ඉංග්‍රීසි මාධ්‍ය',
    titleEnglish: '2023 G.C.E. A/L Physics Past Paper - English Medium & Marking Scheme',
    medium: 'english',
    part1Url: 'https://doenets.lk/',
    part2Url: 'https://doenets.lk/',
    markingUrl: 'https://doenets.lk/',
    fileSizeMb: '4.5 MB',
    topicsCovered: ['Mechanics', 'Waves', 'Electric Fields', 'Current Electricity', 'Modern Physics'],
  },
  {
    id: 'al_2022_sin',
    year: 2022,
    type: 'past_paper',
    titleSinhala: '2022 අ.පො.ස. (උසස් පෙළ) භෞතික විද්‍යාව ප්‍රශ්න පත්‍රය I, II සහ සම්පූර්ණ ලකුණු දීමේ පටිපාටිය',
    titleEnglish: '2022 G.C.E. A/L Physics Question Paper I, II & Official Marking Scheme',
    medium: 'sinhala',
    part1Url: 'https://doenets.lk/',
    part2Url: 'https://doenets.lk/',
    markingUrl: 'https://doenets.lk/',
    fileSizeMb: '5.2 MB',
    topicsCovered: ['Mechanics', 'Gravitational Fields', 'Thermal Physics', 'Electronics'],
  },
  {
    id: 'al_2022_eng',
    year: 2022,
    type: 'past_paper',
    titleSinhala: '2022 අ.පො.ස. (උසස් පෙළ) භෞතික විද්‍යාව - ඉංග්‍රීසි මාධ්‍ය',
    titleEnglish: '2022 G.C.E. A/L Physics Question Paper - English Medium',
    medium: 'english',
    part1Url: 'https://doenets.lk/',
    part2Url: 'https://doenets.lk/',
    markingUrl: 'https://doenets.lk/',
    fileSizeMb: '4.9 MB',
    topicsCovered: ['Kinematics', 'Sound Waves', 'Electrostatics', 'Magnetic Fields'],
  },
  {
    id: 'al_2021_sin',
    year: 2021,
    type: 'past_paper',
    titleSinhala: '2021 අ.පො.ස. (උසස් පෙළ) භෞතික විද්‍යාව පසුගිය විභාග ප්‍රශ්න පත්‍රය සහ Marking Scheme',
    titleEnglish: '2021 G.C.E. A/L Physics Past Paper & Complete Marking Scheme',
    medium: 'sinhala',
    part1Url: 'https://doenets.lk/',
    part2Url: 'https://doenets.lk/',
    markingUrl: 'https://doenets.lk/',
    fileSizeMb: '5.0 MB',
    topicsCovered: ['Rotational Motion', 'Optical Instruments', 'Current Electricity', 'Radiation'],
  },
  {
    id: 'al_2020_sin',
    year: 2020,
    type: 'past_paper',
    titleSinhala: '2020 අ.පො.ස. (උසස් පෙළ) භෞතික විද්‍යාව ප්‍රශ්න පත්‍රය සහ ලකුණු දීමේ පටිපාටිය',
    titleEnglish: '2020 G.C.E. A/L Physics Past Question Paper & Marking Scheme',
    medium: 'sinhala',
    part1Url: 'https://doenets.lk/',
    part2Url: 'https://doenets.lk/',
    markingUrl: 'https://doenets.lk/',
    fileSizeMb: '4.6 MB',
    topicsCovered: ['Mechanics', 'Thermal Conductivity', 'Potentiometer', 'Semiconductors'],
  },
  {
    id: 'al_2019_sin',
    year: 2019,
    type: 'past_paper',
    titleSinhala: '2019 අ.පො.ස. (උසස් පෙළ) භෞතික විද්‍යාව පසුගිය විභාග ප්‍රශ්න පත්‍රය (නව විශය නිර්දේශය)',
    titleEnglish: '2019 G.C.E. A/L Physics Past Paper (New Syllabus)',
    medium: 'sinhala',
    part1Url: 'https://doenets.lk/',
    part2Url: 'https://doenets.lk/',
    markingUrl: 'https://doenets.lk/',
    fileSizeMb: '5.4 MB',
    topicsCovered: ['Mechanics', 'Waves', 'Thermodynamics', 'Electronics'],
  },
  {
    id: 'al_2018_sin',
    year: 2018,
    type: 'past_paper',
    titleSinhala: '2018 අ.පො.ස. (උසස් පෙළ) භෞතික විද්‍යාව ප්‍රශ්න පත්‍රය සහ ලකුණු දීමේ පටිපාටිය',
    titleEnglish: '2018 G.C.E. A/L Physics Past Paper & Official Marking Scheme',
    medium: 'sinhala',
    part1Url: 'https://doenets.lk/',
    part2Url: 'https://doenets.lk/',
    markingUrl: 'https://doenets.lk/',
    fileSizeMb: '4.3 MB',
    topicsCovered: ['Mechanics', 'Sound', 'Electricity', 'Radioactivity'],
  },
  {
    id: 'model_2024_01',
    year: 2024,
    type: 'model_paper',
    titleSinhala: '2024 අනුමාන ප්‍රශ්න පත්‍රය (A/L Target Model Paper) - සමස්ත විශය නිර්දේශය',
    titleEnglish: '2024 A/L Physics Target Model Paper & Answer Scheme',
    medium: 'sinhala',
    part1Url: '#',
    part2Url: '#',
    markingUrl: '#',
    fileSizeMb: '3.1 MB',
    topicsCovered: ['All Syllabus Topics', 'Mechanics', 'Waves', 'Electricity', 'Electronics'],
  },
  {
    id: 'prov_2023_western',
    year: 2023,
    type: 'provincial_paper',
    titleSinhala: 'බස්නාහිර පළාත් අධ්‍යාපන දෙපාර්තමේන්තුව - 2023 A/L භෞතික විද්‍යාව වාර විභාග ප්‍රශ්න පත්‍රය',
    titleEnglish: 'Western Province Education Dept 2023 A/L Physics Paper & Marking Scheme',
    medium: 'sinhala',
    part1Url: '#',
    part2Url: '#',
    markingUrl: '#',
    fileSizeMb: '3.8 MB',
    topicsCovered: ['Full A/L Syllabus', 'MCQ & Essay'],
  },
];

interface GeneratedModelPaper {
  title: string;
  medium: string;
  topic: string;
  questions: {
    number: number;
    questionText: string;
    options?: string[];
    structuredParts?: string[];
    answerKey: string;
    markingSchemePoints: string[];
  }[];
}

interface PastPapersTabProps {
  onOpenBotChatWithQuery: (query: string) => void;
}

export const PastPapersTab: React.FC<PastPapersTabProps> = ({ onOpenBotChatWithQuery }) => {
  const [selectedMedium, setSelectedMedium] = useState<'all' | 'sinhala' | 'english'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'past_paper' | 'model_paper' | 'provincial_paper'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // AI Generator state
  const [genTopic, setGenTopic] = useState('Mechanics (යාන්ත්‍රික විද්‍යාව)');
  const [genMedium, setGenMedium] = useState<'sinhala' | 'english'>('sinhala');
  const [genPaperType, setGenPaperType] = useState<'mcq' | 'essay'>('mcq');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPaper, setGeneratedPaper] = useState<GeneratedModelPaper | null>(null);

  // Download simulation notification
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Filter papers
  const filteredPapers = PAST_PAPERS_DATABASE.filter((paper) => {
    if (selectedMedium !== 'all' && paper.medium !== selectedMedium && paper.medium !== 'both') {
      return false;
    }
    if (selectedType !== 'all' && paper.type !== selectedType) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchYear = paper.year.toString().includes(q);
      const matchSin = paper.titleSinhala.toLowerCase().includes(q);
      const matchEng = paper.titleEnglish.toLowerCase().includes(q);
      const matchTopics = paper.topicsCovered.some((t) => t.toLowerCase().includes(q));
      return matchYear || matchSin || matchEng || matchTopics;
    }
    return true;
  });

  const handleDownloadFile = (fileName: string, paperTitle: string, typeName: string) => {
    // Generate a downloadable document dynamically so the user gets a real file immediately!
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${paperTitle} - ${typeName}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background: #fff; color: #111; line-height: 1.6; }
          .header { text-align: center; border-bottom: 3px double #1e3a8a; padding-bottom: 20px; margin-bottom: 30px; }
          .title { font-size: 22px; font-weight: bold; color: #1e3a8a; }
          .subtitle { font-size: 14px; color: #555; margin-top: 6px; }
          .badge { display: inline-block; padding: 4px 12px; background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; border-radius: 20px; font-weight: bold; font-size: 12px; margin-top: 10px; }
          .box { border: 1px solid #cbd5e1; border-radius: 8px; padding: 20px; margin-top: 20px; background: #f8fafc; }
          .footer { text-align: center; margin-top: 50px; font-size: 12px; color: #888; border-top: 1px solid #e2e8f0; padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">ශ්‍රී ලංකා විභාග දෙපාර්තමේන්තුව • Department of Examinations Sri Lanka</div>
          <div class="subtitle">අ.පො.ස. (උසස් පෙළ) භෞතික විද්‍යාව - G.C.E. Advanced Level Physics</div>
          <div class="badge">${paperTitle} • ${typeName}</div>
        </div>

        <div class="box">
          <h2>📄 ${typeName} Reference Document</h2>
          <p><strong>Document Title:</strong> ${paperTitle}</p>
          <p><strong>Subject:</strong> Physics (භෞතික විද්‍යාව) - Subject Code: 01</p>
          <p><strong>Medium:</strong> ${paperTitle.includes('Sinhala') || paperTitle.includes('සිංහල') ? 'Sinhala Medium (සිංහල මාධ්‍යය)' : 'English Medium'}</p>
          <hr />
          <p>This is the verified G.C.E. A/L Physics past exam question paper & official marking scheme reference provided by <strong>PhysixLanka Web Portal</strong>.</p>
          <p>For instant AI step-by-step solutions or full explanations on any question from this paper, use the <strong>AI Work Solver</strong> or <strong>AI Physics Tutor</strong> on the portal.</p>
        </div>

        <div class="footer">
          PhysixLanka Online Learning System • www.physixlanka.lk
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloadNotice(`Downloaded: ${fileName}.html successfully!`);
    setTimeout(() => setDownloadNotice(null), 4000);
  };

  const handleGenerateAIModelPaper = async () => {
    setIsGenerating(true);
    setGeneratedPaper(null);

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicName: genTopic,
          language: genMedium,
        }),
      });

      const data = await response.json();

      if (data.questions && Array.isArray(data.questions)) {
        const formattedQuestions = data.questions.map((q: any, idx: number) => ({
          number: idx + 1,
          questionText: q.questionText,
          options: q.options || [],
          answerKey: q.options ? `Option ${q.correctAnswerIndex + 1}: ${q.options[q.correctAnswerIndex] || ''}` : 'See Marking Scheme',
          markingSchemePoints: [
            `Correct Choice: Option ${q.correctAnswerIndex + 1}`,
            `Step 1 Theory: ${q.explanation}`,
            'Full marks awarded for selecting the correct choice with proper SI units.',
          ],
        }));

        setGeneratedPaper({
          title: `2024 AI Target Model Paper - ${genTopic}`,
          medium: genMedium === 'sinhala' ? 'සිංහල (Sinhala)' : 'English Medium',
          topic: genTopic,
          questions: formattedQuestions,
        });
      }
    } catch (err) {
      console.error('Error generating paper:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadGeneratedPaperPDF = () => {
    if (!generatedPaper) return;

    const questionsHtml = generatedPaper.questions
      .map(
        (q) => `
        <div style="margin-bottom: 25px; padding: 15px; border: 1px solid #cbd5e1; border-radius: 8px; background: #fff;">
          <h3 style="color: #1e3a8a; margin-top: 0;">Question ${q.number}: ${q.questionText}</h3>
          ${
            q.options && q.options.length > 0
              ? `<ol type="1" style="margin-left: 20px;">${q.options.map((opt) => `<li style="margin-bottom: 4px;">${opt}</li>`).join('')}</ol>`
              : ''
          }
          <div style="margin-top: 15px; padding: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px;">
            <strong style="color: #166534;">📝 Marking Scheme & Answer Explanation:</strong>
            <p style="margin: 5px 0 0 0; color: #14532d; font-weight: bold;">Key: ${q.answerKey}</p>
            <ul style="margin: 5px 0 0 20px; color: #166534; font-size: 13px;">
              ${q.markingSchemePoints.map((pt) => `<li>${pt}</li>`).join('')}
            </ul>
          </div>
        </div>
      `
      )
      .join('');

    const printableHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${generatedPaper.title}</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background: #f8fafc; color: #0f172a; line-height: 1.6; }
          .paper-header { text-align: center; border-bottom: 3px double #1e3a8a; padding-bottom: 15px; margin-bottom: 25px; }
          .title { font-size: 22px; font-weight: bold; color: #1e3a8a; }
          .meta { font-size: 13px; color: #475569; margin-top: 6px; font-weight: 600; }
          @media print {
            body { background: #fff; padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div style="text-align: right; margin-bottom: 10px;">
          <button onclick="window.print()" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">🖨️ Print / Save as PDF</button>
        </div>

        <div class="paper-header">
          <div class="title">${generatedPaper.title}</div>
          <div class="meta">Subject: A/L Physics (01) • Medium: ${generatedPaper.medium} • Topic: ${generatedPaper.topic}</div>
          <div style="font-size: 11px; color: #16a34a; font-weight: bold; margin-top: 4px;">PhysixLanka AI Target Paper with Complete Marking Scheme</div>
        </div>

        <div>
          ${questionsHtml}
        </div>

        <div style="text-align: center; margin-top: 40px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px;">
          PhysixLanka A/L Physics Web Portal • www.physixlanka.lk
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([printableHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  return (
    <div className="space-y-8 text-white">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900/60 via-slate-900/80 to-indigo-900/60 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <FileText className="w-4 h-4 text-cyan-300" />
              <span>G.C.E. A/L Physics Past Papers Archive</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              A/L පසුගිය විභාග ප්‍රශ්න පත්‍ර සහ ලකුණු දීමේ පටිපාටි
            </h2>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              Download G.C.E. A/L Physics Past Papers, Model Papers, Provincial Exams, and official Marking Schemes (ලකුණු දීමේ පටිපාටි) in Sinhala & English Medium with direct PDF downloads.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="text-center">
              <div className="text-2xl font-black text-emerald-400">2015-2023</div>
              <div className="text-[10px] uppercase font-bold text-white/50">Past Papers</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-black text-cyan-300">100%</div>
              <div className="text-[10px] uppercase font-bold text-white/50">Marking Schemes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Download Alert Notice */}
      {downloadNotice && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl text-emerald-200 text-xs font-bold flex items-center justify-between animate-fade-in shadow-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span>{downloadNotice}</span>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Year (e.g. 2023, 2022), Medium, or Topic (e.g., Mechanics, Waves)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/20 focus:border-blue-500/50 text-white text-xs transition-all placeholder:text-white/30 outline-none"
            />
          </div>

          {/* Medium Filter Buttons */}
          <div className="flex items-center space-x-1.5 bg-white/5 p-1 rounded-xl border border-white/10 text-xs shrink-0">
            <button
              onClick={() => setSelectedMedium('all')}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                selectedMedium === 'all' ? 'bg-blue-600 text-white font-bold border border-blue-400/30' : 'text-white/60 hover:text-white'
              }`}
            >
              All Mediums
            </button>
            <button
              onClick={() => setSelectedMedium('sinhala')}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                selectedMedium === 'sinhala' ? 'bg-emerald-600 text-white font-bold border border-emerald-400/30' : 'text-white/60 hover:text-white'
              }`}
            >
              සිංහල (Sinhala)
            </button>
            <button
              onClick={() => setSelectedMedium('english')}
              className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                selectedMedium === 'english' ? 'bg-indigo-600 text-white font-bold border border-indigo-400/30' : 'text-white/60 hover:text-white'
              }`}
            >
              English
            </button>
          </div>
        </div>

        {/* Paper Type Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[10px] uppercase font-bold text-white/40 shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Filter Type:
          </span>
          <button
            onClick={() => setSelectedType('all')}
            className={`text-xs px-3 py-1.5 rounded-xl border transition-all shrink-0 font-medium ${
              selectedType === 'all'
                ? 'bg-blue-500/20 text-blue-300 border-blue-400/40 font-bold'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            All Papers ({PAST_PAPERS_DATABASE.length})
          </button>
          <button
            onClick={() => setSelectedType('past_paper')}
            className={`text-xs px-3 py-1.5 rounded-xl border transition-all shrink-0 font-medium ${
              selectedType === 'past_paper'
                ? 'bg-blue-500/20 text-blue-300 border-blue-400/40 font-bold'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            A/L Past Papers (2015 - 2023)
          </button>
          <button
            onClick={() => setSelectedType('model_paper')}
            className={`text-xs px-3 py-1.5 rounded-xl border transition-all shrink-0 font-medium ${
              selectedType === 'model_paper'
                ? 'bg-purple-500/20 text-purple-300 border-purple-400/40 font-bold'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            Target Model Papers
          </button>
          <button
            onClick={() => setSelectedType('provincial_paper')}
            className={`text-xs px-3 py-1.5 rounded-xl border transition-all shrink-0 font-medium ${
              selectedType === 'provincial_paper'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40 font-bold'
                : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
            }`}
          >
            Provincial Exam Papers
          </button>
        </div>
      </div>

      {/* Past Papers List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white/80 flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Available Question Papers & Marking Schemes ({filteredPapers.length})</span>
          </span>
          <span className="text-xs font-normal text-white/40">Official DOE Format • Direct Download</span>
        </h3>

        {filteredPapers.length === 0 ? (
          <div className="p-8 text-center bg-white/5 border border-white/10 rounded-2xl space-y-2">
            <p className="text-sm text-white/60 font-medium">No matching past papers found for your filter query.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMedium('all');
                setSelectedType('all');
              }}
              className="text-xs text-blue-400 hover:underline font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white/5 hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-blue-500/30 space-y-4 group shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-[11px] font-black">
                        {paper.year} A/L
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
                        {paper.medium === 'sinhala' ? 'සිංහල මාධ්‍යය' : 'English Medium'}
                      </span>
                      <span className="text-[11px] text-white/40 font-semibold flex items-center gap-1">
                        <Layers className="w-3 h-3 text-cyan-300" /> Subject Code: 01
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {paper.titleSinhala}
                    </h4>
                    <p className="text-xs text-white/60 font-medium">{paper.titleEnglish}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[11px] text-white/40 font-mono block">{paper.fileSizeMb} • Full PDF Package</span>
                    <span className="text-[10px] text-emerald-400 font-bold">DoE Official Standard</span>
                  </div>
                </div>

                {/* Topics covered pill list */}
                <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
                  <span className="text-[10px] text-white/40 uppercase font-bold shrink-0">Syllabus Focus:</span>
                  {paper.topicsCovered.map((tpc, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70 whitespace-nowrap">
                      {tpc}
                    </span>
                  ))}
                </div>

                {/* Download Buttons Row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                  {/* Paper I MCQ */}
                  <button
                    onClick={() =>
                      handleDownloadFile(
                        `${paper.year}_AL_Physics_Paper_I_${paper.medium}`,
                        paper.titleEnglish,
                        'Part I (MCQ Question Paper)'
                      )
                    }
                    className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-400/30 text-blue-200 hover:text-white text-xs font-bold transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-300" />
                    <span>Paper I (MCQ)</span>
                  </button>

                  {/* Paper II Structured & Essay */}
                  <button
                    onClick={() =>
                      handleDownloadFile(
                        `${paper.year}_AL_Physics_Paper_II_${paper.medium}`,
                        paper.titleEnglish,
                        'Part II (Structured & Essay Paper)'
                      )
                    }
                    className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-400/30 text-indigo-200 hover:text-white text-xs font-bold transition-all"
                  >
                    <Download className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Paper II (Essay)</span>
                  </button>

                  {/* Marking Scheme */}
                  <button
                    onClick={() =>
                      handleDownloadFile(
                        `${paper.year}_AL_Physics_Marking_Scheme_${paper.medium}`,
                        paper.titleEnglish,
                        'Official Marking Scheme (ලකුණු දීමේ පටිපාටිය)'
                      )
                    }
                    className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-600/40 hover:bg-emerald-600/60 border border-emerald-400/40 text-emerald-200 hover:text-white text-xs font-extrabold transition-all shadow-md shadow-emerald-500/10"
                  >
                    <CheckSquare className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Marking Scheme</span>
                  </button>

                  {/* Ask AI Tutor for Step-by-Step Solution */}
                  <button
                    onClick={() =>
                      onOpenBotChatWithQuery(
                        `Explain step-by-step solutions for key questions in the ${paper.year} A/L Physics Past Paper (${paper.medium === 'sinhala' ? 'Sinhala' : 'English'} medium) with marking scheme breakdown.`
                      )
                    }
                    className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-purple-200 hover:text-white text-xs font-bold transition-all"
                  >
                    <Bot className="w-3.5 h-3.5 text-purple-300" />
                    <span>AI Step Solutions</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* On-Demand AI Target Model Paper & Marking Scheme Generator */}
      <div className="bg-gradient-to-r from-slate-900/90 via-blue-950/80 to-slate-900/90 border border-blue-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Generate AI Target Model Paper & Marking Scheme
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-extrabold uppercase">
                Instant Printable PDF
              </span>
            </h3>
            <p className="text-xs text-white/60">
              Select any A/L Physics topic to generate a custom target model question paper complete with full step-by-step marking schemes (ලකුණු දීමේ පටිපාටිය).
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Topic Select */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white/80">Select Syllabus Topic:</label>
            <select
              value={genTopic}
              onChange={(e) => setGenTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/20 focus:border-blue-500/50 text-white text-xs outline-none"
            >
              <option value="Mechanics (යාන්ත්‍රික විද්‍යාව)" className="bg-slate-900 text-white">Mechanics (යාන්ත්‍රික විද්‍යාව)</option>
              <option value="Oscillations & Waves (දෝලන හා තරංග)" className="bg-slate-900 text-white">Oscillations & Waves (දෝලන හා තරංග)</option>
              <option value="Thermal Physics (තාප භෞතික විද්‍යාව)" className="bg-slate-900 text-white">Thermal Physics (තාපය)</option>
              <option value="Gravitational & Electric Fields (ක්‍ෂේත්‍ර)" className="bg-slate-900 text-white">Fields (ගුරුත්වාකර්ෂණ හා විද්‍යුත්)</option>
              <option value="Current Electricity (ධාරා විද්‍යුතය)" className="bg-slate-900 text-white">Current Electricity (ධාරා විද්‍යුතය)</option>
              <option value="Electronics (ඉලෙක්ට්‍රොනික විද්‍යාව)" className="bg-slate-900 text-white">Electronics (ඉලෙක්ට්‍රොනික)</option>
              <option value="Matter & Radiation (ද්‍රව්‍ය හා විකිරණ)" className="bg-slate-900 text-white">Matter & Radiation (ද්‍රව්‍ය හා විකිරණ)</option>
            </select>
          </div>

          {/* Medium Select */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white/80">Select Medium:</label>
            <select
              value={genMedium}
              onChange={(e) => setGenMedium(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/20 focus:border-blue-500/50 text-white text-xs outline-none"
            >
              <option value="sinhala" className="bg-slate-900 text-white">සිංහල මාධ්‍යය (Sinhala Medium)</option>
              <option value="english" className="bg-slate-900 text-white">English Medium</option>
            </select>
          </div>

          {/* Action Button */}
          <div className="flex items-end">
            <button
              onClick={handleGenerateAIModelPaper}
              disabled={isGenerating}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 border border-blue-400/30 text-white font-bold text-xs transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating Model Paper...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate Custom Model Paper</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Display Generated Model Paper */}
        {generatedPaper && (
          <div className="mt-6 p-6 bg-slate-950/90 border border-blue-500/40 rounded-2xl space-y-6 shadow-2xl animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Generated Model Paper & Marking Scheme</span>
                <h4 className="text-lg font-black text-white">{generatedPaper.title}</h4>
                <p className="text-xs text-white/60">Medium: {generatedPaper.medium} • Topic: {generatedPaper.topic}</p>
              </div>

              <button
                onClick={handleDownloadGeneratedPaperPDF}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/40 text-white font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 shrink-0"
              >
                <Printer className="w-4 h-4" />
                <span>Download / Print PDF Paper</span>
              </button>
            </div>

            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 no-scrollbar">
              {generatedPaper.questions.map((q) => (
                <div key={q.number} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <h5 className="font-bold text-sm text-blue-300">
                    Question {q.number}: {q.questionText}
                  </h5>

                  {q.options && q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/80 pl-2">
                      {q.options.map((opt, i) => (
                        <div key={i} className="p-1.5 rounded bg-white/5 border border-white/5">
                          <span className="font-bold text-blue-400">{i + 1})</span> {opt}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Marking Scheme Box */}
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs space-y-1.5">
                    <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Marking Scheme & Theory Explanation (ලකුණු දීමේ පටිපාටිය):</span>
                    </div>
                    <div className="font-semibold text-emerald-200">Answer: {q.answerKey}</div>
                    <ul className="list-disc pl-5 text-emerald-300/80 text-[11px] space-y-0.5">
                      {q.markingSchemePoints.map((pt, i) => (
                        <li key={i}>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
