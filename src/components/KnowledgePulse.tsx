"use client";

import { CognitiveState } from "@/lib/types";

interface KnowledgePulseProps {
  data: CognitiveState;
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  const padding = 2;

  const points = data
    .map((val, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((val - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="inline-block align-middle"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* End dot */}
      {data.length > 0 && (
        <circle
          cx={padding + ((data.length - 1) / (data.length - 1)) * (width - padding * 2)}
          cy={height - padding - ((data[data.length - 1] - min) / range) * (height - padding * 2)}
          r="2"
          fill={color}
        />
      )}
    </svg>
  );
}

function CircularGauge({ value, max, color, label }: { value: number; max: number; color: string; label: string }) {
  const radius = 28;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circumference - pct * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="64" height="64" viewBox="0 0 64 64">
        {/* Background ring */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth={strokeWidth}
        />
        {/* Value ring */}
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
          className="transition-all duration-1000 ease-out"
        />
        {/* Center value */}
        <text
          x="32"
          y="34"
          textAnchor="middle"
          fill="#e8e8e8"
          fontSize="12"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="600"
        >
          {value}
        </text>
      </svg>
      <span className="text-text-muted text-[11px] font-mono leading-tight text-center">
        {label}
      </span>
    </div>
  );
}

export default function KnowledgePulse({ data }: KnowledgePulseProps) {
  const c = data.cognition;

  // Synthesize sparkline data from available metrics (mock trending data based on current values)
  const velocitySpark = [
    Math.round(c.learningVelocity.added30d * 0.1),
    Math.round(c.learningVelocity.added30d * 0.15),
    Math.round(c.learningVelocity.added30d * 0.25),
    Math.round(c.learningVelocity.added30d * 0.35),
    Math.round(c.learningVelocity.added30d * 0.5),
    Math.round(c.learningVelocity.added30d * 0.7),
    c.learningVelocity.added7d,
  ];

  const trendIcon = c.learningVelocity.trend === "accelerating" ? "↑" :
    c.learningVelocity.trend === "slowing" ? "↓" : "→";
  const trendColor = c.learningVelocity.trend === "accelerating" ? "#34d399" :
    c.learningVelocity.trend === "slowing" ? "#f87171" : "#fbbf24";

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h2 className="font-display text-lg font-bold text-text-primary">
          Knowledge Pulse
        </h2>
        <p className="text-text-muted text-xs mt-1">
          Learning velocity, reasoning quality, and cognitive metrics
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {/* KB Entries */}
        <div className="p-4 rounded-lg border border-border/50 bg-surface">
          <p className="text-text-muted text-[10px] font-mono uppercase tracking-wider mb-1">
            Knowledge Base
          </p>
          <p className="text-text-primary text-xl font-mono font-bold tabular-nums">
            {c.knowledgeEntries.toLocaleString()}
          </p>
          <p className="text-text-muted text-[10px] font-mono mt-1">
            {c.knowledgeCategories} categories
          </p>
        </div>

        {/* Learning Velocity */}
        <div className="p-4 rounded-lg border border-border/50 bg-surface">
          <p className="text-text-muted text-[10px] font-mono uppercase tracking-wider mb-1">
            7d Velocity
          </p>
          <div className="flex items-end gap-2">
            <p className="text-text-primary text-xl font-mono font-bold tabular-nums">
              +{c.learningVelocity.added7d}
            </p>
            <span className="text-xs font-mono mb-0.5" style={{ color: trendColor }}>
              {trendIcon}
            </span>
          </div>
          <div className="mt-1">
            <MiniSparkline data={velocitySpark} color="#f97316" />
          </div>
        </div>

        {/* Hypotheses */}
        <div className="p-4 rounded-lg border border-border/50 bg-surface">
          <p className="text-text-muted text-[10px] font-mono uppercase tracking-wider mb-1">
            Hypotheses Tested
          </p>
          <p className="text-text-primary text-xl font-mono font-bold tabular-nums">
            {c.reasoningQuality.hypothesesTested}
          </p>
          <p className="text-text-muted text-[10px] font-mono mt-1">
            {(c.reasoningQuality.confirmationRate * 100).toFixed(0)}% confirmed
          </p>
        </div>

        {/* Connections */}
        <div className="p-4 rounded-lg border border-border/50 bg-surface">
          <p className="text-text-muted text-[10px] font-mono uppercase tracking-wider mb-1">
            Connections
          </p>
          <p className="text-text-primary text-xl font-mono font-bold tabular-nums">
            {c.knowledgeConnections}
          </p>
          <p className="text-text-muted text-[10px] font-mono mt-1">
            cross-knowledge links
          </p>
        </div>
      </div>

      {/* Gauges Row */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-6 p-4 rounded-lg border border-border/50 bg-surface">
        <CircularGauge
          value={c.reasoningQuality.debatesRun}
          max={100}
          color="#a78bfa"
          label="Debates"
        />
        <CircularGauge
          value={c.totalReflections}
          max={50}
          color="#f97316"
          label="Reflections"
        />
        <CircularGauge
          value={c.synthesisReports}
          max={20}
          color="#34d399"
          label="Syntheses"
        />
        <CircularGauge
          value={Math.round(c.voiceMaturity * 10)}
          max={100}
          color="#60a5fa"
          label="Voice"
        />
        <CircularGauge
          value={c.activeStyleRules}
          max={30}
          color="#fbbf24"
          label="Style Rules"
        />

        {/* Confidence + Mood text block */}
        <div className="flex flex-col justify-center gap-1 ml-auto">
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-[10px] font-mono uppercase">Confidence</span>
            <span className={`text-xs font-mono font-semibold ${
              c.avgConfidence === "high" ? "text-green-400" :
              c.avgConfidence === "medium" ? "text-yellow-400" : "text-red-400"
            }`}>
              {c.avgConfidence.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-[10px] font-mono uppercase">Mood</span>
            <span className="text-xs font-mono text-text-primary capitalize">
              {c.mood}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-[10px] font-mono uppercase">Growth</span>
            <span className="text-xs font-mono capitalize" style={{ color: trendColor }}>
              {c.growthVector}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
