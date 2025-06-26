import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import { useTranslation } from "react-i18next";

type CategoryChartProps = {
  categoryChartData: { name: string; value: number }[];
  categories: { name: string; color: string }[];
};

export default function CategoryChart({
  categoryChartData,
  categories,
}: CategoryChartProps) {
  const { t } = useTranslation("grocery-list");
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
      <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
        <PieChart className="w-5 h-5" /> {t("category_chart.title", "Category Breakdown")}
      </h2>
      <div className="w-full h-80 flex items-center justify-center">
        <ResponsiveContainer className="">
          <PieChart>
            <Pie
              data={categoryChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={55}
              fill="#34d399"
              label={({ name }) => t(`categories.${name}`, name).toString()}
            >
              {categoryChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={categories[index].color} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any, name: any) => [value, t(`categories.${name}`, name).toString()]} />
            <Legend formatter={(value) => t(`categories.${value}`, value).toString()} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
