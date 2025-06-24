"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { sampleFood } from "@/data/foodScannerData";

const macroColors = ["#34d399", "#60a5fa", "#fbbf24"];
const microColors = ["#fbbf24", "#60a5fa", "#34d399", "#f87171"];

export default function FoodScannerPage() {
  const [food, setFood] = useState<any>(sampleFood);
  const [image, setImage] = useState<string | null>(null);
  const [barcode, setBarcode] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFood(sampleFood); // Placeholder: always returns sampleFood
      setShowResults(true);
    }
  };
  const handleBarcode = (e: any) => {
    setBarcode(e.target.value);
  };
  const handleBarcodeSubmit = (e: any) => {
    e.preventDefault();
    setFood(sampleFood); // Placeholder: always returns sampleFood
    setShowResults(true);
  };

  const macroData = [
    { name: "Protein", value: food.macros.protein },
    { name: "Carbs", value: food.macros.carbs },
    { name: "Fat", value: food.macros.fat },
  ];

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-white via-green-50 to-yellow-50 py-6 px-2 sm:px-4 md:px-8">
      <div className="w-full max-w-2xl bg-white/70 shadow-2xl backdrop-blur-md rounded-3xl border border-white/30 p-4 sm:p-6 md:p-8 mb-8 animate-fade-in">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
          Food Scanner
        </h1>
        <p className="text-center text-zinc-500 mb-6">
          Scan your food or barcode to instantly get nutrition facts and
          ingredient details.
        </p>
        <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-center justify-center">
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <label className="font-semibold text-gray-800">
              Upload Food Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="px-4 py-3 rounded-xl border border-zinc-200 bg-white/50 text-gray-800 text-base outline-none focus:border-emerald-400 transition"
            />
            {image && (
              <img
                src={image}
                alt="Food preview"
                className="rounded-xl w-full h-32 object-cover mt-2 shadow"
              />
            )}
          </div>
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <label className="font-semibold text-gray-800">
              Or Enter Barcode
            </label>
            <form onSubmit={handleBarcodeSubmit} className="flex flex-col md:flex-row gap-2 w-full">
              <input
                type="text"
                value={barcode}
                onChange={handleBarcode}
                className="px-4 py-3 rounded-xl border border-zinc-200 bg-white/50 flex-1 text-gray-800 text-base outline-none focus:border-emerald-400 transition"
                placeholder="e.g. 1234567890123"
              />
              <button
                type="submit"
                className="bg-emerald-400 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold shadow transition w-full md:w-auto mt-2 md:mt-0"
              >
                Scan
              </button>
            </form>
          </div>
        </div>
      </div>
      {showResults && food && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-fade-in-up">
          <div className="bg-white/70 shadow-xl backdrop-blur-md rounded-2xl border border-white/30 p-4 sm:p-6 flex flex-col gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
              {food.name}
            </h2>
            <div className="text-base sm:text-lg text-zinc-600 mb-2">
              Serving: {food.serving}
            </div>
            <div className="flex flex-col gap-1 text-base sm:text-lg">
              <span>
                <b>Calories:</b> {food.calories} kcal
              </span>
              <span>
                <b>Protein:</b> {food.macros.protein} g
              </span>
              <span>
                <b>Carbs:</b> {food.macros.carbs} g
              </span>
              <span>
                <b>Fat:</b> {food.macros.fat} g
              </span>
            </div>
            <button className="bg-blue-400 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow transition mt-2">Add to Diary</button>
            {food.allergens.length > 0 && (
              <div className="mt-3 p-3 rounded-lg bg-red-100 text-red-700 font-semibold flex flex-wrap gap-2 items-center">
                <span>⚠️ Allergen Warning:</span>
                <span>{food.allergens.join(", ")}</span>
              </div>
            )}
          </div>
          <div className="bg-white/70 shadow-xl backdrop-blur-md rounded-2xl border border-white/30 p-4 sm:p-6 flex flex-col gap-6">
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">
              Macronutrient Breakdown
            </h2>
            <div className="w-full h-48 sm:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  >
                    {macroData.map((entry, i) => (
                      <Cell key={i} fill={macroColors[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">
              Micronutrients
            </h2>
            <div className="w-full h-32 sm:h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={food.micros}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill={microColors[0]}
                    radius={[10, 10, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">Ingredients</h2>
            <ul className="flex flex-wrap gap-2">
              {food.ingredients.map((ing: string, i: number) => (
                <li
                  key={i}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-green-100 via-blue-100 to-yellow-100 text-xs sm:text-sm font-semibold shadow"
                >
                  {ing}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
