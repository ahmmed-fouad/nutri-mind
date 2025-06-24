import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Award } from "lucide-react";
import React from "react";

type HabitsChartProps = {
  demoProgress: any[];
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
};

export default function HabitsChart({ demoProgress, view, setView }: HabitsChartProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold text-primary flex items-center gap-2">
          <Award className="w-5 h-5" /> Habit Completion
        </h2>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setView("week")}
            className={`px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${
              view === "week"
                ? "bg-primary text-[var(--darkcard)] border-primary"
                : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView("month")}
            className={`px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${
              view === "month"
                ? "bg-primary text-[var(--darkcard)] border-primary"
                : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView("year")}
            className={`px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${
              view === "year"
                ? "bg-primary text-[var(--darkcard)] border-primary"
                : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
            }`}
          >
            Year
          </button>
        </div>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={demoProgress}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Water" stackId="a" fill="#38bdf8" />
            <Bar dataKey="Steps" stackId="a" fill="#60a5fa" />
            <Bar dataKey="Veg" stackId="a" fill="#34d399" />
            <Bar dataKey="Sugar" stackId="a" fill="#fbbf24" />
            <Bar dataKey="Sleep" stackId="a" fill="#a78bfa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 