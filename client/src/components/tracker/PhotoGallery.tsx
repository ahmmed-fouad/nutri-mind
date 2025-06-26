import { Camera } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type PhotoGalleryProps = {
  gallery: string[];
};

export default function PhotoGallery({ gallery }: PhotoGalleryProps) {
  const { t } = useTranslation("tracker");
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6">
      <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
        <Camera className="w-5 h-5" /> {t("progress_photos")}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
        {gallery.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Progress"
            className="w-full aspect-square object-cover rounded-xl border border-zinc-200 dark:border-zinc-800 shadow"
          />
        ))}
      </div>
      <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition">
        <Camera className="w-5 h-5" /> {t("upload_photo")}
      </button>
    </div>
  );
} 