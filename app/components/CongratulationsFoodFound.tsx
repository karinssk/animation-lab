"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function CongratulationsFoodFound() {
    const [stage, setStage] = useState<
        "searching" | "found" | "reveal" | "celebrate"
    >("searching");

    useEffect(() => {
        let mounted = true;
        const runSequence = async () => {
            while (mounted) {
                // Stage 1: Searching (0s - 2s)
                setStage("searching");
                await new Promise(r => setTimeout(r, 2000));
                if (!mounted) break;

                // Stage 2: Found/Pulse (2s - 2.5s)
                setStage("found");
                await new Promise(r => setTimeout(r, 600));
                if (!mounted) break;

                // Stage 3: Reveal Food (2.5s)
                setStage("reveal");
                await new Promise(r => setTimeout(r, 1500));
                if (!mounted) break;

                // Stage 4: Celebration (3.2s)
                setStage("celebrate");
                await new Promise(r => setTimeout(r, 4000));
                if (!mounted) break;
            }
        };

        runSequence();
        return () => { mounted = false; };
    }, []);

    const stages = ["searching", "found", "reveal", "celebrate"];
    const currentStep = stages.indexOf(stage);

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
                <div className="absolute left-0 right-0 top-[34px] bottom-0 flex flex-col items-center justify-center p-6 bg-white">

                    {/* Background Elements */}
                    <div className="absolute inset-0 z-0">
                        {/* Subtle animated pattern */}
                        <motion.div
                            className="absolute inset-0 opacity-30"
                            style={{ backgroundImage: "radial-gradient(#E4E4E7 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                            animate={{ backgroundPosition: ["0px 0px", "0px 20px"] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center w-full">

                        {/* Header Text */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-12 text-center"
                        >
                            <h2 className="text-xl font-bold text-zinc-900">Finding Match...</h2>
                            <p className="text-xs text-zinc-500">Searching specifically for you & Sarah</p>
                        </motion.div>

                        {/* Avatar Container */}
                        <div className="relative h-64 w-full flex items-center justify-center">

                            {/* Connection Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                <motion.path
                                    d="M 60 128 Q 150 128 240 128"
                                    fill="none"
                                    stroke="#E4E4E7"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                />
                            </svg>

                            {/* User Avatar (Left) */}
                            <motion.div
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
                                animate={stage === "searching" ? {
                                    x: [0, 5, 0],
                                    y: [0, -5, 0],
                                } : {
                                    x: 40, // Move to center-ish
                                    scale: 0.8,
                                    opacity: 0.5
                                }}
                                transition={{
                                    repeat: stage === "searching" ? Infinity : 0,
                                    duration: 2,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-16 h-16 rounded-full bg-zinc-100 border-2 border-white shadow-lg flex items-center justify-center overflow-hidden">
                                    <span className="text-2xl">😎</span>
                                </div>
                                <div className="mt-2 text-center">
                                    <span className="text-[10px] font-bold bg-zinc-900 text-white px-2 py-0.5 rounded-full">You</span>
                                </div>
                            </motion.div>

                            {/* Friend Avatar (Right) */}
                            <motion.div
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
                                animate={stage === "searching" ? {
                                    x: [0, -5, 0],
                                    y: [0, 5, 0],
                                } : {
                                    x: -40, // Move to center-ish
                                    scale: 0.8,
                                    opacity: 0.5
                                }}
                                transition={{
                                    repeat: stage === "searching" ? Infinity : 0,
                                    duration: 2.2,
                                    ease: "easeInOut",
                                    delay: 0.2
                                }}
                            >
                                <div className="w-16 h-16 rounded-full bg-zinc-100 border-2 border-white shadow-lg flex items-center justify-center overflow-hidden">
                                    <span className="text-2xl">👩‍🦰</span>
                                </div>
                                <div className="mt-2 text-center">
                                    <span className="text-[10px] font-bold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">Sarah</span>
                                </div>
                            </motion.div>

                            {/* CENTRAL REVEAL: Food Item */}
                            <AnimatePresence>
                                {(stage === "reveal" || stage === "celebrate") && (
                                    <motion.div
                                        className="absolute z-30"
                                        initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                    >
                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full scale-150" />

                                        {/* Food Card */}
                                        <div className="relative w-48 h-56 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-start border border-zinc-100 overflow-hidden">
                                            {/* Image */}
                                            <div className="w-full h-32 bg-zinc-100 relative">
                                                <img
                                                    src="/food-steak.avif"
                                                    alt="Grilled Steak"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* "Best Value" Badge */}
                                            <div className="absolute top-2 right-2 px-2 py-1 bg-amber-400 rounded-lg shadow-sm text-[8px] font-bold text-amber-950 flex items-center gap-1">
                                                <span>★</span> BEST MATCH
                                            </div>

                                            <div className="p-4 text-center">
                                                <h3 className="text-sm font-bold text-zinc-900 leading-tight">Grilled Steak w/ Arugula</h3>
                                                <p className="text-[10px] text-zinc-500 mt-1">98% Match Score</p>
                                                <p className="text-[10px] text-amber-600 font-bold mt-2">$24.00</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Shockwave Effect on Reveal */}
                            <AnimatePresence>
                                {stage === "reveal" && (
                                    <motion.div
                                        className="absolute z-0 w-40 h-40 rounded-full border-2 border-amber-400"
                                        initial={{ scale: 0.8, opacity: 1 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Bottom Text / Button */}
                        <AnimatePresence>
                            {stage === "celebrate" && (
                                <motion.div
                                    className="mt-12 w-full px-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-bold text-zinc-900">It's a Match!</h2>
                                        <p className="text-sm text-zinc-500">Both of you love Italian places.</p>
                                    </div>

                                    <button className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-transform">
                                        Let's Eat 😋
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>

                    {/* Confetti Celebration */}
                    {stage === "celebrate" && <ConfettiOverlay />}

                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900/20 z-40" />
            </div>

            {/* Frame Indicator */}
            <div className="flex items-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${i === currentStep ? "scale-125 bg-amber-500" : "bg-zinc-300"
                            }`}
                    />
                ))}
                <span className="ml-2 text-xs text-zinc-400">Frame {currentStep + 1}</span>
            </div>
        </div>
    );
}

function ConfettiOverlay() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                        x: "50%",
                        y: "50%",
                        scale: 0,
                        opacity: 1
                    }}
                    animate={{
                        x: `${Math.random() * 100}%`,
                        y: `${Math.random() * 100}%`,
                        scale: Math.random() * 1 + 0.5,
                        opacity: 0,
                        rotate: Math.random() * 360
                    }}
                    transition={{
                        duration: 1.5,
                        ease: "easeOut",
                        delay: Math.random() * 0.2
                    }}
                >
                    <div
                        className="w-2 h-2 rounded-sm"
                        style={{
                            backgroundColor: ["#FBBF24", "#F87171", "#60A5FA", "#34D399"][Math.floor(Math.random() * 4)]
                        }}
                    />
                </motion.div>
            ))}
        </div>
    )
}
