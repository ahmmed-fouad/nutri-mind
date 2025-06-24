"use client";
import { useState } from "react";
import ProfileCard from "../../components/settings/ProfileCard";
import PreferencesCard from "../../components/settings/PreferencesCard";
import UsageChart from "../../components/settings/UsageChart";
import ConnectedAccountsCard from "../../components/settings/ConnectedAccountsCard";
import SecurityPrivacyCard from "../../components/settings/SecurityPrivacyCard";
import FeedbackCard from "../../components/settings/FeedbackCard";
import AppInfoCard from "../../components/settings/AppInfoCard";
import { usageData, COLORS, recentLogins, profileFields, preferenceOptions, notificationTypes, connectedAccounts, legalLinks } from "../../data/settingsData";

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
        {/* Profile & Preferences */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <ProfileCard
            profile={profile}
            setProfile={setProfile}
            photoPreview={photoPreview}
            setPhotoPreview={setPhotoPreview}
            handleProfileChange={handleProfileChange}
            handlePhoto={handlePhoto}
            profileFields={profileFields}
          />
          <PreferencesCard
            theme={theme}
            setTheme={setTheme}
            language={language}
            setLanguage={setLanguage}
            notifications={notifications}
            setNotifications={setNotifications}
            preferenceOptions={preferenceOptions}
            notificationTypes={notificationTypes}
          />
        </div>
        {/* Usage Chart */}
        <UsageChart usageData={usageData} COLORS={COLORS} />
        {/* Connected Accounts & Security */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <ConnectedAccountsCard connectedAccounts={connectedAccounts} />
          <SecurityPrivacyCard recentLogins={recentLogins} twoFA={twoFA} setTwoFA={setTwoFA} />
        </div>
        {/* Feedback & Legal */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <FeedbackCard feedback={feedback} setFeedback={setFeedback} />
          <AppInfoCard legalLinks={legalLinks} />
        </div>
      </div>
    </div>
  );
}

function SettingsIcon() {
  return <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7zm7.94-2.34a1 1 0 0 0 .26-1.09l-1.07-3.11a1 1 0 0 1 .21-1.09l2.42-2.36a1 1 0 0 0-.13-1.5l-2.88-2.09a1 1 0 0 0-1.18-.06l-2.9 1.68a1 1 0 0 1-1.13 0l-2.9-1.68a1 1 0 0 0-1.18.06l-2.88 2.09a1 1 0 0 0-.13 1.5l2.42 2.36a1 1 0 0 1 .21 1.09l-1.07 3.11a1 1 0 0 0 .26 1.09l2.53 1.84a1 1 0 0 1 .36 1.09l-.48 3.18a1 1 0 0 0 1.45 1.05l2.7-1.44a1 1 0 0 1 1.02 0l2.7 1.44a1 1 0 0 0 1.45-1.05l-.48-3.18a1 1 0 0 1 .36-1.09l2.53-1.84z" /></svg>;
}
