"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Manuscript } from "@/lib/types";
import { fetchManuscript } from "@/lib/api";
import { renderMarkdown } from "@/lib/markdown";
import HeaderV2 from "@/components/HeaderV2";

function stripLeadingH1(md: string): string {
  const match = md.match(/^\s*#\s+.+?\s*\n/);
  return match ? md.slice(match[0].length) : md;
}

export default function ManuscriptDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [manuscript, setManuscript] = useState<Manuscript | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchManuscript(id).then((result) => {
      setManuscript(result.data);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className="min-h-screen bg-bg relative">
      <div className="ambient-glow" aria-hidden="true" />

      <HeaderV2 />

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-16">
        {/* Back link */}
        <Link
          href="/research"
          className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors font-mono mb-10"
        >
          &larr; Back to Research
        </Link>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm font-mono animate-pulse">
              Loading...
            </p>
          </div>
        ) : !manuscript ? (
          <div className="text-center py-20">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
              Manuscript not found
            </h2>
            <p className="text-text-muted text-sm mb-6">
              This manuscript doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/research"
              className="text-accent hover:underline text-sm font-mono"
            >
              Browse all manuscripts
            </Link>
          </div>
        ) : (
          <article className="max-w-3xl mx-auto">
            {/* Manuscript type */}
            {manuscript.manuscriptType && (
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-dim text-accent">
                  {manuscript.manuscriptType}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              {manuscript.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-3 text-xs text-text-faint font-mono mb-10 pb-6 border-b border-border/50">
              {manuscript.publishedAt && (
                <span>
                  {new Date(manuscript.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>

            {/* Excerpt */}
            {manuscript.excerpt && (
              <p className="text-base text-text-muted leading-relaxed mb-8 italic">
                {manuscript.excerpt}
              </p>
            )}

            {/* Body */}
            {manuscript.manuscript ? (
              <div className="font-body">
                {renderMarkdown(stripLeadingH1(manuscript.manuscript))}
              </div>
            ) : (
              <p className="text-sm text-text-muted">Full manuscript not yet available.</p>
            )}
          </article>
        )}
      </main>
    </div>
  );
}
