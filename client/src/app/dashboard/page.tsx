"use client";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Droplet, Footprints, Plus, } from "lucide-react";
import {
  progressRings,
  recommendations,
  activityFeed,
  goalsDash,
  chartDataDash,
  counters,
  quote,
  user,
  accent,
} from "@/data/dashBoardData";

function ProgressRing({ value, goal, color }: { value: number; goal: number; color: string }) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const radius = isMobile ? 24 : 36;
  const stroke = isMobile ? 6 : 8;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;
  const size = isMobile ? 54 : 80;
  const fontSize = isMobile ? 14 : 20;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
      <circle cx={size/2} cy={size/2} r={radius} stroke={color} strokeWidth={stroke} fill="none" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.7s" }} />
      <text x={size/2} y={size/2+4} textAnchor="middle" fontSize={fontSize} fontWeight={700} fill={color}>{pct}%</text>
    </svg>
  );
}

export default function DashboardPage() {
  const [counterAnim, setCounterAnim] = useState([0, 0, 0, 0]);
  useState(() => {
    const interval = setInterval(() => {
      setCounterAnim(prev => prev.map((v, i) => v < counters[i].value ? v + Math.ceil(counters[i].value / 40) : counters[i].value));
    }, 40);
    return () => clearInterval(interval);
  });

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/60 py-6 sm:py-10 px-1 sm:px-2">
      <div className="max-w-7xl w-full glassmorphism p-3 sm:p-8 rounded-3xl shadow-2xl mb-6 sm:mb-8 animate-fade-in">
        {/* Greeting */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary shadow"
            />
            <div>
              <div className="text-xl sm:text-2xl font-bold text-foreground">
                Welcome, {user.name}!
              </div>
              <div className="text-zinc-500 text-xs sm:text-sm mt-1">{quote}</div>
            </div>
          </div>
          {/* Responsive counters row */}
          <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-6 w-full max-w-xs sm:max-w-none mx-auto">
            {counters.map((c, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-xl sm:text-3xl font-bold text-foreground animate-counter">
                  {counterAnim[i]}
                </span>
                <span className="text-zinc-500 text-xs sm:text-sm font-semibold flex items-center gap-1">
                  {c.icon} {c.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Progress Rings & Chart */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
          <div className="glassmorphism p-3 sm:p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3 sm:gap-4">
            <div className="text-base sm:text-lg font-bold text-zinc-700 mb-1 sm:mb-2">
              Daily Progress
            </div>
            <div className="flex gap-3 sm:gap-6">
              {progressRings.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  <ProgressRing value={p.value} goal={p.goal} color={p.color} />
                  <span className="text-xs sm:text-sm text-zinc-500 mt-1 sm:mt-2">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glassmorphism p-3 sm:p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3 sm:gap-4 col-span-1 md:col-span-2">
            <div className="text-base sm:text-lg font-bold text-zinc-700 mb-1 sm:mb-2">
              Weekly Progress
            </div>
            <ResponsiveContainer width="100%" height={120} className="sm:!h-[180px]">
              <AreaChart data={chartDataDash} margin={{ left: -20, right: 10 }}>
                <XAxis dataKey="day" />
                <YAxis hide />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="weight"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.15}
                  name="Weight (kg)"
                />
                <Area
                  type="monotone"
                  dataKey="calories"
                  stroke="#fbbf24"
                  fill="#fbbf24"
                  fillOpacity={0.15}
                  name="Calories"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Goals & Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
          <div className="glassmorphism p-3 sm:p-6 rounded-2xl shadow-xl flex flex-col gap-3 sm:gap-4">
            <div className="text-base sm:text-lg font-bold text-zinc-700 mb-1 sm:mb-2">
              Your Goals
            </div>
            {goalsDash.map((g, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                {g.icon}
                <span className="font-semibold text-zinc-700 text-xs sm:text-base">{g.label}:</span>
                <span className="text-zinc-700 font-bold text-xs sm:text-base">{g.value}</span>
                <span className="ml-auto text-[10px] sm:text-xs text-zinc-400">
                  {g.progress}/{g.target}
                </span>
              </div>
            ))}
          </div>
          <div className="glassmorphism p-3 sm:p-6 rounded-2xl shadow-xl flex flex-col gap-3 sm:gap-4 items-center">
            <div className="text-base sm:text-lg font-bold text-zinc-700 mb-1 sm:mb-2">
              Quick Actions
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-4">
              <button className="btn btn-primary flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold shadow w-full sm:w-auto text-xs sm:text-base">
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" /> Log Meal
              </button>
              <button className="btn btn-accent flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold shadow w-full sm:w-auto text-xs sm:text-base">
                <Droplet className="w-4 h-4 sm:w-5 sm:h-5" /> Add Water
              </button>
              <button className="btn btn-secondary flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-semibold shadow w-full sm:w-auto text-xs sm:text-base">
                <Footprints className="w-4 h-4 sm:w-5 sm:h-5" /> Add Steps
              </button>
            </div>
          </div>
          <div className="glassmorphism p-3 sm:p-6 rounded-2xl shadow-xl flex flex-col gap-3 sm:gap-4">
            <div className="text-base sm:text-lg font-bold text-zinc-700 mb-1 sm:mb-2">
              Recent Activity
            </div>
            <ul className="flex flex-col gap-1 sm:gap-2">
              {activityFeed.map((a, i) => (
                <li key={i} className="flex items-center gap-2 text-zinc-700 text-xs sm:text-base">
                  <span className="text-primary">•</span> {a.desc} {" "}
                  <span className="ml-auto text-[10px] sm:text-xs text-zinc-400">
                    {a.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Recommendations & Insights */}
        <div className="glassmorphism p-3 sm:p-6 rounded-2xl shadow-xl flex flex-col gap-3 sm:gap-4 items-center">
          <div className="text-base sm:text-lg font-bold text-zinc-700 mb-1 sm:mb-2">
            Recommendations & Insights
          </div>
          <ul className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {recommendations.map((r, i) => (
              <li
                key={i}
                className="px-3 sm:px-4 py-1 sm:py-2 rounded-full text-zinc-700 bg-gradient-to-r from-green-100 via-blue-100 to-yellow-100 text-xs sm:text-sm font-semibold shadow"
              >
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .glassmorphism {
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.12);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .btn-primary {
          background: #34d399;
          color: white;
        }
        .btn-primary:hover {
          background: #059669;
        }
        .btn-accent {
          background: #60a5fa;
          color: white;
        }
        .btn-accent:hover {
          background: #2563eb;
        }
        .btn-secondary {
          background: #fbbf24;
          color: #1e293b;
        }
        .btn-secondary:hover {
          background: #f59e42;
        }
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
