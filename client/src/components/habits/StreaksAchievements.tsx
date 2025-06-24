import { Award, CheckCircle } from "lucide-react";

export default function StreaksAchievements({ streak }: { streak: number }) {
  return (
    <div className="flex flex-wrap gap-4 mb-12 justify-center">
      <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 via-green-100 to-cyan-100 dark:from-yellow-900 dark:via-green-900 dark:to-cyan-900 rounded-full px-6 py-3 shadow text-lg font-semibold">
        <Award className="w-6 h-6 text-yellow-400" /> 7 days in a row!
      </div>
      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 via-green-50 to-cyan-100 dark:from-blue-900 dark:via-green-950 dark:to-cyan-950 rounded-full px-6 py-3 shadow text-lg font-semibold">
        <CheckCircle className="w-6 h-6 text-green-400" /> {streak} day streak!
      </div>
    </div>
  );
} 