import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Bell } from "lucide-react";
import React from "react";

type NotificationsHeaderProps = {
  chartData: { name: string; value: number }[];
  typeColors: string[];
};

export default function NotificationsHeader({
  chartData,
  typeColors,
}: NotificationsHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 flex items-center gap-3">
        <Bell className="w-8 h-8" /> Notifications
      </h1>
      <div className="w-72">
        <ResponsiveContainer className="!h-[13rem]">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
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
