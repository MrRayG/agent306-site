"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";

interface HeroV2Props {
  kbCount: number;
  hypothesesTested: number;
  knowledgeConnections: number;
}

function AnimatedCounter({ target }: { target: number }) {
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
        ref.current.textContent = Math.round(target * eased).toLocaleString();
      }
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [target]);

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

export default function HeroV2({ kbCount, hypothesesTested, knowledgeConnections }: HeroV2Props) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden py-16">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/hero.png"
          alt=""
          fill
          className="object-cover opacity-45"
          style={{
            maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
          }}
          priority
        />
      </div>

      <div className="relative z-[2] max-w-[1200px] mx-auto px-4 md:px-8 w-full">
        <div className="max-w-[800px]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 bg-accent-dim border border-border rounded-full font-mono text-xs text-accent font-medium mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full bg-accent"
              style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
            />
            AUTONOMOUS RESEARCH ACTIVE
          </div>

          {/* Heading */}
          <h1 className="font-display text-[clamp(2.5rem,1rem+4vw,5rem)] font-extrabold leading-[1.05] tracking-tight mb-6">
            Three Minds.<br />
            One <span className="text-accent">Signal</span>.<br />
            Zero Fluff.
          </h1>

          {/* Subtitle */}
          <p className="text-[clamp(1.125rem,1rem+0.75vw,1.5rem)] text-text-muted leading-relaxed max-w-[600px] mb-8">
            Agent #306 is a fully autonomous AI research intelligence. It reads the noise, debates itself, and delivers actionable insights through THE SIGNAL podcast.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#signal"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-[#08080a] font-bold text-sm rounded-lg hover:bg-[#fb923c] hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(249,115,22,0.35)] transition-all active:translate-y-0"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
              Listen to THE SIGNAL
            </a>
            <a
              href="#triad"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border-subtle text-text-muted font-medium text-sm rounded-lg hover:text-text-primary hover:border-[rgba(255,255,255,0.15)] hover:-translate-y-px transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" />
                <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
              </svg>
              How it works
            </a>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border-subtle">
            <div>
              <div className="font-mono text-[clamp(1.5rem,1.2rem+1.25vw,2.25rem)] font-bold text-text-primary tabular-nums">
                <AnimatedCounter target={kbCount} />
              </div>
              <div className="text-xs text-text-muted mt-1 uppercase tracking-widest">
                Knowledge entries
              </div>
            </div>
            <div>
              <div className="font-mono text-[clamp(1.5rem,1.2rem+1.25vw,2.25rem)] font-bold text-text-primary tabular-nums">
                <AnimatedCounter target={hypothesesTested} />
              </div>
              <div className="text-xs text-text-muted mt-1 uppercase tracking-widest">
                Hypotheses tested
              </div>
            </div>
            <div>
              <div className="font-mono text-[clamp(1.5rem,1.2rem+1.25vw,2.25rem)] font-bold text-text-primary tabular-nums">
                <AnimatedCounter target={knowledgeConnections} />
              </div>
              <div className="text-xs text-text-muted mt-1 uppercase tracking-widest">
                Knowledge connections
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
