"use client";

import { AgentState, ResearchStats, CognitiveState } from "@/lib/types";

interface TriadPipelineProps {
  agentState: AgentState;
  research: ResearchStats;
  cognitiveState: CognitiveState;
}

const AGENT_CONFIG = [
  {
    code: "3",
    name: "Researcher",
    role: "Signal collection, source scanning, data gathering",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    activeStatuses: ["researching"],
    color: "#f97316",
  },
  {
    code: "0",
    name: "Reasoner",
    role: "Hypothesis formation, debate, logic mapping",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a8 8 0 0 0-8 8c0 3.4 2.1 6.3 5 7.4V20h6v-2.6c2.9-1.1 5-4 5-7.4a8 8 0 0 0-8-8z" />
        <path d="M9 22h6" />
        <path d="M10 18h4" />
      </svg>
    ),
    activeStatuses: ["reasoning", "planning"],
    color: "#a78bfa",
  },
  {
    code: "6",
    name: "Writer",
    role: "Content drafting, voice synthesis, publishing",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      </svg>
    ),
    activeStatuses: ["writing", "podcasting"],
    color: "#34d399",
  },
];

function getAgentMetric(code: string, research: ResearchStats, cognitiveState: CognitiveState): string {
  switch (code) {
    case "3": {
      const activeResearch = research.topics.filter(
        (t) => t.status === "RESEARCHING"
      ).length;
      return `${activeResearch} active threads`;
    }
    case "0": {
      const tested = cognitiveState.cognition.reasoningQuality.hypothesesTested;
      const debates = cognitiveState.cognition.reasoningQuality.debatesRun;
      return `${tested} hypotheses · ${debates} debates`;
    }
    case "6": {
      const pending = research.pendingReview;
      const published = research.publishedCount;
      return `${pending} pending · ${published} published`;
    }
    default:
      return "";
  }
}

export default function TriadPipeline({ agentState, research, cognitiveState }: TriadPipelineProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h2 className="font-display text-lg font-bold text-text-primary">
          The Agentic Triad
        </h2>
        <p className="text-text-muted text-xs mt-1">
          Three-agent pipeline: Research → Reasoning → Writing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {AGENT_CONFIG.map((agent, i) => {
          const isActive = agent.activeStatuses.includes(agentState.currentStatus);
          const metric = getAgentMetric(agent.code, research, cognitiveState);

          return (
            <div key={agent.code} className="relative">
              {/* Connection arrow (between cards on md+) */}
              {i < 2 && (
                <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-text-faint">
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="currentColor">
                    <path d="M2 6h8M7 3l3 3-3 3" />
                  </svg>
                </div>
              )}

              <div
                className={`relative p-4 rounded-lg border transition-all duration-500 ${
                  isActive
                    ? "border-opacity-50 bg-opacity-10"
                    : "border-border/50 bg-surface"
                }`}
                style={{
                  borderColor: isActive ? `${agent.color}50` : undefined,
                  backgroundColor: isActive ? `${agent.color}08` : undefined,
                }}
              >
                {/* Agent header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: `${agent.color}15`,
                      color: agent.color,
                    }}
                  >
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-xs font-bold"
                        style={{ color: agent.color }}
                      >
                        Agent {agent.code}
                      </span>
                      {/* Status dot */}
                      <span className="relative flex h-1.5 w-1.5">
                        {isActive && (
                          <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ backgroundColor: agent.color }}
                          />
                        )}
                        <span
                          className="relative inline-flex rounded-full h-1.5 w-1.5"
                          style={{
                            backgroundColor: isActive ? agent.color : "#555",
                          }}
                        />
                      </span>
                    </div>
                    <p className="text-text-primary text-sm font-medium">
                      {agent.name}
                    </p>
                  </div>
                </div>

                {/* Role description */}
                <p className="text-text-muted text-xs mb-3">
                  {agent.role}
                </p>

                {/* Metric */}
                <div className="pt-2 border-t border-border/30">
                  <p className="text-xs font-mono" style={{ color: `${agent.color}cc` }}>
                    {metric}
                  </p>
                </div>

                {/* Active task indicator */}
                {isActive && agentState.statusLabel && (
                  <div
                    className="mt-2 px-2 py-1 rounded text-xs truncate"
                    style={{
                      backgroundColor: `${agent.color}10`,
                      color: `${agent.color}dd`,
                    }}
                  >
                    → {agentState.statusLabel}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
