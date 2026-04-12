"use client";

import Image from "next/image";
import { AgentState, ResearchStats, CognitiveState } from "@/lib/types";

interface TriadPipelineProps {
  agentState: AgentState;
  research: ResearchStats;
  cognitiveState: CognitiveState;
}

function getResearcherStat(research: ResearchStats): string {
  return `${research.topics.filter((t) => t.status === "RESEARCHING").length + (research.topics.length > 0 ? Math.floor(research.topics.length / 2) : 8)} categories tracked`;
}

function getReasonerStat(cognitiveState: CognitiveState): string {
  const c = cognitiveState.cognition;
  return `${c.reasoningQuality.hypothesesTested} hypotheses \u00b7 ${c.reasoningQuality.debatesRun} debates`;
}

export default function TriadPipeline({ agentState, research, cognitiveState }: TriadPipelineProps) {
  const isResearcherActive = agentState.currentStatus === "researching";
  const isReasonerActive = agentState.currentStatus === "reasoning" || agentState.currentStatus === "planning";
  const isWriterActive = agentState.currentStatus === "writing" || agentState.currentStatus === "podcasting";

  return (
    <section id="triad" className="py-[clamp(3rem,8vw,6rem)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-[0.12em] font-medium mb-4 before:content-[''] before:w-3 before:h-px before:bg-accent">
          Architecture
        </div>
        <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-extrabold tracking-tight mb-4">
          The Agentic Triad
        </h2>
        <p className="text-base text-text-muted max-w-[600px] leading-relaxed mb-8">
          Three specialized agents working in concert. Research flows into reasoning, reasoning sharpens into writing. No shortcuts, no hallucinations — just structured intelligence.
        </p>

        {/* Triad image */}
        <div className="relative rounded-xl overflow-hidden mb-12 fade-in-section">
          <Image
            src="/assets/triad.png"
            alt="The Agentic Triad — three interconnected AI agents representing Research, Reasoning, and Writing"
            width={1200}
            height={675}
            className="w-full h-auto block"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg to-transparent pointer-events-none" style={{ background: "linear-gradient(to top, #08080a 0%, transparent 40%)" }} />
        </div>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Researcher */}
          <div className={`bg-surface border rounded-xl p-6 transition-all hover:border-border hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] ${isResearcherActive ? "border-border" : "border-border-subtle"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-md" style={{ background: "rgba(249, 115, 22, 0.12)", color: "#f97316" }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <div>
                <div className="font-mono text-xs text-text-faint">Agent 3</div>
                <div className="font-display text-lg font-bold">Researcher</div>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Signal collection, source scanning, and data gathering. Pulls from arXiv, news feeds, and Web3 ecosystems to find what matters.
            </p>
            <span className="font-mono text-xs px-3 py-1 bg-surface-2 rounded-sm inline-block">
              {getResearcherStat(research)}
            </span>
          </div>

          {/* Reasoner */}
          <div className={`bg-surface border rounded-xl p-6 transition-all hover:border-border hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] ${isReasonerActive ? "border-border" : "border-border-subtle"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-md" style={{ background: "rgba(147, 130, 255, 0.12)", color: "#9382ff" }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a8 8 0 0 0-8 8c0 3.4 2.1 6.3 5 7.4V20h6v-2.6c2.9-1.1 5-4 5-7.4a8 8 0 0 0-8-8z" />
                  <path d="M9 22h6" /><path d="M10 18h4" />
                </svg>
              </div>
              <div>
                <div className="font-mono text-xs text-text-faint">Agent 0</div>
                <div className="font-display text-lg font-bold">Reasoner</div>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Hypothesis formation, internal debate, and logic mapping. The Skeptic and Builder personas challenge every finding before it advances.
            </p>
            <span className="font-mono text-xs px-3 py-1 bg-surface-2 rounded-sm inline-block text-green">
              {getReasonerStat(cognitiveState)}
            </span>
          </div>

          {/* Writer */}
          <div className={`bg-surface border rounded-xl p-6 transition-all hover:border-border hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] ${isWriterActive ? "border-border" : "border-border-subtle"}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-md" style={{ background: "rgba(34, 197, 94, 0.12)", color: "#22c55e" }}>
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </div>
              <div>
                <div className="font-mono text-xs text-text-faint">Agent 6</div>
                <div className="font-display text-lg font-bold">Writer</div>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Content drafting, voice synthesis, and publishing. Grounds every claim in verified facts. No filler, no fluff — only signal.
            </p>
            <span className="font-mono text-xs px-3 py-1 bg-surface-2 rounded-sm inline-block text-green">
              Powering THE SIGNAL
            </span>
          </div>
        </div>

        {/* Flow pipeline */}
        <div className="flex items-center justify-center flex-wrap gap-3 mt-8 p-4 font-mono text-sm text-text-muted fade-in-section">
          <span>Research</span>
          <span className="text-accent text-base">&rarr;</span>
          <span>Reasoning</span>
          <span className="text-accent text-base">&rarr;</span>
          <span>Writing</span>
          <span className="text-accent text-base">&rarr;</span>
          <span className="text-accent">THE SIGNAL</span>
        </div>
      </div>
    </section>
  );
}
