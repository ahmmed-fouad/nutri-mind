import { Shield, LogIn, Key } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type SecurityPrivacyCardProps = {
  recentLogins: { device: string; time: string }[];
  twoFA: boolean;
  setTwoFA: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SecurityPrivacyCard({ recentLogins, twoFA, setTwoFA }: SecurityPrivacyCardProps) {
  const { t } = useTranslation("settings");
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
        <Shield className="w-5 h-5" /> {t("security_privacy")}
      </h2>
      <div>
        <div className="font-semibold mb-1">{t("recent_logins")}</div>
        <ul className="text-xs text-zinc-500">
          {recentLogins.map((login, i) => (
            <li key={i} className="mb-1 flex items-center gap-2">
              <LogIn className="w-4 h-4" /> {login.device}
              <span className="ml-2 text-zinc-400">{login.time}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Key className="w-5 h-5 text-primary" />
        <span className="text-sm">{t("two_factor_auth")}</span>
        <button
          onClick={() => setTwoFA((f) => !f)}
          className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold shadow ${
            twoFA
              ? "bg-green-400 text-white"
              : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
          }`}
        >
          {twoFA ? t("enabled") : t("disabled")}
        </button>
      </div>
    </div>
  );
} 