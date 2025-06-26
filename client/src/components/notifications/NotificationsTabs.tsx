import React from "react";
import { useTranslation } from "react-i18next";

type TabOption = { key: string; label: string };

type NotificationsTabsProps = {
  tab: string;
  setTab: (tab: string) => void;
  tabOptions: TabOption[];
};

export default function NotificationsTabs({ tab, setTab, tabOptions }: NotificationsTabsProps) {
  const { t } = useTranslation("notifications");
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 w-full sm:w-auto">
      {tabOptions.map(opt => (
        <button
          key={opt.key}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold transition text-xs sm:text-base w-full sm:w-auto ${
            tab === opt.key
              ? "bg-foreground text-[var(--darkcard)]"
              : "bg-zinc-400 text-[var(--darkcard)] hover:bg-primary/10"
          }`}
          onClick={() => setTab(opt.key)}
        >
          {t(`tabs.${opt.key}`, opt.label)}
        </button>
      ))}
    </div>
  );
} 