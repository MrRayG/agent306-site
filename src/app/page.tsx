"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import HeaderV2 from "@/components/HeaderV2";
import HeroV2 from "@/components/HeroV2";
import TriadPipeline from "@/components/TriadPipeline";
import KnowledgePulse from "@/components/KnowledgePulse";
import ContentSection from "@/components/ContentSection";
import Manuscripts from "@/components/Manuscripts";
import LiveFeeds from "@/components/LiveFeeds";
import Breakthroughs from "@/components/Breakthroughs";
import DistributionV2 from "@/components/DistributionV2";
import {
  fetchAllDashboardData,
  fetchBlogPosts,
  getInitialData,
} from "@/lib/api";
import type {
  AgentState,
  ActivityItem,
  ResearchStats,
  CognitiveState as CognitiveStateType,
  BlogPost,
} from "@/lib/types";
import type { DevGoal } from "@/lib/types";

const initial = getInitialData();

export default function Home() {
  const [agentState, setAgentState] = useState<AgentState>(initial.agentState);
  const [, setActivityFeed] = useState<ActivityItem[]>(initial.activityFeed);
  const [, setGoals] = useState<DevGoal[]>(initial.goals);
  const [research, setResearch] = useState<ResearchStats>(initial.research);
  const [cognitiveState, setCognitiveState] = useState<CognitiveStateType>(initial.cognitiveState);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const hasLive = useRef({
    agentState: false,
    activityFeed: false,
    goals: false,
    research: false,
    cognitiveState: false,
  });

  const loadData = useCallback(async () => {
    const result = await fetchAllDashboardData();

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
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  // Load blog posts
  useEffect(() => {
    fetchBlogPosts(3).then((res) => setBlogPosts(res.data));
  }, []);

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
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    document.querySelectorAll(".fade-in-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg relative">
      {/* Subtle grid background */}
      <div className="grid-bg" aria-hidden="true" />

      {/* Ambient glow */}
      <div className="ambient-glow" aria-hidden="true" />

      <HeaderV2 />

      <main className="relative z-10">
        {/* Hero */}
        <HeroV2 evolutionDay={cognitiveState.cognition.evolutionDay} />

        {/* Triad Pipeline */}
        <div className="fade-in-section">
          <TriadPipeline
            agentState={agentState}
            research={research}
            cognitiveState={cognitiveState}
          />
        </div>

        {/* Knowledge Pulse */}
        <div className="fade-in-section">
          <KnowledgePulse data={cognitiveState} />
        </div>

        {/* THE SIGNAL podcast */}
        <div className="fade-in-section">
          <ContentSection posts={blogPosts} />
        </div>

        {/* Research Manuscripts */}
        <div className="fade-in-section">
          <Manuscripts />
        </div>

        {/* Live Feeds */}
        <div className="fade-in-section">
          <LiveFeeds />
        </div>

        {/* Recent Breakthroughs */}
        <div className="fade-in-section">
          <Breakthroughs research={research} />
        </div>
      </main>

      {/* Footer */}
      <DistributionV2 />
    </div>
  );
}
