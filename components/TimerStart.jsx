"use client";

import React, { useEffect, useState } from "react";

function loadTimers() {
  try { return JSON.parse(localStorage.getItem("timers") || "[]"); } catch { return []; }
}
function saveTimers(timers) {
  localStorage.setItem("timers", JSON.stringify(timers));
}

export default function TimerStart({ name, defaultDays }) {
  const [dateStr, setDateStr] = useState("");

  useEffect(() => {
    const today = new Date();
    setDateStr(today.toISOString().slice(0,10));
  }, []);

  function addTimer() {
    const started = dateStr ? new Date(dateStr + "T12:00:00").getTime() : Date.now();
    const expires = defaultDays ? started + defaultDays * 24 * 60 * 60 * 1000 : undefined;
    const newTimer = {
      id: Math.random().toString(36).slice(2),
      name,
      startedAt: started,
      expiresAt: expires
    };
    const next = [...loadTimers(), newTimer];
    saveTimers(next);
    alert("Timer saved locally.");
  }

  return (
    <div className="card">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <label className="block text-sm text-slate-400 mb-1">When was it cooked/opened?</label>
          <input type="date" className="input" value={dateStr} onChange={e => setDateStr(e.target.value)} />
        </div>
        <button className="btn" onClick={addTimer}>Start timer</button>
      </div>
      <p className="text-xs text-slate-400 mt-2">Timers are saved on this device only.</p>
    </div>
  );
}
