import { Share2 } from "lucide-react";

export default function ShareExportSection() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6">
      <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
        <Share2 className="w-5 h-5" /> Share / Export
      </h3>
      <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-green-400 text-[var(--darkcard)] font-bold shadow-lg hover:from-primary/90 hover:to-green-500 transition text-lg">
        <Share2 className="w-6 h-6" /> Export List
      </button>
    </div>
  );
} 