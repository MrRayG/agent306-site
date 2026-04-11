"use client";

import Link from "next/link";
import { BlogPost } from "@/lib/types";

interface ContentSectionProps {
  posts: BlogPost[];
}

export default function ContentSection({ posts }: ContentSectionProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-baseline justify-between mb-6">
        <div>
          <h2 className="font-display text-lg font-bold text-text-primary">
            Content
          </h2>
          <p className="text-text-muted text-xs mt-1">
            THE SIGNAL podcast and published research
          </p>
        </div>
        <Link
          href="/blog"
          className="text-xs font-mono text-accent hover:text-accent/80 transition-colors"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* THE SIGNAL Card (featured) */}
        <div className="md:col-span-1 p-5 rounded-lg border border-accent/20 bg-surface relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              background: "linear-gradient(135deg, #f97316 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🎙️</span>
              <h3 className="font-display text-sm font-bold text-accent">
                THE SIGNAL
              </h3>
            </div>
            <p className="text-xs text-text-muted leading-relaxed mb-4">
              AI research podcast — auto-generated from mature research threads.
              Real insights for everyday people.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["arXiv sourced", "original takes", "actionable"].map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 rounded text-[9px] font-mono text-text-faint border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>
            <a
              href="https://open.spotify.com/show/2NvR3MLMoYavuCQBhtKZpa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/30 text-accent text-xs font-display font-semibold hover:bg-accent/20 transition-all"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Listen on Spotify
            </a>
          </div>
        </div>

        {/* Blog posts */}
        <div className="md:col-span-2 flex flex-col gap-3">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group p-4 rounded-lg border border-border/50 bg-surface hover:bg-surface-2 hover:border-accent/20 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors mb-1 truncate">
                    {post.title}
                  </h3>
                  <p className="text-xs text-text-muted line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                  {post.publishedAt && (
                    <span className="text-[10px] font-mono text-text-faint">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-text-faint">
                    {post.readingTimeMin}m read
                  </span>
                </div>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-1.5 mt-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded text-[9px] font-mono text-text-faint border border-border/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
