import React from 'react'
import { categories } from '@/data/forumData';

type SidebarForumProps = {
  setSelectedCat: (cat: string) => void;
  selectedCat: string;
};

const SidebarForum: React.FC<SidebarForumProps> = ({ setSelectedCat, selectedCat }) => {
  return (
    <aside className="w-48 flex-shrink-0">
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
            <cat.icon className="w-5 h-5" /> {cat.name}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default SidebarForum
