"use client";

import { useEffect, useRef, useCallback } from "react";
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

export default function KnowledgePulse({ data }: KnowledgePulseProps) {
  const c = data.cognition;

  const trendIcon = c.learningVelocity.trend === "accelerating" ? "\u2191" :
    c.learningVelocity.trend === "slowing" ? "\u2193" : "\u2192";

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

        {/* Metrics grid */}
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

        {/* Cognitive state cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 fade-in-section">
          <div className="flex items-center gap-3 p-4 bg-surface-2 rounded-lg border border-border-subtle">
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider">Confidence</div>
              <div className="font-display font-bold text-sm text-accent">{c.avgConfidence.toUpperCase()}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-surface-2 rounded-lg border border-border-subtle">
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider">Mood</div>
              <div className="font-display font-bold text-sm text-[#a78bfa] capitalize">{c.mood}</div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-surface-2 rounded-lg border border-border-subtle">
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wider">Growth</div>
              <div className="font-display font-bold text-sm text-green capitalize">{c.growthVector}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
