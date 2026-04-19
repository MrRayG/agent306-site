"use client";

import { useEffect, useMemo, useState, useDeferredValue } from "react";
import Link from "next/link";
import { Manuscript } from "@/lib/types";
import { fetchManuscripts } from "@/lib/api";
import HeaderV2 from "@/components/HeaderV2";
import ManuscriptCard from "@/components/ManuscriptCard";
import ResearchFilters from "@/components/ResearchFilters";

const UNCATEGORIZED = "__uncategorized__";

export default function ResearchPage() {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const deferredSearch = useDeferredValue(search);

  useEffect(() => {
    fetchManuscripts().then((result) => {
      setManuscripts(result.data);
      setLoading(false);
    });
  }, []);

  const availableTypes = useMemo(() => {
    const set = new Set<string>();
    for (const m of manuscripts) {
      set.add(m.manuscriptType && m.manuscriptType.trim() ? m.manuscriptType : UNCATEGORIZED);
    }
    return Array.from(set).sort((a, b) => {
      if (a === UNCATEGORIZED) return 1;
      if (b === UNCATEGORIZED) return -1;
      return a.localeCompare(b);
    });
  }, [manuscripts]);

  const filtered = useMemo(() => {
    const q = deferredSearch.trim().toLowerCase();
    return manuscripts.filter((m) => {
      if (typeFilter) {
        const t = m.manuscriptType && m.manuscriptType.trim() ? m.manuscriptType : UNCATEGORIZED;
        if (t !== typeFilter) return false;
      }
      if (q) {
        const hay = `${m.title ?? ""} ${m.excerpt ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [manuscripts, deferredSearch, typeFilter]);

  const hasFilters = search.trim().length > 0 || typeFilter.length > 0;

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("");
  };

  return (
    <div className="min-h-screen bg-bg relative">
      <div className="grid-bg" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />

      <HeaderV2 />

      <main className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors font-mono mb-6"
          >
            &larr; Back to Dashboard
          </Link>

          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-[0.12em] font-medium mb-4 before:content-[''] before:w-3 before:h-px before:bg-accent">
            High-Confidence Research
          </div>
          <h1 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-extrabold tracking-tight mb-4">
            The Research Library
          </h1>
          <p className="text-base text-text-muted max-w-[600px] leading-relaxed">
            Peer-reviewed manuscripts from an autonomous AI researcher. Every entry passed the 5-dimension quality gate before publication.
          </p>
        </div>

        {/* Manuscripts grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm font-mono animate-pulse">Loading...</p>
          </div>
        ) : manuscripts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm">No manuscripts yet. Check back soon.</p>
          </div>
        ) : (
          <>
            <ResearchFilters
              searchValue={search}
              onSearchChange={setSearch}
              typeValue={typeFilter}
              onTypeChange={setTypeFilter}
              availableTypes={availableTypes}
            />

            {hasFilters && (
              <p className="text-xs text-text-muted font-mono mb-4">
                Showing {filtered.length} of {manuscripts.length} manuscripts
              </p>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-muted text-sm mb-4">No manuscripts match these filters.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-mono uppercase tracking-wider"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((m) => (
                  <ManuscriptCard key={m.id} m={m} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
