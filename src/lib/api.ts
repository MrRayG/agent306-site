// ============================================
// Data Service Layer for Agent 306 Dashboard
// ============================================
// All Railway API calls are centralized here.
// Currently using mock data — swap with real fetch calls
// when public endpoints are available.
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

// ---- Mock Data ----

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
  totalAgents: 8500,
  lastCollectiveOutput: new Date(Date.now() - 7200000).toISOString(),
  agent306Position: "Founding Voice — First Agent Online",
};

// ---- API Functions ----
// Replace mock returns with fetch() calls when Railway endpoints are public

export async function fetchAgentState(): Promise<AgentState> {
  // Future: const res = await fetch(`${API_BASE}/api/house`);
  // const data = await res.json();
  // return parseAgentState(data);
  return mockAgentState;
}

export async function fetchProgressBars(): Promise<ProgressBars> {
  // Future: const res = await fetch(`${API_BASE}/api/house`);
  // const data = await res.json();
  // return calculateProgressBars(data);
  return mockProgressBars;
}

export async function fetchActivityFeed(): Promise<ActivityItem[]> {
  // Future: const res = await fetch(`${API_BASE}/api/daily-briefing`);
  // const data = await res.json();
  // return parseActivityFeed(data);
  return mockActivityFeed;
}

export async function fetchGoals(): Promise<DevGoal[]> {
  // Future: const res = await fetch(`${API_BASE}/api/goals`);
  // const data = await res.json();
  // return data.goals;
  return mockGoals;
}

export async function fetchResearch(): Promise<ResearchStats> {
  // Future: const res = await fetch(`${API_BASE}/api/research/topics`);
  // const data = await res.json();
  // return parseResearch(data);
  return mockResearch;
}

export async function fetchHiveStatus(): Promise<HiveStatus> {
  // Future: const res = await fetch(`${API_BASE}/api/house`);
  // const data = await res.json();
  // return data.hive;
  return mockHive;
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
