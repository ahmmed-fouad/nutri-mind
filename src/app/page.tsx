"use client";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Bot, ArrowRight, Flame, Droplet, Footprints, User, ListTodo, ShoppingBasket, BookOpen, FileText, LifeBuoy, TrendingUp, CheckCircle, Star, Sparkles, Mail } from "lucide-react";
import Image from "next/image";

const healthData = [
  { date: "Mon", weight: 75, calories: 2100, steps: 6000, water: 1.5 },
  { date: "Tue", weight: 74.5, calories: 2000, steps: 7000, water: 1.8 },
  { date: "Wed", weight: 74, calories: 1950, steps: 8000, water: 2.0 },
  { date: "Thu", weight: 73.5, calories: 1900, steps: 8500, water: 2.1 },
  { date: "Fri", weight: 73, calories: 1850, steps: 9000, water: 2.2 },
  { date: "Sat", weight: 72.5, calories: 1850, steps: 8200, water: 2.3 },
  { date: "Sun", weight: 72, calories: 1850, steps: 8200, water: 2.3 },
];

const featureCards = [
  { label: "Meal Planner", desc: "Get AI-powered meal plans tailored to your goals.", icon: <Flame className="w-7 h-7 text-orange-400" />, href: "/form", preview: <span className="text-xs text-zinc-400">Try a 7-day plan</span> },
  { label: "Progress Tracker", desc: "Visualize your journey and celebrate your wins.", icon: <TrendingUp className="w-7 h-7 text-green-500" />, href: "/tracker", preview: <span className="text-xs text-zinc-400">Weight: 72kg</span> },
  { label: "Habit Tracker", desc: "Build healthy routines and stay consistent.", icon: <ListTodo className="w-7 h-7 text-blue-400" />, href: "/habits", preview: <span className="text-xs text-zinc-400">Streak: 9 days</span> },
  { label: "Grocery List", desc: "Smart, categorized shopping lists from your meal plan.", icon: <ShoppingBasket className="w-7 h-7 text-green-400" />, href: "/grocery-list", preview: <span className="text-xs text-zinc-400">6 items</span> },
  { label: "Recipes", desc: "Discover healthy recipes and nutrition info.", icon: <BookOpen className="w-7 h-7 text-yellow-400" />, href: "/recipes", preview: <span className="text-xs text-zinc-400">E.g. Greek Yogurt Bowl</span> },
  { label: "Blog", desc: "Read expert articles and nutrition tips.", icon: <FileText className="w-7 h-7 text-purple-400" />, href: "/blog", preview: <span className="text-xs text-zinc-400">Latest: 5 Nutrition Myths</span> },
  { label: "Support / FAQ", desc: "Get help and answers anytime.", icon: <LifeBuoy className="w-7 h-7 text-red-400" />, href: "/faq", preview: <span className="text-xs text-zinc-400">24/7 support</span> },
];

const testimonials = [
  { name: "Alice", text: "The AI meal planner changed my life!", img: "/assets/12.png" },
  { name: "Bob", text: "Tracking my progress is so easy now.", img: "/assets/13.png" },
  { name: "Jane", text: "Love the healthy recipes and grocery list!", img: "/assets/14.png" },
];

const howItWorks = [
  { icon: <Bot className="w-6 h-6 text-primary" />, label: "Chat with AI" },
  { icon: <Flame className="w-6 h-6 text-orange-400" />, label: "Get Meal Plan" },
  { icon: <TrendingUp className="w-6 h-6 text-green-500" />, label: "Track Progress" },
  { icon: <ShoppingBasket className="w-6 h-6 text-green-400" />, label: "Shop Smart" },
];

const motivationalQuotes = [
  "Your journey starts today!",
  "Small steps, big results.",
  "You are stronger than you think!",
  "Healthy habits, happy life.",
];

export default function HomePage() {
  const [metric, setMetric] = useState("weight");
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [newsletter, setNewsletter] = useState("");

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-950 py-10 px-2 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero: Diet AI Chatbot */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-bold mb-4 text-primary">Meet Your Diet AI Coach</h1>
            <p className="text-lg text-zinc-500 mb-6 max-w-xl">Personalized meal planning, nutrition advice, and progress tracking — all in one chat.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6">
              <a href="#chatbot" className="px-6 py-3 rounded-xl bg-primary text-white font-bold shadow-lg hover:bg-primary/90 transition text-lg flex items-center gap-2"><Bot className="w-6 h-6" /> Start Chatting</a>
              <a href="/form" className="px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-primary font-bold shadow hover:bg-primary/10 transition text-lg flex items-center gap-2"><Flame className="w-6 h-6" /> Plan My Meals</a>
            </div>
          </div>
          {/* Animated Chatbot UI */}
          <div className="flex-1 flex flex-col items-center" id="chatbot">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2"><Bot className="w-6 h-6 text-primary" /><span className="font-bold text-lg">Diet AI</span></div>
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 text-left text-zinc-700 dark:text-zinc-200 min-h-[80px] animate-pulse">Hi! I'm your AI coach. How can I help you today?</div>
              <div className="flex gap-2">
                <input className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800" placeholder="Ask me anything..." />
                <button className="px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"><ArrowRight className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>
        {/* Dynamic Chart: Health at a Glance */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-primary">Your Health at a Glance</h2>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setMetric('weight')} className={`px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${metric === 'weight' ? 'bg-primary text-white border-primary' : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'}`}>Weight</button>
              <button onClick={() => setMetric('calories')} className={`px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${metric === 'calories' ? 'bg-primary text-white border-primary' : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'}`}>Calories</button>
              <button onClick={() => setMetric('steps')} className={`px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${metric === 'steps' ? 'bg-primary text-white border-primary' : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'}`}>Steps</button>
              <button onClick={() => setMetric('water')} className={`px-4 py-1 rounded-full font-medium border transition shadow-sm text-sm ${metric === 'water' ? 'bg-primary text-white border-primary' : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300'}`}>Water</button>
            </div>
          </div>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={healthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey={metric}
                  stroke="#34d399"
                  fill="#34d39933"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                  animationDuration={600}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Personalized Welcome & Quick Actions */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 items-center md:items-stretch">
          <div className="flex-1 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex items-center gap-4">
            <Image src="/assets/12.png" alt="User avatar" width={60} height={60} className="rounded-full border-2 border-primary shadow" />
            <div>
              <div className="text-lg font-bold text-primary">Welcome back, Jane!</div>
              <div className="flex gap-4 mt-2 text-sm text-zinc-500">
                <span><Flame className="w-4 h-4 inline text-orange-400" /> 1850 kcal</span>
                <span><Droplet className="w-4 h-4 inline text-cyan-400" /> 2.3L</span>
                <span><Footprints className="w-4 h-4 inline text-blue-400" /> 8200</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 justify-center">
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"><Flame className="w-5 h-5" /> Log Today's Meal</button>
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-blue-400 text-white font-semibold shadow hover:bg-blue-500 transition"><TrendingUp className="w-5 h-5" /> Update Weight</button>
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-green-400 text-white font-semibold shadow hover:bg-green-500 transition"><ListTodo className="w-5 h-5" /> Add Habit</button>
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-yellow-400 text-white font-semibold shadow hover:bg-yellow-500 transition"><ShoppingBasket className="w-5 h-5" /> Open Grocery List</button>
          </div>
        </div>
        {/* Feature Highlights */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">Explore NutriMind Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featureCards.map((f, i) => (
              <a key={i} href={f.href} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center gap-3 hover:scale-105 transition-transform">
                <div>{f.icon}</div>
                <div className="text-lg font-bold text-primary text-center">{f.label}</div>
                <div className="text-sm text-zinc-500 text-center">{f.desc}</div>
                <div className="mt-2">{f.preview}</div>
                <button className="mt-4 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition flex items-center gap-2">Go to <ArrowRight className="w-4 h-4" /></button>
              </a>
            ))}
          </div>
        </div>
        {/* Motivational Quote & Progress Streak */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 items-center justify-center">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex-1 flex flex-col items-center gap-6">
            <div className="text-lg italic text-zinc-600 dark:text-zinc-300 text-center">"{motivationalQuotes[quoteIdx]}"</div>
            <button onClick={() => setQuoteIdx((q) => (q + 1) % motivationalQuotes.length)} className="px-4 py-1 rounded-full bg-primary text-white text-sm font-medium shadow hover:bg-primary/90 transition">New Quote</button>
          </div>
          <div className="bg-gradient-to-br from-green-100 via-blue-50 to-yellow-100 dark:from-green-900 dark:via-blue-950 dark:to-yellow-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex-1 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xl"><CheckCircle className="w-6 h-6" /> 9 day streak!</div>
            <Star className="w-10 h-10 text-yellow-400" />
            <div className="text-sm text-zinc-500">Keep up the great work!</div>
          </div>
        </div>
        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">What Our Users Say</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col items-center gap-3 max-w-xs">
                <Image src={t.img} alt={t.name} width={48} height={48} className="rounded-full border-2 border-primary shadow" />
                <div className="text-lg font-bold text-primary">{t.name}</div>
                <div className="text-sm text-zinc-500 text-center">"{t.text}"</div>
              </div>
            ))}
          </div>
        </div>
        {/* How it Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">How NutriMind Works</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {howItWorks.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-3 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 min-w-[160px]">
                {step.icon}
                <div className="text-lg font-bold text-primary text-center">{step.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Newsletter Signup */}
        <div className="mb-16 max-w-xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col items-center gap-6">
          <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2"><Mail className="w-5 h-5" /> Get Weekly Nutrition Tips</h2>
          <form className="w-full flex gap-2" onSubmit={e => { e.preventDefault(); setNewsletter(""); }}>
            <input
              type="email"
              value={newsletter}
              onChange={e => setNewsletter(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
              required
            />
            <button type="submit" className="px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition">Subscribe</button>
          </form>
          <div className="text-xs text-zinc-400">No spam. Unsubscribe anytime.</div>
        </div>
      </div>
    </div>
  );
}
