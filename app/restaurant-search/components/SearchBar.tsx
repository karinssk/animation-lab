"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onMyLocation: () => void;
  isLocating: boolean;
}

export function SearchBar({ value, onChange, onMyLocation, isLocating }: Props) {
  return (
    <div className="rs-search-bar">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="2.5" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        className="rs-search-bar__input"
        type="text"
        placeholder="what're you looking for?"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <button
          className="rs-search-bar__btn"
          onClick={() => onChange("")}
          aria-label="Clear search"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <button
        className={`rs-search-bar__btn ${isLocating ? "rs-search-bar__btn--active" : ""}`}
        onClick={onMyLocation}
        aria-label="Use my location"
      >
        <img src="/map.png" alt="Use my location" width={20} height={20} />
      </button>
    </div>
  );
}
