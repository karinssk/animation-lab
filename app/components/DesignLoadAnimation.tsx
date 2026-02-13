"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function DesignLoadAnimation() {
    const [slide, setSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSlide((prev) => (prev + 1) % 3);
        }, 4000); // 4 seconds per slide to allow internal animations to complete
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center p-8">
            {/* Phone Container - TOAST Brand */}
            <div
                className="relative overflow-hidden rounded-[3rem] border-[8px] border-zinc-900 bg-zinc-50 shadow-2xl"
                style={{ width: 320, height: 680 }}
            >
                {/* Dynamic Island */}
                <div className="absolute top-2 left-1/2 z-50 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-zinc-900" />

                {/* Header - Persistent */}
                <div className="absolute top-10 left-6 right-6 z-20 flex items-center justify-between">
                    <div className="w-24 rotate-3">
                        <img src="/toast-logo.png" alt="TOAST Logo" className="w-full object-contain" />
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded-full border border-zinc-200 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Live</span>
                    </div>
                </div>

                {/* Content Slides */}
                <div className="absolute top-24 left-0 right-0 bottom-0 overflow-hidden">
                    <AnimatePresence mode="wait">
                        {slide === 0 && <Slide1Lobby key="slide1" />}
                        {slide === 1 && <Slide2Swipe key="slide2" />}
                        {slide === 2 && <Slide3Result key="slide3" />}
                    </AnimatePresence>
                </div>
            </div>

            {/* Frame Indicator */}
            <div className="mt-4 flex items-center gap-2">
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${i === slide ? "scale-125 bg-orange-500" : "bg-zinc-300"
                            }`}
                    />
                ))}
                <span className="ml-2 text-xs text-zinc-400">Frame {slide + 1}</span>
            </div>
        </div>
    );
}

// --- Slide 1: Group Lobby ---
function Slide1Lobby() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full flex-col px-6 pt-4 items-center"
        >
            <div className="w-full text-center mb-8">
                <h2 className="text-2xl font-black text-zinc-900">Invite Friends</h2>
                <p className="text-xs text-zinc-500 mt-1">Room Code: <span className="font-mono font-bold text-orange-600 text-base">X J 9 K</span></p>
            </div>

            {/* Avatars Grid */}
            <div className="grid grid-cols-2 gap-4 w-full px-4 mb-8">
                <LobbyAvatar name="You" img="😎" color="bg-orange-100" delay={0} />
                <LobbyAvatar name="Sarah" img="👩‍🦰" color="bg-blue-100" delay={0.5} />
                <LobbyAvatar name="Mike" img="🧔" color="bg-green-100" delay={1.2} />
                <LobbyAvatar name="Waiting..." img="◌" color="bg-zinc-100" delay={2} pulse />
            </div>

            {/* Start Button */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold text-center shadow-lg cursor-pointer"
            >
                Start Session 🚀
            </motion.div>

            <p className="mt-4 text-[10px] text-zinc-400">Waiting for 1 more person...</p>
        </motion.div>
    );
}

function LobbyAvatar({ name, img, color, delay, pulse }: any) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay, type: "spring" }}
            className={`aspect-square rounded-3xl ${color} flex flex-col items-center justify-center border-2 border-white shadow-sm relative`}
        >
            <span className={`text-4xl ${pulse ? 'animate-spin-slow' : ''}`}>{img}</span>
            <span className="text-xs font-bold text-zinc-700 mt-2">{name}</span>
            {!pulse && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: delay + 0.3 }}
                    className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                />
            )}
        </motion.div>
    )
}

// --- Slide 2: Swipe Interface ---
function Slide2Swipe() {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex h-full flex-col px-4 pt-4 relative"
        >
            {/* Progress Bar */}
            <div className="flex gap-1 mb-6 px-2">
                <div className="h-1 flex-1 bg-orange-500 rounded-full" />
                <div className="h-1 flex-1 bg-orange-500 rounded-full" />
                <div className="h-1 flex-1 bg-zinc-200 rounded-full" />
            </div>

            <div className="relative flex-1 flex items-center justify-center -mt-8">
                {/* Card Behind */}
                <div className="absolute w-64 h-80 bg-white rounded-3xl border border-zinc-200 shadow-sm rotate-3 scale-95 opacity-50 flex items-center justify-center">
                    <span className="text-6xl grayscale opacity-50">🍣</span>
                </div>

                {/* Active Card */}
                <motion.div
                    animate={{
                        x: [0, -20, 0, 150],
                        rotate: [0, -5, 0, 15],
                        opacity: [1, 1, 1, 0]
                    }}
                    transition={{ times: [0, 0.2, 0.4, 1], duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    className="absolute w-64 h-80 bg-white rounded-3xl border border-zinc-200 shadow-xl flex flex-col items-center overflow-hidden z-10"
                >
                    {/* Image Placeholder */}
                    <div className="w-full h-48 bg-orange-100 flex items-center justify-center text-8xl">
                        🍜
                    </div>
                    <div className="p-4 w-full text-left">
                        <h3 className="text-xl font-black text-zinc-900">Ramen</h3>
                        <p className="text-sm text-zinc-500">Japanese • $$</p>
                    </div>

                    {/* LIKE stamp */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.2 }}
                        className="absolute top-4 right-4 border-4 border-green-500 text-green-500 rounded-lg px-2 py-1 font-black text-xl -rotate-12 bg-white/80"
                    >
                        LIKE
                    </motion.div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-6 mb-12">
                <div className="h-14 w-14 rounded-full bg-white border border-red-100 shadow-lg text-red-500 flex items-center justify-center text-2xl">✕</div>
                <div className="h-14 w-14 rounded-full bg-white border border-blue-100 shadow-lg text-blue-500 flex items-center justify-center text-2xl">★</div>
                <div className="h-14 w-14 rounded-full bg-white border border-green-100 shadow-lg text-green-500 flex items-center justify-center text-2xl scale-110">♥</div>
            </div>
        </motion.div>
    );
}

// --- Slide 3: Final Result (Integrated Match Reveal) ---
function Slide3Result() {
    const [stage, setStage] = useState<"searching" | "found" | "reveal" | "celebrate">("searching");

    useEffect(() => {
        // Stage 1: Searching (0s - 2s)
        // Stage 2: Found/Pulse (2s - 2.5s)
        const timer1 = setTimeout(() => setStage("found"), 2000);
        // Stage 3: Reveal Food (2.6s)
        const timer2 = setTimeout(() => setStage("reveal"), 2600);
        // Stage 4: Celebration (3.2s)
        const timer3 = setTimeout(() => setStage("celebrate"), 3200);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-full flex-col px-6 pt-8 items-center relative"
        >

            {/* Dynamic Header Text */}
            <motion.div
                layout
                className="mb-8 text-center z-10"
            >
                <AnimatePresence mode="wait">
                    {stage === "searching" && (
                        <motion.div
                            key="finding"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <h2 className="text-2xl font-black text-zinc-900">Finding Match...</h2>
                            <p className="text-sm text-zinc-500">Comparing everyone's tastes</p>
                        </motion.div>
                    )}
                    {(stage === "found" || stage === "reveal") && (
                        <motion.div
                            key="found"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                        >
                            <h2 className="text-3xl font-black text-orange-500">MATCH FOUND!</h2>
                        </motion.div>
                    )}
                    {stage === "celebrate" && (
                        <motion.div
                            key="celebrate"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <h2 className="text-2xl font-black text-zinc-900">It's a Match!</h2>
                            <p className="text-sm text-zinc-500">Let's go eat here</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Animation Container */}
            <div className="relative w-full h-80 flex items-center justify-center">

                {/* Background Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <motion.path
                        d="M 40 140 Q 150 140 260 140"
                        fill="none"
                        stroke="#E4E4E7"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                    />
                </svg>

                {/* Avatar 1 (Left) */}
                <motion.div
                    className="absolute left-4 z-10"
                    animate={stage === "searching" ? {
                        x: [0, 5, 0],
                        y: [0, -5, 0],
                    } : {
                        x: 60,
                        scale: 0.8,
                        opacity: 0.5
                    }}
                    transition={{ repeat: stage === "searching" ? Infinity : 0, duration: 2, ease: "easeInOut" }}
                >
                    <div className="w-16 h-16 rounded-full bg-orange-100 border-4 border-white shadow-md flex items-center justify-center text-3xl">
                        😎
                    </div>
                </motion.div>

                {/* Avatar 2 (Right) */}
                <motion.div
                    className="absolute right-4 z-10"
                    animate={stage === "searching" ? {
                        x: [0, -5, 0],
                        y: [0, 5, 0],
                    } : {
                        x: -60,
                        scale: 0.8,
                        opacity: 0.5
                    }}
                    transition={{ repeat: stage === "searching" ? Infinity : 0, duration: 2.2, ease: "easeInOut", delay: 0.2 }}
                >
                    <div className="w-16 h-16 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center text-3xl">
                        👩‍🦰
                    </div>
                </motion.div>

                {/* REVEAL: Food Card */}
                <AnimatePresence>
                    {(stage === "reveal" || stage === "celebrate") && (
                        <motion.div
                            className="absolute z-30"
                            initial={{ scale: 0, opacity: 0, rotate: -45 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <div className="relative w-48 h-60 bg-white rounded-3xl shadow-xl flex flex-col items-center justify-start border border-zinc-100 overflow-hidden">
                                {/* Image */}
                                <div className="w-full h-36 bg-orange-100 flex items-center justify-center text-7xl relative">
                                    🍔
                                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                        98% MATCH
                                    </div>
                                </div>

                                <div className="p-4 text-center w-full">
                                    <h3 className="text-lg font-black text-zinc-900 leading-tight">Burger King</h3>
                                    <p className="text-[10px] text-zinc-400 font-medium mt-1">American • $9.99</p>
                                    <div className="mt-3 flex gap-1 justify-center">
                                        <span className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-[9px] font-bold text-green-600">OPEN NOW</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Shockwave */}
                <AnimatePresence>
                    {stage === "reveal" && (
                        <motion.div
                            className="absolute z-0 w-40 h-40 rounded-full border-4 border-orange-400"
                            initial={{ scale: 0.5, opacity: 1 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Celebration Button */}
            <AnimatePresence>
                {stage === "celebrate" && (
                    <motion.div
                        className="mt-6 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex gap-2 w-full">
                            <button className="flex-1 bg-zinc-900 text-white py-3 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-transform">
                                Open Maps 🗺️
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Confetti */}
            {stage === "celebrate" && <ConfettiOverlay />}

        </motion.div>
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
                            backgroundColor: ["#F97316", "#EF4444", "#EAB308", "#10B981"][Math.floor(Math.random() * 4)]
                        }}
                    />
                </motion.div>
            ))}
        </div>
    )
}
