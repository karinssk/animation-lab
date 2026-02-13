"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================================
// EMOJI FOOD ICON — renders native emoji as high-quality images
// ============================================================

function FoodEmoji({ emoji, size = 32 }: { emoji: string; size?: number }) {
  return (
    <span
      role="img"
      style={{
        fontSize: size,
        lineHeight: 1,
        display: "block",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
      }}
    >
      {emoji}
    </span>
  );
}

// ============================================================
// ELEMENT DEFINITIONS
// ============================================================

interface DecorativeItem {
  id: string;
  emoji: string;
  size: number;
  x: number;
  y: number;
  floatX: number;
  floatY: number;
  duration: number;
  entryFrom: { x: number; y: number };
  exitTo: { x: number; y: number };
}

const DECORATIVE_ITEMS: DecorativeItem[] = [
  // USA food
  { id: "burger", emoji: "🍔", size: 40, x: 30, y: 6, floatX: 10, floatY: 12, duration: 5.0, entryFrom: { x: 30, y: -25 }, exitTo: { x: 30, y: -30 } },
  { id: "pizza", emoji: "🍕", size: 30, x: 75, y: 18, floatX: 10, floatY: 14, duration: 4.2, entryFrom: { x: 120, y: -10 }, exitTo: { x: 125, y: -15 } },
  { id: "fries", emoji: "🍟", size: 28, x: 5, y: 42, floatX: 12, floatY: 14, duration: 3.3, entryFrom: { x: -20, y: 42 }, exitTo: { x: -25, y: 50 } },
  { id: "hotdog", emoji: "🌭", size: 26, x: 58, y: 55, floatX: 10, floatY: 10, duration: 4.5, entryFrom: { x: 120, y: 55 }, exitTo: { x: 125, y: 60 } },
  { id: "donut", emoji: "🍩", size: 28, x: 82, y: 5, floatX: 14, floatY: 10, duration: 4.0, entryFrom: { x: 120, y: 5 }, exitTo: { x: 125, y: -10 } },
  { id: "taco", emoji: "🌮", size: 24, x: 42, y: 48, floatX: 10, floatY: 12, duration: 3.8, entryFrom: { x: 42, y: -20 }, exitTo: { x: -25, y: 48 } },
  // Chinese food
  { id: "dumpling", emoji: "🥟", size: 32, x: 10, y: 8, floatX: 12, floatY: 16, duration: 3.5, entryFrom: { x: -20, y: -15 }, exitTo: { x: -25, y: -20 } },
  { id: "noodle", emoji: "🍜", size: 38, x: 62, y: 2, floatX: 8, floatY: 12, duration: 3.7, entryFrom: { x: 62, y: -20 }, exitTo: { x: 120, y: -15 } },
  { id: "fortune", emoji: "🥠", size: 24, x: 48, y: 3, floatX: 8, floatY: 12, duration: 3.8, entryFrom: { x: 48, y: -20 }, exitTo: { x: 48, y: -25 } },
  { id: "takeout", emoji: "🥡", size: 28, x: 80, y: 38, floatX: 10, floatY: 14, duration: 3.6, entryFrom: { x: 120, y: 38 }, exitTo: { x: 125, y: 42 } },
  { id: "bao", emoji: "🥮", size: 22, x: 25, y: 60, floatX: 8, floatY: 10, duration: 4.6, entryFrom: { x: -20, y: 60 }, exitTo: { x: -25, y: 65 } },
  // Thai food
  { id: "curry", emoji: "🍛", size: 36, x: 3, y: 22, floatX: 10, floatY: 12, duration: 4.3, entryFrom: { x: -20, y: 22 }, exitTo: { x: -25, y: 18 } },
  { id: "shrimp", emoji: "🍤", size: 26, x: 28, y: 32, floatX: 12, floatY: 10, duration: 4.1, entryFrom: { x: -20, y: 32 }, exitTo: { x: -25, y: 28 } },
  { id: "mango", emoji: "🥭", size: 28, x: 72, y: 12, floatX: 10, floatY: 14, duration: 4.0, entryFrom: { x: 120, y: 12 }, exitTo: { x: 125, y: 8 } },
  { id: "chili", emoji: "🌶️", size: 24, x: 20, y: 4, floatX: 8, floatY: 12, duration: 3.5, entryFrom: { x: -20, y: 4 }, exitTo: { x: -25, y: -10 } },
  { id: "skewer", emoji: "🍢", size: 26, x: 50, y: 38, floatX: 12, floatY: 10, duration: 3.9, entryFrom: { x: 120, y: 38 }, exitTo: { x: 50, y: -20 } },
  { id: "chili2", emoji: "🌶️", size: 20, x: 15, y: 55, floatX: 8, floatY: 10, duration: 4.4, entryFrom: { x: -20, y: 55 }, exitTo: { x: -25, y: 60 } },
  { id: "rice", emoji: "🍚", size: 22, x: 85, y: 52, floatX: 10, floatY: 8, duration: 4.1, entryFrom: { x: 120, y: 52 }, exitTo: { x: 125, y: 55 } },
  { id: "sushi", emoji: "🍣", size: 24, x: 68, y: 58, floatX: 8, floatY: 12, duration: 3.7, entryFrom: { x: 120, y: 58 }, exitTo: { x: 125, y: 62 } },
];

interface FallingItem {
  id: string;
  emoji: string;
  x: number;
  delay: number;
  fallDuration: number;
  size: number;
}

const FALLING_FOODS: FallingItem[] = [
  // Wave 1 — phase 4 (few items)
  { id: "ff1", emoji: "🥟", x: 30, delay: 0, fallDuration: 2.2, size: 30 },
  { id: "ff2", emoji: "🍔", x: 62, delay: 0.4, fallDuration: 2.0, size: 26 },
  { id: "ff3", emoji: "🍣", x: 48, delay: 0.8, fallDuration: 2.5, size: 22 },
  // Wave 2 — phase 5 (more items)
  { id: "ff4", emoji: "🍕", x: 18, delay: 2.0, fallDuration: 1.8, size: 28 },
  { id: "ff5", emoji: "🥟", x: 75, delay: 2.3, fallDuration: 2.0, size: 24 },
  { id: "ff6", emoji: "🍩", x: 42, delay: 2.6, fallDuration: 2.3, size: 30 },
  { id: "ff7", emoji: "🍤", x: 55, delay: 3.0, fallDuration: 1.9, size: 20 },
  // Wave 3 — phase 6 (dense rain)
  { id: "ff8", emoji: "🍣", x: 12, delay: 4.0, fallDuration: 1.6, size: 26 },
  { id: "ff9", emoji: "🍔", x: 35, delay: 4.2, fallDuration: 1.8, size: 32 },
  { id: "ff10", emoji: "🥠", x: 68, delay: 4.4, fallDuration: 1.5, size: 22 },
  { id: "ff11", emoji: "🍕", x: 85, delay: 4.6, fallDuration: 2.0, size: 28 },
  { id: "ff12", emoji: "🌭", x: 25, delay: 4.8, fallDuration: 1.4, size: 24 },
  { id: "ff13", emoji: "🥟", x: 52, delay: 5.0, fallDuration: 1.7, size: 20 },
];

// ============================================================
// PHASE TIMING
// ============================================================

const PHASE_DURATIONS: Record<number, number> = {
  1: 2500,
  2: 2500,
  3: 2500,
  4: 2000,
  5: 2000,
  6: 2000,
  7: 2000,
};

const CENTER_X = 45;
const CENTER_Y = 32;

// ============================================================
// SUB-COMPONENTS
// ============================================================

function FloatingElement({ item, phase }: { item: DecorativeItem; phase: number }) {
  let targetX = item.x;
  let targetY = item.y;
  if (phase === 2) {
    targetX = item.x + (CENTER_X - item.x) * 0.25;
    targetY = item.y + (CENTER_Y - item.y) * 0.25;
  } else if (phase === 3) {
    targetX = item.x + (CENTER_X - item.x) * 0.45;
    targetY = item.y + (CENTER_Y - item.y) * 0.45;
  }

  return (
    <motion.div
      style={{ position: "absolute" }}
      initial={{
        left: `${item.entryFrom.x}%`,
        top: `${item.entryFrom.y}%`,
        opacity: 0,
        scale: 0.3,
      }}
      animate={{
        left: `${targetX}%`,
        top: `${targetY}%`,
        opacity: 1,
        scale: 1,
      }}
      exit={{
        left: `${item.exitTo.x}%`,
        top: `${item.exitTo.y}%`,
        opacity: 0,
        scale: 0.3,
      }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <motion.div
        animate={{
          x: [0, item.floatX, -item.floatX * 0.6, item.floatX * 0.8, 0],
          y: [0, -item.floatY, item.floatY * 0.6, -item.floatY * 0.4, 0],
          rotate: [0, 8, -6, 10, 0],
        }}
        transition={{
          duration: item.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FoodEmoji emoji={item.emoji} size={item.size} />
      </motion.div>
    </motion.div>
  );
}

function FallingFood({ item }: { item: FallingItem }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${item.x}%`,
      }}
      initial={{ top: "-10%", opacity: 0 }}
      animate={{ top: "110%", opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        top: {
          duration: item.fallDuration,
          delay: item.delay,
          repeat: Infinity,
          ease: [0.45, 0, 0.85, 1],
        },
        opacity: {
          duration: 0.3,
          delay: item.delay,
        },
      }}
    >
      <motion.div
        animate={{ rotate: [0, 20, -15, 25, 0], x: [-4, 6, -5, 4, -4] }}
        transition={{ duration: item.fallDuration * 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <FoodEmoji emoji={item.emoji} size={item.size} />
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function WalletAnimationV2() {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    let currentPhase = 1;
    let timeoutId: ReturnType<typeof setTimeout>;

    const advancePhase = () => {
      currentPhase = currentPhase >= 7 ? 1 : currentPhase + 1;
      setPhase(currentPhase);
      timeoutId = setTimeout(advancePhase, PHASE_DURATIONS[currentPhase]);
    };

    timeoutId = setTimeout(advancePhase, PHASE_DURATIONS[1]);
    return () => clearTimeout(timeoutId);
  }, []);

  const showDecorative = phase <= 2 || phase === 7;
  const showFalling = phase >= 3 && phase <= 6;
  const showText = phase !== 3;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Phone Mockup */}
      <div
        className="relative rounded-[3rem] border-[6px] border-zinc-900 bg-white shadow-2xl"
        style={{ width: 300, height: 620 }}
      >
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 z-50 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900" />

        {/* Status Bar */}
        <div className="absolute top-2 left-0 right-0 z-40 flex items-center justify-between px-8 pt-1">
          <span className="text-[10px] font-semibold text-zinc-900">9:41</span>
          <div className="flex items-center gap-1">
            <svg width="12" height="10" viewBox="0 0 12 10" fill="currentColor" className="text-zinc-900">
              <rect x="0" y="6" width="2" height="4" rx="0.5" />
              <rect x="3" y="4" width="2" height="6" rx="0.5" />
              <rect x="6" y="2" width="2" height="8" rx="0.5" />
              <rect x="9" y="0" width="2" height="10" rx="0.5" />
            </svg>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" className="text-zinc-900" strokeWidth="1">
              <rect x="0.5" y="1.5" width="10" height="7" rx="1" />
              <rect x="11" y="3.5" width="2" height="3" rx="0.5" fill="currentColor" />
              <rect x="1.5" y="2.5" width="7" height="5" rx="0.5" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Animation Area — covers ~60% of phone screen */}
        <div
          className="absolute left-0 right-0 top-[34px] overflow-hidden rounded-t-[2.5rem]"
          style={{ height: 400 }}
        >
          {/* Floating food */}
          <AnimatePresence mode="sync">
            {showDecorative &&
              DECORATIVE_ITEMS.map((item) => (
                <FloatingElement key={item.id} item={item} phase={phase} />
              ))}
          </AnimatePresence>

          {/* Falling food */}
          <AnimatePresence>
            {showFalling &&
              FALLING_FOODS.map((item) => (
                <FallingFood key={item.id} item={item} />
              ))}
          </AnimatePresence>
        </div>

        {/* UI Content — hides during frame 3, fades in from bottom at frame 4 */}
        <AnimatePresence>
          {showText && (
            <motion.div
              key="ui-content"
              className="absolute bottom-0 left-0 right-0 z-10 rounded-b-[2.5rem] px-6 pb-8 pt-10 text-center"
              style={{ background: "linear-gradient(to top, white 70%, rgba(255,255,255,0.95) 85%, rgba(255,255,255,0) 100%)" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h2 className="text-[22px] font-bold leading-tight text-zinc-900">
                Eat what you love.
                <br />
                Find it here.
              </h2>
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                Discover new restaurants and cuisines.
                <br />
                one to get started easily.
              </p>
              <button className="mt-4 w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-md shadow-zinc-200 transition-colors hover:bg-zinc-800">
                Find a Restaurant
              </button>
              <p className="mt-3 text-[12px] font-medium text-zinc-700 underline underline-offset-2">
                Add an Existing Account
              </p>
              <p className="mt-4 text-[8px] text-zinc-400">
                Terms of Use &bull; Privacy Policy
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900/20" />
      </div>

      {/* Phase indicator */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((p) => (
          <div
            key={p}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${p === phase ? "bg-emerald-500 scale-125" : "bg-zinc-300"
              }`}
          />
        ))}
        <span className="ml-2 text-xs text-zinc-400">Frame {phase}</span>
      </div>
    </div>
  );
}
