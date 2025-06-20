"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserForm } from "@/stores/userFormApi";
import { useRouter } from "next/navigation";

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
    <form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-xl mx-auto p-8 bg-zinc-50 dark:bg-zinc-900/60 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-md"
    >
      <div>
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
      <div>
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
      <div>
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
      {form.gender === "female" && (
        <div>
          <label className={labelClass}>
            <input
              type="checkbox"
              name="pregnant"
              checked={form.pregnant}
              onChange={handleChange}
              className="mr-2 accent-primary"
            />
            Pregnant?
          </label>
        </div>
      )}
      {form.gender === "female" && form.pregnant && (
        <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <div>
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
      <button
        type="submit"
        className="btn btn-primary w-full py-2 rounded-lg font-semibold text-lg bg-primary text-white shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save"}
      </button>
      {isSuccess && <div className="text-green-600 mt-2">Saved! Redirecting...</div>}
    </form>
  );
} 