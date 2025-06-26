"use client";
import { howItWorks } from "@/data/homepageData";
import { useTranslation } from "react-i18next";

export default function HowItWorks() {
  const { t } = useTranslation("page");
  return (
    <div className="flex flex-wrap gap-6 justify-center my-12">
      {howItWorks.map((item, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          {item.icon()}
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{t(`how_it_works.${item.label}`, item.label)}</span>
        </div>
      ))}
    </div>
  );
} 