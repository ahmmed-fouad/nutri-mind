import React from "react";
import NotificationItem from "./NotificationItem";

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
  if (notifications.length === 0) {
    return <li className="text-center text-zinc-400 py-12">No notifications found.</li>;
  }
  return (
    <ul className="flex flex-col gap-4">
      {notifications.map((n) => (
        <NotificationItem
          key={n.id}
          notification={n}
          selected={selected.includes(n.id)}
          onSelect={onSelect}
          renderNotifAction={renderNotifAction}
          getTypeIcon={getTypeIcon}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
} 