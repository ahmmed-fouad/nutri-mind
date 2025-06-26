import { FileText } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type NotesSectionProps = {
  note: string;
  setNote: React.Dispatch<React.SetStateAction<string>>;
};

export default function NotesSection({ note, setNote }: NotesSectionProps) {
  const { t } = useTranslation("habits");
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-2 sm:p-6 flex flex-col h-full">
      <h3 className="text-base sm:text-xl font-bold text-primary mb-2 sm:mb-4 flex items-center gap-2">
        <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> {t("notes_reflections")}
      </h3>
      <textarea
        className="w-full min-h-[80px] sm:min-h-[100px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 p-2 sm:p-3 text-sm sm:text-lg text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary mb-2 sm:mb-4"
        placeholder={t("notes_placeholder")}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button className="w-full sm:w-auto flex items-center justify-center gap-2 py-1 sm:py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition text-xs sm:text-base">
        <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> {t("save_note")}
      </button>
    </div>
  );
} 