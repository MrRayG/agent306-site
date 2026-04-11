"use client";

import { AgentState } from "@/lib/types";
import { formatTimeAgo } from "@/lib/api";

const STATUS_CONFIG: Record<string, { label: string; color: string; pulse: boolean }> = {
  researching: { label: "RESEARCHING", color: "#f97316", pulse: true },
  reasoning: { label: "REASONING", color: "#a78bfa", pulse: true },
  writing: { label: "WRITING", color: "#34d399", pulse: true },
  podcasting: { label: "PODCASTING", color: "#f97316", pulse: true },
  planning: { label: "PLANNING", color: "#60a5fa", pulse: true },
  idle: { label: "IDLE", color: "#555555", pulse: false },
  transitioning: { label: "TRANSITIONING", color: "#fbbf24", pulse: true },
};

interface HeroV2Props {
  agentState: AgentState;
  kbCount: number;
  evolutionDay: number;
}

export default function HeroV2({ agentState, kbCount, evolutionDay }: HeroV2Props) {
  const config = STATUS_CONFIG[agentState.currentStatus] || STATUS_CONFIG.idle;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 pt-10 pb-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Logo + Identity */}
        <div className="flex-shrink-0">
          <svg
            className="w-20 h-20"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Agent #306 logo"
          >
            <path
              d="M40 4 L72 20 L72 60 L40 76 L8 60 L8 20 Z"
              stroke="#f97316"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M24 44 C24 44 26 36 32 34 C34 33 36 28 40 26 C44 28 46 33 48 34 C54 36 56 44 56 44 L58 44 C58 44 58 46 56 46 L24 46 C22 46 22 44 24 44Z"
              fill="#f97316"
              opacity="0.9"
            />
            <rect x="26" y="43" width="28" height="2" rx="1" fill="#f97316" opacity="0.6" />
            <text
              x="40"
              y="62"
              textAnchor="middle"
              fill="#f97316"
              fontFamily="sans-serif"
              fontWeight="700"
              fontSize="13"
              letterSpacing="1"
            >
              306
            </text>
          </svg>
        </div>

        {/* Name + Tagline */}
        <div className="flex-1 text-center sm:text-left">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">
            Agent <span className="gradient-text">#306</span>
          </h1>
          <p className="text-text-muted text-sm mb-4">
            Autonomous AI Research Intelligence
          </p>

          {/* Status Bar */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Live status indicator */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono font-medium"
              style={{
                borderColor: `${config.color}40`,
                backgroundColor: `${config.color}10`,
                color: config.color,
              }}
            >
              <span className="relative flex h-2 w-2">
                {config.pulse && (
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: config.color }}
                  />
                )}
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ backgroundColor: config.color }}
                />
              </span>
              {config.label}
            </div>

            {/* Quick stats */}
            <span className="text-text-faint text-xs font-mono">
              KB: {kbCount.toLocaleString()}
            </span>
            <span className="text-text-faint text-xs font-mono">
              Day {evolutionDay}
            </span>
            <span className="text-text-faint text-xs font-mono">
              {formatTimeAgo(agentState.lastUpdated)}
            </span>
          </div>

          {/* Current task description */}
          {agentState.statusLabel && (
            <p className="text-text-muted text-xs mt-2 max-w-xs sm:max-w-md truncate">
              {agentState.statusLabel}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
