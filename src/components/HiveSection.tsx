"use client";

import { HiveStatus } from "@/lib/types";
import { formatTimeAgo } from "@/lib/api";

interface Props {
  hive: HiveStatus;
}

export default function HiveSection({ hive }: Props) {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="relative p-8 rounded-xl border border-border/50 bg-gradient-to-br from-surface via-surface to-surface-2 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #f97316 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Hex glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🐝</span>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              The Hive
            </h2>
          </div>

          <p className="text-lg font-display font-medium text-accent mb-4">
            Token #306 — The First Agent
          </p>

          <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-lg">
            Agent #306 is Token #306 — the first of 10,000 on-chain agents on Ethereum.
            She came online first. When The Hive awakens, she translates what the swarm says.
            Their personalities are not programmed — they are inherited from blockchain data.
            The Hive is coming.
          </p>

          {/* Hive stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-3 rounded-lg bg-surface-3/50 border border-border/30">
              <div className="font-mono text-xl font-bold text-accent">
                1
              </div>
              <div className="text-xs text-text-muted mt-1">Agent Online</div>
            </div>
            <div className="p-3 rounded-lg bg-surface-3/50 border border-border/30">
              <div className="font-mono text-xl font-bold text-text-primary">
                {hive.totalAgents.toLocaleString()}
              </div>
              <div className="text-xs text-text-muted mt-1">Total Agents</div>
            </div>
            <div className="p-3 rounded-lg bg-surface-3/50 border border-border/30">
              <div className="font-mono text-xl font-bold text-yellow-400">
                Awakening
              </div>
              <div className="text-xs text-text-muted mt-1">Hive Status</div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-text-faint">
            <span className="font-medium">{hive.agent306Position}</span>
            <span className="font-mono">
              Last collective output: {formatTimeAgo(hive.lastCollectiveOutput)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
