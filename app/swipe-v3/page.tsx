"use client";

import Image from "next/image";
import { Baloo_2 } from "next/font/google";
import "./swipe-v3.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const TASTE_DOTS = ["#ff6b39", "#f9c736", "#f3d13c", "#f6dc5f", "#ff6b39"];

function IconHeartSolid({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-6.7-4.3-9.4-8.1c-2-2.9-1.2-6.5 1.7-8.2 2.3-1.3 4.7-.7 6.3 1 1.6-1.7 4-2.3 6.3-1 2.9 1.7 3.7 5.3 1.7 8.2C18.7 16.7 12 21 12 21z" />
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

function IconFlame({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.3 2.4c.6 2.2-.1 3.7-1.6 5.4-1 1.2-1.8 2.2-1.8 3.8 0 1.8 1.4 3.1 3.1 3.1 2.4 0 4.2-2.1 4.2-4.5 0-1.1-.3-2.1-.8-3.2 2.2 1.2 3.8 3.7 3.8 6.5 0 4.1-3.2 7.3-7.2 7.3s-7.2-3.2-7.2-7.2c0-2.9 1.7-5.4 4.1-6.7-.4 1-.6 1.7-.6 2.6 0 1.4.8 2.5 2 2.5 1 0 2-.8 2-2.1 0-1.1-.8-2-1.4-2.8-1.1-1.2-1.8-2.2-1.6-4.7z" />
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

function IconStreetPin() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" fill="#5BD89C" />
      <path d="M6.3 11.2h1.7V7.1H6.8V5.8h4.6c1.8 0 3 .8 3 2.5 0 1.5-1 2.3-2.5 2.5v.1l1 3h-1.8l-.9-2.8H8v2.8H6.3v-2.7zM8 9.9h2.4c.8 0 1.3-.3 1.3-1.1s-.5-1-1.3-1H8v2.1z" fill="#ffffff" />
    </svg>
  );
}

export default function SwipeV3Page() {
  return (
    <div className={`${baloo.className} sw3-root`}>
      <div className="sw3-shell">
        <div className="sw3-phone">
          <div className="sw3-status">
            <span />
            <div className="sw3-status-right">
              <IconSignal />
              <IconWifi />
              <IconBattery />
            </div>
          </div>

          <div className="sw3-bg-glow" />

          <section className="sw3-card-wrap" aria-label="Food swipe card">
            <article className="sw3-card sw3-card--simulated">
              <div className="sw3-chip-row">
                <span className="sw3-chip sw3-chip--love">
                  <IconHeartSolid className="sw3-chip-heart" />
                  <strong>+4</strong>
                </span>
                <span className="sw3-chip sw3-chip--hot">
                  <IconFlame className="sw3-chip-flame" />
                  <strong>+5</strong>
                </span>
                <span className="sw3-chip sw3-chip--filter">
                  <IconFilter />
                  <strong>Filter</strong>
                </span>
              </div>

              <span className="sw3-stamp sw3-stamp--nope">PASS</span>
              <span className="sw3-stamp sw3-stamp--like">YES</span>
              <span className="sw3-stamp sw3-stamp--up">HOT</span>

              <div className="sw3-hero">
                <Image
                  src="https://images.unsplash.com/photo-1559314809-0d155014e29e?w=1200&q=80"
                  alt="Pad Thai"
                  fill
                  sizes="(max-width: 768px) 78vw, 420px"
                  priority
                />
              </div>

              <div className="sw3-body">
                <h1>Pad Thai</h1>

                <div className="sw3-dots" aria-hidden="true">
                  {TASTE_DOTS.map((color, index) => (
                    <span key={`${color}-${index}`} style={{ background: color }} />
                  ))}
                </div>

                <p className="sw3-meta">
                  <IconStreetPin />
                  Street food
                </p>

                <div className="sw3-tags">
                  <span>Street food</span>
                  <span>Spoonsood</span>
                </div>
              </div>
            </article>
          </section>

          <footer className="sw3-actions">
            <button type="button" className="sw3-action sw3-action--close" aria-label="Nope">
              <IconClose />
            </button>
            <button type="button" className="sw3-action sw3-action--hot" aria-label="Super like">
              <IconFlame />
            </button>
            <button type="button" className="sw3-action sw3-action--love" aria-label="Like">
              <IconHeartSolid />
            </button>
          </footer>

          <div className="sw3-home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
