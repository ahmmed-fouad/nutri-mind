import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Bell } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type NotificationsHeaderProps = {
  chartData: { name: string; value: number }[];
  typeColors: string[];
};

export default function NotificationsHeader({
  chartData,
  typeColors,
}: NotificationsHeaderProps) {
  const { t } = useTranslation("notifications");
  const translatedChartData = chartData.map(d => ({ ...d, name: t(`types.${d.name}`, d.name) }));
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6 mb-4 sm:mb-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 flex items-center gap-2 sm:gap-3 mb-2 md:mb-0">
        <Bell className="w-6 h-6 sm:w-8 sm:h-8" /> {t("notifications")}
      </h1>
      <div className="w-44 sm:w-72 mx-auto md:mx-0">
        <ResponsiveContainer className="border !h-[16rem] sm:!h-[13rem]">
          <PieChart>
            <Pie
              data={translatedChartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={40}
              label
            >
              {chartData.map((entry, i) => (
                <Cell key={i} fill={typeColors[i % typeColors.length]} />
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
