"use client";

import { motion } from "framer-motion";
import type { PlaceResult, PlaceDetails, PlaceReview } from "../types";

interface Props {
  place: PlaceResult | null;
  details: PlaceDetails | null;
  userLocation: { lat: number; lng: number } | null;
  onClose: () => void;
}

function getDistance(start: { lat: number; lng: number }, end: { lat: number; lng: number }) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(end.lat - start.lat);
  const dLng = deg2rad(end.lng - start.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(start.lat)) * Math.cos(deg2rad(end.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function RestaurantDetail({ place, details, userLocation, onClose }: Props) {
  if (!place) return null;

  const photos = details?.photos ?? place.photos;
  const category = place.types
    .filter((t) => !["point_of_interest", "establishment", "food"].includes(t))
    .slice(0, 1)
    .map((t) => t.replace(/_/g, " "))
    .join("");

  const distance = userLocation
    ? getDistance(userLocation, place.location).toFixed(1) + " km"
    : null;

  return (
    <motion.div
      className="rs-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="rs-detail-backdrop"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="rs-detail-panel"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Handle bar */}
        <div className="rs-detail__handle" onClick={onClose}>
          <div className="rs-detail__handle-bar" />
        </div>

        {/* Photos */}
        <div className="rs-detail__photos">
          {photos.length > 0 ? (
            photos.map((photo, i) => (
              <img
                key={i}
                src={`/api/places/photo?ref=${photo.photoReference}&maxWidth=600`}
                alt={`${place.name} photo ${i + 1}`}
                className="rs-detail__photo"
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))
          ) : (
            <div className="rs-detail__photo-placeholder">🍽️</div>
          )}
        </div>

        {/* Header */}
        <div className="rs-detail__header">
          <h2>{place.name}</h2>
          {category && (
            <p className="rs-detail__category">
              {category} · {place.address.split(",")[0]}
            </p>
          )}
          <div className="rs-detail__meta">
            {place.rating !== null && (
              <span className="rs-detail__meta-rating">
                <StarIcon /> {place.rating.toFixed(1)}
                <span style={{ color: "#8e8e93", fontWeight: 400 }}>
                  ({place.userRatingsTotal})
                </span>
              </span>
            )}
            {place.priceLevel !== null && (
              <span>{"$".repeat(place.priceLevel + 1)}</span>
            )}
            {place.openNow !== null && (
              <span className={place.openNow ? "rs-detail__meta-open" : "rs-detail__meta-closed"}>
                {place.openNow ? "Open Now" : "Closed"}
              </span>
            )}
            {distance && (
              <span style={{ marginLeft: 4 }}>📍 {distance}</span>
            )}
          </div>
        </div>

        {/* Action Buttons (Google Maps style) */}
        <div className="rs-detail__actions">
          <button className="rs-detail__action-btn">
            <div className="rs-detail__action-icon rs-detail__action-icon--primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <span className="rs-detail__action-label">Directions</span>
          </button>
          {details?.formattedPhone && (
            <a href={`tel:${details.formattedPhone}`} style={{ textDecoration: "none" }}>
              <button className="rs-detail__action-btn">
                <div className="rs-detail__action-icon rs-detail__action-icon--secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <span className="rs-detail__action-label">Call</span>
              </button>
            </a>
          )}
          {details?.website && (
            <a href={details.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="rs-detail__action-btn">
                <div className="rs-detail__action-icon rs-detail__action-icon--secondary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                  </svg>
                </div>
                <span className="rs-detail__action-label">Website</span>
              </button>
            </a>
          )}
          <button className="rs-detail__action-btn">
            <div className="rs-detail__action-icon rs-detail__action-icon--secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            </div>
            <span className="rs-detail__action-label">Share</span>
          </button>
        </div>

        {/* Info Grid */}
        <div className="rs-detail__info-grid" style={{ gridTemplateColumns: distance ? "repeat(4, 1fr)" : "repeat(3, 1fr)" }}>
          <div className="rs-detail__info-cell">
            <div className="rs-detail__info-cell-label">Hours</div>
            <div className={`rs-detail__info-cell-value ${place.openNow === false ? "rs-detail__info-cell-value--red" : place.openNow ? "rs-detail__info-cell-value--green" : ""}`}>
              {place.openNow === null ? "—" : place.openNow ? "Open" : "Closed"}
            </div>
          </div>
          <div className="rs-detail__info-cell">
            <div className="rs-detail__info-cell-label">Rating</div>
            <div className="rs-detail__info-cell-value">
              {place.rating !== null ? place.rating.toFixed(1) : "—"}
            </div>
          </div>
          <div className="rs-detail__info-cell">
            <div className="rs-detail__info-cell-label">Reviews</div>
            <div className="rs-detail__info-cell-value">
              {place.userRatingsTotal > 0 ? place.userRatingsTotal.toLocaleString() : "—"}
            </div>
          </div>
          {distance && (
            <div className="rs-detail__info-cell">
              <div className="rs-detail__info-cell-label">Distance</div>
              <div className="rs-detail__info-cell-value">{distance}</div>
            </div>
          )}
        </div>

        {/* Loading */}
        {!details && (
          <div className="rs-detail__loading">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[80, 60, 70, 50].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: 12,
                    background: "#e5e7eb",
                    borderRadius: 6,
                    width: `${w}%`,
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Full details */}
        {details && (
          <>
            {details.editorialSummary && (
              <p className="rs-detail__summary">{details.editorialSummary}</p>
            )}

            {/* Info section */}
            <div className="rs-detail__section">
              <h3>Info</h3>
              <InfoRow icon="📍" value={details.formattedAddress} />
              {details.formattedPhone && (
                <InfoRow
                  icon="📞"
                  value={details.formattedPhone}
                  href={`tel:${details.formattedPhone}`}
                />
              )}
              {details.website && (
                <InfoRow icon="🌐" value="Visit website" href={details.website} />
              )}
            </div>

            {/* Hours */}
            {details.weekdayText.length > 0 && (
              <div className="rs-detail__section">
                <h3>Opening Hours</h3>
                <ul className="rs-detail__hours-list">
                  {details.weekdayText.map((text, i) => (
                    <li key={i}>{text}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Reviews */}
            {details.reviews.length > 0 && (
              <div className="rs-detail__section">
                <h3>Ratings & Reviews</h3>
                {details.reviews.map((review, i) => (
                  <ReviewCard key={i} review={review} />
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function InfoRow({
  icon,
  value,
  href,
}: {
  icon: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="rs-detail__info-row">
      <span>{icon}</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
}

function ReviewCard({ review }: { review: PlaceReview }) {
  return (
    <div className="rs-detail__review">
      <div className="rs-detail__review-header">
        {review.authorPhotoUrl ? (
          <img
            src={review.authorPhotoUrl}
            alt={review.authorName}
            className="rs-detail__review-avatar"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        ) : (
          <div
            className="rs-detail__review-avatar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: "#8e8e93",
              background: "#f2f2f7",
            }}
          >
            👤
          </div>
        )}
        <span className="rs-detail__review-author">{review.authorName}</span>
        <span className="rs-detail__review-time">{review.relativeTime}</span>
      </div>
      <div className="rs-detail__review-stars">
        {"★".repeat(review.rating)}
        {"☆".repeat(5 - review.rating)}
      </div>
      {review.text && (
        <p className="rs-detail__review-text">{review.text}</p>
      )}
    </div>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="15"
      height="15"
      fill="#ff9500"
      style={{ flexShrink: 0 }}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
