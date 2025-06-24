import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import React from "react";

type SatisfactionChartProps = {
  satisfactionData: { name: string; value: number }[];
  starColors: string[];
};

export default function SatisfactionChart({ satisfactionData, starColors }: SatisfactionChartProps) {
  return (
    <ResponsiveContainer className="!w-[14rem] !h-[15rem]">
      <PieChart>
        <Pie
          data={satisfactionData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={70}
          label
        >
          {satisfactionData.map((entry, i) => (
            <Cell key={i} fill={starColors[i]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
} 