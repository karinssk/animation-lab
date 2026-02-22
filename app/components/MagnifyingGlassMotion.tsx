"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================================
// PHASE TIMING
// ============================================================

const PHASE_DURATIONS: Record<number, number> = {
  1: 2000,
  2: 2000,
  3: 2000,
  4: 2000,
  5: 2000,
  6: 2000,
  7: 2000,
};

// Magnifying glass position per phase (% of content area)
// Covers all corners + edges so the glass searches everywhere
const GLASS_POSITIONS: Record<number, { x: number; y: number; rotate: number }> = {
  1: { x: 20, y: 15, rotate: -12 }, // top-left
  2: { x: 78, y: 12, rotate: 10  }, // top-right
  3: { x: 82, y: 72, rotate: 14  }, // bottom-right
  4: { x: 18, y: 75, rotate: -10 }, // bottom-left
  5: { x: 50, y: 15, rotate: 0   }, // top-center
  6: { x: 50, y: 75, rotate: 5   }, // bottom-center
  7: { x: 50, y: 45, rotate: -4  }, // center (final "found" pose)
};

const LENS_DIAMETER = 52; // px — diameter of visible food reveal area (matches SVG lens)
const ANIM_AREA_WIDTH = 240;
const ANIM_AREA_HEIGHT = 180;
const LENS_OFFSET = 6;
const GLASS_SIZE = 80;
const GLASS_RADIUS = GLASS_SIZE / 2;
const GLASS_EDGE_PADDING = 6;

// ============================================================
// EMOJI FOOD ICON — same type as WalletAnimationV2
// ============================================================

function FoodEmoji({ emoji, size = 24 }: { emoji: string; size?: number }) {
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
// MAGNIFYING GLASS SVG
// ============================================================

function MagnifyingGlassSVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      {/* Lens circle */}
      <circle cx="34" cy="34" r="26" stroke="#A1A1AA" strokeWidth="5" fill="white" fillOpacity="0.15" />
      {/* Lens shine */}
      <path
        d="M22 20 Q28 14 36 18"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Handle */}
      <line
        x1="52"
        y1="52"
        x2="72"
        y2="72"
        stroke="#71717A"
        strokeWidth="7"
        strokeLinecap="round"
      />
      {/* Handle highlight */}
      <line
        x1="54"
        y1="54"
        x2="70"
        y2="70"
        stroke="#A1A1AA"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ============================================================
// BACKGROUND FOOD ITEMS — scattered across the whole area
// ============================================================

interface FoodItem {
  id: string;
  emoji: string;
  size: number;
  x: number; // px position within 240×180 area
  y: number; // px position within 240×180 area
}

// Positions are in px within the 240×180 animation area
// Grid-like scatter ensures even coverage with no empty zones
const FOOD_ITEMS: FoodItem[] = [
  // Row 1 (y ~10px)
  { id: "f1",  emoji: "🍔", size: 20, x: 10,  y: 5  },
  { id: "f2",  emoji: "🍕", size: 18, x: 50,  y: 8  },
  { id: "f3",  emoji: "🥟", size: 20, x: 95,  y: 4  },
  { id: "f4",  emoji: "🍜", size: 18, x: 140, y: 7  },
  { id: "f5",  emoji: "🍣", size: 20, x: 185, y: 5  },
  { id: "f6",  emoji: "🌮", size: 18, x: 220, y: 8  },

  // Row 2 (y ~35px)
  { id: "f7",  emoji: "🍩", size: 18, x: 28,  y: 30 },
  { id: "f8",  emoji: "🍛", size: 20, x: 72,  y: 28 },
  { id: "f9",  emoji: "🌭", size: 18, x: 118, y: 32 },
  { id: "f10", emoji: "🍤", size: 16, x: 162, y: 28 },
  { id: "f11", emoji: "🥠", size: 18, x: 205, y: 31 },

  // Row 3 (y ~60px)
  { id: "f12", emoji: "🥡", size: 20, x: 8,   y: 56 },
  { id: "f13", emoji: "🥮", size: 18, x: 55,  y: 60 },
  { id: "f14", emoji: "🍟", size: 18, x: 100, y: 57 },
  { id: "f15", emoji: "🍔", size: 20, x: 148, y: 60 },
  { id: "f16", emoji: "🍕", size: 18, x: 192, y: 56 },
  { id: "f17", emoji: "🥟", size: 16, x: 228, y: 60 },

  // Row 4 (y ~88px)
  { id: "f18", emoji: "🍜", size: 20, x: 30,  y: 84 },
  { id: "f19", emoji: "🌮", size: 18, x: 78,  y: 87 },
  { id: "f20", emoji: "🍛", size: 20, x: 122, y: 84 },
  { id: "f21", emoji: "🍤", size: 16, x: 170, y: 88 },
  { id: "f22", emoji: "🌭", size: 18, x: 212, y: 85 },

  // Row 5 (y ~115px)
  { id: "f23", emoji: "🍣", size: 18, x: 12,  y: 112 },
  { id: "f24", emoji: "🍩", size: 20, x: 58,  y: 115 },
  { id: "f25", emoji: "🥠", size: 18, x: 105, y: 112 },
  { id: "f26", emoji: "🥡", size: 20, x: 152, y: 115 },
  { id: "f27", emoji: "🥮", size: 16, x: 198, y: 112 },
  { id: "f28", emoji: "🍟", size: 18, x: 228, y: 116 },

  // Row 6 (y ~142px)
  { id: "f29", emoji: "🍔", size: 18, x: 35,  y: 140 },
  { id: "f30", emoji: "🍕", size: 20, x: 82,  y: 143 },
  { id: "f31", emoji: "🌮", size: 18, x: 128, y: 140 },
  { id: "f32", emoji: "🍜", size: 20, x: 175, y: 143 },
  { id: "f33", emoji: "🌶️", size: 16, x: 218, y: 140 },

  // Row 7 (y ~165px)
  { id: "f34", emoji: "🥟", size: 18, x: 10,  y: 162 },
  { id: "f35", emoji: "🍤", size: 16, x: 60,  y: 165 },
  { id: "f36", emoji: "🍣", size: 18, x: 108, y: 162 },
  { id: "f37", emoji: "🍛", size: 20, x: 158, y: 165 },
  { id: "f38", emoji: "🥭", size: 18, x: 205, y: 162 },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function MagnifyingGlassMotion() {
  const [phase, setPhase] = useState(1);
  const [showOverlay, setShowOverlay] = useState(true);

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

  const glassPos = GLASS_POSITIONS[phase];

  // Glass x/y offset from center (used by both glass and food viewport)
  const maxGlassOffsetX = ANIM_AREA_WIDTH / 2 - GLASS_RADIUS - GLASS_EDGE_PADDING;
  const maxGlassOffsetY = ANIM_AREA_HEIGHT / 2 - GLASS_RADIUS - GLASS_EDGE_PADDING;
  const normalizedX = (glassPos.x - 50) / 50;
  const normalizedY = (glassPos.y - 50) / 50;
  const glassX = normalizedX * maxGlassOffsetX;
  const glassY = normalizedY * maxGlassOffsetY;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Phone Mockup */}
      <div
        className="relative overflow-hidden rounded-[3rem] border-[6px] border-zinc-900 bg-white shadow-2xl"
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

        {/* Main Content Area */}
        <div className="absolute left-0 right-0 top-[34px] bottom-0 overflow-hidden rounded-t-[2.5rem] bg-white">
          {/* ---- Top Header: "Table For Four" ---- */}
          <div className="relative z-30 px-6 pt-6 pb-3">
            <h2 className="text-lg font-bold text-zinc-900">Table For Four</h2>
            <div className="flex items-center gap-0.5 mt-0.5">
              {[1, 2, 3, 4].map((s) => (
                <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill="#FBBF24">
                  <path d="M6 0.5 L7.5 4 L11.5 4.5 L8.5 7 L9.5 11 L6 9 L2.5 11 L3.5 7 L0.5 4.5 L4.5 4Z" />
                </svg>
              ))}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="#D4D4D8">
                <path d="M6 0.5 L7.5 4 L11.5 4.5 L8.5 7 L9.5 11 L6 9 L2.5 11 L3.5 7 L0.5 4.5 L4.5 4Z" />
              </svg>
            </div>
          </div>

          {/* ---- Two-layer overlay (can be closed) ---- */}
          <AnimatePresence>
            {showOverlay && (
              <>
                <motion.div
                  className="absolute inset-0 z-30 bg-zinc-900/32 backdrop-blur-[0.5px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />

                <motion.button
                  type="button"
                  aria-label="Close overlay"
                  onClick={() => setShowOverlay(false)}
                  className="absolute left-3 top-[72px] z-40 rounded px-1 py-0.5 text-[12px] text-zinc-400 transition-colors hover:text-zinc-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  x
                </motion.button>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 z-40 h-[330px] rounded-t-[1.6rem] bg-zinc-100 pt-3 shadow-[0_-10px_25px_rgba(0,0,0,0.12)]"
                  initial={{ y: 220, opacity: 0.65 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 220, opacity: 0.65 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex h-full flex-col px-4 pb-7 pt-2 text-center">
                    <div className="relative mx-auto h-[178px] w-[240px] overflow-hidden rounded-xl bg-zinc-200/35">
                      <motion.div
                        className="absolute pointer-events-none"
                        style={{
                          width: LENS_DIAMETER,
                          height: LENS_DIAMETER,
                          borderRadius: "50%",
                          overflow: "hidden",
                          left: "50%",
                          top: "50%",
                          marginLeft: -(LENS_DIAMETER / 2) - LENS_OFFSET,
                          marginTop: -(LENS_DIAMETER / 2) - LENS_OFFSET,
                          zIndex: 19,
                        }}
                        animate={{
                          x: glassX,
                          y: glassY,
                        }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                      >
                        <motion.div
                          style={{
                            position: "absolute",
                            width: ANIM_AREA_WIDTH,
                            height: ANIM_AREA_HEIGHT,
                            left: -(ANIM_AREA_WIDTH / 2 - LENS_DIAMETER / 2 - LENS_OFFSET),
                            top: -(ANIM_AREA_HEIGHT / 2 - LENS_DIAMETER / 2 - LENS_OFFSET),
                          }}
                          animate={{
                            x: -glassX,
                            y: -glassY,
                          }}
                          transition={{ duration: 1.4, ease: "easeInOut" }}
                        >
                          {FOOD_ITEMS.map((item) => (
                            <div
                              key={item.id}
                              className="absolute"
                              style={{
                                left: `${item.x}px`,
                                top: `${item.y}px`,
                                opacity: 0.85,
                                transform: "scale(1.15)",
                              }}
                            >
                              <FoodEmoji emoji={item.emoji} size={item.size} />
                            </div>
                          ))}
                        </motion.div>
                      </motion.div>

                      <motion.div
                        className="absolute z-20 pointer-events-none"
                        style={{
                          left: "50%",
                          top: "50%",
                          marginLeft: -GLASS_RADIUS,
                          marginTop: -GLASS_RADIUS,
                        }}
                        animate={{
                          x: glassX,
                          y: glassY,
                          rotate: glassPos.rotate,
                        }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -6, 0, 6, 0],
                            x: [0, 3, 0, -3, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <MagnifyingGlassSVG size={GLASS_SIZE} />
                        </motion.div>
                      </motion.div>
                    </div>
                    {/* <div className="mt-2 flex justify-center">
                      <MagnifyingGlassSVG size={34} />
                    </div> */}
                    <p className="mt-2 text-base font-bold leading-tight text-zinc-800">
                      Finding The Best
                      <br />
                      Spots for You...
                    </p>
                    <p className="mb-4 mt-1 px-4 text-[9px] leading-relaxed text-zinc-500/90">
                      We&apos;re scanning nearby restaurants to find the perfect table for your group.
                    </p>
                    <motion.button
                      className="mx-auto mt-auto w-[78%] rounded-xl bg-zinc-500 py-2 text-[11px] font-semibold text-white shadow-md transition-colors hover:bg-zinc-400"
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Show Results
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900/20 z-40" />
      </div>

      {/* Phase indicator */}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((p) => (
          <div
            key={p}
            className={`h-2 w-2 rounded-full transition-colors duration-300 ${
              p === phase ? "bg-zinc-900 scale-125" : "bg-zinc-300"
            }`}
          />
        ))}
        <span className="ml-2 text-xs text-zinc-400">Frame {phase}</span>
      </div>
    </div>
  );
}
