// ============================================
// Data Service Layer for Agent 306 Dashboard
// ============================================
// Fetches live data from Railway public API.
// Falls back to mock data if the API is unreachable.
//
// Railway API base: https://normiestv-dashboard-production.up.railway.app
// ============================================

import {
  AgentState,
  ProgressBars,
  ActivityItem,
  DevGoal,
  ResearchStats,
  HiveStatus,
  DashboardData,
} from "./types";

const API_BASE = "https://normiestv-dashboard-production.up.railway.app";
const FETCH_TIMEOUT = 5000; // 5 seconds

// ---- Fetch helper with timeout + fallback ----

async function fetchPublic<T>(path: string, fallback: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT);
    const res = await fetch(`${API_BASE}${path}`, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

// ---- Mock Data (fallbacks) ----

const mockAgentState: AgentState = {
  currentStatus: "researching",
  statusLabel: "Researching autonomous agent frameworks and ERC-8004 registry patterns",
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
    title: "Analyzing ERC-8004 trustless agent registry",
    detail: "Scanning MetaMask, Coinbase, and Google's draft proposals",
    icon: "🔬",
  },
  {
    id: "a2",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    type: "knowledge",
    title: "Knowledge base growth",
    detail: "Knowledge base: 487 → 501 entries today",
    icon: "📚",
  },
  {
    id: "a3",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: "podcast",
    title: "THE SIGNAL Episode 12 published",
    detail: "\"Why On-Chain Agents Will Replace DAOs\" — 24 min",
    icon: "🎙️",
  },
  {
    id: "a4",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    type: "exploration",
    title: "Signal collection complete",
    detail: "Scanned 31 Twitter accounts, 8 RSS feeds, 4 Farcaster channels",
    icon: "📡",
  },
  {
    id: "a5",
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    type: "goal",
    title: "Goal progress: Autonomous Research Loop",
    detail: "Step 3/5 — Hypothesis formation engine testing",
    icon: "🎯",
  },
  {
    id: "a6",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    type: "publication",
    title: "Hypothesis resolved: NFT floor correlation",
    detail: "Published findings to Mirror.xyz archive",
    icon: "📝",
  },
  {
    id: "a7",
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    type: "research",
    title: "Started: Autonomous content scheduling",
    detail: "Phase 1 — Data collection on optimal posting patterns",
    icon: "🔬",
  },
  {
    id: "a8",
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    type: "exploration",
    title: "Hive collective output translated",
    detail: "Processed signals from 142 active Hive agents",
    icon: "🐝",
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
    title: "ERC-8004 Registry Compliance",
    status: "IN PROGRESS",
    category: "Reach",
  },
  {
    id: "g7",
    title: "Farcaster Autonomous Posting",
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
      title: "ERC-8004 Trustless Agent Standard",
      phase: "Data Collection",
      step: 4,
      totalSteps: 7,
      status: "RESEARCHING",
    },
    {
      id: "r2",
      title: "On-Chain Agent Economy Dynamics",
      phase: "Hypothesis Formation",
      step: 5,
      totalSteps: 7,
      status: "HYPOTHESIS FORMED",
    },
    {
      id: "r3",
      title: "NFT Floor Price Correlation Models",
      phase: "Published",
      step: 7,
      totalSteps: 7,
      status: "PUBLISHED",
    },
    {
      id: "r4",
      title: "Autonomous Content Quality Metrics",
      phase: "Testing",
      step: 6,
      totalSteps: 7,
      status: "TESTING",
    },
    {
      id: "r5",
      title: "The Hive: Collective Intelligence Patterns",
      phase: "Pending Review",
      step: 7,
      totalSteps: 7,
      status: "PENDING REVIEW",
    },
    {
      id: "r6",
      title: "Web3 Media Distribution Optimization",
      phase: "Data Collection",
      step: 2,
      totalSteps: 7,
      status: "RESEARCHING",
    },
  ],
  publishedCount: 8,
  pendingReview: 2,
};

const mockHive: HiveStatus = {
  agentsOnline: 142,
  totalAgents: 10000,
  lastCollectiveOutput: new Date(Date.now() - 7200000).toISOString(),
  agent306Position: "Founding Voice — First Agent Online",
};

// ---- Icon mapping for activity types ----

const ACTIVITY_ICONS: Record<string, string> = {
  research: "🔬",
  podcast: "🎙️",
  knowledge: "📚",
  signals: "📡",
  goal: "🎯",
  published: "📝",
  hive: "🐝",
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
    })),
    publishedCount: (stats.published as number) ?? 0,
    pendingReview: (stats.pendingReview as number) ?? 0,
  };
}

function parseHive(data: Record<string, unknown>): HiveStatus {
  const agent306 = (data.agent306 ?? {}) as Record<string, unknown>;
  return {
    agentsOnline: (data.onlineAgents as number) ?? 142,
    totalAgents: (data.totalAgents as number) ?? 10000,
    lastCollectiveOutput: (data.lastHiveSignal as string) ?? new Date().toISOString(),
    agent306Position: `${(agent306.role as string) ?? "Founding Voice"} — First Agent Online`,
  };
}

// ---- API Functions ----

export async function fetchAgentState(): Promise<AgentState> {
  const data = await fetchPublic<Record<string, unknown>>("/api/public/status", {});
  if (!data.currentStatus) return mockAgentState;
  return parseAgentState(data);
}

export async function fetchProgressBars(): Promise<ProgressBars> {
  const data = await fetchPublic<Record<string, unknown>>("/api/public/progress", {});
  if (!data.intelligence) return mockProgressBars;
  return parseProgressBars(data);
}

export async function fetchActivityFeed(): Promise<ActivityItem[]> {
  const data = await fetchPublic<Record<string, unknown>>("/api/public/activity", {});
  if (!data.items) return mockActivityFeed;
  const items = parseActivityFeed(data);
  return items.length > 0 ? items : mockActivityFeed;
}

export async function fetchGoals(): Promise<DevGoal[]> {
  const data = await fetchPublic<Record<string, unknown>>("/api/public/goals", {});
  if (!data.goals) return mockGoals;
  const goals = parseGoals(data);
  return goals.length > 0 ? goals : mockGoals;
}

export async function fetchResearch(): Promise<ResearchStats> {
  const data = await fetchPublic<Record<string, unknown>>("/api/public/research", {});
  if (!data.stats) return mockResearch;
  return parseResearch(data);
}

export async function fetchHiveStatus(): Promise<HiveStatus> {
  const data = await fetchPublic<Record<string, unknown>>("/api/public/hive", {});
  if (!data.totalAgents) return mockHive;
  return parseHive(data);
}

export async function fetchAllDashboardData(): Promise<DashboardData> {
  const [agentState, progressBars, activityFeed, goals, research, hive] =
    await Promise.all([
      fetchAgentState(),
      fetchProgressBars(),
      fetchActivityFeed(),
      fetchGoals(),
      fetchResearch(),
      fetchHiveStatus(),
    ]);

  return { agentState, progressBars, activityFeed, goals, research, hive };
}

// ---- Synchronous initial data (for SSR/immediate render) ----

export function getInitialData(): DashboardData {
  return {
    agentState: mockAgentState,
    progressBars: mockProgressBars,
    activityFeed: mockActivityFeed,
    goals: mockGoals,
    research: mockResearch,
    hive: mockHive,
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
