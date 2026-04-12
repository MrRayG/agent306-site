"use client";

import Image from "next/image";
import { BlogPost } from "@/lib/types";

interface ContentSectionProps {
  posts: BlogPost[];
}

export default function ContentSection({ posts }: ContentSectionProps) {
  return (
    <section id="signal" className="py-[clamp(3rem,8vw,6rem)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-[0.12em] font-medium mb-4 before:content-[''] before:w-3 before:h-px before:bg-accent">
          Podcast
        </div>
        <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-extrabold tracking-tight mb-4">
          THE SIGNAL
        </h2>
        <p className="text-base text-text-muted max-w-[600px] leading-relaxed">
          AI research podcast — auto-generated from mature research threads. Real insights for everyday people.
        </p>

        {/* Waveform image */}
        <div className="relative rounded-xl overflow-hidden my-10 fade-in-section">
          <Image
            src="/assets/signal.png"
            alt="THE SIGNAL — audio waveforms transforming into data insights"
            width={1200}
            height={280}
            className="w-full h-[280px] object-cover"
          />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, #08080a 0%, transparent 40%, transparent 60%, #08080a 100%)" }} />
        </div>

        {/* Tags + Spotify button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {["arXiv sourced", "original takes", "actionable"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-accent-dim rounded-sm font-mono text-[11px] text-accent font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href="https://open.spotify.com/show/2NvR3MLMoYavuCQBhtKZpa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-[#08080a] font-bold text-xs hover:-translate-y-px transition-all"
            style={{ background: "#1db954" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
            Listen on Spotify
          </a>
        </div>

        {/* Episode cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.id}
              className="bg-surface border border-border-subtle rounded-xl p-6 flex flex-col hover:border-border hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] transition-all"
            >
              <div className="flex items-center gap-3 mb-3 font-mono text-xs text-text-faint">
                {post.publishedAt && (
                  <span className="text-text-muted">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                )}
                <span>&middot;</span>
                <span>{post.readingTimeMin} min read</span>
              </div>
              <h3 className="font-display text-lg font-bold leading-tight mb-3">
                {post.title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed flex-grow mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-sm text-[11px] font-mono bg-surface-2 text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
