export type PhysicsTopicId =
  | 'mechanics'
  | 'oscillations_waves'
  | 'thermal_physics'
  | 'gravitational_fields'
  | 'electrostatic_fields'
  | 'magnetic_fields'
  | 'current_electricity'
  | 'electronics'
  | 'properties_matter'
  | 'matter_radiation'
  | 'nuclear_physics'
  | 'geometrical_optics';

export interface PhysicsTopicInfo {
  id: PhysicsTopicId;
  name: string;
  code: string;
  description: string;
  iconName: string;
  subtopics: string[];
  keyEquations: string[];
}

export interface KeyFormula {
  name: string;
  symbolicFormula: string;
  variableDefinitions: string;
  units: string;
}

export interface ShortNote {
  id: string;
  topicId: PhysicsTopicId;
  topicName: string;
  subtopic: string;
  title: string;
  summary: string;
  coreConcepts: string[];
  keyFormulas: KeyFormula[];
  examTraps: string[];
  derivationSummary?: string;
  createdAt?: string;
}

export interface PracticalExperiment {
  id: string;
  topicId: PhysicsTopicId;
  topicName: string;
  title: string;
  objective: string;
  apparatus: string[];
  theory: string;
  formula: string;
  variablesToGraph: {
    xAxis: string;
    yAxis: string;
    gradientRepresents: string;
    interceptRepresents?: string;
  };
  procedureSteps: string[];
  precautions: string[];
  sourcesOfError: string[];
  sampleCalculation?: {
    inputs: { name: string; symbol: string; unit: string; defaultValue: number }[];
    formulaDescription: string;
    calculate: (inputs: Record<string, number>) => { result: number; unit: string; errorMargin?: string };
  };
  commonVivaQuestions: { question: string; answer: string }[];
}

export interface MediaReference {
  title: string;
  type: 'video' | 'website' | 'simulation' | 'pdf';
  platform: string;
  url: string;
  searchQuery: string;
  description: string;
  topicId: PhysicsTopicId;
  badge?: string;
}

export interface AnalysisResult {
  topicName: string;
  subtopic: string;
  summary: string;
  solvedBreakdown?: string[];
  shortNote: {
    title: string;
    coreConcepts: string[];
    keyFormulas: { name: string; formula: string; explanation: string }[];
    examTips: string[];
  };
  relatedPracticals: {
    title: string;
    objective: string;
    keyFormula: string;
    keyPrecaution: string;
  }[];
  youtubeVideoRecommendations: {
    title: string;
    searchQuery: string;
    recommendedChannel: string;
    description: string;
    directUrl: string;
  }[];
  websiteReferences: {
    title: string;
    url: string;
    siteName: string;
    description: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  timestamp: string;
  groundingSources?: { title: string; url: string }[];
}

export interface QuizQuestion {
  id: string;
  topicId: PhysicsTopicId;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: 'Medium' | 'Hard' | 'A/L Past Paper Style';
}
