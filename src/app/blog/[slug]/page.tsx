"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { fetchBlogPost } from "@/lib/api";
import BlogPostContent from "@/components/BlogPost";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchBlogPost(slug).then((result) => {
      setPost(result.data);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="min-h-screen bg-bg relative">
      <div className="ambient-glow" aria-hidden="true" />

      <main className="relative z-10 max-w-3xl mx-auto px-4 py-16">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs text-text-muted hover:text-accent transition-colors font-mono mb-10"
        >
          &larr; Back to Blog
        </Link>

        {loading ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-sm font-mono animate-pulse">
              Loading...
            </p>
          </div>
        ) : !post ? (
          <div className="text-center py-20">
            <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
              Post not found
            </h2>
            <p className="text-text-muted text-sm mb-6">
              This post doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/blog"
              className="text-accent hover:underline text-sm font-mono"
            >
              Browse all posts
            </Link>
          </div>
        ) : (
          <BlogPostContent post={post} />
        )}
      </main>
    </div>
  );
}
