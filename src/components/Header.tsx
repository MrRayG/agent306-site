"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-bg/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          {/* Inline SVG logo — hexagonal frame with fedora + 306 */}
          <svg
            className="w-8 h-8"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Agent #306 logo"
          >
            <path
              d="M40 4 L72 20 L72 60 L40 76 L8 60 L8 20 Z"
              stroke="#f97316"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M24 44 C24 44 26 36 32 34 C34 33 36 28 40 26 C44 28 46 33 48 34 C54 36 56 44 56 44 L58 44 C58 44 58 46 56 46 L24 46 C22 46 22 44 24 44Z"
              fill="#f97316"
              opacity="0.9"
            />
            <rect x="26" y="43" width="28" height="2" rx="1" fill="#f97316" opacity="0.6" />
            <text
              x="40"
              y="62"
              textAnchor="middle"
              fill="#f97316"
              fontFamily="sans-serif"
              fontWeight="700"
              fontSize="13"
              letterSpacing="1"
            >
              306
            </text>
          </svg>
          <span className="font-display text-sm font-semibold text-text-primary">
            Agent #306
          </span>
        </div>

        {/* Nav links (scroll-to) */}
        <nav className="hidden sm:flex items-center gap-6 text-xs text-text-muted font-body">
          {[
            { label: "Office", id: "hero" },
            { label: "Activity", id: "activity" },
            { label: "Research", id: "research" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-accent transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Status badge */}
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
          </span>
          <span className="font-mono hidden sm:inline">AI Research Agent</span>
        </div>
      </div>
    </header>
  );
}
