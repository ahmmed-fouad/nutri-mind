"use client";
import Link from "next/link";
import { featureCards } from "@/data/homepageData";

export default function FeatureCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {featureCards.map((f, i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform"
        >
          <div className="flex items-center gap-2 mb-2">{f.icon()}<span className="font-bold text-lg">{f.label}</span></div>
          <div className="text-zinc-500 text-sm text-center">{f.desc}</div>
          <div className="mt-2">{f.preview()}</div>
          <Link
            href={f.href}
            className="mt-4 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition flex items-center gap-2"
          >
            Go to <span className="sr-only">{f.label}</span>
          </Link>
        </div>
      ))}
    </div>
  );
} 