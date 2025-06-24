import { Edit, Trash2, Leaf, Flame, Moon } from "lucide-react";
import React from "react";

function DropletIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#38bdf8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3C12 3 6 10.5 6 15a6 6 0 0 0 12 0c0-4.5-6-12-6-12z" /></svg>;
}
function FootprintsIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#60a5fa"><circle cx="7" cy="17" r="2" /><circle cx="17" cy="7" r="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17c-2-2-2-6 2-8m8-2c2 2 2 6-2 8" /></svg>;
}

const iconMap: Record<string, React.ReactNode> = {
  DropletIcon: <DropletIcon />,
  FootprintsIcon: <FootprintsIcon />,
  Leaf: <Leaf className="w-5 h-5 text-green-500" />,
  Flame: <Flame className="w-5 h-5 text-orange-400" />,
  Moon: <Moon className="w-5 h-5 text-blue-400" />,
};

type Habit = {
  id: number;
  name: string;
  icon: string;
  color: string;
};

type HabitsListProps = {
  habits: Habit[];
  checked: boolean[];
  setChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  getHabitProgress: (idx: number) => number;
};

export default function HabitsList({ habits, checked, setChecked, getHabitProgress }: HabitsListProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-2 sm:p-8 mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-6 gap-1 sm:gap-2">
        <h2 className="text-base sm:text-xl font-bold text-primary flex items-center gap-2">
          Today's Habits
        </h2>
        <button className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition w-full sm:w-auto text-sm sm:text-base">
          + Add Habit
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-6">
        {habits.map((habit, i) => (
          <div
            key={habit.id}
            className="flex flex-col gap-1 sm:gap-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-2 sm:p-4 shadow border border-zinc-100 dark:border-zinc-800"
          >
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <span
                className="rounded-full p-1 sm:p-2"
                style={{ background: habit.color + "22" }}
              >
                {iconMap[habit.icon]}
              </span>
              <span className="font-semibold text-sm sm:text-lg">{habit.name}</span>
              <button className="ml-auto text-zinc-400 hover:text-primary">
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-zinc-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <input
                type="checkbox"
                checked={checked[i]}
                onChange={() =>
                  setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)))
                }
                className="w-4 h-4 sm:w-5 sm:h-5 accent-primary"
              />
              <span className="text-xs sm:text-sm text-zinc-500">Mark as done</span>
            </div>
            <div className="w-full h-2 sm:h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden mt-1 sm:mt-2">
              <div
                className="h-full rounded-full"
                style={{
                  width: getHabitProgress(i) + "%",
                  background: habit.color,
                }}
              />
            </div>
            <div className="text-xs text-zinc-400 mt-1">
              {getHabitProgress(i)}% this week
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 