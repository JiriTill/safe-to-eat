"use client";
import React from "react";

const toneMap = {
  safe:   { bar: "bg-[var(--safe)]",   iconBg: "bg-[var(--safe-bg)]",   text: "text-[var(--safe)]",   title: "Safe to eat" },
  caution:{ bar: "bg-[var(--caution)]",iconBg: "bg-[var(--caution-bg)]",text: "text-[var(--caution)]",title: "Use caution" },
  danger: { bar: "bg-[var(--danger)]", iconBg: "bg-[var(--danger-bg)]", text: "text-[var(--danger)]", title: "Discard immediately" }
};

export function AnswerCard({ verdict }) {
  const tone = toneMap[verdict?.tone || "caution"];

  return (
    <section
      className="card overflow-hidden"
      aria-live="polite"
      {...(verdict?.tone === "danger" ? { role: "alert" } : {})}
    >
      {/* 8px color bar */}
      <div className={`h-2 -m-4 mb-3 ${tone.bar}`} />

      <div className="flex items-start gap-3">
        {/* 2× icon in soft bg */}
        <div className={`w-10 h-10 rounded-full ${tone.iconBg} flex items-center justify-center flex-shrink-0 text-xl ${tone.text}`} aria-hidden>
          {verdict.tone === "safe" ? "✓" : verdict.tone === "caution" ? "!" : "✕"}
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold mb-1">{tone.title}</h2>
          {verdict?.title && <p className="text-[var(--text-secondary)]">{verdict.title}</p>}
        </div>
      </div>

      {Array.isArray(verdict?.bullets) && verdict.bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {verdict.bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[var(--text-muted)]" aria-hidden>•</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
