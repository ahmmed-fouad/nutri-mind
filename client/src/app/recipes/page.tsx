"use client";
import { useState } from "react";
import { useGetRecipesQuery } from "@/features/meal-planner";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171"];

function getNutritionData(recipe: any) {
  // Dummy nutrition data for demo
  return [
    { name: "Protein", value: Math.floor(Math.random() * 20) + 10 },
    { name: "Carbs", value: Math.floor(Math.random() * 40) + 30 },
    { name: "Fat", value: Math.floor(Math.random() * 15) + 5 },
    { name: "Fiber", value: Math.floor(Math.random() * 10) + 2 },
  ];
}

export default function RecipesPage() {
  const { data, isLoading, error } = useGetRecipesQuery();
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="min-h-[90vh] bg-zinc-50 dark:bg-zinc-900/60 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          Healthy Recipes
        </h1>
        <p className="text-center text-zinc-500 mb-12 max-w-2xl mx-auto text-lg">
          Discover delicious, healthy recipes with nutrition breakdowns. Click
          any recipe for details and a nutrition chart!
        </p>
        {isLoading && (
          <div className="text-center text-lg">Loading recipes...</div>
        )}
        {error && (
          <div className="text-center text-red-500">
            Failed to load recipes.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.meals?.map((recipe: any) => (
            <div
              key={recipe.idMeal}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer group"
              onClick={() => setSelected(recipe)}
            >
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="w-40 h-40 object-cover rounded-xl mb-4 group-hover:shadow-xl"
              />
              <h2 className="text-xl font-semibold mb-2 text-center text-primary group-hover:underline">
                {recipe.strMeal}
              </h2>
              <div className="text-zinc-500 text-sm mb-2 text-center line-clamp-2">
                {recipe.strCategory} | {recipe.strArea}
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
                Calories: {Math.floor(Math.random() * 200) + 200} kcal
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal for recipe details */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-4 max-w-3xl w-full relative animate-in fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 cursor-pointer text-zinc-400 hover:text-red-500 text-xl font-bold"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div className="flex gap-8">
              <div className="flex flex-col">
                <img
                  src={selected.strMealThumb}
                  alt={selected.strMeal}
                  className="w-40 h-40 object-cover rounded-xl shadow"
                />
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getNutritionData(selected)}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={55}
                      fill="#8884d8"
                      label
                    >
                      {getNutritionData(selected).map((entry, index) => (
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

              <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-primary mb-2 text-center">
                  {selected.strMeal}
                </h2>
                <div className="flex gap-3">
                  <div>
                    <div className="text-zinc-500 text-sm mb-2">
                      {selected.strCategory} | {selected.strArea}
                    </div>
                    {/* ingr */}
                    <div className="mb-2">
                      <span className="font-semibold">Ingredients:</span>
                      <ul className="list-disc ml-6 text-zinc-700 dark:text-zinc-200">
                        {Array.from({ length: 20 }).map((_, i) => {
                          const ingredient = selected[`strIngredient${i + 1}`];
                          const measure = selected[`strMeasure${i + 1}`];
                          return ingredient && ingredient.trim() ? (
                            <li key={i}>
                              {ingredient}{" "}
                              {measure && (
                                <span className="text-zinc-400">({measure})</span>
                              )}
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 w-[22rem]">
                      <span className="font-semibold">Instructions:</span>
                      <p className="text-zinc-600 dark:text-zinc-300 whitespace-pre-line mt-1">
                        {selected.strInstructions.split(0,1)}
                      </p>
                    </div>
                    <div className="mb-2">
                      <span className="font-semibold">Nutrition:</span>
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
