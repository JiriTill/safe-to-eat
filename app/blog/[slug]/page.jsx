// app/blog/[slug]/page.jsx
import React from "react";
import { notFound } from "next/navigation";
import posts from "@/data/posts.json";

export async function generateMetadata({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  const urlBase = process.env.NEXT_PUBLIC_SITE_URL || "https://is-it-safe-to-eat.vercel.app";
  const url = `${urlBase}/blog/${post.slug}`;

  return {
    title: `${post.title} – Is it Safe to Eat?`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: "/hero.png" }]
    },
    alternates: { canonical: url },
  };
}

export default function BlogPost({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="!mb-2">{post.title}</h1>
      <p className="!mt-0 text-sm text-slate-400 whitespace-nowrap">
        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "2-digit" })}
      </p>

      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

      {/* Ko-Fi CTA (link—widget already loads site-wide from layout) */}
      <div className="card mt-6">
        <p className="mb-3">Found this helpful? Keep the site free:</p>
        <a href="https://ko-fi.com/T6T31JW6G3" target="_blank" rel="noreferrer" className="btn">Support on Ko-Fi</a>
      </div>
    </article>
  );
}
