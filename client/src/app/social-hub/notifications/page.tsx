"use client";
import { Bell, UserPlus, MessageCircle, Heart } from "lucide-react";

const notifications = [
  { id: 1, type: "like", icon: <Heart className="w-5 h-5 text-red-500" />, message: "Bob Lee liked your post.", time: "2m ago", unread: true },
  { id: 2, type: "friend", icon: <UserPlus className="w-5 h-5 text-green-500" />, message: "Alice Smith sent you a friend request.", time: "10m ago", unread: true },
  { id: 3, type: "message", icon: <MessageCircle className="w-5 h-5 text-blue-500" />, message: "New message from Sam.", time: "1h ago", unread: false },
  { id: 4, type: "general", icon: <Bell className="w-5 h-5 text-primary" />, message: "Welcome to SocialHub!", time: "1d ago", unread: false },
];

export default function SocialHubNotificationsPage() {
  return (
    <section className="flex flex-col items-center py-10 min-h-[70vh]">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-primary mb-2">Notifications</h2>
        <ul className="space-y-4">
          {notifications.map(n => (
            <li key={n.id} className={`flex items-center gap-4 p-4 rounded-xl shadow transition ${n.unread ? "bg-blue-50 dark:bg-zinc-800/40" : "bg-zinc-50 dark:bg-zinc-900/60"}`}>
              <div>{n.icon}</div>
              <div className="flex-1">
                <div className="font-semibold text-zinc-800 dark:text-zinc-100">{n.message}</div>
                <div className="text-xs text-zinc-400 mt-1">{n.time}</div>
              </div>
              {n.unread && <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block" />}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
} 