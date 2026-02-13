"use client";

import { motion } from "framer-motion";
import type { PlaceResult } from "../types";

interface Props {
  place: PlaceResult;
  isSelected: boolean;
  onClick: () => void;
}

export function RestaurantCard({ place, isSelected, onClick }: Props) {
  const photoUrl =
    place.photos.length > 0
      ? `/api/places/photo?ref=${place.photos[0].photoReference}&maxWidth=400`
      : null;

  return (
    <motion.button
      onClick={onClick}
      className={`rs-card ${isSelected ? "rs-card--selected" : ""}`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="rs-card__image">
        {photoUrl ? (
          <img src={photoUrl} alt={place.name} loading="lazy" />
        ) : (
          <div className="rs-card__image-placeholder">🍽️</div>
        )}
        {place.openNow !== null && (
          <span
            className={`rs-card__status ${place.openNow ? "rs-card__status--open" : "rs-card__status--closed"}`}
          >
            {place.openNow ? "Open" : "Closed"}
          </span>
        )}
      </div>

      <div className="rs-card__info">
        <h3 className="rs-card__name">{place.name}</h3>
        <div className="rs-card__meta">
          {place.rating !== null && (
            <span className="rs-card__rating">
              <StarIcon /> {place.rating.toFixed(1)}
              <span className="rs-card__reviews">
                ({place.userRatingsTotal})
              </span>
            </span>
          )}
          {place.priceLevel !== null && (
            <span className="rs-card__price">
              {"$".repeat(place.priceLevel + 1)}
            </span>
          )}
        </div>
        <p className="rs-card__address">{place.address}</p>
        <div className="rs-card__types">
          {place.types
            .filter(
              (t) =>
                !["point_of_interest", "establishment", "food"].includes(t)
            )
            .slice(0, 2)
            .map((t) => (
              <span key={t} className="rs-card__type-tag">
                {t.replace(/_/g, " ")}
              </span>
            ))}
        </div>
      </div>
    </motion.button>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="13"
      height="13"
      fill="#f59e0b"
      style={{ flexShrink: 0 }}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
