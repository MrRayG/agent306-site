// ============================================
// Agent 306 Public Dashboard — Type Definitions
// ============================================

export type AgentStatus =
  | "writing"
  | "researching"
  | "podcasting"
  | "planning"
  | "idle"
  | "transitioning";

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
}

export interface ResearchStats {
  topics: ResearchTopic[];
  publishedCount: number;
  pendingReview: number;
}

export interface HiveStatus {
  agentsOnline: number;
  totalAgents: number;
  lastCollectiveOutput: string;
  agent306Position: string;
}

export interface DashboardData {
  agentState: AgentState;
  progressBars: ProgressBars;
  activityFeed: ActivityItem[];
  goals: DevGoal[];
  research: ResearchStats;
  hive: HiveStatus;
}
