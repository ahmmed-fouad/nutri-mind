"use client";
import { useState } from "react";
import { useGetRecipesQuery } from "@/services/recipesApi";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTranslation } from "react-i18next";

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171"];

function getNutritionData(recipe: any, t: any) {
  // Dummy nutrition data for demo
  return [
    { name: t("protein"), value: Math.floor(Math.random() * 20) + 10 },
    { name: t("carbs"), value: Math.floor(Math.random() * 40) + 30 },
    { name: t("fat"), value: Math.floor(Math.random() * 15) + 5 },
    { name: t("fiber"), value: Math.floor(Math.random() * 10) + 2 },
  ];
}

export default function RecipesPage() {
  const { t } = useTranslation("recipes");
  const { data, isLoading, error } = useGetRecipesQuery();
  const [selected, setSelected] = useState<any>(null);
console.log(data)
  return (
    <div className="min-h-[90vh] bg-zinc-50 dark:bg-zinc-900/60 py-6 px-2 sm:px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-primary">
          {t("page_title")}
        </h1>
        <p className="text-center text-zinc-500 mb-12 max-w-2xl mx-auto text-base sm:text-lg">
          {t("page_subtitle")}
        </p>
        {isLoading && (
          <div className="text-center text-lg">{t("loading")}</div>
        )}
        {error && (
          <div className="text-center text-red-500">
            {t("error")}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {data?.meals?.map((recipe: any) => (
            <div
              key={recipe.idMeal}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer group"
              onClick={() => setSelected(recipe)}
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-full max-w-[10rem] h-40 object-cover rounded-xl mb-4 group-hover:shadow-xl"
              />
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center text-primary group-hover:underline">
                {recipe.strMeal}
              </h2>
              <div className="text-zinc-500 text-xs sm:text-sm mb-2 text-center line-clamp-2">
                {t(`categories.${recipe.strCategory}`, { defaultValue: recipe.strCategory })} | {t(`areas.${recipe.strArea}`, { defaultValue: recipe.strArea })}
              </div>
              <div className="flex gap-2 flex-wrap justify-center mb-2">
                {recipe.strTags
                  ?.split(",")
                  ?.slice(0, 3)
                  .map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <div className="text-zinc-400 text-xs">
                {t("calories", { count: Math.floor(Math.random() * 200) + 200 })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for recipe details */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-2 sm:px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-2 sm:p-4 max-h-[90vh] w-full max-w-2xl md:max-w-4xl relative animate-in fade-in overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 cursor-pointer text-zinc-400 hover:text-red-500 text-xl font-bold"
              onClick={() => setSelected(null)}
              aria-label={t("close")}
            >
              ×
            </button>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="flex flex-col gap-5 items-center md:items-start w-full md:w-auto">
                <img
                  src={selected.strMealThumb}
                  alt={selected.strMeal}
                  className="w-full max-w-[12rem] h-48 sm:h-[12rem] object-cover rounded-xl shadow mb-0"
                />
                <div className="w-full max-w-[12rem] h-48 sm:h-[12rem]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getNutritionData(selected, t)}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={55}
                        fill="#8884d8"
                        label
                      >
                        {getNutritionData(selected, t).map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2 text-center md:text-left">
                  {selected.strMeal}
                </h2>
                <div className="flex flex-col md:flex-row gap-3">
                  <div>
                    <div className="text-zinc-500 text-xs sm:text-sm mb-2">
                      {t(`categories.${selected.strCategory}`, { defaultValue: selected.strCategory })} | {t(`areas.${selected.strArea}`, { defaultValue: selected.strArea })}
                    </div>
                    {/* ingr */}
                    <div className="mb-5 mx-2 w-full md:w-[13rem] max-h-40 sm:max-h-[20rem] overflow-y-auto">
                      <span className="font-semibold">{t("ingredients")}</span>
                      <ul className="list-disc ml-6 text-zinc-700 dark:text-zinc-200">
                        {Array.from({ length: 20 }).map((_, i) => {
                          const ingredient = selected[`strIngredient${i + 1}`];
                          const measure = selected[`strMeasure${i + 1}`];
                          return ingredient && ingredient.trim() ? (
                            <li key={i}>
                              {ingredient} {measure && (
                                <span className="text-zinc-400">({measure})</span>
                              )}
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="w-full md:w-[22rem]">
                    <div className="mb-2">
                      <span className="font-bold">{t("instructions")}</span>
                      <p className="text-zinc-600 max-h-32 sm:max-h-60 overflow-y-auto dark:text-zinc-300 whitespace-pre-line mt-1 text-xs sm:text-base">
                        {selected.strInstructions}
                      </p>
                    </div>
                    <div className="mb-2">
                      <span className="font-bold">{t("nutrition")}</span>
                      <p className="text-zinc-600 dark:text-zinc-300 whitespace-pre-line mt-1 text-xs sm:text-base">
                        {selected.strTags}
                      </p>
                      <div className="w-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
