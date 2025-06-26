"use client";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useSelector, useDispatch } from "react-redux";
import { selectUserForm, setUserForm } from "@/stores/userFormApi";
import { RootState } from "@/stores";
import profileFields from "@/data/profileFields";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { t } = useTranslation("profile");
  const [user, setUser] = useState<any>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    // Load local photo from localStorage if present
    const localPhoto = localStorage.getItem("profile_photo_base64");
    if (localPhoto) {
      setPhotoUrl(localPhoto);
    }
  }, []);
  const userId = user?.email || "";
  const userForm = useSelector((state: RootState) => selectUserForm(state.userForm, userId));

  const [form, setForm] = useState({
    name: userForm?.name || "",
    age: userForm?.age || "",
    length: userForm?.length || "",
    weight: userForm?.weight || "",
    password: "",
  });

  useEffect(() => {
    setForm({
      name: userForm?.name || "",
      age: userForm?.age || "",
      length: userForm?.length || "",
      weight: userForm?.weight || "",
      password: "",
    });
  }, [userForm]);

  useEffect(() => {
    if (user?.user_metadata?.avatar_url) {
      setPhotoUrl(user.user_metadata.avatar_url);
    } else if (user?.id) {
      // Try to get from Supabase Storage
      supabase.storage.from("avatars").download(`${user.id}/avatar.jpg`).then(({ data, error }) => {
        if (!error && data) {
          const url = URL.createObjectURL(data);
          setPhotoUrl(url);
        }
      });
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    // Revoke previous object URL if any
    if (photoUrl && photoUrl.startsWith("blob:")) {
      URL.revokeObjectURL(photoUrl);
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPhotoUrl(base64);
      localStorage.setItem("profile_photo_base64", base64);
      setSuccess(t("photo_previewed"));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    // Update password if provided
    if (form.password) {
      const { error } = await supabase.auth.updateUser({ password: form.password });
      if (error) {
        setError(error.message);
        return;
      }
    }
    // Update name in Supabase user metadata
    if (form.name && form.name !== user?.user_metadata?.name) {
      await supabase.auth.updateUser({ data: { name: form.name } });
    }
    // Update Redux form data
    dispatch(setUserForm({
      userId,
      data: {
        ...userForm,
        name: form.name,
        age: Number(form.age),
        length: Number(form.length),
        weight: Number(form.weight),
      },
    }));
    setSuccess(t("profile_updated"));
  };

  if (!user) {
    return <div className="text-center mt-10 text-lg">{t("please_login")}</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] bg-zinc-50 dark:bg-zinc-900/60">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <img
              src={photoUrl || "/assets/avatars/default.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 shadow hover:bg-primary/90 focus:outline-none"
              disabled={uploading}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 4v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handlePhotoUpload}
              disabled={uploading}
            />
          </div>
          <div className="text-zinc-600 dark:text-zinc-300 text-sm mt-1">
            {t("change_photo")}
          </div>
        </div>
        {/* Inputs */}
        {profileFields.map((field) => (
          <div className="flex flex-col gap-2" key={field.name}>
            <label className="font-medium text-zinc-700 dark:text-zinc-200">
              {t(field.label)}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={
                field.name === "email"
                  ? user?.email || ""
                  : form[field.name as keyof typeof form]
              }
              onChange={field.name === "email" ? undefined : handleChange}
              placeholder={t(field.placeholder)}
              readOnly={field.readOnly}
              className={field.className}
            />
          </div>
        ))}
        <button
          type="submit"
          className="btn btn-primary w-full py-2 rounded-lg font-semibold text-lg bg-primary text-[var(--darkcard)] shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
        >
          {t("update_profile")}
        </button>
        {success && (
          <div className="text-green-600 text-center mt-2">{success}</div>
        )}
        {error && <div className="text-red-500 text-center mt-2">{t("error")}</div>}
      </form>
    </section>
  );
}
