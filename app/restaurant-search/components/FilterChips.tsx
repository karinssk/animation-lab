"use client";

import { motion } from "framer-motion";
import { FILTER_CHIPS } from "../constants";

interface Props {
  activeFilter: string;
  onFilterChange: (id: string, type: string) => void;
}

export function FilterChips({ activeFilter, onFilterChange }: Props) {
  return (
    <div className="rs-filter-chips">
      {FILTER_CHIPS.map((chip) => {
        const isActive = chip.id === activeFilter;
        return (
          <motion.button
            key={chip.id}
            className={`rs-chip rs-chip--${chip.id} ${isActive ? "rs-chip--active" : ""}`}
            onClick={() => onFilterChange(chip.id, chip.type)}
            whileTap={{ scale: 0.93 }}
            layout
          >
            <span>{chip.icon}</span>
            <span>{chip.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
