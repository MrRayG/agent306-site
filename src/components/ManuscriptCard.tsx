import Link from "next/link";
import { Manuscript } from "@/lib/types";

export default function ManuscriptCard({ m }: { m: Manuscript }) {
  return (
    <Link
      href={`/research/${m.id}`}
      className="bg-surface-2 border border-border-subtle rounded-xl p-6 flex flex-col hover:border-border hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] transition-all no-underline group"
    >
      {/* Top bar: manuscript type */}
      {m.manuscriptType && (
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-[11px] px-2 py-0.5 rounded-sm font-medium bg-accent-dim text-accent">
            {m.manuscriptType}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="font-display text-lg font-bold leading-tight mb-3 group-hover:text-accent transition-colors">
        {m.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-text-muted leading-relaxed flex-grow mb-4 line-clamp-4">
        {m.excerpt}
      </p>

      {/* Footer: date + read */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border-subtle">
        <span className="font-mono text-xs text-text-faint">
          {new Date(m.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
        <span className="font-mono text-xs text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          Read manuscript
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
