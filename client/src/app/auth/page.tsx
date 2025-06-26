"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserForm } from "@/stores/userFormApi";
import { RootState } from "@/stores";
import { toast } from "sonner";
import Link from "next/link";
import { useTranslation } from "react-i18next";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";


export default function AuthPage() {
  const { t } = useTranslation("auth");
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const [msg, setMsg] = useState("");
  const [route, setRoute] = useState("");
  const [situation, setSituation] = useState<null | "logout" | "signup" | "login">(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Detect logout intent from sidebar
  useEffect(() => {
    if (searchParams?.get("logout") === "1") {
      setSituation("logout");
      setMsg("");
      setRoute("");
    }
  }, [searchParams]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const userForm = useSelector((state: RootState) =>
    selectUserForm(state.userForm, email)
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) setError(error.message);
    else {
      setSituation("login");
      if (userForm) {
        setMsg(
          "It's not the 1st time to log in, so you will go to the home page directly."
        );
        setRoute("/");
      }
      else {
        setMsg(
          "Sorry, we lost your form information, so please fill it out again."
        );
        setRoute("/form");
      }
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) setError(error.message);
    else {
      setSituation("signup");
      setSuccess("Check your email to confirm your account.");
      setMsg("Account created! Please confirm your email to continue.");
      setRoute("/form");
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) setError(error.message);
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const { error } = await supabase.auth.signOut();
    if (error) setError(error.message);
    else {
      setSituation(null);
      setMsg("");
      setRoute("");
      router.push("/auth");
    }
    setLoading(false);
  };

  // Render logic for situations
  if (situation === "logout" && user) {
    return (
      <section className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 w-full max-w-md flex flex-col items-center gap-4">
          <div className="text-lg font-semibold">{t("goodbye", { email: user.email })}</div>
          <button
            onClick={handleLogout}
            className="btn btn-primary w-full py-2 rounded-lg font-semibold text-center text-lg bg-primary text-white shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
            disabled={loading}
          >
            {t("logout")}
          </button>
        </div>
      </section>
    );
  }

  if (user && situation === "signup") {
    // After confirmation, show msg and continue to /form, then to /
    return (
      <section className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 w-full max-w-md flex flex-col items-center gap-4">
          <div className="text-lg font-semibold">{t("account_created")}</div>
          <button
            onClick={() => router.push(route)}
            className="btn btn-primary w-full py-2 rounded-lg font-semibold text-center text-lg bg-primary text-white shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
          >
            {t("continue")}
          </button>
        </div>
      </section>
    );
  }

  if (user && situation === "login") {
    return (
      <section className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 w-full max-w-md flex flex-col items-center gap-4">
          <div className="text-lg font-semibold">{t(msg === "Sorry, we lost your form information, so please fill it out again." ? "lost_form" : "not_first_time")}</div>
          <button
            onClick={() => router.push(route)}
            className="btn btn-primary w-full py-2 rounded-lg font-semibold text-center text-lg bg-primary text-white shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
          >
            {t("continue")}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 w-full max-w-md">
        <div className="flex mb-6 gap-2">
          <button
            className={`flex-1 py-2 rounded-lg font-semibold text-lg transition border-b-2 ${
              tab === "login"
                ? "border-primary text-primary"
                : "border-transparent text-zinc-500"
            }`}
            onClick={() => setTab("login")}
          >
            {t("login")}
          </button>
          <button
            className={`flex-1 py-2 rounded-lg font-semibold text-lg transition border-b-2 ${
              tab === "signup"
                ? "border-primary text-primary"
                : "border-transparent text-zinc-500"
            }`}
            onClick={() => setTab("signup")}
          >
            {t("signup")}
          </button>
        </div>
        {tab === "login" ? (
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder={t("placeholders.email")}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder={t("placeholders.password")}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-full py-2 rounded-lg font-semibold text-lg bg-primary text-white shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
              disabled={loading}
            >
              {loading ? t("loading") : t("login")}
            </button>
            <div className="text-center text-zinc-400 text-sm">{t("or")}</div>
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition font-medium"
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                <g>
                  <path
                    d="M44.5 20H24V28.5H36.9C35.2 33.1 30.9 36.5 25.5 36.5C18.6 36.5 13 30.9 13 24C13 17.1 18.6 11.5 25.5 11.5C28.6 11.5 31.4 12.7 33.5 14.7L39.1 9.1C35.5 5.7 30.8 3.5 25.5 3.5C14.7 3.5 6 12.2 6 23C6 33.8 14.7 42.5 25.5 42.5C35.2 42.5 44 34.5 44 24C44 22.7 44.3 21.3 44.5 20Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M6 14.7L13.1 19.6C15.1 15.2 19.9 11.5 25.5 11.5C28.6 11.5 31.4 12.7 33.5 14.7L39.1 9.1C35.5 5.7 30.8 3.5 25.5 3.5C18.6 3.5 13 8.7 13 15.6C13 17.1 13.3 18.5 13.7 19.6Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M25.5 42.5C30.9 42.5 35.2 39.1 36.9 34.5L29.2 28.5C28.1 29.2 26.8 29.5 25.5 29.5C20.1 29.5 15.8 26.1 14.1 21.5L6 26.3C8.6 34.1 16.4 42.5 25.5 42.5Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M44.5 20H24V28.5H36.9C36.2 30.5 34.9 32.2 33.1 33.4L40.1 38.7C43.5 35.7 45.5 30.7 45.5 24C45.5 22.7 45.3 21.3 44.5 20Z"
                    fill="#1976D2"
                  />
                </g>
              </svg>
              {t("continue_with_google")}
            </button>
            {error && <div className="text-red-500 text-sm mt-2">{t("error")}</div>}
            {success && (
              <div className="text-green-600 text-sm mt-2">{t("success")}</div>
            )}
          </form>
        ) : (
          <form className="space-y-4" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder={t("placeholders.name")}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder={t("placeholders.email")}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder={t("placeholders.password")}
              className="w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary w-full py-2 rounded-lg font-semibold text-lg bg-primary text-white shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
              disabled={loading}
            >
              {loading ? t("loading") : t("signup")}
            </button>
            <div className="text-center text-zinc-400 text-sm">{t("or")}</div>
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition font-medium"
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
                <g>
                  <path
                    d="M44.5 20H24V28.5H36.9C35.2 33.1 30.9 36.5 25.5 36.5C18.6 36.5 13 30.9 13 24C13 17.1 18.6 11.5 25.5 11.5C28.6 11.5 31.4 12.7 33.5 14.7L39.1 9.1C35.5 5.7 30.8 3.5 25.5 3.5C14.7 3.5 6 12.2 6 23C6 33.8 14.7 42.5 25.5 42.5C35.2 42.5 44 34.5 44 24C44 22.7 44.3 21.3 44.5 20Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M6 14.7L13.1 19.6C15.1 15.2 19.9 11.5 25.5 11.5C28.6 11.5 31.4 12.7 33.5 14.7L39.1 9.1C35.5 5.7 30.8 3.5 25.5 3.5C18.6 3.5 13 8.7 13 15.6C13 17.1 13.3 18.5 13.7 19.6Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M25.5 42.5C30.9 42.5 35.2 39.1 36.9 34.5L29.2 28.5C28.1 29.2 26.8 29.5 25.5 29.5C20.1 29.5 15.8 26.1 14.1 21.5L6 26.3C8.6 34.1 16.4 42.5 25.5 42.5Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M44.5 20H24V28.5H36.9C36.2 30.5 34.9 32.2 33.1 33.4L40.1 38.7C43.5 35.7 45.5 30.7 45.5 24C45.5 22.7 45.3 21.3 44.5 20Z"
                    fill="#1976D2"
                  />
                </g>
              </svg>
              {t("continue_with_google")}
            </button>
            {error && <div className="text-red-500 text-sm mt-2">{t("error")}</div>}
            {success && (
              <div className="text-green-600 text-sm mt-2">{t("success")}</div>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
