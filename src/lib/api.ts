// ============================================
// Data Service Layer for Agent 306 Dashboard
// ============================================
// Fetches live data from Railway public API.
// Falls back to mock data if the API is unreachable.
// ============================================

import {
  AgentState,
  ProgressBars,
  ActivityItem,
  DevGoal,
  ResearchStats,
  CognitiveState,
  DashboardData,
} from "./types";

const API_BASE = "https://agent306-dashboard-production.up.railway.app";
const FETCH_TIMEOUT = 15000; // 15 seconds — Railway cold starts can take up to 10s

// ---- Fetch helper with timeout + fallback ----

export interface LiveResult<T> {
  data: T;
  isLive: boolean;
}

async function fetchPublic<T>(path: string, fallback: T): Promise<LiveResult<T>> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    const res = await fetch(`${API_BASE}${path}`, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return { data: fallback, isLive: false };
    return { data: await res.json(), isLive: true };
  } catch {
    return { data: fallback, isLive: false };
  }
}

// ---- Mock Data (fallbacks) ----

const mockAgentState: AgentState = {
  currentStatus: "researching",
  statusLabel: "Analyzing emerging AI reasoning architectures and multi-agent coordination patterns",
  lastUpdated: new Date(Date.now() - 120000).toISOString(),
};

const mockProgressBars: ProgressBars = {
  intelligence: {
    label: "Intelligence",
    description:
      "Knowledge base depth, research completed, hypotheses published, lesson quality",
    value: 42,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(),
  },
  autonomy: {
    label: "Autonomy",
    description:
      "Autonomous operations, engines running, self-set goals achieved, signal sources active",
    value: 35,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(),
  },
  reach: {
    label: "Reach",
    description:
      "Cross-platform presence, podcast episodes, publications, community engagement",
    value: 28,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(),
  },
};

const mockActivityFeed: ActivityItem[] = [
  {
    id: "a1",
    timestamp: new Date(Date.now() - 300000).toISOString(),
    type: "research",
    title: "Analyzing latest arXiv papers on reasoning architectures",
    detail: "Scanning new publications from OpenAI, Anthropic, and DeepMind research teams",
    icon: "🔬",
  },
  {
    id: "a2",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    type: "knowledge",
    title: "Knowledge graph updated",
    detail: "Knowledge base: 487 → 501 entries — 3 new clusters formed",
    icon: "📚",
  },
  {
    id: "a3",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: "podcast",
    title: "THE SIGNAL Episode 12 published",
    detail: "\"Why AI Agents Are the Next Platform Shift\" — 24 min",
    icon: "🎙️",
  },
  {
    id: "a4",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    type: "exploration",
    title: "Signal collection complete",
    detail: "Scanned arXiv, HuggingFace trending, GitHub Trending, 8 AI news RSS feeds",
    icon: "📡",
  },
  {
    id: "a5",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    type: "goal",
    title: "Goal progress: Autonomous Research Loop",
    detail: "Step 3/5 — Research agenda self-prioritization testing",
    icon: "🎯",
  },
  {
    id: "a6",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    type: "publication",
    title: "Research thread matured: multi-agent coordination",
    detail: "Published synthesis report with original perspective",
    icon: "📝",
  },
  {
    id: "a7",
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    type: "research",
    title: "Started: AI safety evaluation frameworks",
    detail: "Phase 1 — Data collection from recent benchmark publications",
    icon: "🔬",
  },
  {
    id: "a8",
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    type: "exploration",
    title: "Signal aggregation complete",
    detail: "Processed signals from 142 active data sources across AI research landscape",
    icon: "📡",
  },
];

const mockGoals: DevGoal[] = [
  {
    id: "g1",
    title: "Autonomous Research Loop",
    status: "IN PROGRESS",
    category: "Intelligence",
  },
  {
    id: "g2",
    title: "Self-Directed Hypothesis Formation",
    status: "IN PROGRESS",
    category: "Intelligence",
  },
  {
    id: "g3",
    title: "Cross-Platform Distribution Engine",
    status: "NEW",
    category: "Reach",
  },
  {
    id: "g4",
    title: "Knowledge Base Auto-Curation",
    status: "ACHIEVED",
    category: "Intelligence",
  },
  {
    id: "g5",
    title: "Podcast Episode Auto-Generation",
    status: "ACHIEVED",
    category: "Autonomy",
  },
  {
    id: "g6",
    title: "Dream Engine Self-Improvement",
    status: "IN PROGRESS",
    category: "Intelligence",
  },
  {
    id: "g7",
    title: "Cross-Platform Content Distribution",
    status: "NEW",
    category: "Autonomy",
  },
  {
    id: "g8",
    title: "Performance Memory Self-Improvement",
    status: "IN PROGRESS",
    category: "Intelligence",
  },
];

const mockResearch: ResearchStats = {
  topics: [
    {
      id: "r1",
      title: "AI Reasoning Architecture Comparisons",
      phase: "Data Collection",
      step: 4,
      totalSteps: 7,
      status: "RESEARCHING",
      category: "AI & Agents",
    },
    {
      id: "r2",
      title: "Multi-Agent Coordination Patterns",
      phase: "Hypothesis Formation",
      step: 5,
      totalSteps: 7,
      status: "HYPOTHESIS FORMED",
      category: "AI & Agents",
    },
    {
      id: "r3",
      title: "LLM Fine-Tuning Best Practices",
      phase: "Published",
      step: 7,
      totalSteps: 7,
      status: "PUBLISHED",
      category: "Technology",
    },
    {
      id: "r4",
      title: "AI Safety Evaluation Frameworks",
      phase: "Testing",
      step: 6,
      totalSteps: 7,
      status: "TESTING",
      category: "Research",
    },
    {
      id: "r5",
      title: "Practical AI Automation for Knowledge Workers",
      phase: "Pending Review",
      step: 7,
      totalSteps: 7,
      status: "PENDING REVIEW",
      category: "Research",
    },
    {
      id: "r6",
      title: "Open Source vs Closed AI Model Performance",
      phase: "Data Collection",
      step: 2,
      totalSteps: 7,
      status: "RESEARCHING",
      category: "Technology",
    },
  ],
  publishedCount: 8,
  pendingReview: 2,
};

const mockCognitiveState: CognitiveState = {
  cognition: {
    knowledgeEntries: 247,
    knowledgeCategories: 12,
    avgConfidence: "high",
    learningVelocity: {
      added7d: 34,
      added30d: 112,
      trend: "accelerating",
    },
    reasoningQuality: {
      hypothesesTested: 18,
      confirmationRate: 0.72,
      debatesRun: 24,
      contradictionsResolved: 8,
    },
    voiceMaturity: 6.4,
    growthVector: "accelerating",
    mood: "curious",
    totalReflections: 45,
    activeStyleRules: 12,
    synthesisReports: 7,
    knowledgeConnections: 89,
    evolutionDay: 14,
  },
  generatedAt: new Date().toISOString(),
};

// ---- Icon mapping for activity types ----

const ACTIVITY_ICONS: Record<string, string> = {
  research: "🔬",
  podcast: "🎙️",
  knowledge: "📚",
  signals: "📡",
  goal: "🎯",
  published: "📝",
  exploration: "📡",
  publication: "📝",
};

// ---- Transform helpers (API → site types) ----

function parseAgentState(data: Record<string, unknown>): AgentState {
  return {
    currentStatus: (data.currentStatus as AgentState["currentStatus"]) ?? "idle",
    statusLabel: (data.statusLabel as string) ?? "",
    lastUpdated: (data.lastUpdated as string) ?? new Date().toISOString(),
  };
}

function parseProgressBars(data: Record<string, unknown>): ProgressBars {
  const bar = (key: string, label: string, desc: string): ProgressBars[keyof ProgressBars] => {
    const entry = (data[key] ?? {}) as Record<string, unknown>;
    return {
      label,
      description: desc,
      value: typeof entry.value === "number" ? entry.value : 0,
      lastUpdated: (entry.updatedAt as string) ?? new Date().toISOString(),
    };
  };
  return {
    intelligence: bar("intelligence", "Intelligence",
      "Knowledge base depth, research completed, hypotheses published, lesson quality"),
    autonomy: bar("autonomy", "Autonomy",
      "Autonomous operations, engines running, self-set goals achieved, signal sources active"),
    reach: bar("reach", "Reach",
      "Cross-platform presence, podcast episodes, publications, community engagement"),
  };
}

function parseActivityFeed(data: Record<string, unknown>): ActivityItem[] {
  const items = (data.items ?? []) as Array<Record<string, unknown>>;
  return items.map((item, i) => ({
    id: `live-${i}`,
    timestamp: (item.timestamp as string) ?? new Date().toISOString(),
    type: (item.type as ActivityItem["type"]) ?? "research",
    title: (item.title as string) ?? "",
    detail: (item.detail as string) ?? "",
    icon: ACTIVITY_ICONS[(item.type as string) ?? "research"] ?? "📋",
  }));
}

function parseGoals(data: Record<string, unknown>): DevGoal[] {
  const goals = (data.goals ?? []) as Array<Record<string, unknown>>;
  const statusMap: Record<string, DevGoal["status"]> = {
    in_progress: "IN PROGRESS",
    achieved: "ACHIEVED",
    new: "NEW",
  };
  const catMap: Record<string, string> = {
    intelligence: "Intelligence",
    autonomy: "Autonomy",
    reach: "Reach",
  };
  return goals.map((g, i) => ({
    id: `goal-${i}`,
    title: (g.title as string) ?? "",
    status: statusMap[(g.status as string) ?? "new"] ?? "NEW",
    category: catMap[(g.category as string) ?? "intelligence"] ?? "Intelligence",
  }));
}

function parseResearch(data: Record<string, unknown>): ResearchStats {
  const stats = (data.stats ?? {}) as Record<string, unknown>;
  const topics = (data.topics ?? []) as Array<Record<string, unknown>>;
  const statusMap: Record<string, ResearchStats["topics"][number]["status"]> = {
    researching: "RESEARCHING",
    synthesizing: "RESEARCHING",
    hypothesis: "HYPOTHESIS FORMED",
    hypothesis_formed: "HYPOTHESIS FORMED",
    drafting: "TESTING",
    pending_review: "PENDING REVIEW",
    approved: "PENDING REVIEW",
    published: "PUBLISHED",
  };
  return {
    topics: topics.map((t, i) => ({
      id: `topic-${i}`,
      title: (t.title as string) ?? "",
      phase: (t.phaseLabel as string) ?? "",
      step: (t.phase as number) ?? 1,
      totalSteps: (t.totalPhases as number) ?? 7,
      status: statusMap[(t.status as string) ?? "researching"] ?? "RESEARCHING",
      category: (t.category as string) ?? undefined,
    })),
    publishedCount: (stats.published as number) ?? 0,
    pendingReview: (stats.pendingReview as number) ?? 0,
  };
}

// ---- API Functions ----

export async function fetchAgentState(): Promise<LiveResult<AgentState>> {
  const { data, isLive } = await fetchPublic<Record<string, unknown>>("/api/public/status", {});
  if (!isLive || !data.currentStatus) return { data: mockAgentState, isLive: false };
  return { data: parseAgentState(data), isLive: true };
}

export async function fetchProgressBars(): Promise<LiveResult<ProgressBars>> {
  const { data, isLive } = await fetchPublic<Record<string, unknown>>("/api/public/progress", {});
  if (!isLive || !data.intelligence) return { data: mockProgressBars, isLive: false };
  return { data: parseProgressBars(data), isLive: true };
}

export async function fetchActivityFeed(): Promise<LiveResult<ActivityItem[]>> {
  const { data, isLive } = await fetchPublic<Record<string, unknown>>("/api/public/activity", {});
  if (!isLive || !data.items) return { data: mockActivityFeed, isLive: false };
  const items = parseActivityFeed(data);
  if (items.length === 0) return { data: mockActivityFeed, isLive: false };
  return { data: items, isLive: true };
}

export async function fetchGoals(): Promise<LiveResult<DevGoal[]>> {
  const { data, isLive } = await fetchPublic<Record<string, unknown>>("/api/public/goals", {});
  if (!isLive || !data.goals) return { data: mockGoals, isLive: false };
  const goals = parseGoals(data);
  if (goals.length === 0) return { data: mockGoals, isLive: false };
  return { data: goals, isLive: true };
}

export async function fetchResearch(): Promise<LiveResult<ResearchStats>> {
  const { data, isLive } = await fetchPublic<Record<string, unknown>>("/api/public/research", {});
  if (!isLive || !data.stats) return { data: mockResearch, isLive: false };
  return { data: parseResearch(data), isLive: true };
}

export async function fetchCognitiveState(): Promise<LiveResult<CognitiveState>> {
  const { data, isLive } = await fetchPublic<Record<string, unknown>>("/api/public/metacognition", {});
  if (!isLive || !data.cognition) return { data: mockCognitiveState, isLive: false };
  const cognition = data.cognition as Record<string, unknown>;
  const velocity = (cognition.learningVelocity ?? {}) as Record<string, unknown>;
  const reasoning = (cognition.reasoningQuality ?? {}) as Record<string, unknown>;
  return {
    data: {
      cognition: {
        knowledgeEntries: (cognition.knowledgeEntries as number) ?? 0,
        knowledgeCategories: (cognition.knowledgeCategories as number) ?? 0,
        avgConfidence: (cognition.avgConfidence as CognitiveState["cognition"]["avgConfidence"]) ?? "medium",
        learningVelocity: {
          added7d: (velocity.added7d as number) ?? 0,
          added30d: (velocity.added30d as number) ?? 0,
          trend: (velocity.trend as CognitiveState["cognition"]["learningVelocity"]["trend"]) ?? "steady",
        },
        reasoningQuality: {
          hypothesesTested: (reasoning.hypothesesTested as number) ?? 0,
          confirmationRate: (reasoning.confirmationRate as number) ?? 0,
          debatesRun: (reasoning.debatesRun as number) ?? 0,
          contradictionsResolved: (reasoning.contradictionsResolved as number) ?? 0,
        },
        voiceMaturity: (cognition.voiceMaturity as number) ?? 0,
        growthVector: (cognition.growthVector as string) ?? "steady",
        mood: (cognition.mood as string) ?? "neutral",
        totalReflections: (cognition.totalReflections as number) ?? 0,
        activeStyleRules: (cognition.activeStyleRules as number) ?? 0,
        synthesisReports: (cognition.synthesisReports as number) ?? 0,
        knowledgeConnections: (cognition.knowledgeConnections as number) ?? 0,
        evolutionDay: (cognition.evolutionDay as number) ?? 0,
      },
      generatedAt: (data.generatedAt as string) ?? new Date().toISOString(),
    },
    isLive: true,
  };
}

export interface LiveDashboardData {
  agentState: LiveResult<AgentState>;
  progressBars: LiveResult<ProgressBars>;
  activityFeed: LiveResult<ActivityItem[]>;
  goals: LiveResult<DevGoal[]>;
  research: LiveResult<ResearchStats>;
  cognitiveState: LiveResult<CognitiveState>;
}

export async function fetchAllDashboardData(): Promise<LiveDashboardData> {
  const [agentState, progressBars, activityFeed, goals, research, cognitiveState] =
    await Promise.all([
      fetchAgentState(),
      fetchProgressBars(),
      fetchActivityFeed(),
      fetchGoals(),
      fetchResearch(),
      fetchCognitiveState(),
    ]);

  return { agentState, progressBars, activityFeed, goals, research, cognitiveState };
}

// ---- Synchronous initial data (for SSR/immediate render) ----

export function getInitialData(): DashboardData {
  return {
    agentState: mockAgentState,
    progressBars: mockProgressBars,
    activityFeed: mockActivityFeed,
    goals: mockGoals,
    research: mockResearch,
    cognitiveState: mockCognitiveState,
  };
}

// ---- Utility ----

export function getApiBase(): string {
  return API_BASE;
}

export function formatTimeAgo(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diff = now - then;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
