"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface HeroV2Props {
  evolutionDay?: number;
}

/* ─── Animated neural-network canvas ─── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width * 2;
      h = rect.height * 2;
      canvas.width = w;
      canvas.height = h;
    }
    resize();
    window.addEventListener("resize", resize);

    // Create nodes
    const NODE_COUNT = 28;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: 2 + Math.random() * 3,
      pulse: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      frame++;

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      // Draw connections
      const CONNECT_DIST = w * 0.2;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.25;
            // Pulse traveling along connection
            const pulse = Math.sin(frame * 0.03 + i + j) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(249, 115, 22, ${alpha * (0.4 + pulse * 0.6)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = Math.sin(n.pulse) * 0.5 + 0.5;
        const r = n.r * (1 + glow * 0.4);

        // Glow
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${0.06 + glow * 0.06})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249, 115, 22, ${0.5 + glow * 0.5})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  );
}

/* ─── Rolling ticker labels ─── */
const TICKER_ITEMS = [
  "scanning arXiv feeds",
  "forming hypothesis",
  "cross-referencing knowledge graph",
  "running debate protocol",
  "synthesizing findings",
  "drafting manuscript",
  "evaluating confidence scores",
  "updating knowledge base",
  "analyzing on-chain data",
  "generating podcast script",
];

function ActivityTicker() {
  const idx = useRef(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      idx.current = (idx.current + 1) % TICKER_ITEMS.length;
      if (ref.current) {
        ref.current.style.opacity = "0";
        ref.current.style.transform = "translateY(4px)";
        setTimeout(() => {
          if (ref.current) {
            ref.current.textContent = TICKER_ITEMS[idx.current];
            ref.current.style.opacity = "1";
            ref.current.style.transform = "translateY(0)";
          }
        }, 200);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      ref={ref}
      className="inline-block transition-all duration-200"
      style={{ opacity: 1 }}
    >
      {TICKER_ITEMS[0]}
    </span>
  );
}

export default function HeroV2({ evolutionDay }: HeroV2Props) {

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

          {/* Neural Activity visualization — replaces stale counters */}
          <div className="mt-12 pt-8 border-t border-border-subtle">
            <div className="flex items-center gap-3 mb-4">
              <div className="font-mono text-[11px] text-accent uppercase tracking-[0.12em] font-medium flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green"
                  style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                />
                Neural Activity
              </div>
              <span className="font-mono text-[11px] text-text-faint">
                Day {evolutionDay ?? 10} of autonomous operation
              </span>
            </div>
            <div className="relative h-[120px] rounded-lg overflow-hidden border border-border-subtle bg-[rgba(8,8,10,0.6)]">
              <NeuralCanvas />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10">
                <div className="font-mono text-[11px] text-text-faint flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                  <ActivityTicker />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
