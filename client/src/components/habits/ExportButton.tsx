import { Download } from "lucide-react";

export default function ExportButton() {
  return (
    <div className="flex justify-center mb-8">
      <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-green-400 text-white font-bold shadow-lg hover:from-primary/90 hover:to-green-500 transition text-lg">
        <Download className="w-6 h-6" /> Export Data
      </button>
    </div>
  );
} 