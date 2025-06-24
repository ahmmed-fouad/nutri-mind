import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { counters, activityData } from "@/data/forumData";

type ActivityData = {
  day: string;
  posts: number;
};

type HeaderForumProps = {
  counterAnim: number[];
};
const accent = "#6366f1";
const HeaderForum: React.FC<HeaderForumProps> = ({ counterAnim }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 w-full">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center md:text-left">
        Community Forum
      </h1>
      <div className="grid grid-cols-2 gap-4 sm:flex sm:gap-6 w-full sm:w-auto justify-center">
        {counters.map((c, i) => (
          <div key={i} className="flex flex-col items-center p-2">
            <span className="text-2xl sm:text-3xl font-bold text-primary animate-counter">
              {counterAnim[i]}
            </span>
            <span className="text-zinc-500 text-xs sm:text-sm font-semibold text-center">
              {c.label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full sm:w-64">
        <ResponsiveContainer width="100%" height={40} className="sm:!h-[60px]">
          <BarChart data={activityData}>
            <XAxis dataKey="day" />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="posts" fill={accent} radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HeaderForum;
