import React from "react";
import { X } from "lucide-react";

type Notification = {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
};

type NotificationItemProps = {
  notification: Notification;
  selected: boolean;
  onSelect: (id: number) => void;
  renderNotifAction: (n: Notification) => React.ReactNode;
  getTypeIcon: (type: string) => React.ReactNode;
  onDelete: (id: number) => void;
};

export default function NotificationItem({ notification: n, selected, onSelect, renderNotifAction, getTypeIcon, onDelete }: NotificationItemProps) {
  return (
    <li
      className={`bg-white/70 backdrop-blur-lg border border-white/20 p-5 rounded-2xl shadow-xl flex items-center gap-4 animate-fade-in-up ${
        n.unread ? "border-l-4 border-primary" : ""
      }`}
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onSelect(n.id)}
        className="accent-primary w-5 h-5"
      />
      <div>{getTypeIcon(n.type)}</div>
      <div className="flex-1">
        <div className="font-semibold text-zinc-800 dark:text-zinc-100 flex items-center gap-2">
          {n.title}
          {n.unread && (
            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block" />
          )}
        </div>
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          {n.message}
        </div>
        <div className="text-xs text-zinc-400 mt-1">{n.time}</div>
      </div>
      {renderNotifAction(n)}
      <button
        className="bg-blue-400 text-white px-2 py-1 rounded-lg font-semibold shadow text-xs hover:bg-blue-500 transition"
        onClick={() => onDelete(n.id)}
      >
        <X className="w-4 h-4" />
      </button>
    </li>
  );
} 