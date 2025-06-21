"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const macroColors = ["#34d399", "#60a5fa", "#fbbf24"];
const microColors = ["#fbbf24", "#60a5fa", "#34d399", "#f87171"];

const sampleFood = {
  name: "Greek Yogurt Bowl",
  serving: "1 bowl (200g)",
  calories: 180,
  macros: { protein: 15, carbs: 22, fat: 4 },
  micros: [
    { name: "Calcium", value: 180 },
    { name: "Potassium", value: 240 },
    { name: "Vitamin B12", value: 1.2 },
    { name: "Iron", value: 0.3 },
  ],
  ingredients: ["Greek Yogurt", "Blueberries", "Honey", "Almonds"],
  allergens: ["Almonds", "Dairy"],
};

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
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-white via-green-50 to-yellow-50 py-10 px-2">
      <div className="max-w-2xl w-full glassmorphism p-8 rounded-3xl shadow-2xl mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-primary">Food Scanner</h1>
        <p className="text-center text-zinc-500 mb-6">Scan your food or barcode to instantly get nutrition facts and ingredient details.</p>
        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <label className="font-semibold">Upload Food Image</label>
            <input type="file" accept="image/*" onChange={handleImage} className="input glassmorphism" />
            {image && <img src={image} alt="Food preview" className="rounded-xl w-full h-32 object-cover mt-2 shadow" />}
          </div>
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <label className="font-semibold">Or Enter Barcode</label>
            <form onSubmit={handleBarcodeSubmit} className="flex gap-2">
              <input type="text" value={barcode} onChange={handleBarcode} className="input glassmorphism flex-1" placeholder="e.g. 1234567890123" />
              <button type="submit" className="btn btn-primary px-4 py-2 rounded-lg font-semibold shadow">Scan</button>
            </form>
          </div>
        </div>
      </div>
      {showResults && food && (
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 animate-fade-in-up">
          <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-primary mb-2">{food.name}</h2>
            <div className="text-lg text-zinc-600 mb-2">Serving: {food.serving}</div>
            <div className="flex flex-col gap-1 text-lg">
              <span><b>Calories:</b> {food.calories} kcal</span>
              <span><b>Protein:</b> {food.macros.protein} g</span>
              <span><b>Carbs:</b> {food.macros.carbs} g</span>
              <span><b>Fat:</b> {food.macros.fat} g</span>
            </div>
            <button className="btn btn-accent mt-2">Add to Diary</button>
            {food.allergens.length > 0 && (
              <div className="mt-3 p-3 rounded-lg bg-red-100 text-red-700 font-semibold flex items-center gap-2">
                <span>⚠️ Allergen Warning:</span>
                <span>{food.allergens.join(", ")}</span>
              </div>
            )}
          </div>
          <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-6">
            <h2 className="text-xl font-bold text-primary mb-2">Macronutrient Breakdown</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={macroData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {macroData.map((entry, i) => <Cell key={i} fill={macroColors[i]} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <h2 className="text-xl font-bold text-primary mb-2">Micronutrients</h2>
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={food.micros}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill={microColors[0]} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <h2 className="text-xl font-bold text-primary mb-2">Ingredients</h2>
            <ul className="flex flex-wrap gap-2">
              {food.ingredients.map((ing: string, i: number) => (
                <li key={i} className="px-3 py-1 rounded-full bg-gradient-to-r from-green-100 via-blue-100 to-yellow-100 text-sm font-semibold shadow">{ing}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <style jsx>{`
        .glassmorphism {
          background: rgba(255,255,255,0.7);
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.12);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255,255,255,0.18);
        }
        .input {
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          background: rgba(255,255,255,0.5);
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        .input:focus {
          border: 1.5px solid #34d399;
        }
        .btn-primary {
          background: #34d399;
          color: white;
        }
        .btn-primary:hover {
          background: #059669;
        }
        .btn-accent {
          background: #60a5fa;
          color: white;
        }
        .btn-accent:hover {
          background: #2563eb;
        }
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
