import React from "react";

type BulkAction = {
  show: boolean;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  className: string;
};

type NotificationsBulkActionsProps = {
  bulkActions: BulkAction[];
};

export default function NotificationsBulkActions({ bulkActions }: NotificationsBulkActionsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {bulkActions.filter(a => a.show).map(a => (
        <button key={a.label} className={a.className} onClick={a.onClick}>
          {a.icon} {a.label}
        </button>
      ))}
    </div>
  );
} 