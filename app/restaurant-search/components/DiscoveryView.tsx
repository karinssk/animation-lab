"use client";

import { motion } from "framer-motion";

import { PlaceResult } from "../types";

interface Props {
  onSuggestionClick: (query: string) => void;
  onInputClick?: () => void;
  onMyLocationClick?: () => void;
  onPlaceClick?: (place: PlaceResult) => void;
  places: PlaceResult[];
}

export function DiscoveryView({ onSuggestionClick, onInputClick, onMyLocationClick, onPlaceClick, places }: Props) {
  const suggestions = places.slice(0, 2);
  const curatedPlaces = places.slice(0, 4);
  const curatedIds = new Set(curatedPlaces.map((place) => place.placeId));
  const placeList = places.filter((place) => !curatedIds.has(place.placeId));

  return (
    <div className="rs-discovery">
      {/* Vibe Search */}
      <motion.div
        className="rs-vibe-search"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="rs-vibe-search__title">Restaurant search</h2>
        <p className="rs-vibe-search__subtitle">ai powered search</p>

        <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
          <div
            className="rs-vibe-search__input"
            onClick={onInputClick}
            style={{
              cursor: "pointer",
              marginBottom: 0,
              flex: 1
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span>what&apos;re you looking for?</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onMyLocationClick?.();
            }}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0
            }}
            aria-label="Use my location"
          >
            <img src="/map.png" alt="Use my location" width={24} height={24} />
          </button>
        </div>

        {suggestions.length > 0 && (
          <div className="rs-suggestions flex-col items-stretch">
            {suggestions.map((place, i) => (
              <motion.button
                key={place.placeId}
                className="rs-suggestion-chip w-full justify-between"
                onClick={() => onSuggestionClick(place.name)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left"
                }}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                    </svg>
                    <span className="font-semibold text-sm">{place.name}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400 pl-5 flex items-center gap-2">
                    {place.rating && (
                      <span className="flex items-center gap-1 text-yellow-500">
                        ★ {place.rating.toFixed(1)}
                      </span>
                    )}
                    <span className="text-zinc-500">
                      ({place.userRatingsTotal || 0})
                      {place.priceLevel ? ` • ${"$".repeat(place.priceLevel)}` : ""}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md">
                  Open
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Curations */}
      {curatedPlaces.length > 0 && (
        <motion.div
          className="rs-discovery__section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <div className="rs-discovery__section-header">
            <div>
              <h3 className="rs-discovery__section-title">curations for you</h3>
            </div>
          </div>
          <div className="rs-curated-scroll">
            {curatedPlaces.map((place, i) => {
              const photoUrl = place.photos?.[0]
                ? `/api/places/photo?ref=${place.photos[0].photoReference}&maxWidth=400`
                : null;

              return (
                <motion.div
                  key={place.placeId}
                  className="rs-curated-card"
                  onClick={() => onPlaceClick?.(place)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {photoUrl ? (
                    <img src={photoUrl} alt={place.name} loading="lazy" />
                  ) : (
                    <div className="rs-curated-card__placeholder">🍽️</div>
                  )}
                  <div className="rs-curated-card__overlay">
                    <span className="rs-curated-card__label">{place.name}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Places for you */}
      {placeList.length > 0 && (
        <motion.div
          className="rs-discovery__section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="rs-discovery__section-header">
            <h3 className="rs-discovery__section-title">places for you</h3>
            <button className="rs-discovery__see-all">See all</button>
          </div>
          {placeList.map((p, i) => {
            const photoUrl = p.photos?.[0]
              ? `/api/places/photo?ref=${p.photos[0].photoReference}&maxWidth=400`
              : null;

            return (
              <motion.div
                key={p.placeId}
                className="rs-place-card"
                onClick={() => onPlaceClick?.(p)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.06 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="rs-place-card__image">
                  {photoUrl ? (
                    <img src={photoUrl} alt={p.name} loading="lazy" />
                  ) : (
                    <div className="rs-card__image-placeholder">🍽️</div>
                  )}
                </div>
                <div className="rs-place-card__info">
                  <h4 className="rs-place-card__name">{p.name}</h4>
                  <p className="rs-place-card__category">{p.address.split(",")[0]}</p>
                  <div className="rs-place-card__meta">
                    {p.rating && (
                      <span className="rs-place-card__rating">
                        <svg viewBox="0 0 20 20" width="12" height="12" fill="#ff9500" style={{ flexShrink: 0 }}>
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {p.rating.toFixed(1)}
                      </span>
                    )}
                    {p.priceLevel && (
                      <span className="rs-place-card__price">{"$".repeat(p.priceLevel)}</span>
                    )}
                    {p.openNow !== null && (
                      <span style={{
                        color: p.openNow ? "#34c759" : "#ff3b30",
                        fontWeight: 600,
                        fontSize: "11px"
                      }}>
                        {p.openNow ? "Open" : "Closed"}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
