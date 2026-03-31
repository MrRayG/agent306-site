"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { AgentStatus } from "@/lib/types";

// ============================================
// Pixel Art Virtual Office — Hero Section
// Agent 306 animated in her office via HTML5 Canvas
// ============================================

const PIXEL = 4; // each "pixel" rendered at 4x4 real pixels
const COLS = 200;
const ROWS = 100;
const WIDTH = COLS * PIXEL;
const HEIGHT = ROWS * PIXEL;

// Colors
const C = {
  bg: "#0a0a0a",
  floor: "#0e0e0e",
  floorLine: "#151515",
  wall: "#0d0d0d",
  wallAccent: "#131313",
  desk: "#1a1612",
  deskTop: "#231d16",
  monitor: "#111111",
  monitorScreen: "#0a1a0a",
  monitorScreenAlt: "#0a0a1a",
  screenGlow: "#1a3a1a",
  screenGlowAlt: "#1a1a3a",
  bookshelf: "#1a1612",
  book1: "#8b3a1a",
  book2: "#2a5a3a",
  book3: "#4a2a6a",
  book4: "#6a4a1a",
  book5: "#2a3a5a",
  mic: "#3a3a3a",
  micTop: "#555555",
  whiteboard: "#1a1a1a",
  wbBorder: "#2a2a2a",
  wbContent: "#333333",
  chair: "#1a1612",
  chairSeat: "#231d16",
  orange: "#f97316",
  orangeDim: "#c25e12",
  orangeLight: "#fb923c",
  skin: "#ddb892",
  skinShadow: "#c4956e",
  hair: "#2a1a0a",
  fedora: "#3a2a1a",
  fedoraBand: "#f97316",
  coat: "#1a1a2a",
  coatLight: "#2a2a3a",
  particle: "#f97316",
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

// Sprite frame definitions for Agent 306
// Each frame is an array of [x, y, color] relative to sprite origin
function getAgentSprite(frame: number, state: "idle" | "walk" | "type" | "read" | "talk"): [number, number, string][] {
  const pixels: [number, number, string][] = [];
  const bobY = state === "idle" ? (frame % 2 === 0 ? 0 : -1) : 0;
  const walkOffset = state === "walk" ? (frame % 4 < 2 ? 1 : -1) : 0;
  const typeHand = state === "type" ? (frame % 2 === 0 ? 0 : 1) : 0;

  // Fedora (wide brim)
  for (let x = -3; x <= 3; x++) pixels.push([x, -8 + bobY, C.fedora]);
  for (let x = -4; x <= 4; x++) pixels.push([x, -7 + bobY, C.fedora]);
  // Fedora crown
  for (let x = -2; x <= 2; x++) pixels.push([x, -9 + bobY, C.fedora]);
  for (let x = -2; x <= 2; x++) pixels.push([x, -10 + bobY, C.fedora]);
  for (let x = -1; x <= 1; x++) pixels.push([x, -11 + bobY, C.fedora]);
  // Fedora band (orange)
  for (let x = -3; x <= 3; x++) pixels.push([x, -8 + bobY, C.fedoraBand]);

  // Head/face
  for (let x = -2; x <= 2; x++) {
    pixels.push([x, -6 + bobY, C.skin]);
    pixels.push([x, -5 + bobY, C.skin]);
    pixels.push([x, -4 + bobY, C.skin]);
  }
  // Hair sides
  pixels.push([-3, -6 + bobY, C.hair]);
  pixels.push([3, -6 + bobY, C.hair]);
  pixels.push([-3, -5 + bobY, C.hair]);
  pixels.push([3, -5 + bobY, C.hair]);

  // Eyes
  pixels.push([-1, -5 + bobY, "#0a0a0a"]);
  pixels.push([1, -5 + bobY, "#0a0a0a"]);

  // Body / coat
  for (let x = -2; x <= 2; x++) {
    pixels.push([x, -3 + bobY, C.coat]);
    pixels.push([x, -2 + bobY, C.coat]);
    pixels.push([x, -1 + bobY, C.coat]);
    pixels.push([x, 0 + bobY, C.coat]);
  }
  // Coat lapels (orange accent)
  pixels.push([0, -3 + bobY, C.orange]);
  pixels.push([0, -2 + bobY, C.orange]);

  // Arms
  if (state === "type") {
    // Arms forward for typing
    pixels.push([-3, -2 + bobY, C.coat]);
    pixels.push([3, -2 + bobY, C.coat]);
    pixels.push([-4 + typeHand, -1 + bobY, C.skin]);
    pixels.push([4 - typeHand, -1 + bobY, C.skin]);
  } else if (state === "read") {
    // Arms down holding book
    pixels.push([-3, -1 + bobY, C.coat]);
    pixels.push([3, -1 + bobY, C.coat]);
    pixels.push([-3, 0 + bobY, C.skin]);
    pixels.push([3, 0 + bobY, C.skin]);
    // Book
    pixels.push([-1, 1 + bobY, C.book1]);
    pixels.push([0, 1 + bobY, C.book1]);
    pixels.push([1, 1 + bobY, C.book1]);
  } else if (state === "talk") {
    // Gesturing arm
    pixels.push([-3, -2 + bobY, C.coat]);
    pixels.push([3, -2 + bobY, C.coat]);
    pixels.push([-4, -3 + bobY + (frame % 2), C.skin]);
    pixels.push([4, -1 + bobY, C.skin]);
  } else {
    // Default arms
    pixels.push([-3, -2 + bobY, C.coat]);
    pixels.push([3, -2 + bobY, C.coat]);
    pixels.push([-3, -1 + bobY, C.coat]);
    pixels.push([3, -1 + bobY, C.coat]);
  }

  // Legs
  if (state === "walk") {
    pixels.push([-1 + walkOffset, 1 + bobY, "#1a1a1a"]);
    pixels.push([1 - walkOffset, 1 + bobY, "#1a1a1a"]);
    pixels.push([-1 + walkOffset, 2 + bobY, "#2a1a0a"]);
    pixels.push([1 - walkOffset, 2 + bobY, "#2a1a0a"]);
  } else {
    pixels.push([-1, 1 + bobY, "#1a1a1a"]);
    pixels.push([1, 1 + bobY, "#1a1a1a"]);
    pixels.push([-1, 2 + bobY, "#2a1a0a"]);
    pixels.push([1, 2 + bobY, "#2a1a0a"]);
  }

  return pixels;
}

// Station positions (in grid coords)
const STATIONS = {
  desk: { x: 50, y: 62 },
  bookshelf: { x: 140, y: 62 },
  microphone: { x: 30, y: 62 },
  whiteboard: { x: 160, y: 62 },
  center: { x: 100, y: 65 },
};

function statusToStation(status: AgentStatus): keyof typeof STATIONS {
  switch (status) {
    case "writing": return "desk";
    case "researching": return "bookshelf";
    case "podcasting": return "microphone";
    case "planning": return "whiteboard";
    default: return "center";
  }
}

function statusToAnim(status: AgentStatus): "idle" | "walk" | "type" | "read" | "talk" {
  switch (status) {
    case "writing": return "type";
    case "researching": return "read";
    case "podcasting": return "talk";
    case "planning": return "type";
    case "transitioning": return "walk";
    default: return "idle";
  }
}

interface Props {
  status: AgentStatus;
  statusLabel: string;
}

export default function PixelOffice({ status, statusLabel }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ w: WIDTH, h: HEIGHT });
  const frameRef = useRef(0);
  const agentPosRef = useRef({ x: STATIONS.center.x, y: STATIONS.center.y });
  const targetPosRef = useRef(STATIONS[statusToStation(status)]);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef(0);

  // Update target when status changes
  useEffect(() => {
    targetPosRef.current = STATIONS[statusToStation(status)];
  }, [status]);

  // Draw office furniture (static elements)
  const drawOffice = useCallback((ctx: CanvasRenderingContext2D, frame: number) => {
    // Floor
    ctx.fillStyle = C.floor;
    for (let y = 55; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      }
    }
    // Floor grid lines
    ctx.fillStyle = C.floorLine;
    for (let y = 55; y < ROWS; y += 5) {
      for (let x = 0; x < COLS; x++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, 1);
      }
    }
    for (let x = 0; x < COLS; x += 8) {
      for (let y = 55; y < ROWS; y++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, 1, PIXEL);
      }
    }

    // Wall
    ctx.fillStyle = C.wall;
    for (let y = 0; y < 55; y++) {
      for (let x = 0; x < COLS; x++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      }
    }
    // Wall accent line
    ctx.fillStyle = C.wallAccent;
    for (let x = 0; x < COLS; x++) {
      ctx.fillRect(x * PIXEL, 54 * PIXEL, PIXEL, PIXEL);
    }

    // ---- DESK (left-center) ----
    const dx = 40, dy = 60;
    // Desk surface
    ctx.fillStyle = C.deskTop;
    for (let x = dx; x < dx + 25; x++) {
      for (let y = dy; y < dy + 2; y++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      }
    }
    // Desk legs
    ctx.fillStyle = C.desk;
    for (let y = dy + 2; y < dy + 8; y++) {
      ctx.fillRect(dx * PIXEL, y * PIXEL, PIXEL, PIXEL);
      ctx.fillRect((dx + 24) * PIXEL, y * PIXEL, PIXEL, PIXEL);
    }
    // Chair
    ctx.fillStyle = C.chairSeat;
    for (let x = dx + 7; x < dx + 14; x++) {
      ctx.fillRect(x * PIXEL, (dy + 4) * PIXEL, PIXEL, PIXEL);
    }
    ctx.fillStyle = C.chair;
    for (let y = dy - 3; y < dy + 4; y++) {
      ctx.fillRect((dx + 7) * PIXEL, y * PIXEL, PIXEL, PIXEL);
    }

    // Monitor 1
    const mx = dx + 3, my = dy - 8;
    ctx.fillStyle = C.monitor;
    for (let x = mx; x < mx + 10; x++) {
      for (let y = my; y < my + 7; y++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      }
    }
    // Screen content (animated)
    const screenColor = frame % 60 < 30 ? C.monitorScreen : C.screenGlow;
    ctx.fillStyle = screenColor;
    for (let x = mx + 1; x < mx + 9; x++) {
      for (let y = my + 1; y < my + 6; y++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      }
    }
    // Screen text lines
    ctx.fillStyle = C.orange;
    const linePhase = Math.floor(frame / 8) % 4;
    for (let i = 0; i < 3 + linePhase % 2; i++) {
      const lw = 3 + (i * 2 + frame) % 4;
      for (let x = mx + 2; x < mx + 2 + Math.min(lw, 6); x++) {
        ctx.fillRect(x * PIXEL, (my + 2 + i) * PIXEL, PIXEL, 1);
      }
    }

    // Monitor stand
    ctx.fillStyle = C.monitor;
    ctx.fillRect((mx + 4) * PIXEL, (my + 7) * PIXEL, 2 * PIXEL, PIXEL);

    // Monitor 2
    const m2x = dx + 15, m2y = dy - 7;
    ctx.fillStyle = C.monitor;
    for (let x = m2x; x < m2x + 8; x++) {
      for (let y = m2y; y < m2y + 6; y++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      }
    }
    const s2Color = frame % 80 < 40 ? C.monitorScreenAlt : C.screenGlowAlt;
    ctx.fillStyle = s2Color;
    for (let x = m2x + 1; x < m2x + 7; x++) {
      for (let y = m2y + 1; y < m2y + 5; y++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      }
    }
    ctx.fillStyle = "#2a4a6a";
    for (let i = 0; i < 2; i++) {
      for (let x = m2x + 2; x < m2x + 5; x++) {
        ctx.fillRect(x * PIXEL, (m2y + 2 + i) * PIXEL, PIXEL, 1);
      }
    }
    ctx.fillStyle = C.monitor;
    ctx.fillRect((m2x + 3) * PIXEL, (m2y + 6) * PIXEL, 2 * PIXEL, PIXEL);

    // ---- MICROPHONE STATION (far left) ----
    const micX = 25, micY = 52;
    // Mic stand
    ctx.fillStyle = C.mic;
    for (let y = micY; y < micY + 15; y++) {
      ctx.fillRect(micX * PIXEL, y * PIXEL, PIXEL, PIXEL);
    }
    // Mic base
    for (let x = micX - 2; x <= micX + 2; x++) {
      ctx.fillRect(x * PIXEL, (micY + 15) * PIXEL, PIXEL, PIXEL);
    }
    // Mic head
    ctx.fillStyle = C.micTop;
    for (let x = micX - 1; x <= micX + 1; x++) {
      for (let y = micY - 2; y <= micY; y++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      }
    }
    // Recording light
    ctx.fillStyle = status === "podcasting" ? (frame % 30 < 15 ? "#ff0000" : "#440000") : "#440000";
    ctx.fillRect((micX + 2) * PIXEL, (micY - 2) * PIXEL, PIXEL, PIXEL);

    // Pop filter
    ctx.fillStyle = "#2a2a2a";
    for (let y = micY - 1; y <= micY + 1; y++) {
      ctx.fillRect((micX + 3) * PIXEL, y * PIXEL, PIXEL, PIXEL);
    }

    // ---- BOOKSHELF (right) ----
    const bx = 130, by = 40;
    // Shelves
    ctx.fillStyle = C.bookshelf;
    for (let shelf = 0; shelf < 4; shelf++) {
      const sy = by + shelf * 6;
      for (let x = bx; x < bx + 20; x++) {
        ctx.fillRect(x * PIXEL, sy * PIXEL, PIXEL, PIXEL);
      }
      // Books on shelf
      const bookColors = [C.book1, C.book2, C.book3, C.book4, C.book5, C.orange, C.book1, C.book2];
      for (let i = 0; i < 8; i++) {
        const bookX = bx + 1 + i * 2;
        const bookH = 3 + (i % 3);
        ctx.fillStyle = bookColors[i];
        for (let y = sy - bookH; y < sy; y++) {
          ctx.fillRect(bookX * PIXEL, y * PIXEL, PIXEL, PIXEL);
          ctx.fillRect((bookX + 1) * PIXEL, y * PIXEL, PIXEL, PIXEL);
        }
      }
    }
    // Shelf sides
    ctx.fillStyle = C.bookshelf;
    for (let y = by; y < by + 24; y++) {
      ctx.fillRect(bx * PIXEL, y * PIXEL, PIXEL, PIXEL);
      ctx.fillRect((bx + 19) * PIXEL, y * PIXEL, PIXEL, PIXEL);
    }

    // ---- WHITEBOARD (far right) ----
    const wx = 155, wy = 38;
    // Board frame
    ctx.fillStyle = C.wbBorder;
    for (let x = wx; x < wx + 24; x++) {
      ctx.fillRect(x * PIXEL, wy * PIXEL, PIXEL, PIXEL);
      ctx.fillRect(x * PIXEL, (wy + 18) * PIXEL, PIXEL, PIXEL);
    }
    for (let y = wy; y <= wy + 18; y++) {
      ctx.fillRect(wx * PIXEL, y * PIXEL, PIXEL, PIXEL);
      ctx.fillRect((wx + 23) * PIXEL, y * PIXEL, PIXEL, PIXEL);
    }
    // Board surface
    ctx.fillStyle = C.whiteboard;
    for (let x = wx + 1; x < wx + 23; x++) {
      for (let y = wy + 1; y < wy + 18; y++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      }
    }
    // Board content (planning notes)
    ctx.fillStyle = C.wbContent;
    for (let i = 0; i < 5; i++) {
      const lw = 6 + (i * 3) % 8;
      for (let x = wx + 3; x < wx + 3 + lw; x++) {
        ctx.fillRect(x * PIXEL, (wy + 3 + i * 3) * PIXEL, PIXEL, 1);
      }
    }
    // Orange highlights
    ctx.fillStyle = C.orange;
    ctx.fillRect((wx + 3) * PIXEL, (wy + 3) * PIXEL, 2 * PIXEL, PIXEL);
    ctx.fillRect((wx + 10) * PIXEL, (wy + 9) * PIXEL, 3 * PIXEL, PIXEL);

    // Board legs
    ctx.fillStyle = C.mic;
    for (let y = wy + 18; y < wy + 28; y++) {
      ctx.fillRect((wx + 4) * PIXEL, y * PIXEL, PIXEL, PIXEL);
      ctx.fillRect((wx + 19) * PIXEL, y * PIXEL, PIXEL, PIXEL);
    }

    // ---- CEILING LIGHTS ----
    for (const lx of [30, 70, 110, 150, 180]) {
      ctx.fillStyle = "#1a1a1a";
      for (let x = lx; x < lx + 6; x++) {
        ctx.fillRect(x * PIXEL, 2 * PIXEL, PIXEL, PIXEL);
      }
      ctx.fillStyle = frame % 120 < 60 ? "#2a2a1a" : "#252518";
      for (let x = lx + 1; x < lx + 5; x++) {
        ctx.fillRect(x * PIXEL, 3 * PIXEL, PIXEL, PIXEL);
      }
      // Light glow on floor
      ctx.fillStyle = `rgba(249, 115, 22, ${0.01 + 0.005 * Math.sin(frame / 30 + lx)})`;
      ctx.fillRect((lx - 2) * PIXEL, 54 * PIXEL, 10 * PIXEL, PIXEL);
    }

    // ---- SMALL DETAILS ----
    // Plant next to desk
    const px = 68, py = 55;
    ctx.fillStyle = "#1a3a1a";
    for (let y = py; y < py + 3; y++) {
      for (let x = px; x < px + 3; x++) {
        ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
      }
    }
    ctx.fillStyle = "#2a5a2a";
    ctx.fillRect((px + 1) * PIXEL, (py - 1) * PIXEL, PIXEL, PIXEL);
    ctx.fillRect(px * PIXEL, (py - 2) * PIXEL, PIXEL, PIXEL);
    ctx.fillRect((px + 2) * PIXEL, (py - 2) * PIXEL, PIXEL, PIXEL);
    ctx.fillRect((px + 1) * PIXEL, (py - 3) * PIXEL, PIXEL, PIXEL);
    // Pot
    ctx.fillStyle = "#4a2a0a";
    for (let x = px; x < px + 3; x++) {
      ctx.fillRect(x * PIXEL, (py + 3) * PIXEL, PIXEL, PIXEL);
      ctx.fillRect(x * PIXEL, (py + 4) * PIXEL, PIXEL, PIXEL);
    }

    // Coffee mug on desk
    ctx.fillStyle = "#4a4a4a";
    ctx.fillRect((dx + 20) * PIXEL, (dy - 1) * PIXEL, 2 * PIXEL, 2 * PIXEL);
    ctx.fillStyle = C.orange;
    ctx.fillRect((dx + 20) * PIXEL, (dy - 1) * PIXEL, PIXEL, PIXEL);

  }, [status]);

  // Draw particles
  const updateParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    const particles = particlesRef.current;

    // Spawn new particles occasionally
    if (Math.random() < 0.1) {
      particles.push({
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT * 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.3,
        life: 0,
        maxLife: 60 + Math.random() * 120,
        size: 1 + Math.random(),
      });
    }

    // Update and draw
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life++;

      if (p.life >= p.maxLife) {
        particles.splice(i, 1);
        continue;
      }

      const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.4;
      ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    // Cap particle count
    if (particles.length > 30) {
      particles.splice(0, particles.length - 30);
    }
  }, []);

  // Main render loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const frame = frameRef.current;

    // Clear
    ctx.fillStyle = C.bg;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Draw office furniture
    drawOffice(ctx, frame);

    // Update agent position (move toward target)
    const pos = agentPosRef.current;
    const target = targetPosRef.current;
    const dx = target.x - pos.x;
    const dy = target.y - pos.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let animState: "idle" | "walk" | "type" | "read" | "talk";
    if (dist > 2) {
      pos.x += dx * 0.02;
      pos.y += dy * 0.02;
      animState = "walk";
    } else {
      animState = statusToAnim(status);
    }

    // Draw agent sprite
    const animFrame = Math.floor(frame / 10) % 4;
    const sprite = getAgentSprite(animFrame, animState);
    for (const [sx, sy, color] of sprite) {
      ctx.fillStyle = color;
      ctx.fillRect(
        (pos.x + sx) * PIXEL,
        (pos.y + sy) * PIXEL,
        PIXEL,
        PIXEL
      );
    }

    // Thought bubble when idle
    if (animState === "idle" && frame % 120 < 80) {
      const bubbleX = pos.x + 5;
      const bubbleY = pos.y - 16;
      ctx.fillStyle = "rgba(249, 115, 22, 0.1)";
      for (let x = bubbleX; x < bubbleX + 10; x++) {
        for (let y = bubbleY; y < bubbleY + 5; y++) {
          ctx.fillRect(x * PIXEL, y * PIXEL, PIXEL, PIXEL);
        }
      }
      ctx.fillStyle = "rgba(249, 115, 22, 0.3)";
      // Dot connector
      ctx.fillRect((bubbleX - 1) * PIXEL, (bubbleY + 5) * PIXEL, PIXEL, PIXEL);
      ctx.fillRect((bubbleX - 2) * PIXEL, (bubbleY + 7) * PIXEL, PIXEL, PIXEL);
      // "..." text in bubble
      ctx.fillStyle = C.orange;
      ctx.fillRect((bubbleX + 2) * PIXEL, (bubbleY + 2) * PIXEL, PIXEL, PIXEL);
      ctx.fillRect((bubbleX + 4) * PIXEL, (bubbleY + 2) * PIXEL, PIXEL, PIXEL);
      ctx.fillRect((bubbleX + 6) * PIXEL, (bubbleY + 2) * PIXEL, PIXEL, PIXEL);
    }

    // Floating particles
    updateParticles(ctx);

    // Scanline effect (very subtle)
    ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
    for (let y = 0; y < HEIGHT; y += 3) {
      ctx.fillRect(0, y, WIDTH, 1);
    }

    // Vignette corners
    const gradient = ctx.createRadialGradient(
      WIDTH / 2, HEIGHT / 2, WIDTH * 0.3,
      WIDTH / 2, HEIGHT / 2, WIDTH * 0.7
    );
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,0.3)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    frameRef.current++;
    animFrameRef.current = requestAnimationFrame(render);
  }, [drawOffice, updateParticles, status]);

  useEffect(() => {
    render();
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [render]);

  // Handle responsive sizing
  useEffect(() => {
    const handleResize = () => {
      const maxW = Math.min(window.innerWidth - 32, 800);
      const scale = maxW / WIDTH;
      setDimensions({
        w: Math.floor(WIDTH * scale),
        h: Math.floor(HEIGHT * scale),
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center px-4 pt-8 pb-4">
      {/* Canvas container */}
      <div className="relative" style={{ width: dimensions.w, height: dimensions.h }}>
        {/* Glow behind canvas */}
        <div
          className="absolute -inset-4 rounded-lg opacity-30 blur-2xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.15), transparent 70%)" }}
        />
        <canvas
          ref={canvasRef}
          width={WIDTH}
          height={HEIGHT}
          className="relative w-full h-full rounded border border-border"
          style={{
            imageRendering: "pixelated",
          }}
        />
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-accent/40" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-accent/40" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-accent/40" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-accent/40" />
      </div>

      {/* Status line */}
      <div className="mt-4 flex items-center gap-2 text-sm text-text-muted font-body">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        <span>
          Agent #306 is currently:{" "}
          <span className="text-accent font-medium">{statusLabel}</span>
        </span>
      </div>
    </section>
  );
}
