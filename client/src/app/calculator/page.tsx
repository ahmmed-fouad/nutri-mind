"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  goals,
  activityLevels,
  dietaryPrefs,
  calorieBarColor,
  macroColors,
  tips,
  mealPlan,
} from "@/data/calculatorPageData";
import { useTranslation } from "react-i18next";

function calculateBMR(gender: string, weight: number, height: number, age: number) {
  // Mifflin-St Jeor Equation
  if (gender === "male") return 10 * weight + 6.25 * height - 5 * age + 5;
  return 10 * weight + 6.25 * height - 5 * age - 161;
}

function calculateMacros(calories: number, pref: string) {
  // Default: 30% protein, 40% carbs, 30% fat
  // Keto: 20% protein, 10% carbs, 70% fat
  // High-Protein: 40% protein, 30% carbs, 30% fat
  if (pref === "dietaryPrefs.keto") return { protein: 0.2, carbs: 0.1, fat: 0.7 };
  if (pref === "dietaryPrefs.high_protein") return { protein: 0.4, carbs: 0.3, fat: 0.3 };
  return { protein: 0.3, carbs: 0.4, fat: 0.3 };
}

export default function DietCalculatorPage() {
  const { t } = useTranslation("calculator");
  const [form, setForm] = useState({
    age: 28,
    gender: "female",
    height: 168,
    weight: 62,
    activity: 1.375,
    goal: 0,
    pref: "dietaryPrefs.none",
    bodyFat: "",
    waist: "",
    hip: "",
    meals: 3,
    allergies: "",
  });
  const [results, setResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleCalculate = (e: any) => {
    e.preventDefault();
    const bmr = calculateBMR(form.gender, Number(form.weight), Number(form.height), Number(form.age));
    const tdee = bmr * Number(form.activity);
    const calories = Math.round(tdee + Number(form.goal));
    const macros = calculateMacros(calories, form.pref);
    const protein = Math.round((calories * macros.protein) / 4);
    const carbs = Math.round((calories * macros.carbs) / 4);
    const fat = Math.round((calories * macros.fat) / 9);
    const water = Math.round(Number(form.weight) * 35 / 100) / 10; // liters
    setResults({ calories, protein, carbs, fat, water });
    setShowResults(true);
  };

  // Chart data
  const macroData = results ? [
    { name: t("protein"), value: results.protein },
    { name: t("carbs"), value: results.carbs },
    { name: t("fat"), value: results.fat },
  ] : [];
  const calorieBarData = results ? [
    { name: t("calories"), value: results.calories },
  ] : [];

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/60 py-10 px-2">
      <div className="max-w-3xl w-full glassmorphism p-8 rounded-3xl shadow-2xl mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-foreground">
          {t("title")}
        </h1>
        <p className="text-center text-zinc-700 mb-6">
          {t("subtitle")}
        </p>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleCalculate}
        >
          <div className="flex flex-col gap-3 text-zinc-700">
            <label className="font-semibold">{t("age")}</label>
            <input
              type="number"
              name="age"
              min={10}
              max={100}
              value={form.age}
              onChange={handleChange}
              className="input glassmorphism"
              required
            />
            <label className="font-semibold">{t("gender")}</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="input glassmorphism"
            >
              <option value="female">{t("female")}</option>
              <option value="male">{t("male")}</option>
            </select>
            <label className="font-semibold">{t("height")}</label>
            <input
              type="number"
              name="height"
              min={100}
              max={250}
              value={form.height}
              onChange={handleChange}
              className="input glassmorphism"
              required
            />
            <label className="font-semibold">{t("weight")}</label>
            <input
              type="number"
              name="weight"
              min={30}
              max={250}
              value={form.weight}
              onChange={handleChange}
              className="input glassmorphism"
              required
            />
            <label className="font-semibold">{t("activity_level")}</label>
            <select
              name="activity"
              value={form.activity}
              onChange={handleChange}
              className="input glassmorphism"
            >
              {activityLevels.map((a) => (
                <option key={a.value} value={a.value}>
                  {t(a.label)}
                </option>
              ))}
            </select>
            <label className="font-semibold">{t("goal")}</label>
            <select
              name="goal"
              value={form.goal}
              onChange={handleChange}
              className="input glassmorphism"
            >
              {goals.map((g) => (
                <option key={g.value} value={g.value}>
                  {t(g.label)}
                </option>
              ))}
            </select>
            <label className="font-semibold">{t("dietary_preference")}</label>
            <select
              name="pref"
              value={form.pref}
              onChange={handleChange}
              className="input glassmorphism"
            >
              {dietaryPrefs.map((p) => (
                <option key={p} value={p}>
                  {t(p)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-3 text-zinc-700">
            <label className="font-semibold">{t("body_fat")}</label>
            <input
              type="number"
              name="bodyFat"
              min={5}
              max={60}
              value={form.bodyFat}
              onChange={handleChange}
              className="input glassmorphism"
            />
            <label className="font-semibold">{t("waist")}</label>
            <input
              type="number"
              name="waist"
              min={40}
              max={200}
              value={form.waist}
              onChange={handleChange}
              className="input glassmorphism"
            />
            <label className="font-semibold">{t("hip")}</label>
            <input
              type="number"
              name="hip"
              min={40}
              max={200}
              value={form.hip}
              onChange={handleChange}
              className="input glassmorphism"
            />
            <label className="font-semibold">{t("meals_per_day")}</label>
            <input
              type="number"
              name="meals"
              min={1}
              max={8}
              value={form.meals}
              onChange={handleChange}
              className="input glassmorphism"
            />
            <label className="font-semibold">{t("allergies")}</label>
            <input
              type="text"
              name="allergies"
              value={form.allergies}
              onChange={handleChange}
              className="input glassmorphism"
              placeholder={t("allergies_placeholder")}
            />
            <button
              type="submit"
              className="mt-6 btn btn-primary py-3 rounded-xl font-bold text-lg shadow-lg bg-primary text-white hover:bg-primary/90 transition-all"
            >
              {t("calculate")}
            </button>
          </div>
        </form>
      </div>
      {showResults && results && (
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 animate-fade-in-up">
          <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-primary mb-2">
              {t("your_results")}
            </h2>
            <div className="flex flex-col gap-2 text-lg">
              <span>
                <b>{t("calories")}:</b> {results.calories} kcal
              </span>
              <span>
                <b>{t("protein")}:</b> {results.protein} g
              </span>
              <span>
                <b>{t("carbs")}:</b> {results.carbs} g
              </span>
              <span>
                <b>{t("fat")}:</b> {results.fat} g
              </span>
              <span>
                <b>{t("water")}:</b> {results.water} L/day
              </span>
            </div>
            <button className="btn btn-accent mt-2">{t("download_pdf")}</button>
          </div>
          <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-6">
            <h2 className="text-xl font-bold text-primary mb-2">
              {t("macronutrient_breakdown")}
            </h2>
            <ResponsiveContainer width="100%" height={200}>
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
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={calorieBarData}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill={calorieBarColor}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {showResults && (
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 mt-8 animate-fade-in-up">
          <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-primary mb-2">
              {t("sample_meal_plan")}
            </h2>
            <ul className="flex flex-col gap-2">
              {mealPlan.map((m, i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <span className="text-2xl">{m.icon}</span>
                  <span>
                    <b>{t(m.meal)}:</b> {t(m.desc)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-primary mb-2">
              {t("tips_for_success")}
            </h2>
            <ul className="list-disc pl-6 text-lg text-zinc-600">
              {tips.map((tip, i) => (
                <li key={i}>{t(tip)}</li>
              ))}
            </ul>
            <button className="btn btn-secondary mt-2">{t("share_results")}</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .glassmorphism {
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.12);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .input {
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          background: rgba(255, 255, 255, 0.5);
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
        .btn-secondary {
          background: #fbbf24;
          color: #1e293b;
        }
        .btn-secondary:hover {
          background: #f59e42;
        }
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
