export const usageData = [
  { name: "Tracker", value: 40 },
  { name: "Recipes", value: 25 },
  { name: "Blog", value: 15 },
  { name: "Chatbot", value: 10 },
  { name: "Forum", value: 10 },
];

export const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa"];

export const recentLogins = [
  { device: "Chrome on Windows", time: "2024-06-25 10:12" },
  { device: "Mobile App", time: "2024-06-24 21:03" },
];

export type Profile = {
  name: string;
  email: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  photo: string;
};

export type Notifications = { email: boolean; push: boolean; inApp: boolean };

export const profileFields: { label: string; name: keyof Profile; type: string; options?: string[] }[] = [
  { label: "Name", name: "name", type: "text" },
  { label: "Email", name: "email", type: "text" },
  { label: "Age", name: "age", type: "number" },
  { label: "Gender", name: "gender", type: "select", options: ["Female", "Male", "Other"] },
  { label: "Height (cm)", name: "height", type: "number" },
  { label: "Weight (kg)", name: "weight", type: "number" },
];

export const notificationTypes: { key: keyof Notifications; label: string }[] = [
  { key: "email", label: "Email" },
  { key: "push", label: "Push" },
  { key: "inApp", label: "In-App" },
];

export const preferenceOptions = [
  {
    icon: "sun",
    label: "Theme:",
    valueKey: "theme",
    options: [
      { value: "auto", label: "Auto" },
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
    ]
  },
  {
    icon: "globe",
    label: "Language:",
    valueKey: "language",
    options: [
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
    ]
  },
];

export const connectedAccounts = [
  {
    icon: "google",
    name: "Google",
    status: "connected"
  },
  {
    icon: "apple",
    name: "Apple",
    status: "disconnected"
  },
];

export const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
]; 