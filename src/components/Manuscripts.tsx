"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Manuscript } from "@/lib/types";
import { fetchManuscripts } from "@/lib/api";
import ManuscriptCard from "./ManuscriptCard";

export default function Manuscripts() {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchManuscripts(6).then((result) => {
      setManuscripts(result.data);
      setLoading(false);
    });
  }, []);

  return (
    <section id="manuscripts" className="py-[clamp(3rem,8vw,6rem)] bg-surface border-t border-b border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
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
          <Link
            href="/research"
            className="font-mono text-xs text-accent flex items-center gap-1 hover:text-[#fb923c] transition-colors"
          >
            View all
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Manuscript grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface-2 border border-border-subtle rounded-xl p-6 h-[220px] animate-pulse"
              />
            ))}
          </div>
        ) : manuscripts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm">No manuscripts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {manuscripts.map((m) => (
              <ManuscriptCard key={m.id} m={m} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
