"use client";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Camera, FileText, Download, Droplet, Footprints, Flame, Trophy, TrendingUp } from "lucide-react";
import { demoStats, demoBadges, progressData, gallery, motivationalQuotes, metricOptions } from "../../data/trackerData";
import StatCards from "../../components/tracker/StatCards";
import Badges from "../../components/tracker/Badges";
import ProgressChart from "../../components/tracker/ProgressChart";
import DailyProgress from "../../components/tracker/DailyProgress";
import MotivationalQuote from "../../components/tracker/MotivationalQuote";
import PhotoGallery from "../../components/tracker/PhotoGallery";
import NotesJournal from "../../components/tracker/NotesJournal";
import { useTranslation } from "react-i18next";

export default function TrackerPage() {
  const { t } = useTranslation("tracker");
  const [metric, setMetric] = useState("weight");
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [note, setNote] = useState("");
  const [streak, setStreak] = useState(12); // demo streak

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-950 py-10 px-2 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">
            {t("title")}
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
        {/* Stat Cards & Badges */}
        <div >
          <StatCards demoStats={demoStats} />
        </div>
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <Badges demoBadges={demoBadges} />
        </div>
        {/* Progress Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-primary">
              {t("progress_over_time")}
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
                  {t(opt.label)}
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
          <DailyProgress />
          {/* Motivational Quote & Streak */}
          <div className="bg-gradient-to-br from-blue-100 via-green-50 to-cyan-100 dark:from-blue-900 dark:via-green-950 dark:to-cyan-950 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center justify-center gap-6">
            <MotivationalQuote motivationalQuotes={motivationalQuotes} quoteIdx={quoteIdx} setQuoteIdx={setQuoteIdx} streak={streak} />
          </div>
        </div>
        {/* Photo Gallery & Notes */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Photo Gallery */}
          <PhotoGallery gallery={gallery} />
          {/* Notes/Journal */}
          <NotesJournal note={note} setNote={setNote} />
        </div>
        {/* Export Data */}
        <div className="flex justify-center mb-8">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-400 text-white font-bold shadow-lg hover:from-primary/90 hover:to-blue-500 transition text-lg">
            <Download className="w-6 h-6" /> {t("export_data")}
          </button>
        </div>
      </div>
    </div>
  );
}
