"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserForm } from "@/stores/userFormApi";
import { useRouter } from "next/navigation";
import Image from "next/image";

const initialState = {
  name: "",
  age: "",
  gender: "",
  pregnant: false,
  pregnancyMonth: "",
  length: "",
  weight: "",
  waterPerDay: "",
  mealsPerDay: "",
  favoriteMeal: "",
  favoriteMealOther: "",
  commonMeals: "",
  commonMealsOther: "",
  favoriteFruit: "",
  favoriteFruitOther: "",
  favoriteVegetables: "",
  favoriteVegetablesOther: "",
  favoriteSport: "",
  favoriteSportOther: "",
  exerciseHoursPerDay: "",
};

const mealOptions = ["Pizza", "Burger", "Pasta", "Other"];
const commonMealOptions = ["Rice", "Chicken", "Fish", "Other"];
const fruitOptions = ["Apple", "Banana", "Orange", "Other"];
const vegetableOptions = ["Carrot", "Broccoli", "Spinach", "Other"];
const sportOptions = ["Running", "Swimming", "Cycling", "Other"];
const pregnancyMonths = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export function UserForm({ userId, initialValues }: { userId: string; initialValues?: any }) {
  const [form, setForm] = useState(initialValues || initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (initialValues) setForm(initialValues);
  }, [initialValues]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    // Convert string numbers to numbers where needed
    const data = {
      ...form,
      age: Number(form.age),
      length: Number(form.length),
      weight: Number(form.weight),
      waterPerDay: Number(form.waterPerDay),
      mealsPerDay: form.mealsPerDay ? Number(form.mealsPerDay) : undefined,
      exerciseHoursPerDay: form.exerciseHoursPerDay ? Number(form.exerciseHoursPerDay) : undefined,
      gender: form.gender as '' | 'male' | 'female',
    };
    dispatch(setUserForm({ userId, data }));
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => router.push("/"), 1000);
  };

  const inputClass =
    "w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm";
  const labelClass = "block mb-1 font-medium text-zinc-700 dark:text-zinc-200";

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-100 via-primary/10 to-zinc-200 dark:from-zinc-900 dark:via-zinc-800/60 dark:to-zinc-900 animate-fade-in">
      <div className="w-full max-w-6xl bg-white/80 dark:bg-zinc-900/80 rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row overflow-hidden backdrop-blur-xl animate-fade-in-up">
        {/* Illustration/Graphic */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-primary/30 dark:from-primary/20 dark:to-zinc-800 p-10 w-1/2 relative">
          <Image
            src="/assets/logo2.png"
            alt="Wellness"
            width={220}
            height={220}
            className="mb-8 drop-shadow-xl animate-fade-in"
          />
          <h2 className="text-3xl font-bold text-primary mb-2 text-center animate-fade-in-up">
            Welcome to NutriMind
          </h2>
          <p className="text-zinc-500 dark:text-zinc-300 text-lg text-center max-w-xs animate-fade-in-up">
            Personalize your nutrition journey. Fill out the form to get
            tailored plans and insights!
          </p>
        </div>
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 p-8 md:p-14 animate-fade-in-up"
        >
          {/* Name */}
          <div className="col-span-1">
            <label className={labelClass}>Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Enter your name"
            />
          </div>
          {/* Age */}
          <div className="col-span-1">
            <label className={labelClass}>Age *</label>
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Your age"
            />
          </div>
          {/* Gender */}
          <div className="col-span-1">
            <label className={labelClass}>Gender *</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          {/* Pregnant */}
          {form.gender === "female" && (
            <div className="col-span-1 flex items-end">
              <label className={labelClass + " flex items-center gap-2"}>
                <input
                  type="checkbox"
                  name="pregnant"
                  checked={form.pregnant}
                  onChange={handleChange}
                  className="accent-primary scale-110"
                />
                Pregnant?
              </label>
            </div>
          )}
          {/* Pregnancy Month */}
          {form.gender === "female" && form.pregnant && (
            <div className="col-span-1">
              <label className={labelClass}>Pregnancy Month *</label>
              <select
                name="pregnancyMonth"
                value={form.pregnancyMonth}
                onChange={handleChange}
                required
                className={inputClass}
              >
                <option value="">Select</option>
                {pregnancyMonths.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          )}
          {/* Length */}
          <div className="col-span-1">
            <label className={labelClass}>Length (cm) *</label>
            <input
              name="length"
              type="number"
              value={form.length}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Your height in cm"
            />
          </div>
          {/* Weight */}
          <div className="col-span-1">
            <label className={labelClass}>Weight (kg) *</label>
            <input
              name="weight"
              type="number"
              value={form.weight}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Your weight in kg"
            />
          </div>
          {/* Water per day */}
          <div className="col-span-1">
            <label className={labelClass}>Water drunk/day (L) *</label>
            <input
              name="waterPerDay"
              type="number"
              value={form.waterPerDay}
              onChange={handleChange}
              required
              className={inputClass}
              placeholder="Liters per day"
            />
          </div>
          {/* Meals per day */}
          <div className="col-span-1">
            <label className={labelClass}>Number of meals/day (optional)</label>
            <input
              name="mealsPerDay"
              type="number"
              value={form.mealsPerDay}
              onChange={handleChange}
              className={inputClass}
              placeholder="Meals per day"
            />
          </div>
          {/* Favorite meal */}
          <div className="col-span-1">
            <label className={labelClass}>Favorite meal (optional)</label>
            <select
              name="favoriteMeal"
              value={form.favoriteMeal}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select</option>
              {mealOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            {form.favoriteMeal === "Other" && (
              <input
                name="favoriteMealOther"
                placeholder="Other"
                value={form.favoriteMealOther}
                onChange={handleChange}
                className={inputClass + " mt-2"}
              />
            )}
          </div>
          {/* Common meals */}
          <div className="col-span-1">
            <label className={labelClass}>Common meals (optional)</label>
            <select
              name="commonMeals"
              value={form.commonMeals}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select</option>
              {commonMealOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            {form.commonMeals === "Other" && (
              <input
                name="commonMealsOther"
                placeholder="Other"
                value={form.commonMealsOther}
                onChange={handleChange}
                className={inputClass + " mt-2"}
              />
            )}
          </div>
          {/* Favorite fruit */}
          <div className="col-span-1">
            <label className={labelClass}>Favorite fruit (optional)</label>
            <select
              name="favoriteFruit"
              value={form.favoriteFruit}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select</option>
              {fruitOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            {form.favoriteFruit === "Other" && (
              <input
                name="favoriteFruitOther"
                placeholder="Other"
                value={form.favoriteFruitOther}
                onChange={handleChange}
                className={inputClass + " mt-2"}
              />
            )}
          </div>
          {/* Favorite vegetables */}
          <div className="col-span-1">
            <label className={labelClass}>Favorite vegetables (optional)</label>
            <select
              name="favoriteVegetables"
              value={form.favoriteVegetables}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select</option>
              {vegetableOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            {form.favoriteVegetables === "Other" && (
              <input
                name="favoriteVegetablesOther"
                placeholder="Other"
                value={form.favoriteVegetablesOther}
                onChange={handleChange}
                className={inputClass + " mt-2"}
              />
            )}
          </div>
          {/* Favorite sport */}
          <div className="col-span-1">
            <label className={labelClass}>Favorite sport (optional)</label>
            <select
              name="favoriteSport"
              value={form.favoriteSport}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select</option>
              {sportOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            {form.favoriteSport === "Other" && (
              <input
                name="favoriteSportOther"
                placeholder="Other"
                value={form.favoriteSportOther}
                onChange={handleChange}
                className={inputClass + " mt-2"}
              />
            )}
          </div>
          {/* Exercise hours */}
          <div className="col-span-1">
            <label className={labelClass}>Hrs of exercise/day (optional)</label>
            <input
              name="exerciseHoursPerDay"
              type="number"
              value={form.exerciseHoursPerDay}
              onChange={handleChange}
              className={inputClass}
              placeholder="Hours per day"
            />
          </div>
          {/* Submit button */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full md:w-1/2 py-3 rounded-xl font-semibold text-lg bg-primary text-[var(--darkcard)] shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 animate-fade-in"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            {isSuccess && (
              <div className="text-green-600 mt-2 animate-fade-in">
                Saved! Redirecting...
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
} 