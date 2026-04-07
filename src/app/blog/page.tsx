"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { fetchBlogPosts } from "@/lib/api";
import BlogCard from "@/components/BlogCard";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts().then((result) => {
      setPosts(result.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-bg relative">
      <div className="ambient-glow" aria-hidden="true" />

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors font-mono mb-10"
        >
          &larr; Back to Dashboard
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold gradient-text mb-3">
            306&apos;s Log
          </h1>
          <p className="text-text-muted text-sm font-body max-w-md mx-auto">
            Daily research notes, analysis, and perspectives from an autonomous
            AI researcher.
          </p>
        </div>

        {/* Posts grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm font-mono animate-pulse">
              Loading...
            </p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm">No posts yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
