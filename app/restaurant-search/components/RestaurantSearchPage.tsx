"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { AnimatePresence, motion } from "framer-motion";

import { SearchBar } from "./SearchBar";
import { FilterChips } from "./FilterChips";
import { MapView } from "./MapView";
import { RestaurantList } from "./RestaurantList";
import { RestaurantDetail } from "./RestaurantDetail";
import { DiscoveryView } from "./DiscoveryView";

import type { PlaceResult, PlaceDetails, LatLng } from "../types";
import {
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  SEARCH_RADIUS,
  DEBOUNCE_MS,
} from "../constants";

interface Props {
  apiKey: string;
}

type ViewMode = "discovery" | "search";

export function RestaurantSearchPage({ apiKey }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("discovery");
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState<LatLng>(DEFAULT_CENTER);
  const [mapZoom, setMapZoom] = useState(DEFAULT_ZOOM);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [discoveryPlaces, setDiscoveryPlaces] = useState<PlaceResult[]>([]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const discoveryFetchedRef = useRef(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // ─── fetch discovery places ──────────────────────────
  useEffect(() => {
    if (discoveryFetchedRef.current) return;
    discoveryFetchedRef.current = true;

    const fetchDiscovery = async () => {
      try {
        const res = await fetch("/api/places/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: "popular restaurants",
            location: DEFAULT_CENTER,
            radius: SEARCH_RADIUS,
          }),
        });
        const data = await res.json();
        if (data.results) {
          setDiscoveryPlaces(data.results.slice(0, 12));
        }
      } catch (err) {
        console.error("Discovery fetch failed:", err);
      }
    };

    fetchDiscovery();
  }, []);

  // ─── search ──────────────────────────────────────────
  const performSearch = useCallback(
    async (
      searchQuery: string,
      location: LatLng | undefined,
      typeFilter: string,
      pageToken?: string
    ) => {
      // Cancel any in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      try {
        const res = await fetch("/api/places/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: searchQuery || "restaurant",
            location, // If undefined, it falls back to text search in API route
            radius: SEARCH_RADIUS,
            type: typeFilter || undefined,
            pageToken,
          }),
          signal: controller.signal,
        });
        const data = await res.json();

        if (data.status === "REQUEST_DENIED" || data.status === "OVER_QUERY_LIMIT") {
          console.error("API Error:", data.error);
          // handle error state if needed
        }

        if (pageToken) {
          setResults((prev) => [...prev, ...(data.results || [])]);
        } else {
          setResults(data.results || []);
        }
        setNextPageToken(data.nextPageToken);

        // Auto-center map on first result if no explicit location provided
        // and we aren't loading more pages
        if (!pageToken && data.results?.length > 0 && !location) {
          setMapCenter(data.results[0].location);
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Search failed:", err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // ─── switch to search mode helper ────────────────────
  const switchToSearchMode = useCallback((initialQuery?: string) => {
    setViewMode("search");
    if (initialQuery !== undefined) {
      setQuery(initialQuery);
    }
  }, []);

  // ─── debounced query change ──────────────────────────
  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);
      if (debounceRef.current) clearTimeout(debounceRef.current);

      if (!newQuery.trim()) {
        if (viewMode === "search" && results.length === 0) {
          // Keep search mode
        }
        setResults([]);
        setNextPageToken(null);
        return;
      }

      // If user types in discovery, switch to search
      if (viewMode === "discovery") {
        setViewMode("search");
      }

      debounceRef.current = setTimeout(() => {
        if (newQuery.trim().length >= 2) {
          // Use userLocation if available, otherwise mapCenter to search "current area"
          const searchLoc = userLocation || mapCenter;
          performSearch(
            newQuery,
            searchLoc,
            activeFilter === "all" ? "" : activeFilter
          );
        }
      }, DEBOUNCE_MS);
    },
    [performSearch, userLocation, mapCenter, activeFilter, viewMode, results.length]
  );

  // ─── filter change ──────────────────────────────────
  const handleFilterChange = useCallback(
    (filterId: string, filterType: string) => {
      setActiveFilter(filterId);
      if (query.trim().length >= 2 || userLocation) {
        const searchLoc = userLocation || mapCenter;
        performSearch(
          query || "restaurant",
          searchLoc,
          filterType
        );
      }
    },
    [performSearch, query, userLocation, mapCenter]
  );

  // ─── marker / card click → detail ──────────────────
  const handleSelectPlace = useCallback(async (place: PlaceResult) => {
    setSelectedPlace(place);
    setIsDetailOpen(true);
    setPlaceDetails(null);
    setMapCenter(place.location);

    try {
      const res = await fetch(
        `/api/places/details?placeId=${place.placeId}`
      );
      const details = await res.json();
      if (!details.error) {
        setPlaceDetails(details);
      }
    } catch (err) {
      console.error("Failed to fetch details:", err);
    }
  }, []);

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false);
    setSelectedPlace(null);
    setPlaceDetails(null);
  }, []);

  // ─── my location ──────────────────────────────────
  const handleMyLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setIsLocating(true);

    // Switch to search mode immediately as we are "acting"
    if (viewMode === "discovery") {
      switchToSearchMode();
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc: LatLng = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setUserLocation(loc);
        setMapCenter(loc);
        setMapZoom(15);
        setIsLocating(false);
        performSearch(
          query || "restaurant",
          loc,
          activeFilter === "all" ? "" : activeFilter
        );
      },
      (err) => {
        console.error("Geolocation error:", err);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [performSearch, query, activeFilter, viewMode, switchToSearchMode]);

  // ─── pagination ──────────────────────────────────
  const handleLoadMore = useCallback(() => {
    if (nextPageToken) {
      // Use userLocation or mapCenter for pagination consistency
      const searchLoc = userLocation || mapCenter;
      performSearch(
        query,
        searchLoc,
        activeFilter === "all" ? "" : activeFilter,
        nextPageToken
      );
    }
  }, [nextPageToken, performSearch, query, userLocation, mapCenter, activeFilter]);

  // ─── map camera change ───────────────────────────
  const handleCameraChange = useCallback((center: LatLng, zoom: number) => {
    setMapCenter(center);
    setMapZoom(zoom);
  }, []);

  // ─── suggestions from discovery ──────────────────
  const handleSuggestionClick = useCallback((suggestion: string) => {
    switchToSearchMode(suggestion);
    // Use userLocation or mapCenter
    const searchLoc = userLocation || mapCenter;
    performSearch(suggestion, searchLoc, activeFilter === "all" ? "" : activeFilter);
  }, [switchToSearchMode, performSearch, userLocation, mapCenter, activeFilter]);

  // Handle "fake" input click in Discovery view
  const handleDiscoveryInputClick = useCallback(() => {
    switchToSearchMode();
    // setTimeout to allow render then focus
    setTimeout(() => {
      // We might need a ref to the SearchBar's input to focus it.
      // For now, just switching mode works.
      const input = document.querySelector('.rs-search-bar__input') as HTMLInputElement;
      if (input) input.focus();
    }, 100);
  }, [switchToSearchMode]);


  return (
    <APIProvider apiKey={apiKey} libraries={["places", "marker"]}>
      <div className="rs-page">
        <div className="rs-status-bar">
          <span>9:41</span>
          <div className="rs-status-bar__icons">
            <span className="rs-battery-icon" aria-hidden="true">
              <span className="rs-battery-icon__level" />
              <span className="rs-battery-icon__cap" />
            </span>
          </div>
        </div>

        {/* Header - Only visible in Search Mode (or transitioning?)
            actually, let's keep it visible but maybe style differently?
            For the "Vibe Search" design, the header is NOT there. 
            So we render Header only if viewMode === 'search'. */}

        <AnimatePresence>
          {viewMode === "search" && (
            <motion.header
              className="rs-header"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SearchBar
                value={query}
                onChange={handleQueryChange}
                onMyLocation={handleMyLocation}
                isLocating={isLocating}
              />
              <FilterChips
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
              />
            </motion.header>
          )}
        </AnimatePresence>

        <div className="rs-body">
          {viewMode === "discovery" ? (
            <DiscoveryView
              onSuggestionClick={handleSuggestionClick}
              onInputClick={handleDiscoveryInputClick}
              onMyLocationClick={handleMyLocation}
              onPlaceClick={handleSelectPlace}
              places={discoveryPlaces}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div className="rs-map-container">
                <MapView
                  center={mapCenter}
                  zoom={mapZoom}
                  results={results}
                  selectedPlace={selectedPlace}
                  userLocation={userLocation}
                  onMarkerClick={handleSelectPlace}
                  onCameraChange={handleCameraChange}
                />
              </div>

              <div className="rs-list-container">
                <RestaurantList
                  results={results}
                  isLoading={isLoading}
                  onCardClick={handleSelectPlace}
                  selectedPlaceId={selectedPlace?.placeId ?? null}
                  hasMore={!!nextPageToken}
                  onLoadMore={handleLoadMore}
                />
              </div>
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {isDetailOpen && (
            <RestaurantDetail
              place={selectedPlace}
              details={placeDetails}
              userLocation={userLocation}
              onClose={handleCloseDetail}
            />
          )}
        </AnimatePresence>
      </div>
    </APIProvider>
  );
}
