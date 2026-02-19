module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/places/search/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const API_KEY = process.env.GOOGLE_PLACE_API_KEY;
const BASE = "https://maps.googleapis.com/maps/api/place";
const ALLOWED_TYPES = new Set([
    "restaurant",
    "cafe",
    "bar",
    "bakery",
    "meal_delivery",
    "meal_takeaway",
    "night_club"
]);
async function POST(request) {
    try {
        const body = await request.json();
        const { query = "restaurant", location, radius = 5000, type, pageToken } = body;
        const safeQuery = (query || "restaurant").slice(0, 200);
        const safeRadius = Math.min(Math.max(Number(radius) || 5000, 100), 50000);
        const safeType = type && ALLOWED_TYPES.has(type) ? type : undefined;
        // ALWAYS use Text Search for better natural language understanding ("vibe search")
        // Nearby Search is too strict with keywords.
        const params = new URLSearchParams({
            query: safeQuery,
            key: API_KEY,
            language: "th"
        });
        if (location) {
            params.set("location", `${location.lat},${location.lng}`);
            params.set("radius", String(safeRadius));
        }
        if (safeType) params.set("type", safeType);
        if (pageToken) params.set("pagetoken", pageToken);
        const url = `${BASE}/textsearch/json?${params}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.status === "REQUEST_DENIED" || data.status === "OVER_QUERY_LIMIT") {
            console.error("❌ Google Search API Error:", JSON.stringify(data, null, 2));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                results: [],
                nextPageToken: null,
                status: data.status,
                error: data.error_message
            }, {
                status: 429
            });
        }
        /* eslint-disable @typescript-eslint/no-explicit-any */ const results = (data.results || []).map((r)=>({
                placeId: r.place_id,
                name: r.name,
                address: r.formatted_address || r.vicinity || "",
                location: r.geometry?.location || {
                    lat: 0,
                    lng: 0
                },
                rating: r.rating ?? null,
                userRatingsTotal: r.user_ratings_total ?? 0,
                types: r.types || [],
                priceLevel: r.price_level ?? null,
                openNow: r.opening_hours?.open_now ?? null,
                photos: (r.photos || []).slice(0, 10).map((p)=>({
                        photoReference: p.photo_reference,
                        width: p.width,
                        height: p.height
                    }))
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            results,
            nextPageToken: data.next_page_token || null,
            status: data.status
        });
    } catch (err) {
        console.error("Places search error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            results: [],
            nextPageToken: null,
            status: "ERROR"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__213cb9cd._.js.map