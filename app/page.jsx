import React from "react";
import Link from "next/link";
import Image from "next/image";
import QuickWizard from "@/components/QuickWizard";
import posts from "@/data/posts.json";
import { FAQ } from "@/components/FAQ";

// simple home FAQ items
const homeFaq = [
  { q: "What’s the 2-hour rule?", a: "Perishables at room temp over 2 hours (1 hour if > 90°F / 32°C) should be discarded." },
  { q: "Do freezing times affect safety?", a: "Freezing keeps food safe indefinitely; quality declines over time." },
  { q: "Are timelines US-only?", a: "We summarize US guidance (USDA/FDA). Always follow your local rules and labels." },
  { q: "How accurate are these estimates?", a: "They’re conservative and assume proper handling and a ≤ 40°F / 4°C fridge." },
  { q: "What if my food isn’t listed?", a: "Try a close match via synonyms; we’ll be expanding coverage. When in doubt, throw it out." },
];

export const metadata = {
  title: "Is it Safe to Eat? – Simple food safety timelines",
  description: "How long does cooked chicken last in the fridge? Leftover pizza? Sushi? Clear timelines for fridge, freezer, and room temperature.",
};

export default function Home() {
  const latest = [...posts].sort((a,b) => (a.date < b.date ? 1 : -1)).slice(0,3);

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Is it safe to eat?</h1>
          <p className="text-[var(--text-secondary)] text-lg">
            Quick, conservative timelines for <strong>fridge</strong>, <strong>freezer</strong>, and <strong>room temp</strong>.
          </p>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="badge badge-safe">✓ Pizza: 3 days fridge</span>
            <span className="badge badge-danger">✗ Rice: 8 hours out</span>
          </div>
        </div>

        {/* 4:3 hero image */}
        <div className="relative w-full h-56 md:h-72 card overflow-hidden">
          <Image
            src="/hero.png"
            alt="Family looking into a fridge, unsure if food is safe"
            fill
            sizes="(min-width: 768px) 480px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>


      {/* QUICK CHECK – primary */}
      <section id="quick">
        <QuickWizard />
      </section>

      {/* BLOG PREVIEW */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">From the blog</h2>
          <Link href="/blog" className="text-sm hover:underline">All posts</Link>
        </div>
        <div className="grid gap-4">
          {latest.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card hover:brightness-110 transition">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <span className="text-xs text-slate-400">{new Date(p.date).toLocaleDateString()}</span>
              </div>
              <p className="text-slate-300 mt-1">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* HOME FAQ */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <FAQ items={homeFaq} />
      </section>

      {/* SEO RICH TEXT */}
      <section className="card space-y-3">
        <h2 className="text-lg font-semibold">How long does food last in the fridge or freezer?</h2>
        <p>
          People often search for: <em>how long does cooked chicken last in the fridge</em>, <em>how long is pizza good for</em>,
          <em> leftover rice safety</em>, <em>is sushi safe next day</em>, <em>how long do eggs keep</em>, or <em>cut fruit in fridge</em>.
          Our timelines cover <strong>poultry, beef, pork, seafood, dairy, eggs, produce, grains, soups & stews, and takeout</strong>,
          with quick answers for fridge, freezer, and room temperature.
        </p>
        <p>
          Example long-tail questions we address: “How long do leftovers last in the fridge?”, “Is it safe to eat pizza left out overnight?”,
          “Can I freeze cooked rice?”, “How long does watermelon last once cut?”, “How long can deli meat stay in the fridge?”.
        </p>
        <p className="text-sm text-slate-400">
          Tip: Keep your fridge at ≤ 40°F / 4°C and reheat leftovers to 165°F / 74°C.
        </p>
      </section>
    </div>
  );
}
