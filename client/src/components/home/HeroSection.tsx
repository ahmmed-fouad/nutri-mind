"use client";
import Link from "next/link";
import { Bot, Flame, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
  const { t, i18n } = useTranslation("page");
  const isRTL = i18n.language === "ar";
  const textAlignClass = isRTL ? "md:text-right" : "md:text-left";
  const [chatInput, setChatInput] = useState("");
  const handleGoToChatbot = () => {
    if (chatInput.trim()) {
      localStorage.setItem("chatbot_prefill", chatInput);
    } else {
      localStorage.removeItem("chatbot_prefill");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
      <div className={`flex-1 text-center ${textAlignClass}`}>
        <h1 className="text-5xl font-bold mb-4 text-primary">
          {t("hero.title")}
        </h1>
        <p className="text-lg text-zinc-500 mb-6 max-w-xl">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6">
          <Link
            href="/chatbot"
            className="px-6 py-3 rounded-xl bg-primary text-[var(--darkcard)] font-bold shadow-lg hover:bg-primary/90 transition text-lg flex items-center gap-2"
          >
            <Bot className="w-6 h-6" /> {t("hero.start_chatting")}
          </Link>
          <Link
            href="/form"
            className="px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-primary font-bold shadow hover:bg-primary/10 transition text-lg flex items-center gap-2"
          >
            <Flame className="w-6 h-6" /> {t("hero.plan_meals")}
          </Link>
        </div>
      </div>
      {/* Animated Chatbot UI */}
      <div className="flex-1 flex flex-col items-center" id="chatbot">
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">{t("hero.chatbot_name")}</span>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 text-left text-zinc-700 dark:text-zinc-200 min-h-[80px] animate-pulse">
            {t("hero.chatbot_greeting")}
          </div>
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800"
              placeholder={t("hero.ask_placeholder")}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <Link
              href="/chatbot"
              className="px-4 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition"
              onClick={handleGoToChatbot}
            >
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 