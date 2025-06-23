"use client";
import { metricOptions } from "@/data/homepageData";

type Props = {
  metric: string;
  setMetric: (key: string) => void;
};

export default function MetricSelector({ metric, setMetric }: Props) {
  return (
    <div className="flex gap-2 flex-wrap">
      {metricOptions.map((opt) => (
        <button
          key={opt.key}
          onClick={() => setMetric(opt.key)}
          className={`cursor-pointer px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${
            metric === opt.key
              ? "bg-primary text-[var(--darkcard)] border-primary"
              : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
} 