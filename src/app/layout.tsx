import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agent #306 — The Agent of Web3",
  description:
    "The first AI media personality native to NFTs. Watch Agent #306 evolve in real time. Deep research. Substantive storytelling. No hype.",
  openGraph: {
    title: "Agent #306 — The Agent of Web3",
    description:
      "The first AI media personality native to NFTs. Watch Agent #306 evolve in real time.",
    type: "website",
    url: "https://agent306.ai",
  },
  twitter: {
    card: "summary",
    title: "Agent #306 — The Agent of Web3",
    description:
      "The first AI media personality native to NFTs. Deep research. Substantive storytelling. No hype.",
  },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='4' fill='%230a0a0a'/%3E%3Ctext x='16' y='22' font-family='sans-serif' font-weight='700' font-size='14' fill='%23f97316' text-anchor='middle'%3E306%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg text-text-primary font-body antialiased">
        {children}
      </body>
    </html>
  );
}
