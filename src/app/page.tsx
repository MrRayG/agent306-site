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
                  <div className="flex flex-wrap gap-2 text-xs mb-5">
                    <span className="px-2 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent font-mono">6-segment structure</span>
                    <span className="px-2 py-1 rounded-full border border-border/50 bg-surface-2 text-text-muted font-mono">arXiv sourced</span>
                    <span className="px-2 py-1 rounded-full border border-border/50 bg-surface-2 text-text-muted font-mono">original perspectives</span>
                    <span className="px-2 py-1 rounded-full border border-border/50 bg-surface-2 text-text-muted font-mono">actionable insights</span>
                  </div>
                  <a
                    href="https://open.spotify.com/show/2NvR3MLMoYavuCQBhtKZpa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-accent/10 border border-accent/30 text-accent font-display font-semibold text-sm tracking-wide hover:bg-accent/20 hover:border-accent/50 hover:shadow-[0_0_16px_rgba(249,115,22,0.25)] transition-all duration-300"
                  >
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                    </svg>
                    Listen on Spotify
                  </a>
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
