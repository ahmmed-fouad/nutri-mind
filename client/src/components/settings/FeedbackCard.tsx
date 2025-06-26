import { MessageCircle } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type FeedbackCardProps = {
  feedback: string;
  setFeedback: React.Dispatch<React.SetStateAction<string>>;
};

export default function FeedbackCard({ feedback, setFeedback }: FeedbackCardProps) {
  const { t } = useTranslation("settings");
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6">
      <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
        <MessageCircle className="w-5 h-5" /> {t("feedback")}
      </h2>
      <textarea
        className="w-full min-h-[80px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 p-3 text-base text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder={t("feedback_placeholder")}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button className="w-full py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition mt-2">
        {t("send_feedback")}
      </button>
    </div>
  );
} 