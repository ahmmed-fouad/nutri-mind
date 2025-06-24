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
      className={`bg-white/70 backdrop-blur-lg border border-white/20 p-3 sm:p-5 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 animate-fade-in-up ${
        n.unread ? "border-l-4 border-primary" : ""
      }`}
    >
      <div className="flex items-center gap-2 mb-2 sm:mb-0">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(n.id)}
          className="accent-primary w-4 h-4 sm:w-5 sm:h-5"
        />
        <div>{getTypeIcon(n.type)}</div>
      </div>
      <div className="flex-1 w-full">
        <div className="font-semibold text-zinc-800 dark:text-zinc-100 flex items-center gap-2 text-sm sm:text-base">
          {n.title}
          {n.unread && (
            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block" />
          )}
        </div>
        <div className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          {n.message}
        </div>
        <div className="text-[10px] sm:text-xs text-zinc-400 mt-1">{n.time}</div>
      </div>
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full sm:w-auto mt-2 sm:mt-0">
        {renderNotifAction(n)}
        <button
          className="bg-blue-400 text-white px-2 py-1 rounded-lg font-semibold shadow text-xs hover:bg-blue-500 transition w-full sm:w-auto"
          onClick={() => onDelete(n.id)}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
} 