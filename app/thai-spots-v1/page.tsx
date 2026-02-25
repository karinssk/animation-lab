"use client";

import Image from "next/image";
import { Baloo_2 } from "next/font/google";
import "./thai-spots-v1.css";

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
  sponsored?: boolean;
  image: string;
};

const SPOTS: Spot[] = [
  {
    id: "see-fah",
    name: "See Fah",
    hearts: 4,
    flames: 5,
    distance: "400 m",
    sponsored: true,
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
  {
    id: "baan-padthai",
    name: "Baan Padthai",
    hearts: 4,
    flames: 4,
    distance: "1.8 km",
    image: "https://images.unsplash.com/photo-1617622141573-33b5d65dca8f?w=1200&q=80",
  },
  {
    id: "fai-ta-lu",
    name: "Padthai Fai Ta Lu",
    hearts: 5,
    flames: 4,
    distance: "2.1 km",
    image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?w=1200&q=80",
  },
  {
    id: "savoey",
    name: "Savoey Street",
    hearts: 3,
    flames: 5,
    distance: "2.4 km",
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=1200&q=80",
  },
];

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

function IconBack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path d="M15 4.5L7.5 12 15 19.5" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
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

function IconPinFill() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.8c-2.8 0-5 2.2-5 5 0 3.3 2.9 6.5 5 9.1 2.1-2.6 5-5.8 5-9.1 0-2.8-2.2-5-5-5z" fill="#f7c42f" />
      <circle cx="10" cy="7.8" r="2" fill="#fff5cb" />
    </svg>
  );
}

function IconPinOutline() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2.8c-2.8 0-5 2.2-5 5 0 3.3 2.9 6.5 5 9.1 2.1-2.6 5-5.8 5-9.1 0-2.8-2.2-5-5-5z" stroke="#f2c03f" strokeWidth="1.8" />
      <circle cx="10" cy="7.8" r="1.8" fill="#f8edc0" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-6.7-4.3-9.4-8.1c-2-2.9-1.2-6.5 1.7-8.2 2.3-1.3 4.7-.7 6.3 1 1.6-1.7 4-2.3 6.3-1 2.9 1.7 3.7 5.3 1.7 8.2C18.7 16.7 12 21 12 21z" />
    </svg>
  );
}

function IconFlame() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.3 2.4c.6 2.2-.1 3.7-1.6 5.4-1 1.2-1.8 2.2-1.8 3.8 0 1.8 1.4 3.1 3.1 3.1 2.4 0 4.2-2.1 4.2-4.5 0-1.1-.3-2.1-.8-3.2 2.2 1.2 3.8 3.7 3.8 6.5 0 4.1-3.2 7.3-7.2 7.3s-7.2-3.2-7.2-7.2c0-2.9 1.7-5.4 4.1-6.7-.4 1-.6 1.7-.6 2.6 0 1.4.8 2.5 2 2.5 1 0 2-.8 2-2.1 0-1.1-.8-2-1.4-2.8-1.1-1.2-1.8-2.2-1.6-4.7z" />
    </svg>
  );
}

export default function ThaiSpotsV1Page() {
  return (
    <div className={`${baloo.className} ts1-root`}>
      <div className="ts1-shell">
        <div className="ts1-phone">
          <div className="ts1-notch" aria-hidden="true" />

          <header className="ts1-status">
            <span className="ts1-time">9:41</span>
            <div className="ts1-status-right">
              <IconSignal />
              <IconWifi />
              <IconBattery />
            </div>
          </header>

          <main className="ts1-content">
            <div className="ts1-head-row">
              <button type="button" className="ts1-back-btn" aria-label="Back">
                <IconBack />
              </button>
              <button type="button" className="ts1-filter-btn">
                <IconFilter />
                <span>Filter</span>
              </button>
            </div>

            <h1 className="ts1-title">
              Thai street food spots
              <br />
              for Pad Thai
            </h1>

            <div className="ts1-progress">
              <span />
            </div>

            <section className="ts1-list-panel" aria-label="Recommended Thai street food restaurants">
              {SPOTS.map((spot, index) => (
                <article className="ts1-card" key={spot.id}>
                  <div className="ts1-image-wrap">
                    <Image
                      src={spot.image}
                      alt={spot.name}
                      fill
                      sizes="(max-width: 768px) 82vw, 560px"
                      priority={index === 0}
                    />

                    <div className="ts1-vote-row">
                      <span className="ts1-vote-chip">
                        <IconHeart />
                        <strong>+{spot.hearts}</strong>
                      </span>
                      <span className="ts1-vote-chip">
                        <IconFlame />
                        <strong>+{spot.flames}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="ts1-card-body">
                    <div className="ts1-main-row">
                      <div className="ts1-name-row">
                        <h2>{spot.name}</h2>
                        {spot.sponsored && <span className="ts1-sponsored">Sponsored</span>}
                      </div>
                      <span className="ts1-distance">
                        {index === 0 ? <IconPinFill /> : <IconPinOutline />}
                        {spot.distance}
                      </span>
                    </div>
                    <p className="ts1-meta">Thai • Street food</p>
                  </div>
                </article>
              ))}
            </section>
          </main>

          <div className="ts1-home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
