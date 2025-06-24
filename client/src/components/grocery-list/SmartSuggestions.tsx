import { Sparkles } from "lucide-react";

export default function SmartSuggestions({ smartSuggestions }: { smartSuggestions: string[] }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
      <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5" /> Smart Suggestions
      </h2>
      <div className="flex flex-wrap gap-3">
        {smartSuggestions.map((s, i) => (
          <span
            key={i}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-green-100 via-blue-100 to-yellow-100 dark:from-green-900 dark:via-blue-900 dark:to-yellow-900 text-sm font-semibold shadow"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
} 