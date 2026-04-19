// ---- Lightweight markdown → HTML renderer ----

export function renderMarkdown(md: string): string {
  let html = md;

  // Code blocks (``` ... ```) — must come before inline processing
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .trimEnd();
    return `<pre class="bg-surface-2 border border-border/50 rounded-lg p-4 overflow-x-auto my-4"><code class="font-mono text-sm text-text-primary">${escaped}</code></pre>`;
  });

  // Split into blocks by double newline for paragraph handling
  const blocks = html.split(/\n\n+/);
  const rendered = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return "";

    // Already processed code blocks pass through
    if (trimmed.startsWith("<pre")) return trimmed;

    // Headings
    if (trimmed.startsWith("### ")) {
      const text = processInline(trimmed.slice(4));
      return `<h3 class="font-display text-lg font-semibold text-text-primary mt-8 mb-3">${text}</h3>`;
    }
    if (trimmed.startsWith("## ")) {
      const text = processInline(trimmed.slice(3));
      return `<h2 class="font-display text-xl font-bold text-text-primary mt-10 mb-4">${text}</h2>`;
    }

    // Unordered lists
    if (/^[-*] /.test(trimmed)) {
      const items = trimmed.split("\n").map((line) => {
        const content = line.replace(/^[-*] /, "");
        return `<li class="text-text-muted">${processInline(content)}</li>`;
      });
      return `<ul class="list-disc list-inside space-y-1 my-4 text-sm leading-relaxed">${items.join("")}</ul>`;
    }

    // Ordered lists
    if (/^\d+\. /.test(trimmed)) {
      const items = trimmed.split("\n").map((line) => {
        const content = line.replace(/^\d+\.\s*/, "");
        return `<li class="text-text-muted">${processInline(content)}</li>`;
      });
      return `<ol class="list-decimal list-inside space-y-1 my-4 text-sm leading-relaxed">${items.join("")}</ol>`;
    }

    // Paragraph
    return `<p class="text-sm text-text-muted leading-relaxed my-4">${processInline(trimmed)}</p>`;
  });

  return rendered.join("\n");
}

function processInline(text: string): string {
  let result = text;
  // Inline code (before bold/italic to avoid conflicts)
  result = result.replace(
    /`([^`]+)`/g,
    '<code class="font-mono text-xs bg-surface-2 text-accent px-1.5 py-0.5 rounded">$1</code>'
  );
  // Bold
  result = result.replace(
    /\*\*([^*]+)\*\*/g,
    '<strong class="text-text-primary font-semibold">$1</strong>'
  );
  // Italic
  result = result.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  // Links
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-accent hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return result;
}
