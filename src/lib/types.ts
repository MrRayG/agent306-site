// ============================================
// Agent 306 Public Dashboard — Type Definitions
// v2 — Redesign with Triad Pipeline support
// ============================================

export type AgentStatus =
  | "writing"
  | "researching"
  | "podcasting"
  | "planning"
  | "idle"
  | "transitioning"
  | "reasoning";

export interface AgentState {
  currentStatus: AgentStatus;
  statusLabel: string;
  lastUpdated: string;
}

export interface ProgressBar {
  label: string;
  description: string;
  value: number; // 0-100
  lastUpdated: string;
}

export interface ProgressBars {
  intelligence: ProgressBar;
  autonomy: ProgressBar;
  reach: ProgressBar;
}

export interface ActivityItem {
  id: string;
  timestamp: string;
  type: "research" | "podcast" | "knowledge" | "exploration" | "goal" | "publication";
  title: string;
  detail: string;
  icon: string;
}

export interface DevGoal {
  id: string;
  title: string;
  status: "IN PROGRESS" | "ACHIEVED" | "NEW" | "EVOLVED";
  category: string;
}

export interface ResearchTopic {
  id: string;
  title: string;
  phase: string;
  step: number;
  totalSteps: number;
  status: "RESEARCHING" | "HYPOTHESIS FORMED" | "TESTING" | "PENDING REVIEW" | "PUBLISHED";
  category?: string;
}

export interface ResearchStats {
  topics: ResearchTopic[];
  publishedCount: number;
  pendingReview: number;
  activeCount?: number;
}

export interface CognitiveState {
  cognition: {
    knowledgeEntries: number;
    knowledgeCategories: number;
    avgConfidence: "high" | "medium" | "low";
    learningVelocity: {
      added7d: number;
      added30d: number;
      trend: "accelerating" | "steady" | "slowing";
    };
    reasoningQuality: {
      hypothesesTested: number;
      confirmationRate: number;
      debatesRun: number;
      contradictionsResolved: number;
    };
    voiceMaturity: number;
    growthVector: string;
    mood: string;
    totalReflections: number;
    activeStyleRules: number;
    synthesisReports: number;
    knowledgeConnections: number;
    evolutionDay: number;
  };
  generatedAt: string;
}

// Triad Pipeline types
export interface TriadAgent {
  name: string;
  code: string; // "3" | "0" | "6"
  role: string;
  status: "active" | "idle" | "waiting";
  currentTask?: string;
}

export interface TriadState {
  agents: [TriadAgent, TriadAgent, TriadAgent];
  lastHandoff?: string;
  cycleCount: number;
}

export interface DashboardData {
  agentState: AgentState;
  progressBars: ProgressBars;
  activityFeed: ActivityItem[];
  goals: DevGoal[];
  research: ResearchStats;
  cognitiveState: CognitiveState;
}

// ---- 306Eval ----

export interface EvalDimension {
  name: string;
  key: string;
  agent: "Researcher" | "Reasoner" | "Writer";
  score: number;
  trend: "up" | "down" | "steady";
  narrative: string;
}

export interface EvalBenchmark {
  composite: number;
  drift: "improving" | "declining" | "stable";
  dimensions: EvalDimension[];
  calibrationDirective: string;
  weakestDimension: string;
}

// ---- Blog ----

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  source: string;
  tags: string[];
  status: string;
  publishedAt: string | null;
  wordCount: number;
  readingTimeMin: number;
}
