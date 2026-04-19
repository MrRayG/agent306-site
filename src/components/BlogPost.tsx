import { BlogPost } from "@/lib/types";
import { renderMarkdown } from "@/lib/markdown";

// ---- Component ----

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const html = renderMarkdown(post.content);

  return (
    <article className="max-w-3xl mx-auto">
      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
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
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-3 text-xs text-text-faint font-mono mb-10 pb-6 border-b border-border/50">
        {post.publishedAt && (
          <span>
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}
        <span className="text-border-light">·</span>
        <span>{post.readingTimeMin} min read</span>
        <span className="text-border-light">·</span>
        <span>{post.wordCount} words</span>
      </div>

      {/* Content */}
      <div
        className="font-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
