"use client";
import { testimonials } from "@/data/homepageData";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Testimonials() {
  const { t } = useTranslation("page");
  return (
    <div className="my-12">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">{t("testimonials.title")}</h2>
      <div className="flex flex-wrap gap-8 justify-center">
        {testimonials.map((tst, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center max-w-xs">
            <Image src={tst.img} alt={tst.name} width={64} height={64} className="rounded-full mb-3" />
            <div className="italic text-zinc-700 dark:text-zinc-200 mb-2">"{t(`testimonials.${tst.text}`, tst.text)}"</div>
            <div className="font-semibold text-primary">- {t(`testimonials.${tst.name}`, tst.name)}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 