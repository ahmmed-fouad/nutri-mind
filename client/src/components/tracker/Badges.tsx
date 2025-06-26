import { Trophy, Droplet } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type Badge = {
  label: string;
  icon: string;
};

type BadgesProps = {
  demoBadges: Badge[];
};

function renderBadgeIcon(icon: string) {
  switch (icon) {
    case "trophy-yellow":
      return <Trophy className="w-6 h-6 text-yellow-400" />;
    case "trophy-green":
      return <Trophy className="w-6 h-6 text-green-400" />;
    case "droplet":
      return <Droplet className="w-6 h-6 text-cyan-400" />;
    default:
      return null;
  }
}

export default function Badges({ demoBadges }: BadgesProps) {
  const { t } = useTranslation("tracker");
  return (
    <div className="flex flex-wrap gap-3 mb-10 justify-center">
      {demoBadges.map((badge, i) => (
        <div
          key={i}
          className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 via-green-100 to-cyan-100 dark:from-yellow-900 dark:via-green-900 dark:to-cyan-900 rounded-full px-4 py-2 shadow text-sm font-semibold"
        >
          {renderBadgeIcon(badge.icon)} {t(badge.label)}
        </div>
      ))}
    </div>
  );
} 