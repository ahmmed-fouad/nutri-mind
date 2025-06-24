import React from "react";

export default function MotivationalQuote({ quote, onNextQuote }: { quote: string; onNextQuote: () => void }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-3 sm:p-8 mb-8 sm:mb-12 flex flex-col items-center gap-4 sm:gap-6">
      <div className="text-sm sm:text-lg italic text-zinc-600 dark:text-zinc-300 text-center">
        “{quote}”
      </div>
      <button
        onClick={onNextQuote}
        className="w-full sm:w-auto px-3 sm:px-4 py-1 rounded-full bg-primary text-[var(--darkcard)] text-xs sm:text-sm font-medium shadow hover:bg-primary/90 transition"
      >
        New Quote
      </button>
    </div>
  );
} 