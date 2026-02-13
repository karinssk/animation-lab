"use client";

import { useCallback } from "react";
import {
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import type { PlaceResult, LatLng } from "../types";

interface Props {
  center: LatLng;
  zoom: number;
  results: PlaceResult[];
  selectedPlace: PlaceResult | null;
  userLocation: LatLng | null;
  onMarkerClick: (place: PlaceResult) => void;
  onCameraChange: (center: LatLng, zoom: number) => void;
}

export function MapView({
  center,
  zoom,
  results,
  selectedPlace,
  userLocation,
  onMarkerClick,
  onCameraChange,
}: Props) {
  const handleCameraChanged = useCallback(
    (ev: { detail: { center: { lat: number; lng: number }; zoom: number } }) => {
      const { center: c, zoom: z } = ev.detail;
      onCameraChange({ lat: c.lat, lng: c.lng }, z);
    },
    [onCameraChange]
  );

  return (
    <Map
      mapId="DEMO_MAP_ID"
      defaultCenter={center}
      defaultZoom={zoom}
      center={center}
      zoom={zoom}
      onCameraChanged={handleCameraChanged}
      gestureHandling="greedy"
      disableDefaultUI={false}
      zoomControl
      mapTypeControl={false}
      streetViewControl={false}
      fullscreenControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      {userLocation && (
        <AdvancedMarker position={userLocation}>
          <div className="rs-user-marker" />
        </AdvancedMarker>
      )}

      {results.map((place) => (
        <RestaurantMarker
          key={place.placeId}
          place={place}
          isSelected={selectedPlace?.placeId === place.placeId}
          onClick={onMarkerClick}
        />
      ))}
    </Map>
  );
}

function RestaurantMarker({
  place,
  isSelected,
  onClick,
}: {
  place: PlaceResult;
  isSelected: boolean;
  onClick: (place: PlaceResult) => void;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const photoUrl = place.photos?.[0]
    ? `/api/places/photo?ref=${place.photos[0].photoReference}&maxWidth=100`
    : null;

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={place.location}
        onClick={() => onClick(place)}
        title={place.name}
        zIndex={isSelected ? 100 : undefined}
      >
        <div
          className={`rs-marker-pin ${isSelected ? "rs-marker-pin--active" : ""} ${photoUrl ? "rs-marker-pin--image" : ""
            }`}
        >
          {photoUrl ? (
            <>
              <img
                src={photoUrl}
                alt={place.name}
                className="rs-marker-pin__image"
              />
              {place.rating && (
                <div className="rs-marker-pin__badge">
                  {place.rating.toFixed(1)}
                </div>
              )}
            </>
          ) : (
            place.rating ? place.rating.toFixed(1) : "?"
          )}
        </div>
      </AdvancedMarker>

      {isSelected && marker && (
        <InfoWindow anchor={marker} maxWidth={220}>
          <div style={{ padding: 4 }}>
            <strong style={{ fontSize: 14 }}>{place.name}</strong>
            <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0" }}>
              {place.address}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
