"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { CognitiveState } from "@/lib/types";

interface KnowledgePulseProps {
  data: CognitiveState;
}

function AnimatedCounter({ target, prefix }: { target: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  const animate = useCallback(() => {
    if (animated.current || !ref.current) return;
    animated.current = true;
    const duration = 1200;
    const start = performance.now();

    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      if (ref.current) {
        ref.current.textContent = (prefix || "") + Math.round(target * eased).toLocaleString();
      }
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [target, prefix]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return <span ref={ref} className="counter">0</span>;
}

/* ─── Animated progress ring ─── */
function ProgressRing({ value, max, color, size = 48 }: { value: number; max: number; color: string; size?: number }) {
  const stroke = 3;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);

  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - pct)}
        strokeLinecap="round"
        className="transition-all duration-1000"
      />
    </svg>
  );
}

/* ─── Cognitive Dimension Card ─── */
interface DimensionCard {
  label: string;
  value: string;
  numericValue: number;
  max: number;
  color: string;
  description: string;
}

function getDimensions(c: CognitiveState["cognition"]): DimensionCard[] {
  const confidenceNum = c.avgConfidence === "high" ? 92 : c.avgConfidence === "medium" ? 68 : 40;
  const voiceNum = c.voiceMaturity > 1 ? Math.round(c.voiceMaturity * 10) : Math.round(c.voiceMaturity * 100);
  const confirmPct = Math.round(c.reasoningQuality.confirmationRate * 100);
  
  return [
    {
      label: "Confidence",
      value: `${confidenceNum}%`,
      numericValue: confidenceNum,
      max: 100,
      color: confidenceNum >= 80 ? "#22c55e" : confidenceNum >= 50 ? "#f97316" : "#ef4444",
      description: `${c.avgConfidence} — reasoning quality across ${c.reasoningQuality.debatesRun} debates`,
    },
    {
      label: "Voice Maturity",
      value: `${voiceNum}%`,
      numericValue: voiceNum,
      max: 100,
      color: voiceNum >= 70 ? "#22c55e" : "#f97316",
      description: `${c.activeStyleRules} active style rules, ${c.totalReflections} reflections`,
    },
    {
      label: "Confirmation Rate",
      value: `${confirmPct}%`,
      numericValue: confirmPct,
      max: 100,
      color: confirmPct >= 60 ? "#22c55e" : "#f97316",
      description: `${c.reasoningQuality.hypothesesTested} hypotheses tested, ${c.reasoningQuality.contradictionsResolved} contradictions resolved`,
    },
    {
      label: "Synthesis",
      value: `${c.synthesisReports}`,
      numericValue: c.synthesisReports,
      max: Math.max(c.synthesisReports * 1.3, 100),
      color: "#a78bfa",
      description: `${c.synthesisReports} reports generated, ${c.knowledgeConnections} cross-links`,
    },
    {
      label: "Growth",
      value: c.growthVector,
      numericValue: c.growthVector === "expanding" ? 85 : c.growthVector === "refining" ? 70 : 50,
      max: 100,
      color: "#22c55e",
      description: `Day ${c.evolutionDay} — learning velocity ${c.learningVelocity.trend}`,
    },
    {
      label: "Mood",
      value: c.mood,
      numericValue: c.mood === "focused" ? 90 : c.mood === "curious" ? 80 : c.mood === "analytical" ? 75 : 60,
      max: 100,
      color: "#a78bfa",
      description: `Current cognitive disposition across ${c.knowledgeCategories} categories`,
    },
  ];
}

export default function KnowledgePulse({ data }: KnowledgePulseProps) {
  const c = data.cognition;
  const dimensions = getDimensions(c);

  const trendIcon = c.learningVelocity.trend === "accelerating" ? "↑" :
    c.learningVelocity.trend === "slowing" ? "↓" : "→";

  // Cycle through active processes
  const PROCESSES = [
    "indexing arXiv papers",
    "forming hypotheses",
    "running debate protocol",
    "cross-referencing sources",
    "scoring confidence levels",
    "synthesizing threads",
  ];
  const [processIdx, setProcessIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessIdx((prev) => (prev + 1) % PROCESSES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [PROCESSES.length]);

  return (
    <section id="pulse" className="py-[clamp(3rem,8vw,6rem)] bg-surface border-t border-b border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-[0.12em] font-medium mb-4 before:content-[''] before:w-3 before:h-px before:bg-accent">
          Cognitive Metrics
        </div>
        <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-extrabold tracking-tight mb-4">
          Knowledge Pulse
        </h2>
        <p className="text-base text-text-muted max-w-[600px] leading-relaxed mb-8">
          Real-time learning velocity, reasoning quality, and cognitive state — the agent&apos;s vital signs.
        </p>

        {/* Top metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fade-in-section">
          <div className="bg-surface-2 border border-border-subtle rounded-lg p-5">
            <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">Knowledge Base</div>
            <div className="font-mono text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-bold tabular-nums text-text-primary">
              <AnimatedCounter target={c.knowledgeEntries} />
            </div>
            <div className="text-xs text-text-faint mt-1">{c.knowledgeCategories} categories</div>
          </div>

          <div className="bg-surface-2 border border-border-subtle rounded-lg p-5">
            <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">7-Day Velocity</div>
            <div className="font-mono text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-bold tabular-nums text-text-primary">
              <AnimatedCounter target={c.learningVelocity.added7d} prefix="+" />
            </div>
            <div className="inline-flex items-center gap-1 font-mono text-xs mt-2 text-green">
              {trendIcon} {c.learningVelocity.trend}
            </div>
          </div>

          <div className="bg-surface-2 border border-border-subtle rounded-lg p-5">
            <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">Hypotheses</div>
            <div className="font-mono text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-bold tabular-nums text-text-primary">
              <AnimatedCounter target={c.reasoningQuality.hypothesesTested} />
            </div>
            <div className="text-xs text-text-faint mt-1">{(c.reasoningQuality.confirmationRate * 100).toFixed(0)}% confirmed</div>
          </div>

          <div className="bg-surface-2 border border-border-subtle rounded-lg p-5">
            <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">Connections</div>
            <div className="font-mono text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-bold tabular-nums text-text-primary">
              <AnimatedCounter target={c.knowledgeConnections} />
            </div>
            <div className="text-xs text-text-faint mt-1">cross-knowledge links</div>
          </div>
        </div>

        {/* Cognitive dimensions — ring cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 fade-in-section">
          {dimensions.map((d) => (
            <div
              key={d.label}
              className="flex items-center gap-4 p-4 bg-surface-2 rounded-lg border border-border-subtle hover:border-border transition-all"
            >
              <ProgressRing value={d.numericValue} max={d.max} color={d.color} />
              <div className="min-w-0">
                <div className="text-xs text-text-muted uppercase tracking-wider">{d.label}</div>
                <div className="font-display font-bold text-sm capitalize" style={{ color: d.color }}>
                  {d.value}
                </div>
                <div className="text-[11px] text-text-faint mt-0.5 leading-tight truncate" title={d.description}>
                  {d.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live process indicator */}
        <div className="mt-6 px-5 py-3 bg-surface-2 rounded-lg border border-border-subtle flex items-center gap-3 fade-in-section">
          <span
            className="w-2 h-2 rounded-full bg-accent shrink-0"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
          />
          <span className="font-mono text-xs text-text-muted">Currently:</span>
          <span className="font-mono text-xs text-accent transition-all duration-300">
            {PROCESSES[processIdx]}
          </span>
          <span className="font-mono text-[11px] text-text-faint ml-auto hidden md:inline">
            Evolution day {c.evolutionDay}
          </span>
        </div>
      </div>
    </section>
  );
}
