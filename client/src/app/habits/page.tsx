"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { CheckCircle, Plus, Edit, Trash2, Award, Calendar, FileText, Download, Flame, Sun, Moon, Leaf } from "lucide-react";

const demoHabits = [
  { id: 1, name: "Drink Water", icon: <DropletIcon />, color: "#38bdf8" },
  { id: 2, name: "Walk 10,000 steps", icon: <FootprintsIcon />, color: "#60a5fa" },
  { id: 3, name: "Eat Vegetables", icon: <Leaf className="w-5 h-5 text-green-500" /> , color: "#34d399" },
  { id: 4, name: "No Sugar", icon: <Flame className="w-5 h-5 text-orange-400" />, color: "#fbbf24" },
  { id: 5, name: "Sleep 8h", icon: <Moon className="w-5 h-5 text-blue-400" />, color: "#a78bfa" },
];

const demoProgress = [
  { date: "Mon", Water: 1, Steps: 1, Veg: 1, Sugar: 1, Sleep: 0 },
  { date: "Tue", Water: 1, Steps: 1, Veg: 0, Sugar: 1, Sleep: 1 },
  { date: "Wed", Water: 1, Steps: 0, Veg: 1, Sugar: 1, Sleep: 1 },
  { date: "Thu", Water: 1, Steps: 1, Veg: 1, Sugar: 0, Sleep: 1 },
  { date: "Fri", Water: 1, Steps: 1, Veg: 1, Sugar: 1, Sleep: 1 },
  { date: "Sat", Water: 1, Steps: 1, Veg: 1, Sugar: 1, Sleep: 1 },
  { date: "Sun", Water: 0, Steps: 1, Veg: 1, Sugar: 1, Sleep: 1 },
];

const motivationalQuotes = [
  "Consistency is the key to success!",
  "Small habits make a big difference.",
  "Every day is a fresh start.",
  "You are building your best self!",
];

const calendarDemo = [
  [1, 1, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

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
    <div className="min-h-[95vh] bg-gradient-to-br from-zinc-50 via-white to-green-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-green-950 py-10 px-2 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">
            Habit Tracker
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Build healthy routines and track your daily wins.
          </p>
        </div>
        {/* Habit List */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Today's Habits
            </h2>
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition">
              <Plus className="w-4 h-4" /> Add Habit
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {habits.map((habit, i) => (
              <div
                key={habit.id}
                className="flex flex-col gap-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 shadow border border-zinc-100 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="rounded-full p-2"
                    style={{ background: habit.color + "22" }}
                  >
                    {habit.icon}
                  </span>
                  <span className="font-semibold text-lg">{habit.name}</span>
                  <button className="ml-auto text-zinc-400 hover:text-primary">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-zinc-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked[i]}
                    onChange={() =>
                      setChecked((c) => c.map((v, idx) => (idx === i ? !v : v)))
                    }
                    className="w-5 h-5 accent-primary"
                  />
                  <span className="text-sm text-zinc-500">Mark as done</span>
                </div>
                <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden mt-2">
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
        {/* Dynamic Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-xl font-bold text-primary flex items-center gap-2">
              <Award className="w-5 h-5" /> Habit Completion
            </h2>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setView("week")}
                className={`px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${
                  view === "week"
                    ? "bg-primary text-[var(--darkcard)] border-primary"
                    : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView("month")}
                className={`px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${
                  view === "month"
                    ? "bg-primary text-[var(--darkcard)] border-primary"
                    : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setView("year")}
                className={`px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${
                  view === "year"
                    ? "bg-primary text-[var(--darkcard)] border-primary"
                    : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                Year
              </button>
            </div>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={demoProgress}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Water" stackId="a" fill="#38bdf8" />
                <Bar dataKey="Steps" stackId="a" fill="#60a5fa" />
                <Bar dataKey="Veg" stackId="a" fill="#34d399" />
                <Bar dataKey="Sugar" stackId="a" fill="#fbbf24" />
                <Bar dataKey="Sleep" stackId="a" fill="#a78bfa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Streaks & Achievements */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 via-green-100 to-cyan-100 dark:from-yellow-900 dark:via-green-900 dark:to-cyan-900 rounded-full px-6 py-3 shadow text-lg font-semibold">
            <Award className="w-6 h-6 text-yellow-400" /> 7 days in a row!
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 via-green-50 to-cyan-100 dark:from-blue-900 dark:via-green-950 dark:to-cyan-950 rounded-full px-6 py-3 shadow text-lg font-semibold">
            <CheckCircle className="w-6 h-6 text-green-400" /> {streak} day
            streak!
          </div>
        </div>
        {/* Motivational Quote & Progress Streak */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12 flex flex-col items-center gap-6">
          <div className="text-lg italic text-zinc-600 dark:text-zinc-300 text-center">
            “{motivationalQuotes[quoteIdx]}”
          </div>
          <button
            onClick={() =>
              setQuoteIdx((q) => (q + 1) % motivationalQuotes.length)
            }
            className="px-4 py-1 rounded-full bg-primary text-[var(--darkcard)] text-sm font-medium shadow hover:bg-primary/90 transition"
          >
            New Quote
          </button>
        </div>
        {/* Calendar View & Notes */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Calendar View */}
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
          {/* Notes/Reflections */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col h-full">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Notes & Reflections
            </h3>
            <textarea
              className="w-full min-h-[100px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 p-3 text-base text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              placeholder="Write your thoughts, reflections, or goals..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition">
              <FileText className="w-5 h-5" /> Save Note
            </button>
          </div>
        </div>
        {/* Export Data */}
        <div className="flex justify-center mb-8">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-green-400 text-white font-bold shadow-lg hover:from-primary/90 hover:to-green-500 transition text-lg">
            <Download className="w-6 h-6" /> Export Data
          </button>
        </div>
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
