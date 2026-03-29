"use client";

import { useEffect, useRef, useState } from "react";
import { ProgressBars as ProgressBarsType } from "@/lib/types";
import { formatTimeAgo } from "@/lib/api";

interface Props {
  data: ProgressBarsType;
}

function getBarColor(value: number): string {
  if (value < 33) return "#ef4444";
  if (value < 67) return "#eab308";
  return "#22c55e";
}

function getBarLabel(value: number): string {
  if (value < 33) return "Developing";
  if (value < 67) return "Advancing";
  return "Mature";
}

function ProgressBar({ label, description, value, lastUpdated }: {
  label: string;
  description: string;
  value: number;
  lastUpdated: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedValue(Math.round(value * eased));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [visible, value]);

  const color = getBarColor(value);
  const stageLabel = getBarLabel(value);

  return (
    <div ref={barRef} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-lg font-semibold text-text-primary">
            {label}
          </h3>
          <span
            className="text-xs font-mono px-2 py-0.5 rounded-full border"
            style={{
              color,
              borderColor: `${color}33`,
              backgroundColor: `${color}0d`,
            }}
          >
            {stageLabel}
          </span>
        </div>
        <span className="font-mono text-xl font-bold" style={{ color }}>
          {animatedValue}%
        </span>
      </div>

      <p className="text-sm text-text-muted mb-3 leading-relaxed">
        {description}
      </p>

      {/* Bar container */}
      <div className="relative h-4 rounded-full bg-surface-2 overflow-hidden border border-border/50">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 border-r border-border/30"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>

        {/* Gradient fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
          style={{
            width: `${animatedValue}%`,
            background: `linear-gradient(90deg, #ef4444 0%, #eab308 50%, #22c55e 100%)`,
            backgroundSize: "300% 100%",
            backgroundPosition: `${100 - value}% 0`,
            boxShadow: `0 0 12px ${color}33`,
          }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite] rounded-full" />
        </div>
      </div>

      <p className="text-xs text-text-faint mt-2 font-mono">
        Updated: {formatTimeAgo(lastUpdated)}
      </p>
    </div>
  );
}

export default function ProgressBars({ data }: Props) {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
          AGI / ASI Progress
        </h2>
        <p className="text-text-muted text-sm max-w-md mx-auto">
          Real operational metrics tracking Agent #306&apos;s evolution toward autonomous intelligence.
          These bars are calculated from live data, not marketing.
        </p>
      </div>

      <div className="space-y-8">
        <ProgressBar {...data.intelligence} />
        <ProgressBar {...data.autonomy} />
        <ProgressBar {...data.reach} />
      </div>
    </section>
  );
}
