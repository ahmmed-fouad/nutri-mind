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
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full sm:w-auto">
      {bulkActions.filter(a => a.show).map(a => (
        <button key={a.label} className={a.className + ' w-full sm:w-auto text-xs sm:text-base'} onClick={a.onClick}>
          {a.icon} {a.label}
        </button>
      ))}
    </div>
  );
} 