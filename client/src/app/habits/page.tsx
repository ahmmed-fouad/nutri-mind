"use client";
import { useState } from "react";
import HabitsHeader from "@/components/habits/HabitsHeader";
import HabitsList from "@/components/habits/HabitsList";
import HabitsChart from "@/components/habits/HabitsChart";
import StreaksAchievements from "@/components/habits/StreaksAchievements";
import MotivationalQuote from "@/components/habits/MotivationalQuote";
import CalendarView from "@/components/habits/CalendarView";
import NotesSection from "@/components/habits/NotesSection";
import ExportButton from "@/components/habits/ExportButton";
import { demoHabits, demoProgress, motivationalQuotes, calendarDemo } from "@/data/habitsData";

export default function HabitTrackerPage() {
  const [habits, setHabits] = useState(demoHabits);
  const [checked, setChecked] = useState([true, true, false, true, true]);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [note, setNote] = useState("");
  const [streak, setStreak] = useState(9); // demo streak
  const [view, setView] = useState("week");

  // Demo progress bar calculation
  const getHabitProgress = (idx: number) => {
    const total = demoProgress.length;
    let done = 0;
    for (let i = 0; i < total; i++) {
      if (Object.values(demoProgress[i])[idx + 1]) done++;
    }
    return Math.round((done / total) * 100);
  };

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-zinc-50 via-white to-green-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-green-950 py-8 px-2 sm:px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <HabitsHeader />
        <HabitsList
          habits={habits}
          checked={checked}
          setChecked={setChecked}
          getHabitProgress={getHabitProgress}
        />
        <HabitsChart
          demoProgress={demoProgress}
          view={view}
          setView={setView}
        />
        <StreaksAchievements streak={streak} />
        <MotivationalQuote
          quoteIdx={quoteIdx}
          onNextQuote={() => setQuoteIdx((q) => (q + 1) % motivationalQuotes.length)}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10 md:mb-12">
          <CalendarView calendarDemo={calendarDemo} />
          <NotesSection note={note} setNote={setNote} />
        </div>
        <ExportButton />
      </div>
    </div>
  );
}

function DropletIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#38bdf8"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3C12 3 6 10.5 6 15a6 6 0 0 0 12 0c0-4.5-6-12-6-12z" /></svg>;
}
function FootprintsIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#60a5fa"><circle cx="7" cy="17" r="2" /><circle cx="17" cy="7" r="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17c-2-2-2-6 2-8m8-2c2 2 2 6-2 8" /></svg>;
}
