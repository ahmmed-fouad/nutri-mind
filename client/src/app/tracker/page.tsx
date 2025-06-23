"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Camera, FileText, Download, Droplet, Footprints, Flame, Trophy, TrendingUp } from "lucide-react";

const demoStats = [
  { label: "Weight", value: 72, unit: "kg", icon: <TrendingUp className="w-6 h-6 text-primary" /> },
  { label: "BMI", value: 23.1, unit: "", icon: <Flame className="w-6 h-6 text-orange-400" /> },
  { label: "Calories", value: 1850, unit: "kcal", icon: <Flame className="w-6 h-6 text-red-400" /> },
  { label: "Steps", value: 8200, unit: "", icon: <Footprints className="w-6 h-6 text-blue-400" /> },
  { label: "Water", value: 2.3, unit: "L", icon: <Droplet className="w-6 h-6 text-cyan-400" /> },
];

const demoBadges = [
  { label: "5kg Lost", icon: <Trophy className="w-6 h-6 text-yellow-400" /> },
  { label: "30 Days Logged", icon: <Trophy className="w-6 h-6 text-green-400" /> },
  { label: "Hydration Hero", icon: <Droplet className="w-6 h-6 text-cyan-400" /> },
];

const progressData = [
  { date: "2024-06-01", weight: 75, calories: 2100, steps: 6000, water: 1.5 },
  { date: "2024-06-05", weight: 74, calories: 2000, steps: 7000, water: 1.8 },
  { date: "2024-06-10", weight: 73.5, calories: 1950, steps: 8000, water: 2.0 },
  { date: "2024-06-15", weight: 73, calories: 1900, steps: 8500, water: 2.1 },
  { date: "2024-06-20", weight: 72.5, calories: 1850, steps: 9000, water: 2.2 },
  { date: "2024-06-25", weight: 72, calories: 1850, steps: 8200, water: 2.3 },
];

const gallery = [
  "/assets/12.png", "/assets/13.png", "/assets/14.png"
];

const motivationalQuotes = [
  "Progress, not perfection!",
  "Every step counts on your journey.",
  "Small changes make a big difference.",
  "You are stronger than you think!",
];

export default function TrackerPage() {
  const [metric, setMetric] = useState("weight");
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [note, setNote] = useState("");
  const [streak, setStreak] = useState(12); // demo streak

  const metricOptions = [
    { key: "weight", label: "Weight (kg)", color: "#34d399" },
    { key: "calories", label: "Calories (kcal)", color: "#f87171" },
    { key: "steps", label: "Steps", color: "#60a5fa" },
    { key: "water", label: "Water (L)", color: "#38bdf8" },
  ];

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-950 py-10 px-2 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">
            Your Health Progress
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Track your journey, celebrate your wins, and stay motivated every
            day!
          </p>
        </div>
        {/* Stat Cards & Badges */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {demoStats.map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-5 px-2"
            >
              <div>{stat.icon}</div>
              <div className="text-2xl font-bold mt-2">
                {stat.value}
                <span className="text-base font-normal ml-1">{stat.unit}</span>
              </div>
              <div className="text-xs text-zinc-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {demoBadges.map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 via-green-100 to-cyan-100 dark:from-yellow-900 dark:via-green-900 dark:to-cyan-900 rounded-full px-4 py-2 shadow text-sm font-semibold"
            >
              {badge.icon} {badge.label}
            </div>
          ))}
        </div>
        {/* Progress Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-primary">
              Progress Over Time
            </h2>
            <div className="flex gap-2 flex-wrap">
              {metricOptions.map((opt) => (
                <button
                  key={opt.key}
                  className={`px-4 py-1 cursor-pointer rounded-full font-medium border transition shadow-sm text-sm ${
                    metric === opt.key
                      ? "bg-primary text-[var(--darkcard)] border-primary"
                      : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                  }`}
                  onClick={() => setMetric(opt.key)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={progressData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={metric}
                  stroke={metricOptions.find((m) => m.key === metric)?.color}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                  animationDuration={600}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Daily Log & Progress Bars */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-primary mb-2">
              Today's Progress
            </h3>
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Water</span>
                <span>2.3L / 3L</span>
              </div>
              <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-cyan-400" style={{ width: "77%" }} />
              </div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Steps</span>
                <span>8200 / 10000</span>
              </div>
              <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
                <div className="h-full bg-blue-400" style={{ width: "82%" }} />
              </div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Calories</span>
                <span>1850 / 2000</span>
              </div>
              <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-400" style={{ width: "92%" }} />
              </div>
            </div>
            <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition">
              <FileText className="w-5 h-5" /> Log Today
            </button>
          </div>
          {/* Motivational Quote & Streak */}
          <div className="bg-gradient-to-br from-blue-100 via-green-50 to-cyan-100 dark:from-blue-900 dark:via-green-950 dark:to-cyan-950 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center justify-center gap-6">
            <div className="text-lg italic text-zinc-600 dark:text-zinc-300 text-center">
              “{motivationalQuotes[quoteIdx]}”
            </div>
            <div className="flex items-center gap-2 text-primary font-bold text-xl">
              <Trophy className="w-6 h-6" /> {streak} day streak!
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
        </div>
        {/* Photo Gallery & Notes */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Photo Gallery */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5" /> Progress Photos
            </h3>
            <div className="flex gap-4">
              {gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="Progress"
                  className="w-24 h-24 object-cover rounded-xl border border-zinc-200 dark:border-zinc-800 shadow"
                />
              ))}
            </div>
            <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition">
              <Camera className="w-5 h-5" /> Upload Photo
            </button>
          </div>
          {/* Notes/Journal */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col h-full">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" /> Notes & Journal
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
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-400 text-white font-bold shadow-lg hover:from-primary/90 hover:to-blue-500 transition text-lg">
            <Download className="w-6 h-6" /> Export Data
          </button>
        </div>
      </div>
    </div>
  );
}
