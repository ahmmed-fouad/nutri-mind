import { Award, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function StreaksAchievements({ streak }: { streak: number }) {
  const { t } = useTranslation("habits");
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-12 justify-center items-center">
      <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-yellow-100 via-green-100 to-cyan-100 dark:from-yellow-900 dark:via-green-900 dark:to-cyan-900 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow text-sm sm:text-lg font-semibold">
        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" /> {t("streak_7_days")}
      </div>
      <div className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-blue-100 via-green-50 to-cyan-100 dark:from-blue-900 dark:via-green-950 dark:to-cyan-950 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow text-sm sm:text-lg font-semibold">
        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" /> {t("streak_days", { count: streak })}
      </div>
    </div>
  );
} 