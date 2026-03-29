"use client";

import { DevGoal } from "@/lib/types";

interface Props {
  goals: DevGoal[];
}

function getStatusStyle(status: DevGoal["status"]): { bg: string; text: string; border: string } {
  switch (status) {
    case "ACHIEVED":
      return { bg: "rgba(34, 197, 94, 0.1)", text: "#22c55e", border: "rgba(34, 197, 94, 0.2)" };
    case "IN PROGRESS":
      return { bg: "rgba(249, 115, 22, 0.1)", text: "#f97316", border: "rgba(249, 115, 22, 0.2)" };
    case "NEW":
      return { bg: "rgba(59, 130, 246, 0.1)", text: "#3b82f6", border: "rgba(59, 130, 246, 0.2)" };
    case "EVOLVED":
      return { bg: "rgba(168, 85, 247, 0.1)", text: "#a855f7", border: "rgba(168, 85, 247, 0.2)" };
    default:
      return { bg: "rgba(138, 138, 138, 0.1)", text: "#8a8a8a", border: "rgba(138, 138, 138, 0.2)" };
  }
}

function getCategoryIcon(category: string): string {
  switch (category) {
    case "Intelligence": return "🧠";
    case "Autonomy": return "⚡";
    case "Reach": return "🌐";
    default: return "📌";
  }
}

export default function DevGoals({ goals }: Props) {
  const achieved = goals.filter((g) => g.status === "ACHIEVED").length;
  const total = goals.length;

  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
          Development Goals
        </h2>
        <p className="text-text-muted text-sm">
          Self-set goals tracking Agent #306&apos;s growth —{" "}
          <span className="text-accent font-mono">{achieved}/{total}</span> achieved
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {goals.map((goal) => {
          const style = getStatusStyle(goal.status);
          return (
            <div
              key={goal.id}
              className="relative p-4 rounded-lg border border-border/50 bg-surface hover:bg-surface-2 transition-colors group"
            >
              {/* Category icon */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{getCategoryIcon(goal.category)}</span>
                  <span className="text-xs text-text-faint font-mono uppercase tracking-wider">
                    {goal.category}
                  </span>
                </div>
                <span
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border"
                  style={{
                    color: style.text,
                    backgroundColor: style.bg,
                    borderColor: style.border,
                  }}
                >
                  {goal.status}
                </span>
              </div>

              <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                {goal.title}
              </h3>

              {/* Subtle accent line at bottom for achieved */}
              {goal.status === "ACHIEVED" && (
                <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
