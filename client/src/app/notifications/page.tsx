"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Bell, Flame, Droplet, MessageCircle, Star, CheckCircle, Trash2, Check, X } from "lucide-react";

const typeColors = ["#34d399", "#60a5fa", "#fbbf24", "#a78bfa", "#f87171"];
const notificationTypes = [
  { type: "achievement", label: "Achievements", color: typeColors[0], icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
  { type: "community", label: "Community", color: typeColors[1], icon: <MessageCircle className="w-5 h-5 text-blue-500" /> },
  { type: "feature", label: "Features", color: typeColors[2], icon: <Flame className="w-5 h-5 text-orange-400" /> },
  { type: "reminder", label: "Reminders", color: typeColors[3], icon: <Droplet className="w-5 h-5 text-cyan-400" /> },
  { type: "streak", label: "Streaks", color: typeColors[4], icon: <Star className="w-5 h-5 text-yellow-400" /> },
];
const sampleNotifications = [
  { id: 1, type: "achievement", title: "Goal Reached!", message: "You hit your water goal today.", time: "2m ago", unread: true },
  { id: 2, type: "community", title: "Forum Reply", message: "Alice replied to your post.", time: "10m ago", unread: true },
  { id: 3, type: "feature", title: "New Feature", message: "Food Scanner is now live!", time: "1h ago", unread: false },
  { id: 4, type: "streak", title: "Streak!", message: "7 days logged in a row.", time: "3h ago", unread: false },
  { id: 5, type: "reminder", title: "Hydration Reminder", message: "Time to drink water.", time: "5h ago", unread: false },
  { id: 6, type: "community", title: "Mention", message: "Bob mentioned you in a comment.", time: "1d ago", unread: false },
  { id: 7, type: "achievement", title: "Protein Goal!", message: "You reached your protein target.", time: "2d ago", unread: false },
];

function getTypeIcon(type) {
  return notificationTypes.find(t => t.type === type)?.icon || <Bell className="w-5 h-5 text-primary" />;
}

export default function NotificationsPage() {
  const [tab, setTab] = useState("all");
  const [notifs, setNotifs] = useState(sampleNotifications);
  const [selected, setSelected] = useState<number[]>([]);

  // Chart data
  const chartData = notificationTypes.map(t => ({
    name: t.label,
    value: notifs.filter(n => n.type === t.type).length,
  })).filter(d => d.value > 0);

  // Tabs
  const filtered = tab === "all"
    ? notifs
    : tab === "current"
      ? notifs.filter(n => n.unread)
      : notifs.filter(n => !n.unread);

  // Bulk actions
  const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, unread: false })));
  const deleteAll = () => setNotifs([]);
  const toggleSelect = (id: number) => setSelected(sel => sel.includes(id) ? sel.filter(i => i !== id) : [...sel, id]);
  const markSelectedRead = () => setNotifs(ns => ns.map(n => selected.includes(n.id) ? { ...n, unread: false } : n));
  const deleteSelected = () => setNotifs(ns => ns.filter(n => !selected.includes(n.id)));

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-blue-50 py-10 px-2">
      <div className="max-w-5xl w-full glassmorphism p-8 rounded-3xl shadow-2xl mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary flex items-center gap-3"><Bell className="w-8 h-8" /> Notifications</h1>
          <div className="w-72">
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label>
                  {chartData.map((entry, i) => <Cell key={i} fill={typeColors[i % typeColors.length]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Tabs and Bulk Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-2">
            <button className={`px-4 py-2 rounded-lg font-semibold transition ${tab === "all" ? "bg-primary text-white" : "bg-white/70 text-primary hover:bg-primary/10"}`} onClick={() => setTab("all")}>All</button>
            <button className={`px-4 py-2 rounded-lg font-semibold transition ${tab === "current" ? "bg-primary text-white" : "bg-white/70 text-primary hover:bg-primary/10"}`} onClick={() => setTab("current")}>Current</button>
            <button className={`px-4 py-2 rounded-lg font-semibold transition ${tab === "old" ? "bg-primary text-white" : "bg-white/70 text-primary hover:bg-primary/10"}`} onClick={() => setTab("old")}>Old</button>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button className="btn btn-primary flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow" onClick={markAllRead}><Check className="w-4 h-4" /> Mark All Read</button>
            <button className="btn btn-accent flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow" onClick={deleteAll}><Trash2 className="w-4 h-4" /> Delete All</button>
            {selected.length > 0 && <>
              <button className="btn btn-primary flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow" onClick={markSelectedRead}><Check className="w-4 h-4" /> Mark Selected Read</button>
              <button className="btn btn-accent flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow" onClick={deleteSelected}><Trash2 className="w-4 h-4" /> Delete Selected</button>
            </>}
          </div>
        </div>
        {/* Notification List */}
        <ul className="flex flex-col gap-4">
          {filtered.length === 0 && <li className="text-center text-zinc-400 py-12">No notifications found.</li>}
          {filtered.map(n => (
            <li key={n.id} className={`glassmorphism p-5 rounded-2xl shadow-xl flex items-center gap-4 animate-fade-in-up ${n.unread ? "border-l-4 border-primary" : ""}`}>
              <input type="checkbox" checked={selected.includes(n.id)} onChange={() => toggleSelect(n.id)} className="accent-primary w-5 h-5" />
              <div>{getTypeIcon(n.type)}</div>
              <div className="flex-1">
                <div className="font-semibold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                  {n.title}
                  {n.unread && <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block" />}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{n.message}</div>
                <div className="text-xs text-zinc-400 mt-1">{n.time}</div>
              </div>
              {n.unread ? (
                <button className="btn btn-primary px-2 py-1 rounded-lg font-semibold shadow text-xs" onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, unread: false } : x))}>Mark Read</button>
              ) : (
                <button className="btn btn-secondary px-2 py-1 rounded-lg font-semibold shadow text-xs" onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? { ...x, unread: true } : x))}>Mark Unread</button>
              )}
              <button className="btn btn-accent px-2 py-1 rounded-lg font-semibold shadow text-xs" onClick={() => setNotifs(ns => ns.filter(x => x.id !== n.id))}><X className="w-4 h-4" /></button>
            </li>
          ))}
        </ul>
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