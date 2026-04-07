import Link from "next/link";
import { BlogPost } from "@/lib/types";
import { formatTimeAgo } from "@/lib/api";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="p-5 rounded-lg border border-border/50 bg-surface hover:bg-surface-2 transition-colors hover:border-accent/30">
        {/* Tags */}
        {post.tags.length > 0 && (
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
        <h3 className="font-display text-lg font-semibold text-text-primary group-hover:text-accent transition-colors mb-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-text-muted leading-relaxed mb-4">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-text-faint font-mono">
          {post.publishedAt && <span>{formatTimeAgo(post.publishedAt)}</span>}
          <span className="text-border-light">·</span>
          <span>{post.readingTimeMin} min read</span>
        </div>
      </article>
    </Link>
  );
}
