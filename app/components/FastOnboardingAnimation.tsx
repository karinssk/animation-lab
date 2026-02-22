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

const PreferenceScreen = ({ onNext }: { onNext: () => void }) => {
    const DIET_OPTIONS = [
        { id: "halal", label: "Halal" },
        { id: "vegan", label: "Vegan" },
        { id: "vegetarian", label: "Vegetarian" },
        { id: "no-beef", label: "No Beef" },
        { id: "no-pork", label: "No Pork" },
        { id: "gluten-free", label: "Gluten-Free" },
    ];

    const CUISINE_OPTIONS = [
        { id: "thai", label: "Thai", emoji: "🇹🇭" },
        { id: "japanese", label: "Japanese", emoji: "🍣" },
        { id: "korean", label: "Korean", emoji: "🥩" },
        { id: "italian", label: "Italian", emoji: "🍕" },
        { id: "seafood", label: "Seafood", emoji: "🦞" },
        { id: "street-food", label: "Street Food", emoji: "🌮" },
    ];

    const [selectedDiets, setSelectedDiets] = useState<Set<string>>(new Set());
    const [selectedCuisines, setSelectedCuisines] = useState<Set<string>>(new Set());

    const toggleDiet = (value: string) => {
        setSelectedDiets((prev) => {
            const next = new Set(prev);
            if (next.has(value)) next.delete(value);
            else next.add(value);
            return next;
        });
    };

    const toggleCuisine = (value: string) => {
        setSelectedCuisines((prev) => {
            const next = new Set(prev);
            if (next.has(value)) next.delete(value);
            else next.add(value);
            return next;
        });
    };

    return (
        <div className="flex flex-col h-full pt-24 px-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-zinc-900">Your food preferences</h2>
                <p className="mt-2 text-xs font-medium text-zinc-500">
                    Pick diet restrictions and favorite cuisines for better matches.
                </p>
            </div>

            <div>
                <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2">
                    Diet restrictions
                </p>
                <div className="flex flex-wrap gap-2">
                    {DIET_OPTIONS.map((option) => {
                        const active = selectedDiets.has(option.id);
                        return (
                            <button
                                key={option.id}
                                onClick={() => toggleDiet(option.id)}
                                className={`rounded-full px-3 py-2 text-xs font-bold transition-colors ${active
                                    ? "text-zinc-900 border border-amber-300"
                                    : "text-zinc-500 border border-zinc-200"
                                    }`}
                                style={{ backgroundColor: active ? THEME.light : "#fff" }}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-5">
                <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 mb-2">
                    Favorite cuisines
                </p>
                <div className="grid grid-cols-2 gap-2">
                    {CUISINE_OPTIONS.map((option) => {
                        const active = selectedCuisines.has(option.id);
                        return (
                            <button
                                key={option.id}
                                onClick={() => toggleCuisine(option.id)}
                                className={`rounded-2xl px-3 py-3 text-left transition-colors border ${active ? "border-amber-300" : "border-zinc-200"
                                    }`}
                                style={{ backgroundColor: active ? THEME.lighter : "#fff" }}
                            >
                                <div className="text-lg leading-none">{option.emoji}</div>
                                <div className="mt-1 text-xs font-bold text-zinc-800">{option.label}</div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mt-auto pb-8 space-y-3">
                <button
                    onClick={onNext}
                    className="w-full py-4 text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-transform"
                    style={{ backgroundColor: THEME.primary, boxShadow: `0 10px 15px -3px ${THEME.light}` }}
                >
                    Continue
                </button>
                <button
                    onClick={onNext}
                    className="w-full py-2 text-xs font-bold text-zinc-400"
                >
                    Skip for now
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
    const TOTAL_STEPS = 3;

    const nextStep = () => {
        setStep((prev) => (prev + 1) % TOTAL_STEPS);
    };

    const prevStep = () => {
        if (step > 0) setStep((prev) => prev - 1);
    };

    // Auto-play logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setStep((prev) => (prev + 1) % TOTAL_STEPS);
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
                        {step === 1 && (
                            <motion.div
                                key="preferences"
                                className="w-full h-full"
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <PreferenceScreen onNext={nextStep} />
                            </motion.div>
                        )}
                        {step === 2 && (
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
                    {[0, 1, 2].map(i => (
                        <div
                            key={i}
                            className={`w-1 h-1 rounded-full transition-colors ${i === step ? 'bg-zinc-800' : 'bg-zinc-200'}`}
                        />
                    ))}
                </div>

            </div>

            {/* Frame Indicator (Outside phone, matching WalletAnimationV2 style) */}
            <div className="mt-4 flex items-center gap-2">
                {[0, 1, 2].map((i) => (
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

