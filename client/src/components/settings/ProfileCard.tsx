import { Lock, User } from "lucide-react";
import React from "react";
import { usageData, COLORS, recentLogins, profileFields, preferenceOptions, notificationTypes, connectedAccounts, legalLinks } from "../../data/settingsData";

type Profile = {
  name: string;
  email: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  photo: string;
};

type ProfileCardProps = {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  photoPreview: string;
  setPhotoPreview: React.Dispatch<React.SetStateAction<string>>;
  handleProfileChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handlePhoto: (e: React.ChangeEvent<HTMLInputElement>) => void;
  profileFields: { label: string; name: keyof Profile; type: string; options?: string[] }[];
};

export default function ProfileCard({
  profile,
  setProfile,
  photoPreview,
  setPhotoPreview,
  handleProfileChange,
  handlePhoto,
  profileFields,
}: ProfileCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 flex flex-col gap-6">
      <h2 className="text-lg sm:text-xl font-bold text-primary mb-2 flex items-center gap-2">
        <User className="w-5 h-5" /> Profile
      </h2>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <img
          src={photoPreview}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-primary shadow"
        />
        <div className="w-full">
          <label className="block text-xs sm:text-sm font-medium mb-1">Change Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhoto}
            className="block text-xs sm:text-sm w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {profileFields.map((field) => (
          <div key={field.name}>
            <label className="block text-xs sm:text-sm mb-1">{field.label}</label>
            {field.type === "select" && field.options ? (
              <select
                name={field.name}
                value={profile[field.name]}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
              >
                {field.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                name={field.name}
                type={field.type}
                value={profile[field.name]}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
              />
            )}
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs sm:text-sm mb-1">Change Password</label>
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
  );
} 