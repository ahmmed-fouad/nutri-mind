import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import React from "react";

type MetricOption = { key: string; label: string; color: string };

type ProgressChartProps = {
  progressData: any[];
  metric: string;
  setMetric: (m: string) => void;
  metricOptions: MetricOption[];
};

export default function ProgressChart({ progressData, metric, setMetric, metricOptions }: ProgressChartProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-primary">
          Progress Over Time
        </h2>
        <div className="flex gap-2 flex-wrap">
          {metricOptions.map((opt) => (
            <button
              key={opt.key}
              className={`px-4 py-1 cursor-pointer rounded-full font-medium border transition shadow-sm text-sm ${
                metric === opt.key
                  ? "bg-primary text-[var(--darkcard)] border-primary"
                  : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
              }`}
              onClick={() => setMetric(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={progressData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={metric}
              stroke={metricOptions.find((m) => m.key === metric)?.color}
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 