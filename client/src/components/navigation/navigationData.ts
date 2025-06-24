import { User, BarChart2, Settings, Bot, ListTodo, UserPlus, ShoppingBasket, Calculator, LayoutDashboard, ShieldUser, UserRound } from "lucide-react";

export const navbarLinks = [

  { href: "/recipes", label: "Recipes" },
  { href: "/food-scanner", label: "Food Scanner" },
  { href: "/plans", label: "Plans" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/faq", label: "FAQ" },
];

export const socialLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/forum", label: "Forum" },
  { href: "/social-hub", label: "SocialHub" },
];

export const navItems = [
  { href: "/profile", label: "Profile", icon: User },
  { href: "/tracker", label: "Progress Tracker", icon: BarChart2 },
  { href: "/calculator", label: "Diet Calculator", icon: Calculator },
  { href: "/form", label: "User Form", icon: UserPlus },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/chatbot", label: "AI Chatbot", icon: Bot },
  { href: "/habits", label: "Habit Tracker", icon: ListTodo },
  { href: "/grocery-list", label: "Grocery List", icon: ShoppingBasket },
  // Dashboard with submenu
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    submenu: [
      { href: "/admin", label: "Admin", icon: ShieldUser },
      { href: "/dashboard", label: "User Dashboard", icon: UserRound },
    ],
  },
]; 

export const allPages = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin", label: "Admin" },
  { href: "/profile", label: "Profile" },
  { href: "/tracker", label: "Progress Tracker" },
  { href: "/calculator", label: "Diet Calculator" },
  { href: "/form", label: "User Form" },
  { href: "/settings", label: "Settings" },
  { href: "/chatbot", label: "AI Chatbot" },
  { href: "/habits", label: "Habit Tracker" },
  { href: "/grocery-list", label: "Grocery List" },
  { href: "/notifications", label: "Notifications" },
];