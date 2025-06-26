import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ExportButton() {
  const { t } = useTranslation("habits");
  return (
    <div className="flex justify-center mb-6 sm:mb-8">
      <button className="w-full sm:w-auto flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-primary to-green-400 text-white font-bold shadow-lg hover:from-primary/90 hover:to-green-500 transition text-base sm:text-lg">
        <Download className="w-5 h-5 sm:w-6 sm:h-6" /> {t("export_data")}
      </button>
    </div>
  );
} 