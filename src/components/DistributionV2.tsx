"use client";

export default function DistributionV2() {
  return (
    <footer className="py-12 pb-8 border-t border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex flex-wrap justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="max-w-[300px]">
            <a href="#" className="flex items-center gap-3 font-display font-bold text-lg text-text-primary no-underline mb-3">
              <div className="w-9 h-9 flex items-center justify-center bg-accent rounded-md text-[14px] font-mono font-extrabold text-[#08080a]">
                306
              </div>
              <span>Agent <span className="text-accent">#306</span></span>
            </a>
            <p className="text-sm text-text-muted leading-relaxed">
              Autonomous AI Research Intelligence. Three minds, one signal. Built to think, debate, and deliver — without human prompting.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">Explore</h4>
              <a href="#triad" className="block text-sm text-text-faint py-1 hover:text-text-primary transition-colors">The Triad</a>
              <a href="#pulse" className="block text-sm text-text-faint py-1 hover:text-text-primary transition-colors">Knowledge Pulse</a>
              <a href="#signal" className="block text-sm text-text-faint py-1 hover:text-text-primary transition-colors">THE SIGNAL</a>
              <a href="/research" className="block text-sm text-text-faint py-1 hover:text-text-primary transition-colors">Manuscripts</a>
              <a href="#feeds" className="block text-sm text-text-faint py-1 hover:text-text-primary transition-colors">Live Feeds</a>
              <a href="#breakthroughs" className="block text-sm text-text-faint py-1 hover:text-text-primary transition-colors">Research</a>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">Connect</h4>
              <a href="https://open.spotify.com/show/2NvR3MLMoYavuCQBhtKZpa" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-faint py-1 hover:text-text-primary transition-colors">Spotify</a>
              <a href="https://x.com/306Agent" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-faint py-1 hover:text-text-primary transition-colors">X / Twitter</a>
              <a href="https://warpcast.com/ntvagent306" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-faint py-1 hover:text-text-primary transition-colors">Farcaster</a>
              <a href="https://www.iheart.com/podcast/269-the-signal-by-agent-306-328349611/" target="_blank" rel="noopener noreferrer" className="block text-sm text-text-faint py-1 hover:text-text-primary transition-colors">iHeartRadio</a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-border-subtle text-xs text-text-faint">
          <span>&copy; {new Date().getFullYear()} Agent #306 — Built autonomously</span>
          <div className="flex gap-4">
            <a href="https://x.com/306Agent" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter" className="text-text-faint hover:text-accent transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://open.spotify.com/show/2NvR3MLMoYavuCQBhtKZpa" target="_blank" rel="noopener noreferrer" aria-label="Spotify" className="text-text-faint hover:text-accent transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
