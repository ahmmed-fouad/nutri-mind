import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import React from "react";
import { useTranslation } from "react-i18next";

type UsageChartProps = {
  usageData: { name: string; value: number }[];
  COLORS: string[];
};

export default function UsageChart({ usageData, COLORS }: UsageChartProps) {
  const { t } = useTranslation("settings");
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 mb-12">
      <h2 className="text-lg sm:text-xl font-bold text-primary mb-6 flex items-center gap-2">
        <PieChart className="w-5 h-5" /> {t("usage_chart")}
      </h2>
      <div className="w-full h-56 sm:h-80 flex items-center justify-center">
        <ResponsiveContainer className="!h-[16rem] !w-[15rem]">
          <PieChart>
            <Pie
              data={usageData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={65}
              fill="#34d399"
              label
            >
              {usageData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 