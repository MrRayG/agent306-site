import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#08080a",
        surface: "#0f0f12",
        "surface-2": "#151519",
        "surface-3": "#1a1a1f",
        border: "rgba(249, 115, 22, 0.12)",
        "border-subtle": "rgba(255, 255, 255, 0.06)",
        accent: "#f97316",
        "accent-dim": "rgba(249, 115, 22, 0.15)",
        "accent-glow": "rgba(249, 115, 22, 0.08)",
        "text-primary": "#e8e6e3",
        "text-muted": "#8a8880",
        "text-faint": "#504e49",
        green: "#22c55e",
        "green-dim": "rgba(34, 197, 94, 0.15)",
      },
      fontFamily: {
        display: ["'Cabinet Grotesk'", "'Inter'", "sans-serif"],
        body: ["'Satoshi'", "'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "'Fira Code'", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        glow: {
          "0%, 100%": {
            opacity: "0.5",
            boxShadow: "0 0 0 0 rgba(249, 115, 22, 0)",
          },
          "50%": {
            opacity: "1",
            boxShadow: "0 0 12px 3px rgba(249, 115, 22, 0.3)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
