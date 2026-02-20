"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";
import { Baloo_2 } from "next/font/google";
import { PLACES } from "../places-data";
import "./detail.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconBack() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function IconBookmark({ saved }: { saved: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="18" height="18">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="12" height="12">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconTag() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RestaurantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const place = PLACES.find((p) => p.id === id);
  if (!place) notFound();

  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"menu" | "info" | "reviews">("menu");

  return (
    <div className={`${baloo.className} det-root`}>
      <div className="det-phone">

        {/* Status bar */}
        <div className="det-status">
          <span>9:41</span>
          <span className="det-battery" aria-hidden="true">
            <span className="det-battery__level" />
            <span className="det-battery__cap" />
          </span>
        </div>

        {/* Scrollable body */}
        <div className="det-body">

          {/* Hero photo strip */}
          <div className="det-hero">
            <div className="det-hero__photos">
              {place.photos.map((src, i) => (
                <div key={i} className="det-hero__photo">
                  <Image src={src} alt={place.name} fill style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>

            {/* Back + action bar floating over hero */}
            <div className="det-topbar">
              <Link href="/map" className="det-topbar__btn" aria-label="Back">
                <IconBack />
              </Link>
              <div className="flex gap-2">
                <button
                  className="det-topbar__btn"
                  aria-label="Save"
                  onClick={() => setSaved((s) => !s)}
                  style={{ color: saved ? "#f97316" : undefined }}
                >
                  <IconBookmark saved={saved} />
                </button>
                <button className="det-topbar__btn" aria-label="Share">
                  <IconShare />
                </button>
              </div>
            </div>
          </div>

          {/* Identity block */}
          <div className="det-identity">
            <div className="flex items-start justify-between gap-2">
              <h1 className="det-identity__name">{place.name}</h1>
              <span className="det-identity__price">{place.price}</span>
            </div>
            <p className="det-identity__category">{place.category}</p>
            <p className="det-identity__tagline">{place.tagline}</p>

            <div className="det-stats">
              <div className="det-stat">
                <span className="det-stat__val">★ {place.rating}</span>
                <span className="det-stat__lbl">{place.ratingCount} reviews</span>
              </div>
              <div className="det-stat__divider" />
              <div className="det-stat">
                <span className={`det-stat__val ${place.status === "Open Now" ? "text-emerald-600" : "text-red-500"}`}>
                  {place.status === "Open Now" ? "Open" : "Closed"}
                </span>
                <span className="det-stat__lbl">{place.hours}</span>
              </div>
              <div className="det-stat__divider" />
              <div className="det-stat">
                <span className="det-stat__val">{place.distance}</span>
                <span className="det-stat__lbl">away</span>
              </div>
            </div>

            <div className="det-tags">
              {place.tags.map((tag) => (
                <span key={tag} className="det-tag">{tag}</span>
              ))}
            </div>
          </div>

          {/* Reservation CTA */}
          <div className="det-cta-row">
            <button className="det-cta-btn det-cta-btn--primary">Reserve a Table</button>
            <button className="det-cta-btn det-cta-btn--secondary">Get Directions</button>
          </div>

          {/* Promotions */}
          {place.promotions.length > 0 && (
            <div className="det-section">
              <h2 className="det-section__title">Promotions</h2>
              <div className="det-promos">
                {place.promotions.map((promo, i) => (
                  <div key={i} className="det-promo">
                    <div className="det-promo__icon"><IconTag /></div>
                    <div>
                      <p className="det-promo__title">{promo.title}</p>
                      <p className="det-promo__desc">{promo.description}</p>
                      <p className="det-promo__expires">{promo.expires}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="det-tabs">
            {(["menu", "info", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                className={`det-tab${activeTab === tab ? " det-tab--active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab: Menu */}
          {activeTab === "menu" && (
            <div className="det-section det-section--notop">
              {place.menu.map((item, i) => (
                <div key={i} className="det-menu-item">
                  <div className="det-menu-item__photo">
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                    {item.tag && <span className="det-menu-item__tag">{item.tag}</span>}
                  </div>
                  <div className="det-menu-item__info">
                    <p className="det-menu-item__name">{item.name}</p>
                    <p className="det-menu-item__desc">{item.description}</p>
                    <p className="det-menu-item__price">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab: Info */}
          {activeTab === "info" && (
            <div className="det-section det-section--notop space-y-3">
              <div>
                <h3 className="det-info__label">Branches</h3>
                <div className="space-y-2">
                  {place.branches.map((branch, i) => (
                    <div key={i} className="det-branch">
                      <p className="det-branch__label">{branch.label}</p>
                      <div className="det-branch__row">
                        <IconPin />
                        <span>{branch.address}</span>
                      </div>
                      <div className="det-branch__row">
                        <IconClock />
                        <span>{branch.hours}</span>
                      </div>
                      <div className="det-branch__row">
                        <IconPhone />
                        <span className="text-sky-700">{branch.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="det-info__label">Website</h3>
                <p className="text-xs font-semibold text-sky-700">{place.website}</p>
              </div>

              <div>
                <h3 className="det-info__label">Features</h3>
                <div className="det-tags">
                  {place.tags.map((tag) => (
                    <span key={tag} className="det-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab: Reviews */}
          {activeTab === "reviews" && (
            <div className="det-section det-section--notop space-y-2">
              <div className="det-rating-summary">
                <p className="det-rating-summary__score">★ {place.rating}</p>
                <p className="det-rating-summary__count">{place.ratingCount} reviews</p>
              </div>
              {place.reviews.map((review, i) => (
                <div key={i} className="det-review">
                  <div className="flex items-center justify-between">
                    <p className="det-review__author">{review.author}</p>
                    <p className="det-review__stars">
                      {"★".repeat(review.stars)}{"☆".repeat(5 - review.stars)}
                    </p>
                  </div>
                  <p className="det-review__text">&quot;{review.text}&quot;</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
