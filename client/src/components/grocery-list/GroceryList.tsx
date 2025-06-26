import { Edit, Trash2 } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

type GroceryListProps = {
  items: {
    id: number;
    name: string;
    qty: string;
    category: string;
    bought: boolean;
  }[];
  categories: { name: string; color: string }[];
  handleCheck: (id: number) => void;
  handleDelete: (id: number) => void;
};

export default function GroceryList({
  items,
  categories,
  handleCheck,
  handleDelete,
}: GroceryListProps) {
  const { t } = useTranslation("grocery-list");
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
      {categories.map((cat) => (
        <div key={cat.name} className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: cat.color }}
            />
            <span className="font-semibold text-lg text-primary">
              {t(`categories.${cat.name}`, cat.name)}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {items.filter((item) => item.category === cat.name).length ===
              0 && <div className="text-xs text-zinc-400">{t("no_items", "No items")}</div>}
            {items
              .filter((item) => item.category === cat.name)
              .map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border ${
                    item.bought
                      ? "bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800"
                      : "bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-800"
                  } shadow-sm`}
                >
                  <input
                    type="checkbox"
                    checked={item.bought}
                    onChange={() => handleCheck(item.id)}
                    className="w-5 h-5 accent-primary"
                  />
                  <span
                    className={`font-medium ${
                      item.bought ? "line-through text-zinc-400" : ""
                    }`}
                  >
                    {t(`template_items.${item.name}`, item.name)}
                  </span>
                  <span className="text-xs text-zinc-500">{item.qty}</span>
                  <button className="ml-auto text-zinc-400 hover:text-primary">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-zinc-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
