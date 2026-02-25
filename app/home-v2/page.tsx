"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./home-v2.css";

const HomeV2Map = dynamic(() => import("./HomeV2Map"), { ssr: false });

// Icons
function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
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

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}

const NAV_ITEMS = [
  { href: "/home-v2", label: "Home", Icon: IconHome },
  { href: "/explore", label: "Decide", Icon: IconFork },
  { href: "/appointment-setup", label: "History", Icon: IconClock },
  { href: "/preferences-setup", label: "Profile", Icon: IconUser },
];

export default function HomeV2Page() {
  const pathname = usePathname();

  return (
    <div className="hv2-root">
      <div className="hv2-phone">
        <div className="hv2-phone-notch" />
        
        <div className="hv2-page">
          {/* Status Bar */}
          <div className="hv2-status">
            <span>9:41</span>
            <div className="hv2-status-icons">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M1 4h2v4H1V4zm4-2h2v8H5V2zm4 4h2v4H9V6zm4-4h2v8h-2V2z"/>
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                <path d="M0 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z"/>
              </svg>
              <span className="hv2-battery">
                <span className="hv2-battery-level" />
                <span className="hv2-battery-cap" />
              </span>
            </div>
          </div>

          {/* Map Background */}
          <div className="hv2-map-bg">
            <HomeV2Map />
          </div>

          {/* Content Overlay */}
          <div className="hv2-content">
            {/* Search Bar */}
            <div className="hv2-search-bar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="hv2-search-icon">
                <circle cx="11" cy="11" r="7" strokeWidth="2.5" />
                <path d="M20 20l-3.5-3.5" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Where to?"
                className="hv2-search-input"
              />
            </div>

            {/* Main Card */}
            <div className="hv2-card">
              <h1 className="hv2-title">
                Let <span className="hv2-title-accent">Toast</span> help decide
              </h1>

              {/* Solo/Group Toggle */}
              <div className="hv2-toggle-group">
                <button className="hv2-toggle-btn hv2-toggle-btn--active">
                  <span className="hv2-toggle-icon">👤</span>
                  <div>
                    <div className="hv2-toggle-label">Solo</div>
                    <div className="hv2-toggle-sub">Just for you</div>
                  </div>
                </button>
                <button className="hv2-toggle-btn">
                  <span className="hv2-toggle-icon">👥</span>
                  <div>
                    <div className="hv2-toggle-label">Group</div>
                    <div className="hv2-toggle-sub">With friends</div>
                  </div>
                </button>
              </div>

              {/* Pick a mode */}
              <h2 className="hv2-section-title">Pick a mode</h2>
              <div className="hv2-mode-grid">
                <Link href="/swipe?mode=budget" className="hv2-mode-card hv2-mode-card--yellow">
                  <span className="hv2-mode-icon">💰</span>
                  <div className="hv2-mode-label">Budget mode</div>
                  <div className="hv2-mode-desc">💵 Save money</div>
                </Link>
                <Link href="/map" className="hv2-mode-card">
                  <span className="hv2-mode-icon">🚇</span>
                  <div className="hv2-mode-label">Near BTS</div>
                  <div className="hv2-mode-desc">Convenient rides</div>
                </Link>
                <Link href="/swipe?mode=trendy" className="hv2-mode-card">
                  <span className="hv2-mode-icon">📈</span>
                  <div className="hv2-mode-label">Trendy now</div>
                  <div className="hv2-mode-desc">Popular spots</div>
                </Link>
                <Link href="/swipe?mode=hot" className="hv2-mode-card hv2-mode-card--yellow">
                  <span className="hv2-mode-icon">🔥</span>
                  <div className="hv2-mode-label">Currently hot</div>
                  <div className="hv2-mode-desc">Trending places</div>
                  <svg className="hv2-mode-arrow" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </Link>
              </div>

              <div className="hv2-mode-grid-2">
                <Link href="/swipe?mode=late" className="hv2-mode-card-wide">
                  <span className="hv2-mode-icon">🌙</span>
                  <div>
                    <div className="hv2-mode-label">Late night</div>
                    <div className="hv2-mode-desc">Open after hours</div>
                  </div>
                </Link>
                <Link href="/swipe?mode=outdoor" className="hv2-mode-card-wide">
                  <span className="hv2-mode-icon">☂️</span>
                  <div>
                    <div className="hv2-mode-label">Outdoor dining</div>
                    <div className="hv2-mode-desc">Al fresco spots</div>
                  </div>
                </Link>
              </div>

              {/* New restaurants */}
              <div className="hv2-section-header">
                <h2 className="hv2-section-title">New restaurants in Central World</h2>
                <svg viewBox="0 0 24 24" fill="currentColor" className="hv2-chevron">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>

              <div className="hv2-restaurant-grid">
                <Link href="/map/1" className="hv2-restaurant-card">
                  <div className="hv2-restaurant-img">
                    <img src="/food-pizza.jpg" alt="Sol and Luna" />
                  </div>
                  <div className="hv2-restaurant-name">Sol and Luna</div>
                  <div className="hv2-restaurant-type">Modern Italian</div>
                  <div className="hv2-restaurant-meta">
                    <span className="hv2-restaurant-rating">⭐️ 1 km</span>
                  </div>
                </Link>
                <Link href="/map/2" className="hv2-restaurant-card">
                  <div className="hv2-restaurant-img">
                    <img src="/food-steak.avif" alt="Ojo Bangkok" />
                  </div>
                  <div className="hv2-restaurant-name">Ojo Bangkok</div>
                  <div className="hv2-restaurant-type">Spanish</div>
                  <div className="hv2-restaurant-meta">
                    <span className="hv2-restaurant-rating">⭐️⭐️⭐️ 1 km</span>
                  </div>
                </Link>
                <Link href="/map/3" className="hv2-restaurant-card">
                  <div className="hv2-restaurant-img">
                    <img src="/food-pizza.jpg" alt="Baan Kanom Thai" />
                  </div>
                  <div className="hv2-restaurant-name">Baan Kanom Thai</div>
                  <div className="hv2-restaurant-type">Thai dessert</div>
                  <div className="hv2-restaurant-meta">
                    <span className="hv2-restaurant-rating">⭐️ 1 km</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <nav className="hv2-bottom-nav">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hv2-nav-item ${active ? "hv2-nav-item--active" : ""}`}
                >
                  <item.Icon />
                  <span className="hv2-nav-label">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
