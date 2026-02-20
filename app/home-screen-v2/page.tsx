"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Baloo_2 } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
import "./home-screen-v2.css";

const baloo = Baloo_2({
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

function IconFork() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  lightBg: string;
  artBg: string;
  accent: string;
  emoji: string;
};

const BANNERS: Banner[] = [
  {
    id: "b1",
    title: "Quick Lunch Sprint",
    subtitle: "Swipe with your squad and lock a winner in 3 minutes.",
    cta: "Create Game",
    href: "/game-setup?preset=quick-lunch",
    lightBg: "#fff5ee",
    artBg: "#f97316",
    accent: "#ea580c",
    emoji: "⚡",
  },
  {
    id: "b2",
    title: "Zero Drama Dinner",
    subtitle: "Use preset constraints and jump straight into swiping.",
    cta: "Start Swipe",
    href: "/swipe?shortcut=tonight",
    lightBg: "#f5f0ff",
    artBg: "#9333ea",
    accent: "#7c3aed",
    emoji: "🎯",
  },
  {
    id: "b3",
    title: "Weekend Food Quest",
    subtitle: "Find trending spots with group-ready vibes.",
    cta: "Explore",
    href: "/explore?entry=weekend-quest",
    lightBg: "#f0fdf9",
    artBg: "#059669",
    accent: "#0d9488",
    emoji: "🗺️",
  },
];

const NAV_ITEMS = [
  { href: "/home-screen-v2", label: "Home", Icon: IconHome },
  { href: "/explore", label: "Explore", Icon: IconCompass },
  { href: "/map", label: "Map", Icon: IconMapPin },
  { href: "/appointment-setup", label: "Plan", Icon: IconCalendar },
  { href: "/preferences-setup", label: "Profile", Icon: IconUser },
];

const ENTRY_TILES = [
  { href: "/swipe?mode=menu", label: "Menu", Icon: IconFork, bg: "bg-orange-500" },
  { href: "/appointment-setup", label: "Appointment", Icon: IconCalendar, bg: "bg-blue-500" },
  { href: "/explore", label: "Explore", Icon: IconCompass, bg: "bg-emerald-500" },
];

const TRENDY = [
  { id: "t1", title: "After Work Winners", meta: "Open late + near station", href: "/swipe?preset=after-work", emoji: "🌆" },
  { id: "t2", title: "Under $20 Stars", meta: "Budget favorites this hour", href: "/swipe?preset=budget", emoji: "💰" },
  { id: "t3", title: "Brunch Battles", meta: "Top group picks for weekend", href: "/swipe?preset=brunch", emoji: "🥞" },
];

const SHORTCUTS = [
  { id: "s1", title: "Spicy Power", subtitle: "Thai + Korean + Sichuan", lock: "Cuisine locked", href: "/swipe?shortcut=spicy", skip: true, emoji: "🌶️" },
  { id: "s2", title: "Family Mode", subtitle: "Parking + child-friendly", lock: "Setup needed", href: "/game-setup?shortcut=family", skip: false, emoji: "👨‍👩‍👧" },
  { id: "s3", title: "Healthy Picks", subtitle: "Vegan + no-beef bias", lock: "Preference locked", href: "/swipe?shortcut=healthy", skip: true, emoji: "🥗" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomeScreenV2Page() {
  const pathname = usePathname();
  const [activeBanner, setActiveBanner] = useState(0);
  const [hasActiveGame] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % BANNERS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const banner = useMemo(() => BANNERS[activeBanner], [activeBanner]);

  return (
    <div className={`${baloo.className} hv2-root`}>
      <div className="hv2-phone">
        <div className="hv2-page">

          {/* Status Bar */}
          <div className="hv2-status">
            <span>9:41</span>
            <span className="hv2-battery" aria-hidden="true">
              <span className="hv2-battery__level" />
              <span className="hv2-battery__cap" />
            </span>
          </div>

          {/* Scrollable Content */}
          <div className="hv2-content">
            <div className="hv2-shell">

              {/* Header */}
              <header className="space-y-3">
                <div className="flex items-center justify-between">
                  <Link href="/preferences-setup" className="hv2-pressable hv2-avatar" aria-label="Open profile">
                    JT
                  </Link>
                  <Image src="/toast-logo.png" alt="Toast" width={72} height={72} className="rounded-2xl" />
                  <button className="hv2-pressable hv2-bell-btn" aria-label="Notifications">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                    </svg>
                  </button>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Good evening</p>
                  <h1 className="mt-1 text-[2rem] leading-8 font-extrabold text-zinc-900">Pick fast. Eat happy.</h1>
                </div>

                <label className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-2.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4 flex-shrink-0 text-zinc-500">
                    <circle cx="11" cy="11" r="7" strokeWidth="2" />
                    <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search area or restaurant"
                    className="w-full bg-transparent text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none"
                  />
                  <Link href="/explore" className="hv2-pressable rounded-lg bg-zinc-900 px-2.5 py-1 text-xs font-bold text-white">
                    Go
                  </Link>
                </label>
              </header>

              {/* Banner Carousel — split layout keeps color to ~35% of card width */}
              <section className="hv2-banner-card mt-4" style={{ backgroundColor: banner.lightBg }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={banner.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.22 }}
                    className="flex min-h-[96px]"
                  >
                    {/* Text side */}
                    <div className="flex-1 p-4 pr-2">
                      <p className="text-[10px] uppercase tracking-[0.16em] font-bold" style={{ color: banner.accent }}>
                        Featured
                      </p>
                      <h2 className="mt-1 text-xl leading-6 font-extrabold text-zinc-900">{banner.title}</h2>
                      <p className="mt-1 text-xs leading-4 text-zinc-600">{banner.subtitle}</p>
                      <Link
                        href={banner.href}
                        className="hv2-pressable mt-2.5 inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold text-white"
                        style={{ backgroundColor: banner.accent }}
                      >
                        {banner.cta} →
                      </Link>
                    </div>

                    {/* Colored art panel — ~35% card width */}
                    <div
                      className="hv2-banner-art flex w-24 flex-shrink-0 items-center justify-center text-5xl leading-none"
                      style={{ backgroundColor: banner.artBg }}
                    >
                      {banner.emoji}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dots */}
                <div className="flex gap-1.5 px-4 pb-3 pt-1">
                  {BANNERS.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveBanner(index)}
                      aria-label={`banner-${index + 1}`}
                      style={{ backgroundColor: activeBanner === index ? banner.accent : undefined }}
                      className={`h-1.5 rounded-full transition-all ${activeBanner === index ? "w-6" : "w-1.5 bg-zinc-300"}`}
                    />
                  ))}
                </div>
              </section>

              {/* Entry Tiles */}
              <section className="mt-4 grid grid-cols-3 gap-2">
                {ENTRY_TILES.map((tile) => (
                  <Link key={tile.href} href={tile.href} className="hv2-pressable rounded-2xl border border-zinc-100 bg-white px-2 py-3 text-center shadow-sm">
                    <div className={`mx-auto mb-1.5 flex h-10 w-10 items-center justify-center rounded-xl ${tile.bg} text-white`}>
                      <tile.Icon />
                    </div>
                    <p className="text-[11px] font-bold text-zinc-800">{tile.label}</p>
                  </Link>
                ))}
              </section>

              {/* Current Game Card */}
              {hasActiveGame && (
                <section className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5">
                  <p className="text-xs uppercase tracking-[0.14em] text-emerald-700">Current game</p>
                  <h3 className="mt-1 text-2xl leading-7 font-extrabold text-zinc-900">Friday Food Squad</h3>
                  <p className="mt-1 text-sm text-zinc-700">4 members · waiting for host · 00:58 left</p>
                  <Link href="/swipe?resume=true" className="hv2-pressable mt-3 inline-flex rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">
                    Resume Game →
                  </Link>
                </section>
              )}

              {/* Trendy Picks */}
              <section className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xs uppercase tracking-[0.18em] text-zinc-700">Trendy picks</h3>
                  <Link href="/explore" className="text-xs font-bold text-orange-600">View all</Link>
                </div>
                <div className="space-y-2">
                  {TRENDY.map((item) => (
                    <Link key={item.id} href={item.href} className="hv2-pressable flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white px-3 py-2.5 shadow-sm">
                      <span className="text-2xl leading-none">{item.emoji}</span>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">{item.title}</p>
                        <p className="text-xs text-zinc-500">{item.meta}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Game Shortcuts */}
              <section className="mt-4 pb-6">
                <h3 className="mb-2 text-xs uppercase tracking-[0.18em] text-zinc-700">Game shortcuts</h3>
                <div className="space-y-2">
                  {SHORTCUTS.map((item) => (
                    <Link key={item.id} href={item.href} className="hv2-pressable flex items-center gap-3 rounded-2xl border border-zinc-100 bg-white px-3 py-3 shadow-sm">
                      <span className="text-2xl leading-none">{item.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-zinc-900">{item.title}</p>
                        <p className="text-xs text-zinc-500">{item.subtitle}</p>
                        <p className="text-[10px] font-semibold text-zinc-400">{item.lock}</p>
                      </div>
                      <span className={`flex-shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${item.skip ? "bg-orange-100 text-orange-700" : "bg-zinc-100 text-zinc-600"}`}>
                        {item.skip ? "Skip setup" : "Setup"}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

            </div>
          </div>

          {/* FAB — floats above nav+gamebar, animates on y axis */}
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

          {/* Persistent Game Resume Bar — satisfies §4 IA "Current Game" top-level entry */}
          {hasActiveGame && (
            <Link href="/swipe?resume=true" className="hv2-game-bar">
              <span className="hv2-game-bar__dot" />
              <div className="min-w-0 flex-1">
                <p className="hv2-game-bar__name">Friday Food Squad</p>
                <p className="hv2-game-bar__sub">4 members · 00:58 left</p>
              </div>
              <span className="hv2-game-bar__cta">Resume →</span>
            </Link>
          )}

          {/* Bottom Nav */}
          <nav className="hv2-bottom-nav" aria-label="Bottom navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`hv2-tab ${active ? "hv2-tab--active" : ""}`}>
                  <item.Icon />
                  <span className="hv2-tab__label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

        </div>
      </div>
    </div>
  );
}
