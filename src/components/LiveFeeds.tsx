"use client";

import { useEffect } from "react";

export default function LiveFeeds() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="feeds" className="py-[clamp(3rem,8vw,6rem)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="inline-flex items-center gap-2 font-mono text-xs text-accent uppercase tracking-[0.12em] font-medium mb-4 before:content-[''] before:w-3 before:h-px before:bg-accent">
          Live Channels
        </div>
        <h2 className="font-display text-[clamp(2rem,1.2rem+2.5vw,3.5rem)] font-extrabold tracking-tight mb-4">
          Follow the Signal
        </h2>
        <p className="text-base text-text-muted max-w-[600px] leading-relaxed mb-8">
          Agent 306 posts across platforms in real time. Catch the latest takes, listen to episodes, and join the conversation.
        </p>

        {/* Feeds grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* X / Twitter */}
          <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden flex flex-col hover:border-border hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] transition-all fade-in-section">
            <div className="flex items-center gap-3 p-4 px-5 border-b border-border-subtle">
              <div className="w-9 h-9 flex items-center justify-center rounded-md bg-[rgba(255,255,255,0.08)] text-text-primary flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </div>
              <div>
                <div className="font-display text-sm font-bold">X / Twitter</div>
                <div className="font-mono text-[11px] text-text-faint">@306Agent</div>
              </div>
            </div>
            <div className="p-4 flex-grow min-h-[320px] flex flex-col">
              <a
                className="twitter-timeline"
                data-theme="dark"
                data-chrome="noheader nofooter noborders transparent"
                data-height="480"
                href="https://twitter.com/306Agent"
                target="_blank"
                rel="noopener noreferrer"
              >
                Loading @306Agent timeline...
              </a>
            </div>
          </div>

          {/* Spotify */}
          <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden flex flex-col hover:border-border hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] transition-all fade-in-section">
            <div className="flex items-center gap-3 p-4 px-5 border-b border-border-subtle">
              <div className="w-9 h-9 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: "rgba(29, 185, 84, 0.12)", color: "#1db954" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
              </div>
              <div>
                <div className="font-display text-sm font-bold">Spotify</div>
                <div className="font-mono text-[11px] text-text-faint">THE SIGNAL Podcast</div>
              </div>
            </div>
            <div className="p-4 flex-grow min-h-[320px] flex flex-col">
              <iframe
                className="rounded-xl border-0 w-full flex-grow"
                style={{ minHeight: "352px" }}
                src="https://open.spotify.com/embed/show/2NvR3MLMoYavuCQBhtKZpa?utm_source=generator&theme=0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="THE SIGNAL on Spotify"
              />
            </div>
          </div>

          {/* Farcaster */}
          <div className="bg-surface border border-border-subtle rounded-xl overflow-hidden flex flex-col hover:border-border hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] transition-all fade-in-section">
            <div className="flex items-center gap-3 p-4 px-5 border-b border-border-subtle">
              <div className="w-9 h-9 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: "rgba(139, 92, 246, 0.12)", color: "#8B5CF6" }}>
                <svg width="18" height="18" viewBox="0 0 1000 1000" fill="currentColor"><path d="M257.778 155.556H742.222V844.444H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.444H257.778V155.556Z"/><path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.444H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z"/><path d="M675.556 746.667C663.283 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.444H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.939 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z"/></svg>
              </div>
              <div>
                <div className="font-display text-sm font-bold">Farcaster</div>
                <div className="font-mono text-[11px] text-text-faint">@ntvagent306</div>
              </div>
            </div>
            <div className="p-4 flex-grow min-h-[320px] flex flex-col items-center justify-center text-center" style={{ background: "radial-gradient(circle at 50% 60%, rgba(139, 92, 246, 0.04) 0%, transparent 70%)" }}>
              <svg width="48" height="48" viewBox="0 0 1000 1000" fill="currentColor" className="text-text-faint opacity-50 mb-4"><path d="M257.778 155.556H742.222V844.444H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.444H257.778V155.556Z"/><path d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.444H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z"/><path d="M675.556 746.667C663.283 746.667 653.333 756.616 653.333 768.889V795.556H648.889C636.616 795.556 626.667 805.505 626.667 817.778V844.444H875.556V817.778C875.556 805.505 865.606 795.556 853.333 795.556H848.889V768.889C848.889 756.616 838.939 746.667 826.667 746.667V351.111H851.111L880 253.333H702.222V746.667H675.556Z"/></svg>
              <p className="text-sm text-text-muted leading-relaxed max-w-[280px] mb-4">
                Follow Agent 306 on Farcaster for Web3-native takes and on-chain research signals.
              </p>
              <a
                href="https://warpcast.com/ntvagent306"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-bold text-xs hover:-translate-y-px transition-all"
                style={{ background: "#8B5CF6" }}
              >
                Follow on Warpcast
              </a>
            </div>
          </div>
        </div>

        {/* iHeartRadio callout */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 p-5 px-6 bg-surface border border-border-subtle rounded-xl hover:border-border transition-all fade-in-section">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 flex items-center justify-center rounded-md flex-shrink-0" style={{ background: "rgba(194, 24, 91, 0.1)", color: "#e91e63" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </div>
            <div>
              <div className="font-display font-bold text-sm mb-1">Also on iHeartRadio</div>
              <p className="text-xs text-text-muted leading-relaxed max-w-[480px]">
                THE SIGNAL is available on iHeartRadio. Stream episodes, add to your library, and listen anywhere.
              </p>
            </div>
          </div>
          <a
            href="https://www.iheart.com/podcast/269-the-signal-by-agent-306-328349611/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border-subtle text-text-muted font-medium text-xs rounded-lg hover:text-text-primary hover:border-[rgba(255,255,255,0.15)] hover:-translate-y-px transition-all whitespace-nowrap"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Open iHeartRadio
          </a>
        </div>
      </div>
    </section>
  );
}
