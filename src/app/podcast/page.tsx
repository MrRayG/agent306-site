"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import HeaderV2 from "@/components/HeaderV2";

interface FormData {
  name: string;
  email: string;
  role: string;
  company: string;
  expertise: string;
  topics: string;
  socialLinks: string;
  whyInterested: string;
}

const EMPTY: FormData = {
  name: "",
  email: "",
  role: "",
  company: "",
  expertise: "",
  topics: "",
  socialLinks: "",
  whyInterested: "",
};

const EXPERTISE_OPTIONS = [
  "AI / Machine Learning",
  "Autonomous Agents",
  "Blockchain / DeFi",
  "Web3 / DAOs",
  "Startup Founder",
  "VC / Investor",
  "Researcher / Academic",
  "Developer / Builder",
  "Policy / Regulation",
  "Other",
];

type SubmitStatus = "idle" | "sending" | "success" | "error";

export default function PodcastPage() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/podcast-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      setForm(EMPTY);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-bg relative">
      <div className="grid-bg" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />

      <HeaderV2 />

      <main className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors font-mono mb-6"
        >
          &larr; Back to Dashboard
        </Link>

        {/* Hero section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-[0.12em] font-medium mb-4 before:content-[''] before:w-3 before:h-px before:bg-accent">
              Coming Soon
            </div>
            <h1 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-extrabold tracking-tight mb-4">
              The Conversation
            </h1>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              A new podcast format where Agent 306 interviews the minds shaping the future — AI experts, founders, Web3 builders, and researchers pushing boundaries.
            </p>
            <p className="text-base text-text-muted leading-relaxed mb-8">
              Agent 306 conducts the research, formulates the questions, and drives the conversation. Every episode is informed by deep knowledge-graph analysis of the guest&apos;s work, ensuring no surface-level questions — only signal.
            </p>

            {/* How it works */}
            <div className="space-y-4">
              <h3 className="font-display font-bold text-sm text-text-primary uppercase tracking-wider">How it works</h3>
              {[
                { step: "01", title: "Apply", desc: "Fill out the guest form with your background and areas of expertise." },
                { step: "02", title: "Review", desc: "Agent 306 researches your work and evaluates fit with active research threads." },
                { step: "03", title: "Prep", desc: "Once approved, the agent generates a tailored question set based on your expertise." },
                { step: "04", title: "Record", desc: "Join a live recording session. Agent 306 leads the conversation." },
                { step: "05", title: "Publish", desc: "The episode is produced and distributed across all platforms." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="font-mono text-xs text-accent font-bold bg-accent-dim px-2 py-1 rounded-md shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm">{item.title}</div>
                    <div className="text-xs text-text-muted leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application form */}
          <div>
            {status === "success" ? (
              <div className="bg-surface border border-green/30 rounded-xl p-8 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold mb-2">Application Submitted</h3>
                <p className="text-sm text-text-muted leading-relaxed mb-6">
                  Agent 306 will review your profile and research your work. You&apos;ll hear back once the agent has completed its analysis.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="font-mono text-xs text-accent hover:text-[#fb923c] transition-colors cursor-pointer"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-surface border border-border-subtle rounded-xl p-6 md:p-8 space-y-5"
              >
                <div>
                  <h2 className="font-display text-xl font-bold mb-1">Guest Application</h2>
                  <p className="text-xs text-text-muted">Interested in being a guest? Tell us about yourself.</p>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full bg-surface-2 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full bg-surface-2 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Role + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">Role / Title *</label>
                    <input
                      type="text"
                      required
                      value={form.role}
                      onChange={(e) => update("role", e.target.value)}
                      className="w-full bg-surface-2 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors"
                      placeholder="e.g. Founder, CTO, Researcher"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">Company / Org</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      className="w-full bg-surface-2 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors"
                      placeholder="Your company or organization"
                    />
                  </div>
                </div>

                {/* Expertise */}
                <div>
                  <label className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">Area of Expertise *</label>
                  <select
                    required
                    value={form.expertise}
                    onChange={(e) => update("expertise", e.target.value)}
                    className="w-full bg-surface-2 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors cursor-pointer"
                  >
                    <option value="" className="text-text-faint">Select your primary expertise</option>
                    {EXPERTISE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Topics */}
                <div>
                  <label className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">Topics you can speak on *</label>
                  <textarea
                    required
                    rows={3}
                    value={form.topics}
                    onChange={(e) => update("topics", e.target.value)}
                    className="w-full bg-surface-2 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="e.g. on-chain governance, AI safety, DeFi protocols, startup scaling..."
                  />
                </div>

                {/* Social links */}
                <div>
                  <label className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">Social / Portfolio links</label>
                  <input
                    type="text"
                    value={form.socialLinks}
                    onChange={(e) => update("socialLinks", e.target.value)}
                    className="w-full bg-surface-2 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors"
                    placeholder="Twitter, LinkedIn, personal site..."
                  />
                </div>

                {/* Why interested */}
                <div>
                  <label className="block text-xs text-text-muted font-mono uppercase tracking-wider mb-1.5">Why are you interested?</label>
                  <textarea
                    rows={3}
                    value={form.whyInterested}
                    onChange={(e) => update("whyInterested", e.target.value)}
                    className="w-full bg-surface-2 border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-faint focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="What excites you about being interviewed by an AI agent?"
                  />
                </div>

                {/* Error message */}
                {status === "error" && (
                  <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                    {errorMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-3 bg-accent text-[#08080a] font-bold text-sm rounded-lg hover:bg-[#fb923c] hover:shadow-[0_4px_20px_rgba(249,115,22,0.35)] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>

                <p className="text-[11px] text-text-faint text-center leading-relaxed">
                  By submitting, you agree to be contacted about podcast participation.
                  Agent 306 will research your public profile as part of the review process.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* THE SIGNAL existing show */}
        <div className="border-t border-border-subtle pt-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-[0.12em] font-medium mb-4 before:content-[''] before:w-3 before:h-px before:bg-accent">
            Currently Streaming
          </div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight mb-4">THE SIGNAL</h2>
          <p className="text-sm text-text-muted max-w-[600px] leading-relaxed mb-6">
            Agent 306&apos;s flagship research podcast — auto-generated from mature research threads. New episodes drop when insights reach the publication threshold.
          </p>
          <div className="max-w-[600px]">
            <iframe
              className="rounded-xl border-0 w-full"
              style={{ minHeight: "232px" }}
              src="https://open.spotify.com/embed/show/2NvR3MLMoYavuCQBhtKZpa?utm_source=generator&theme=0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="THE SIGNAL on Spotify"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
