"use client";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FOOD_DB } from "@/lib/data";

function normalize(str) {
  return (str || "").toLowerCase().trim();
}

function matchFood(query) {
  const q = normalize(query);
  if (q.length < 2) return []; // don't show suggestions until user types
  return FOOD_DB.filter((item) => {
    const hay = [
      item.name,
      ...(item.synonyms || []),
      item.id.replace(/-/g, " ")
    ].join(" || ").toLowerCase();
    return hay.includes(q);
  }).slice(0, 8); // keep list short
}

export default function QuickWizard() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [env, setEnv] = useState("fridge");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [open, setOpen] = useState(false);

  const suggestions = useMemo(() => matchFood(query), [query]);

  const onSubmit = (e) => {
    e.preventDefault();
    const picked = suggestions[0] || FOOD_DB.find(f =>
      normalize(f.name) === normalize(query) ||
      (f.synonyms || []).some(s => normalize(s) === normalize(query)) ||
      f.id === query
    );
    if (!picked) {
      alert("Please choose a known food. Start typing and select one from the list.");
      return;
    }
    const params = new URLSearchParams();
    params.set("env", env);
    if (hours) params.set("h", hours);
    else if (days) params.set("d", days);
    router.push(`/food/${picked.id}?${params.toString()}`);
  };

  return (
    <form onSubmit={onSubmit} className="card space-y-4 relative" role="search" aria-label="Quick food safety check">
      <h3 className="text-lg font-semibold">Quick check</h3>

      {/* Food */}
      <div className="space-y-2">
        <label className="block text-sm text-slate-300">Food</label>
        <input
          className="input"
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 100)}
          placeholder="Start typing… e.g., fried chicken, cut watermelon, cooked rice"
          autoComplete="off"
        />
        {/* Suggestions — only after typing */}
        {open && query.trim().length >= 2 && suggestions.length > 0 && (
          <ul className="absolute left-5 right-5 z-20 mt-1 max-h-56 overflow-auto rounded-xl border border-[var(--border)] bg-[var(--card-elev)]">
            {suggestions.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => { setQuery(item.name); setOpen(false); }}
                  className="w-full text-left px-3 py-2 hover:bg-[var(--card)]"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Env */}
      <div className="space-y-2">
        <label className="block text-sm text-slate-300">Where is it?</label>
        <div className="flex gap-2">
          {["fridge","pantry","freezer"].map((e) => (
            <button
              key={e}
              type="button"
              aria-pressed={env === e}
              onClick={() => setEnv(e)}
              className={`btn ${env === e ? "active" : ""}`}
            >
              {e === "fridge" ? "Fridge" : e === "pantry" ? "Room temp" : "Freezer"}
            </button>
          ))}
        </div>
      </div>

      {/* Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-slate-300">Days (0.5 = 12 h)</label>
          <input className="input" inputMode="decimal" placeholder="e.g., 2 or 0.5" value={days}
            onChange={(e) => { setDays(e.target.value); if (e.target.value) setHours(""); }} />
        </div>
        <div>
          <label className="block text-sm text-slate-300">or Hours</label>
          <input className="input" inputMode="numeric" placeholder="e.g., 12" value={hours}
            onChange={(e) => { setHours(e.target.value); if (e.target.value) setDays(""); }} />
        </div>
      </div>

      {/* Centered primary button */}
      <div className="pt-1 flex justify-center">
        <button className="btn btn-primary btn-lg" type="submit">Check safety</button>
      </div>
    </form>
  );
}
