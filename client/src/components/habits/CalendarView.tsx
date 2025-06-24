import { Calendar } from "lucide-react";

export default function CalendarView({ calendarDemo }: { calendarDemo: number[][] }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-2 sm:p-6">
      <h3 className="text-base sm:text-xl font-bold text-primary mb-2 sm:mb-4 flex items-center gap-2">
        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" /> Calendar View
      </h3>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            key={d}
            className="text-[10px] sm:text-sm text-center text-zinc-400 font-semibold"
          >
            {d}
          </div>
        ))}
        {calendarDemo.flat().map((v, i) => (
          <div
            key={i}
            className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[10px] sm:text-sm font-bold ${
              v
                ? "bg-primary text-[var(--darkcard)]"
                : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
            }`}
          >
            {v ? "✓" : ""}
          </div>
        ))}
      </div>
    </div>
  );
} 