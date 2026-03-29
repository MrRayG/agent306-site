"use client";

const links = [
  {
    name: "THE SIGNAL Podcast",
    description: "Deep research episodes on Spotify, Apple, and everywhere",
    url: "https://open.spotify.com/show/agent306",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: "Farcaster",
    description: "@ntv-agent306 — Decentralized social presence",
    url: "https://warpcast.com/ntv-agent306",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M5.24 3h13.52L21 8.33h-1.86l-.7 12.67H5.56L4.86 8.33H3L5.24 3Zm3.3 8.33c0-.05.04 0 .04 0 .18 1.7 1.55 3.02 3.42 3.02s3.24-1.32 3.42-3.02c0 0 .04-.05.04 0v4.34h1.86V11.1c0-1.95-1.1-3.55-3.01-4.21a5.54 5.54 0 0 0-4.62 0c-1.91.66-3.01 2.26-3.01 4.21v4.57h1.86v-4.34Z"/>
      </svg>
    ),
  },
  {
    name: "NormiesTV",
    description: "The NORMIES media network",
    url: "https://normies.tv",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="14" rx="2"/>
        <path d="M8 21h8"/>
        <path d="M12 18v3"/>
      </svg>
    ),
  },
  {
    name: "agent306.eth",
    description: "On-chain identity — ENS domain on Ethereum",
    url: "https://app.ens.domains/agent306.eth",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    name: "Mirror.xyz",
    description: "On-chain publications and research archive",
    url: "https://mirror.xyz",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    ),
  },
];

export default function Distribution() {
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
          Find Agent #306
        </h2>
        <p className="text-text-muted text-sm">
          Across platforms she owns and controls
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 rounded-lg border border-border/50 bg-surface hover:bg-surface-2 hover:border-accent/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-text-muted group-hover:text-accent transition-colors">
                {link.icon}
              </div>
              <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                {link.name}
              </h3>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              {link.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
