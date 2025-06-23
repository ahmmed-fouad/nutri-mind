"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { User, Mail, Lock, Image, Moon, Sun, Globe, Bell, Shield, LogIn, Link, CheckCircle, XCircle, Key, MessageCircle, Info } from "lucide-react";

const usageData = [
  { name: "Tracker", value: 40 },
  { name: "Recipes", value: 25 },
  { name: "Blog", value: 15 },
  { name: "Chatbot", value: 10 },
  { name: "Forum", value: 10 },
];
const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171", "#a78bfa"];

const recentLogins = [
  { device: "Chrome on Windows", time: "2024-06-25 10:12" },
  { device: "Mobile App", time: "2024-06-24 21:03" },
];

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "jane@email.com",
    age: 28,
    gender: "Female",
    height: 168,
    weight: 62,
    photo: "/assets/12.png",
  });
  const [theme, setTheme] = useState("auto");
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState({ email: true, push: false, inApp: true });
  const [twoFA, setTwoFA] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [photoPreview, setPhotoPreview] = useState(profile.photo);

  const handleProfileChange = (e: any) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handlePhoto = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev: any) => setPhotoPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-950 py-10 px-2 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary">
            Settings & Personalization
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
            Manage your account, preferences, and app experience.
          </p>
        </div>
        {/* Profile Card */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
              <User className="w-5 h-5" /> Profile
            </h2>
            <div className="flex items-center gap-4">
              <img
                src={photoPreview}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-primary shadow"
              />
              <div>
                <label className="block text-sm font-medium mb-1">
                  Change Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="block text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Name</label>
                <input
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Email</label>
                <input
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Age</label>
                <input
                  name="age"
                  type="number"
                  value={profile.age}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Gender</label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs mb-1">Height (cm)</label>
                <input
                  name="height"
                  type="number"
                  value={profile.height}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Weight (kg)</label>
                <input
                  name="weight"
                  type="number"
                  value={profile.weight}
                  onChange={handleProfileChange}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs mb-1">Change Password</label>
              <input
                type="password"
                placeholder="New password"
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
              />
            </div>
            <button className="w-full py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition mt-2">
              <Lock className="w-5 h-5 inline mr-2" /> Save Changes
            </button>
          </div>
          {/* Preferences */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
              <SettingsIcon /> Preferences
            </h2>
            <div className="flex items-center gap-3 mb-2">
              <Sun className="w-5 h-5 text-yellow-400" />
              <span className="text-sm">Theme:</span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="rounded-lg px-2 py-1 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800"
              >
                <option value="auto">Auto</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <span className="text-sm">Language:</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="rounded-lg px-2 py-1 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-5 h-5 text-primary" />
              <span className="text-sm">Notifications:</span>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) =>
                    setNotifications((n) => ({ ...n, email: e.target.checked }))
                  }
                />{" "}
                Email
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) =>
                    setNotifications((n) => ({ ...n, push: e.target.checked }))
                  }
                />{" "}
                Push
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="checkbox"
                  checked={notifications.inApp}
                  onChange={(e) =>
                    setNotifications((n) => ({ ...n, inApp: e.target.checked }))
                  }
                />{" "}
                In-App
              </label>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">Privacy:</span>
              <button className="ml-2 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs">
                Export Data
              </button>
              <button className="ml-2 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs">
                Delete Account
              </button>
            </div>
          </div>
        </div>
        {/* Dynamic Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5" /> App Usage Breakdown
          </h2>
          <div className="w-full h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={usageData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#34d399"
                  label
                >
                  {usageData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Connected Accounts & Security */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Connected Accounts */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
              <Link className="w-5 h-5" /> Connected Accounts
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg">
                <img src="/assets/logo.png" alt="Google" className="w-5 h-5" />{" "}
                Google <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 rounded-lg opacity-60">
                Apple <XCircle className="w-4 h-4 text-zinc-400" />
              </div>
            </div>
            <button className="w-full py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition mt-2">
              Connect New Account
            </button>
          </div>
          {/* Security & Privacy */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5" /> Security & Privacy
            </h2>
            <div>
              <div className="font-semibold mb-1">Recent Logins</div>
              <ul className="text-xs text-zinc-500">
                {recentLogins.map((login, i) => (
                  <li key={i} className="mb-1 flex items-center gap-2">
                    <LogIn className="w-4 h-4" /> {login.device}{" "}
                    <span className="ml-2 text-zinc-400">{login.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Key className="w-5 h-5 text-primary" />
              <span className="text-sm">Two-Factor Authentication:</span>
              <button
                onClick={() => setTwoFA((f) => !f)}
                className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold shadow ${
                  twoFA
                    ? "bg-green-400 text-white"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                }`}
              >
                {twoFA ? "Enabled" : "Disabled"}
              </button>
            </div>
          </div>
        </div>
        {/* Feedback & Legal */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Feedback */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" /> Feedback
            </h2>
            <textarea
              className="w-full min-h-[80px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 p-3 text-base text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Share your feedback or suggestions..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button className="w-full py-2 rounded-lg bg-primary text-[var(--darkcard)] font-semibold shadow hover:bg-primary/90 transition mt-2">
              Send Feedback
            </button>
          </div>
          {/* App Version & Legal */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6 items-center justify-center">
            <h2 className="text-xl font-bold text-primary mb-2 flex items-center gap-2">
              <Info className="w-5 h-5" /> App Info
            </h2>
            <div className="text-zinc-500 text-sm">Version 1.0.0</div>
            <div className="flex gap-4 text-sm">
              <a href="#" className="underline text-primary">
                Privacy Policy
              </a>
              <a href="#" className="underline text-primary">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.94-2.34a1 1 0 0 0 .26-1.09l-1.07-3.11a1 1 0 0 1 .21-1.09l2.42-2.36a1 1 0 0 0-.13-1.5l-2.88-2.09a1 1 0 0 0-1.18-.06l-2.9 1.68a1 1 0 0 1-1.13 0l-2.9-1.68a1 1 0 0 0-1.18.06l-2.88 2.09a1 1 0 0 0-.13 1.5l2.42 2.36a1 1 0 0 1 .21 1.09l-1.07 3.11a1 1 0 0 0 .26 1.09l2.53 1.84a1 1 0 0 1 .36 1.09l-.48 3.18a1 1 0 0 0 1.45 1.05l2.7-1.44a1 1 0 0 1 1.02 0l2.7 1.44a1 1 0 0 0 1.45-1.05l-.48-3.18a1 1 0 0 1 .36-1.09l2.53-1.84z" /></svg>;
}
