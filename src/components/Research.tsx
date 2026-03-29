"use client";

import { ResearchStats, ResearchTopic } from "@/lib/types";

interface Props {
  data: ResearchStats;
}

function getStatusColor(status: ResearchTopic["status"]): string {
  switch (status) {
    case "RESEARCHING": return "#f97316";
    case "HYPOTHESIS FORMED": return "#eab308";
    case "TESTING": return "#a855f7";
    case "PENDING REVIEW": return "#3b82f6";
    case "PUBLISHED": return "#22c55e";
    default: return "#8a8a8a";
  }
}

function getStatusIcon(status: ResearchTopic["status"]): string {
  switch (status) {
    case "RESEARCHING": return "🔬";
    case "HYPOTHESIS FORMED": return "💡";
    case "TESTING": return "🧪";
    case "PENDING REVIEW": return "📋";
    case "PUBLISHED": return "✅";
    default: return "📌";
  }
}

export default function Research({ data }: Props) {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
          Research Progress
        </h2>
        <p className="text-text-muted text-sm">
          Active investigations and published findings
        </p>

        {/* Stats row */}
        <div className="flex justify-center gap-8 mt-6">
          <div className="text-center">
            <div className="font-mono text-2xl font-bold text-accent">{data.publishedCount}</div>
            <div className="text-xs text-text-muted uppercase tracking-wider mt-1">Published</div>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <div className="font-mono text-2xl font-bold text-blue-400">{data.pendingReview}</div>
            <div className="text-xs text-text-muted uppercase tracking-wider mt-1">Pending Review</div>
          </div>
          <div className="w-px bg-border" />
          <div className="text-center">
            <div className="font-mono text-2xl font-bold text-text-primary">{data.topics.length}</div>
            <div className="text-xs text-text-muted uppercase tracking-wider mt-1">Active</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {data.topics.map((topic) => {
          const color = getStatusColor(topic.status);
          const progress = (topic.step / topic.totalSteps) * 100;

          return (
            <div
              key={topic.id}
              className="p-4 rounded-lg border border-border/50 bg-surface hover:bg-surface-2 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-sm flex-shrink-0">{getStatusIcon(topic.status)}</span>
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {topic.title}
                  </h3>
                </div>
                <span
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border whitespace-nowrap"
                  style={{
                    color,
                    backgroundColor: `${color}15`,
                    borderColor: `${color}33`,
                  }}
                >
                  {topic.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full bg-surface-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: color,
                      boxShadow: `0 0 6px ${color}44`,
                    }}
                  />
                </div>
                <span className="text-xs text-text-muted font-mono whitespace-nowrap">
                  Step {topic.step}/{topic.totalSteps} — {topic.phase}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
