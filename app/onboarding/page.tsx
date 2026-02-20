"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Baloo_2 } from "next/font/google";
import "./onboarding.css";

const baloo = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = "splash" | "login" | "location" | "cuisines" | "diet" | "done";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CUISINES = [
  { id: "thai",     label: "Thai",       emoji: "🇹🇭" },
  { id: "japanese", label: "Japanese",   emoji: "🍣" },
  { id: "korean",   label: "Korean",     emoji: "🥩" },
  { id: "italian",  label: "Italian",    emoji: "🍕" },
  { id: "chinese",  label: "Chinese",    emoji: "🥟" },
  { id: "indian",   label: "Indian",     emoji: "🍛" },
  { id: "western",  label: "Western",    emoji: "🍔" },
  { id: "seafood",  label: "Seafood",    emoji: "🦞" },
  { id: "street",   label: "Street Food",emoji: "🌮" },
  { id: "vegan",    label: "Vegan",      emoji: "🥗" },
  { id: "dessert",  label: "Dessert",    emoji: "🍰" },
  { id: "fusion",   label: "Fusion",     emoji: "✨" },
];

const DIETS = [
  { id: "halal",      label: "Halal",       sub: "No pork or alcohol" },
  { id: "vegan",      label: "Vegan",       sub: "No animal products" },
  { id: "vegetarian", label: "Vegetarian",  sub: "No meat or fish" },
  { id: "gluten",     label: "Gluten-Free", sub: "Wheat & barley free" },
  { id: "no_pork",    label: "No Pork",     sub: "" },
  { id: "no_nuts",    label: "Nut Allergy", sub: "All tree nuts & peanuts" },
];

const STEP_ORDER: Step[] = ["splash", "login", "location", "cuisines", "diet", "done"];

function stepIndex(s: Step) { return STEP_ORDER.indexOf(s); }

// ─── Slide wrapper ─────────────────────────────────────────────────────────────

function Slide({ children, dir }: { children: React.ReactNode; dir: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: dir * 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: dir * -30 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="ob-slide"
    >
      {children}
    </motion.div>
  );
}

// ─── Splash ───────────────────────────────────────────────────────────────────

function SplashStep({ onNext }: { onNext: () => void }) {
  return (
    <Slide dir={1}>
      <div className="ob-splash">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="ob-splash__logo"
        >
          🍞
        </motion.div>
        <motion.h1
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="ob-splash__title"
        >
          Toast
        </motion.h1>
        <motion.p
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="ob-splash__sub"
        >
          Pick fast. Eat happy. Together.
        </motion.p>
        <motion.button
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onNext}
          className="ob-btn-primary ob-splash__cta"
        >
          Get Started →
        </motion.button>
      </div>
    </Slide>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginStep({ onNext }: { onNext: () => void }) {
  return (
    <Slide dir={1}>
      <div className="ob-center-section">
        <p className="ob-step-label">Step 1 of 3</p>
        <h2 className="ob-step-title">Sign in with LINE</h2>
        <p className="ob-step-sub">
          We use your LINE account to connect with friends and share results instantly.
        </p>
        <div className="ob-info-card">
          <div className="ob-info-row">
            <span className="ob-info-icon">👤</span>
            <span className="ob-info-text">Your name & profile picture</span>
          </div>
          <div className="ob-info-row">
            <span className="ob-info-icon">🔗</span>
            <span className="ob-info-text">Connect with your LINE friends</span>
          </div>
          <div className="ob-info-row">
            <span className="ob-info-icon">📢</span>
            <span className="ob-info-text">Share game results to LINE groups</span>
          </div>
        </div>
        <button onClick={onNext} className="ob-btn-line">
          <svg viewBox="0 0 40 40" width="20" height="20">
            <rect width="40" height="40" rx="10" fill="#06C755"/>
            <path fill="#fff" d="M33.5 18.4c0-6.2-6.2-11.2-13.8-11.2S5.9 12.2 5.9 18.4c0 5.5 4.9 10.2 11.5 11.1.4.1 1.1.3 1.2.7.1.4 0 .9-.1 1.3l-.2 1c-.1.4-.3 1.5 1.3.8s8.6-5.1 11.7-8.7c2.2-2.4 3.2-4.8 3.2-6.2z"/>
          </svg>
          Continue with LINE
        </button>
        <p className="ob-privacy-note">We never post without your permission.</p>
      </div>
    </Slide>
  );
}

// ─── Location ─────────────────────────────────────────────────────────────────

function LocationStep({ onAllow, onDeny }: { onAllow: () => void; onDeny: () => void }) {
  return (
    <Slide dir={1}>
      <div className="ob-center-section">
        <p className="ob-step-label">Step 2 of 3</p>
        <div className="ob-location-icon">📍</div>
        <h2 className="ob-step-title">Allow location?</h2>
        <p className="ob-step-sub">
          Toast uses your location to find restaurants nearby and set the center for group games.
        </p>
        <div className="ob-info-card">
          <div className="ob-info-row">
            <span className="ob-info-icon">🗺️</span>
            <span className="ob-info-text">Find restaurants near you</span>
          </div>
          <div className="ob-info-row">
            <span className="ob-info-icon">📍</span>
            <span className="ob-info-text">Auto-set game center for solo play</span>
          </div>
          <div className="ob-info-row">
            <span className="ob-info-icon">🔒</span>
            <span className="ob-info-text">Location is never stored or shared</span>
          </div>
        </div>
        <button onClick={onAllow} className="ob-btn-primary">Allow Location ✓</button>
        <button onClick={onDeny} className="ob-btn-ghost">Set Location Manually</button>
      </div>
    </Slide>
  );
}

// ─── Cuisines ─────────────────────────────────────────────────────────────────

function CuisinesStep({ onNext }: { onNext: (sel: Set<string>) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <Slide dir={1}>
      <p className="ob-step-label">Step 3 of 3 · Part A</p>
      <h2 className="ob-step-title">What do you love eating?</h2>
      <p className="ob-step-sub">Pick as many as you like. This helps us pick better cards for you.</p>
      <div className="ob-cuisine-grid">
        {CUISINES.map(c => (
          <button
            key={c.id}
            onClick={() => toggle(c.id)}
            className={`ob-cuisine-pill${selected.has(c.id) ? " ob-cuisine-pill--active" : ""}`}
          >
            <span className="ob-cuisine-pill__emoji">{c.emoji}</span>
            <span>{c.label}</span>
          </button>
        ))}
      </div>
      <div className="ob-footer-fixed">
        <button
          onClick={() => onNext(selected)}
          className="ob-btn-primary"
          disabled={selected.size === 0}
        >
          Next →
        </button>
        <button onClick={() => onNext(new Set())} className="ob-btn-ghost">Skip for now</button>
      </div>
    </Slide>
  );
}

// ─── Diet ─────────────────────────────────────────────────────────────────────

function DietStep({ onNext }: { onNext: (sel: Set<string>) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <Slide dir={1}>
      <p className="ob-step-label">Step 3 of 3 · Part B</p>
      <h2 className="ob-step-title">Any dietary needs?</h2>
      <p className="ob-step-sub">We&apos;ll filter out restaurants that don&apos;t fit. Skip if none apply.</p>
      <div className="ob-diet-list">
        {DIETS.map(d => (
          <button
            key={d.id}
            onClick={() => toggle(d.id)}
            className={`ob-diet-row${selected.has(d.id) ? " ob-diet-row--active" : ""}`}
          >
            <div>
              <p className="ob-diet-label">{d.label}</p>
              {d.sub && <p className="ob-diet-sub">{d.sub}</p>}
            </div>
            <div className={`ob-toggle${selected.has(d.id) ? " ob-toggle--on" : ""}`} />
          </button>
        ))}
      </div>
      <div className="ob-footer-fixed">
        <button onClick={() => onNext(selected)} className="ob-btn-primary">
          {selected.size > 0 ? "Save & Continue →" : "Continue →"}
        </button>
      </div>
    </Slide>
  );
}

// ─── Done ─────────────────────────────────────────────────────────────────────

function DoneStep() {
  return (
    <Slide dir={1}>
      <div className="ob-done">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16 }}
          className="ob-done__emoji"
        >
          🎉
        </motion.div>
        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="ob-done__title"
        >
          You&apos;re all set!
        </motion.h2>
        <motion.p
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.32 }}
          className="ob-done__sub"
        >
          Time to pick where to eat. Let&apos;s go!
        </motion.p>
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.44 }}
        >
          <Link href="/home-screen-v2" className="ob-btn-primary ob-done__cta">
            Open Toast 🍞
          </Link>
        </motion.div>
      </div>
    </Slide>
  );
}

// ─── Progress dots ─────────────────────────────────────────────────────────────

function ProgressDots({ current }: { current: Step }) {
  const steps: Step[] = ["login", "location", "cuisines", "diet"];
  const idx = steps.indexOf(current);
  if (idx === -1) return null;
  return (
    <div className="ob-progress">
      {steps.map((s, i) => (
        <div
          key={s}
          className={`ob-progress__dot${i <= idx ? " ob-progress__dot--active" : ""}`}
        />
      ))}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>("splash");
  const [dir]  = useState(1);

  function goTo(s: Step) { setStep(s); }

  return (
    <div className={`${baloo.className} ob-root`}>
      <div className="ob-phone">
        {/* Status bar */}
        <div className="ob-status">
          <span>9:41</span>
          <span className="ob-battery" aria-hidden="true">
            <span className="ob-battery__level" />
            <span className="ob-battery__cap" />
          </span>
        </div>

        <ProgressDots current={step} />

        <div className="ob-body">
          <AnimatePresence mode="wait">
            {step === "splash" && (
              <SplashStep key="splash" onNext={() => goTo("login")} />
            )}
            {step === "login" && (
              <LoginStep key="login" onNext={() => goTo("location")} />
            )}
            {step === "location" && (
              <LocationStep
                key="location"
                onAllow={() => goTo("cuisines")}
                onDeny={() => goTo("cuisines")}
              />
            )}
            {step === "cuisines" && (
              <CuisinesStep key="cuisines" onNext={() => goTo("diet")} />
            )}
            {step === "diet" && (
              <DietStep key="diet" onNext={() => goTo("done")} />
            )}
            {step === "done" && <DoneStep key="done" />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
