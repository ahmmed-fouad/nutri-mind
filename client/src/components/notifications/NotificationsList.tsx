import React from "react";
import NotificationItem from "./NotificationItem";
import { useTranslation } from "react-i18next";
import { notificationTypes } from "@/data/notificationsData";

type Notification = {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
};

type NotificationsListProps = {
  notifications: Notification[];
  selected: number[];
  onSelect: (id: number) => void;
  renderNotifAction: (n: Notification) => React.ReactNode;
  getTypeIcon: (type: string) => React.ReactNode;
  onDelete: (id: number) => void;
};

export default function NotificationsList({ notifications, selected, onSelect, renderNotifAction, getTypeIcon, onDelete }: NotificationsListProps) {
  const { t } = useTranslation("notifications");
  if (notifications.length === 0) {
    return <li className="text-center text-zinc-400 py-12">No notifications found.</li>;
  }
  return (
    <div className="flex flex-col gap-4">
      {notifications.map((n) => {
        const typeObj = notificationTypes.find(tObj => tObj.type === n.type);
        const typeLabel = typeObj ? typeObj.label : n.type;
        return (
          <div key={n.id} className={`flex items-center gap-4 p-4 rounded-xl shadow bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 ${n.unread ? "ring-2 ring-primary/40" : ""}`}>
            <input
              type="checkbox"
              checked={selected.includes(n.id)}
              onChange={() => onSelect(n.id)}
              className="accent-primary w-5 h-5"
            />
            {getTypeIcon(n.type)}
            <div className="flex-1">
              <div className="font-bold text-primary text-sm mb-1">{t(`types.${typeLabel}`, typeLabel)}</div>
              <div className="font-semibold text-zinc-900 dark:text-zinc-100">{t(`sample.${n.title}`, n.title)}</div>
              <div className="text-zinc-500 text-xs">{t(`sample.${n.message}`, n.message)}</div>
              <div className="text-zinc-400 text-xs mt-1">{n.time}</div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              {renderNotifAction(n)}
              <button
                className="text-red-500 text-xs hover:underline"
                onClick={() => onDelete(n.id)}
              >
                ×
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
} 