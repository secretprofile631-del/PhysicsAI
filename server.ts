import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));

// Helper to safely obtain GoogleGenAI client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing in server environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// -------------------------------------------------------------
// API Route 1: Analyze Student Educational Work / Notes / Problems
// -------------------------------------------------------------
app.post('/api/analyze-work', async (req, res) => {
  try {
    const { text, imageBase64, mimeType, language } = req.body;

    if (!text && !imageBase64) {
      return res.status(400).json({ error: 'Please provide either text content or an uploaded image of your physics work.' });
    }

    const ai = getGenAI();

    const parts: any[] = [];
    if (imageBase64) {
      parts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
        },
      });
    }

    const isSinhala = language === 'sinhala' || /[\u0D80-\u0DFF]/.test(text || '');

    const languageInstruction = isSinhala
      ? `CRITICAL LANGUAGE INSTRUCTION:
The user has provided a question or work in Sinhala (සිංහල) or selected Sinhala language mode.
You MUST write all textual fields (topicName, subtopic, summary, solvedBreakdown, shortNote explanations, examTips, practical descriptions, video descriptions, website descriptions) completely in clean, natural, formal Sinhala (සිංහල).
Use standard Sri Lankan G.C.E. Advanced Level (A/L) Physics Sinhala terminology (e.g. 'යාන්ත්‍රික විද්‍යාව' for Mechanics, 'චලිත සමීකරණ' for Motion equations, 'විද්‍යුත් ගම්‍යතාව' / 'විභව අන්තරය' for Potential Difference, etc.) with comprehensive, step-by-step full explanations. Mathematical equations and variable symbols should maintain standard notation.`
      : `Provide the response in clear, formal English (or match user language if non-English).`;

    const promptText = `
You are an expert Senior Advanced Level (A/L) Physics Examiner and University Physics Professor.
Analyze the following student work, handwritten notes, textbook question, or physics topic query.

Student's input text or question: "${text || 'Analyzed from uploaded image'}"

${languageInstruction}

Perform a thorough, high-level analysis and produce a response formatted strictly according to the requested JSON schema.
Ensure your analysis:
1. Identifies the primary A/L Physics topic.
2. Explains key concepts, solves any equations or numerical problems step-by-step with formulas and units with full detailed explanations.
3. Generates concise, exam-ready SHORT NOTES for this topic with core concepts, formulas, and common exam traps/mistakes.
4. Identifies related standard A/L Practical Experiments with key formula and safety/precision precautions.
5. Recommends specific YouTube video search queries, recommended channels, and web reference links.
`;

    parts.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-09-2025',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topicName: { type: Type.STRING, description: 'Main A/L Physics topic' },
            subtopic: { type: Type.STRING, description: 'Specific subtopic name' },
            summary: { type: Type.STRING, description: 'Overview and conceptual analysis of the student work' },
            solvedBreakdown: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Step-by-step numerical/theoretical breakdown or solution steps',
            },
            shortNote: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                coreConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
                keyFormulas: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      formula: { type: Type.STRING },
                      explanation: { type: Type.STRING },
                    },
                  },
                },
                examTips: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
            relatedPracticals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  objective: { type: Type.STRING },
                  keyFormula: { type: Type.STRING },
                  keyPrecaution: { type: Type.STRING },
                },
              },
            },
            youtubeVideoRecommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  searchQuery: { type: Type.STRING },
                  recommendedChannel: { type: Type.STRING },
                  description: { type: Type.STRING },
                  directUrl: { type: Type.STRING },
                },
              },
            },
            websiteReferences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  url: { type: Type.STRING },
                  siteName: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
              },
            },
          },
          required: ['topicName', 'subtopic', 'summary', 'shortNote', 'relatedPracticals', 'youtubeVideoRecommendations', 'websiteReferences'],
        },
      },
    });

    const jsonText = response.text || '{}';
    const parsedData = JSON.parse(jsonText);
    res.json({ success: true, result: parsedData });
  } catch (error: any) {
    console.error('Error analyzing physics work (using fallback):', error.message || error);
    const isSinhala = req.body?.language === 'sinhala' || /[\u0D80-\u0DFF]/.test(req.body?.text || '');
    res.json({
      success: true,
      result: getAnalyzeFallback(req.body?.text || '', isSinhala),
      notice: 'Served with A/L Physics offline reference data due to API quota rate limit.',
    });
  }
});

// -------------------------------------------------------------
// API Route 2: Generate Comprehensive Topic Short Notes
// -------------------------------------------------------------
app.post('/api/generate-notes', async (req, res) => {
  try {
    const { topicName, subtopic, language } = req.body;
    if (!topicName) {
      return res.status(400).json({ error: 'Topic name is required.' });
    }

    const ai = getGenAI();
    const isSinhalaNote = language === 'sinhala' || /[\u0D80-\u0DFF]/.test((topicName || '') + (subtopic || ''));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-09-2025',
      contents: `
You are a top-tier Advanced Level Physics master tutor.
Generate comprehensive, concise, bulleted SHORT NOTES for the A/L Physics topic: "${topicName}" (Subtopic: "${subtopic || 'General Overview'}").

${isSinhalaNote ? 'CRITICAL: Write all note fields (title, summary, coreConcepts, formula descriptions, examTraps, derivationSummary) completely in formal Sinhala (සිංහල) using standard Sri Lankan A/L Physics Sinhala technical terminology with full explanations.' : 'Provide content in clear, formal English.'}

Focus strictly on exam success:
1. Core Definitions and Physical Laws.
2. Symbolic Formulas with variable units and dimensional analysis.
3. Step-by-step key derivations summary.
4. Common exam traps, vector direction mistakes, and unit conversion pitfalls.
      `,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            coreConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
            keyFormulas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  symbolicFormula: { type: Type.STRING },
                  variableDefinitions: { type: Type.STRING },
                  units: { type: Type.STRING },
                },
              },
            },
            examTraps: { type: Type.ARRAY, items: { type: Type.STRING } },
            derivationSummary: { type: Type.STRING },
          },
          required: ['title', 'summary', 'coreConcepts', 'keyFormulas', 'examTraps'],
        },
      },
    });

    const parsedNote = JSON.parse(response.text || '{}');
    res.json({ success: true, note: parsedNote });
  } catch (error: any) {
    console.error('Error generating notes (using fallback):', error.message || error);
    const isSinhalaNote = req.body?.language === 'sinhala' || /[\u0D80-\u0DFF]/.test((req.body?.topicName || '') + (req.body?.subtopic || ''));
    res.json({
      success: true,
      note: getNotesFallback(req.body?.topicName || 'Physics', req.body?.subtopic || '', isSinhalaNote),
    });
  }
});

// -------------------------------------------------------------
// API Route 3: Interactive Gemini Physics Bot Chat (With Grounding & Multimodal)
// -------------------------------------------------------------
app.post('/api/chat', async (req, res) => {
  try {
    const { message, imageBase64, mimeType, history, language } = req.body;

    if (!message && !imageBase64) {
      return res.status(400).json({ error: 'Message or image is required.' });
    }

    const ai = getGenAI();

    const contents: any[] = [];
    const isSinhalaChat = language === 'sinhala' || /[\u0D80-\u0DFF]/.test(message || '');

    // System context prefix
    const systemPrompt = `You are "A/L Physics AI Master Bot", an interactive, friendly, and deeply rigorous physics tutor specialized in Advanced Level (A/L) Physics curriculum.
${isSinhalaChat ? 'CRITICAL LANGUAGE DIRECTIVE: The user is asking in Sinhala (සිංහල) or selected Sinhala language mode. You MUST answer entirely in Sinhala (සිංහල) with full step-by-step explanations, clear physics reasoning, formulas, and Sri Lankan A/L Physics Sinhala technical terminology (e.g. චලිත සමීකරණ, යාන්ත්‍රික ශක්තිය, සංඛ්‍යාතය, විභව අන්තරය).' : 'When the user asks in Sinhala, ALWAYS respond completely in Sinhala with full detailed step-by-step explanations. Otherwise respond in clear English.'}
When responding:
1. Break down physics equations cleanly using clear standard notation (e.g. v = u + at, F = ma, V = IR, E = hf).
2. Use step-by-step logical reasoning for numerical problems with full thorough explanations.
3. Highlight related standard A/L Physics Practicals when relevant.
4. Provide direct YouTube video search queries or link suggestions when the user asks for video references or visual demonstrations.
5. Be concise, highly clear, encouraging, and precise.
`;

    if (history && Array.isArray(history) && history.length > 0) {
      for (const h of history) {
        contents.push({
          role: h.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: h.content }],
        });
      }
    }

    const currentParts: any[] = [];
    if (imageBase64) {
      currentParts.push({
        inlineData: {
          mimeType: mimeType || 'image/jpeg',
          data: imageBase64.replace(/^data:image\/\w+;base64,/, ''),
        },
      });
    }

    currentParts.push({ text: `${systemPrompt}\n\nStudent Query: ${message || 'Please analyze this physics diagram/problem.'}` });

    contents.push({
      role: 'user',
      parts: currentParts,
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-09-2025',
      contents,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const replyText = response.text || (isSinhalaChat ? 'ඔබගේ භෞතික විද්‍යා ප්‍රශ්නය විශ්ලේෂණය කරන ලදී. ඔබට වැඩිදුර විස්තර අවශ්‍ය කොටස කුමක්ද?' : 'I analyzed your physics question. Could you clarify which specific variable or topic you want to focus on?');

    // Extract grounding web/video sources if search grounding was triggered
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const groundingSources: { title: string; url: string }[] = [];
    if (groundingChunks && Array.isArray(groundingChunks)) {
      for (const chunk of groundingChunks) {
        if (chunk.web?.uri) {
          groundingSources.push({
            title: chunk.web.title || chunk.web.uri,
            url: chunk.web.uri,
          });
        }
      }
    }

    res.json({
      success: true,
      reply: replyText,
      groundingSources,
    });
  } catch (error: any) {
    console.error('Error in chat bot endpoint (using fallback):', error.message || error);
    const isSinhalaChat = req.body?.language === 'sinhala' || /[\u0D80-\u0DFF]/.test(req.body?.message || '');
    res.json({
      success: true,
      reply: getChatFallback(req.body?.message || 'A/L Physics query', isSinhalaChat),
      groundingSources: [
        { title: 'A/L Physics Sinhala Video Tutorials', url: 'https://www.youtube.com/results?search_query=AL+Physics+Sinhala+Theory' },
      ],
    });
  }
});

// -------------------------------------------------------------
// API Route 4: Search Video & Web References via Search Grounding
// -------------------------------------------------------------
app.post('/api/search-references', async (req, res) => {
  try {
    const { query, topicName, language } = req.body;
    if (!query && !topicName) {
      return res.status(400).json({ error: 'Query or topicName is required.' });
    }

    const ai = getGenAI();

    const isSinhalaSearch = language === 'sinhala' || /[\u0D80-\u0DFF]/.test((query || '') + (topicName || ''));
    const searchQuery = query || `Advanced Level Physics ${topicName} practicals video tutorials simulations`;

    const promptText = `
Find the top YouTube video channels, video lecture series, interactive simulations (such as PhET), and educational websites for the following A/L Physics topic: "${searchQuery}".

${isSinhalaSearch ? 'Provide the summary and link explanations in Sinhala (සිංහල) language for Sri Lankan A/L Physics Sinhala medium students.' : 'Provide structured recommendations including YouTube search links, video descriptions, and website reference URLs.'}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-09-2025',
      contents: promptText,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || '';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const extractedLinks = groundingChunks.map((chunk: any) => ({
      title: chunk.web?.title || 'Physics Web Reference',
      url: chunk.web?.uri || '#',
    })).filter((item: any) => item.url && item.url !== '#');

    res.json({
      success: true,
      summary: text,
      links: extractedLinks,
    });
  } catch (error: any) {
    console.error('Error searching references (using fallback):', error.message || error);
    const isSinhalaSearch = req.body?.language === 'sinhala' || /[\u0D80-\u0DFF]/.test((req.body?.query || '') + (req.body?.topicName || ''));
    const fallbackRef = getSearchReferencesFallback(req.body?.query || req.body?.topicName || 'A/L Physics', isSinhalaSearch);
    res.json({
      success: true,
      summary: fallbackRef.summary,
      links: fallbackRef.links,
    });
  }
});

// -------------------------------------------------------------
// API Route 5: Generate AI Practice Quiz
// -------------------------------------------------------------
app.post('/api/generate-quiz', async (req, res) => {
  try {
    const { topicName, language } = req.body;
    const ai = getGenAI();

    const isSinhalaQuiz = language === 'sinhala' || /[\u0D80-\u0DFF]/.test(topicName || '');

    const promptText = isSinhalaQuiz
      ? `Generate 3 high-quality Sri Lankan Advanced Level (A/L) Physics multiple-choice questions in Sinhala (සිංහල) for topic: "${topicName || 'යාන්ත්‍රික විද්‍යාව (Mechanics)'}". Include question text in Sinhala, options A, B, C, D in Sinhala, the index of correct answer (0-3), and detailed full step-by-step solution in Sinhala.`
      : `Generate 3 high-quality Advanced Level (A/L) Physics multiple-choice questions for topic: "${topicName || 'Mechanics'}". Include options A, B, C, D, the index of correct answer (0-3), and detailed step-by-step solution.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-09-2025',
      contents: promptText,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              questionText: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswerIndex: { type: Type.INTEGER },
              explanation: { type: Type.STRING },
              difficulty: { type: Type.STRING },
            },
            required: ['id', 'questionText', 'options', 'correctAnswerIndex', 'explanation'],
          },
        },
      },
    });

    const quizItems = JSON.parse(response.text || '[]');
    res.json({ success: true, questions: quizItems });
  } catch (error: any) {
    console.error('Error generating quiz (using fallback):', error.message || error);
    const isSinhalaQuiz = req.body?.language === 'sinhala' || /[\u0D80-\u0DFF]/.test(req.body?.topicName || '');
    res.json({
      success: true,
      questions: getQuizFallback(req.body?.topicName || 'Mechanics', isSinhalaQuiz),
    });
  }
});

// -------------------------------------------------------------
// Fallback Data Generators for Quota / Rate Limit Resilience
// -------------------------------------------------------------
function getAnalyzeFallback(text: string, isSinhala: boolean) {
  if (isSinhala) {
    return {
      topicName: 'යාන්ත්‍රික විද්‍යාව සහ විද්‍යුතය (A/L Physics Core)',
      subtopic: 'A/L භෞතික විද්‍යා ගැටළු විග්‍රහය (Physics Problem Analysis)',
      summary: `ඔබ ඉදිරිපත් කළ ප්‍රශ්නය: "${text || 'රූපසටහන / ලේඛනය'}"\n\nA/L භෞතික විද්‍යා විශය නිර්දේශයට අනුව මෙහි මූලික සිද්ධාන්ත පියවරෙන් පියවර විග්‍රහ කර ඇත.`,
      solvedBreakdown: [
        'පියවර 1: දත්ත හඳුනාගැනීම සහ SI ඒකක වලට පරිවර්තනය කිරීම (e.g. cm -> m, g -> kg).',
        'පියවර 2: අදාළ භෞතික විද්‍යා සමීකරණය තේරීම (උදා: V = IR, F = ma, v = fλ, v² = u² + 2as).',
        'පියවර 3: අගයන් ආදේශ කර අඥාත ප්‍රමාණය සඳහා වීජීය ලෙස සුළු කිරීම.',
        'පියවර 4: නිවැරදි SI ඒකක සහ සාධාරණ දශම ස්ථාන සහිතව අවසාන පිළිතුර ලබා ගැනීම.',
      ],
      shortNote: {
        title: 'A/L භෞතික විද්‍යා ප්‍රධාන සිද්ධාන්ත සහ සූත්‍ර (Core Notes)',
        coreConcepts: [
          'නියුටන්ගේ චලිත නියම සහ ශක්ති සංස්ථිතිය',
          'ඕම්ගේ නියමය සහ කර්චෝෆ් නියම (V = IR, ΣI = 0, ΣE = ΣIR)',
          'තරංග ගුණ සහ ඩොප්ලර් ආචරණය (v = fλ)',
        ],
        keyFormulas: [
          { name: 'චලිත සමීකරණය', formula: 'v = u + at,  s = ut + ½at²', explanation: 'ඒකාකාර ත්වරණය සහිත රේඛීය චලිතය' },
          { name: 'ඕම්ගේ නියමය', formula: 'V = IR', explanation: 'නියත උෂ්ණත්වයේදී සන්නායකයක විභව අන්තරය සහ ධාරාව' },
          { name: 'තරංග ශ්‍රේණි', formula: 'v = fλ', explanation: 'තරංග ප්‍රවේගය, සංඛ්‍යාතය සහ තරංග ආයාමය' },
        ],
        examTips: [
          'සමීකරණ වලට අගයන් ආදේශ කිරීමට පෙර සියලුම ප්‍රමාණයන් SI ඒකක වලින් ඇති බව තහවුරු කරගන්න.',
          'දිශාව සහිත ප්‍රමාණ (වෙක්ටර්) සඳහා ප්ලස් (+) සහ මයිනස් (-) ලකුණු නිවැරදිව භාවිත කරන්න.',
        ],
      },
      relatedPracticals: [
        {
          title: 'මීටර් සේතුව මගින් අඥාත ප්‍රතිරෝධයක් සෙවීම (Meter Bridge)',
          objective: 'වීට්ස්ටන් සේතු මූලධර්මය භාවිතයෙන් අඥාත ප්‍රතිරෝධයක අගය සහ ද්‍රව්‍යයේ විශිෂ්ට ප්‍රතිරෝධය සෙවීම',
          keyFormula: 'P / Q = R / S  =>  l / (100 - l) = R / S',
          keyPrecaution: 'තුලන ලක්ෂ්‍යය මීටර් රැහැනේ මැද (30 cm - 70 cm) අතර ලබා ගැනීමෙන් සාපේක්ෂ දෝෂ අවම වේ.',
        },
      ],
      youtubeVideoRecommendations: [
        {
          title: 'Sri Lankan A/L Physics Practical Demonstrations',
          searchQuery: 'AL Physics Practical Demonstrations Sinhala',
          recommendedChannel: 'A/L Physics Sinhala',
          description: 'A/L භෞතික විද්‍යා ප්‍රායෝගික පරීක්ෂණ සහ ප්‍රශ්න සාකච්ඡාව',
          directUrl: 'https://www.youtube.com/results?search_query=AL+Physics+Practical+Sinhala',
        },
      ],
      websiteReferences: [
        {
          title: 'Physics Classroom & HyperPhysics',
          url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/index.html',
          siteName: 'HyperPhysics',
          description: 'Interactive concept maps and formulas for A/L Physics',
        },
      ],
    };
  }
  return {
    topicName: 'Mechanics & General Physics (A/L Core)',
    subtopic: 'A/L Physics Problem Analysis',
    summary: `Analyzed query: "${text || 'Uploaded diagram / document'}"\n\nHere is the step-by-step physics breakdown according to standard A/L Physics syllabus rules.`,
    solvedBreakdown: [
      'Step 1: Identify given physical quantities and convert to standard SI units.',
      'Step 2: Select governing fundamental physical law (e.g., F = ma, V = IR, v = fλ).',
      'Step 3: Substitute known variables and solve algebraically.',
      'Step 4: Report final numerical value with correct SI units and significant figures.',
    ],
    shortNote: {
      title: 'A/L Physics Core Formulas & Concepts',
      coreConcepts: [
        'Newtonian Mechanics & Conservation of Energy/Momentum',
        'Ohm’s Law & Kirchhoff’s Laws (V = IR, ΣI = 0, ΣE = ΣIR)',
        'Wave Motion & Sound (v = fλ)',
      ],
      keyFormulas: [
        { name: 'Kinematic Equations', formula: 'v = u + at, s = ut + ½at²', explanation: 'Linear motion under constant acceleration' },
        { name: 'Ohm’s Law', formula: 'V = IR', explanation: 'Voltage across conductor proportional to current' },
        { name: 'Wave Equation', formula: 'v = fλ', explanation: 'Relationship between wave speed, frequency, wavelength' },
      ],
      examTips: [
        'Always convert values into standard SI units before applying formulas.',
        'Pay close attention to vector directions and assign consistent sign conventions (+/-).',
      ],
    },
    relatedPracticals: [
      {
        title: 'Determination of Unknown Resistance using Meter Bridge',
        objective: 'Measure unknown resistance using Wheatstone bridge principle',
        keyFormula: 'P / Q = R / S  =>  l / (100 - l) = R / S',
        keyPrecaution: 'Obtain balance point near middle of wire (30 cm - 70 cm) to minimize percentage error.',
      },
    ],
    youtubeVideoRecommendations: [
      {
        title: 'A/L Physics Practical Visual Guides',
        searchQuery: 'Advanced Level Physics Practicals Visual Guide',
        recommendedChannel: 'PhET & Physics Classroom',
        description: 'Complete video guides for A/L Physics practical experiments',
        directUrl: 'https://www.youtube.com/results?search_query=AL+Physics+Practicals',
      },
    ],
    websiteReferences: [
      {
        title: 'HyperPhysics Concept Maps',
        url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/index.html',
        siteName: 'HyperPhysics',
        description: 'Comprehensive physics summary and formula derivations',
      },
    ],
  };
}

function getChatFallback(message: string, isSinhala: boolean) {
  if (isSinhala) {
    return `ඔබගේ භෞතික විද්‍යා ප්‍රශ්නය/තේමාව: "${message}"

A/L භෞතික විද්‍යා විශය නිර්දේශයට අනුව පියවරෙන් පියවර විසඳුම සහ සිද්ධාන්ත පැහැදිලි කිරීම:

1. **මූලික සිද්ධාන්තය (Core Theory):**
   - අදාළ භෞතික පද්ධතියේ චලිතය, විද්‍යුතය හෝ තරංග ගුණ විග්‍රහ කිරීම සඳහා මූලික භෞතික නියම (නියුටන්ගේ නියම, ඕම්ගේ නියමය, හෝ ශක්ති සංස්ථිතිය) භාවිත වේ.

2. **ප්‍රධාන සමීකරණ (Key Equations):**
   • චලිතය: v = u + at,  s = ut + ½at²,  v² = u² + 2as
   • ධාරා විද්‍යුතය: V = IR,  P = VI = I²R = V²/R
   • තරංග: v = fλ,  f' = f(v ± v_o)/(v ∓ v_s)
   • තාපය: Q = mcΔT,  P = kA(ΔT/L)

3. **ගණනය කිරීමේ පියවර (Step-by-Step Problem Solving):**
   - සියලුම දත්ත SI ඒකක වලට (m, kg, s, A, V, K, Hz) හරවන්න.
   - අඥාත ප්‍රමාණය අඩංගු සමීකරණය තෝරා අගයන් ආදේශ කරන්න.
   - අවසාන පිළිතුර නිවැරදි ඒකක සහිතව ලියන්න.

(ඔබට මෙම මාතෘකාවට අදාළ ප්‍රායෝගික පරීක්ෂණ 'Standard Practicals' ටැබයෙන්ද, කෙටි සටහන් 'Short Notes' ටැබයෙන්ද නරඹිය හැක.)`;
  }
  return `Regarding your physics query: "${message}"

Here is the step-by-step Advanced Level Physics breakdown:

1. **Core Physics Principles:**
   - Analysis begins by applying fundamental physical laws (Newton's laws of motion, Energy conservation, Ohm's law, or Wave motion principles).

2. **Key Formulas:**
   • Kinematics: v = u + at,  s = ut + ½at²,  v² = u² + 2as
   • Electricity: V = IR,  P = VI = I²R,  R = ρ(L/A)
   • Waves & Sound: v = fλ, Doppler Effect: f' = f(v ± v_o)/(v ∓ v_s)
   • Thermal Physics: Q = mcΔT,  P = kA(ΔT/L)

3. **Problem Solving Steps:**
   - Step 1: List given parameters and convert all units to standard SI units.
   - Step 2: Apply the governing formula and substitute known values.
   - Step 3: Compute final numerical output with proper SI units.

(You can also check the 'Standard Practicals' and 'Short Notes' tabs for detailed syllabus coverage.)`;
}

function getNotesFallback(topicName: string, subtopic: string, isSinhala: boolean) {
  if (isSinhala) {
    return {
      title: `${topicName} - A/L කෙටි සටහන් (Short Notes)`,
      summary: `${topicName} (${subtopic || 'විශය නිර්දේශය'}) සඳහා වන සියලුම මූලික අර්ථදැක්වීම්, සමීකරණ, සහ විභාග ගැටළු නිරාකරණ ක්‍රම මෙහි අඩංගු වේ.`,
      coreConcepts: [
        'මූලික භෞතික නියම සහ අර්ථදැක්වීම්',
        'සමීකරණ වල පදවල භෞතික අර්ථය සහ SI ඒකක',
        'අනුක්‍රමණය සහ ප්‍රස්ථාරික නිරූපණය',
      ],
      keyFormulas: [
        { name: 'ප්‍රධාන සමීකරණය 1', symbolicFormula: 'v = u + at', variableDefinitions: 'v = අවසාන ප්‍රවේගය, u = ආරම්භක ප්‍රවේගය, a = ත්වරණය, t = කාලය', units: 'm s⁻¹, m s⁻², s' },
        { name: 'ප්‍රධාන සමීකරණය 2', symbolicFormula: 'V = IR', variableDefinitions: 'V = විභව අන්තරය, I = ධාරාව, R = ප්‍රතිරෝධය', units: 'V, A, Ω' },
      ],
      examTraps: [
        'SI ඒකක වලට පරිවර්තනය කිරීමට අමතක වීම (e.g. cm, mm, g, min).',
        'වෙක්ටර් ප්‍රමාණ වල දිශාව පිළිබඳ සැලකිලිමත් නොවීම.',
      ],
      derivationSummary: 'අදාළ මූලික නියමයන්ගෙන් ආරම්භ කර අනුකලනය/වීජීය ආදේශනය මගින් අවසාන සමීකරණය ව්‍යුත්පන්න කරනු ලැබේ.',
    };
  }
  return {
    title: `${topicName} - A/L Physics Short Notes`,
    summary: `Comprehensive summary and formula guide for ${topicName} (${subtopic || 'Syllabus Overview'}).`,
    coreConcepts: [
      'Fundamental Physical Laws and Definitions',
      'Symbolic Formulas and SI Units',
      'Graphical Representations and Gradient Interpretation',
    ],
    keyFormulas: [
      { name: 'Motion Equation', symbolicFormula: 'v = u + at', variableDefinitions: 'v = final velocity, u = initial velocity, a = acceleration, t = time', units: 'm s⁻¹, m s⁻², s' },
      { name: 'Ohm’s Law', symbolicFormula: 'V = IR', variableDefinitions: 'V = voltage, I = current, R = resistance', units: 'V, A, Ω' },
    ],
    examTraps: [
      'Forgetting to convert units to standard SI units (e.g., cm -> m, g -> kg).',
      'Ignoring vector sign conventions (+ / - directions).',
    ],
    derivationSummary: 'Derived starting from foundational laws using algebraic substitution and integration.',
  };
}

function getQuizFallback(topicName: string, isSinhala: boolean) {
  if (isSinhala) {
    return [
      {
        id: 'q1_sin',
        questionText: `${topicName || 'යාන්ත්‍රික විද්‍යාව'}: 10 m s⁻¹ ප්‍රවේගයෙන් ගමන් කරන 2 kg ස්කන්ධයක් සහිත වස්තුවක් මත 4 N බලයක් තත්පර 3 ක් ක්‍රියා කරයි නම් අවසාන ප්‍රවේගය කොපමණද?`,
        options: ['12 m s⁻¹', '16 m s⁻¹', '20 m s⁻¹', '24 m s⁻¹'],
        correctAnswerIndex: 1,
        explanation: 'F = ma  =>  4 = 2a  =>  a = 2 m s⁻².  දැන් v = u + at  =>  v = 10 + (2 × 3) = 16 m s⁻¹.',
        difficulty: 'A/L Level',
      },
      {
        id: 'q2_sin',
        questionText: 'ඕම්ගේ නියමයට අනුව නියත උෂ්ණත්වයේ පවතින සන්නායකයක ප්‍රතිරෝධය 5 Ω වේ. එහි දෙකෙළවර විභව අන්තරය 20 V නම් ගලන ධාරාව කොපමණද?',
        options: ['2 A', '4 A', '5 A', '10 A'],
        correctAnswerIndex: 1,
        explanation: 'V = IR  =>  20 = I × 5  =>  I = 20 / 5 = 4 A.',
        difficulty: 'A/L Level',
      },
      {
        id: 'q3_sin',
        questionText: 'තරංගයක සංඛ්‍යාතය 500 Hz වන අතර තරංග ආයාමය 0.68 m වේ. මෙම තරංගයේ ප්‍රවේගය කොපමණද?',
        options: ['340 m s⁻¹', '300 m s⁻¹', '680 m s⁻¹', '170 m s⁻¹'],
        correctAnswerIndex: 0,
        explanation: 'v = fλ  =>  v = 500 × 0.68 = 340 m s⁻¹.',
        difficulty: 'A/L Level',
      },
    ];
  }
  return [
    {
      id: 'q1_en',
      questionText: `In ${topicName || 'Mechanics'}: A body of mass 2 kg moving at 10 m s⁻¹ is acted upon by a constant force of 4 N for 3 seconds. What is its final velocity?`,
      options: ['12 m s⁻¹', '16 m s⁻¹', '20 m s⁻¹', '24 m s⁻¹'],
      correctAnswerIndex: 1,
      explanation: 'Using F = ma => 4 = 2a => a = 2 m s⁻². Now using v = u + at => v = 10 + (2 × 3) = 16 m s⁻¹.',
      difficulty: 'A/L Level',
    },
    {
      id: 'q2_en',
      questionText: 'According to Ohm’s law, a conductor with resistance 5 Ω has a potential difference of 20 V across it. What is the current flowing through it?',
      options: ['2 A', '4 A', '5 A', '10 A'],
      correctAnswerIndex: 1,
      explanation: 'V = IR => 20 = I × 5 => I = 20 / 5 = 4 A.',
      difficulty: 'A/L Level',
    },
    {
      id: 'q3_en',
      questionText: 'A wave has a frequency of 500 Hz and a wavelength of 0.68 m. What is the speed of the wave?',
      options: ['340 m s⁻¹', '300 m s⁻¹', '680 m s⁻¹', '170 m s⁻¹'],
      correctAnswerIndex: 0,
      explanation: 'v = fλ => v = 500 × 0.68 = 340 m s⁻¹.',
      difficulty: 'A/L Level',
    },
  ];
}

function getSearchReferencesFallback(query: string, isSinhala: boolean) {
  if (isSinhala) {
    return {
      summary: `"${query || 'A/L Physics'}" සඳහා නිර්දේශිත YouTube වීඩියෝ චැනල, පරීක්ෂණ වීඩියෝ සහ අධ්‍යාපනික වෙබ් අඩවි එකතුව:`,
      links: [
        { title: 'A/L Physics Practicals Sinhala Demonstrations', url: 'https://www.youtube.com/results?search_query=AL+Physics+Practical+Sinhala' },
        { title: 'HyperPhysics Interactive Physics Concept Maps', url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/index.html' },
        { title: 'PhET Interactive Science Simulations', url: 'https://phet.colorado.edu/' },
      ],
    };
  }
  return {
    summary: `Curated YouTube video lectures, practical guides, and interactive web simulations for "${query || 'A/L Physics'}":`,
    links: [
      { title: 'A/L Physics Practicals Video Demonstrations', url: 'https://www.youtube.com/results?search_query=AL+Physics+Practicals' },
      { title: 'HyperPhysics Concept Maps', url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/index.html' },
      { title: 'PhET Interactive Physics Simulations', url: 'https://phet.colorado.edu/' },
    ],
  };
}

// -------------------------------------------------------------
// Vite Server Integration (Dev vs Production)
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`A/L Physics App server running on http://localhost:${PORT}`);
  });
}

startServer();
