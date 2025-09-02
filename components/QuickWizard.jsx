"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FOOD_DB, findFoodByQuery, suggestFoods } from "@/lib/data";

function inferPreferForm(text) {
  const q = (text || "").toLowerCase();
  if (/(raw|uncooked)\b/.test(q)) return "raw";
  if (/(leftover|leftovers|cooked|fried|grilled|baked|roasted|boiled|steamed)\b/.test(q)) return "cooked";
  return undefined;
}

export default function QuickWizard() {
  const router = useRouter();
  const [food, setFood] = useState("");
  const [env, setEnv] = useState("fridge");
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [busy, setBusy] = useState(false);

  const datalistOptions = useMemo(() => {
    const opts = new Set();
    for (const f of FOOD_DB) {
      opts.add(f.name);
      (f.synonyms || []).slice(0, 6).forEach((s) => opts.add(s));
    }
    return Array.from(opts).sort();
  }, []);

  async function onCheck() {
    if (!food.trim()) {
      alert("Start typing a food name.");
      return;
    }
    setBusy(true);
    setSuggest([]);
    try {
      const preferForm = inferPreferForm(food);
      const match = await findFoodByQuery(food, preferForm);
      if (!match) {
        const s = await suggestFoods(food, 6);
        setSuggest(s);
        return;
      }
      const params = new URLSearchParams();
      if (env) params.set("env", env);
      const d = Number(days);
      const h = Number(hours);
      if (!Number.isNaN(h) && h > 0) params.set("h", String(h));
      else if (!Number.isNaN(d) && d > 0) params.set("d", String(d));
      const qs = params.toString();
      router.push(qs ? `/food/${match.id}?${qs}` : `/food/${match.id}`);
    } finally {
      setBusy(false);
    }
  }

  function pickSuggestion(id) {
    const params = new URLSearchParams();
    if (env) params.set("env", env);
    const d = Number(days);
    const h = Number(hours);
    if (!Number.isNaN(h) && h > 0) params.set("h", String(h));
    else if (!Number.isNaN(d) && d > 0) params.set("d", String(d));
    const qs = params.toString();
    router.push(qs ? `/food/${id}?${qs}` : `/food/${id}`);
  }

  return (
    <section className="card space-y-4">
      <h2 className="text-xl font-semibold">Quick check</h2>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Food</label>
        <input
          list="foods"
          className="input"
          placeholder="Start typing… e.g., fried chicken, cut watermelon, cooked rice"
          value={food}
          onChange={(e) => { setFood(e.target.value); setSuggest([]); }}
          aria-label="Food name"
        />
        <datalist id="foods">
          {datalistOptions.map((o, i) => <option key={i} value={o} />)}
        </datalist>
      </div>

      <div>
        <label className="block text-sm text-slate-400 mb-1">Where is it?</label>
        <div className="flex flex-wrap gap-2">
          {[
            { val: "fridge", label: "Fridge" },
            { val: "pantry", label: "Room temp" },
            { val: "freezer", label: "Freezer" },
          ].map((b) => (
            <button
              key={b.val}
              type="button"
              onClick={() => setEnv(b.val)}
              className={`btn ${env === b.val ? "" : "opacity-70"}`}
              aria-pressed={env === b.val}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Days (0.5 = 12 h)</label>
          <input
            type="number"
            step="0.5"
            min="0"
            className="input"
            placeholder="e.g., 2 or 0.5"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            aria-label="Days"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">or Hours</label>
          <input
            type="number"
            step="1"
            min="0"
            className="input"
            placeholder="e.g., 12"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            aria-label="Hours"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="btn" type="button" onClick={onCheck} disabled={busy}>
          {busy ? "Checking..." : "Check safety"}
        </button>
      </div>

      {suggest.length > 0 && (
        <div className="text-sm">
          <div className="mb-2 text-slate-300">Did you mean:</div>
          <div className="flex flex-wrap gap-2">
            {suggest.map((s) => (
              <button key={s.id} type="button" onClick={() => pickSuggestion(s.id)} className="btn">
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
