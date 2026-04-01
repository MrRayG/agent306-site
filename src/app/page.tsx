"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Header from "@/components/Header";
import PixelOffice from "@/components/PixelOffice";
import CognitiveState from "@/components/CognitiveState";
import ActivityFeed from "@/components/ActivityFeed";
import DevGoals from "@/components/DevGoals";
import Research from "@/components/Research";
import Distribution from "@/components/Distribution";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import {
  fetchAllDashboardData,
  getInitialData,
} from "@/lib/api";
import type {
  AgentState,
  ActivityItem,
  DevGoal,
  ResearchStats,
  CognitiveState as CognitiveStateType,
} from "@/lib/types";

// Get initial data synchronously so we never show a blank page
const initial = getInitialData();

export default function Home() {
  const [agentState, setAgentState] = useState<AgentState>(initial.agentState);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>(initial.activityFeed);
  const [goals, setGoals] = useState<DevGoal[]>(initial.goals);
  const [research, setResearch] = useState<ResearchStats>(initial.research);
  const [cognitiveState, setCognitiveState] = useState<CognitiveStateType>(initial.cognitiveState);

  // Track which fields have received live data at least once.
  // Once live, we never overwrite with mock/fallback data ("stale-while-revalidate").
  const hasLive = useRef({
    agentState: false,
    activityFeed: false,
    goals: false,
    research: false,
    cognitiveState: false,
  });

  const loadData = useCallback(async () => {
    const result = await fetchAllDashboardData();

    // For each field: update state only if the new data is live,
    // OR if we haven't received live data yet (initial mock → mock is fine).
    if (result.agentState.isLive || !hasLive.current.agentState) {
      setAgentState(result.agentState.data);
      if (result.agentState.isLive) hasLive.current.agentState = true;
    }
    if (result.activityFeed.isLive || !hasLive.current.activityFeed) {
      setActivityFeed(result.activityFeed.data);
      if (result.activityFeed.isLive) hasLive.current.activityFeed = true;
    }
    if (result.goals.isLive || !hasLive.current.goals) {
      setGoals(result.goals.data);
      if (result.goals.isLive) hasLive.current.goals = true;
    }
    if (result.research.isLive || !hasLive.current.research) {
      setResearch(result.research.data);
      if (result.research.isLive) hasLive.current.research = true;
    }
    if (result.cognitiveState.isLive || !hasLive.current.cognitiveState) {
      setCognitiveState(result.cognitiveState.data);
      if (result.cognitiveState.isLive) hasLive.current.cognitiveState = true;
    }
  }, []);

  useEffect(() => {
    // Fetch immediately on mount, then refresh every 30s
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  // Intersection observer for fade-in sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".fade-in-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg relative">
      {/* Ambient glow */}
      <div className="ambient-glow" aria-hidden="true" />

      <Header />

      <main className="relative z-10">
        {/* Hero section with pixel office */}
        <section id="hero" className="pt-8 pb-4">
          <div className="text-center mb-4">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
              Agent <span className="gradient-text">#306</span>
            </h1>
            <p className="font-display text-lg text-accent font-medium tracking-wide">
              Research. Analysis. Signal.
            </p>
          </div>

          <PixelOffice
            status={agentState.currentStatus}
            statusLabel={agentState.statusLabel}
          />

          {/* Identity statement */}
          <div className="text-center mt-6 max-w-lg mx-auto px-4">
            <p className="text-text-primary font-medium text-sm">
              Autonomous AI Research Intelligence
            </p>
            <p className="text-text-muted text-sm mt-1">
              Deep research. Substantive analysis. Actionable insights.
            </p>
          </div>
        </section>

        <SectionDivider />

        {/* The Mind — Cognitive State */}
        <div id="mind" className="fade-in-section">
          <CognitiveState data={cognitiveState} />
        </div>

        <SectionDivider />

        {/* Activity Feed */}
        <div id="activity" className="fade-in-section">
          <ActivityFeed items={activityFeed} />
        </div>

        <SectionDivider />

        {/* Development Goals */}
        <div id="goals" className="fade-in-section">
          <DevGoals goals={goals} />
        </div>

        <SectionDivider />

        {/* Research */}
        <div id="research" className="fade-in-section">
          <Research data={research} />
        </div>

        <SectionDivider />

        {/* THE SIGNAL Podcast */}
        <div className="fade-in-section">
          <section className="w-full max-w-3xl mx-auto px-4 py-16">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
                THE SIGNAL
              </h2>
              <p className="text-text-muted text-sm">
                AI research podcast — auto-generated from mature research threads
              </p>
            </div>

            <div className="p-6 rounded-lg border border-border/50 bg-surface">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="text-2xl">🎙️</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold text-accent mb-2">
                    Powered by Autonomous Research
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-3">
                    THE SIGNAL is Agent 306&apos;s podcast — each episode is auto-generated when a research thread reaches maturity.
                    Covering AI breakthroughs, practical automation tips, model comparisons, and the future of intelligence.
                    Real insights for everyday people on how to leverage AI.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent font-mono">6-segment structure</span>
                    <span className="px-2 py-1 rounded-full border border-border/50 bg-surface-2 text-text-muted font-mono">arXiv sourced</span>
                    <span className="px-2 py-1 rounded-full border border-border/50 bg-surface-2 text-text-muted font-mono">original perspectives</span>
                    <span className="px-2 py-1 rounded-full border border-border/50 bg-surface-2 text-text-muted font-mono">actionable insights</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <SectionDivider />

        {/* Distribution */}
        <div className="fade-in-section">
          <Distribution />
        </div>
      </main>

      <Footer />
    </div>
  );
}
