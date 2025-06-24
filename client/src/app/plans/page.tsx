"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { faqs, chartData, plans } from "@/data/planesData";
export default function PlansPage() {
  return (
    <div className="min-h-[90vh] bg-zinc-50 dark:bg-zinc-900/60 py-6 px-2 sm:px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-primary">
          Plans & Pricing
        </h1>
        <p className="text-center text-zinc-500 mb-12 max-w-2xl mx-auto text-base sm:text-lg">
          Choose the plan that fits your lifestyle. Upgrade anytime for more
          features and flexibility.
        </p>
        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col items-center bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 transition-transform hover:scale-105 ${
                plan.highlight ? "ring-2 ring-primary scale-105" : ""
              }`}
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-primary">
                {plan.name}
              </h2>
              <div className="text-3xl sm:text-4xl font-extrabold mb-2">
                {plan.price === 0 ? "Free" : `$${plan.price}`}
              </div>
              <div className="text-zinc-400 mb-4">
                {plan.price === 0 ? "Forever" : "/month"}
              </div>
              <ul className="mb-6 space-y-2 w-full">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded-lg font-semibold text-base sm:text-lg shadow-md transition ${
                  plan.highlight
                    ? "bg-primary text-[var(--darkcard)] hover:bg-primary/90"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                {plan.price === 0 ? "Get Started" : "Upgrade"}
              </button>
            </div>
          ))}
        </div>
        {/* Comparison chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 mb-12 md:mb-16">
          <h3 className="text-lg sm:text-2xl font-bold mb-6 text-center text-primary">
            Compare Features
          </h3>
          <div className="w-full h-64 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="feature" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Free"
                  dataKey="Free"
                  stroke="#a1a1aa"
                  fill="#a1a1aa"
                  fillOpacity={0.3}
                />
                <Radar
                  name="Pro"
                  dataKey="Pro"
                  stroke="#34d399"
                  fill="#34d399"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Family"
                  dataKey="Family"
                  stroke="#60a5fa"
                  fill="#60a5fa"
                  fillOpacity={0.4}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* FAQ */}
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8">
          <h3 className="text-lg sm:text-2xl font-bold mb-6 text-center text-primary">
            Frequently Asked Questions
          </h3>
          <ul className="space-y-6">
            {faqs.map((faq, i) => (
              <li key={i}>
                <div className="font-semibold text-zinc-700 dark:text-zinc-200 mb-1">
                  {faq.q}
                </div>
                <div className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base">{faq.a}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
