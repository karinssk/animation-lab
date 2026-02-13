"use client";

import { motion, useAnimation, Variants } from "framer-motion";
import { useState, useEffect } from "react";

// --- Assets ---
// Simple internal components for the card designs to avoid external dependencies.

const YellowCard = () => (
    <div className="w-full h-full bg-[#FFD54F] relative flex flex-col justify-between p-6 overflow-hidden rounded-[2rem]">
        {/* Background Shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-300 rounded-full blur-2xl opacity-50 -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-white/30 rounded-full blur-xl mb-[-2rem]"></div>

        {/* Content */}
        <div className="relative z-10 flex justify-between items-start">
            <div className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs">New</div>
            <div className="text-orange-900/20 text-4xl">✨</div>
        </div>

        <div className="relative z-10 text-center mt-4">
            <div className="w-16 h-16 bg-orange-400 rounded-full mx-auto flex items-center justify-center text-3xl shadow-lg mb-2">
                ⭐
            </div>
        </div>

        <div className="relative z-10 mt-auto">
            <h2 className="text-3xl font-black text-zinc-900">$0.36</h2>
            <p className="text-sm font-bold text-zinc-600">Cashback</p>
        </div>

        {/* Cloud overlay similar to reference */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white rounded-[2rem] translate-y-12 scale-150 rounded-t-[100%]"></div>
    </div>
);

const BlueCard = () => (
    <div className="w-full h-full bg-[#2563EB] relative flex flex-col justify-between p-6 overflow-hidden rounded-[2rem]">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
        </div>

        <div className="relative z-10 flex justify-between items-start">
            <div className="w-8 h-8 rounded-full bg-blue-400/30"></div>
            <div className="bg-blue-400/30 text-white font-bold px-3 py-1 rounded-full text-xs">Visa</div>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
            <span className="text-6xl opacity-20">💳</span>
        </div>

        <div className="relative z-10">
            <div className="h-2 w-24 bg-white/20 rounded-full mb-2"></div>
            <div className="h-2 w-16 bg-white/20 rounded-full"></div>
        </div>
    </div>
);

const GreenCard = () => (
    <div className="w-full h-full bg-[#10B981] relative flex flex-col justify-between p-4 overflow-hidden rounded-[2rem]">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full -mr-8 -mt-8 blur-xl"></div>
        <div className="relative z-10 flex justify-between items-start">
            <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-[10px] text-white shadow-sm">🛍️</div>
            <div className="bg-white/20 text-white font-bold px-2 py-0.5 rounded-full text-[10px]">Shop</div>
        </div>
        <div className="relative z-10 mt-auto">
            <h2 className="text-xl font-bold text-white tracking-tight">$12.50</h2>
            <p className="text-[10px] text-green-100 font-medium opacity-80">Cashback</p>
        </div>
    </div>
);

const PurpleCard = () => (
    <div className="w-full h-full bg-[#8B5CF6] relative flex flex-col justify-between p-4 overflow-hidden rounded-[2rem]">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="relative z-10 flex justify-between items-start">
            <div className="bg-purple-900/30 text-white font-bold px-2 py-0.5 rounded-full text-[10px]">Events</div>
        </div>
        <div className="relative z-10 flex items-center justify-center flex-1">
            <div className="text-3xl opacity-50 drop-shadow-md">🎟️</div>
        </div>
        <div className="relative z-10">
            <div className="h-1.5 w-12 bg-white/40 rounded-full mb-1"></div>
            <div className="h-1.5 w-8 bg-white/40 rounded-full"></div>
        </div>
    </div>
);

const BlackCard = () => (
    <div className="w-full h-full bg-[#18181B] relative flex flex-col justify-between p-4 overflow-hidden rounded-[2rem]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#52525B 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>

        <div className="relative z-10 flex justify-between items-start">
            <div className="text-zinc-500 font-mono text-[10px]">09/28</div>
            <div className="text-zinc-500 font-bold text-[10px]">VISA</div>
        </div>

        <div className="relative z-10 mt-auto">
            <div className="flex items-center gap-2">
                <div className="text-xl">✈️</div>
                <div>
                    <div className="text-white text-sm font-bold leading-tight">Travel</div>
                    <div className="text-[10px] text-zinc-400">3x Points</div>
                </div>
            </div>
        </div>
    </div>
);

export default function WalletRevealAnimation() {
    const [stage, setStage] = useState<"single" | "grid" | "zoom" | "paint" | "complete">("single");

    useEffect(() => {
        console.log("Current Stage:", stage);
    }, [stage]);

    // Animation loop
    useEffect(() => {
        let mounted = true;

        const runSequence = async () => {
            while (mounted) {
                // 1. Start Single
                setStage("single");
                await new Promise(r => setTimeout(r, 2000));
                if (!mounted) break;

                // 2. Zoom Out to Grid
                setStage("grid");
                await new Promise(r => setTimeout(r, 2000));
                if (!mounted) break;

                // 3. Zoom In to Top-Left
                setStage("zoom");
                await new Promise(r => setTimeout(r, 1500));
                if (!mounted) break;

                // 4. Start Paint
                setStage("paint");
                await new Promise(r => setTimeout(r, 6000)); // 5s animation + 1s hold
                if (!mounted) break;
            }
        };

        runSequence();
        return () => { mounted = false; };
    }, []);

    const stages = ["single", "grid", "zoom", "paint"];
    const currentStep = stages.indexOf(stage);

    return (
        <div className="flex flex-col items-center justify-center p-8">
            {/* Phone Container - Matching DesignLoadAnimation */}
            <div
                className="relative overflow-hidden rounded-[3rem] border-[8px] border-zinc-900 bg-zinc-50 shadow-2xl"
                style={{ width: 320, height: 680 }}
            >
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 z-50 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-zinc-900" />

                {/* Header (Optional, but keeps consistency) */}
                <div className="absolute top-10 left-6 right-6 z-20 flex items-center justify-between">
                    <div className="w-20 rotate-3">
                        {/* Placeholder for Logo if needed, or just keep it empty/different for this demo */}
                    </div>
                </div>

                {/* VIEW 1: GRID CONTEXT */}
                <div className="absolute inset-0 top-24 px-6 grid grid-cols-2 gap-4 place-items-center opacity-100 pointer-events-none content-start">
                    {/* The Top Left Card Placeholder */}
                    <motion.div
                        className="w-full aspect-square rounded-[2rem] bg-blue-100/50 border-2 border-dashed border-blue-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: stage === "grid" ? 1 : 0 }}
                    />

                    {/* Other 3 cards */}
                    {[<GreenCard key="green" />, <PurpleCard key="purple" />, <BlackCard key="black" />].map((card, i) => (
                        <motion.div
                            key={i}
                            className="w-full aspect-square shadow-sm rounded-[2rem]"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: stage === "grid" ? 1 : 0,
                                scale: stage === "grid" ? 1 : 0.8
                            }}
                            transition={{ delay: 0.1 * (i + 1) }}
                        >
                            {card}
                        </motion.div>
                    ))}
                </div>

                {/* VIEW 2: THE HERO CARD */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        layout
                        className="relative z-20 shadow-2xl rounded-[2rem] overflow-hidden"
                        initial={{ width: 280, height: 380, x: 0, y: 0 }}
                        animate={{
                            width: stage === "grid" ? 128 : 280,
                            height: stage === "grid" ? 128 : 380,
                            x: stage === "grid" ? -72 : 0,
                            y: stage === "grid" ? -180 : 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 20
                        }}
                    >
                        {/* 1. BOTTOM LAYER (Yellow - The Reveal) */}
                        <div className="absolute inset-0 z-0">
                            <YellowCard />
                        </div>

                        {/* 2. TOP LAYER (Blue - The Mask) */}
                        <div className="absolute inset-0 z-10 pointer-events-none">
                            <svg width="100%" height="100%" viewBox="0 0 280 380" preserveAspectRatio="none">
                                <defs>
                                    <mask id="paintMask">
                                        <rect x="0" y="0" width="100%" height="100%" fill="white" />
                                        {stage === "paint" && (
                                            <motion.path
                                                d="M 0 380 L 105 380 L 40 380 L 0 190 L 0 152 L 245 340 L 245 306 L 0 76 L 0 38 L 245 229 L 245 192 L 35 0 L 70 0 L 245 115 L 245 76 L 140 0 L 175 0 L 245 76 L 245 38 L 210 0 L 245 0"
                                                fill="none"
                                                stroke="black"
                                                strokeWidth="150"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 5, ease: "linear" }}
                                                filter="url(#displacementFilter)"
                                            />
                                        )}
                                    </mask>
                                    <filter id="displacementFilter">
                                        <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
                                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="15" xChannelSelector="R" yChannelSelector="G" />
                                    </filter>
                                </defs>
                            </svg>
                        </div>

                        <div
                            className="absolute inset-0 z-10 w-full h-full"
                            style={{
                                mask: 'url(#paintMask)',
                                WebkitMask: 'url(#paintMask)'
                            }}
                        >
                            <BlueCard />
                        </div>
                    </motion.div>

                    {/* INVISIBLE SVG references for Firefox/cross-browser mask support if needed */}
                    <svg className="absolute w-0 h-0">
                        <defs>
                            <mask id="paintMask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
                                <rect x="0" y="0" width="1" height="1" fill="white" />
                                {stage === "paint" && (
                                    <motion.path
                                        d="M 0 0.7 L 0.25 1 L 0.37 1 L 0 0.5 L 0 0.4 L 0.5 1 L 0.62 1 L 0 0.2 L 0.87 0.9 L 0.12 0 L 0.87 0.5 L 0.87 0.4 L 0.5 0 L 0.87 0.2 L 0.75 0 L 0.87 0.08"
                                        fill="none"
                                        stroke="black"
                                        strokeWidth="0.25"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 4, ease: "linear" }}
                                        filter="url(#displacementFilter)"
                                    />
                                )}
                            </mask>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* Frame Indicator */}
            <div className="mt-4 flex items-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${i === currentStep ? "scale-125 bg-blue-500" : "bg-zinc-300"
                            }`}
                    />
                ))}
                <span className="ml-2 text-xs text-zinc-400">Frame {currentStep + 1}</span>
            </div>
        </div>
    );
}
