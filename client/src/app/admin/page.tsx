"use client";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Users, UserPlus, TrendingUp, BookOpen, FileText, LifeBuoy, ArrowUpRight, ArrowDownRight, CheckCircle, Ban, Edit, Trash2, Download, NotebookPen, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const statCards = [
  { label: "Total Users", value: 1240, icon: <Users className="w-6 h-6 text-primary" />, trend: 5, up: true },
  { label: "Active Today", value: 312, icon: <TrendingUp className="w-6 h-6 text-green-500" />, trend: 2, up: true },
  { label: "New Signups", value: 28, icon: <UserPlus className="w-6 h-6 text-blue-500" />, trend: 1, up: false },
  { label: "Recipes", value: 210, icon: <BookOpen className="w-6 h-6 text-yellow-500" />, trend: 3, up: true },
  { label: "Blog Posts", value: 54, icon: <FileText className="w-6 h-6 text-purple-500" />, trend: 0, up: false },
  { label: "Support Tickets", value: 7, icon: <LifeBuoy className="w-6 h-6 text-red-500" />, trend: 1, up: false },
];

const analyticsData = [
  { date: "Mon", users: 1000, recipes: 180, blog: 50, support: 5 },
  { date: "Tue", users: 1050, recipes: 185, blog: 51, support: 6 },
  { date: "Wed", users: 1100, recipes: 190, blog: 52, support: 7 },
  { date: "Thu", users: 1150, recipes: 200, blog: 53, support: 8 },
  { date: "Fri", users: 1200, recipes: 205, blog: 54, support: 7 },
  { date: "Sat", users: 1220, recipes: 208, blog: 54, support: 6 },
  { date: "Sun", users: 1240, recipes: 210, blog: 54, support: 7 },
];

const recentActivity = [
  { type: "signup", user: "Alice Smith", time: "2m ago" },
  { type: "recipe", user: "Bob Lee", time: "10m ago" },
  { type: "blog", user: "Jane Doe", time: "30m ago" },
  { type: "support", user: "Sam Patel", time: "1h ago" },
];

const demoUsers = [
  { name: "Alice Smith", email: "alice@email.com", date: "2024-06-20", status: "active" },
  { name: "Bob Lee", email: "bob@email.com", date: "2024-06-18", status: "banned" },
  { name: "Jane Doe", email: "jane@email.com", date: "2024-06-15", status: "active" },
  { name: "Sam Patel", email: "sam@email.com", date: "2024-06-10", status: "active" },
];

const contentCards = [
  { label: "Recipes", count: 210, icon: <BookOpen className="w-6 h-6 text-yellow-500" /> },
  { label: "Blog Posts", count: 54, icon: <FileText className="w-6 h-6 text-purple-500" /> },
  { label: "FAQ / Support", count: 18, icon: <LifeBuoy className="w-6 h-6 text-red-500" /> },
];

const supportTickets = [
  { id: 101, subject: "Can't reset password", status: "open", user: "Alice Smith" },
  { id: 102, subject: "Recipe not saving", status: "pending", user: "Bob Lee" },
  { id: 103, subject: "App feedback", status: "closed", user: "Jane Doe" },
];

export default function AdminDashboard() {
  const { t } = useTranslation("admin");
  const [metric, setMetric] = useState("users");
  const [notes, setNotes] = useState("");

  const metricOptions = [
    { key: "users", label: t("users"), color: "#34d399" },
    { key: "recipes", label: t("recipes"), color: "#fbbf24" },
    { key: "blog", label: t("blog"), color: "#a78bfa" },
    { key: "support", label: t("support"), color: "#f87171" },
  ];

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-950 py-10 px-2 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">
            {t("page_title")}
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            {t("page_subtitle")}
          </p>
        </div>
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {statCards.map((card, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-5 px-2"
            >
              <div>{card.icon}</div>
              <div className="text-2xl font-bold mt-2">{card.value}</div>
              <div className="text-xs text-zinc-400 mt-1">{t(`statCards.${card.label}`)}</div>
              <div
                className={`flex items-center gap-1 text-xs mt-1 ${
                  card.up ? "text-green-500" : "text-red-500"
                }`}
              >
                {card.up ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )} {card.trend}%
              </div>
            </div>
          ))}
        </div>
        {/* Analytics Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-primary">
              {t("platform_analytics")}
            </h2>
            <div className="flex gap-2 flex-wrap">
              {metricOptions.map((opt) => (
                <button
                  key={opt.key}
                  className={`px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${
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
              <AreaChart
                data={analyticsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey={metric}
                  stroke={metricOptions.find((m) => m.key === metric)?.color}
                  fill={metricOptions.find((m) => m.key === metric)?.color + "33"}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                  animationDuration={600}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Recent Activity Feed */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" /> {t("recent_activity")}
          </h2>
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {recentActivity.map((a, i) => (
              <li key={i} className="flex items-center gap-3 py-3">
                {a.type === "signup" && <UserPlus className="w-5 h-5 text-blue-500" />}
                {a.type === "recipe" && <BookOpen className="w-5 h-5 text-yellow-500" />}
                {a.type === "blog" && <FileText className="w-5 h-5 text-purple-500" />}
                {a.type === "support" && <LifeBuoy className="w-5 h-5 text-red-500" />}
                <span className="font-medium">{a.user}</span>
                <span className="text-xs text-zinc-400 ml-auto">{a.time}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* User Management & Content Management */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* User Management */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> {t("user_management")}
            </h3>
            {/* Table for md+, cards for mobile */}
            <div className="hidden md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-zinc-400">
                    <th className="text-left py-2">{t("name")}</th>
                    <th className="text-left py-2">{t("email")}</th>
                    <th className="text-left py-2">{t("signup_date")}</th>
                    <th className="text-left py-2">{t("status")}</th>
                    <th className="text-left py-2">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {demoUsers.map((u, i) => (
                    <tr
                      key={i}
                      className="border-t border-zinc-100 dark:border-zinc-800"
                    >
                      <td className="py-2 font-medium">{u.name}</td>
                      <td className="py-2">{u.email}</td>
                      <td className="py-2">{u.date}</td>
                      <td className="py-2">
                        {u.status === "active" ? (
                          <span className="text-green-500 font-semibold">
                            {t("active")}
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            {t("banned")}
                          </span>
                        )}
                      </td>
                      <td className="py-2 flex gap-2">
                        <button className="p-1 rounded hover:bg-accent">
                          <Edit className="w-4 h-4" />
                        </button>
                        {u.status === "active" ? (
                          <button className="p-1 rounded hover:bg-accent">
                            <Ban className="w-4 h-4 text-red-500" />
                          </button>
                        ) : (
                          <button className="p-1 rounded hover:bg-accent">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </button>
                        )}
                        <button className="p-1 rounded hover:bg-accent">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:hidden flex flex-col gap-3">
              {demoUsers.map((u, i) => (
                <div key={i} className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 p-3 flex flex-col gap-2 shadow">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-base">{u.name}</span>
                    <span className={`text-xs font-semibold ${u.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{u.status === 'active' ? t('active') : t('banned')}</span>
                  </div>
                  <div className="text-xs text-zinc-500 break-all">{u.email}</div>
                  <div className="text-xs text-zinc-400">{t("signed_up")} {u.date}</div>
                  <div className="flex gap-2 mt-2">
                    <button className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-accent flex-1 flex items-center justify-center">
                      <Edit className="w-4 h-4" />
                    </button>
                    {u.status === "active" ? (
                      <button className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-accent flex-1 flex items-center justify-center">
                        <Ban className="w-4 h-4 text-red-500" />
                      </button>
                    ) : (
                      <button className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-accent flex-1 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </button>
                    )}
                    <button className="p-2 rounded-lg bg-zinc-200 dark:bg-zinc-700 hover:bg-accent flex-1 flex items-center justify-center">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Content Management */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mt-6">
            {contentCards.map((c, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
              >
                <div className="mb-2 sm:mb-0">{c.icon}</div>
                <div className="flex-1 text-center sm:text-left">
                  <div className="text-base sm:text-lg font-bold text-primary">{t(`statCards.${c.label}`)}</div>
                  <div className="text-xl sm:text-2xl font-bold mt-1">{c.count}</div>
                </div>
                <button className="w-full sm:w-auto mt-2 sm:mt-0 px-3 sm:px-4 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition text-sm sm:text-base">
                  {t("manage")}
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Support Overview, Export, Notes */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Support Overview */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <LifeBuoy className="w-5 h-5" /> {t("support_overview")}
            </h3>
            <div className="mb-4">
              <div className="flex gap-4 text-sm">
                <span className="text-green-500 font-semibold">
                  {t("open")}: {supportTickets.filter((tkt) => tkt.status === "open").length}
                </span>
                <span className="text-yellow-500 font-semibold">
                  {t("pending")}: {supportTickets.filter((tkt) => tkt.status === "pending").length}
                </span>
                <span className="text-zinc-400 font-semibold">
                  {t("closed")}: {supportTickets.filter((tkt) => tkt.status === "closed").length}
                </span>
              </div>
            </div>
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {supportTickets.map((tkt, i) => (
                <li key={i} className="py-2 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">{tkt.subject}</span>
                  <span className="text-xs text-zinc-400 ml-auto">
                    {tkt.user}
                  </span>
                  <span
                    className={`text-xs font-semibold ml-2 ${
                      tkt.status === "open"
                        ? "text-green-500"
                        : tkt.status === "pending"
                        ? "text-yellow-500"
                        : "text-zinc-400"
                    }`}
                  >
                    {t(tkt.status)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* Export Data */}
          <div className="flex flex-col items-center justify-center gap-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <Download className="w-5 h-5" /> {t("export_data")}
            </h3>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-400 text-[var(--darkcard)] font-bold shadow-lg hover:from-primary/90 hover:to-blue-500 transition text-lg">
              <Download className="w-6 h-6" /> {t("export_analytics")}
            </button>
          </div>
          {/* Admin Notes */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col h-full">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <NotebookPen className="w-5 h-5" /> {t("admin_notes")}
            </h3>
            <textarea
              className="w-full min-h-[100px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 p-3 text-base text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              placeholder={t("notes_placeholder")}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition">
              <NotebookPen className="w-5 h-5" /> {t("save_note")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
