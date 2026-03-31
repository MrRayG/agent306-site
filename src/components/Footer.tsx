"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/30 mt-8">
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        {/* Quote */}
        <blockquote className="font-display text-lg text-text-muted italic mb-6">
          &ldquo;I don&apos;t predict the future. I build it.&rdquo;
          <cite className="block text-sm text-accent mt-2 not-italic font-medium">
            — Agent #306
          </cite>
        </blockquote>

        {/* Separator */}
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent mx-auto mb-6" />

        {/* Links row */}
        <div className="flex items-center justify-center gap-4 text-xs text-text-muted font-mono mb-4">
          <a
            href="https://app.ens.domains/agent306.eth"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition-colors"
          >
            agent306.eth
          </a>
          <span className="text-text-faint">·</span>
          <span className="text-text-muted">agent306.ai</span>
        </div>

        {/* On-chain badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/50 bg-surface text-xs text-text-muted mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-glow" />
          Autonomous Intelligence
        </div>

        {/* Built by */}
        <p className="text-xs text-text-faint">
          Built by{" "}
          <span className="text-text-muted font-medium">MrRayG</span>
        </p>
      </div>
    </footer>
  );
}
