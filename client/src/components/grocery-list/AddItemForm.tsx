import { Plus, BookOpen } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type AddItemFormProps = {
  input: { name: string; qty: string; category: string };
  setInput: React.Dispatch<
    React.SetStateAction<{ name: string; qty: string; category: string }>
  >;
  handleAdd: () => void;
  templateIdx: number;
  setTemplateIdx: React.Dispatch<React.SetStateAction<number>>;
  demoTemplates: { name: string; items: string[] }[];
  categories: { name: string; color: string }[];
};

export default function AddItemForm({
  input,
  setInput,
  handleAdd,
  templateIdx,
  setTemplateIdx,
  demoTemplates,
  categories,
}: AddItemFormProps) {
  const { t } = useTranslation("grocery-list");
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div className="flex gap-2 flex-1">
        <input
          value={input.name}
          onChange={(e) => setInput((i) => ({ ...i, name: e.target.value }))}
          placeholder={t("add_item.name_placeholder", "Item name")}
          className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base w-32"
        />
        <input
          value={input.qty}
          onChange={(e) => setInput((i) => ({ ...i, qty: e.target.value }))}
          placeholder={t("add_item.qty_placeholder", "Qty")}
          className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base w-20"
        />
        <select
          value={input.category}
          onChange={(e) =>
            setInput((i) => ({ ...i, category: e.target.value }))
          }
          className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
        >
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {t(`categories.${cat.name}`, cat.name)}
            </option>
          ))}
        </select>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition"
        >
          <Plus className="w-4 h-4" /> {t("add_item.add_button", "Add")}
        </button>
      </div>
      <div className="flex gap-2 items-center">
        <BookOpen className="w-5 h-5 text-primary" />
        <span className="text-sm">{t("add_item.templates_label", "Templates:")}</span>
        <select
          value={templateIdx}
          onChange={(e) => setTemplateIdx(Number(e.target.value))}
          className="rounded-lg px-2 py-1 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800"
        >
          {demoTemplates.map((tpl, i) => (
            <option key={tpl.name} value={i}>
              {t(`templates.${tpl.name}`, tpl.name)}
            </option>
          ))}
        </select>
        <button className="ml-2 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs">
          {t("add_item.load_button", "Load")}
        </button>
      </div>
    </div>
  );
}
