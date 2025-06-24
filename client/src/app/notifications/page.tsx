"use client";
import { useState } from "react";
import NotificationsHeader from "@/components/notifications/NotificationsHeader";
import NotificationsTabs from "@/components/notifications/NotificationsTabs";
import NotificationsBulkActions from "@/components/notifications/NotificationsBulkActions";
import NotificationsList from "@/components/notifications/NotificationsList";
import { typeColors, notificationTypes, sampleNotifications } from "@/data/notificationsData";
import { Bell, Flame, Droplet, MessageCircle, Star, CheckCircle, Trash2, Check } from "lucide-react";

const iconMap = {
  CheckCircle: <CheckCircle className="w-5 h-5 text-green-500" />,
  MessageCircle: <MessageCircle className="w-5 h-5 text-blue-500" />,
  Flame: <Flame className="w-5 h-5 text-orange-400" />,
  Droplet: <Droplet className="w-5 h-5 text-cyan-400" />,
  Star: <Star className="w-5 h-5 text-yellow-400" />,
};

function getTypeIcon(type: string) {
  const found = notificationTypes.find(t => t.type === type);
  if (found && found.icon && iconMap[found.icon as keyof typeof iconMap]) {
    return iconMap[found.icon as keyof typeof iconMap];
  }
  return <Bell className="w-5 h-5 text-primary" />;
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

  const tabOptions = [
    { key: "all", label: "All" },
    { key: "current", label: "Current" },
    { key: "old", label: "Old" },
  ];

  const bulkActions = [
    {
      show: true,
      label: "Mark All Read",
      icon: <Check className="w-4 h-4" />,
      onClick: markAllRead,
      className: "bg-green-400 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-500 transition",
    },
    {
      show: true,
      label: "Delete All",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: deleteAll,
      className: "bg-blue-400 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-500 transition",
    },
    {
      show: selected.length > 0,
      label: "Mark Selected Read",
      icon: <Check className="w-4 h-4" />,
      onClick: markSelectedRead,
      className: "bg-green-400 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-500 transition",
    },
    {
      show: selected.length > 0,
      label: "Delete Selected",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: deleteSelected,
      className: "bg-blue-400 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow hover:bg-blue-500 transition",
    },
  ];

  function renderNotifAction(n: typeof sampleNotifications[0]) {
    if (n.unread) {
      return (
        <button
          className="bg-green-400 text-white flex items-center gap-2 px-4 py-2 rounded-lg font-semibold shadow hover:bg-green-500 transition"
          onClick={() =>
            setNotifs((ns) =>
              ns.map((x) => (x.id === n.id ? { ...x, unread: false } : x))
            )
          }
        >
          Mark Read
        </button>
      );
    } else {
      return (
        <button
          className="bg-yellow-400 text-slate-800 px-2 py-1 rounded-lg font-semibold shadow text-xs hover:bg-yellow-300 transition"
          onClick={() =>
            setNotifs((ns) =>
              ns.map((x) => (x.id === n.id ? { ...x, unread: true } : x))
            )
          }
        >
          Mark Unread
        </button>
      );
    }
  }

  function handleDeleteNotif(id: number) {
    setNotifs(ns => ns.filter(n => n.id !== id));
  }

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-300/60 py-6 sm:py-10 px-1 sm:px-2">
      <div className="max-w-5xl w-full bg-white/70 backdrop-blur-lg border border-white/20 p-3 sm:p-8 rounded-3xl shadow-2xl mb-6 sm:mb-8 animate-fade-in">
        <NotificationsHeader chartData={chartData} typeColors={typeColors} />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
          <NotificationsTabs tab={tab} setTab={setTab} tabOptions={tabOptions} />
          <NotificationsBulkActions bulkActions={bulkActions} />
        </div>
        <NotificationsList
          notifications={filtered}
          selected={selected}
          onSelect={toggleSelect}
          renderNotifAction={(n) => (
            <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4">
              {renderNotifAction(n)}
            </div>
          )}
          getTypeIcon={getTypeIcon}
          onDelete={handleDeleteNotif}
        />
      </div>
    </section>
  );
} 