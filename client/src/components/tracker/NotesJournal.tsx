import { FileText } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type NotesJournalProps = {
  note: string;
  setNote: (v: string) => void;
};

export default function NotesJournal({ note, setNote }: NotesJournalProps) {
  const { t } = useTranslation("tracker");
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col h-full">
      <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" /> {t("notes_journal")}
      </h3>
      <textarea
        className="w-full min-h-[100px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 p-3 text-base text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
        placeholder={t("notes_placeholder")}
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition">
        <FileText className="w-5 h-5" /> {t("save_note")}
      </button>
    </div>
  );
} 