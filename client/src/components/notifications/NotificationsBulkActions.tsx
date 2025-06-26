import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("notifications");
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full sm:w-auto">
      {bulkActions.filter(a => a.show).map((action, i) => (
        <button
          key={i}
          className={action.className + ' w-full sm:w-auto text-xs sm:text-base'}
          onClick={action.onClick}
        >
          {action.icon} {t(`bulk_actions.${action.label.replace(/\s+/g, '_').toLowerCase()}`, action.label)}
        </button>
      ))}
    </div>
  );
} 