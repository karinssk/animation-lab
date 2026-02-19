"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface Place {
  id: string;
  rating: string;
  latlng: [number, number];
}

interface Props {
  places: Place[];
  activeId: string;
  isSearching: boolean;
  matchedIds: Set<string>;
  onSelect: (id: string) => void;
  onMapReady: (map: L.Map) => void;
}

function MapController({ onMapReady }: { onMapReady: (m: L.Map) => void }) {
  const map = useMap();
  useEffect(() => {
    onMapReady(map);
  }, [map, onMapReady]);
  return null;
}

function markerIcon(rating: string, active: boolean, matched: boolean, dimmed: boolean) {
  const cls = [
    "lf-pin",
    active  ? "lf-pin--active"  : "",
    matched ? "lf-pin--matched" : "",
    dimmed  ? "lf-pin--dim"     : "",
  ].filter(Boolean).join(" ");

  return L.divIcon({
    html: `<div class="${cls}">${rating}</div>`,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

export default function MapView({
  places,
  activeId,
  isSearching,
  matchedIds,
  onSelect,
  onMapReady,
}: Props) {
  return (
    <MapContainer
      center={[13.7755, 100.549]}
      zoom={15}
      zoomControl={false}
      attributionControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapController onMapReady={onMapReady} />
      {places.map((place) => (
        <Marker
          key={place.id}
          position={place.latlng}
          icon={markerIcon(
            place.rating,
            place.id === activeId,
            isSearching && matchedIds.has(place.id),
            isSearching && !matchedIds.has(place.id),
          )}
          eventHandlers={{ click: () => onSelect(place.id) }}
        />
      ))}
    </MapContainer>
  );
}
