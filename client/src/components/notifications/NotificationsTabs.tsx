import React from "react";

type TabOption = { key: string; label: string };

type NotificationsTabsProps = {
  tab: string;
  setTab: (tab: string) => void;
  tabOptions: TabOption[];
};

export default function NotificationsTabs({ tab, setTab, tabOptions }: NotificationsTabsProps) {
  return (
    <div className="flex gap-2">
      {tabOptions.map(opt => (
        <button
          key={opt.key}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            tab === opt.key
              ? "bg-foreground text-[var(--darkcard)]"
              : "bg-zinc-400 text-[var(--darkcard)] hover:bg-primary/10"
          }`}
          onClick={() => setTab(opt.key)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
} 