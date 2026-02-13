"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from "framer-motion";
import { Space_Grotesk } from "next/font/google";
import "./magnifying-glass-search.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/* ─── constants ─────────────────────────────────────────── */

const CYCLE = 8; // seconds per full loop

// 7-frame glass path (offsets from center of scene)
//        F1     F2      F3      F4     F5      F6     F7(=F1)
const PX = [0, -55, 60, 78, 52, -58, 0];
const PY = [0, -60, -68, 8, 65, 48, 0];
const PR = [0, -12, 10, 15, -6, -14, 0];

// The lens center sits at (36,36) in the 90×90 SVG → offset -9 from wrap center
const LENS_OFFSET = -9;
const LENS_CLIP_R = 30; // reveal circle radius (slightly larger than visual lens)

/* ─── food icon data ─────────────────────────────────────── */

type IconType =
  | "fork"
  | "pizza"
  | "coffee"
  | "burger"
  | "donut"
  | "apple"
  | "cupcake"
  | "wine"
  | "egg"
  | "fish";

interface FoodItem {
  id: string;
  x: number;
  y: number;
  size: number;
  rot: number;
  icon: IconType;
}

// Icons placed AT each waypoint + BETWEEN waypoints so the glass always has
// something to reveal throughout its entire path.
const FOOD_ITEMS: FoodItem[] = [
  // ── Near center (F1 / F7: 0, 0) ──
  { id: "c1", x: 8, y: -10, size: 26, rot: 10, icon: "pizza" },
  { id: "c2", x: -14, y: 12, size: 22, rot: -18, icon: "coffee" },

  // ── Path center → upper-left (midpoint ≈ -28, -30) ──
  { id: "m1", x: -25, y: -28, size: 22, rot: 12, icon: "donut" },

  // ── Near upper-left (F2: -55, -60) ──
  { id: "ul1", x: -48, y: -54, size: 26, rot: 20, icon: "burger" },
  { id: "ul2", x: -62, y: -66, size: 20, rot: -8, icon: "fork" },

  // ── Path upper-left → upper-right (midpoint ≈ 3, -64) ──
  { id: "m2", x: 5, y: -62, size: 24, rot: -5, icon: "wine" },

  // ── Near upper-right (F3: 60, -68) ──
  { id: "ur1", x: 54, y: -62, size: 26, rot: -10, icon: "cupcake" },
  { id: "ur2", x: 68, y: -74, size: 20, rot: 15, icon: "apple" },

  // ── Path upper-right → center-right (midpoint ≈ 69, -30) ──
  { id: "m3", x: 66, y: -28, size: 22, rot: 18, icon: "egg" },

  // ── Near center-right (F4: 78, 8) ──
  { id: "cr1", x: 72, y: 2, size: 26, rot: -12, icon: "fish" },
  { id: "cr2", x: 84, y: 14, size: 20, rot: 8, icon: "pizza" },

  // ── Path center-right → lower-right (midpoint ≈ 65, 37) ──
  { id: "m4", x: 62, y: 34, size: 22, rot: -18, icon: "fork" },

  // ── Near lower-right (F5: 52, 65) ──
  { id: "lr1", x: 46, y: 58, size: 26, rot: -10, icon: "burger" },
  { id: "lr2", x: 58, y: 72, size: 20, rot: 5, icon: "coffee" },

  // ── Path lower-right → lower-left (midpoint ≈ -3, 57) ──
  { id: "m5", x: -5, y: 55, size: 24, rot: 8, icon: "donut" },

  // ── Near lower-left (F6: -58, 48) ──
  { id: "ll1", x: -52, y: 42, size: 26, rot: 12, icon: "cupcake" },
  { id: "ll2", x: -64, y: 54, size: 20, rot: -5, icon: "apple" },

  // ── Path lower-left → center (midpoint ≈ -29, 24) ──
  { id: "m6", x: -28, y: 22, size: 22, rot: -12, icon: "wine" },
];

/* ─── SVG food icon paths (24×24 viewBox) ────────────────── */

function FoodSvg({ icon }: { icon: IconType }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "fork":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M6 2v7a3 3 0 003 3v10" {...common} />
          <path d="M10 2v7a3 3 0 01-3 3" {...common} />
          <path d="M14 2v18" {...common} />
          <path d="M18 2v7a3 3 0 01-3 3h-1" {...common} />
        </svg>
      );
    case "pizza":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M12 2L3 20h18z" {...common} />
          <circle cx="9" cy="14" r="1.2" fill="currentColor" opacity={0.5} />
          <circle cx="13" cy="11" r="1.2" fill="currentColor" opacity={0.5} />
          <circle cx="11" cy="17" r="1" fill="currentColor" opacity={0.4} />
        </svg>
      );
    case "coffee":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M3 6h12v10a4 4 0 01-4 4H7a4 4 0 01-4-4V6z" {...common} />
          <path d="M15 9h2a2 2 0 010 4h-2" {...common} />
          <path d="M6 2c0 1 1 2 1 3s-1 2-1 3" {...common} opacity={0.4} />
          <path d="M10 2c0 1 1 2 1 3s-1 2-1 3" {...common} opacity={0.4} />
        </svg>
      );
    case "burger":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M4 12h16" {...common} />
          <path d="M3 16h18a1 1 0 010 2H3a1 1 0 010-2z" {...common} />
          <path d="M5 8c0-3 3-5 7-5s7 2 7 5z" {...common} />
          <path d="M4 12c1 1 3 2 8 2s7-1 8-2" {...common} opacity={0.4} />
        </svg>
      );
    case "donut":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <circle cx="12" cy="12" r="9" {...common} />
          <circle cx="12" cy="12" r="4" {...common} />
          <path d="M8 5c1 1 3 1 4 0s3-1 4 0" {...common} opacity={0.4} />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M12 4c0-2 2-3 3-3" {...common} />
          <path d="M9 6c-4 2-5 8-3 13 1 2 3 2 3 0 0 2 2 2 3 0 2 4 7 0 3-13-2-1-4-1-6 0z" {...common} />
        </svg>
      );
    case "cupcake":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M5 12h14l-2 10H7z" {...common} />
          <path d="M4 12c0-4 3-7 8-7s8 3 8 7" {...common} />
          <circle cx="12" cy="8" r="1" fill="currentColor" opacity={0.4} />
        </svg>
      );
    case "wine":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M8 2h8l-1 8a4 4 0 01-3 3 4 4 0 01-3-3z" {...common} />
          <path d="M12 13v7" {...common} />
          <path d="M8 20h8" {...common} />
        </svg>
      );
    case "egg":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <ellipse cx="12" cy="13" rx="7" ry="9" {...common} />
          <ellipse cx="12" cy="14" rx="3" ry="4" {...common} opacity={0.3} />
        </svg>
      );
    case "fish":
      return (
        <svg viewBox="0 0 24 24" width="100%" height="100%">
          <path d="M2 12c3-5 8-7 14-6-2-3-5-4-8-4 4 1 8 4 10 8-2 4-6 7-10 8 3 0 6-1 8-4-6 1-11-1-14-6z" {...common} />
          <circle cx="17" cy="10" r="1" fill="currentColor" opacity={0.5} />
        </svg>
      );
  }
}

/* ─── Magnifying Glass SVG ───────────────────────────────── */

function MagnifyingGlassSvg({
  glowOpacity,
}: {
  glowOpacity: MotionValue<number>;
}) {
  return (
    <svg viewBox="0 0 90 90" width="90" height="90">
      {/* Lens warm glow */}
      <motion.circle
        cx="36"
        cy="36"
        r="24"
        fill="#f59e0b"
        style={{ opacity: glowOpacity }}
      />
      {/* Lens bg — slightly transparent so glow shows through */}
      <circle cx="36" cy="36" r="24" fill="#fafafa" opacity={0.75} />
      {/* Highlight arc */}
      <path
        d="M22 24a16 16 0 0114-6"
        fill="none"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Ring */}
      <circle
        cx="36"
        cy="36"
        r="24"
        fill="none"
        stroke="#6b7280"
        strokeWidth="3.5"
      />
      {/* Handle */}
      <line
        x1="54"
        y1="54"
        x2="78"
        y2="78"
        stroke="#6b7280"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <line
        x1="56"
        y1="56"
        x2="74"
        y2="74"
        stroke="#9ca3af"
        strokeWidth="2"
        strokeLinecap="round"
        opacity={0.4}
      />
    </svg>
  );
}

/* ─── Static food icon (used in both background and reveal layer) ── */

function StaticFoodIcon({
  item,
  opacity,
  color,
  magnify,
}: {
  item: FoodItem;
  opacity: number;
  color: string;
  magnify?: boolean;
}) {
  const s = magnify ? item.size * 1.15 : item.size;
  return (
    <div
      className="mgs__food-icon"
      style={{
        left: `calc(50% + ${item.x}px)`,
        top: `calc(50% + ${item.y}px)`,
        width: s,
        height: s,
        marginLeft: -s / 2,
        marginTop: -s / 2,
        transform: `rotate(${item.rot}deg)`,
        color,
        opacity,
      }}
    >
      <FoodSvg icon={item.icon} />
    </div>
  );
}

/* ─── main page ─────────────────────────────────────────── */

export default function MagnifyingGlassSearchPage() {
  const glassX = useMotionValue(0);
  const glassY = useMotionValue(0);
  const glassR = useMotionValue(0);

  // Drive the magnifying glass along its 7-frame path
  useEffect(() => {
    const opts = {
      duration: CYCLE,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "loop" as const,
    };
    const ctrls = [
      animate(glassX, PX, opts),
      animate(glassY, PY, opts),
      animate(glassR, PR, opts),
    ];
    return () => ctrls.forEach((c) => c.stop());
  }, [glassX, glassY, glassR]);

  // Derive glow intensity from nearest food icon
  const glowOpacity = useTransform(
    [glassX, glassY],
    (latest: number[]) => {
      let min = Infinity;
      for (const f of FOOD_ITEMS) {
        min = Math.min(min, Math.hypot(latest[0] - f.x, latest[1] - f.y));
      }
      return min < 50 ? 0.18 + (1 - min / 50) * 0.35 : 0;
    }
  );

  // Clip-path that follows the lens center — reveals food icons inside the glass
  const revealClip = useTransform(
    [glassX, glassY],
    (latest: number[]) => {
      const cx = latest[0] + LENS_OFFSET;
      const cy = latest[1] + LENS_OFFSET;
      return `circle(${LENS_CLIP_R}px at calc(50% + ${cx}px) calc(50% + ${cy}px))`;
    }
  );

  return (
    <div className={`mgs ${spaceGrotesk.className}`}>
      <div className="mgs__shell">
        <div className="mgs__header">
          <div>
            <p className="mgs__eyebrow">magnifying-glass-search</p>
            <h1 className="mgs__title">Search Scan Animation</h1>
          </div>
          <p className="mgs__subtitle">
            A magnifying glass scans over hidden food icons, revealing them
            through its lens as it loops through 7 frames.
          </p>
        </div>

        <div className="mgs__stage">
          <div className="mgs__phone">
            <div className="mgs__notch" />

            <div className="mgs__content">
              <h2 className="mgs__app-title">Table For Four</h2>
              <div className="mgs__rating">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="mgs__rating-dot">
                    <RatingSvg />
                  </span>
                ))}
              </div>

              {/* Animation scene */}
              <div className="mgs__scene">
                {/* Layer 1 — ghost food icons (barely visible background) */}
                {FOOD_ITEMS.map((item) => (
                  <StaticFoodIcon
                    key={`bg-${item.id}`}
                    item={item}
                    opacity={0.06}
                    color="#c4b5a4"
                  />
                ))}

                {/* Layer 2 — reveal layer: same icons at high opacity,
                    clipped to a circle that follows the magnifying glass lens */}
                <motion.div className="mgs__reveal" style={{ clipPath: revealClip }}>
                  {FOOD_ITEMS.map((item) => (
                    <StaticFoodIcon
                      key={`rv-${item.id}`}
                      item={item}
                      opacity={0.7}
                      color="#78716c"
                      magnify
                    />
                  ))}
                </motion.div>

                {/* Layer 3 — magnifying glass */}
                <motion.div
                  className="mgs__glass-wrap"
                  style={{ x: glassX, y: glassY, rotate: glassR }}
                >
                  <MagnifyingGlassSvg glowOpacity={glowOpacity} />
                </motion.div>
              </div>

              <p className="mgs__heading">
                Finding The Best
                <br />
                Spots For You&hellip;
              </p>
              <p className="mgs__desc">
                Your Guide to the Best Restaurants,
                <br />
                Curated with Care to Match Your Taste.
              </p>
              <span className="mgs__link">
                Explore All Top Picks in Your Area
              </span>

              <button className="mgs__btn">Show Results</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── small helpers ─────────────────────────────────────── */

function RatingSvg() {
  return (
    <svg viewBox="0 0 18 18" width="12" height="12">
      <circle cx="9" cy="9" r="7" fill="#d4d4d4" />
      <circle cx="9" cy="9" r="3" fill="#b0b0b0" />
    </svg>
  );
}
