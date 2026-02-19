(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/components/MagnifyingGlassMotion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MagnifyingGlassMotion
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
// ============================================================
// PHASE TIMING
// ============================================================
const PHASE_DURATIONS = {
    1: 2000,
    2: 2000,
    3: 2000,
    4: 2000,
    5: 2000,
    6: 2000,
    7: 2000
};
// Magnifying glass position per phase (% of content area)
const GLASS_POSITIONS = {
    1: {
        x: 50,
        y: 40,
        rotate: 0
    },
    2: {
        x: 22,
        y: 18,
        rotate: -10
    },
    3: {
        x: 75,
        y: 18,
        rotate: 8
    },
    4: {
        x: 72,
        y: 45,
        rotate: 12
    },
    5: {
        x: 65,
        y: 65,
        rotate: 5
    },
    6: {
        x: 22,
        y: 60,
        rotate: -8
    },
    7: {
        x: 45,
        y: 42,
        rotate: -3
    }
};
const LENS_DIAMETER = 52; // px — diameter of visible food reveal area (matches SVG lens)
const ANIM_AREA_WIDTH = 240;
const ANIM_AREA_HEIGHT = 180;
const LENS_OFFSET = 6;
const GLASS_SIZE = 80;
const GLASS_RADIUS = GLASS_SIZE / 2;
const GLASS_EDGE_PADDING = 6;
// ============================================================
// FOOD SVG ICONS (reused from WalletAnimation patterns)
// ============================================================
function BurgerIcon({ size = 32 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 40 40",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 18 Q8 8 20 8 Q32 8 32 18Z",
                fill: "#D97706"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "14",
                cy: "13",
                rx: "1.5",
                ry: "1",
                fill: "#FDE68A"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "22",
                cy: "11",
                rx: "1.5",
                ry: "1",
                fill: "#FDE68A"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "27",
                cy: "14",
                rx: "1.5",
                ry: "1",
                fill: "#FDE68A"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 18 Q10 22 14 18 Q18 22 22 18 Q26 22 30 18 Q34 22 34 19 L6 19Z",
                fill: "#22C55E"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 20 L33 20 L35 23 L5 23Z",
                fill: "#FCD34D"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "8",
                y: "23",
                width: "24",
                height: "5",
                fill: "#92400E",
                rx: "2"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 28 L32 28 Q32 34 20 34 Q8 34 8 28Z",
                fill: "#D97706"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = BurgerIcon;
function PizzaIcon({ size = 28 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 32 32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 2 L30 28 Q16 32 2 28Z",
                fill: "#D97706"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 5 L28 27 Q16 30 4 27Z",
                fill: "#FCD34D"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "14",
                cy: "18",
                r: "2.5",
                fill: "#DC2626"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "20",
                cy: "22",
                r: "2.5",
                fill: "#DC2626"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "17",
                cy: "12",
                r: "2",
                fill: "#DC2626"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "10",
                cy: "23",
                rx: "2",
                ry: "1.2",
                fill: "#16A34A",
                transform: "rotate(-20 10 23)"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c1 = PizzaIcon;
function FriesIcon({ size = 28 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 32 36",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "8",
                y: "2",
                width: "3",
                height: "18",
                rx: "1",
                fill: "#FCD34D",
                transform: "rotate(-8 9 10)"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "13",
                y: "1",
                width: "3",
                height: "19",
                rx: "1",
                fill: "#FBBF24"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "18",
                y: "2",
                width: "3",
                height: "18",
                rx: "1",
                fill: "#FCD34D",
                transform: "rotate(5 19 10)"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "22",
                y: "4",
                width: "3",
                height: "16",
                rx: "1",
                fill: "#F59E0B",
                transform: "rotate(10 23 12)"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 16 L28 16 L26 34 Q16 36 6 34Z",
                fill: "#DC2626"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 16 L28 16 L27 20 L5 20Z",
                fill: "#EF4444"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_c2 = FriesIcon;
function DonutIcon({ size = 28 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 32 32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "16",
                cy: "16",
                r: "14",
                fill: "#D97706"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 14 Q4 3 16 3 Q28 3 28 14 Q26 18 16 17 Q6 18 4 14Z",
                fill: "#EC4899"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "16",
                cy: "14",
                r: "5",
                fill: "#FEF3C7"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "8",
                y: "8",
                width: "3",
                height: "1.5",
                rx: "0.5",
                fill: "#3B82F6",
                transform: "rotate(30 9 8)"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "20",
                y: "7",
                width: "3",
                height: "1.5",
                rx: "0.5",
                fill: "#22C55E",
                transform: "rotate(-20 21 7)"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "12",
                y: "5",
                width: "3",
                height: "1.5",
                rx: "0.5",
                fill: "#F59E0B",
                transform: "rotate(45 13 5)"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "22",
                y: "12",
                width: "3",
                height: "1.5",
                rx: "0.5",
                fill: "#EF4444",
                transform: "rotate(-40 23 12)"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_c3 = DonutIcon;
function DumplingIcon({ size = 28 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 32 28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "16",
                cy: "18",
                rx: "14",
                ry: "9",
                fill: "#FEF3C7"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 101,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "16",
                cy: "18",
                rx: "14",
                ry: "9",
                fill: "none",
                stroke: "#D97706",
                strokeWidth: "1"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 14 Q8 8 11 12 Q14 6 16 12 Q18 6 21 12 Q24 8 27 14",
                stroke: "#D97706",
                strokeWidth: "1.2",
                fill: "none",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 103,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "12",
                cy: "19",
                r: "1.2",
                fill: "#92400E"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "20",
                cy: "19",
                r: "1.2",
                fill: "#92400E"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M14 22 Q16 24 18 22",
                stroke: "#92400E",
                strokeWidth: "1",
                fill: "none",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_c4 = DumplingIcon;
function NoodleBowlIcon({ size = 36 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 40 36",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "26",
                y: "1",
                width: "1.5",
                height: "20",
                rx: "0.5",
                fill: "#D97706",
                transform: "rotate(15 27 10)"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "29",
                y: "1",
                width: "1.5",
                height: "20",
                rx: "0.5",
                fill: "#B45309",
                transform: "rotate(25 30 10)"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M10 14 Q12 10 14 14 Q16 10 18 14",
                stroke: "#FCD34D",
                strokeWidth: "2",
                fill: "none",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M18 13 Q20 9 22 13 Q24 9 26 13",
                stroke: "#FBBF24",
                strokeWidth: "2",
                fill: "none",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2 16 L38 16 L34 32 Q20 36 6 32Z",
                fill: "#EF4444"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2 16 L38 16 L37 20 L3 20Z",
                fill: "#DC2626"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_c5 = NoodleBowlIcon;
function SushiIcon({ size = 28 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 28 28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "14",
                cy: "14",
                r: "12",
                fill: "#1F2937"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "14",
                cy: "14",
                r: "10",
                fill: "white"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "14",
                cy: "14",
                r: "7",
                fill: "#FB923C"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "14",
                cy: "14",
                r: "4",
                fill: "#EF4444"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_c6 = SushiIcon;
function TacoIcon({ size = 28 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 32 28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 22 Q3 8 16 8 Q29 8 29 22Z",
                fill: "#FCD34D"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 20 Q6 12 16 12 Q26 12 26 20Z",
                fill: "#D97706"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "11",
                cy: "17",
                r: "2",
                fill: "#DC2626"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "18",
                cy: "16",
                r: "1.8",
                fill: "#22C55E"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "22",
                cy: "18",
                r: "1.5",
                fill: "#FBBF24"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3 22 Q3 8 16 8 Q29 8 29 22",
                fill: "none",
                stroke: "#B45309",
                strokeWidth: "1.5"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_c7 = TacoIcon;
function ChiliIcon({ size = 20 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 16 28",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 6 Q6 4 8 2 Q10 0 9 2 Q12 4 8 6Z",
                fill: "#16A34A"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M5 6 Q3 14 4 20 Q5 26 8 26 Q11 26 12 20 Q13 14 11 6Z",
                fill: "#DC2626"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 7 Q5 14 6 18 Q7 22 8 22",
                stroke: "#EF4444",
                strokeWidth: "1.5",
                fill: "none",
                opacity: "0.5"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_c8 = ChiliIcon;
function CakeIcon({ size = 28 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 32 32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "4",
                y: "14",
                width: "24",
                height: "14",
                rx: "3",
                fill: "#FBBF24"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 161,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "4",
                y: "14",
                width: "24",
                height: "5",
                rx: "2",
                fill: "#EC4899"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "6",
                y: "12",
                width: "20",
                height: "4",
                rx: "2",
                fill: "#FDE68A"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "14",
                y: "4",
                width: "4",
                height: "10",
                rx: "1",
                fill: "#D97706"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "16",
                cy: "4",
                rx: "3",
                ry: "2",
                fill: "#F97316"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "16",
                cy: "3",
                r: "1.5",
                fill: "#FBBF24"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_c9 = CakeIcon;
function CoffeeIcon({ size = 28 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 32 32",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 10 L26 10 L24 28 Q16 30 8 28Z",
                fill: "#F5F5F4"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M6 10 L26 10 L25 14 L7 14Z",
                fill: "#E7E5E4"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M26 14 Q32 14 32 20 Q32 26 26 24",
                stroke: "#D6D3D1",
                strokeWidth: "2",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "16",
                cy: "11",
                rx: "9",
                ry: "2",
                fill: "#92400E"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M12 5 Q14 2 12 0",
                stroke: "#D6D3D1",
                strokeWidth: "1",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 4 Q18 1 16 -1",
                stroke: "#D6D3D1",
                strokeWidth: "1",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M20 5 Q22 2 20 0",
                stroke: "#D6D3D1",
                strokeWidth: "1",
                fill: "none"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}
_c10 = CoffeeIcon;
function IceCreamIcon({ size = 28 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 28 36",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M8 18 L14 34 L20 18Z",
                fill: "#D97706"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "9",
                y1: "20",
                x2: "13",
                y2: "32",
                stroke: "#B45309",
                strokeWidth: "0.5"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "19",
                y1: "20",
                x2: "15",
                y2: "32",
                stroke: "#B45309",
                strokeWidth: "0.5"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "14",
                cy: "14",
                r: "8",
                fill: "#FBBF24"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "10",
                cy: "10",
                r: "4",
                fill: "#EC4899"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 192,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "18",
                cy: "12",
                r: "3.5",
                fill: "#A7F3D0"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 193,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "14",
                cy: "7",
                r: "3",
                fill: "#FDE68A"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 187,
        columnNumber: 5
    }, this);
}
_c11 = IceCreamIcon;
// ============================================================
// MAGNIFYING GLASS SVG
// ============================================================
function MagnifyingGlassSVG({ size = 80 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 80 80",
        fill: "none",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "34",
                cy: "34",
                r: "26",
                stroke: "#A1A1AA",
                strokeWidth: "5",
                fill: "white",
                fillOpacity: "0.15"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M22 20 Q28 14 36 18",
                stroke: "white",
                strokeWidth: "3",
                strokeLinecap: "round",
                opacity: "0.6"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "52",
                y1: "52",
                x2: "72",
                y2: "72",
                stroke: "#71717A",
                strokeWidth: "7",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                x1: "54",
                y1: "54",
                x2: "70",
                y2: "70",
                stroke: "#A1A1AA",
                strokeWidth: "3",
                strokeLinecap: "round"
            }, void 0, false, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 205,
        columnNumber: 5
    }, this);
}
_c12 = MagnifyingGlassSVG;
const FOOD_ITEMS = [
    // Cluster A: near phase 2 (top-left)
    {
        id: "burger",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BurgerIcon, {
            size: 28
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 253,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 18,
        y: 17
    },
    {
        id: "fries",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FriesIcon, {
            size: 22
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 254,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 24,
        y: 20
    },
    {
        id: "dumpling",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DumplingIcon, {
            size: 24
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 255,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 14,
        y: 24
    },
    {
        id: "coffee",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CoffeeIcon, {
            size: 20
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 256,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 28,
        y: 15
    },
    {
        id: "pizza",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PizzaIcon, {
            size: 20
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 257,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 30,
        y: 26
    },
    // Cluster B: near phase 3 (top-right)
    {
        id: "donut",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DonutIcon, {
            size: 22
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 260,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 72,
        y: 16
    },
    {
        id: "noodle",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NoodleBowlIcon, {
            size: 26
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 261,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 78,
        y: 22
    },
    {
        id: "sushi",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SushiIcon, {
            size: 20
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 262,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 68,
        y: 24
    },
    {
        id: "cake",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CakeIcon, {
            size: 20
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 263,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 82,
        y: 15
    },
    {
        id: "taco",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TacoIcon, {
            size: 20
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 264,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 86,
        y: 27
    },
    // Cluster C: near phase 4 and 7 (center-right / center)
    {
        id: "icecream",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IceCreamIcon, {
            size: 20
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 267,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 70,
        y: 40
    },
    {
        id: "pizza2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PizzaIcon, {
            size: 18
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 268,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 76,
        y: 45
    },
    {
        id: "burger2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BurgerIcon, {
            size: 20
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 269,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 62,
        y: 43
    },
    {
        id: "chili",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChiliIcon, {
            size: 16
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 270,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 54,
        y: 40
    },
    {
        id: "dumpling2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DumplingIcon, {
            size: 20
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 271,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 47,
        y: 45
    },
    // Cluster D: near phase 5 (bottom-right)
    {
        id: "coffee2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CoffeeIcon, {
            size: 18
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 274,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 62,
        y: 61
    },
    {
        id: "fries2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FriesIcon, {
            size: 18
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 275,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 70,
        y: 65
    },
    {
        id: "pizza3",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PizzaIcon, {
            size: 18
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 276,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 74,
        y: 58
    },
    {
        id: "donut2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DonutIcon, {
            size: 18
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 277,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 58,
        y: 68
    },
    // Cluster E: near phase 6 (bottom-left)
    {
        id: "sushi2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SushiIcon, {
            size: 18
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 280,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 16,
        y: 60
    },
    {
        id: "cake2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CakeIcon, {
            size: 18
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 281,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 22,
        y: 66
    },
    {
        id: "icecream2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IceCreamIcon, {
            size: 16
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 282,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 28,
        y: 62
    },
    {
        id: "taco2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TacoIcon, {
            size: 18
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 283,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 18,
        y: 70
    },
    {
        id: "chili2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChiliIcon, {
            size: 14
        }, void 0, false, {
            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
            lineNumber: 284,
            columnNumber: 28
        }, ("TURBOPACK compile-time value", void 0)),
        x: 30,
        y: 56
    }
];
function MagnifyingGlassMotion() {
    _s();
    const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showOverlay, setShowOverlay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MagnifyingGlassMotion.useEffect": ()=>{
            let currentPhase = 1;
            let timeoutId;
            const advancePhase = {
                "MagnifyingGlassMotion.useEffect.advancePhase": ()=>{
                    currentPhase = currentPhase >= 7 ? 1 : currentPhase + 1;
                    setPhase(currentPhase);
                    timeoutId = setTimeout(advancePhase, PHASE_DURATIONS[currentPhase]);
                }
            }["MagnifyingGlassMotion.useEffect.advancePhase"];
            timeoutId = setTimeout(advancePhase, PHASE_DURATIONS[1]);
            return ({
                "MagnifyingGlassMotion.useEffect": ()=>clearTimeout(timeoutId)
            })["MagnifyingGlassMotion.useEffect"];
        }
    }["MagnifyingGlassMotion.useEffect"], []);
    const glassPos = GLASS_POSITIONS[phase];
    // Glass x/y offset from center (used by both glass and food viewport)
    const maxGlassOffsetX = ANIM_AREA_WIDTH / 2 - GLASS_RADIUS - GLASS_EDGE_PADDING;
    const maxGlassOffsetY = ANIM_AREA_HEIGHT / 2 - GLASS_RADIUS - GLASS_EDGE_PADDING;
    const normalizedX = (glassPos.x - 50) / 50;
    const normalizedY = (glassPos.y - 50) / 50;
    const glassX = normalizedX * maxGlassOffsetX;
    const glassY = normalizedY * maxGlassOffsetY;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden rounded-[3rem] border-[6px] border-zinc-900 bg-white shadow-2xl",
                style: {
                    width: 300,
                    height: 620
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 left-1/2 z-50 h-[26px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900"
                    }, void 0, false, {
                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-2 left-0 right-0 z-40 flex items-center justify-between px-8 pt-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-semibold text-zinc-900",
                                children: "9:41"
                            }, void 0, false, {
                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                lineNumber: 331,
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
                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                lineNumber: 334,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "3",
                                                y: "4",
                                                width: "2",
                                                height: "6",
                                                rx: "0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                lineNumber: 335,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "6",
                                                y: "2",
                                                width: "2",
                                                height: "8",
                                                rx: "0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                lineNumber: 336,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "9",
                                                y: "0",
                                                width: "2",
                                                height: "10",
                                                rx: "0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                lineNumber: 337,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                        lineNumber: 333,
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
                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                lineNumber: 340,
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
                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                lineNumber: 341,
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
                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                lineNumber: 342,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                        lineNumber: 339,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-0 right-0 top-[34px] bottom-0 overflow-hidden rounded-t-[2.5rem] bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-30 px-6 pt-6 pb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-bold text-zinc-900",
                                        children: "Table For Four"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                        lineNumber: 351,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-0.5 mt-0.5",
                                        children: [
                                            [
                                                1,
                                                2,
                                                3,
                                                4
                                            ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "12",
                                                    height: "12",
                                                    viewBox: "0 0 12 12",
                                                    fill: "#FBBF24",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M6 0.5 L7.5 4 L11.5 4.5 L8.5 7 L9.5 11 L6 9 L2.5 11 L3.5 7 L0.5 4.5 L4.5 4Z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 19
                                                    }, this)
                                                }, s, false, {
                                                    fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                    lineNumber: 354,
                                                    columnNumber: 17
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                width: "12",
                                                height: "12",
                                                viewBox: "0 0 12 12",
                                                fill: "#D4D4D8",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    d: "M6 0.5 L7.5 4 L11.5 4.5 L8.5 7 L9.5 11 L6 9 L2.5 11 L3.5 7 L0.5 4.5 L4.5 4Z"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                    lineNumber: 359,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                lineNumber: 358,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                        lineNumber: 352,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: showOverlay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute inset-0 z-30 bg-zinc-900/32 backdrop-blur-[0.5px]",
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            exit: {
                                                opacity: 0
                                            },
                                            transition: {
                                                duration: 0.25,
                                                ease: "easeOut"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                            lineNumber: 368,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            type: "button",
                                            "aria-label": "Close overlay",
                                            onClick: ()=>setShowOverlay(false),
                                            className: "absolute left-3 top-[72px] z-40 rounded px-1 py-0.5 text-[12px] text-zinc-400 transition-colors hover:text-zinc-700",
                                            initial: {
                                                opacity: 0
                                            },
                                            animate: {
                                                opacity: 1
                                            },
                                            exit: {
                                                opacity: 0
                                            },
                                            transition: {
                                                duration: 0.2,
                                                ease: "easeOut"
                                            },
                                            children: "x"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                            lineNumber: 376,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "absolute bottom-0 left-0 right-0 z-40 h-[330px] rounded-t-[1.6rem] bg-zinc-100 pt-3 shadow-[0_-10px_25px_rgba(0,0,0,0.12)]",
                                            initial: {
                                                y: 220,
                                                opacity: 0.65
                                            },
                                            animate: {
                                                y: 0,
                                                opacity: 1
                                            },
                                            exit: {
                                                y: 220,
                                                opacity: 0.65
                                            },
                                            transition: {
                                                duration: 0.35,
                                                ease: [
                                                    0.22,
                                                    1,
                                                    0.36,
                                                    1
                                                ]
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex h-full flex-col px-4 pb-7 pt-2 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative mx-auto h-[178px] w-[240px] overflow-hidden rounded-xl bg-zinc-200/35",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                className: "absolute pointer-events-none",
                                                                style: {
                                                                    width: LENS_DIAMETER,
                                                                    height: LENS_DIAMETER,
                                                                    borderRadius: "50%",
                                                                    overflow: "hidden",
                                                                    left: "50%",
                                                                    top: "50%",
                                                                    marginLeft: -(LENS_DIAMETER / 2) - LENS_OFFSET,
                                                                    marginTop: -(LENS_DIAMETER / 2) - LENS_OFFSET,
                                                                    zIndex: 19
                                                                },
                                                                animate: {
                                                                    x: glassX,
                                                                    y: glassY
                                                                },
                                                                transition: {
                                                                    duration: 1.4,
                                                                    ease: "easeInOut"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    style: {
                                                                        position: "absolute",
                                                                        width: ANIM_AREA_WIDTH,
                                                                        height: ANIM_AREA_HEIGHT,
                                                                        left: -(ANIM_AREA_WIDTH / 2 - LENS_DIAMETER / 2 - LENS_OFFSET),
                                                                        top: -(ANIM_AREA_HEIGHT / 2 - LENS_DIAMETER / 2 - LENS_OFFSET)
                                                                    },
                                                                    animate: {
                                                                        x: -glassX,
                                                                        y: -glassY
                                                                    },
                                                                    transition: {
                                                                        duration: 1.4,
                                                                        ease: "easeInOut"
                                                                    },
                                                                    children: FOOD_ITEMS.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "absolute",
                                                                            style: {
                                                                                left: `${item.x}%`,
                                                                                top: `${item.y}%`,
                                                                                opacity: 0.85,
                                                                                transform: "scale(1.15)"
                                                                            },
                                                                            children: item.icon
                                                                        }, item.id, false, {
                                                                            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                                            lineNumber: 432,
                                                                            columnNumber: 29
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                                    lineNumber: 417,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                                lineNumber: 398,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                className: "absolute z-20 pointer-events-none",
                                                                style: {
                                                                    left: "50%",
                                                                    top: "50%",
                                                                    marginLeft: -GLASS_RADIUS,
                                                                    marginTop: -GLASS_RADIUS
                                                                },
                                                                animate: {
                                                                    x: glassX,
                                                                    y: glassY,
                                                                    rotate: glassPos.rotate
                                                                },
                                                                transition: {
                                                                    duration: 1.4,
                                                                    ease: "easeInOut"
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                    animate: {
                                                                        y: [
                                                                            0,
                                                                            -6,
                                                                            0,
                                                                            6,
                                                                            0
                                                                        ],
                                                                        x: [
                                                                            0,
                                                                            3,
                                                                            0,
                                                                            -3,
                                                                            0
                                                                        ]
                                                                    },
                                                                    transition: {
                                                                        duration: 3,
                                                                        repeat: Infinity,
                                                                        ease: "easeInOut"
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MagnifyingGlassSVG, {
                                                                        size: GLASS_SIZE
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                                        lineNumber: 474,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                                    lineNumber: 463,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                                lineNumber: 448,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-2 text-base font-bold leading-tight text-zinc-800",
                                                        children: [
                                                            "Finding The Best",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                                lineNumber: 483,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Spots for You..."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                        lineNumber: 481,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mb-4 mt-1 px-4 text-[9px] leading-relaxed text-zinc-500/90",
                                                        children: "We're scanning nearby restaurants to find the perfect table for your group."
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                        lineNumber: 486,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                        className: "mx-auto mt-auto w-[78%] rounded-xl bg-zinc-500 py-2 text-[11px] font-semibold text-white shadow-md transition-colors hover:bg-zinc-400",
                                                        animate: {
                                                            opacity: [
                                                                0.7,
                                                                1,
                                                                0.7
                                                            ]
                                                        },
                                                        transition: {
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut"
                                                        },
                                                        children: "Show Results"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                        lineNumber: 489,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                                lineNumber: 396,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                            lineNumber: 389,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                                lineNumber: 365,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                        lineNumber: 348,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-2 left-1/2 h-[4px] w-[100px] -translate-x-1/2 rounded-full bg-zinc-900/20 z-40"
                    }, void 0, false, {
                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                        lineNumber: 504,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 322,
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
                            className: `h-2 w-2 rounded-full transition-colors duration-300 ${p === phase ? "bg-zinc-900 scale-125" : "bg-zinc-300"}`
                        }, p, false, {
                            fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                            lineNumber: 510,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-2 text-xs text-zinc-400",
                        children: [
                            "Frame ",
                            phase
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                        lineNumber: 517,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
                lineNumber: 508,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/MagnifyingGlassMotion.tsx",
        lineNumber: 320,
        columnNumber: 5
    }, this);
}
_s(MagnifyingGlassMotion, "1tTooZwMFaFJof+1Ps1D8k4l6tQ=");
_c13 = MagnifyingGlassMotion;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13;
__turbopack_context__.k.register(_c, "BurgerIcon");
__turbopack_context__.k.register(_c1, "PizzaIcon");
__turbopack_context__.k.register(_c2, "FriesIcon");
__turbopack_context__.k.register(_c3, "DonutIcon");
__turbopack_context__.k.register(_c4, "DumplingIcon");
__turbopack_context__.k.register(_c5, "NoodleBowlIcon");
__turbopack_context__.k.register(_c6, "SushiIcon");
__turbopack_context__.k.register(_c7, "TacoIcon");
__turbopack_context__.k.register(_c8, "ChiliIcon");
__turbopack_context__.k.register(_c9, "CakeIcon");
__turbopack_context__.k.register(_c10, "CoffeeIcon");
__turbopack_context__.k.register(_c11, "IceCreamIcon");
__turbopack_context__.k.register(_c12, "MagnifyingGlassSVG");
__turbopack_context__.k.register(_c13, "MagnifyingGlassMotion");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_components_MagnifyingGlassMotion_tsx_6ad8187b._.js.map