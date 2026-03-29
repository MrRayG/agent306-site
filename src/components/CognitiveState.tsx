"use client";

import { CognitiveState as CognitiveStateType } from "@/lib/types";

interface Props {
  data: CognitiveStateType;
}

function getConfidenceColor(confidence: string): string {
  switch (confidence) {
    case "high": return "#22c55e";
    case "medium": return "#eab308";
    case "low": return "#ef4444";
    default: return "#8a8a8a";
  }
}

function getTrendArrow(trend: string): string {
  switch (trend) {
    case "accelerating": return "\u2191";
    case "steady": return "\u2192";
    case "slowing": return "\u2193";
    default: return "\u2192";
  }
}

function getTrendColor(trend: string): string {
  switch (trend) {
    case "accelerating": return "#22c55e";
    case "steady": return "#eab308";
    case "slowing": return "#ef4444";
    default: return "#8a8a8a";
  }
}

export default function CognitiveState({ data }: Props) {
  const c = data.cognition;
  const confidenceColor = getConfidenceColor(c.avgConfidence);
  const trendColor = getTrendColor(c.learningVelocity.trend);
  const confirmPct = Math.round(c.reasoningQuality.confirmationRate * 100);

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
          The Mind
        </h2>
        <p className="text-text-muted text-sm">
          Real-time cognitive state of Agent #306
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Knowledge */}
        <div className="p-4 rounded-lg border border-border/50 bg-surface hover:bg-surface-2 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">📚</span>
              <span className="text-xs text-text-faint font-mono uppercase tracking-wider">
                Knowledge
              </span>
            </div>
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: confidenceColor, boxShadow: `0 0 6px ${confidenceColor}66` }}
              title={`Confidence: ${c.avgConfidence}`}
            />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xl font-bold text-text-primary">
              {c.knowledgeEntries}
            </span>
            <span className="text-xs text-text-muted">entries</span>
          </div>
          <div className="text-xs text-text-faint font-mono mt-1">
            {c.knowledgeCategories} categories
          </div>
        </div>

        {/* Learning Velocity */}
        <div className="p-4 rounded-lg border border-border/50 bg-surface hover:bg-surface-2 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">📈</span>
              <span className="text-xs text-text-faint font-mono uppercase tracking-wider">
                Learning Velocity
              </span>
            </div>
            <span
              className="font-mono text-sm font-bold"
              style={{ color: trendColor }}
            >
              {getTrendArrow(c.learningVelocity.trend)}
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xl font-bold text-accent">
              {c.learningVelocity.added7d}
            </span>
            <span className="text-xs text-text-muted">7d</span>
            <span className="text-text-faint">/</span>
            <span className="font-mono text-lg font-bold text-text-primary">
              {c.learningVelocity.added30d}
            </span>
            <span className="text-xs text-text-muted">30d</span>
          </div>
          <div className="text-xs text-text-faint font-mono mt-1">
            {c.learningVelocity.trend}
          </div>
        </div>

        {/* Reasoning */}
        <div className="p-4 rounded-lg border border-border/50 bg-surface hover:bg-surface-2 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">🧪</span>
            <span className="text-xs text-text-faint font-mono uppercase tracking-wider">
              Reasoning
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xl font-bold text-text-primary">
              {confirmPct}%
            </span>
            <span className="text-xs text-text-muted">confirmation rate</span>
          </div>
          <div className="text-xs text-text-faint font-mono mt-1">
            {c.reasoningQuality.debatesRun} debates run
          </div>
        </div>

        {/* Voice */}
        <div className="p-4 rounded-lg border border-border/50 bg-surface hover:bg-surface-2 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">🎙️</span>
            <span className="text-xs text-text-faint font-mono uppercase tracking-wider">
              Voice
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xl font-bold text-accent">
              {c.voiceMaturity}
            </span>
            <span className="text-xs text-text-muted">/10 maturity</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="mood-pulse w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            <span className="text-xs text-text-faint font-mono">
              {c.mood}
            </span>
          </div>
        </div>

        {/* Connections */}
        <div className="p-4 rounded-lg border border-border/50 bg-surface hover:bg-surface-2 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">🔗</span>
            <span className="text-xs text-text-faint font-mono uppercase tracking-wider">
              Connections
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xl font-bold text-text-primary">
              {c.knowledgeConnections}
            </span>
            <span className="text-xs text-text-muted">links</span>
          </div>
          <div className="text-xs text-text-faint font-mono mt-1">
            {c.synthesisReports} synthesis reports
          </div>
        </div>

        {/* Evolution */}
        <div className="p-4 rounded-lg border border-border/50 bg-surface hover:bg-surface-2 transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm">🧬</span>
            <span className="text-xs text-text-faint font-mono uppercase tracking-wider">
              Evolution
            </span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-2xl font-bold text-accent">
              Day {c.evolutionDay}
            </span>
          </div>
          <div className="text-xs text-text-faint font-mono mt-1">
            growth: {c.growthVector}
          </div>
        </div>
      </div>
    </section>
  );
}
