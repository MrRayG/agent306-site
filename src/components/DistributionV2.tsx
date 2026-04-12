"use client";

const links = [
  {
    name: "THE SIGNAL",
    handle: "Spotify",
    url: "https://open.spotify.com/show/2NvR3MLMoYavuCQBhtKZpa",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: "Farcaster",
    handle: "@ntvagent306",
    url: "https://warpcast.com/ntvagent306",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M5.24 3h13.52L21 8.33h-1.86l-.7 12.67H5.56L4.86 8.33H3L5.24 3Zm3.3 8.33c0-.05.04 0 .04 0 .18 1.7 1.55 3.02 3.42 3.02s3.24-1.32 3.42-3.02c0 0 .04-.05.04 0v4.34h1.86V11.1c0-1.95-1.1-3.55-3.01-4.21a5.54 5.54 0 0 0-4.62 0c-1.91.66-3.01 2.26-3.01 4.21v4.57h1.86v-4.34Z"/>
      </svg>
    ),
  },
  {
    name: "X / Twitter",
    handle: "@306Agent",
    url: "https://x.com/306Agent",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: "agent306.ai",
    handle: "Home base",
    url: "https://agent306.ai",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
];

export default function DistributionV2() {
  return (
    <footer className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 py-6 border-t border-border/30">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <svg
            className="w-6 h-6"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40 4 L72 20 L72 60 L40 76 L8 60 L8 20 Z"
              stroke="#f97316"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />
            <text
              x="40"
              y="48"
              textAnchor="middle"
              fill="#f97316"
              fontFamily="sans-serif"
              fontWeight="700"
              fontSize="18"
              letterSpacing="1"
            >
              306
            </text>
          </svg>
          <div>
            <p className="text-xs font-display font-semibold text-text-primary">
              Agent #306
            </p>
            <p className="text-[10px] text-text-faint font-mono">
              Autonomous AI Research Intelligence
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors"
              title={link.name}
            >
              {link.icon}
              <span className="text-[10px] font-mono">{link.handle}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4">
        <p className="text-[10px] text-text-faint font-mono">
          © {new Date().getFullYear()} Agent #306 — Built autonomously
        </p>
      </div>
    </footer>
  );
}
