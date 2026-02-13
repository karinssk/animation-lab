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
const GLASS_POSITIONS: Record<number, { x: number; y: number; rotate: number }> = {
  1: { x: 50, y: 40, rotate: 0 },
  2: { x: 22, y: 18, rotate: -10 },
  3: { x: 75, y: 18, rotate: 8 },
  4: { x: 72, y: 45, rotate: 12 },
  5: { x: 65, y: 65, rotate: 5 },
  6: { x: 22, y: 60, rotate: -8 },
  7: { x: 45, y: 42, rotate: -3 },
};

const LENS_DIAMETER = 52; // px — diameter of visible food reveal area (matches SVG lens)
const ANIM_AREA_WIDTH = 240;
const ANIM_AREA_HEIGHT = 180;
const LENS_OFFSET = 6;
const GLASS_SIZE = 80;
const GLASS_RADIUS = GLASS_SIZE / 2;
const GLASS_EDGE_PADDING = 6;

// ============================================================
// FOOD SVG ICONS (reused from WalletAnimation patterns)
// ============================================================

function BurgerIcon({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M8 18 Q8 8 20 8 Q32 8 32 18Z" fill="#D97706" />
      <ellipse cx="14" cy="13" rx="1.5" ry="1" fill="#FDE68A" />
      <ellipse cx="22" cy="11" rx="1.5" ry="1" fill="#FDE68A" />
      <ellipse cx="27" cy="14" rx="1.5" ry="1" fill="#FDE68A" />
      <path d="M6 18 Q10 22 14 18 Q18 22 22 18 Q26 22 30 18 Q34 22 34 19 L6 19Z" fill="#22C55E" />
      <path d="M7 20 L33 20 L35 23 L5 23Z" fill="#FCD34D" />
      <rect x="8" y="23" width="24" height="5" fill="#92400E" rx="2" />
      <path d="M8 28 L32 28 Q32 34 20 34 Q8 34 8 28Z" fill="#D97706" />
    </svg>
  );
}

function PizzaIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path d="M16 2 L30 28 Q16 32 2 28Z" fill="#D97706" />
      <path d="M16 5 L28 27 Q16 30 4 27Z" fill="#FCD34D" />
      <circle cx="14" cy="18" r="2.5" fill="#DC2626" />
      <circle cx="20" cy="22" r="2.5" fill="#DC2626" />
      <circle cx="17" cy="12" r="2" fill="#DC2626" />
      <ellipse cx="10" cy="23" rx="2" ry="1.2" fill="#16A34A" transform="rotate(-20 10 23)" />
    </svg>
  );
}

function FriesIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 36">
      <rect x="8" y="2" width="3" height="18" rx="1" fill="#FCD34D" transform="rotate(-8 9 10)" />
      <rect x="13" y="1" width="3" height="19" rx="1" fill="#FBBF24" />
      <rect x="18" y="2" width="3" height="18" rx="1" fill="#FCD34D" transform="rotate(5 19 10)" />
      <rect x="22" y="4" width="3" height="16" rx="1" fill="#F59E0B" transform="rotate(10 23 12)" />
      <path d="M4 16 L28 16 L26 34 Q16 36 6 34Z" fill="#DC2626" />
      <path d="M4 16 L28 16 L27 20 L5 20Z" fill="#EF4444" />
    </svg>
  );
}

function DonutIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="14" fill="#D97706" />
      <path d="M4 14 Q4 3 16 3 Q28 3 28 14 Q26 18 16 17 Q6 18 4 14Z" fill="#EC4899" />
      <circle cx="16" cy="14" r="5" fill="#FEF3C7" />
      <rect x="8" y="8" width="3" height="1.5" rx="0.5" fill="#3B82F6" transform="rotate(30 9 8)" />
      <rect x="20" y="7" width="3" height="1.5" rx="0.5" fill="#22C55E" transform="rotate(-20 21 7)" />
      <rect x="12" y="5" width="3" height="1.5" rx="0.5" fill="#F59E0B" transform="rotate(45 13 5)" />
      <rect x="22" y="12" width="3" height="1.5" rx="0.5" fill="#EF4444" transform="rotate(-40 23 12)" />
    </svg>
  );
}

function DumplingIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 28">
      <ellipse cx="16" cy="18" rx="14" ry="9" fill="#FEF3C7" />
      <ellipse cx="16" cy="18" rx="14" ry="9" fill="none" stroke="#D97706" strokeWidth="1" />
      <path d="M5 14 Q8 8 11 12 Q14 6 16 12 Q18 6 21 12 Q24 8 27 14" stroke="#D97706" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="19" r="1.2" fill="#92400E" />
      <circle cx="20" cy="19" r="1.2" fill="#92400E" />
      <path d="M14 22 Q16 24 18 22" stroke="#92400E" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function NoodleBowlIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 36">
      <rect x="26" y="1" width="1.5" height="20" rx="0.5" fill="#D97706" transform="rotate(15 27 10)" />
      <rect x="29" y="1" width="1.5" height="20" rx="0.5" fill="#B45309" transform="rotate(25 30 10)" />
      <path d="M10 14 Q12 10 14 14 Q16 10 18 14" stroke="#FCD34D" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M18 13 Q20 9 22 13 Q24 9 26 13" stroke="#FBBF24" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M2 16 L38 16 L34 32 Q20 36 6 32Z" fill="#EF4444" />
      <path d="M2 16 L38 16 L37 20 L3 20Z" fill="#DC2626" />
    </svg>
  );
}

function SushiIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28">
      <circle cx="14" cy="14" r="12" fill="#1F2937" />
      <circle cx="14" cy="14" r="10" fill="white" />
      <circle cx="14" cy="14" r="7" fill="#FB923C" />
      <circle cx="14" cy="14" r="4" fill="#EF4444" />
    </svg>
  );
}

function TacoIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 28">
      <path d="M3 22 Q3 8 16 8 Q29 8 29 22Z" fill="#FCD34D" />
      <path d="M6 20 Q6 12 16 12 Q26 12 26 20Z" fill="#D97706" />
      <circle cx="11" cy="17" r="2" fill="#DC2626" />
      <circle cx="18" cy="16" r="1.8" fill="#22C55E" />
      <circle cx="22" cy="18" r="1.5" fill="#FBBF24" />
      <path d="M3 22 Q3 8 16 8 Q29 8 29 22" fill="none" stroke="#B45309" strokeWidth="1.5" />
    </svg>
  );
}

function ChiliIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 28">
      <path d="M8 6 Q6 4 8 2 Q10 0 9 2 Q12 4 8 6Z" fill="#16A34A" />
      <path d="M5 6 Q3 14 4 20 Q5 26 8 26 Q11 26 12 20 Q13 14 11 6Z" fill="#DC2626" />
      <path d="M6 7 Q5 14 6 18 Q7 22 8 22" stroke="#EF4444" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  );
}

function CakeIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <rect x="4" y="14" width="24" height="14" rx="3" fill="#FBBF24" />
      <rect x="4" y="14" width="24" height="5" rx="2" fill="#EC4899" />
      <rect x="6" y="12" width="20" height="4" rx="2" fill="#FDE68A" />
      <rect x="14" y="4" width="4" height="10" rx="1" fill="#D97706" />
      <ellipse cx="16" cy="4" rx="3" ry="2" fill="#F97316" />
      <circle cx="16" cy="3" r="1.5" fill="#FBBF24" />
    </svg>
  );
}

function CoffeeIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <path d="M6 10 L26 10 L24 28 Q16 30 8 28Z" fill="#F5F5F4" />
      <path d="M6 10 L26 10 L25 14 L7 14Z" fill="#E7E5E4" />
      <path d="M26 14 Q32 14 32 20 Q32 26 26 24" stroke="#D6D3D1" strokeWidth="2" fill="none" />
      <ellipse cx="16" cy="11" rx="9" ry="2" fill="#92400E" />
      <path d="M12 5 Q14 2 12 0" stroke="#D6D3D1" strokeWidth="1" fill="none" />
      <path d="M16 4 Q18 1 16 -1" stroke="#D6D3D1" strokeWidth="1" fill="none" />
      <path d="M20 5 Q22 2 20 0" stroke="#D6D3D1" strokeWidth="1" fill="none" />
    </svg>
  );
}

function IceCreamIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 36">
      <path d="M8 18 L14 34 L20 18Z" fill="#D97706" />
      <line x1="9" y1="20" x2="13" y2="32" stroke="#B45309" strokeWidth="0.5" />
      <line x1="19" y1="20" x2="15" y2="32" stroke="#B45309" strokeWidth="0.5" />
      <circle cx="14" cy="14" r="8" fill="#FBBF24" />
      <circle cx="10" cy="10" r="4" fill="#EC4899" />
      <circle cx="18" cy="12" r="3.5" fill="#A7F3D0" />
      <circle cx="14" cy="7" r="3" fill="#FDE68A" />
    </svg>
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
// BACKGROUND FOOD ITEMS
// ============================================================

interface FoodItem {
  id: string;
  icon: React.ReactNode;
  x: number; // % position
  y: number; // % position
}

const FOOD_ITEMS: FoodItem[] = [
  // Cluster A: near phase 2 (top-left)
  { id: "burger",    icon: <BurgerIcon size={28} />,      x: 18, y: 17 },
  { id: "fries",     icon: <FriesIcon size={22} />,       x: 24, y: 20 },
  { id: "dumpling",  icon: <DumplingIcon size={24} />,    x: 14, y: 24 },
  { id: "coffee",    icon: <CoffeeIcon size={20} />,      x: 28, y: 15 },
  { id: "pizza",     icon: <PizzaIcon size={20} />,       x: 30, y: 26 },

  // Cluster B: near phase 3 (top-right)
  { id: "donut",     icon: <DonutIcon size={22} />,       x: 72, y: 16 },
  { id: "noodle",    icon: <NoodleBowlIcon size={26} />,  x: 78, y: 22 },
  { id: "sushi",     icon: <SushiIcon size={20} />,       x: 68, y: 24 },
  { id: "cake",      icon: <CakeIcon size={20} />,        x: 82, y: 15 },
  { id: "taco",      icon: <TacoIcon size={20} />,        x: 86, y: 27 },

  // Cluster C: near phase 4 and 7 (center-right / center)
  { id: "icecream",  icon: <IceCreamIcon size={20} />,    x: 70, y: 40 },
  { id: "pizza2",    icon: <PizzaIcon size={18} />,       x: 76, y: 45 },
  { id: "burger2",   icon: <BurgerIcon size={20} />,      x: 62, y: 43 },
  { id: "chili",     icon: <ChiliIcon size={16} />,       x: 54, y: 40 },
  { id: "dumpling2", icon: <DumplingIcon size={20} />,    x: 47, y: 45 },

  // Cluster D: near phase 5 (bottom-right)
  { id: "coffee2",   icon: <CoffeeIcon size={18} />,      x: 62, y: 61 },
  { id: "fries2",    icon: <FriesIcon size={18} />,       x: 70, y: 65 },
  { id: "pizza3",    icon: <PizzaIcon size={18} />,       x: 74, y: 58 },
  { id: "donut2",    icon: <DonutIcon size={18} />,       x: 58, y: 68 },

  // Cluster E: near phase 6 (bottom-left)
  { id: "sushi2",    icon: <SushiIcon size={18} />,       x: 16, y: 60 },
  { id: "cake2",     icon: <CakeIcon size={18} />,        x: 22, y: 66 },
  { id: "icecream2", icon: <IceCreamIcon size={16} />,    x: 28, y: 62 },
  { id: "taco2",     icon: <TacoIcon size={18} />,        x: 18, y: 70 },
  { id: "chili2",    icon: <ChiliIcon size={14} />,       x: 30, y: 56 },
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
                                left: `${item.x}%`,
                                top: `${item.y}%`,
                                opacity: 0.85,
                                transform: "scale(1.15)",
                              }}
                            >
                              {item.icon}
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
