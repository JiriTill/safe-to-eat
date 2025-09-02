import React from "react";
import "./globals.css";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Is it Safe to Eat?",
  description: "Plain-English food safety timelines for fridge, freezer, and room temperature.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://is-it-safe-to-eat.vercel.app"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png", // optional if you add it
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800">
          <div className="container py-4 flex items-center justify-between gap-4">
            <Link href="/" className="font-bold text-lg hover:opacity-90">
              Is it Safe to Eat?
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/blog" className="hover:underline">Blog</Link>
              {/* Ko-fi support button */}
              <a
                href="https://ko-fi.com/"
                target="_blank"
                rel="noreferrer"
                className="btn"
                title="Support us on Ko-fi"
              >
                Support
              </a>
            </nav>
          </div>
        </header>

        <main className="container py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
