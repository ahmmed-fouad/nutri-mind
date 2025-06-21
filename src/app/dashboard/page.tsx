"use client";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Flame, Droplet, Footprints, CheckCircle, Plus, User } from "lucide-react";

const accent = "#34d399";
const user = {
  name: "Jane Doe",
  avatar: "/assets/12.png",
};
const quote = "Small steps every day lead to big results.";
const counters = [
  { label: "Calories", value: 1680, icon: <Flame className="w-6 h-6 text-orange-400" /> },
  { label: "Steps", value: 8200, icon: <Footprints className="w-6 h-6 text-blue-400" /> },
  { label: "Water (L)", value: 2.1, icon: <Droplet className="w-6 h-6 text-cyan-400" /> },
  { label: "Streak", value: 9, icon: <CheckCircle className="w-6 h-6 text-green-400" /> },
];
const progressRings = [
  { label: "Calories", value: 1680, goal: 2000, color: "#fbbf24" },
  { label: "Protein", value: 90, goal: 120, color: "#60a5fa" },
  { label: "Water", value: 2.1, goal: 2.5, color: "#34d399" },
];
const chartData = [
  { day: "Mon", weight: 72, calories: 1800 },
  { day: "Tue", weight: 71.8, calories: 1750 },
  { day: "Wed", weight: 71.5, calories: 1700 },
  { day: "Thu", weight: 71.3, calories: 1680 },
  { day: "Fri", weight: 71.1, calories: 1650 },
  { day: "Sat", weight: 71, calories: 1700 },
  { day: "Sun", weight: 70.8, calories: 1680 },
];
const goals = [
  { label: "Weight Goal", value: "68kg", progress: 70.8, target: 68, icon: <User className="w-5 h-5 text-primary" /> },
  { label: "Habit Streak", value: "9 days", progress: 9, target: 21, icon: <CheckCircle className="w-5 h-5 text-green-400" /> },
];
const activityFeed = [
  { type: "meal", desc: "Logged Breakfast: Oats & Berries", time: "8:10 AM" },
  { type: "water", desc: "Added 250ml water", time: "9:00 AM" },
  { type: "workout", desc: "Completed 30min Yoga", time: "7:00 AM" },
  { type: "meal", desc: "Logged Lunch: Grilled Chicken Salad", time: "12:30 PM" },
];
const recommendations = [
  "Try a new high-protein recipe today!",
  "You're close to your water goal. Drink another glass!",
  "Keep your streak going—log your dinner tonight.",
];

function ProgressRing({ value, goal, color }: { value: number; goal: number; color: string }) {
  const pct = Math.min(100, Math.round((value / goal) * 100));
  const radius = 36;
  const stroke = 8;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={80} height={80}>
      <circle cx={40} cy={40} r={radius} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
      <circle cx={40} cy={40} r={radius} stroke={color} strokeWidth={stroke} fill="none" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.7s" }} />
      <text x={40} y={44} textAnchor="middle" fontSize={20} fontWeight={700} fill={color}>{pct}%</text>
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
    <section className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-white via-green-50 to-blue-50 py-10 px-2">
      <div className="max-w-7xl w-full glassmorphism p-8 rounded-3xl shadow-2xl mb-8 animate-fade-in">
        {/* Greeting */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow" />
            <div>
              <div className="text-2xl font-bold text-primary">Welcome, {user.name}!</div>
              <div className="text-zinc-500 text-sm mt-1">{quote}</div>
            </div>
          </div>
          <div className="flex gap-6">
            {counters.map((c, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary animate-counter">{counterAnim[i]}</span>
                <span className="text-zinc-500 text-sm font-semibold flex items-center gap-1">{c.icon} {c.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Progress Rings & Chart */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4">
            <div className="text-lg font-bold text-primary mb-2">Daily Progress</div>
            <div className="flex gap-6">
              {progressRings.map((p, i) => (
                <div key={i} className="flex flex-col items-center">
                  <ProgressRing value={p.value} goal={p.goal} color={p.color} />
                  <span className="text-sm text-zinc-500 mt-2">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col items-center gap-4 col-span-2">
            <div className="text-lg font-bold text-primary mb-2">Weekly Progress</div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={chartData} margin={{ left: -20, right: 10 }}>
                <XAxis dataKey="day" />
                <YAxis hide />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="weight" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} name="Weight (kg)" />
                <Area type="monotone" dataKey="calories" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.15} name="Calories" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Goals & Quick Actions */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-4">
            <div className="text-lg font-bold text-primary mb-2">Your Goals</div>
            {goals.map((g, i) => (
              <div key={i} className="flex items-center gap-3 mb-2">
                {g.icon}
                <span className="font-semibold text-zinc-700">{g.label}:</span>
                <span className="text-primary font-bold">{g.value}</span>
                <span className="ml-auto text-xs text-zinc-400">{g.progress}/{g.target}</span>
              </div>
            ))}
          </div>
          <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-4 items-center">
            <div className="text-lg font-bold text-primary mb-2">Quick Actions</div>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow"><Plus className="w-5 h-5" /> Log Meal</button>
              <button className="btn btn-accent flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow"><Droplet className="w-5 h-5" /> Add Water</button>
              <button className="btn btn-secondary flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow"><Footprints className="w-5 h-5" /> Add Steps</button>
            </div>
          </div>
          <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-4">
            <div className="text-lg font-bold text-primary mb-2">Recent Activity</div>
            <ul className="flex flex-col gap-2">
              {activityFeed.map((a, i) => (
                <li key={i} className="flex items-center gap-2 text-zinc-700">
                  <span className="text-primary">•</span> {a.desc} <span className="ml-auto text-xs text-zinc-400">{a.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Recommendations & Insights */}
        <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-4 items-center">
          <div className="text-lg font-bold text-primary mb-2">Recommendations & Insights</div>
          <ul className="flex flex-wrap gap-4 justify-center">
            {recommendations.map((r, i) => (
              <li key={i} className="px-4 py-2 rounded-full bg-gradient-to-r from-green-100 via-blue-100 to-yellow-100 text-sm font-semibold shadow">{r}</li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .glassmorphism {
          background: rgba(255,255,255,0.7);
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.12);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255,255,255,0.18);
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
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
