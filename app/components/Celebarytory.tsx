"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================================
// SVG INGREDIENTS
// ============================================================

const ChiliIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M6.5 19.5C4 17 3 13 4.5 9.5C6 6 10 3 15 2C16 4 19 6 20.5 9.5C22 13 20 17 18.5 19.5C17 22 13 23 9.5 22.5"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M15 2C15 2 13.5 6 11 7" stroke="#B91C1C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const LemonIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#FACC15" stroke="#EAB308" strokeWidth="1.5" />
        <path
            d="M12 12L12 2M12 12L20.66 7M12 12L20.66 17M12 12L3.34 17M12 12L3.34 7"
            stroke="#FEF08A"
            strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="2" fill="#FEF08A" />
    </svg>
);

const TomatoIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
        <path
            d="M12 6C12 6 14 8 16 7M12 6C12 6 10 8 8 7"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path d="M12 3V6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const MushroomIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M12 11V21M6 11C6 6 8.5 3 12 3C15.5 3 18 6 18 11H6Z"
            fill="#F5F5F4"
            stroke="#D6D3D1"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <ellipse cx="12" cy="11" rx="6" ry="1.5" fill="#E7E5E4" />
    </svg>
);

const HerbIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M12 20C12 20 12 10 16 6M12 20C12 20 12 12 8 8M12 20V12"
            stroke="#22C55E"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M16 6C18 4 20 6 18 8C16 10 16 6 16 6Z"
            fill="#4ADE80"
            stroke="#22C55E"
        />
        <path
            d="M8 8C6 6 4 8 6 10C8 12 8 8 8 8Z"
            fill="#4ADE80"
            stroke="#22C55E"
        />
    </svg>
);

const INGREDIENTS = [
    { id: 1, Icon: ChiliIcon },
    { id: 2, Icon: LemonIcon },
    { id: 3, Icon: TomatoIcon },
    { id: 4, Icon: MushroomIcon },
    { id: 5, Icon: HerbIcon },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Celebarytory() {
    const [stage, setStage] = useState<1 | 2 | 3 | 4 | 5>(1);

    useEffect(() => {
        // Sequence timing
        // Frame 1: Initial (0s)
        // Frame 2: Anticipation (0.8s)
        const t1 = setTimeout(() => setStage(2), 800);
        // Frame 3: Burst (1.6s)
        const t2 = setTimeout(() => setStage(3), 1600);
        // Frame 4: Gravity (1.7s - immediate follow through)
        const t3 = setTimeout(() => setStage(4), 1700);
        // Frame 5: Settle (3.5s)
        const t4 = setTimeout(() => setStage(5), 3500);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, []);

    // Generate confetti pieces
    const confetti = Array.from({ length: 40 }).map((_, i) => {
        const Ingredient = INGREDIENTS[i % INGREDIENTS.length].Icon;
        const dx = (Math.random() - 0.5) * 300; // Burst x spread
        const dy = (Math.random() - 1) * 400 - 100; // Burst y spread (upwards)
        const rot = Math.random() * 360;
        const scale = 0.5 + Math.random() * 0.8;
        return {
            id: i,
            Component: Ingredient,
            dx,
            dy,
            rot,
            scale,
            delay: Math.random() * 0.2, // Staggered burst
        };
    });

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Phone Mockup */}
            <div
                className="relative overflow-hidden rounded-[3rem] border-[6px] border-zinc-900 bg-zinc-950 shadow-2xl"
                style={{ width: 300, height: 620 }}
            >
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 z-50 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-black border border-white/10" />

                {/* Status Bar */}
                <div className="absolute top-2 left-0 right-0 z-40 flex items-center justify-between px-8 pt-1 opacity-60">
                    <span className="text-[10px] font-semibold text-white">9:41</span>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-2.5 rounded-[1px] border border-white" />
                    </div>
                </div>

                {/* --- MAIN ANIMATION AREA --- */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">

                    {/* 1. Central Character / Ghost */}
                    <div className="relative z-20 mb-10">
                        {/* Ambient Particles (Frame 1) */}
                        {stage === 1 && (
                            <motion.div className="absolute inset-0 pointer-events-none">
                                {[...Array(5)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                                        style={{ top: "50%", left: "50%" }}
                                        animate={{
                                            x: (Math.random() - 0.5) * 60,
                                            y: (Math.random() - 0.5) * 60,
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.3
                                        }}
                                    />
                                ))}
                            </motion.div>
                        )}

                        {/* Character */}
                        <motion.div
                            animate={
                                stage === 2 ? { scale: 0.8, rotate: -5 } : // Anticipation squeeze
                                    stage >= 3 ? { scale: [1.2, 1], rotate: [0, 5, -5, 0] } : // Burst & Settle
                                        { y: [0, -5, 0] } // Idle float
                            }
                            transition={
                                stage === 2 ? { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } : // Anticipation with overshoot
                                    stage >= 3 ? { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } : // Burst smooth
                                        { duration: 3, repeat: Infinity, ease: "easeInOut" } // Idle float slower
                            }
                        >
                            <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                                {/* Cute Ghost Body */}
                                <path d="M15 50C15 25 30 10 50 10C70 10 85 25 85 50V90L70 80L50 90L30 80L15 90V50Z" fill="white" />
                                {/* Face */}
                                <circle cx="35" cy="45" r="4" fill="#18181B" />
                                <circle cx="65" cy="45" r="4" fill="#18181B" />
                                <path d="M45 55Q50 60 55 55" stroke="#18181B" strokeWidth="3" strokeLinecap="round" />
                                {/* Blush */}
                                <circle cx="30" cy="55" r="3" fill="#FECDD3" opacity="0.6" />
                                <circle cx="70" cy="55" r="3" fill="#FECDD3" opacity="0.6" />
                            </svg>
                        </motion.div>

                        {/* Ingredient Confetti Burst */}
                        {stage >= 2 && (
                            <div className="absolute left-1/2 top-1/2 w-0 h-0 z-10">
                                {confetti.map((c) => (
                                    <motion.div
                                        key={c.id}
                                        className="absolute"
                                        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                                        animate={
                                            stage === 2 ? {
                                                // Frame 2: Peek (appear close to center)
                                                x: c.dx * 0.1,
                                                y: c.dy * 0.1,
                                                scale: c.scale * 0.5,
                                                opacity: 1
                                            } :
                                                stage >= 3 ? {
                                                    // Frame 3 & 4: Burst & Fall
                                                    x: c.dx, // Explode out
                                                    y: [c.dy * 0.1, c.dy, 400], // Start -> Burst Up -> Fall Down
                                                    rotate: c.rot + 360,
                                                    scale: c.scale,
                                                    opacity: stage === 5 ? 0.8 : 1 // Slight fade in settle
                                                } : {}
                                        }
                                        transition={
                                            stage === 2 ? { duration: 0.8, ease: "circOut" } : // Peek speed
                                                {
                                                    duration: stage >= 3 ? 4 : 1, // Long fall duration
                                                    times: [0, 0.15, 1], // Timing of ballooning curve
                                                    ease: [0.25, 0.1, 0.25, 1], // Smooth curve
                                                    delay: c.delay
                                                }
                                        }
                                    >
                                        <c.Component className="w-6 h-6 drop-shadow-lg" />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{
                            opacity: stage >= 3 ? 1 : 0.5,
                            y: stage >= 3 ? 0 : 10
                        }}
                        transition={{ duration: 0.5 }}
                        className="text-center z-30"
                    >
                        <h2 className="text-2xl font-bold mb-2">You're all done!</h2>
                        <p className="text-sm text-zinc-400">You can now fully enjoy your meal.</p>
                    </motion.div>

                    {/* Button */}
                    <motion.div
                        className="mt-8 w-full max-w-[200px]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={stage >= 4 ? { opacity: 1, scale: 1 } : {}}
                        transition={{ type: "spring" }}
                    >
                        <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 transition-all">
                            Get Started
                        </button>
                    </motion.div>

                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/20 z-40" />
            </div>

            {/* Frame Indicator for User */}
            <div className="flex gap-2 text-xs text-zinc-400">
                <span>Frame: {stage}</span>
                <span>
                    {stage === 1 && "(Minimal)"}
                    {stage === 2 && "(Anticipation)"}
                    {stage === 3 && "(Burst)"}
                    {stage === 4 && "(Gravity)"}
                    {stage === 5 && "(Settle)"}
                </span>
            </div>
            <button
                onClick={() => setStage(1)}
                className="text-xs text-indigo-500 hover:underline"
            >
                Replay Animation
            </button>

        </div>
    );
}
