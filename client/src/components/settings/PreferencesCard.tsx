import { Sun, Globe, Bell, Shield } from "lucide-react";
import React from "react";

type Notifications = { email: boolean; push: boolean; inApp: boolean };
type PreferencesCardProps = {
  theme: string;
  setTheme: (v: string) => void;
  language: string;
  setLanguage: (v: string) => void;
  notifications: Notifications;
  setNotifications: React.Dispatch<React.SetStateAction<Notifications>>;
  preferenceOptions: { icon: string; label: string; valueKey: string; options: { value: string; label: string }[] }[];
  notificationTypes: { key: keyof Notifications; label: string }[];
};

export default function PreferencesCard({
  theme,
  setTheme,
  language,
  setLanguage,
  notifications,
  setNotifications,
  preferenceOptions,
  notificationTypes,
}: PreferencesCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 flex flex-col gap-6">
      <h2 className="text-lg sm:text-xl font-bold text-primary mb-2 flex items-center gap-2">
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.94-2.34a1 1 0 0 0 .26-1.09l-1.07-3.11a1 1 0 0 1 .21-1.09l2.42-2.36a1 1 0 0 0-.13-1.5l-2.88-2.09a1 1 0 0 0-1.18-.06l-2.9 1.68a1 1 0 0 1-1.13 0l-2.9-1.68a1 1 0 0 0-1.18.06l-2.88 2.09a1 1 0 0 0-.13 1.5l2.42 2.36a1 1 0 0 1 .21 1.09l-1.07 3.11a1 1 0 0 0 .26 1.09l2.53 1.84a1 1 0 0 1 .36 1.09l-.48 3.18a1 1 0 0 0 1.45 1.05l2.7-1.44a1 1 0 0 1 1.02 0l2.7 1.44a1 1 0 0 0 1.45-1.05l-.48-3.18a1 1 0 0 1 .36-1.09l2.53-1.84z" /></svg> Preferences
      </h2>
      {preferenceOptions.map((opt) => (
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-2 w-full" key={opt.label}>
          {opt.icon === "sun" && <Sun className="w-5 h-5 text-yellow-400" />}
          {opt.icon === "globe" && <Globe className="w-5 h-5 text-blue-400" />}
          <span className="text-xs sm:text-sm w-full sm:w-auto">{opt.label}</span>
          <select
            value={opt.valueKey === "theme" ? theme : language}
            onChange={(e) => (opt.valueKey === "theme" ? setTheme(e.target.value) : setLanguage(e.target.value))}
            className="rounded-lg px-2 py-1 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 w-full sm:w-auto"
          >
            {opt.options.map((o) => (
              <option value={o.value} key={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      ))}
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-2 w-full">
        <Bell className="w-5 h-5 text-primary" />
        <span className="text-xs sm:text-sm w-full sm:w-auto">Notifications:</span>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          {notificationTypes.map((nt) => (
            <label className="flex items-center gap-1 text-xs w-full sm:w-auto" key={nt.key as React.Key}>
              <input
                type="checkbox"
                checked={notifications[nt.key]}
                onChange={(e) => setNotifications((n) => ({ ...n, [nt.key]: e.target.checked }))}
                className="w-4 h-4"
              /> {nt.label}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-2 w-full">
        <Shield className="w-5 h-5 text-green-400" />
        <span className="text-xs sm:text-sm w-full sm:w-auto">Privacy:</span>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs w-full sm:w-auto">
            Export Data
          </button>
          <button className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs w-full sm:w-auto">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
} 