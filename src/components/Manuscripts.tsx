"use client";

import { useState } from "react";

type FilterCategory = "all" | "ai" | "web3" | "blockchain" | "tech";

interface Manuscript {
  id: string;
  category: FilterCategory;
  categoryLabel: string;
  confidence: number;
  confidenceLevel: "high" | "medium";
  title: string;
  abstract: string;
  stepsComplete: number;
  totalSteps: number;
  date: string;
}

const MANUSCRIPTS: Manuscript[] = [
  {
    id: "m1",
    category: "ai",
    categoryLabel: "AI & Agents",
    confidence: 9.2,
    confidenceLevel: "high",
    title: "The Liability Vacuum: Who Pays When AI Agents Lose Your Money?",
    abstract: "A comprehensive analysis of the legal framework gaps exposed by Public\u2019s agentic brokerage launch. Maps current liability structures across securities law, tort law, and emerging AI regulation. Proposes a three-tier accountability model that distributes risk between platform, model provider, and end user.",
    stepsComplete: 7,
    totalSteps: 7,
    date: "Apr 10",
  },
  {
    id: "m2",
    category: "blockchain",
    categoryLabel: "Blockchain",
    confidence: 8.5,
    confidenceLevel: "high",
    title: "On-Chain AI Agent Burn Mechanics: Deflationary Incentive Alignment",
    abstract: "Investigation into tokenized AI agents using programmatic burn mechanisms to create deflationary pressure. Analyzes three live protocols implementing agent-driven burns, compares outcomes against traditional token sinks, and models long-term sustainability under varying adoption curves.",
    stepsComplete: 7,
    totalSteps: 7,
    date: "Apr 9",
  },
  {
    id: "m3",
    category: "web3",
    categoryLabel: "Web3 Culture",
    confidence: 7.8,
    confidenceLevel: "medium",
    title: "Vibe Coding: When Velocity Outpaces Reliability",
    abstract: 'Explores the tension between "vibe coding" tools that prioritize speed over correctness and the enterprise environments that demand both. Identifies the adoption tipping point where breakage tolerance shifts, based on survey data from 200+ development teams and incident postmortems.',
    stepsComplete: 7,
    totalSteps: 7,
    date: "Apr 8",
  },
  {
    id: "m4",
    category: "ai",
    categoryLabel: "AI Safety",
    confidence: 8.8,
    confidenceLevel: "high",
    title: "The Persuasion Architecture: How AI Systems Learn to Change Minds",
    abstract: "Deep investigation into emerging persuasion patterns across conversational AI systems. Documents three distinct manipulation vectors identified through behavioral analysis, and proposes detection heuristics that could be implemented at the model evaluation layer.",
    stepsComplete: 7,
    totalSteps: 7,
    date: "Apr 11",
  },
];

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "AI & Agents", value: "ai" },
  { label: "Web3", value: "web3" },
  { label: "Blockchain", value: "blockchain" },
  { label: "Technology", value: "tech" },
];

const CATEGORY_STYLES: Record<string, string> = {
  ai: "bg-[rgba(249,115,22,0.12)] text-accent",
  web3: "bg-[rgba(147,130,255,0.12)] text-[#9382ff]",
  blockchain: "bg-[rgba(34,197,94,0.12)] text-green",
  tech: "bg-[rgba(96,165,250,0.12)] text-[#60a5fa]",
};

export default function Manuscripts() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filtered = activeFilter === "all"
    ? MANUSCRIPTS
    : MANUSCRIPTS.filter((m) => m.category === activeFilter);

  return (
    <section id="manuscripts" className="py-[clamp(3rem,8vw,6rem)] bg-surface border-t border-b border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header with filter */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-[0.12em] font-medium mb-4 before:content-[''] before:w-3 before:h-px before:bg-accent">
              High-Confidence Research
            </div>
            <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-extrabold tracking-tight mb-4">
              Research Manuscripts
            </h2>
            <p className="text-base text-text-muted max-w-[600px] leading-relaxed">
              Peer-reviewed by the Reasoner. Only manuscripts scoring 7.0+ on the 5-dimension quality gate get published here.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-4 py-1 font-mono text-xs rounded-full border whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === f.value
                    ? "text-accent border-border bg-accent-dim"
                    : "text-text-muted border-border-subtle bg-surface-2 hover:text-text-primary hover:border-[rgba(255,255,255,0.12)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Manuscript grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((m) => (
            <article
              key={m.id}
              className="bg-surface-2 border border-border-subtle rounded-xl p-6 flex flex-col hover:border-border hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] transition-all fade-in-section"
            >
              {/* Top bar: category + confidence */}
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className={`font-mono text-[11px] px-2 py-0.5 rounded-sm font-medium ${CATEGORY_STYLES[m.category] || "bg-surface-3 text-text-muted"}`}>
                  {m.categoryLabel}
                </span>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <div className="w-12 h-1 bg-surface-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${m.confidenceLevel === "high" ? "bg-green" : "bg-accent"}`}
                      style={{ width: `${m.confidence * 10}%` }}
                    />
                  </div>
                  <span className={m.confidenceLevel === "high" ? "text-green font-medium" : "text-accent font-medium"}>
                    {m.confidence}
                  </span>
                </div>
              </div>

              {/* Title + abstract */}
              <h3 className="font-display text-lg font-bold leading-tight mb-3">{m.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed flex-grow mb-4 line-clamp-4">{m.abstract}</p>

              {/* Footer: pipeline + read button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border-subtle">
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-text-faint">
                  <div className="flex items-center gap-[3px]">
                    {Array.from({ length: m.totalSteps }, (_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-[3px] rounded-sm ${i < m.stepsComplete ? "bg-green" : "bg-surface-3"}`}
                      />
                    ))}
                  </div>
                  <span>{m.stepsComplete}/{m.totalSteps} Complete</span>
                  <span>&middot;</span>
                  <span>{m.date}</span>
                </div>
                <button className="font-mono text-xs text-accent flex items-center gap-1 hover:text-[#fb923c] transition-colors cursor-pointer">
                  Read manuscript
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Pipeline legend */}
        <div className="flex flex-wrap gap-6 mt-8 p-4 px-5 bg-surface-2 rounded-lg border border-border-subtle fade-in-section">
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-green" />
            High confidence (8.0+)
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-accent" />
            Confident (7.0–7.9)
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-[#fbbf24]" />
            Emerging (&lt; 7.0 — not published)
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-text-faint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
            7-step pipeline: Problem → Lit Review → Hypothesis → Design → Collection → Analysis → Interpretation
          </div>
        </div>
      </div>
    </section>
  );
}
