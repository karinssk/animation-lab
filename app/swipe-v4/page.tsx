"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Baloo_2 } from "next/font/google";
import "./swipe-v4.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

type Spot = {
  id: string;
  name: string;
  hearts: number;
  flames: number;
  distance: string;
  image: string;
};

const TASTE_DOTS = ["#ff6b39", "#f9c736", "#f3d13c", "#f6dc5f", "#ff6b39"];

const MENU_SPOTS: Spot[] = [
  {
    id: "see-fah",
    name: "See Fah",
    hearts: 4,
    flames: 5,
    distance: "400 m",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=1200&q=80",
  },
  {
    id: "thipsamai",
    name: "Thipsamai Pratoopee",
    hearts: 5,
    flames: 5,
    distance: "1.3 km",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&q=80",
  },
];

const DEMO_TIMES = [0, 0.08, 0.16, 0.26, 0.34, 0.44, 0.54, 0.64, 0.76, 0.88, 0.94, 1];
const DEMO_DURATION = 5.4;

function IconHeartSolid({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-6.7-4.3-9.4-8.1c-2-2.9-1.2-6.5 1.7-8.2 2.3-1.3 4.7-.7 6.3 1 1.6-1.7 4-2.3 6.3-1 2.9 1.7 3.7 5.3 1.7 8.2C18.7 16.7 12 21 12 21z" />
    </svg>
  );
}

function IconFlame({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.3 2.4c.6 2.2-.1 3.7-1.6 5.4-1 1.2-1.8 2.2-1.8 3.8 0 1.8 1.4 3.1 3.1 3.1 2.4 0 4.2-2.1 4.2-4.5 0-1.1-.3-2.1-.8-3.2 2.2 1.2 3.8 3.7 3.8 6.5 0 4.1-3.2 7.3-7.2 7.3s-7.2-3.2-7.2-7.2c0-2.9 1.7-5.4 4.1-6.7-.4 1-.6 1.7-.6 2.6 0 1.4.8 2.5 2 2.5 1 0 2-.8 2-2.1 0-1.1-.8-2-1.4-2.8-1.1-1.2-1.8-2.2-1.6-4.7z" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeWidth="2.3" strokeLinecap="round" />
    </svg>
  );
}

function IconFilter() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M7 12h10M10 17h4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IconBack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M15 4.5L7.5 12 15 19.5" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSignal() {
  return (
    <svg viewBox="0 0 12 10" fill="currentColor" aria-hidden="true">
      <rect x="0" y="6" width="2" height="4" rx="0.5" />
      <rect x="3" y="4" width="2" height="6" rx="0.5" />
      <rect x="6" y="2" width="2" height="8" rx="0.5" />
      <rect x="9" y="0" width="2" height="10" rx="0.5" />
    </svg>
  );
}

function IconWifi() {
  return (
    <svg viewBox="0 0 16 12" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M1 4.6C4.8 1.2 11.2 1.2 15 4.6" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.7 7.2c2.6-2.3 6-2.3 8.6 0" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.7 9.7c.8-.7 1.8-.7 2.6 0" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconBattery() {
  return (
    <svg viewBox="0 0 20 10" fill="none" stroke="currentColor" aria-hidden="true">
      <rect x="0.7" y="1.2" width="16.2" height="7.5" rx="1.7" strokeWidth="1.4" />
      <rect x="2.3" y="2.7" width="10.8" height="4.5" rx="0.8" fill="currentColor" stroke="none" />
      <rect x="17.6" y="3.5" width="1.7" height="2.9" rx="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.8c-2.8 0-5 2.2-5 5 0 3.3 2.9 6.5 5 9.1 2.1-2.6 5-5.8 5-9.1 0-2.8-2.2-5-5-5z" fill="#f7c42f" />
      <circle cx="10" cy="7.8" r="2" fill="#fff5cb" />
    </svg>
  );
}

function IconStreetPin() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="#5BD89C" />
      <path d="M6.3 11.2h1.7V7.1H6.8V5.8h4.6c1.8 0 3 .8 3 2.5 0 1.5-1 2.3-2.5 2.5v.1l1 3h-1.8l-.9-2.8H8v2.8H6.3v-2.7zM8 9.9h2.4c.8 0 1.3-.3 1.3-1.1s-.5-1-1.3-1H8v2.1z" fill="#ffffff" />
    </svg>
  );
}

export default function SwipeV4Page() {
  return (
    <div className={`${baloo.className} sv4-root`}>
      <div className="sv4-shell">
        <div className="sv4-phone">
          <div className="sv4-notch" aria-hidden="true" />

          <header className="sv4-status">
            <span className="sv4-time">9:41</span>
            <div className="sv4-status-right">
              <IconSignal />
              <IconWifi />
              <IconBattery />
            </div>
          </header>

          <section className="sv4-swipe-layer">
            <div className="sv4-top-tools">
              <button type="button" className="sv4-top-back" aria-label="Back">
                <IconBack />
              </button>
              <button type="button" className="sv4-top-filter" aria-label="Filter">
                <IconFilter />
                <strong>Filter</strong>
              </button>
            </div>

            <div className="sv4-card-shell">
              <div className="sv4-white-layer" aria-hidden="true" />

              <motion.div
                className="sv4-behind-layer"
                initial={{ opacity: 0, y: 10, scale: 0.985 }}
                animate={{
                  opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
                  y: [10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 10, 10],
                  scale: [0.985, 0.985, 0.985, 0.985, 0.985, 0.985, 0.985, 0.985, 1, 1, 0.985, 0.985],
                }}
                transition={{
                  duration: DEMO_DURATION,
                  times: DEMO_TIMES,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="sv4-behind-list">
                  {MENU_SPOTS.map((spot, index) => (
                    <article className="sv4-behind-card" key={spot.id}>
                      <div className="sv4-behind-image">
                        <Image
                          src={spot.image}
                          alt={spot.name}
                          fill
                          sizes="(max-width: 768px) 76vw, 520px"
                          priority={index === 0}
                        />
                        <div className="sv4-behind-votes">
                          <span><IconHeartSolid /> +{spot.hearts}</span>
                          <span><IconFlame /> +{spot.flames}</span>
                        </div>
                      </div>
                      <div className="sv4-behind-body">
                        <p className="sv4-behind-name">{spot.name}</p>
                        <p className="sv4-behind-meta">Thai - Street food</p>
                        <p className="sv4-behind-distance"><IconPin /> {spot.distance}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="sv4-card-motion"
                animate={{
                  x: [0, 0, -68, -68, 0, 68, 68, 0, 0, 0, 0, 0],
                  y: [0, 0, 0, 0, 0, 0, 0, 0, -110, -110, 0, 0],
                  rotate: [0, 0, -6, -6, 0, 6, 6, 0, 0, 0, 0, 0],
                }}
                transition={{
                  duration: DEMO_DURATION,
                  times: DEMO_TIMES,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <article className="sv4-card">
                  <motion.span
                    className="sv4-swipe-badge sv4-swipe-badge--pass"
                    animate={{
                      opacity: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                      scale: [0.92, 0.92, 1, 1, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92],
                    }}
                    transition={{
                      duration: DEMO_DURATION,
                      times: DEMO_TIMES,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Pass
                  </motion.span>
                  <motion.span
                    className="sv4-swipe-badge sv4-swipe-badge--hot"
                    animate={{
                      opacity: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
                      scale: [0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 0.92, 1, 1, 0.92, 0.92],
                    }}
                    transition={{
                      duration: DEMO_DURATION,
                      times: DEMO_TIMES,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Hot
                  </motion.span>
                  <motion.span
                    className="sv4-swipe-badge sv4-swipe-badge--yes"
                    animate={{
                      opacity: [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
                      scale: [0.92, 0.92, 0.92, 0.92, 0.92, 1, 1, 0.92, 0.92, 0.92, 0.92, 0.92],
                    }}
                    transition={{
                      duration: DEMO_DURATION,
                      times: DEMO_TIMES,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    Yes
                  </motion.span>

                  <div className="sv4-chip-row">
                    <span className="sv4-chip sv4-chip--love">
                      <IconHeartSolid className="sv4-chip-heart" />
                      <strong>+4</strong>
                    </span>
                    <span className="sv4-chip sv4-chip--hot">
                      <IconFlame className="sv4-chip-flame" />
                      <strong>+5</strong>
                    </span>
                  </div>

                  <div className="sv4-hero">
                    <Image
                      src="https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&q=80"
                      alt="Pad Thai"
                      fill
                      sizes="(max-width: 768px) 78vw, 420px"
                      priority
                    />
                  </div>

                  <div className="sv4-card-body">
                    <h1>Pad Thai</h1>
                    <div className="sv4-dots" aria-hidden="true">
                      {TASTE_DOTS.map((color, index) => (
                        <span key={`${color}-${index}`} style={{ background: color }} />
                      ))}
                    </div>
                    <p className="sv4-meta">
                      <IconStreetPin />
                      Street food
                    </p>
                    <div className="sv4-tags">
                      <span>Street food</span>
                      <span>Spoonsood</span>
                    </div>
                  </div>
                </article>

                <p className="sv4-hint">Swipe up to see more menu options</p>
              </motion.div>
            </div>

            <footer className="sv4-actions">
              <div className="sv4-action-item">
                <motion.button
                  type="button"
                  className="sv4-action sv4-action--close"
                  aria-label="Pass"
                  animate={{ scale: [1, 1, 1.08, 1.08, 1, 1, 1, 1, 1, 1, 1, 1] }}
                  transition={{ duration: DEMO_DURATION, times: DEMO_TIMES, repeat: Infinity, ease: "easeInOut" }}
                >
                  <IconClose />
                </motion.button>
                <span className="sv4-action-label">Pass</span>
              </div>
              <div className="sv4-action-item">
                <motion.button
                  type="button"
                  className="sv4-action sv4-action--hot"
                  aria-label="Hot"
                  animate={{ scale: [1, 1, 1, 1, 1, 1, 1, 1, 1.08, 1.08, 1, 1] }}
                  transition={{ duration: DEMO_DURATION, times: DEMO_TIMES, repeat: Infinity, ease: "easeInOut" }}
                >
                  <IconFlame />
                </motion.button>
                <span className="sv4-action-label">Hot</span>
              </div>
              <div className="sv4-action-item">
                <motion.button
                  type="button"
                  className="sv4-action sv4-action--love"
                  aria-label="Yes"
                  animate={{ scale: [1, 1, 1, 1, 1, 1.08, 1.08, 1, 1, 1, 1, 1] }}
                  transition={{ duration: DEMO_DURATION, times: DEMO_TIMES, repeat: Infinity, ease: "easeInOut" }}
                >
                  <IconHeartSolid />
                </motion.button>
                <span className="sv4-action-label">Yes</span>
              </div>
            </footer>
          </section>

          <div className="sv4-home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
