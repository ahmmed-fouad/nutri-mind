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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-primary">
        Community Forum
      </h1>
      <div className="flex gap-6">
        {counters.map((c, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-3xl font-bold text-primary animate-counter">
              {counterAnim[i]}
            </span>
            <span className="text-zinc-500 text-sm font-semibold">
              {c.label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-64">
        <ResponsiveContainer width="100%" height={60}>
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
