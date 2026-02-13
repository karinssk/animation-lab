"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

// Toast Theme Colors
const THEME = {
    primary: "#FBBF24", // Amber-400 equivalent for 'Toast' Yellow
    primaryHover: "#F59E0B", // Amber-500
    light: "#FEF3C7", // Amber-100
    lighter: "#FFFBEB", // Amber-50
}

// --- Sub-components for Screens ---

const PhotoScreen = ({ onNext }: { onNext: () => void }) => (
    <div className="flex flex-col items-center justify-between h-full pt-24 pb-6 px-6">
        <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-zinc-900">Add your photo</h2>
            <p className="text-sm text-zinc-500 max-w-[200px] mx-auto">
                Add your photo — it will help your loved ones find you faster
            </p>
        </div>

        <div className="relative">
            {/* Ripple Effect */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: THEME.light }}
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5 + i * 0.2, opacity: 0 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeOut"
                    }}
                />
            ))}
            <div className="relative w-32 h-32 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10" style={{ backgroundColor: THEME.lighter }}>
                <span className="text-4xl">🍞</span>
            </div>
            <div className="absolute -bottom-2 text-xs text-zinc-400 font-medium left-1/2 -translate-x-1/2 pt-4">me</div>
        </div>

        <button
            onClick={onNext}
            className="w-full py-4 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
            style={{ backgroundColor: THEME.primary, boxShadow: `0 10px 15px -3px ${THEME.light}` }}
        >
            Add photo
        </button>
    </div>
);

const NameScreen = ({ onNext }: { onNext: () => void }) => (
    <div className="flex flex-col h-full pt-24 px-6 relative">
        <h2 className="text-2xl font-bold text-zinc-900 text-center mb-8">What's your name?</h2>

        <div className="flex flex-col items-center gap-2">
            <input
                type="text"
                placeholder="Type..."
                className="w-full text-center text-3xl font-bold text-zinc-800 placeholder:text-zinc-300 outline-none bg-transparent"
                autoFocus
            />
        </div>

        <div className="mt-auto pb-4 space-y-4">
            <button
                onClick={onNext}
                className="w-full py-4 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
                style={{ backgroundColor: THEME.primary, boxShadow: `0 10px 15px -3px ${THEME.light}` }}
            >
                Continue
            </button>

            {/* Simulated Keyboard */}
            <div className="bg-zinc-100 p-2 pb-6 -mx-6 rounded-t-3xl">
                <div className="flex flex-col gap-2 p-2">
                    <div className="flex gap-1 justify-center">
                        {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(k => (
                            <div key={k} className="bg-white rounded h-10 w-8 shadow-sm flex items-center justify-center text-xs font-bold text-zinc-900">{k}</div>
                        ))}
                    </div>
                    <div className="flex gap-1 justify-center px-4">
                        {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(k => (
                            <div key={k} className="bg-white rounded h-10 w-8 shadow-sm flex items-center justify-center text-xs font-bold text-zinc-900">{k}</div>
                        ))}
                    </div>
                    <div className="flex gap-1 justify-center px-8">
                        <div className="bg-zinc-300 rounded h-10 w-10 flex items-center justify-center">⬆️</div>
                        {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(k => (
                            <div key={k} className="bg-white rounded h-10 w-8 shadow-sm flex items-center justify-center text-xs font-bold text-zinc-900">{k}</div>
                        ))}
                        <div className="bg-zinc-300 rounded h-10 w-10 flex items-center justify-center">⌫</div>
                    </div>
                    <div className="flex justify-center mt-1">
                        <div className="bg-white rounded h-10 w-48 shadow-sm flex items-center justify-center text-xs">space</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const PlanScreen = ({ onNext }: { onNext: () => void }) => {
    const plans = [
        { icon: "🚀", title: "12:12", desc: "It's new to me", color: "bg-orange-50" },
        { icon: "📚", title: "16:8", desc: "I've tried fasting before", color: "bg-green-50" },
        { icon: "🎓", title: "18:6", desc: "I feel very knowledgeable", color: "bg-blue-50" },
        { icon: "⚙️", title: "Custom", desc: "Fit plan to your schedule", color: "bg-zinc-50" },
    ];

    return (
        <div className="flex flex-col h-full pt-24 px-6">
            <h2 className="text-2xl font-bold text-zinc-900 text-center mb-8">Choose fasting plan</h2>

            <div className="space-y-3">
                {plans.map((plan, i) => (
                    <motion.button
                        key={i}
                        onClick={onNext}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full p-4 rounded-2xl flex items-center gap-4 text-left transition-colors ${plan.color}`}
                    >
                        <div className="text-2xl">{plan.icon}</div>
                        <div className="flex-1">
                            <div className="font-bold text-zinc-900">{plan.title}</div>
                            <div className="text-xs text-zinc-500 font-medium">{plan.desc}</div>
                        </div>
                        <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Detail</div>
                    </motion.button>
                ))}
            </div>
            <div className="mt-4 text-center">
                <span className="text-xs font-bold text-zinc-400">Show more</span>
            </div>

            <div className="mt-auto pb-8 opacity-50 pointer-events-none">
                <button
                    className="w-full py-4 text-white font-bold rounded-2xl shadow-lg"
                    style={{ backgroundColor: THEME.primary }}
                >
                    Continue (Select Plan)
                </button>
            </div>
        </div>
    );
};

const TimePicker = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    // Generate times
    const times: string[] = [];
    for (let i = 0; i < 24; i++) {
        const hour = i % 12 === 0 ? 12 : i % 12;
        const ampm = i < 12 ? 'AM' : 'PM';
        times.push(`${hour}:00 ${ampm}`);
        times.push(`${hour}:30 ${ampm}`);
    }

    const ITEM_HEIGHT = 56; // h-14 = 56px

    // Handle scroll to update selected value
    const handleScroll = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scrollTop = container.scrollTop;
        const index = Math.round(scrollTop / ITEM_HEIGHT);

        if (times[index] && times[index] !== value) {
            onChange(times[index]);
        }
    };

    // Calculate initial scroll position
    useEffect(() => {
        if (containerRef.current) {
            const index = times.indexOf(value);
            if (index !== -1) {
                containerRef.current.scrollTop = index * ITEM_HEIGHT;
            }
        }
    }, []); // Run once on mount

    return (
        <div className="relative h-[280px] w-full overflow-hidden group">
            {/* Selection Highlight */}
            <div className="absolute w-full h-14 rounded-xl z-0 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" style={{ backgroundColor: THEME.light }} />

            <div
                ref={containerRef}
                className="h-full overflow-y-auto snap-y snap-mandatory no-scrollbar py-[112px]"
                onScroll={handleScroll}
            >
                {times.map((t, i) => {
                    const isActive = t === value;
                    return (
                        <div key={i} className="h-14 flex items-center justify-center snap-center shrink-0 transition-opacity">
                            <span
                                className={`text-xl font-bold transition-all cursor-pointer ${isActive
                                    ? "text-zinc-900 scale-110"
                                    : "text-zinc-300 scale-95 opacity-50"
                                    }`}
                                onClick={() => {
                                    // Allow clicking to select/scroll
                                    onChange(t);
                                    if (containerRef.current) {
                                        containerRef.current.scrollTo({ top: i * ITEM_HEIGHT, behavior: 'smooth' });
                                    }
                                }}
                            >
                                {t}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Simple gradients to hide edges */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
    )
}

const TimeScreen = ({ onNext }: { onNext: () => void }) => {
    const [time, setTime] = useState("9:00 AM");

    return (
        <div className="flex flex-col h-full pt-24 px-6 relative">
            <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-bold text-zinc-900 max-w-[200px] mx-auto">
                    When do you eat your <span style={{ color: THEME.primary }}>first meal</span>?
                </h2>
            </div>

            <TimePicker value={time} onChange={setTime} />

            <div className="mt-auto pb-8">
                <button
                    onClick={onNext}
                    className="w-full py-4 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
                    style={{ backgroundColor: THEME.primary, boxShadow: `0 10px 15px -3px ${THEME.light}` }}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}


export default function FastOnboardingAnimation() {
    const [step, setStep] = useState(0);

    const nextStep = () => {
        setStep((prev) => (prev + 1) % 4);
    };

    const prevStep = () => {
        if (step > 0) setStep((prev) => prev - 1);
    };

    // Auto-play logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setStep((prev) => (prev + 1) % 4);
        }, 3000); // 3 seconds per step
        return () => clearTimeout(timer);
    }, [step]);

    return (
        <div className="flex flex-col items-center justify-center p-8">
            {/* Phone Container */}
            <div
                className="relative overflow-hidden rounded-[3rem] border-[8px] border-zinc-900 bg-zinc-50 shadow-2xl"
                style={{ width: 320, height: 680 }}
            >
                {/* Use the exact same Dynamic Island as other components for consistency */}
                <div className="absolute top-2 left-1/2 z-50 h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-zinc-900" />

                {/* Header Navigation */}
                <div className="absolute top-12 left-6 right-6 z-50 flex justify-between items-center text-zinc-900">
                    <button onClick={prevStep} className="p-2 -ml-2 rounded-full active:bg-zinc-100 transition-colors">
                        {step > 0 ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                        ) : (
                            <span className="w-6 block"></span> // Spacer
                        )}
                    </button>
                    {step === 0 && (
                        <span className="text-sm font-bold text-zinc-400 cursor-pointer" onClick={nextStep}>Skip</span>
                    )}
                </div>

                {/* Screen Content with Transitions */}
                <div className="absolute inset-0 pt-0 pb-0 h-full w-full">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="photo"
                                className="w-full h-full"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PhotoScreen onNext={nextStep} />
                            </motion.div>
                        )}
                        {step === 1 && (
                            <motion.div
                                key="name"
                                className="w-full h-full"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NameScreen onNext={nextStep} />
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div
                                key="plan"
                                className="w-full h-full"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PlanScreen onNext={nextStep} />
                            </motion.div>
                        )}
                        {step === 3 && (
                            <motion.div
                                key="time"
                                className="w-full h-full"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TimeScreen onNext={() => setStep(0)} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Progress Dots (Optional, visual cue) */}
                <div className="absolute top-16 left-1/2 -translate-x-1/2 flex gap-1">
                    {[0, 1, 2, 3].map(i => (
                        <div
                            key={i}
                            className={`w-1 h-1 rounded-full transition-colors ${i === step ? 'bg-zinc-800' : 'bg-zinc-200'}`}
                        />
                    ))}
                </div>

            </div>

            {/* Frame Indicator (Outside phone, matching WalletAnimationV2 style) */}
            <div className="mt-4 flex items-center gap-2">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${i === step ? "scale-125" : "bg-zinc-300"
                            }`}
                        style={{ backgroundColor: i === step ? THEME.primary : undefined }}
                    />
                ))}
                <span className="ml-2 text-xs text-zinc-400">Frame {step + 1}</span>
            </div>
        </div>
    );
}
