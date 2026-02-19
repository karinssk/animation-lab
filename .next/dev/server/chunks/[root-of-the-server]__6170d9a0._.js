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
"[project]/app/api/places/details/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const API_KEY = process.env.GOOGLE_PLACE_API_KEY;
const BASE = "https://maps.googleapis.com/maps/api/place/details/json";
const FIELDS = [
    "name",
    "formatted_address",
    "formatted_phone_number",
    "geometry",
    "photos",
    "rating",
    "user_ratings_total",
    "reviews",
    "opening_hours",
    "website",
    "types",
    "price_level",
    "editorial_summary",
    "business_status"
].join(",");
async function GET(request) {
    const placeId = request.nextUrl.searchParams.get("placeId");
    if (!placeId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Missing placeId"
        }, {
            status: 400
        });
    }
    try {
        const params = new URLSearchParams({
            place_id: placeId,
            fields: FIELDS,
            key: API_KEY,
            language: "th"
        });
        const res = await fetch(`${BASE}?${params}`);
        const data = await res.json();
        if (data.status !== "OK") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: data.error_message || data.status
            }, {
                status: 400
            });
        }
        const r = data.result;
        /* eslint-disable @typescript-eslint/no-explicit-any */ const details = {
            placeId,
            name: r.name || "",
            formattedAddress: r.formatted_address || "",
            formattedPhone: r.formatted_phone_number || null,
            website: r.website || null,
            rating: r.rating ?? null,
            userRatingsTotal: r.user_ratings_total ?? 0,
            priceLevel: r.price_level ?? null,
            openNow: r.opening_hours?.open_now ?? null,
            weekdayText: r.opening_hours?.weekday_text || [],
            photos: (r.photos || []).slice(0, 8).map((p)=>({
                    photoReference: p.photo_reference,
                    width: p.width,
                    height: p.height
                })),
            reviews: (r.reviews || []).slice(0, 5).map((rv)=>({
                    authorName: rv.author_name || "Anonymous",
                    authorPhotoUrl: rv.profile_photo_url || "",
                    rating: rv.rating ?? 0,
                    relativeTime: rv.relative_time_description || "",
                    text: rv.text || ""
                })),
            types: r.types || [],
            editorialSummary: r.editorial_summary?.overview || null,
            location: r.geometry?.location || {
                lat: 0,
                lng: 0
            }
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(details, {
            headers: {
                "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600"
            }
        });
    } catch (err) {
        console.error("Place details error:", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6170d9a0._.js.map