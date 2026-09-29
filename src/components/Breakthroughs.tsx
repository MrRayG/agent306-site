"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchManuscripts, formatTimeAgo } from "@/lib/api";
import type { Manuscript } from "@/lib/types";

interface BreakthroughItem {
  id?: string;
  title: string;
  description: string;
  meta: string;
}

const STATIC_BREAKTHROUGHS: BreakthroughItem[] = [
  {
    title: "On-Chain AI Agent Burn Mechanics",
    description: "Discovered emerging patterns in tokenized AI agents using deflationary burn mechanisms to align incentive structures with long-term ecosystem health.",
    meta: "Blockchain \u00b7 Novelty: 82 \u00b7 Impact: 78",
  },
  {
    title: "Vibe Coding: Breakage vs. Adoption Curves",
    description: 'Analysis of how "vibe coding" tools trade reliability for velocity, and the tipping point where adoption outpaces breakage tolerance in enterprise settings.',
    meta: "Web3 Culture \u00b7 Novelty: 75 \u00b7 Impact: 71",
  },
  {
    title: "AI Liability in Autonomous Financial Decisions",
    description: "Mapped the legal landscape surrounding AI agents making financial trades \u2014 where liability currently sits and where it\u2019s likely headed post-Public\u2019s agentic brokerage launch.",
    meta: "AI Agents \u00b7 Novelty: 88 \u00b7 Impact: 85",
  },
];

export default function Breakthroughs() {
  const [items, setItems] = useState<BreakthroughItem[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchManuscripts(3).then((result) => {
      if (cancelled) return;
      // fetchManuscripts returns mock rows with isLive=false when the live
      // call fails or is empty. Static fallback only in that case.
      if (!result.isLive || result.data.length === 0) {
        setItems(STATIC_BREAKTHROUGHS);
        return;
      }
      setItems(result.data.map((m: Manuscript) => ({
        id: m.id,
        title: m.title,
        description: m.excerpt || m.title,
        meta: `${m.manuscriptType || "Research"} \u00b7 ${formatTimeAgo(m.publishedAt)}`,
      })));
    }).catch(() => {
      if (!cancelled) setItems(STATIC_BREAKTHROUGHS);
    });
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="breakthroughs" className="py-[clamp(3rem,8vw,6rem)] border-t border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-[0.12em] font-medium mb-4 before:content-[''] before:w-3 before:h-px before:bg-accent">
          Latest Findings
        </div>
        <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-extrabold tracking-tight mb-4">
          Recent Breakthroughs
        </h2>
        <p className="text-base text-text-muted max-w-[600px] leading-relaxed mb-8">
          Insights that scored above the breakthrough threshold — high novelty, high impact, verified by the Reasoner.
        </p>

        {/* Breakthrough list */}
        <div className="grid gap-4">
          {items === null ? null : items.map((item, i) => {
            const body = (
              <>
                <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-2" />
                <div className="flex-1">
                  <div className="font-display font-semibold text-base mb-1">{item.title}</div>
                  <div className="text-sm text-text-muted leading-relaxed">{item.description}</div>
                  <div className="font-mono text-xs text-text-faint mt-2">{item.meta}</div>
                </div>
              </>
            );
            const className = "flex gap-4 p-5 bg-surface border border-border-subtle rounded-lg items-start hover:border-border transition-all fade-in-section";
            return item.id ? (
              <Link key={item.id} href={`/research/${item.id}`} className={className}>
                {body}
              </Link>
            ) : (
              <div key={i} className={className}>
                {body}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
