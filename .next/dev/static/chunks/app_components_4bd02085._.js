(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/WalletAnimationV2.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WalletAnimationV2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// ============================================================
// EMOJI FOOD ICON — renders native emoji as high-quality images
// ============================================================
function FoodEmoji({ emoji, size = 32 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        role: "img",
        style: {
            fontSize: size,
            lineHeight: 1,
            display: "block",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
        },
        children: emoji
    }, void 0, false, {
        fileName: "[project]/app/components/WalletAnimationV2.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = FoodEmoji;
const DECORATIVE_ITEMS = [
    // USA food
    {
        id: "burger",
        emoji: "🍔",
        size: 40,
        x: 30,
        y: 6,
        floatX: 10,
        floatY: 12,
        duration: 5.0,
        entryFrom: {
            x: 30,
            y: -25
        },
        exitTo: {
            x: 30,
            y: -30
        }
    },
    {
        id: "pizza",
        emoji: "🍕",
        size: 30,
        x: 75,
        y: 18,
        floatX: 10,
        floatY: 14,
        duration: 4.2,
        entryFrom: {
            x: 120,
            y: -10
        },
        exitTo: {
            x: 125,
            y: -15
        }
    },
    {
        id: "fries",
        emoji: "🍟",
        size: 28,
        x: 5,
        y: 42,
        floatX: 12,
        floatY: 14,
        duration: 3.3,
        entryFrom: {
            x: -20,
            y: 42
        },
        exitTo: {
            x: -25,
            y: 50
        }
    },
    {
        id: "hotdog",
        emoji: "🌭",
        size: 26,
        x: 58,
        y: 55,
        floatX: 10,
        floatY: 10,
        duration: 4.5,
        entryFrom: {
            x: 120,
            y: 55
        },
        exitTo: {
            x: 125,
            y: 60
        }
    },
    {
        id: "donut",
        emoji: "🍩",
        size: 28,
        x: 82,
        y: 5,
        floatX: 14,
        floatY: 10,
        duration: 4.0,
        entryFrom: {
            x: 120,
            y: 5
        },
        exitTo: {
            x: 125,
            y: -10
        }
    },
    {
        id: "taco",
        emoji: "🌮",
        size: 24,
        x: 42,
        y: 48,
        floatX: 10,
        floatY: 12,
        duration: 3.8,
        entryFrom: {
            x: 42,
            y: -20
        },
        exitTo: {
            x: -25,
            y: 48
        }
    },
    // Chinese food
    {
        id: "dumpling",
        emoji: "🥟",
        size: 32,
        x: 10,
        y: 8,
        floatX: 12,
        floatY: 16,
        duration: 3.5,
        entryFrom: {
            x: -20,
            y: -15
        },
        exitTo: {
            x: -25,
            y: -20
        }
    },
    {
        id: "noodle",
        emoji: "🍜",
        size: 38,
        x: 62,
        y: 2,
        floatX: 8,
        floatY: 12,
        duration: 3.7,
        entryFrom: {
            x: 62,
            y: -20
        },
        exitTo: {
            x: 120,
            y: -15
        }
    },
    {
        id: "fortune",
        emoji: "🥠",
        size: 24,
        x: 48,
        y: 3,
        floatX: 8,
        floatY: 12,
        duration: 3.8,
        entryFrom: {
            x: 48,
            y: -20
        },
        exitTo: {
            x: 48,
            y: -25
        }
    },
    {
        id: "takeout",
        emoji: "🥡",
        size: 28,
        x: 80,
        y: 38,
        floatX: 10,
        floatY: 14,
        duration: 3.6,
        entryFrom: {
            x: 120,
            y: 38
        },
        exitTo: {
            x: 125,
            y: 42
        }
    },
    {
        id: "bao",
        emoji: "🥮",
        size: 22,
        x: 25,
        y: 60,
        floatX: 8,
        floatY: 10,
        duration: 4.6,
        entryFrom: {
            x: -20,
            y: 60
        },
        exitTo: {
            x: -25,
            y: 65
        }
    },
    // Thai food
    {
        id: "curry",
        emoji: "🍛",
        size: 36,
        x: 3,
        y: 22,
        floatX: 10,
        floatY: 12,
        duration: 4.3,
        entryFrom: {
            x: -20,
            y: 22
        },
        exitTo: {
            x: -25,
            y: 18
        }
    },
    {
        id: "shrimp",
        emoji: "🍤",
        size: 26,
        x: 28,
        y: 32,
        floatX: 12,
        floatY: 10,
        duration: 4.1,
        entryFrom: {
            x: -20,
            y: 32
        },
        exitTo: {
            x: -25,
            y: 28
        }
    },
    {
        id: "mango",
        emoji: "🥭",
        size: 28,
        x: 72,
        y: 12,
        floatX: 10,
        floatY: 14,
        duration: 4.0,
        entryFrom: {
            x: 120,
            y: 12
        },
        exitTo: {
            x: 125,
            y: 8
        }
    },
    {
        id: "chili",
        emoji: "🌶️",
        size: 24,
        x: 20,
        y: 4,
        floatX: 8,
        floatY: 12,
        duration: 3.5,
        entryFrom: {
            x: -20,
            y: 4
        },
        exitTo: {
            x: -25,
            y: -10
        }
    },
    {
        id: "skewer",
        emoji: "🍢",
        size: 26,
        x: 50,
        y: 38,
        floatX: 12,
        floatY: 10,
        duration: 3.9,
        entryFrom: {
            x: 120,
            y: 38
        },
        exitTo: {
            x: 50,
            y: -20
        }
    },
    {
        id: "chili2",
        emoji: "🌶️",
        size: 20,
        x: 15,
        y: 55,
        floatX: 8,
        floatY: 10,
        duration: 4.4,
        entryFrom: {
            x: -20,
            y: 55
        },
        exitTo: {
            x: -25,
            y: 60
        }
    },
    {
        id: "rice",
        emoji: "🍚",
        size: 22,
        x: 85,
        y: 52,
        floatX: 10,
        floatY: 8,
        duration: 4.1,
        entryFrom: {
            x: 120,
            y: 52
        },
        exitTo: {
            x: 125,
            y: 55
        }
    },
    {
        id: "sushi",
        emoji: "🍣",
        size: 24,
        x: 68,
        y: 58,
        floatX: 8,
        floatY: 12,
        duration: 3.7,
        entryFrom: {
            x: 120,
            y: 58
        },
        exitTo: {
            x: 125,
            y: 62
        }
    }
];
const FALLING_FOODS = [
    // Wave 1 — phase 4 (few items)
    {
        id: "ff1",
        emoji: "🥟",
        x: 30,
        delay: 0,
        fallDuration: 2.2,
        size: 30
    },
    {
        id: "ff2",
        emoji: "🍔",
        x: 62,
        delay: 0.4,
        fallDuration: 2.0,
        size: 26
    },
    {
        id: "ff3",
        emoji: "🍣",
        x: 48,
        delay: 0.8,
        fallDuration: 2.5,
        size: 22
    },
    // Wave 2 — phase 5 (more items)
    {
        id: "ff4",
        emoji: "🍕",
        x: 18,
        delay: 2.0,
        fallDuration: 1.8,
        size: 28
    },
    {
        id: "ff5",
        emoji: "🥟",
        x: 75,
        delay: 2.3,
        fallDuration: 2.0,
        size: 24
    },
    {
        id: "ff6",
        emoji: "🍩",
        x: 42,
        delay: 2.6,
        fallDuration: 2.3,
        size: 30
    },
    {
        id: "ff7",
        emoji: "🍤",
        x: 55,
        delay: 3.0,
        fallDuration: 1.9,
        size: 20
    },
    // Wave 3 — phase 6 (dense rain)
    {
        id: "ff8",
        emoji: "🍣",
        x: 12,
        delay: 4.0,
        fallDuration: 1.6,
        size: 26
    },
    {
        id: "ff9",
        emoji: "🍔",
        x: 35,
        delay: 4.2,
        fallDuration: 1.8,
        size: 32
    },
    {
        id: "ff10",
        emoji: "🥠",
        x: 68,
        delay: 4.4,
        fallDuration: 1.5,
        size: 22
    },
    {
        id: "ff11",
        emoji: "🍕",
        x: 85,
        delay: 4.6,
        fallDuration: 2.0,
        size: 28
    },
    {
        id: "ff12",
        emoji: "🌭",
        x: 25,
        delay: 4.8,
        fallDuration: 1.4,
        size: 24
    },
    {
        id: "ff13",
        emoji: "🥟",
        x: 52,
        delay: 5.0,
        fallDuration: 1.7,
        size: 20
    }
];
// ============================================================
// PHASE TIMING
// ============================================================
const PHASE_DURATIONS = {
    1: 2500,
    2: 2500,
    3: 2500,
    4: 2000,
    5: 2000,
    6: 2000,
    7: 2000
};
const CENTER_X = 45;
const CENTER_Y = 32;
// ============================================================
// SUB-COMPONENTS
// ============================================================
function FloatingElement({ item, phase }) {
    let targetX = item.x;
    let targetY = item.y;
    if (phase === 2) {
        targetX = item.x + (CENTER_X - item.x) * 0.25;
        targetY = item.y + (CENTER_Y - item.y) * 0.25;
    } else if (phase === 3) {
        targetX = item.x + (CENTER_X - item.x) * 0.45;
        targetY = item.y + (CENTER_Y - item.y) * 0.45;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        style: {
            position: "absolute"
        },
        initial: {
            left: `${item.entryFrom.x}%`,
            top: `${item.entryFrom.y}%`,
            opacity: 0,
            scale: 0.3
        },
        animate: {
            left: `${targetX}%`,
            top: `${targetY}%`,
            opacity: 1,
            scale: 1
        },
        exit: {
            left: `${item.exitTo.x}%`,
            top: `${item.exitTo.y}%`,
            opacity: 0,
            scale: 0.3
        },
        transition: {
            duration: 0.9,
            ease: "easeOut"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            animate: {
                x: [
                    0,
                    item.floatX,
                    -item.floatX * 0.6,
                    item.floatX * 0.8,
                    0
                ],
                y: [
                    0,
                    -item.floatY,
                    item.floatY * 0.6,
                    -item.floatY * 0.4,
                    0
                ],
                rotate: [
                    0,
                    8,
                    -6,
                    10,
                    0
                ]
            },
            transition: {
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FoodEmoji, {
                emoji: item.emoji,
                size: item.size
            }, void 0, false, {
                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                lineNumber: 163,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/WalletAnimationV2.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/WalletAnimationV2.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}
_c1 = FloatingElement;
function FallingFood({ item }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        style: {
            position: "absolute",
            left: `${item.x}%`
        },
        initial: {
            top: "-10%",
            opacity: 0
        },
        animate: {
            top: "110%",
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        transition: {
            top: {
                duration: item.fallDuration,
                delay: item.delay,
                repeat: Infinity,
                ease: [
                    0.45,
                    0,
                    0.85,
                    1
                ]
            },
            opacity: {
                duration: 0.3,
                delay: item.delay
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            animate: {
                rotate: [
                    0,
                    20,
                    -15,
                    25,
                    0
                ],
                x: [
                    -4,
                    6,
                    -5,
                    4,
                    -4
                ]
            },
            transition: {
                duration: item.fallDuration * 0.8,
                repeat: Infinity,
                ease: "easeInOut"
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FoodEmoji, {
                emoji: item.emoji,
                size: item.size
            }, void 0, false, {
                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                lineNumber: 196,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/components/WalletAnimationV2.tsx",
            lineNumber: 192,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/WalletAnimationV2.tsx",
        lineNumber: 171,
        columnNumber: 5
    }, this);
}
_c2 = FallingFood;
function WalletAnimationV2() {
    _s();
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WalletAnimationV2.useEffect": ()=>{
            let currentPhase = 1;
            let timeoutId;
            const advancePhase = {
                "WalletAnimationV2.useEffect.advancePhase": ()=>{
                    currentPhase = currentPhase >= 7 ? 1 : currentPhase + 1;
                    setPhase(currentPhase);
                    timeoutId = setTimeout(advancePhase, PHASE_DURATIONS[currentPhase]);
                }
            }["WalletAnimationV2.useEffect.advancePhase"];
            timeoutId = setTimeout(advancePhase, PHASE_DURATIONS[1]);
            return ({
                "WalletAnimationV2.useEffect": ()=>clearTimeout(timeoutId)
            })["WalletAnimationV2.useEffect"];
        }
    }["WalletAnimationV2.useEffect"], []);
    const showDecorative = phase <= 2 || phase === 7;
    const showFalling = phase >= 3 && phase <= 6;
    const showText = phase !== 3;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative rounded-[3rem] border-[6px] border-zinc-900 bg-white shadow-2xl",
                style: {
                    width: 300,
                    height: 620
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 left-1/2 z-50 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900"
                    }, void 0, false, {
                        fileName: "[project]/app/components/WalletAnimationV2.tsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 left-0 right-0 z-40 flex items-center justify-between px-8 pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-semibold text-zinc-900",
                                children: "9:41"
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "12",
                                        height: "10",
                                        viewBox: "0 0 12 10",
                                        fill: "currentColor",
                                        className: "text-zinc-900",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "0",
                                                y: "6",
                                                width: "2",
                                                height: "4",
                                                rx: "0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                                lineNumber: 242,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "3",
                                                y: "4",
                                                width: "2",
                                                height: "6",
                                                rx: "0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                                lineNumber: 243,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "6",
                                                y: "2",
                                                width: "2",
                                                height: "8",
                                                rx: "0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                                lineNumber: 244,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "9",
                                                y: "0",
                                                width: "2",
                                                height: "10",
                                                rx: "0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                                lineNumber: 245,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "14",
                                        height: "10",
                                        viewBox: "0 0 14 10",
                                        fill: "none",
                                        stroke: "currentColor",
                                        className: "text-zinc-900",
                                        strokeWidth: "1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "0.5",
                                                y: "1.5",
                                                width: "10",
                                                height: "7",
                                                rx: "1"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                                lineNumber: 248,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "11",
                                                y: "3.5",
                                                width: "2",
                                                height: "3",
                                                rx: "0.5",
                                                fill: "currentColor"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                                lineNumber: 249,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "1.5",
                                                y: "2.5",
                                                width: "7",
                                                height: "5",
                                                rx: "0.5",
                                                fill: "currentColor"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                                lineNumber: 250,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                        lineNumber: 247,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                lineNumber: 240,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/WalletAnimationV2.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-0 right-0 top-[34px] overflow-hidden rounded-t-[2.5rem]",
                        style: {
                            height: 400
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "sync",
                                children: showDecorative && DECORATIVE_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FloatingElement, {
                                        item: item,
                                        phase: phase
                                    }, item.id, false, {
                                        fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                        lineNumber: 264,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: showFalling && FALLING_FOODS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FallingFood, {
                                        item: item
                                    }, item.id, false, {
                                        fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                        lineNumber: 272,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/WalletAnimationV2.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute bottom-0 left-0 right-0 z-10 rounded-b-[2.5rem] px-6 pb-8 pt-10 text-center",
                            style: {
                                background: "linear-gradient(to top, white 70%, rgba(255,255,255,0.95) 85%, rgba(255,255,255,0) 100%)"
                            },
                            initial: {
                                opacity: 0,
                                y: 50
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: 50
                            },
                            transition: {
                                duration: 0.5,
                                ease: "easeOut"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-[22px] font-bold leading-tight text-zinc-900",
                                    children: [
                                        "Eat what you love.",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                            lineNumber: 291,
                                            columnNumber: 17
                                        }, this),
                                        "Find it here."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-[11px] leading-relaxed text-zinc-500",
                                    children: [
                                        "Discover new restaurants and cuisines.",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                            lineNumber: 296,
                                            columnNumber: 17
                                        }, this),
                                        "one to get started easily."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "mt-4 w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white shadow-md shadow-zinc-200 transition-colors hover:bg-zinc-800",
                                    children: "Find a Restaurant"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-[12px] font-medium text-zinc-700 underline underline-offset-2",
                                    children: "Add an Existing Account"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                    lineNumber: 302,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 text-[8px] text-zinc-400",
                                    children: "Terms of Use • Privacy Policy"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                    lineNumber: 305,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, "ui-content", true, {
                            fileName: "[project]/app/components/WalletAnimationV2.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/WalletAnimationV2.tsx",
                        lineNumber: 278,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900/20"
                    }, void 0, false, {
                        fileName: "[project]/app/components/WalletAnimationV2.tsx",
                        lineNumber: 313,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                lineNumber: 230,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        7
                    ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `h-2 w-2 rounded-full transition-colors duration-300 ${p === phase ? "bg-emerald-500 scale-125" : "bg-zinc-300"}`
                        }, p, false, {
                            fileName: "[project]/app/components/WalletAnimationV2.tsx",
                            lineNumber: 319,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-2 text-xs text-zinc-400",
                        children: [
                            "Frame ",
                            phase
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/WalletAnimationV2.tsx",
                        lineNumber: 325,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/WalletAnimationV2.tsx",
                lineNumber: 317,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/WalletAnimationV2.tsx",
        lineNumber: 228,
        columnNumber: 5
    }, this);
}
_s(WalletAnimationV2, "fRfHeLc+vMFtXm9L8NbmanC/R8E=");
_c3 = WalletAnimationV2;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "FoodEmoji");
__turbopack_context__.k.register(_c1, "FloatingElement");
__turbopack_context__.k.register(_c2, "FallingFood");
__turbopack_context__.k.register(_c3, "WalletAnimationV2");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/CommentArea.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommentArea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function CommentArea({ slug }) {
    _s();
    const [comments, setComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedImage, setSelectedImage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [deletingCommentId, setDeletingCommentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Fetch comments on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommentArea.useEffect": ()=>{
            if (!slug) return;
            fetch(`/api/comments?slug=${slug}`).then({
                "CommentArea.useEffect": (res)=>res.json()
            }["CommentArea.useEffect"]).then({
                "CommentArea.useEffect": (data)=>{
                    if (Array.isArray(data)) setComments(data);
                }
            }["CommentArea.useEffect"]).catch({
                "CommentArea.useEffect": (err)=>console.error("Failed to load comments", err)
            }["CommentArea.useEffect"]);
        }
    }["CommentArea.useEffect"], [
        slug
    ]);
    const handleImageUpload = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!text.trim() && !selectedImage) return;
        setIsLoading(true);
        try {
            const res = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text,
                    image: selectedImage,
                    slug
                })
            });
            if (res.ok) {
                const newComment = await res.json();
                setComments([
                    newComment,
                    ...comments
                ]);
                setText("");
                setSelectedImage(null);
            }
        } catch (error) {
            console.error("Failed to post comment", error);
        } finally{
            setIsLoading(false);
        }
    };
    const handleDeleteComment = async (commentId)=>{
        setDeletingCommentId(commentId);
        try {
            const res = await fetch(`/api/comments?id=${encodeURIComponent(commentId)}&slug=${encodeURIComponent(slug)}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setComments((prev)=>prev.filter((comment)=>comment.id !== commentId));
            }
        } catch (error) {
            console.error("Failed to delete comment", error);
        } finally{
            setDeletingCommentId(null);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "max-w-2xl mx-auto mt-14 mb-10 px-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-3xl border-2 border-zinc-300 bg-zinc-50/95 shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-5 sm:p-6 dark:border-zinc-700 dark:bg-zinc-900/95",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100",
                    children: "Discussion"
                }, void 0, false, {
                    fileName: "[project]/app/components/CommentArea.tsx",
                    lineNumber: 94,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `bg-white dark:bg-zinc-900 rounded-2xl shadow-md border-2 border-zinc-200 dark:border-zinc-700 p-4 mb-8 transition-opacity ${isLoading ? 'opacity-50 pointer-events-none' : ''}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleSubmit,
                        className: "flex flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: text,
                                onChange: (e)=>setText(e.target.value),
                                placeholder: "Write a comment...",
                                className: "w-full resize-none bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-zinc-400 text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 min-h-[90px]"
                            }, void 0, false, {
                                fileName: "[project]/app/components/CommentArea.tsx",
                                lineNumber: 99,
                                columnNumber: 25
                            }, this),
                            selectedImage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative w-fit",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: selectedImage,
                                        alt: "Preview",
                                        className: "h-32 w-auto rounded-lg object-cover border border-zinc-200 dark:border-zinc-700"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CommentArea.tsx",
                                        lineNumber: 108,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setSelectedImage(null),
                                        className: "absolute -top-2 -right-2 bg-zinc-900 text-white rounded-full p-1 shadow-md hover:bg-zinc-700 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            width: "12",
                                            height: "12",
                                            viewBox: "0 0 24 24",
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: "3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "18",
                                                    y1: "6",
                                                    x2: "6",
                                                    y2: "18"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CommentArea.tsx",
                                                    lineNumber: 119,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                                                    x1: "6",
                                                    y1: "6",
                                                    x2: "18",
                                                    y2: "18"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CommentArea.tsx",
                                                    lineNumber: 120,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/CommentArea.tsx",
                                            lineNumber: 118,
                                            columnNumber: 37
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CommentArea.tsx",
                                        lineNumber: 113,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/CommentArea.tsx",
                                lineNumber: 107,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>fileInputRef.current?.click(),
                                                className: "p-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors",
                                                title: "Add Image",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "20",
                                                    height: "20",
                                                    viewBox: "0 0 24 24",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: "2",
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                            x: "3",
                                                            y: "3",
                                                            width: "18",
                                                            height: "18",
                                                            rx: "2",
                                                            ry: "2"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/CommentArea.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                            cx: "8.5",
                                                            cy: "8.5",
                                                            r: "1.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/CommentArea.tsx",
                                                            lineNumber: 136,
                                                            columnNumber: 41
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("polyline", {
                                                            points: "21 15 16 10 5 21"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/CommentArea.tsx",
                                                            lineNumber: 137,
                                                            columnNumber: 41
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/CommentArea.tsx",
                                                    lineNumber: 134,
                                                    columnNumber: 37
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CommentArea.tsx",
                                                lineNumber: 128,
                                                columnNumber: 33
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "file",
                                                ref: fileInputRef,
                                                onChange: handleImageUpload,
                                                accept: "image/*",
                                                className: "hidden"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CommentArea.tsx",
                                                lineNumber: 140,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/CommentArea.tsx",
                                        lineNumber: 127,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: !text.trim() && !selectedImage,
                                        className: "px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-semibold rounded-full hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
                                        children: isLoading ? 'Posting...' : 'Post Comment'
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/CommentArea.tsx",
                                        lineNumber: 149,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/CommentArea.tsx",
                                lineNumber: 126,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/CommentArea.tsx",
                        lineNumber: 98,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/CommentArea.tsx",
                    lineNumber: 97,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                            initial: false,
                            mode: "popLayout",
                            children: comments.map((comment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20,
                                        scale: 0.95
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1
                                    },
                                    exit: {
                                        opacity: 0,
                                        scale: 0.9
                                    },
                                    layout: true,
                                    className: "flex gap-4 p-4 bg-white dark:bg-zinc-900 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 shadow-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm",
                                                children: "U"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/CommentArea.tsx",
                                                lineNumber: 173,
                                                columnNumber: 33
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/CommentArea.tsx",
                                            lineNumber: 172,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 min-w-0",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-baseline justify-between mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold text-zinc-900 dark:text-zinc-100 text-sm",
                                                            children: "User"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/components/CommentArea.tsx",
                                                            lineNumber: 180,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-zinc-400",
                                                                    children: new Date(comment.createdAt).toLocaleTimeString([], {
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    })
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/CommentArea.tsx",
                                                                    lineNumber: 182,
                                                                    columnNumber: 41
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>handleDeleteComment(comment.id),
                                                                    disabled: deletingCommentId === comment.id,
                                                                    className: "text-xs font-medium text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                                                                    children: deletingCommentId === comment.id ? "Deleting..." : "Delete"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/CommentArea.tsx",
                                                                    lineNumber: 185,
                                                                    columnNumber: 41
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/CommentArea.tsx",
                                                            lineNumber: 181,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/CommentArea.tsx",
                                                    lineNumber: 179,
                                                    columnNumber: 33
                                                }, this),
                                                comment.text && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-zinc-600 dark:text-zinc-300 text-sm mb-2 break-words",
                                                    children: comment.text
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CommentArea.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 37
                                                }, this),
                                                comment.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: comment.image,
                                                    alt: "Comment attachment",
                                                    className: "rounded-lg max-h-60 w-auto object-cover border border-zinc-100 dark:border-zinc-800"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/CommentArea.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/CommentArea.tsx",
                                            lineNumber: 178,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, comment.id, true, {
                                    fileName: "[project]/app/components/CommentArea.tsx",
                                    lineNumber: 164,
                                    columnNumber: 29
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/components/CommentArea.tsx",
                            lineNumber: 162,
                            columnNumber: 21
                        }, this),
                        comments.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center py-12 text-zinc-500 dark:text-zinc-400 text-sm bg-white/70 dark:bg-zinc-900/60 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl",
                            children: "No comments yet for this page."
                        }, void 0, false, {
                            fileName: "[project]/app/components/CommentArea.tsx",
                            lineNumber: 213,
                            columnNumber: 25
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/CommentArea.tsx",
                    lineNumber: 161,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/CommentArea.tsx",
            lineNumber: 93,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/CommentArea.tsx",
        lineNumber: 92,
        columnNumber: 9
    }, this);
}
_s(CommentArea, "q9kwFCOyKPpItkfdHn+C6wYs6XY=");
_c = CommentArea;
var _c;
__turbopack_context__.k.register(_c, "CommentArea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_4bd02085._.js.map