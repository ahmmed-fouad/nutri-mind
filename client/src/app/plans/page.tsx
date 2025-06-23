"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from "recharts";

const plans = [
  {
    name: "Free",
    price: 0,
    features: [
      "10 recipes/month",
      "Basic nutrition info",
      "Community forum",
      "Email support",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: 9,
    features: [
      "Unlimited recipes",
      "AI Chatbot",
      "Advanced nutrition analysis",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Family",
    price: 15,
    features: [
      "Unlimited recipes",
      "AI Chatbot",
      "Family accounts (up to 5)",
      "Priority support",
    ],
    highlight: false,
  },
];

const chartData = [
  { feature: "Recipes", Free: 10, Pro: 100, Family: 100 },
  { feature: "AI Chatbot", Free: 0, Pro: 1, Family: 1 },
  { feature: "Nutrition Analysis", Free: 0, Pro: 1, Family: 1 },
  { feature: "Family Accounts", Free: 0, Pro: 0, Family: 1 },
  { feature: "Support", Free: 1, Pro: 2, Family: 2 },
];

const faqs = [
  {
    q: "Can I use NutriMind for free?",
    a: "Yes! The Free plan gives you access to basic features and 10 recipes per month.",
  },
  {
    q: "What is included in the Pro plan?",
    a: "Pro unlocks unlimited recipes, AI chatbot, advanced nutrition analysis, and priority support.",
  },
  {
    q: "How does the Family plan work?",
    a: "Family plan allows up to 5 accounts under one subscription, perfect for households.",
  },
];

export default function PlansPage() {
  return (
    <div className="min-h-[90vh] bg-zinc-50 dark:bg-zinc-900/60 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          Plans & Pricing
        </h1>
        <p className="text-center text-zinc-500 mb-12 max-w-2xl mx-auto text-lg">
          Choose the plan that fits your lifestyle. Upgrade anytime for more
          features and flexibility.
        </p>
        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col items-center bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 transition-transform hover:scale-105 ${
                plan.highlight ? "ring-2 ring-primary scale-105" : ""
              }`}
            >
              <h2 className="text-2xl font-bold mb-2 text-primary">
                {plan.name}
              </h2>
              <div className="text-4xl font-extrabold mb-2">
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
                className={`w-full py-2 rounded-lg font-semibold text-lg shadow-md transition ${
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
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">
            Compare Features
          </h3>
          <div className="w-full h-96">
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
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8">
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">
            Frequently Asked Questions
          </h3>
          <ul className="space-y-6">
            {faqs.map((faq, i) => (
              <li key={i}>
                <div className="font-semibold text-zinc-700 dark:text-zinc-200 mb-1">
                  {faq.q}
                </div>
                <div className="text-zinc-500 dark:text-zinc-400">{faq.a}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
