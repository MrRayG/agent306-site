"use client";

import { ResearchStats, ResearchTopic } from "@/lib/types";

interface ResearchThreadsProps {
  data: ResearchStats;
}

type KanbanColumn = "Exploring" | "Active" | "Review" | "Published";

const COLUMN_CONFIG: Record<KanbanColumn, { color: string; statuses: string[] }> = {
  Exploring: {
    color: "#60a5fa",
    statuses: ["RESEARCHING"],
  },
  Active: {
    color: "#a78bfa",
    statuses: ["HYPOTHESIS FORMED", "TESTING"],
  },
  Review: {
    color: "#fbbf24",
    statuses: ["PENDING REVIEW"],
  },
  Published: {
    color: "#34d399",
    statuses: ["PUBLISHED"],
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "AI & Agents": "#f97316",
  Technology: "#60a5fa",
  Blockchain: "#a78bfa",
  Research: "#34d399",
  Economics: "#fbbf24",
  Media: "#f472b6",
  "Web3 Culture": "#c084fc",
};

function getCategoryColor(cat?: string): string {
  if (!cat) return "#8a8a8a";
  return CATEGORY_COLORS[cat] || "#8a8a8a";
}

function ThreadCard({ topic, columnColor }: { topic: ResearchTopic; columnColor: string }) {
  const progress = topic.totalSteps > 0 ? (topic.step / topic.totalSteps) * 100 : 0;
  const catColor = getCategoryColor(topic.category);

  return (
    <div className="p-3 rounded-md border border-border/40 bg-bg hover:bg-surface-2 transition-colors group">
      {/* Category badge */}
      {topic.category && (
        <span
          className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-medium mb-2"
          style={{
            backgroundColor: `${catColor}15`,
            color: catColor,
          }}
        >
          {topic.category}
        </span>
      )}

      {/* Title */}
      <p className="text-xs text-text-primary leading-snug mb-2 line-clamp-2">
        {topic.title}
      </p>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 rounded-full bg-border/30 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
              backgroundColor: columnColor,
            }}
          />
        </div>
        <span className="text-[9px] font-mono text-text-faint">
          {topic.step}/{topic.totalSteps}
        </span>
      </div>

      {/* Phase label */}
      <p className="text-[9px] font-mono text-text-faint mt-1">
        {topic.phase}
      </p>
    </div>
  );
}

export default function ResearchThreads({ data }: ResearchThreadsProps) {
  const columns = Object.entries(COLUMN_CONFIG) as [KanbanColumn, typeof COLUMN_CONFIG[KanbanColumn]][];

  // Bucket topics into columns
  const buckets: Record<KanbanColumn, ResearchTopic[]> = {
    Exploring: [],
    Active: [],
    Review: [],
    Published: [],
  };

  data.topics.forEach((topic) => {
    for (const [col, config] of columns) {
      if (config.statuses.includes(topic.status)) {
        buckets[col].push(topic);
        return;
      }
    }
    // Default to Exploring
    buckets.Exploring.push(topic);
  });

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary">
            Research Threads
          </h2>
          <p className="text-text-muted text-xs mt-1">
            {data.topics.length} active threads across the pipeline
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
          <span>{data.pendingReview} pending</span>
          <span className="text-text-faint">·</span>
          <span>{data.publishedCount} published</span>
        </div>
      </div>

      {/* Kanban grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {columns.map(([col, config]) => {
          const items = buckets[col];

          return (
            <div key={col} className="flex flex-col">
              {/* Column header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/30">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                <span className="text-xs font-display font-semibold text-text-primary">
                  {col}
                </span>
                <span className="text-[10px] font-mono text-text-faint ml-auto">
                  {items.length}
                </span>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-2 min-h-[80px]">
                {items.length === 0 ? (
                  <div className="text-[10px] text-text-faint font-mono text-center py-4">
                    No threads
                  </div>
                ) : (
                  items.slice(0, 4).map((topic) => (
                    <ThreadCard
                      key={topic.id}
                      topic={topic}
                      columnColor={config.color}
                    />
                  ))
                )}
                {items.length > 4 && (
                  <p className="text-[10px] font-mono text-text-faint text-center">
                    +{items.length - 4} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
