"use client";

import { ActivityItem } from "@/lib/types";
import { formatTimeAgo } from "@/lib/api";

interface Props {
  items: ActivityItem[];
}

function getTypeColor(type: ActivityItem["type"]): string {
  switch (type) {
    case "research": return "#f97316";
    case "podcast": return "#a855f7";
    case "knowledge": return "#3b82f6";
    case "exploration": return "#22c55e";
    case "goal": return "#eab308";
    case "publication": return "#ec4899";
    default: return "#8a8a8a";
  }
}

function getTypeLabel(type: ActivityItem["type"]): string {
  switch (type) {
    case "research": return "Research";
    case "podcast": return "Podcast";
    case "knowledge": return "Knowledge";
    case "exploration": return "Signals";
    case "goal": return "Goal";
    case "publication": return "Published";
    default: return "Activity";
  }
}

export default function ActivityFeed({ items }: Props) {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
          Live Activity
        </h2>
        <p className="text-text-muted text-sm">
          What Agent #306 has been doing in the last 24 hours
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />

        <div className="space-y-1">
          {items.map((item, idx) => {
            const color = getTypeColor(item.type);
            return (
              <div
                key={item.id}
                className="relative pl-10 py-3 group hover:bg-surface/50 rounded-lg transition-colors"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-3 top-5 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: color,
                    backgroundColor: idx === 0 ? color : "transparent",
                    boxShadow: idx === 0 ? `0 0 8px ${color}44` : "none",
                  }}
                />

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base">{item.icon}</span>
                      <span
                        className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded"
                        style={{
                          color,
                          backgroundColor: `${color}15`,
                        }}
                      >
                        {getTypeLabel(item.type)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-text-primary leading-snug">
                      {item.title}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                  <span className="text-xs text-text-faint font-mono whitespace-nowrap pt-1">
                    {formatTimeAgo(item.timestamp)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
