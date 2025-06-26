import { FileText } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

export default function DailyProgress() {
  const { t } = useTranslation("tracker");
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6">
      <h3 className="text-xl font-bold text-primary mb-2">
        {t("today_progress")}
      </h3>
      <div>
        <div className="flex justify-between mb-1 text-sm">
          <span>{t("metrics.water")}</span>
          <span>2.3L / 3L</span>
        </div>
        <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-cyan-400" style={{ width: "77%" }} />
        </div>
        <div className="flex justify-between mb-1 text-sm">
          <span>{t("metrics.steps")}</span>
          <span>8200 / 10000</span>
        </div>
        <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
          <div className="h-full bg-blue-400" style={{ width: "82%" }} />
        </div>
        <div className="flex justify-between mb-1 text-sm">
          <span>{t("metrics.calories")}</span>
          <span>1850 / 2000</span>
        </div>
        <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
          <div className="h-full bg-red-400" style={{ width: "92%" }} />
        </div>
      </div>
      <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition">
        <FileText className="w-5 h-5" /> {t("log_today")}
      </button>
    </div>
  );
} 