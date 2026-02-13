"use client";

import { motion } from "framer-motion";
import { RestaurantCard } from "./RestaurantCard";
import type { PlaceResult } from "../types";

interface Props {
  results: PlaceResult[];
  isLoading: boolean;
  onCardClick: (place: PlaceResult) => void;
  selectedPlaceId: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function RestaurantList({
  results,
  isLoading,
  onCardClick,
  selectedPlaceId,
  hasMore,
  onLoadMore,
}: Props) {
  return (
    <div>
      {results.length > 0 && (
        <p className="rs-list__count">
          {results.length} restaurant{results.length !== 1 ? "s" : ""} found
        </p>
      )}

      <div className="rs-list__grid">
        {results.map((place, i) => (
          <motion.div
            key={place.placeId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.04, 0.8), duration: 0.3 }}
          >
            <RestaurantCard
              place={place}
              isSelected={place.placeId === selectedPlaceId}
              onClick={() => onCardClick(place)}
            />
          </motion.div>
        ))}
      </div>

      {isLoading && <LoadingSkeleton />}

      {hasMore && !isLoading && (
        <button onClick={onLoadMore} className="rs-list__load-more">
          Load More
        </button>
      )}

      {!isLoading && results.length === 0 && (
        <div className="rs-empty">
          <span>🍽️</span>
          <p>Search for restaurants by name or area to get started.</p>
        </div>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="rs-list__grid" style={{ marginTop: 12 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} className="rs-card rs-card--skeleton">
          <div className="rs-card__image-skeleton" style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
          <div className="rs-card__body-skeleton">
            <div style={{ height: 14, background: "#e5e7eb", borderRadius: 6, width: "75%", animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 10, background: "#e5e7eb", borderRadius: 6, width: "50%", marginTop: 8, animation: "pulse 1.5s ease-in-out infinite" }} />
            <div style={{ height: 10, background: "#e5e7eb", borderRadius: 6, width: "60%", marginTop: 6, animation: "pulse 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      ))}
    </div>
  );
}
