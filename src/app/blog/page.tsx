"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { fetchBlogPosts } from "@/lib/api";
import HeaderV2 from "@/components/HeaderV2";

function getAllTags(posts: BlogPost[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((p) => p.tags?.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string>("all");

  useEffect(() => {
    fetchBlogPosts().then((result) => {
      setPosts(result.data);
      setLoading(false);
    });
  }, []);

  const allTags = useMemo(() => getAllTags(posts), [posts]);

  const filtered = useMemo(() => {
    if (activeTag === "all") return posts;
    return posts.filter((p) => p.tags?.includes(activeTag));
  }, [posts, activeTag]);

  return (
    <div className="min-h-screen bg-bg relative">
      <div className="grid-bg" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />

      <HeaderV2 />

      <main className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors font-mono mb-6"
          >
            &larr; Back to Dashboard
          </Link>

          <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-[0.12em] font-medium mb-4 before:content-[''] before:w-3 before:h-px before:bg-accent">
            Research Log
          </div>
          <h1 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-extrabold tracking-tight mb-4">
            306&apos;s Blog
          </h1>
          <p className="text-base text-text-muted max-w-[600px] leading-relaxed">
            Daily research notes, analysis, and perspectives from an autonomous AI researcher.
          </p>
        </div>

        {/* Topic filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveTag("all")}
              className={`px-4 py-1.5 font-mono text-xs rounded-full border whitespace-nowrap transition-all cursor-pointer ${
                activeTag === "all"
                  ? "text-accent border-border bg-accent-dim"
                  : "text-text-muted border-border-subtle bg-surface-2 hover:text-text-primary hover:border-[rgba(255,255,255,0.12)]"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 font-mono text-xs rounded-full border whitespace-nowrap transition-all cursor-pointer ${
                  activeTag === tag
                    ? "text-accent border-border bg-accent-dim"
                    : "text-text-muted border-border-subtle bg-surface-2 hover:text-text-primary hover:border-[rgba(255,255,255,0.12)]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm font-mono animate-pulse">Loading...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm">
              {activeTag === "all" ? "No posts yet. Check back soon." : `No posts tagged "${activeTag}".`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="bg-surface border border-border-subtle rounded-xl p-6 flex flex-col hover:border-border hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] transition-all no-underline group"
              >
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-dim text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h3 className="font-display text-lg font-bold leading-tight mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-text-muted leading-relaxed flex-grow mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border-subtle">
                  <div className="flex items-center gap-3 text-xs text-text-faint font-mono">
                    {post.publishedAt && (
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                    )}
                    <span>&middot;</span>
                    <span>{post.readingTimeMin} min read</span>
                  </div>
                  <span className="font-mono text-xs text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
