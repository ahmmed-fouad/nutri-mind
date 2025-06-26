import React from 'react'
import { categories } from '@/data/forumData';
import { useTranslation } from "react-i18next";

type SidebarForumProps = {
  setSelectedCat: (cat: string) => void;
  selectedCat: string;
};

const SidebarForum: React.FC<SidebarForumProps> = ({ setSelectedCat, selectedCat }) => {
  const { t } = useTranslation("forum");
  return (
    <>
      {/* Mobile: dropdown select */}
      <div className="block md:hidden w-full mb-4">
        <select
          value={selectedCat}
          onChange={e => setSelectedCat(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 bg-white text-base font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {t(`categories.${cat.name}`, cat.name)}
            </option>
          ))}
        </select>
      </div>
      {/* Desktop/Tablet: vertical sidebar */}
      <aside className="hidden md:block w-48 flex-shrink-0">
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCat(cat.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
                selectedCat === cat.name
                  ? "bg-foreground text-[var(--darkcard)]"
                  : "bg-white/70 text-foreground hover:bg-primary/10"
              }`}
            >
              <cat.icon className="w-5 h-5" /> {t(`categories.${cat.name}`, cat.name)}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SidebarForum
