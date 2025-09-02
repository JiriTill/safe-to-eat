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
      <section aria-labelledby="seo" className="space-y-3">
        <h2 id="seo" className="text-xl font-semibold">How long does food last in the fridge or freezer?</h2>
        <div className="prose prose-invert max-w-none">
          <p>
            Not sure whether last night’s <strong>fried chicken</strong> is still good, how long
            <strong> pizza </strong> lasts in the fridge, or if <strong>leftover rice</strong> is safe to reheat? You’re not alone. People search every day for
            questions like <em>“how long does cooked chicken last in the fridge,” “is pizza safe after being left out overnight,” “is sushi safe the next day,”
            “how long do eggs keep,”</em> and <em>“how long does cut fruit last in the fridge.”</em> This site gives plain-English, conservative timelines for
            <strong> fridge</strong>, <strong>freezer</strong>, and <strong>room temperature</strong> so you can decide quickly and confidently.
          </p>
          <p>
            Our guidance focuses on common foods: <strong>poultry</strong> (rotisserie chicken, fried chicken, turkey), <strong>beef &amp; pork</strong> (steaks,
            ground meat, deli meat), <strong>seafood</strong> (cooked fish, raw fish, shrimp, sushi takeout), <strong>dairy &amp; eggs</strong> (milk, yogurt,
            cream cheese, hard-boiled eggs), <strong>produce</strong> (cut watermelon and cantaloupe, strawberries, blueberries), <strong>grains</strong> (cooked
            rice, pasta), and <strong>prepared foods</strong> (pizza, soups, stews, takeout). Each item shows a fridge window, freezer storage time, and whether
            room-temperature holding is recommended.
          </p>
          <h3>Quick answers for high-intent searches</h3>
          <ul>
            <li><strong>Cooked chicken in the fridge:</strong> typically 3–4 days if cooled fast and stored ≤ <strong>40°F / 4°C</strong>.</li>
            <li><strong>Pizza in the fridge:</strong> usually 3–4 days; toss if it sat out over 2 hours at room temp.</li>
            <li><strong>Leftover rice safety:</strong> cool quickly, refrigerate within 2 hours, and reheat thoroughly to <strong>165°F / 74°C</strong>.</li>
            <li><strong>Sushi next day:</strong> best within 24 hours if kept cold; use smell/texture and time as your guides.</li>
            <li><strong>Cut fruit:</strong> refrigerate promptly; most is best within 3–4 days.</li>
          </ul>
          <h3>Why time and temperature matter</h3>
          <p>
            Refrigeration slows bacterial growth but does not stop it. Quality and safety change over time, especially if food lingered in the
            <em> danger zone</em> (40–140°F / 4–60°C). That’s why the <strong>2-hour rule</strong> exists for perishables at room temperature (1 hour if above
            90°F / 32°C). When reheating leftovers, aim for <strong>165°F / 74°C</strong> so heat reaches the center quickly. Freezing keeps food <em>safe</em>
            indefinitely, though flavor and texture are best when used within a few months.
          </p>
          <h3>How to use this site</h3>
          <p>
            Start typing a food name (e.g., <em>fried chicken</em>, <em>cooked rice</em>, <em>cut watermelon</em>) and choose the storage location
            (<em>fridge</em>, <em>freezer</em>, or <em>room temp</em>). Enter the time, and you’ll get an instant verdict: <strong>Safe to eat</strong>,
            <strong> Use caution</strong>, or <strong>Discard</strong>—plus clear bullets and a timeline you can scan in seconds.
          </p>
          <p>
            We summarize mainstream U.S. sources (USDA, FoodSafety.gov, FDA). Always follow label directions and local guidance. If anything seems off—slimy,
            sour, or moldy—trust your senses and remember the golden rule: <strong>When in doubt, throw it out.</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
