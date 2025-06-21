// Home page data arrays for reuse in components
import { Flame, TrendingUp, ListTodo, ShoppingBasket, BookOpen, FileText, LifeBuoy, Bot } from "lucide-react";
import { ReactNode } from "react";

export const healthData = [
  { date: "Mon", weight: 75, calories: 2100, steps: 6000, water: 1.5 },
  { date: "Tue", weight: 74.5, calories: 2000, steps: 7000, water: 1.8 },
  { date: "Wed", weight: 74, calories: 1950, steps: 8000, water: 2.0 },
  { date: "Thu", weight: 73.5, calories: 1900, steps: 8500, water: 2.1 },
  { date: "Fri", weight: 73, calories: 1850, steps: 9000, water: 2.2 },
  { date: "Sat", weight: 72.5, calories: 1850, steps: 8200, water: 2.3 },
  { date: "Sun", weight: 72, calories: 1850, steps: 8200, water: 2.3 },
];

export type FeatureCard = {
  label: string;
  desc: string;
  icon: () => ReactNode;
  href: string;
  preview: () => ReactNode;
};

export const featureCards: FeatureCard[] = [
  {
    label: "Meal Planner",
    desc: "Get AI-powered meal plans tailored to your goals.",
    icon: () => <Flame className="w-7 h-7 text-orange-400" />,
    href: "/form",
    preview: () => <span className="text-xs text-zinc-400">Try a 7-day plan</span>,
  },
  {
    label: "Progress Tracker",
    desc: "Visualize your journey and celebrate your wins.",
    icon: () => <TrendingUp className="w-7 h-7 text-green-500" />,
    href: "/tracker",
    preview: () => <span className="text-xs text-zinc-400">Weight: 72kg</span>,
  },
  {
    label: "Habit Tracker",
    desc: "Build healthy routines and stay consistent.",
    icon: () => <ListTodo className="w-7 h-7 text-blue-400" />,
    href: "/habits",
    preview: () => <span className="text-xs text-zinc-400">Streak: 9 days</span>,
  },
  {
    label: "Grocery List",
    desc: "Smart, categorized shopping lists from your meal plan.",
    icon: () => <ShoppingBasket className="w-7 h-7 text-green-400" />,
    href: "/grocery-list",
    preview: () => <span className="text-xs text-zinc-400">6 items</span>,
  },
  {
    label: "Recipes",
    desc: "Discover healthy recipes and nutrition info.",
    icon: () => <BookOpen className="w-7 h-7 text-yellow-400" />,
    href: "/recipes",
    preview: () => <span className="text-xs text-zinc-400">E.g. Greek Yogurt Bowl</span>,
  },
  {
    label: "Blog",
    desc: "Read expert articles and nutrition tips.",
    icon: () => <FileText className="w-7 h-7 text-purple-400" />,
    href: "/blog",
    preview: () => <span className="text-xs text-zinc-400">Latest: 5 Nutrition Myths</span>,
  },
  {
    label: "Support / FAQ",
    desc: "Get help and answers anytime.",
    icon: () => <LifeBuoy className="w-7 h-7 text-red-400" />,
    href: "/faq",
    preview: () => <span className="text-xs text-zinc-400">24/7 support</span>,
  },
];

export const testimonials = [
  {
    name: "Alice",
    text: "The AI meal planner changed my life!",
    img: "/assets/12.png",
  },
  {
    name: "Bob",
    text: "Tracking my progress is so easy now.",
    img: "/assets/13.png",
  },
  {
    name: "Jane",
    text: "Love the healthy recipes and grocery list!",
    img: "/assets/14.png",
  },
];

export type HowItWorksStep = {
  icon: () => ReactNode;
  label: string;
};

export const howItWorks: HowItWorksStep[] = [
  { icon: () => <Bot className="w-6 h-6 text-primary" />, label: "Chat with AI" },
  { icon: () => <Flame className="w-6 h-6 text-orange-400" />, label: "Get Meal Plan" },
  { icon: () => <TrendingUp className="w-6 h-6 text-green-500" />, label: "Track Progress" },
  { icon: () => <ShoppingBasket className="w-6 h-6 text-green-400" />, label: "Shop Smart" },
];

export const motivationalQuotes = [
  "Your journey starts today!",
  "Small steps, big results.",
  "You are stronger than you think!",
  "Healthy habits, happy life.",
];

export const metricOptions = [
  { key: "weight", label: "Weight" },
  { key: "calories", label: "Calories" },
  { key: "steps", label: "Steps" },
  { key: "water", label: "Water" },
]; 