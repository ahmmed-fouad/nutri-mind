import React from "react";
import { useTranslation } from "react-i18next";

export default function MotivationalQuote({ quoteIdx, onNextQuote }: { quoteIdx: number; onNextQuote: () => void }) {
  const { t } = useTranslation("habits");
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-3 sm:p-8 mb-8 sm:mb-12 flex flex-col items-center gap-4 sm:gap-6">
      <div className="text-sm sm:text-lg italic text-zinc-600 dark:text-zinc-300 text-center">
        “{t(`motivational_quotes.${quoteIdx}`)}”
      </div>
      <button
        onClick={onNextQuote}
        className="w-full sm:w-auto px-3 sm:px-4 py-1 rounded-full bg-primary text-[var(--darkcard)] text-xs sm:text-sm font-medium shadow hover:bg-primary/90 transition"
      >
        {t("new_quote")}
      </button>
    </div>
  );
} 