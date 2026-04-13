"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavItem {
  label: string;
  id?: string;     // scroll anchor (homepage only)
  href?: string;    // page link
}

const NAV_ITEMS: NavItem[] = [
  { label: "Triad", id: "triad" },
  { label: "Knowledge", id: "pulse" },
  { label: "THE SIGNAL", id: "signal" },
  { label: "Blog", href: "/blog" },
  { label: "Manuscripts", id: "manuscripts" },
  { label: "Podcast", href: "/podcast" },
  { label: "Feeds", id: "feeds" },
];

export default function HeaderV2() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleNav = (item: NavItem) => {
    setMobileOpen(false);
    if (item.id) {
      if (pathname !== "/") {
        window.location.href = `/#${item.id}`;
      } else {
        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    // href items are handled by <Link>
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[rgba(8,8,10,0.85)] backdrop-blur-2xl border-b border-border-subtle">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 font-display font-bold text-lg text-text-primary no-underline">
          <div className="w-9 h-9 flex items-center justify-center bg-accent rounded-md text-[14px] font-mono font-extrabold text-[#08080a]">
            306
          </div>
          <span>Agent <span className="text-accent">#306</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`text-sm font-medium tracking-wide transition-colors ${
                      pathname === item.href ? "text-accent" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleNav(item)}
                    className="text-sm text-text-muted font-medium tracking-wide hover:text-text-primary transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
            <li>
              <div className="flex items-center gap-2 text-xs font-mono text-green">
                <span
                  className="w-2 h-2 rounded-full bg-green"
                  style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
                />
                LIVE
              </div>
            </li>
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-[5px] p-2 cursor-pointer"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className="block w-5 h-0.5 bg-text-primary transition-transform"
            style={mobileOpen ? { transform: "rotate(45deg) translate(5px, 5px)" } : {}}
          />
          <span
            className="block w-5 h-0.5 bg-text-primary transition-opacity"
            style={mobileOpen ? { opacity: 0 } : {}}
          />
          <span
            className="block w-5 h-0.5 bg-text-primary transition-transform"
            style={mobileOpen ? { transform: "rotate(-45deg) translate(5px, -5px)" } : {}}
          />
        </button>
      </div>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 bottom-0 bg-[rgba(8,8,10,0.97)] backdrop-blur-xl z-[99] p-8 px-4 md:hidden">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block w-full text-left py-4 text-lg border-b border-border-subtle transition-colors no-underline ${
                  pathname === item.href ? "text-accent" : "text-text-muted hover:text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className="block w-full text-left py-4 text-lg text-text-muted border-b border-border-subtle hover:text-text-primary transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      )}
    </header>
  );
}
