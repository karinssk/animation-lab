"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import { motion } from "framer-motion";
import "./explore.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// ─── Icon Components ──────────────────────────────────────────────────────────

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1.41-5.17L17 9l-7.83 3.41L6 17l5.59-2.17z" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_FILTERS = [
  "Near me",
  "Open now",
  "Budget",
  "Group friendly",
  "Halal",
];

const EXPLORE_SHORTCUTS = [
  { id: "sc1", title: "Spicy Squad",       detail: "Thai + Korean + Sichuan",  lock: "Cuisine locked",    href: "/swipe?shortcut=spicy-squad",    skipSetup: true,  emoji: "🌶️" },
  { id: "sc2", title: "Transit Hunter",    detail: "Near BTS/MRT priority",    lock: "Distance locked",   href: "/swipe?shortcut=transit-hunter", skipSetup: true,  emoji: "🚇" },
  { id: "sc3", title: "Family Mode",       detail: "Parking + kids welcome",   lock: "Needs setup",       href: "/game-setup?shortcut=family-mode", skipSetup: false, emoji: "👨‍👩‍👧" },
  { id: "sc4", title: "Healthy Pick",      detail: "Vegan and low-fat focus",  lock: "Preference locked", href: "/swipe?shortcut=healthy-pick",   skipSetup: true,  emoji: "🥗" },
];

const TRENDING_THEMES = [
  { id: "th1", title: "After Work Rush",        meta: "Most played 6PM–9PM",  href: "/swipe?preset=after-work-rush", emoji: "🌆" },
  { id: "th2", title: "Weekend Brunch Battle",  meta: "Top weekend votes",    href: "/swipe?preset=weekend-brunch",  emoji: "🥞" },
  { id: "th3", title: "Midnight Munchies",      meta: "Open-late winners",    href: "/swipe?preset=midnight",        emoji: "🌙" },
];

const FEATURED = [
  { id: "f1", title: "Fast Decision Rooms",    subtitle: "Auto 3-minute mode",         href: "/game-setup?mode=quick", emoji: "⚡" },
  { id: "f2", title: "Menu-first Discovery",   subtitle: "Pick dishes before places",  href: "/swipe?mode=menu",       emoji: "🍽️" },
];

const NAV_ITEMS = [
  { href: "/home-screen-v2",    label: "Home",    Icon: IconHome },
  { href: "/explore",           label: "Explore", Icon: IconCompass },
  { href: "/map",               label: "Map",     Icon: IconMapPin },
  { href: "/appointment-setup", label: "Plan",    Icon: IconCalendar },
  { href: "/preferences-setup", label: "Profile", Icon: IconUser },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [hasActiveGame] = useState(true);

  const source        = searchParams.get("source")   ?? "";
  const entry         = searchParams.get("entry")    ?? "";
  const shortcutParam = searchParams.get("shortcut") ?? "";

  const highlightedShortcut = useMemo(() => {
    if (shortcutParam.includes("spicy"))   return "sc1";
    if (shortcutParam.includes("transit")) return "sc2";
    if (shortcutParam.includes("family"))  return "sc3";
    if (shortcutParam.includes("healthy")) return "sc4";
    return "";
  }, [shortcutParam]);

  const highlightedPill = useMemo(() => {
    if (source.includes("banner") || entry.includes("mood")) return "Hot now";
    if (shortcutParam.includes("spicy"))   return "Open now";
    if (shortcutParam.includes("transit")) return "Near me";
    if (shortcutParam.includes("family"))  return "Group friendly";
    if (shortcutParam.includes("healthy")) return "Halal";
    return "";
  }, [source, entry, shortcutParam]);

  const contextLabel = useMemo(() => {
    if (shortcutParam) return `Context: shortcut "${shortcutParam}"`;
    if (entry)         return `Context: ${entry.replace(/-/g, " ")}`;
    if (source)        return `Context: ${source.replace(/-/g, " ")}`;
    return "";
  }, [source, entry, shortcutParam]);

  return (
    <div className={`${jakarta.className} ex-root`}>
      <div className="ex-phone">
        <div className="ex-page">

          {/* Status Bar */}
          <div className="ex-status">
            <span>9:41</span>
            <span className="ex-battery" aria-hidden="true">
              <span className="ex-battery__level" />
              <span className="ex-battery__cap" />
            </span>
          </div>

          {/* Scrollable Content */}
          <div className="ex-content">
            <div className="ex-shell">

              {/* Header */}
              <header className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Explore</p>
                <h1 className="text-[1.8rem] leading-8 font-extrabold text-zinc-900">
                  Pick a vibe, skip the setup.
                </h1>

                <label className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 flex-shrink-0 text-zinc-500">
                    <circle cx="11" cy="11" r="7" strokeWidth="2" />
                    <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search moods, areas, restaurants"
                    className="w-full bg-transparent text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
                  />
                  <Link href="/map" className="ex-pressable rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-bold text-white">
                    Go
                  </Link>
                </label>

                {/* Quick Filter Pills */}
                <div className="ex-strip">
                  <span className={`ex-pill ex-pill--hot ${highlightedPill === "Hot now" ? "ex-pill--active" : ""}`}>
                    Hot now
                  </span>
                  {QUICK_FILTERS.map((item) => (
                    <button key={item} className={`ex-pill ${highlightedPill === item ? "ex-pill--active" : ""}`}>
                      {item}
                    </button>
                  ))}
                </div>

                {/* §6.4 Constraint Inheritance context chip */}
                {contextLabel && (
                  <div className="ex-context-chip">{contextLabel}</div>
                )}
              </header>

              {/* Featured */}
              <section className="mt-4">
                <p className="mb-2 text-[11px] uppercase tracking-[0.15em] text-zinc-500">Featured</p>
                <div className="ex-grid">
                  {FEATURED.map((item) => (
                    <Link key={item.id} href={item.href} className="ex-pressable ex-featured-card">
                      <span className="mb-1.5 block text-3xl leading-none">{item.emoji}</span>
                      <p className="text-sm font-extrabold text-zinc-900">{item.title}</p>
                      <p className="text-xs text-zinc-500">{item.subtitle}</p>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Shortcut Rooms */}
              <section className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xs uppercase tracking-[0.18em] text-zinc-700">Shortcut Rooms</h2>
                  <Link href="/game-setup" className="text-xs font-bold text-orange-600">Create custom</Link>
                </div>
                <div className="space-y-2">
                  {EXPLORE_SHORTCUTS.map((item) => {
                    const isHighlighted = highlightedShortcut === item.id;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={`ex-pressable flex items-center gap-3 rounded-2xl border px-3 py-3 ${
                          isHighlighted
                            ? "border-orange-300 bg-orange-50"
                            : "border-zinc-100 bg-white shadow-sm"
                        }`}
                      >
                        <span className="text-2xl leading-none">{item.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-zinc-900">{item.title}</p>
                          <p className="text-xs text-zinc-500">{item.detail}</p>
                          <p className="text-[10px] font-semibold text-zinc-400">{item.lock}</p>
                        </div>
                        <span className={`flex-shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${item.skipSetup ? "bg-orange-100 text-orange-700" : "bg-zinc-100 text-zinc-600"}`}>
                          {item.skipSetup ? "Skip setup" : "Setup"}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </section>

              {/* Trending Themes */}
              <section className="mt-4 pb-6">
                <div className="mb-2 flex items-center justify-between">
                  <h2 className="text-xs uppercase tracking-[0.18em] text-zinc-700">Trending Themes</h2>
                  <Link href="/swipe" className="text-xs font-bold text-orange-600">Play all</Link>
                </div>
                <div className="space-y-2">
                  {TRENDING_THEMES.map((item) => (
                    <Link key={item.id} href={item.href} className="ex-pressable flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white px-3 py-2.5 shadow-sm">
                      <span className="text-2xl leading-none">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">{item.title}</p>
                        <p className="text-xs text-zinc-500">{item.meta}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

            </div>
          </div>

          {/* FAB — create custom game room */}
          <motion.div
            className="absolute right-4 z-20"
            style={{ bottom: hasActiveGame ? 110 : 70 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
          >
            <Link
              href="/game-setup"
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-2xl text-white shadow-[0_16px_30px_rgba(249,115,22,0.45)]"
              aria-label="Create game room"
            >
              +
            </Link>
          </motion.div>

          {/* Persistent Game Resume Bar — consistent with Home */}
          {hasActiveGame && (
            <Link href="/swipe?resume=true" className="ex-game-bar">
              <span className="ex-game-bar__dot" />
              <div className="min-w-0 flex-1">
                <p className="ex-game-bar__name">Friday Food Squad</p>
                <p className="ex-game-bar__sub">4 members · 00:58 left</p>
              </div>
              <span className="ex-game-bar__cta">Resume →</span>
            </Link>
          )}

          {/* Bottom Nav */}
          <nav className="ex-nav" aria-label="Bottom navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`ex-nav__item ${active ? "ex-nav__item--active" : ""}`}>
                  <item.Icon />
                  <span className="ex-nav__label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

        </div>
      </div>
    </div>
  );
}
