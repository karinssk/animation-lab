"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Baloo_2 } from "next/font/google";
import "./preferences.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// ─── Icons ────────────────────────────────────────────────────────────────────

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

const CUISINES = [
  { id: "thai",       label: "Thai",       emoji: "🇹🇭" },
  { id: "japanese",   label: "Japanese",   emoji: "🍣" },
  { id: "korean",     label: "Korean",     emoji: "🥩" },
  { id: "italian",    label: "Italian",    emoji: "🍕" },
  { id: "chinese",    label: "Chinese",    emoji: "🥟" },
  { id: "indian",     label: "Indian",     emoji: "🍛" },
  { id: "western",    label: "Western",    emoji: "🍔" },
  { id: "seafood",    label: "Seafood",    emoji: "🦞" },
  { id: "street",     label: "Street Food",emoji: "🌮" },
  { id: "fusion",     label: "Fusion",     emoji: "✨" },
  { id: "vegan_food", label: "Vegan",      emoji: "🥗" },
  { id: "dessert",    label: "Dessert",    emoji: "🍰" },
];

const DIETS = [
  { id: "halal",       label: "Halal",         sub: "No pork or alcohol" },
  { id: "vegan",       label: "Vegan",          sub: "No animal products" },
  { id: "vegetarian",  label: "Vegetarian",     sub: "No meat or fish" },
  { id: "gluten_free", label: "Gluten-Free",    sub: "Wheat & barley free" },
  { id: "dairy_free",  label: "Dairy-Free",     sub: "No milk products" },
  { id: "no_pork",     label: "No Pork",        sub: "" },
  { id: "no_nuts",     label: "Nut Allergy",    sub: "All tree nuts & peanuts" },
];

const BUDGETS   = ["$", "$$", "$$$", "$$$$"];
const DISTANCES = ["1 km", "3 km", "5 km", "10 km"];

const NAV_ITEMS = [
  { href: "/home-screen-v2",    label: "Home",    Icon: IconHome },
  { href: "/explore",           label: "Explore", Icon: IconCompass },
  { href: "/map",               label: "Map",     Icon: IconMapPin },
  { href: "/appointment-setup", label: "Plan",    Icon: IconCalendar },
  { href: "/preferences-setup", label: "Profile", Icon: IconUser },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PreferencesPage() {
  const pathname = usePathname();
  const [hasActiveGame] = useState(true);

  const [cuisines, setCuisines] = useState<Set<string>>(
    new Set(["thai", "western", "japanese"])
  );
  const [diets, setDiets]       = useState<Set<string>>(new Set(["halal"]));
  const [budget, setBudget]     = useState("$$");
  const [distance, setDistance] = useState("5 km");
  const [saved, setSaved]       = useState(false);

  function toggleCuisine(id: string) {
    setCuisines((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setSaved(false);
  }

  function toggleDiet(id: string) {
    setDiets((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className={`${baloo.className} prf-root`}>
      <div className="prf-phone">
        <div className="prf-page">

          {/* Status bar */}
          <div className="prf-status">
            <span>9:41</span>
            <span className="prf-battery" aria-hidden="true">
              <span className="prf-battery__level" />
              <span className="prf-battery__cap" />
            </span>
          </div>

          {/* Scrollable body */}
          <div className="prf-content">

            {/* Profile header */}
            <div className="prf-header-band">
              <div className="prf-header-row">
                <div className="prf-avatar">JT</div>
                <div className="prf-identity">
                  <p className="prf-name">Jamie Torres</p>
                  <p className="prf-since">Member since Jan 2024</p>
                </div>
                <button className="prf-edit-btn">Edit</button>
              </div>

              <div className="prf-stats">
                <div className="prf-stat">
                  <p className="prf-stat__value">24</p>
                  <p className="prf-stat__label">Games</p>
                </div>
                <div className="prf-stat">
                  <p className="prf-stat__value">83</p>
                  <p className="prf-stat__label">Places</p>
                </div>
                <div className="prf-stat">
                  <p className="prf-stat__value">71%</p>
                  <p className="prf-stat__label">Win Rate</p>
                </div>
              </div>
            </div>

            {/* Preference sections */}
            <div className="prf-sections">

              {/* Cuisine */}
              <section>
                <p className="prf-section-title">Cuisine Preferences</p>
                <div className="prf-cuisine-grid">
                  {CUISINES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => toggleCuisine(c.id)}
                      className={`prf-cuisine-pill${cuisines.has(c.id) ? " prf-cuisine-pill--active" : ""}`}
                    >
                      <span>{c.emoji}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Dietary restrictions */}
              <section>
                <p className="prf-section-title">Dietary Restrictions</p>
                <div className="prf-diet-list">
                  {DIETS.map((d) => (
                    <button
                      key={d.id}
                      className="prf-diet-row"
                      onClick={() => toggleDiet(d.id)}
                    >
                      <div>
                        <p className="prf-diet-label">{d.label}</p>
                        {d.sub && <p className="prf-diet-sub">{d.sub}</p>}
                      </div>
                      <div className={`prf-toggle${diets.has(d.id) ? " prf-toggle--on" : ""}`} />
                    </button>
                  ))}
                </div>
              </section>

              {/* Budget */}
              <section>
                <p className="prf-section-title">Budget Range</p>
                <div className="prf-segment">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      onClick={() => { setBudget(b); setSaved(false); }}
                      className={`prf-segment__btn${budget === b ? " prf-segment__btn--active" : ""}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </section>

              {/* Distance */}
              <section>
                <p className="prf-section-title">Max Distance</p>
                <div className="prf-segment">
                  {DISTANCES.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDistance(d); setSaved(false); }}
                      className={`prf-segment__btn${distance === d ? " prf-segment__btn--active" : ""}`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </section>

              {/* Save */}
              <button
                onClick={handleSave}
                className={`prf-save-btn${saved ? " prf-save-btn--saved" : ""}`}
              >
                {saved ? "✓  Preferences Saved!" : "Save Preferences"}
              </button>

            </div>
          </div>

          {/* Persistent game bar */}
          {hasActiveGame && (
            <Link href="/swipe?resume=true" className="prf-game-bar">
              <span className="prf-game-bar__dot" />
              <div className="min-w-0 flex-1">
                <p className="prf-game-bar__name">Friday Food Squad</p>
                <p className="prf-game-bar__sub">4 members · 00:58 left</p>
              </div>
              <span className="prf-game-bar__cta">Resume →</span>
            </Link>
          )}

          {/* Bottom nav */}
          <nav className="prf-nav" aria-label="Bottom navigation">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`prf-nav__item${active ? " prf-nav__item--active" : ""}`}
                >
                  <item.Icon />
                  <span className="prf-nav__label">{item.label}</span>
                </Link>
              );
            })}
          </nav>

        </div>
      </div>
    </div>
  );
}
