"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================================
// PHASE TIMING
// ============================================================

const PHASE_DURATIONS: Record<number, number> = {
  1: 2500,
  2: 2500,
  3: 2000,
  4: 1500,
  5: 1500,
  6: 1500,
  7: 2500,
};

// ============================================================
// SUB-COMPONENTS
// ============================================================

function WalletCard({
  width = 220,
  height = 140,
  variant = "gold",
  showBadge = true,
}: {
  width?: number;
  height?: number;
  variant?: "gold" | "red" | "blue" | "green" | "purple";
  showBadge?: boolean;
}) {
  const gradients: Record<string, string> = {
    gold: "linear-gradient(135deg, #FDE68A 0%, #F59E0B 50%, #D97706 100%)",
    red: "linear-gradient(135deg, #FCA5A5 0%, #EF4444 50%, #DC2626 100%)",
    blue: "linear-gradient(135deg, #93C5FD 0%, #3B82F6 50%, #2563EB 100%)",
    green: "linear-gradient(135deg, #6EE7B7 0%, #10B981 50%, #059669 100%)",
    purple: "linear-gradient(135deg, #C4B5FD 0%, #8B5CF6 50%, #7C3AED 100%)",
  };

  const coinSize = Math.max(Math.round(width * 0.18), 14);
  const isSmall = width < 100;

  return (
    <div
      className="relative overflow-hidden rounded-xl shadow-lg"
      style={{ width, height, background: gradients[variant] }}
    >
      {/* Coin icon */}
      <div
        className="absolute top-2 left-2 rounded-full flex items-center justify-center shadow-sm"
        style={{
          width: coinSize,
          height: coinSize,
          background: "radial-gradient(circle at 40% 40%, #FBBF24, #B45309)",
        }}
      >
        <span
          className="text-amber-900 font-bold"
          style={{ fontSize: coinSize * 0.5 }}
        >
          ★
        </span>
      </div>

      {/* Sparkles */}
      {!isSmall && (
        <>
          <span className="absolute top-1.5 right-10 text-white/40 text-sm">
            ✦
          </span>
          <span className="absolute top-5 right-14 text-white/25 text-xs">
            ✧
          </span>
          <span className="absolute bottom-3 left-1/3 text-white/20 text-xs">
            ✦
          </span>
        </>
      )}

      {/* "New" badge */}
      {showBadge && (
        <div
          className={`absolute top-1.5 right-1.5 rounded-md bg-emerald-500 text-white font-bold ${
            isSmall ? "text-[5px] px-1 py-0.5" : "text-[9px] px-2 py-0.5"
          }`}
        >
          New
        </div>
      )}
    </div>
  );
}

function BluePatternBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle darker pattern shapes */}
      <div className="absolute top-[8%] left-[12%] w-10 h-10 rounded-full border-2 border-blue-500/20" />
      <div className="absolute top-[18%] right-[18%] text-blue-500/15 text-3xl select-none">
        ★
      </div>
      <div className="absolute top-[35%] left-[55%] w-12 h-8 rounded-lg border-2 border-blue-500/15" />
      <div className="absolute top-[50%] left-[20%] text-blue-500/15 text-xl select-none">
        ◆
      </div>
      <div className="absolute top-[28%] left-[35%] w-5 h-5 rounded-full bg-blue-500/10" />
      <div className="absolute top-[60%] right-[25%] w-8 h-8 rounded-full border-2 border-blue-500/15" />
      <div className="absolute top-[12%] left-[65%] w-8 h-5 rounded border border-blue-500/15" />
      <div className="absolute top-[45%] left-[8%] w-10 h-6 rounded-lg border border-blue-500/10" />
      <div className="absolute top-[72%] left-[45%] text-blue-500/15 text-sm select-none">
        ✦
      </div>
      <div className="absolute top-[32%] right-[8%] text-blue-500/10 text-2xl select-none">
        ⬡
      </div>
      <div className="absolute top-[65%] left-[70%] w-6 h-6 rounded border border-blue-500/[0.12]" />
      <div className="absolute top-[22%] left-[80%] text-blue-500/10 text-lg select-none">
        ●
      </div>
      <div className="absolute top-[55%] left-[40%] w-4 h-4 rounded-full border border-blue-500/10" />
      <div className="absolute top-[75%] left-[15%] text-blue-500/[0.12] text-xl select-none">
        ★
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CashbackWalletAnimation() {
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

  // Paint clip-path expands from bottom-left corner
  const getPaintClipPath = () => {
    switch (phase) {
      case 3:
        return "circle(35% at 10% 95%)";
      case 4:
        return "circle(55% at 25% 80%)";
      case 5:
        return "circle(75% at 35% 60%)";
      case 6:
        return "circle(95% at 45% 50%)";
      case 7:
        return "circle(120% at 50% 50%)";
      default:
        return "circle(0% at 0% 100%)";
    }
  };

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
            <svg
              width="12"
              height="10"
              viewBox="0 0 12 10"
              fill="currentColor"
              className="text-zinc-900"
            >
              <rect x="0" y="6" width="2" height="4" rx="0.5" />
              <rect x="3" y="4" width="2" height="6" rx="0.5" />
              <rect x="6" y="2" width="2" height="8" rx="0.5" />
              <rect x="9" y="0" width="2" height="10" rx="0.5" />
            </svg>
            <svg
              width="14"
              height="10"
              viewBox="0 0 14 10"
              fill="none"
              stroke="currentColor"
              className="text-zinc-900"
              strokeWidth="1"
            >
              <rect x="0.5" y="1.5" width="10" height="7" rx="1" />
              <rect
                x="11"
                y="3.5"
                width="2"
                height="3"
                rx="0.5"
                fill="currentColor"
              />
              <rect
                x="1.5"
                y="2.5"
                width="7"
                height="5"
                rx="0.5"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="absolute left-0 right-0 top-[34px] bottom-0 overflow-hidden rounded-t-[2.5rem]">
          {/* ---- Frame 1: Single card centered ---- */}
          <AnimatePresence>
            {phase === 1 && (
              <motion.div
                key="frame-single"
                className="absolute inset-0 flex flex-col items-center pt-20"
                style={{
                  background:
                    "linear-gradient(180deg, #FEF3C7 0%, #FFFBEB 40%, white 100%)",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <WalletCard width={220} height={140} variant="gold" />
                <div className="mt-5 text-center">
                  <p className="text-3xl font-bold text-zinc-900">$0.36</p>
                  <p className="text-sm text-zinc-500 mt-0.5">Cashback</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- Frame 2: Grid layout (persists behind paint in 3-6) ---- */}
          <AnimatePresence>
            {phase >= 2 && phase <= 6 && (
              <motion.div
                key="frame-grid"
                className="absolute inset-0 bg-white px-4 pt-4 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5 }}
              >
                {/* Top row — two wallet cards */}
                <div className="flex gap-3">
                  {[
                    {
                      variant: "gold" as const,
                      price: "$0.54",
                      label: "Cashback",
                    },
                    {
                      variant: "red" as const,
                      price: "$1.20",
                      label: "Rewards",
                    },
                  ].map((c, i) => (
                    <motion.div
                      key={c.variant}
                      className="flex-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.12, duration: 0.4 }}
                    >
                      <WalletCard
                        width={125}
                        height={80}
                        variant={c.variant}
                      />
                      <p className="mt-1.5 text-sm font-bold text-zinc-900">
                        {c.price}
                      </p>
                      <p className="text-[10px] text-zinc-500">{c.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom tiles */}
                <motion.div
                  className="grid grid-cols-2 gap-2 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                >
                  {[
                    {
                      variant: "blue" as const,
                      label: "10 left",
                      sub: "Limited",
                    },
                    {
                      variant: "green" as const,
                      label: "Get $2",
                      sub: "Bonus",
                    },
                    {
                      variant: "purple" as const,
                      label: "Free",
                      sub: "Promo",
                    },
                    {
                      variant: "gold" as const,
                      label: "5×",
                      sub: "Points",
                    },
                  ].map((tile) => (
                    <div
                      key={tile.label}
                      className="flex items-center gap-2 rounded-xl bg-zinc-50 p-2"
                    >
                      <WalletCard
                        width={48}
                        height={32}
                        variant={tile.variant}
                        showBadge={false}
                      />
                      <div>
                        <p className="text-[10px] font-bold text-zinc-900">
                          {tile.label}
                        </p>
                        <p className="text-[8px] text-zinc-500">{tile.sub}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- Frames 3–7: Blue paint overlay ---- */}
          <AnimatePresence>
            {phase >= 3 && (
              <motion.div
                key="blue-paint"
                className="absolute inset-0 bg-blue-600 z-10"
                initial={{ clipPath: "circle(0% at 0% 100%)" }}
                animate={{ clipPath: getPaintClipPath() }}
                exit={{
                  clipPath: "circle(0% at 0% 100%)",
                  transition: { duration: 0.8, ease: "easeIn" },
                }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
              >
                <BluePatternBg />

                {/* "New" badge floating on blue */}
                <motion.div
                  className="absolute top-4 right-4 rounded-lg bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white shadow-lg"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                >
                  New
                </motion.div>

                {/* Small red indicator */}
                <motion.div
                  className="absolute top-5 right-[72px] h-[3px] w-4 rounded-full bg-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- Frames 5–7: Cloud wave + Cashback info ---- */}
          <AnimatePresence>
            {phase >= 5 && (
              <motion.div
                key="cloud-section"
                className="absolute bottom-0 left-0 right-0 z-20"
                initial={{ y: 120, opacity: 0 }}
                animate={{
                  y: phase === 5 ? 30 : phase === 6 ? 10 : 0,
                  opacity: 1,
                }}
                exit={{ y: 120, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Cloud / wave shape */}
                <svg
                  viewBox="0 0 300 100"
                  className="w-full block"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 100 L0 70 Q30 40 65 55 Q100 30 140 50 Q175 25 210 45 Q245 25 275 40 Q290 35 300 45 L300 100 Z"
                    fill="white"
                  />
                </svg>

                {/* Cashback text */}
                <div className="bg-white px-6 pb-10 -mt-[1px] text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="text-3xl font-bold text-zinc-900">$0.36</p>
                    <p className="text-sm text-zinc-500 mt-1">Cashback</p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- Frames 6–7: Golden card emerging from clouds ---- */}
          <AnimatePresence>
            {phase >= 6 && (
              <motion.div
                key="emerging-card"
                className="absolute z-30"
                style={{ right: "8%", top: "28%" }}
                initial={{ y: 80, opacity: 0, rotate: 15 }}
                animate={{
                  y: phase === 7 ? -10 : 30,
                  opacity: 1,
                  rotate: phase === 7 ? 5 : 12,
                }}
                exit={{ y: 80, opacity: 0, rotate: 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <WalletCard width={130} height={85} variant="gold" />

                {/* Sparkles around card */}
                <motion.span
                  className="absolute -top-3 -left-3 text-amber-400 text-lg"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✦
                </motion.span>
                <motion.span
                  className="absolute -top-1 right-2 text-amber-300 text-sm"
                  animate={{
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.9, 1.3, 0.9],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.4,
                  }}
                >
                  ✧
                </motion.span>
                <motion.span
                  className="absolute bottom-0 -left-4 text-amber-400 text-xs"
                  animate={{
                    opacity: [0.2, 0.7, 0.2],
                    scale: [0.9, 1.1, 0.9],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: 0.7,
                  }}
                >
                  ✦
                </motion.span>
              </motion.div>
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
              p === phase ? "bg-blue-500 scale-125" : "bg-zinc-300"
            }`}
          />
        ))}
        <span className="ml-2 text-xs text-zinc-400">Frame {phase}</span>
      </div>
    </div>
  );
}
