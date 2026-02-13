"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import "./cash-back-wallet-001.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* ─── phase machine ─────────────────────────────────────── */
type Phase = "single" | "grid" | "paint";

const DURATIONS: Record<Phase, number> = {
  single: 2200,
  grid: 3000,
  paint: 8500,
};
const NEXT: Record<Phase, Phase> = {
  single: "grid",
  grid: "paint",
  paint: "single",
};

/* ─── brush‑stroke data for the paint reveal ───────────── */
interface Stroke {
  d: string;
  sw: number;
  delay: number;
  dur: number;
}

// White strokes that sweep bottom-left → top-right, filling the card area
const WHITE_STROKES: Stroke[] = [
  // Bottom base
  { d: "M -25 215 C 30 208 90 200 145 192 C 200 184 240 178 285 168", sw: 68, delay: 0, dur: 1.5 },
  // Lower-mid
  { d: "M -20 168 C 40 158 100 148 155 138 C 210 128 250 120 285 108", sw: 62, delay: 0.3, dur: 1.4 },
  // Center
  { d: "M -25 118 C 35 108 95 96 150 85 C 205 74 245 66 285 54", sw: 60, delay: 0.6, dur: 1.35 },
  // Upper-mid
  { d: "M -20 68 C 40 58 100 46 155 36 C 210 26 248 18 285 6", sw: 56, delay: 0.95, dur: 1.3 },
  // Top
  { d: "M -25 24 C 35 16 100 6 155 -4 C 210 -14 250 -20 285 -28", sw: 52, delay: 1.25, dur: 1.2 },
  // Gap fillers
  { d: "M -15 248 C 80 238 180 226 290 214", sw: 48, delay: 0.1, dur: 1.1 },
  { d: "M -20 142 C 80 134 180 122 290 110", sw: 38, delay: 0.75, dur: 1.0 },
  { d: "M -15 46 C 80 38 180 26 285 14", sw: 34, delay: 1.1, dur: 0.95 },
];

// Paint splatters — small circles for organic feel
const SPLATTERS = [
  { cx: 35, cy: 180, r: 5, delay: 0.6 },
  { cx: 85, cy: 148, r: 3.5, delay: 1.0 },
  { cx: 155, cy: 108, r: 6, delay: 1.4 },
  { cx: 210, cy: 68, r: 4, delay: 1.9 },
  { cx: 48, cy: 120, r: 3, delay: 1.2 },
  { cx: 190, cy: 155, r: 4.5, delay: 0.9 },
  { cx: 240, cy: 40, r: 3.5, delay: 2.1 },
  { cx: 120, cy: 60, r: 2.5, delay: 1.7 },
];

/* ─── sub‑components ────────────────────────────────────── */

/** Frame 1 — single wallet card */
function SingleCard() {
  return (
    <motion.div
      className="cbw__layer"
      initial={{ opacity: 0, scale: 0.92, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 10 }}
      transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="cbw__card">
        <div className="cbw__card-top">
          <span className="cbw__badge">New</span>
          <div className="cbw__coin" />
        </div>
        <div className="cbw__card-body">
          <div className="cbw__amount">$0.36</div>
          <div className="cbw__label">Cashback</div>
        </div>
      </div>
    </motion.div>
  );
}

/** Frame 2 — 2×2 mini‑card grid that zooms into top‑left */
function GridCards() {
  return (
    <motion.div
      className="cbw__grid-layer"
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{
        opacity: 0,
        scale: 2.4,
        x: -36,
        y: -28,
        transition: { duration: 1.2, ease: [0.32, 0, 0.2, 1] },
      }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="cbw__grid">
        {[
          { color: "linear-gradient(135deg,#ffe09a,#f6b252)", amt: "$0.54", sub: "Cashback", badge: true },
          { color: "linear-gradient(135deg,#ff8a8a,#e85d5d)", amt: "$1.20", sub: "Rewards", badge: true },
          { color: "linear-gradient(135deg,#88d4ff,#4a9eff)", amt: "$0.88", sub: "Points", badge: false },
          { color: "linear-gradient(135deg,#a8e6a0,#58b84e)", amt: "$2.10", sub: "Gift Cards", badge: false },
        ].map((c, i) => (
          <motion.div
            key={i}
            className="cbw__mini"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 * i, duration: 0.45, ease: "easeOut" }}
          >
            <div className="cbw__mini-top" style={{ background: c.color }} />
            {c.badge && <span className="cbw__mini-badge">New</span>}
            <div className="cbw__mini-label">{c.amt}</div>
            <div className="cbw__mini-sub">{sub(c.sub)}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function sub(text: string) {
  return <span>{text}</span>;
}

/** Frames 3‑7 — paint‑draw reveal */
function PaintReveal() {
  return (
    <motion.div
      className="cbw__layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="cbw__reveal-card">
        {/* SVG brush strokes that "paint" the white card background */}
        <svg
          className="cbw__paint-svg"
          viewBox="0 0 260 200"
          preserveAspectRatio="none"
        >
          {/* White paint strokes */}
          {WHITE_STROKES.map((s, i) => (
            <motion.path
              key={`s${i}`}
              d={s.d}
              stroke="white"
              strokeWidth={s.sw}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0.92 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  delay: s.delay,
                  duration: s.dur,
                  ease: [0.25, 0.1, 0.25, 1],
                },
                opacity: { delay: s.delay, duration: 0.3 },
              }}
            />
          ))}
          {/* Paint splatters */}
          {SPLATTERS.map((sp, i) => (
            <motion.circle
              key={`sp${i}`}
              cx={sp.cx}
              cy={sp.cy}
              r={sp.r}
              fill="white"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.85 }}
              transition={{
                delay: sp.delay,
                duration: 0.35,
                ease: [0.34, 1.56, 0.64, 1], // spring-like bounce
              }}
            />
          ))}
        </svg>

        {/* Gold top — wipes in from left after strokes fill */}
        <motion.div
          className="cbw__reveal-gold"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ delay: 2.8, duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="cbw__gold-sparkles" />
        </motion.div>

        {/* Badge pops in */}
        <motion.span
          className="cbw__badge cbw__badge--final"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 3.6,
            duration: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          New
        </motion.span>

        {/* Coin bounces in */}
        <motion.div
          className="cbw__coin cbw__coin--final"
          initial={{ scale: 0, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            delay: 3.4,
            duration: 0.6,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        />

        {/* Amount + label fade up */}
        <motion.div
          className="cbw__reveal-body"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.2, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="cbw__amount">$0.36</div>
          <div className="cbw__label">Cashback</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── main page ─────────────────────────────────────────── */
export default function CashBackWallet001Page() {
  const [phase, setPhase] = useState<Phase>("single");
  const [cycle, setCycle] = useState(0);

  const advance = useCallback(() => {
    setPhase((prev) => {
      const next = NEXT[prev];
      if (next === "single") setCycle((c) => c + 1);
      return next;
    });
  }, []);

  useEffect(() => {
    const id = setTimeout(advance, DURATIONS[phase]);
    return () => clearTimeout(id);
  }, [phase, advance]);

  return (
    <div className={`cbw ${spaceGrotesk.className}`}>
      <div className="cbw__shell">
        <div className="cbw__header">
          <div>
            <p className="cbw__eyebrow">cash-back-wallet-001</p>
            <h1 className="cbw__title">Wallet Paint‑Draw Sequence</h1>
          </div>
          <p className="cbw__subtitle">
            7‑frame UI animation: single card, grid reveal, zoom focus, then a
            liquid paint draw flowing from bottom‑left to reveal the final
            wallet state.
          </p>
        </div>

        <div className="cbw__stage">
          <div
            className="cbw__phone"
            role="img"
            aria-label="Animated wallet paint-draw sequence"
          >
            <div className="cbw__pattern" />

            <AnimatePresence mode="wait">
              {phase === "single" && <SingleCard key={`s-${cycle}`} />}
              {phase === "grid" && <GridCards key={`g-${cycle}`} />}
              {phase === "paint" && <PaintReveal key={`p-${cycle}`} />}
            </AnimatePresence>

            <div className="cbw__phone-bezel" />
          </div>
        </div>
      </div>
    </div>
  );
}
