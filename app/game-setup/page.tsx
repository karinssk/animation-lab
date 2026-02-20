"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baloo_2 } from "next/font/google";
import "./game-setup.css";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

// ─── Data ─────────────────────────────────────────────────────────────────────

const MOCK_LINE_GROUPS = [
  { id: "g1", name: "Friday Food Squad", emoji: "🍔", count: 5 },
  { id: "g2", name: "Work Lunch Crew",   emoji: "🍱", count: 4 },
  { id: "g3", name: "Weekend Foodies",   emoji: "🍕", count: 7 },
];

const CUISINES = [
  { id: "thai",     label: "Thai",    emoji: "🇹🇭" },
  { id: "japanese", label: "Japan",   emoji: "🍣" },
  { id: "korean",   label: "Korean",  emoji: "🥩" },
  { id: "italian",  label: "Italian", emoji: "🍕" },
  { id: "western",  label: "Western", emoji: "🍔" },
  { id: "seafood",  label: "Seafood", emoji: "🦞" },
  { id: "street",   label: "Street",  emoji: "🌮" },
  { id: "vegan",    label: "Vegan",   emoji: "🥗" },
];

const DIETS    = ["Halal", "Vegan", "Vegetarian", "No Pork", "Gluten-Free"];
const BUDGETS  = ["$", "$$", "$$$", "$$$$"];
const RADII    = ["1 km", "3 km", "5 km", "10 km"];

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconBack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
         strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M15 18l-6-6 6-6"/>
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  );
}

function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" width="10" height="10">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GameSetupPage() {
  const [mode,           setMode]           = useState<"solo"|"group">("group");
  const [gameMode,       setGameMode]       = useState<"menu"|"restaurant">("menu");
  const [roomName,       setRoomName]       = useState("");
  const [groupId,        setGroupId]        = useState("");
  const [cuisines,       setCuisines]       = useState<Set<string>>(new Set());
  const [diets,          setDiets]          = useState<Set<string>>(new Set());
  const [budget,         setBudget]         = useState("$$");
  const [radius,         setRadius]         = useState("5 km");
  const [includePrefs,   setIncludePrefs]   = useState(false);
  const [locationPinned, setLocationPinned] = useState(false);
  const [showFilters,    setShowFilters]    = useState(false);

  const isValid = mode === "solo"
    ? locationPinned
    : (groupId !== "" && locationPinned);

  function toggleCuisine(id: string) {
    setCuisines(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  function toggleDiet(d: string) {
    setDiets(prev => {
      const n = new Set(prev);
      n.has(d) ? n.delete(d) : n.add(d);
      return n;
    });
  }

  const continueHref = mode === "solo"
    ? "/swipe?mode=solo"
    : `/waiting-room?group=${groupId}`;

  return (
    <div className={`${baloo.className} gs-root`}>
      <div className="gs-phone">

        {/* Status bar */}
        <div className="gs-status">
          <span>9:41</span>
          <span className="gs-battery" aria-hidden="true">
            <span className="gs-battery__level"/>
            <span className="gs-battery__cap"/>
          </span>
        </div>

        {/* Scrollable body */}
        <div className="gs-body">

          {/* Header */}
          <div className="gs-header">
            <Link href="/home-screen-v2" className="gs-back"><IconBack/></Link>
            <div>
              <p className="gs-header__label">New Game</p>
              <h1 className="gs-header__title">Set up your room 🎮</h1>
            </div>
          </div>

          {/* Mode toggle */}
          <div className="gs-section">
            <p className="gs-label">Play Mode</p>
            <div className="gs-mode-toggle">
              <button
                className={`gs-mode-btn${mode === "solo" ? " gs-mode-btn--active" : ""}`}
                onClick={() => setMode("solo")}
              >
                🙋 Solo
              </button>
              <button
                className={`gs-mode-btn${mode === "group" ? " gs-mode-btn--active" : ""}`}
                onClick={() => setMode("group")}
              >
                👥 Group
              </button>
            </div>
          </div>

          {/* Room name */}
          <div className="gs-section">
            <p className="gs-label">Room Name <span className="gs-label--opt">(optional)</span></p>
            <input
              className="gs-input"
              placeholder="e.g. Friday Food Squad…"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
              maxLength={40}
            />
          </div>

          {/* Group selection (group mode only) */}
          <AnimatePresence>
            {mode === "group" && (
              <motion.div
                key="group-select"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="gs-section"
              >
                <p className="gs-label">LINE Group</p>
                <div className="gs-group-list">
                  {MOCK_LINE_GROUPS.map(g => (
                    <button
                      key={g.id}
                      className={`gs-group-row${groupId === g.id ? " gs-group-row--active" : ""}`}
                      onClick={() => setGroupId(g.id)}
                    >
                      <span className="gs-group-row__emoji">{g.emoji}</span>
                      <div className="gs-group-row__info">
                        <p className="gs-group-row__name">{g.name}</p>
                        <p className="gs-group-row__meta">{g.count} members</p>
                      </div>
                      <div className="gs-group-row__check">
                        {groupId === g.id && <IconCheck/>}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game mode */}
          <div className="gs-section">
            <p className="gs-label">Game Mode</p>
            <div className="gs-gamemode-row">
              <button
                className={`gs-gamemode-card${gameMode === "menu" ? " gs-gamemode-card--active" : ""}`}
                onClick={() => setGameMode("menu")}
              >
                <span className="gs-gamemode-card__emoji">🍽️</span>
                <p className="gs-gamemode-card__title">Select Menu</p>
                <p className="gs-gamemode-card__sub">Pick a dish type first</p>
              </button>
              <button
                className={`gs-gamemode-card${gameMode === "restaurant" ? " gs-gamemode-card--active" : ""}`}
                onClick={() => setGameMode("restaurant")}
              >
                <span className="gs-gamemode-card__emoji">🏪</span>
                <p className="gs-gamemode-card__title">Select Restaurant</p>
                <p className="gs-gamemode-card__sub">Go straight to places</p>
              </button>
            </div>
          </div>

          {/* Location pin */}
          <div className="gs-section">
            <p className="gs-label">Center Location</p>
            <button
              className={`gs-location-btn${locationPinned ? " gs-location-btn--pinned" : ""}`}
              onClick={() => setLocationPinned(p => !p)}
            >
              <IconPin/>
              {locationPinned ? "📍 Sukhumvit 11, Bangkok" : "Tap to pin location"}
            </button>
          </div>

          {/* Filters (collapsible) */}
          <div className="gs-section">
            <button
              className="gs-filter-toggle"
              onClick={() => setShowFilters(p => !p)}
            >
              <span>🎛️ Filters</span>
              <span className="gs-filter-toggle__arrow">{showFilters ? "▲" : "▼"}</span>
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  key="filters"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="gs-filters-panel"
                >
                  {/* Cuisine */}
                  <p className="gs-sub-label">Cuisine</p>
                  <div className="gs-cuisine-grid">
                    {CUISINES.map(c => (
                      <button
                        key={c.id}
                        onClick={() => toggleCuisine(c.id)}
                        className={`gs-cuisine-pill${cuisines.has(c.id) ? " gs-cuisine-pill--active" : ""}`}
                      >
                        {c.emoji} {c.label}
                      </button>
                    ))}
                  </div>

                  {/* Diet */}
                  <p className="gs-sub-label" style={{marginTop:10}}>Dietary</p>
                  <div className="gs-diet-row">
                    {DIETS.map(d => (
                      <button
                        key={d}
                        onClick={() => toggleDiet(d)}
                        className={`gs-diet-pill${diets.has(d) ? " gs-diet-pill--active" : ""}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  {/* Budget */}
                  <p className="gs-sub-label" style={{marginTop:10}}>Budget</p>
                  <div className="gs-segment">
                    {BUDGETS.map(b => (
                      <button
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`gs-segment__btn${budget === b ? " gs-segment__btn--active" : ""}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>

                  {/* Radius */}
                  <p className="gs-sub-label" style={{marginTop:10}}>Search Radius</p>
                  <div className="gs-segment">
                    {RADII.map(r => (
                      <button
                        key={r}
                        onClick={() => setRadius(r)}
                        className={`gs-segment__btn${radius === r ? " gs-segment__btn--active" : ""}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Include preferences */}
          <div className="gs-section">
            <button
              className="gs-pref-toggle"
              onClick={() => setIncludePrefs(p => !p)}
            >
              <div>
                <p className="gs-pref-toggle__label">Include my preferences</p>
                <p className="gs-pref-toggle__sub">Apply your saved cuisine & diet settings</p>
              </div>
              <div className={`gs-toggle${includePrefs ? " gs-toggle--on" : ""}`}/>
            </button>
          </div>

          {/* Spacer for footer */}
          <div style={{height: 80}}/>
        </div>

        {/* Footer CTAs */}
        <div className="gs-footer">
          <Link
            href="/swipe?shortcut=default"
            className="gs-btn-ghost"
          >
            Skip Setup →
          </Link>
          <Link
            href={isValid ? continueHref : "#"}
            className={`gs-btn-primary${!isValid ? " gs-btn-primary--disabled" : ""}`}
            onClick={e => { if (!isValid) e.preventDefault(); }}
          >
            {mode === "solo" ? "Start Solo Game →" : "Create Room →"}
          </Link>
        </div>

      </div>
    </div>
  );
}
