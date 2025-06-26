import { Trophy } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type MotivationalQuoteProps = {
  motivationalQuotes: string[];
  quoteIdx: number;
  setQuoteIdx: (idx: number) => void;
  streak: number;
};

export default function MotivationalQuote({ motivationalQuotes, quoteIdx, setQuoteIdx, streak }: MotivationalQuoteProps) {
  const { t } = useTranslation("tracker");
  return (
    <div className="bg-gradient-to-br from-blue-100 via-green-50 to-cyan-100 dark:from-blue-900 dark:via-green-950 dark:to-cyan-950 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center justify-center gap-6">
      <div className="text-lg italic text-zinc-600 dark:text-zinc-300 text-center">
        “{motivationalQuotes[quoteIdx]}”
      </div>
      <div className="flex items-center gap-2 text-primary font-bold text-xl">
        <Trophy className="w-6 h-6" /> {t("day_streak", { count: streak })}
      </div>
      <button
        onClick={() => setQuoteIdx((quoteIdx + 1) % motivationalQuotes.length)}
        className="px-4 py-1 rounded-full bg-primary text-[var(--darkcard)] text-sm font-medium shadow hover:bg-primary/90 transition"
      >
        {t("new_quote")}
      </button>
    </div>
  );
} 