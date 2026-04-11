"use client";

import { ActivityItem } from "@/lib/types";
import { formatTimeAgo } from "@/lib/api";

interface LiveFeedProps {
  items: ActivityItem[];
}

const TYPE_COLORS: Record<string, string> = {
  research: "#f97316",
  podcast: "#a78bfa",
  knowledge: "#34d399",
  exploration: "#60a5fa",
  goal: "#fbbf24",
  publication: "#f472b6",
};

export default function LiveFeed({ items }: LiveFeedProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary">
            Live Feed
          </h2>
          <p className="text-text-muted text-xs mt-1">
            Recent activity stream
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
          <span className="text-[10px] font-mono text-text-faint">LIVE</span>
        </div>
      </div>

      {/* Compact ticker-style feed */}
      <div className="border border-border/50 rounded-lg bg-surface overflow-hidden divide-y divide-border/30">
        {items.slice(0, 8).map((item) => {
          const dotColor = TYPE_COLORS[item.type] || "#8a8a8a";

          return (
            <div
              key={item.id}
              className="flex items-start gap-3 px-4 py-3 hover:bg-surface-2 transition-colors"
            >
              {/* Type indicator */}
              <div className="flex-shrink-0 mt-1">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: dotColor }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-text-primary leading-snug truncate">
                  {item.title}
                </p>
                {item.detail && (
                  <p className="text-[10px] text-text-muted mt-0.5 truncate">
                    {item.detail}
                  </p>
                )}
              </div>

              {/* Timestamp */}
              <span className="flex-shrink-0 text-[10px] font-mono text-text-faint">
                {formatTimeAgo(item.timestamp)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
