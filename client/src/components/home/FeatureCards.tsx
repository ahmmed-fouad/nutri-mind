"use client";
import Link from "next/link";
import { featureCards } from "@/data/homepageData";
import { useTranslation } from "react-i18next";

export default function FeatureCards() {
  const { t } = useTranslation("page");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {featureCards.map((f, i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform"
        >
          <div className="flex items-center gap-2 mb-2">
            {f.icon()}
            <span className="font-bold text-lg">{t(`feature_cards.${f.label}`, f.label)}</span>
          </div>
          <div className="text-zinc-500 text-sm text-center">{t(`feature_cards.desc.${f.label}`, f.desc)}</div>
          <div className="mt-2">{t(`feature_cards.preview.${f.label}`)}</div>
          <Link
            href={f.href}
            className="mt-4 px-4 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition flex items-center gap-2"
          >
            {t("feature_cards.go_to")} <span className="sr-only">{t(`feature_cards.${f.label}`, f.label)}</span>
          </Link>
        </div>
      ))}
    </div>
  );
} 