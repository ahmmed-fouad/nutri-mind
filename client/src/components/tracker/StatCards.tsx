import { TrendingUp, Flame, Footprints, Droplet } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type Stat = {
  label: string;
  value: number;
  unit: string;
  icon: string;
};

type StatCardsProps = {
  demoStats: Stat[];
};

function renderIcon(icon: string) {
  switch (icon) {
    case "trendingUp":
      return <TrendingUp className="w-6 h-6 text-primary" />;
    case "flame-orange":
      return <Flame className="w-6 h-6 text-orange-400" />;
    case "flame-red":
      return <Flame className="w-6 h-6 text-red-400" />;
    case "footprints":
      return <Footprints className="w-6 h-6 text-blue-400" />;
    case "droplet":
      return <Droplet className="w-6 h-6 text-cyan-400" />;
    default:
      return null;
  }
}

export default function StatCards({ demoStats }: StatCardsProps) {
  const { t } = useTranslation("tracker");
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {demoStats.map((stat, i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-5 px-2"
        >
          <div>{renderIcon(stat.icon)}</div>
          <div className="text-2xl font-bold mt-2">
            {stat.value}
            <span className="text-base font-normal ml-1">{stat.unit}</span>
          </div>
          <div className="text-xs text-zinc-400 mt-1">{t(stat.label)}</div>
        </div>
      ))}
    </div>
  );
} 