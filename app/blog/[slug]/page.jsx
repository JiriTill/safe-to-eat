import React from "react";
import { notFound } from "next/navigation";
import posts from "@/data/posts.json";
import { formatDateUTC } from "@/lib/format";

export default function BlogPost({ params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="!mb-2">{post.title}</h1>
      <p className="!mt-0 text-sm text-slate-400 whitespace-nowrap">
        {formatDateUTC(post.date)}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </article>
  );
}

{/* Sticky mobile CTA */}
<div className="md:hidden fixed bottom-4 right-4 z-40">
  <a href="/" className="btn shadow-lg bg-[var(--accent)] text-white hover:opacity-90">New check</a>
</div>