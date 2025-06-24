//dashboard
import {
  Flame,
  User,
  Droplet,
  Footprints,
  CheckCircle,
} from "lucide-react";

export const accent = "#34d399";
export const user = {
  name: "Jane Doe",
  avatar: "/assets/12.png",
};
export const quote = "Small steps every day lead to big results.";
export const counters = [
  {
    label: "Calories",
    value: 1680,
    icon: <Flame className="w-6 h-6 text-orange-400" />,
  },
  {
    label: "Steps",
    value: 8200,
    icon: <Footprints className="w-6 h-6 text-blue-400" />,
  },
  {
    label: "Water (L)",
    value: 2.1,
    icon: <Droplet className="w-6 h-6 text-cyan-400" />,
  },
  {
    label: "Streak",
    value: 9,
    icon: <CheckCircle className="w-6 h-6 text-green-400" />,
  },
];
export const progressRings = [
  { label: "Calories", value: 1680, goal: 2000, color: "#fbbf24" },
  { label: "Protein", value: 90, goal: 120, color: "#60a5fa" },
  { label: "Water", value: 2.1, goal: 2.5, color: "#34d399" },
];
export const chartDataDash = [
  { day: "Mon", weight: 72, calories: 1800 },
  { day: "Tue", weight: 71.8, calories: 1750 },
  { day: "Wed", weight: 71.5, calories: 1700 },
  { day: "Thu", weight: 71.3, calories: 1680 },
  { day: "Fri", weight: 71.1, calories: 1650 },
  { day: "Sat", weight: 71, calories: 1700 },
  { day: "Sun", weight: 70.8, calories: 1680 },
];
export const goalsDash = [
  {
    label: "Weight Goal",
    value: "68kg",
    progress: 70.8,
    target: 68,
    icon: <User className="w-5 h-5 text-green-400" />,
  },
  {
    label: "Habit Streak",
    value: "9 days",
    progress: 9,
    target: 21,
    icon: <CheckCircle className="w-5 h-5 text-green-400" />,
  },
];
export const activityFeed = [
  { type: "meal", desc: "Logged Breakfast: Oats & Berries", time: "8:10 AM" },
  { type: "water", desc: "Added 250ml water", time: "9:00 AM" },
  { type: "workout", desc: "Completed 30min Yoga", time: "7:00 AM" },
  {
    type: "meal",
    desc: "Logged Lunch: Grilled Chicken Salad",
    time: "12:30 PM",
  },
];
export const recommendations = [
  "Try a new high-protein recipe today!",
  "You're close to your water goal. Drink another glass!",
  "Keep your streak going—log your dinner tonight.",
];
