import { useTranslation } from "react-i18next";

export default function HabitsHeader() {
  const { t } = useTranslation("habits");
  return (
    <div className="mb-10 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">
        {t("page_title")}
      </h1>
      <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
        {t("page_subtitle")}
      </p>
    </div>
  );
} 