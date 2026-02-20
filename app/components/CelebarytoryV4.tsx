"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ============================================================
// SVG INGREDIENTS (V3 Style re-used)
// ============================================================

const ShrimpIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M17 7C17 7 19 4 19 2M17 7C17 7 14 5 12 6C10 7 7 10 7 14C7 18 10 21 14 21C16 21 18 20 19 18C20 16 19 13 17 12C16 11.5 15 12 14 12"
            stroke="none"
            fill="#FB923C"
        />
        <path
            d="M14 21C11 21 7 22 5 22M14 21C13 21 12 21 11 20"
            stroke="none"
            fill="#F97316"
        />
        <path d="M7 14C7 12 8 9 10 8" stroke="#FDBA74" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const AvocadoIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M12 2C8 2 5 6 5 12C5 17 8 22 12 22C16 22 19 17 19 12C19 6 16 2 12 2Z"
            fill="#4ADE80"
        />
        <circle cx="12" cy="15" r="3.5" fill="#FACC15" />
        <path d="M12 2C15 2 19 6 19 12" stroke="#22C55E" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
);

const CheeseIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M3 12L12 4L21 12V18C21 19.1 20.1 20 19 20H5C3.9 20 3 19.1 3 18V12Z"
            fill="#FACC15"
        />
        <circle cx="8" cy="14" r="1.5" fill="#FEF08A" />
        <circle cx="15" cy="16" r="2" fill="#FEF08A" />
        <circle cx="13" cy="10" r="1" fill="#FEF08A" />
    </svg>
);

const StrawberryIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M12 20C12 20 6 14 5 10C4 6 7 4 9 4C11 4 12 6 12 6C12 6 13 4 15 4C17 4 20 6 19 10C18 14 12 20 12 20Z"
            fill="#EF4444"
        />
        <circle cx="9" cy="8" r="0.5" fill="#FECACA" />
        <circle cx="15" cy="8" r="0.5" fill="#FECACA" />
        <circle cx="12" cy="12" r="0.5" fill="#FECACA" />
        <circle cx="8" cy="14" r="0.5" fill="#FECACA" />
        <path d="M9 4L12 2L15 4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const INGREDIENTS = [
    { id: 1, Icon: ShrimpIcon, weight: "medium" },
    { id: 2, Icon: AvocadoIcon, weight: "heavy" },
    { id: 3, Icon: CheeseIcon, weight: "medium" },
    { id: 4, Icon: StrawberryIcon, weight: "heavy" },
];

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function CelebarytoryV4() {
    const [stage, setStage] = useState<"searching" | "matched" | "reveal">("reveal");

    useEffect(() => {
        let mounted = true;
        const runSequence = async () => {
            while (mounted) {
                // Stage 1: Searching
                setStage("searching");
                await new Promise(r => setTimeout(r, 2500));
                if (!mounted) break;

                // Stage 2: Matched
                setStage("matched");
                await new Promise(r => setTimeout(r, 2000));
                if (!mounted) break;

                // Stage 3: Reveal
                setStage("reveal");
                await new Promise(r => setTimeout(r, 4000)); // Allow confetti to fall
                if (!mounted) break;
            }
        };

        runSequence();
        return () => { mounted = false; };
    }, []);

    const stages = ["searching", "matched", "reveal"];
    const currentStep = stages.indexOf(stage);

    // Generate 60 confetti pieces for more visibility
    const confetti = Array.from({ length: 60 }).map((_, i) => {
        const type = INGREDIENTS[i % INGREDIENTS.length];
        const spreadX = (Math.random() - 0.5) * 400; // Wider spread
        const spreadY = (Math.random() - 1) * 600 - 100; // Higher burst
        return {
            id: i,
            Component: type.Icon,
            weight: type.weight,
            dx: spreadX,
            dy: spreadY,
            rot: Math.random() * 720 - 360,
            scale: 0.8 + Math.random() * 0.8, // Larger scale (0.8 - 1.6)
            delay: Math.random() * 0.2,
        };
    });

    return (
        <div className="flex flex-col items-center gap-4">
            {/* Phone Mockup - WHITE BG */}
            <div
                className="relative overflow-hidden rounded-[3rem] border-[6px] border-zinc-200 bg-white shadow-2xl"
                style={{ width: 300, height: 620 }}
            >
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 z-50 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-black" />

                {/* Status Bar */}
                <div className="absolute top-2 left-0 right-0 z-40 flex items-center justify-between px-8 pt-1">
                    <span className="text-[10px] font-semibold text-zinc-900">9:41</span>
                    <div className="flex items-center gap-1">
                        <div className="w-4 h-2.5 rounded-[1px] border border-zinc-900" />
                    </div>
                </div>

                {/* --- MAIN ANIMATION AREA --- */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">

                    {/* Background Decoration */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400 rounded-full blur-3xl" />
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="relative h-64 w-full flex items-center justify-center mb-8">

                        {/* Main Food Image */}
                        <motion.div
                            className="relative z-20"
                            initial={{ scale: 0, rotate: -15 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
                        >
                            <div className="w-56 h-56 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white overflow-hidden relative">
                                {/* Badge */}
                                <div className="absolute top-4 right-8 z-30 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md transform rotate-12">
                                    100% MATCH
                                </div>
                                <img
                                    src="/food-pizza.jpg"
                                    alt="Pizza Match"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>


                    {/* CONFETTI LAYER */}
                    {stage === "reveal" && (
                        <div className="absolute inset-0 z-50 pointer-events-none">
                            {confetti.map((c) => (
                                <motion.div
                                    key={c.id}
                                    className="absolute left-1/2 top-1/2 w-6 h-6"
                                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                                    animate={{
                                        x: c.dx,
                                        y: [0, c.dy, 800],
                                        opacity: [1, 1, 0],
                                        scale: c.scale,
                                        rotate: c.rot
                                    }}
                                    transition={{
                                        duration: 3,
                                        times: [0, 0.2, 1],
                                        ease: [0.2, 0.8, 0.2, 1],
                                        delay: c.delay
                                    }}
                                >
                                    <c.Component className="w-full h-full drop-shadow-sm" />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Text Content */}
                    <motion.div
                        className="text-center z-10"
                        animate={{
                            y: stage === "reveal" ? 0 : 20,
                            opacity: stage === "reveal" ? 1 : 0.5
                        }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold text-zinc-900 mb-1">
                            {stage === "searching" ? "Finding Match..." : "It's a Pizza Night!"}
                        </h2>
                        <p className="text-sm text-zinc-500">
                            {stage === "searching" ? "Looking for common cravings" : "You both love Italian food."}
                        </p>
                    </motion.div>

                    {/* Action Button */}
                    <motion.div
                        className="mt-8 w-full max-w-[200px]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={stage === "reveal" ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5 }}
                    >
                        <button
                            onClick={() => setStage("searching")}
                            className="w-full py-3 bg-zinc-900 text-white rounded-xl font-semibold shadow-lg active:scale-95 transition-all"
                        >
                            See Restaurants
                        </button>
                    </motion.div>

                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-300 z-40" />
            </div >

            {/* Frame Indicator */}
            <div className="flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${i === currentStep ? "scale-125 bg-yellow-500" : "bg-zinc-300"
                            }`}
                    />
                ))}
                <span className="ml-2 text-xs text-zinc-400">Frame {currentStep + 1}</span>
            </div>
        </div >
    );
}
