"use client";

import { EvalBenchmark as EvalBenchmarkType, EvalDimension } from "@/lib/types";
import { LiveResult } from "@/lib/api";

interface Props {
  data: LiveResult<EvalBenchmarkType>;
}

const AGENT_COLORS: Record<string, string> = {
  Researcher: "#3B82F6",
  Reasoner: "#8B5CF6",
  Writer: "#10B981",
};

function getScoreColor(score: number): string {
  if (score < 40) return "#f87171";
  if (score < 60) return "#fbbf24";
  if (score < 80) return "#3b82f6";
  return "#4ade80";
}

function getDriftArrow(drift: "improving" | "declining" | "stable"): string {
  switch (drift) {
    case "improving": return "\u2191";
    case "declining": return "\u2193";
    case "stable": return "\u2192";
  }
}

function getDriftColor(drift: "improving" | "declining" | "stable"): string {
  switch (drift) {
    case "improving": return "#22c55e";
    case "declining": return "#ef4444";
    case "stable": return "#8a8880";
  }
}

function getTrendArrow(trend: "up" | "down" | "steady"): string {
  switch (trend) {
    case "up": return "\u2191";
    case "down": return "\u2193";
    case "steady": return "\u2192";
  }
}

function getTrendColor(trend: "up" | "down" | "steady"): string {
  switch (trend) {
    case "up": return "#22c55e";
    case "down": return "#ef4444";
    case "steady": return "#8a8880";
  }
}

function DimensionCard({ dimension, isWeakest }: { dimension: EvalDimension; isWeakest: boolean }) {
  const agentColor = AGENT_COLORS[dimension.agent] ?? "#8a8880";
  const scoreColor = getScoreColor(dimension.score);
  const trendColor = getTrendColor(dimension.trend);

  return (
    <div
      className="p-4 rounded-lg border bg-surface hover:bg-surface-2 transition-colors"
      style={{
        borderColor: isWeakest ? `${agentColor}66` : "rgba(249, 115, 22, 0.12)",
        boxShadow: isWeakest ? `inset 0 0 12px ${agentColor}11` : undefined,
      }}
    >
      {/* Agent badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{
            color: agentColor,
            backgroundColor: `${agentColor}15`,
            borderWidth: 1,
            borderColor: `${agentColor}33`,
            borderStyle: "solid",
          }}
        >
          {dimension.agent}
        </span>
        <span
          className="font-mono text-sm font-bold"
          style={{ color: trendColor }}
        >
          {getTrendArrow(dimension.trend)}
        </span>
      </div>

      {/* Dimension name */}
      <h4 className="font-display text-sm font-semibold text-text-primary mb-3">
        {dimension.name}
      </h4>

      {/* Score + bar */}
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-xl font-bold" style={{ color: scoreColor }}>
          {dimension.score}
        </span>
        <div className="flex-1 h-2 rounded-full bg-surface-2 overflow-hidden border border-border-subtle">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${dimension.score}%`,
              backgroundColor: scoreColor,
              boxShadow: `0 0 8px ${scoreColor}44`,
            }}
          />
        </div>
      </div>

      {/* Narrative */}
      <p className="text-xs text-text-muted leading-relaxed">
        {dimension.narrative}
      </p>
    </div>
  );
}

export default function EvalBenchmark({ data }: Props) {
  const benchmark = data.data;
  const driftColor = getDriftColor(benchmark.drift);

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16">
      {/* Section header */}
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
          306Eval
        </h2>
        <p className="text-text-muted text-sm">
          How I measure my own growth
        </p>
      </div>

      {/* Composite score */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3">
          <span
            className="font-mono text-5xl font-bold"
            style={{ color: getScoreColor(benchmark.composite) }}
          >
            {benchmark.composite}
          </span>
          <span className="text-text-faint font-mono text-xl">/100</span>
          <span
            className="font-mono text-2xl font-bold"
            style={{ color: driftColor }}
          >
            {getDriftArrow(benchmark.drift)}
          </span>
        </div>
        <p className="text-xs text-text-faint font-mono mt-1 uppercase tracking-wider">
          composite score &middot; {benchmark.drift}
        </p>
      </div>

      {/* Calibration directive */}
      <div className="mb-10 p-4 rounded-lg border border-accent/20 bg-accent-glow">
        <p className="text-xs text-text-faint font-mono uppercase tracking-wider mb-1">
          What I&apos;m focusing on next
        </p>
        <p className="text-sm text-text-primary leading-relaxed">
          {benchmark.calibrationDirective}
        </p>
      </div>

      {/* Dimension cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {benchmark.dimensions.map((dim) => (
          <DimensionCard
            key={dim.key}
            dimension={dim}
            isWeakest={dim.key === benchmark.weakestDimension}
          />
        ))}
      </div>

      {/* Live indicator */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <span
          className="w-1.5 h-1.5 rounded-full inline-block"
          style={{
            backgroundColor: data.isLive ? "#22c55e" : "#8a8880",
            boxShadow: data.isLive ? "0 0 6px rgba(34, 197, 94, 0.4)" : undefined,
          }}
        />
        <span className="text-xs text-text-faint font-mono">
          {data.isLive ? "live from 306eval" : "using fallback data"}
        </span>
      </div>
    </section>
  );
}
