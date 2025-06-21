import { useState, useRef, useEffect } from "react";
import { Bell, Flame, Droplet, MessageCircle, Star, CheckCircle } from "lucide-react";
import Link from "next/link";

const notifications = [
  { id: 1, type: "achievement", icon: <CheckCircle className="w-5 h-5 text-green-500" />, title: "Goal Reached!", message: "You hit your water goal today.", time: "2m ago", unread: true },
  { id: 2, type: "community", icon: <MessageCircle className="w-5 h-5 text-blue-500" />, title: "Forum Reply", message: "Alice replied to your post.", time: "10m ago", unread: true },
  { id: 3, type: "feature", icon: <Flame className="w-5 h-5 text-orange-400" />, title: "New Feature", message: "Food Scanner is now live!", time: "1h ago", unread: false },
  { id: 4, type: "achievement", icon: <Star className="w-5 h-5 text-yellow-400" />, title: "Streak!", message: "7 days logged in a row.", time: "3h ago", unread: false },
  { id: 5, type: "reminder", icon: <Droplet className="w-5 h-5 text-cyan-400" />, title: "Hydration Reminder", message: "Time to drink water.", time: "5h ago", unread: false },
];

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative p-2 rounded-full hover:bg-accent transition-colors focus:outline-none"
        aria-label="Notifications"
        onClick={() => setOpen(o => !o)}
      >
        <Bell className="w-6 h-6 text-primary" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 font-bold shadow">{unreadCount}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white/80 dark:bg-zinc-900/90 glassmorphism rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-50 animate-fade-in">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 font-bold text-primary text-lg flex items-center gap-2">
            <Bell className="w-5 h-5" /> Notifications
          </div>
          <ul className="max-h-80 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
            {notifications.slice(0, 5).map(n => (
              <li key={n.id} className={`flex items-start gap-3 p-4 hover:bg-accent/30 transition-colors ${n.unread ? "bg-blue-50 dark:bg-zinc-800/40" : ""}`}>
                <div>{n.icon}</div>
                <div className="flex-1">
                  <div className="font-semibold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
                    {n.title}
                    {n.unread && <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block" />}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">{n.message}</div>
                  <div className="text-xs text-zinc-400 mt-1">{n.time}</div>
                </div>
              </li>
            ))}
          </ul>
          <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <Link href="/notifications" className="text-primary font-semibold hover:underline">See more →</Link>
          </div>
        </div>
      )}
      <style jsx>{`
        .glassmorphism {
          backdrop-filter: blur(8px);
          background: rgba(255,255,255,0.7);
        }
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 