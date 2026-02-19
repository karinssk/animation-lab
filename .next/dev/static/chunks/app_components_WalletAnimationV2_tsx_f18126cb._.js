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
                                        "Your crypto.",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                            lineNumber: 291,
                                            columnNumber: 17
                                        }, this),
                                        "Your control."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-[11px] leading-relaxed text-zinc-500",
                                    children: [
                                        "Create a brand new wallet or add an existing",
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
                                    className: "mt-4 w-full rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition-colors hover:bg-emerald-600",
                                    children: "Create a New Wallet"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/WalletAnimationV2.tsx",
                                    lineNumber: 299,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-[12px] font-medium text-zinc-700 underline underline-offset-2",
                                    children: "Add an Existing Wallet"
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
                        lineNumber: 326,
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
]);

//# sourceMappingURL=app_components_WalletAnimationV2_tsx_f18126cb._.js.map