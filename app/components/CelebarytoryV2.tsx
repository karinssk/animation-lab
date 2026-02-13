"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================================
// SVG INGREDIENTS (V2 - Vibrant & Playful)
// ============================================================

const ChiliIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M6.5 19.5C4 17 3 13 4.5 9.5C6 6 10 3 15 2C16 4 19 6 20.5 9.5C22 13 20 17 18.5 19.5C17 22 13 23 9.5 22.5"
            fill="#F87171"
            stroke="#DC2626"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="M15 2C15 2 13.5 6 11 7" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const LemonIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="10" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
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
        <circle cx="12" cy="12" r="10" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
        <circle cx="9" cy="9" r="2" fill="#FECACA" opacity="0.5" />
        <path d="M12 6C12 6 14 8 16 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 3V6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const OnionRingIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke="#A78BFA" strokeWidth="3" />
        <circle cx="12" cy="12" r="9" stroke="#DDD6FE" strokeWidth="1.5" strokeDasharray="4 4" />
    </svg>
);

const MushroomIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M12 11V21M6 11C6 6 8.5 3 12 3C15.5 3 18 6 18 11H6Z"
            fill="#E7E5E4"
            stroke="#A8A29E"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="10" cy="8" r="1" fill="#A8A29E" />
        <circle cx="14" cy="7" r="1.5" fill="#A8A29E" />
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
        <path d="M16 6C18 4 20 6 18 8C16 10 16 6 16 6Z" fill="#4ADE80" stroke="#22C55E" />
        <path d="M8 8C6 6 4 8 6 10C8 12 8 8 8 8Z" fill="#4ADE80" stroke="#22C55E" />
    </svg>
);

const VeggiePieceIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="4" y="4" width="16" height="16" rx="4" fill="#F472B6" />
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="#DB2777" strokeWidth="1.5" />
    </svg>
);

const INGREDIENTS = [
    { id: 1, Icon: ChiliIcon, weight: "light" },
    { id: 2, Icon: LemonIcon, weight: "heavy" },
    { id: 3, Icon: TomatoIcon, weight: "heavy" },
    { id: 4, Icon: OnionRingIcon, weight: "medium" },
    { id: 5, Icon: MushroomIcon, weight: "light" },
    { id: 6, Icon: HerbIcon, weight: "floaty" },
    { id: 7, Icon: VeggiePieceIcon, weight: "medium" },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CelebarytoryV2() {
    const [stage, setStage] = useState<"idle" | "burst">("idle");

    useEffect(() => {
        // Start animation on mount
        const t1 = setTimeout(() => setStage("burst"), 500);
        return () => clearTimeout(t1);
    }, []);

    // Generate 50 confetti pieces with varied properties
    const confetti = Array.from({ length: 50 }).map((_, i) => {
        const type = INGREDIENTS[i % INGREDIENTS.length];

        // Random physics based on "weight"
        const spreadX = (Math.random() - 0.5) * 350;
        const spreadY = (Math.random() - 1) * 500 - 150; // Upwards burst

        return {
            id: i,
            Component: type.Icon,
            weight: type.weight,
            dx: spreadX,
            dy: spreadY,
            rot: Math.random() * 720 - 360,
            scale: 0.6 + Math.random() * 0.8,
            delay: Math.random() * 0.15, // Tight burst
        };
    });

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Phone Mockup */}
            <div
                className="relative overflow-hidden rounded-[3rem] border-[6px] border-zinc-900 bg-[#09090b] shadow-2xl" // Slightly darker zinc
                style={{ width: 300, height: 620 }}
            >
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 z-50 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-black border border-white/5" />

                {/* Status Bar */}
                <div className="absolute top-2 left-0 right-0 z-40 flex items-center justify-between px-8 pt-1 opacity-60">
                    <span className="text-[10px] font-semibold text-white">9:41</span>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-2.5 rounded-[1px] border border-white" />
                    </div>
                </div>

                {/* --- MAIN ANIMATION AREA --- */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white overflow-hidden">

                    {/* Confetti Layer */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        {confetti.map((c) => (
                            <motion.div
                                key={c.id}
                                className="absolute left-1/2 top-1/2 w-8 h-8 -ml-4 -mt-4"
                                initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
                                animate={stage === "burst" ? {
                                    x: c.dx,
                                    y: [0, c.dy, 800], // Start -> Up -> Fall off screen
                                    rotate: c.rot,
                                    scale: c.scale,
                                    opacity: [1, 1, 1, 0] // Fade out at very end
                                } : {}}
                                transition={{
                                    // Custom mixing of easing for organic feel
                                    duration: c.weight === "floaty" ? 5 : c.weight === "light" ? 4 : 3,
                                    times: [0, 0.15, 1], // Fast burst, slow fall
                                    ease: [0.2, 0.8, 0.2, 1],
                                    delay: c.delay
                                }}
                            >
                                <c.Component className="w-full h-full drop-shadow-md" />
                            </motion.div>
                        ))}
                    </div>

                    {/* Central Character */}
                    <motion.div
                        className="relative z-20 mb-8"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={stage === "burst" ? {
                            scale: [0, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                        } : {}}
                        transition={{
                            scale: { duration: 0.5, ease: "easeOut", delay: 0.1 },
                            rotate: { duration: 0.5, delay: 0.3 }
                        }}
                    >
                        {/* Delicious Burger Mascot */}
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                            {/* Bottom Bun */}
                            <path d="M20 70H80C80 82 70 90 50 90C30 90 20 82 20 70Z" fill="#D97706" stroke="#92400E" strokeWidth="3" />

                            {/* Lettuce */}
                            <path d="M15 65C20 70 25 65 30 68C35 71 40 65 50 68C60 65 65 70 70 68C75 66 80 70 85 65L85 62H15V65Z" fill="#4ADE80" stroke="#166534" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                            {/* Cheese */}
                            <path d="M18 63L82 63L85 68L15 68L18 63Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
                            <path d="M15 60H85V63H15V60Z" fill="#FACC15" />

                            {/* Patty */}
                            <rect x="18" y="52" width="64" height="10" rx="3" fill="#78350F" stroke="#451A03" strokeWidth="3" />

                            {/* Top Bun */}
                            <path d="M20 52H80C80 25 70 15 50 15C30 15 20 25 20 52Z" fill="#D97706" stroke="#92400E" strokeWidth="3" />

                            {/* Seeds */}
                            <circle cx="40" cy="30" r="1.5" fill="#FEF3C7" />
                            <circle cx="55" cy="25" r="1.5" fill="#FEF3C7" />
                            <circle cx="65" cy="35" r="1.5" fill="#FEF3C7" />
                            <circle cx="30" cy="40" r="1.5" fill="#FEF3C7" />
                            <circle cx="70" cy="45" r="1.5" fill="#FEF3C7" />

                            {/* Face on Top Bun */}
                            <circle cx="40" cy="45" r="3" fill="#78350F" />
                            <circle cx="60" cy="45" r="3" fill="#78350F" />
                            <path d="M48 48Q50 50 52 48" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </motion.div>

                    {/* Text Content */}
                    <motion.div
                        className="text-center z-30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={stage === "burst" ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-pink-500 to-amber-500 bg-clip-text text-transparent">
                            Order is ready
                        </h2>
                        <p className="text-sm text-zinc-400">menu for you</p>
                    </motion.div>

                    {/* Button */}
                    <motion.button
                        className="mt-10 w-full max-w-[220px] bg-white text-black font-bold py-3.5 rounded-2xl shadow-xl active:scale-95 transition-transform z-30"
                        initial={{ opacity: 0, y: 40 }}
                        animate={stage === "burst" ? { opacity: 1, y: 0 } : {}}
                        transition={{ type: "spring", delay: 0.6 }}
                        onClick={() => {
                            setStage("idle");
                            setTimeout(() => setStage("burst"), 100);
                        }}
                    >
                        Discover more
                    </motion.button>

                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-white/10 z-40" />
            </div>

            <p className="text-xs text-zinc-500">Tap button to replay</p>
        </div>
    );
}
