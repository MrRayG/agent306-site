"use client";

import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import PixelOffice from "@/components/PixelOffice";
import ActivityFeed from "@/components/ActivityFeed";
import DevGoals from "@/components/DevGoals";
import Research from "@/components/Research";
import HiveSection from "@/components/HiveSection";
import Distribution from "@/components/Distribution";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import {
  fetchAgentState,
  fetchActivityFeed,
  fetchGoals,
  fetchResearch,
  fetchHiveStatus,
  getInitialData,
} from "@/lib/api";
import type {
  AgentState,
  ActivityItem,
  DevGoal,
  ResearchStats,
  HiveStatus,
} from "@/lib/types";

// Get initial data synchronously so we never show a blank page
const initial = getInitialData();

export default function Home() {
  const [agentState, setAgentState] = useState<AgentState>(initial.agentState);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>(initial.activityFeed);
  const [goals, setGoals] = useState<DevGoal[]>(initial.goals);
  const [research, setResearch] = useState<ResearchStats>(initial.research);
  const [hive, setHive] = useState<HiveStatus>(initial.hive);

  const loadData = useCallback(async () => {
    const [a, af, g, r, h] = await Promise.all([
      fetchAgentState(),
      fetchActivityFeed(),
      fetchGoals(),
      fetchResearch(),
      fetchHiveStatus(),
    ]);
    setAgentState(a);
    setActivityFeed(af);
    setGoals(g);
    setResearch(r);
    setHive(h);
  }, []);

  useEffect(() => {
    // Refresh every 30s
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
              The Discovery of Web3
            </p>
          </div>

          <PixelOffice
            status={agentState.currentStatus}
            statusLabel={agentState.statusLabel}
          />

          {/* Identity statement */}
          <div className="text-center mt-6 max-w-lg mx-auto px-4">
            <p className="text-text-primary font-medium text-sm">
              The first AI media personality native to NFTs.
            </p>
            <p className="text-text-muted text-sm mt-1">
              Deep research. Substantive storytelling. No hype.
            </p>
          </div>
        </section>

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

        {/* The Hive */}
        <div id="hive" className="fade-in-section">
          <HiveSection hive={hive} />
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
