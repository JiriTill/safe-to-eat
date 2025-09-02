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
      {/* === SEO / education block === */}
        <section aria-labelledby="seo" className="space-y-5">
          <h2 id="seo" className="text-xl font-semibold">How long does food last in the fridge or freezer?</h2>
        
          <div className="space-y-4 leading-relaxed text-[var(--text-secondary)]">
            <p>
              Not sure whether last night’s <strong>fried chicken</strong> is still good, how long
              <strong> pizza </strong> lasts in the fridge, or if <strong>leftover rice</strong> is safe to reheat? You’re not
              alone. People search every day for questions like <em>“how long does cooked chicken last in the fridge,” “is pizza
              safe after being left out overnight,” “is sushi safe the next day,” “how long do eggs keep,”</em> and
              <em> “how long does cut fruit last in the fridge.”</em> We give plain-English, conservative timelines for
              <strong> fridge</strong>, <strong>freezer</strong>, and <strong>room temperature</strong> so you can decide
              quickly and confidently.
            </p>
        
            <p>
              Our guidance focuses on common foods: <strong>poultry</strong> (rotisserie chicken, fried chicken, turkey),
              <strong> beef &amp; pork</strong> (steaks, ground meat, deli meat), <strong>seafood</strong> (cooked fish, raw
              fish, shrimp, sushi takeout), <strong>dairy &amp; eggs</strong> (milk, yogurt, cream cheese, hard-boiled eggs),
              <strong> produce</strong> (cut watermelon and cantaloupe, strawberries, blueberries), <strong>grains</strong>
              (cooked rice, pasta), and <strong>prepared foods</strong> (pizza, soups, stews, takeout). Each item shows a fridge
              window, freezer storage time, and whether room-temperature holding is recommended.
            </p>
        
            {/* Quick answers in a tidy, scannable card */}
            <div className="card bg-[var(--card-elev)] space-y-3">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">Quick answers for high-intent searches</h3>
              <ul className="grid sm:grid-cols-2 gap-2">
                <li className="flex gap-2">
                  <span aria-hidden>🍗</span>
                  <span><strong>Cooked chicken (fridge):</strong> typically <strong>3–4 days</strong> if cooled fast and stored at ≤ <strong>40°F / 4°C</strong>.</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>🍕</span>
                  <span><strong>Pizza (fridge):</strong> usually <strong>3–4 days</strong>; discard if it sat out over <strong>2 hours</strong> at room temp.</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>🍚</span>
                  <span><strong>Leftover rice:</strong> cool quickly, refrigerate within <strong>2 hours</strong>, and reheat to <strong>165°F / 74°C</strong>.</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>🍣</span>
                  <span><strong>Sushi (takeout):</strong> best within <strong>24 hours</strong> if kept cold; use smell/texture + time as guides.</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>🍉</span>
                  <span><strong>Cut fruit:</strong> refrigerate promptly; most is best within <strong>3–4 days</strong>.</span>
                </li>
                <li className="flex gap-2">
                  <span aria-hidden>🥚</span>
                  <span><strong>Hard-boiled eggs:</strong> keep refrigerated; generally <strong>up to 7 days</strong>.</span>
                </li>
              </ul>
            </div>
        
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Why time and temperature matter</h3>
            <p>
              Refrigeration slows bacterial growth, but doesn’t stop it. Quality and safety change over time—especially if food
              lingered in the <em>danger zone</em> (40–140°F / 4–60°C). That’s why the <strong>2-hour rule</strong> exists for
              perishables at room temperature (1 hour if above 90°F / 32°C). When reheating leftovers, aim for
              <strong> 165°F / 74°C</strong> so heat reaches the center quickly. Freezing keeps food <em>safe</em> indefinitely,
              though flavor and texture are best when used within a few months.
            </p>
        
            <h3 className="text-base font-semibold text-[var(--text-primary)]">How to use this site (and stay organized)</h3>
            <p>
              Start typing a food name (e.g., <em>fried chicken</em>, <em>cooked rice</em>, <em>cut watermelon</em>) and choose
              the storage location (<em>fridge</em>, <em>freezer</em>, or <em>room temp</em>). Enter the time, and you’ll get an
              instant verdict—<strong>Safe to eat</strong>, <strong>Use caution</strong>, or <strong>Discard</strong>—plus a
              clear timeline you can scan in seconds. If you also take supplements and want an easy way to track them,
              we recommend <a href="https://SuppPlanner.com" target="_blank" rel="noopener" className="link">SuppPlanner.com</a>:
              it keeps your routine organized so you never guess about timing or interactions.
            </p>
        
            <p className="text-[var(--text-primary)]">
              Golden rule: <strong>When in doubt, throw it out.</strong>
            </p>
        
            {/* Sources separated and italicized */}
            <aside className="card border border-[var(--border)]/70">
              <p className="italic text-sm">
                Sources summarized from <a className="link" href="https://www.foodsafety.gov" target="_blank" rel="noopener">FoodSafety.gov</a>,{" "}
                <a className="link" href="https://www.fsis.usda.gov" target="_blank" rel="noopener">USDA Food Safety &amp; Inspection Service</a>, and{" "}
                <a className="link" href="https://www.fda.gov/food" target="_blank" rel="noopener">FDA Food</a>. Always follow label directions and local guidance.
              </p>
            </aside>
          </div>
        </section>

    </div>
  );
}
