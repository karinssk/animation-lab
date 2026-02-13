"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================================
// PHASE TIMING
// ============================================================

const PHASE_DURATIONS: Record<number, number> = {
    1: 1000,
    2: 700,
    3: 450,
    4: 950,
};

const ARM_POSES: Record<
    number,
    { leftRot: number; rightRot: number; leftX: number; rightX: number; liftY: number }
> = {
    1: { leftRot: -30, rightRot: 30, leftX: -36, rightX: 36, liftY: -4 },
    2: { leftRot: -12, rightRot: 12, leftX: -12, rightX: 12, liftY: -16 },
    3: { leftRot: -3, rightRot: 3, leftX: -4, rightX: 4, liftY: -22 },
    4: { leftRot: -18, rightRot: 18, leftX: -20, rightX: 20, liftY: -10 },
};

// ============================================================
// CONFETTI DATA
// ============================================================

interface ConfettiPiece {
    id: string;
    shape: "diamond" | "circle";
    color: string;
    x: number;
    y: number;
    size: number;
    delay: number;
}

const CONFETTI: ConfettiPiece[] = [
    { id: "d1", shape: "diamond", color: "#EC4899", x: 10, y: 15, size: 12, delay: 0.0 },
    { id: "d2", shape: "diamond", color: "#EC4899", x: 82, y: 10, size: 9, delay: 0.08 },
    { id: "d3", shape: "diamond", color: "#06B6D4", x: 26, y: 8, size: 13, delay: 0.03 },
    { id: "d4", shape: "diamond", color: "#06B6D4", x: 74, y: 32, size: 10, delay: 0.12 },
    { id: "d5", shape: "diamond", color: "#F97316", x: 56, y: 14, size: 9, delay: 0.05 },
    { id: "d6", shape: "diamond", color: "#F97316", x: 38, y: 28, size: 7, delay: 0.15 },
    { id: "d7", shape: "diamond", color: "#3B82F6", x: 48, y: 48, size: 11, delay: 0.18 },
    { id: "d8", shape: "diamond", color: "#8B5CF6", x: 67, y: 24, size: 8, delay: 0.1 },
    { id: "d9", shape: "diamond", color: "#FBBF24", x: 16, y: 30, size: 9, delay: 0.07 },
    { id: "d10", shape: "diamond", color: "#FBBF24", x: 88, y: 38, size: 7, delay: 0.2 },
    { id: "d11", shape: "diamond", color: "#EC4899", x: 42, y: 5, size: 8, delay: 0.02 },
    { id: "d12", shape: "diamond", color: "#06B6D4", x: 60, y: 42, size: 9, delay: 0.14 },
    { id: "c1", shape: "circle", color: "#F97316", x: 34, y: 12, size: 6, delay: 0.04 },
    { id: "c2", shape: "circle", color: "#F97316", x: 62, y: 8, size: 5, delay: 0.09 },
    { id: "c3", shape: "circle", color: "#FBBF24", x: 44, y: 16, size: 7, delay: 0.06 },
    { id: "c4", shape: "circle", color: "#FBBF24", x: 50, y: 22, size: 5, delay: 0.11 },
    { id: "c5", shape: "circle", color: "#EC4899", x: 22, y: 42, size: 6, delay: 0.16 },
    { id: "c6", shape: "circle", color: "#06B6D4", x: 78, y: 18, size: 4, delay: 0.13 },
];

// ============================================================
// SVG COMPONENTS
// ============================================================

function LeftArmBottle() {
    return (
        <svg width="100" height="240" viewBox="0 0 120 280" fill="none">
            {/* Arm - black sleeve */}
            <path
                d="M15 280 C18 240 28 200 42 165 C56 130 66 105 72 82"
                stroke="#27272A"
                strokeWidth="28"
                strokeLinecap="round"
            />
            {/* Hand */}
            <ellipse cx="76" cy="68" rx="15" ry="13" fill="#FBBF24" />
            <circle cx="68" cy="57" r="5" fill="#EAB308" />
            <circle cx="76" cy="53" r="5" fill="#EAB308" />
            <circle cx="84" cy="57" r="5" fill="#EAB308" />
            {/* Bottle body */}
            <rect x="66" y="14" width="20" height="40" rx="4" fill="#92400E" />
            {/* Label */}
            <rect x="68" y="26" width="16" height="16" rx="2" fill="#DC2626" />
            {/* Neck */}
            <rect x="71" y="2" width="12" height="16" rx="4" fill="#78350F" />
            {/* Cap */}
            <rect x="69" y="0" width="16" height="5" rx="2" fill="#451A03" />
        </svg>
    );
}

function RightArmBottle() {
    return (
        <svg width="100" height="240" viewBox="0 0 120 280" fill="none">
            {/* Arm - yellow/gold sleeve */}
            <path
                d="M105 280 C102 240 92 200 78 165 C64 130 54 105 48 82"
                stroke="#FBBF24"
                strokeWidth="28"
                strokeLinecap="round"
            />
            {/* White cuff at wrist */}
            <ellipse cx="50" cy="86" rx="17" ry="6" fill="white" stroke="#E5E7EB" strokeWidth="0.5" />
            {/* Hand */}
            <ellipse cx="44" cy="68" rx="15" ry="13" fill="#FBBF24" />
            <circle cx="36" cy="57" r="5" fill="#EAB308" />
            <circle cx="44" cy="53" r="5" fill="#EAB308" />
            <circle cx="52" cy="57" r="5" fill="#EAB308" />
            {/* Bottle body */}
            <rect x="34" y="14" width="20" height="40" rx="4" fill="#92400E" />
            {/* Label */}
            <rect x="36" y="26" width="16" height="16" rx="2" fill="#DC2626" />
            {/* Neck */}
            <rect x="37" y="2" width="12" height="16" rx="4" fill="#78350F" />
            {/* Cap */}
            <rect x="35" y="0" width="16" height="5" rx="2" fill="#451A03" />
        </svg>
    );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CongratulationsAnimationV2() {
    const [phase, setPhase] = useState(1);

    useEffect(() => {
        let currentPhase = 1;
        let timeoutId: ReturnType<typeof setTimeout>;

        const advancePhase = () => {
            currentPhase = currentPhase >= 4 ? 1 : currentPhase + 1;
            setPhase(currentPhase);
            timeoutId = setTimeout(advancePhase, PHASE_DURATIONS[currentPhase]);
        };

        timeoutId = setTimeout(advancePhase, PHASE_DURATIONS[1]);
        return () => clearTimeout(timeoutId);
    }, []);

    const pose = ARM_POSES[phase] ?? ARM_POSES[1];
    const confettiOpacity = phase === 1 ? 0.4 : phase === 2 ? 0.65 : phase === 3 ? 1 : 0.78;
    const burstPhase = phase === 3;

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
                <div className="absolute left-0 right-0 top-[34px] bottom-0 overflow-hidden bg-white">
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 6px 6px, rgba(113,113,122,0.20) 1.4px, transparent 1.5px)",
                            backgroundSize: "14px 14px",
                        }}
                    />

                    <div className="absolute inset-x-0 top-12 h-[220px]">
                        {CONFETTI.map((piece, index) => (
                            <motion.div
                                key={piece.id}
                                className="absolute pointer-events-none"
                                style={{
                                    left: `${piece.x}%`,
                                    top: `${piece.y}%`,
                                    zIndex: 25,
                                }}
                                animate={{
                                    opacity: index < 6 && phase === 1 ? 0.75 : confettiOpacity,
                                    scale: burstPhase ? 1.05 : 1,
                                    y: burstPhase ? -4 : 0,
                                }}
                                transition={{
                                    duration: 0.28,
                                    delay: piece.delay * 0.6,
                                    ease: "easeOut",
                                }}
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -3, 0, 3, 0],
                                        rotate: [0, 10, 0, -10, 0],
                                    }}
                                    transition={{
                                        duration: 2.2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {piece.shape === "diamond" ? (
                                        <svg width={piece.size} height={piece.size} viewBox="0 0 10 10">
                                            <rect
                                                x="1.5"
                                                y="1.5"
                                                width="7"
                                                height="7"
                                                rx="1"
                                                fill={piece.color}
                                                transform="rotate(45 5 5)"
                                            />
                                        </svg>
                                    ) : (
                                        <svg width={piece.size} height={piece.size} viewBox="0 0 10 10">
                                            <circle cx="5" cy="5" r="4" fill={piece.color} />
                                        </svg>
                                    )}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Clink impact flash */}
                    <AnimatePresence>
                        {phase === 3 && (
                            <motion.div
                                className="absolute pointer-events-none"
                                style={{
                                    left: "50%",
                                    top: "24%",
                                    marginLeft: -28,
                                    marginTop: -28,
                                    zIndex: 22,
                                }}
                                initial={{ opacity: 0.9, scale: 0.2 }}
                                animate={{ opacity: 0, scale: 2.9 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                            >
                                <div className="h-[56px] w-[56px] rounded-full bg-amber-200" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Left arm */}
                    <motion.div
                        className="absolute pointer-events-none"
                        style={{
                            bottom: 194,
                            left: 48,
                            transformOrigin: "50% 100%",
                            zIndex: 20,
                        }}
                        animate={{ rotate: pose.leftRot, x: pose.leftX, y: pose.liftY }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                    >
                        <LeftArmBottle />
                    </motion.div>

                    {/* Right arm */}
                    <motion.div
                        className="absolute pointer-events-none"
                        style={{
                            bottom: 194,
                            right: 48,
                            transformOrigin: "50% 100%",
                            zIndex: 20,
                        }}
                        animate={{ rotate: pose.rightRot, x: pose.rightX, y: pose.liftY }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                    >
                        <RightArmBottle />
                    </motion.div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900/20 z-40" />
            </div>

            {/* Phase indicator */}
            <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((p) => (
                    <div
                        key={p}
                        className={`h-2 w-2 rounded-full transition-colors duration-300 ${p === phase ? "bg-amber-500 scale-125" : "bg-zinc-300"
                            }`}
                    />
                ))}
                <span className="ml-2 text-xs text-zinc-400">Frame {phase}</span>
            </div>
        </div>
    );
}
