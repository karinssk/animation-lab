"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function FamilyPerksAnimation() {
    const [stage, setStage] = useState<"intro" | "monthly" | "yearly">("intro");

    useEffect(() => {
        let mounted = true;
        const runSequence = async () => {
            while (mounted) {
                // Stage 1: Intro
                setStage("intro");
                await new Promise(r => setTimeout(r, 2000));
                if (!mounted) break;

                // Stage 2: Monthly Focus
                setStage("monthly");
                await new Promise(r => setTimeout(r, 2000));
                if (!mounted) break;

                // Stage 3: Yearly Focus
                setStage("yearly");
                await new Promise(r => setTimeout(r, 3000));
                if (!mounted) break;
            }
        };

        runSequence();
        return () => { mounted = false; };
    }, []);

    const stages = ["intro", "monthly", "yearly"];
    const currentStep = stages.indexOf(stage);

    // Simple floating animation for decorative elements
    const floatTransition = {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
        repeatType: "reverse" as const,
    };

    return (
        <div className="flex flex-col items-center justify-center p-8">
            {/* Phone Mockup Container */}
            <div
                className="relative overflow-hidden rounded-[3rem] border-[6px] border-zinc-900 bg-white shadow-2xl"
                style={{ width: 320, height: 680 }}
            >
                {/* Dynamic Island & Status Bar */}
                <div className="absolute top-2 left-1/2 z-50 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900" />
                <div className="absolute top-3 left-8 right-8 z-40 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-zinc-900">13:08</span>
                    <div className="flex gap-1">
                        <div className="h-3 w-4 rounded-sm border border-zinc-900" />
                        <div className="h-3 w-4 rounded-sm border border-zinc-900 bg-zinc-900" />
                    </div>
                </div>

                {/* Close Button (top-left) */}
                <button className="absolute top-12 left-6 z-20 text-zinc-800">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* Main Content */}
                <div className="flex h-full flex-col px-6 pt-24 pb-8">
                    {/* Header Section */}
                    <motion.div
                        className="relative mb-8 text-center"
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                    >
                        {/* Decorative Stars (Primary Color < 15%) */}
                        <motion.div
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ ...floatTransition, delay: 0 }}
                            className="absolute -top-8 left-10 text-amber-400"
                        >
                            <StarIcon size={24} />
                        </motion.div>
                        <motion.div
                            animate={{ y: [5, -5, 5] }}
                            transition={{ ...floatTransition, delay: 1 }}
                            className="absolute -top-10 right-10 text-amber-400"
                        >
                            <StarIcon size={18} />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: [0, 10, 0] }}
                            transition={{ ...floatTransition, duration: 4 }}
                            className="absolute top-0 right-20 text-amber-300"
                        >
                            <StarIcon size={12} />
                        </motion.div>

                        <h1 className="text-3xl font-black leading-tight text-zinc-900">
                            Perks for the
                            <br />
                            whole family!
                        </h1>
                    </motion.div>

                    {/* Avatars Row */}
                    <div className="relative mb-8 flex items-center justify-center gap-3">
                        {/* Decorative shapes (Secondary Color < 10%) */}
                        <motion.div
                            animate={{ x: [-3, 3, -3], rotate: [0, 10, 0] }}
                            transition={floatTransition}
                            className="absolute -left-2 top-0 text-sky-400"
                        >
                            <SparkleIcon size={16} />
                        </motion.div>
                        <motion.div
                            animate={{ x: [3, -3, 3], scale: [1, 1.1, 1] }}
                            transition={{ ...floatTransition, delay: 0.5 }}
                            className="absolute -right-2 bottom-0 text-purple-400"
                        >
                            <CircleIcon size={12} />
                        </motion.div>


                        <Avatar src="👨" color="bg-pink-200" delay={0} />
                        <Avatar src="👧" color="bg-blue-200" delay={0.1} />
                        <Avatar src="🧔" color="bg-orange-200" delay={0.2} />
                        <Avatar src="👩" color="bg-purple-200" delay={0.3} />
                    </div>

                    {/* Description */}
                    <p className="mb-8 text-center text-sm leading-relaxed text-zinc-500">
                        Help support company's mission & access free features and exclusive
                        discounts for every member of your household!
                    </p>

                    {/* Pricing Options */}
                    <div className="mt-auto flex flex-col gap-4">
                        {/* Yearly Option - Primary Highlight */}
                        <motion.div
                            animate={{
                                scale: stage === "yearly" ? 1.05 : 1,
                                borderColor: stage === "yearly" ? "#FBBF24" : "#E4E4E7",
                                backgroundColor: stage === "yearly" ? "#FFFBEB" : "#FFFFFF"
                            }}
                            className="relative flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 pr-12 transition-colors"
                        >
                            <div>
                                <div className="mb-1 flex items-center gap-2">
                                    <span className="font-bold text-zinc-900">Yearly</span>
                                    <span className="rounded-md bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold text-white">
                                        BEST VALUE
                                    </span>
                                </div>
                                <div className="text-xs text-zinc-500">
                                    <span className="line-through opacity-50 text-zinc-400">$77.99</span>{" "}
                                    <span className="text-zinc-900">$49.99/year</span>{" "}
                                    <span className="font-bold text-green-600">SAVE 50%</span>
                                </div>
                            </div>

                            <div className="text-right">
                                <span className="block font-bold text-zinc-900">$4</span>
                                <span className="text-[10px] text-zinc-500">/month</span>
                            </div>

                            {/* Checkmark Circle */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <motion.div
                                    animate={{
                                        backgroundColor: stage === "yearly" ? "#FBBF24" : "#E4E4E7",
                                        color: stage === "yearly" ? "#FFFFFF" : "transparent"
                                    }}
                                    className="flex h-6 w-6 items-center justify-center rounded-full"
                                >
                                    <CheckIcon size={14} strokeWidth={4} />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Monthly Option - Standard */}
                        <motion.div
                            animate={{
                                scale: stage === "monthly" ? 1.05 : 1,
                                borderColor: stage === "monthly" ? "#000000" : "#E4E4E7",
                                opacity: stage === "monthly" ? 1 : 0.6
                            }}
                            className="relative flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 pr-12 bg-white"
                        >
                            <div>
                                <span className="font-bold text-zinc-900">Monthly</span>
                            </div>

                            <div className="text-right">
                                <span className="block font-bold text-zinc-900">$8</span>
                                <span className="text-[10px] text-zinc-500">/month</span>
                            </div>

                            {/* Empty Circle */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <motion.div
                                    animate={{
                                        borderColor: stage === "monthly" ? "#000000" : "#E4E4E7"
                                    }}
                                    className="h-6 w-6 rounded-full border-2"
                                />
                            </div>
                        </motion.div>
                    </div>

                    <div className="mt-6 text-center">
                        <span className="text-xs font-semibold text-zinc-300">What's included</span>
                    </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 h-[5px] w-[130px] -translate-x-1/2 rounded-full bg-zinc-900/10" />
            </div>

            {/* Frame Indicator */}
            <div className="flex items-center gap-2 mt-4">
                {[0, 1, 2].map((i) => (
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

// Subcomponents
function Avatar({ src, color, delay }: { src: string; color: string; delay: number }) {
    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay, type: "spring", stiffness: 200, damping: 15 }}
            whileHover={{ y: -5 }}
            className={`flex h-12 w-12 items-center justify-center rounded-full ${color} shadow-sm text-2xl border-2 border-white`}
        >
            {src}
        </motion.div>
    );
}

function StarIcon({ size = 24, className = "" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
}

function SparkleIcon({ size = 24 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
    );
}

function CircleIcon({ size = 24 }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <circle cx="12" cy="12" r="10" />
        </svg>
    );
}

function CheckIcon({ size = 24, strokeWidth = 2 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    )
}
