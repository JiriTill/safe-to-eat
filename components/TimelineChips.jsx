import React from "react";

export function TimelineChips({ freezer, fridge, pantry }) {
  const chip = (label, value) => (
    <div className="px-3 py-1.5 rounded-lg bg-[var(--card-elev)] border border-[var(--border)] text-sm">
      <span className="font-semibold">{label}:</span> <span>{value || "—"}</span>
    </div>
  );
  return (
    <div className="flex flex-wrap gap-2">
      {chip("🥶 Freezer", freezer)}
      {chip("🧊 Fridge", fridge)}
      {chip("🌡️ Room", pantry ?? "Not recommended")}
    </div>
  );
}
