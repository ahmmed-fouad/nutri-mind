import React from 'react'
import { categories } from '@/data/forumData';
import { useTranslation } from "react-i18next";

type NewPostForumProps = {
  setShowModal: (show: boolean) => void;
};

const NewPostForum: React.FC<NewPostForumProps> = ({ setShowModal }) => {
  const { t } = useTranslation("forum");
  return (
    <div className="bg-green-200/90 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
      <button
        className="absolute top-3 right-3 text-xl"
        onClick={() => setShowModal(false)}
        aria-label={t("close")}
      >
        ×
      </button>
      <h2 className="text-xl font-bold text-primary mb-4">{t("create_post")}</h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder={t("form.title_placeholder")}
          className="input glassmorphism"
        />
        <textarea
          placeholder={t("form.content_placeholder")}
          className="input glassmorphism min-h-[80px]"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.slice(1).map((cat) => (
            <button
              key={cat.name}
              type="button"
              className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-xs font-semibold shadow"
            >
              {t(`categories.${cat.name}`, cat.name)}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary py-2 rounded-lg font-semibold shadow"
          onClick={() => setShowModal(false)}
        >
          {t("post")}
        </button>
      </form>
    </div>
  );
};

export default NewPostForum
