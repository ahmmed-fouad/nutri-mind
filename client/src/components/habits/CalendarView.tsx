import { Calendar } from "lucide-react";

export default function CalendarView({ calendarDemo }: { calendarDemo: number[][] }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6">
      <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
        <Calendar className="w-5 h-5" /> Calendar View
      </h3>
      <div className="grid grid-cols-7 gap-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            key={d}
            className="text-xs text-center text-zinc-400 font-semibold"
          >
            {d}
          </div>
        ))}
        {calendarDemo.flat().map((v, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
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