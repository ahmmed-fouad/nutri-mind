import { Info } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type AppInfoCardProps = { legalLinks: { href: string; label: string }[] };

export default function AppInfoCard({ legalLinks }: AppInfoCardProps) {
  const { t } = useTranslation("settings");
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6 items-center justify-center">
      <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
        <Info className="w-5 h-5" /> {t("app_info")}
      </h2>
      <div className="text-zinc-500 text-sm">{t("version")}</div>
      <div className="flex gap-4 text-sm">
        {legalLinks.map((link) => (
          <a href={link.href} className="underline text-primary" key={link.label}>
            {t(`legal_links.${link.label}`)}
          </a>
        ))}
      </div>
    </div>
  );
} 