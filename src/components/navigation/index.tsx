"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { User, BarChart2, Settings, Bot, ListTodo, LogOut, Menu, LogIn, UserPlus, Sun, Moon, ShoppingBasket } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserForm } from "@/stores/userFormApi";
import { RootState } from "@/stores";

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState<any>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);
  const userId = user?.email || "";
  const userForm = useSelector((state: RootState) => selectUserForm(state.userForm, userId));

  useEffect(() => {
    if (user?.user_metadata?.avatar_url) {
      setPhotoUrl(user.user_metadata.avatar_url);
    } else if (user?.id) {
      supabase.storage.from("avatars").download(`${user.id}/avatar.jpg`).then(({ data, error }) => {
        if (!error && data) {
          const url = URL.createObjectURL(data);
          setPhotoUrl(url);
        }
      });
    } else {
      setPhotoUrl(null);
    }
  }, [user]);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLangChange = (e: any) => {
    setLang(e.target.value);
    // Optionally: persist language in localStorage or context
  };

  return (
    <nav className="w-full bg-background border-b border-border py-4 pl-22 pr-8 flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="font-bold text-xl flex items-center gap-2">
        <Image
          src="/assets/logo1.png"
          alt="NutriMind Logo"
          width={35}
          height={35}
        />
        <p>NutriMind</p>
      </Link>
      {/* Centered nav links */}
      <ul className="flex-1 flex justify-center gap-8 text-base">
        <li>
          <Link href="/" className={pathname === "/" ? "underline underline-offset-8 text-primary font-semibold" : "hover:underline hover:underline-offset-8 transition-colors"}>Home</Link>
        </li>
        <li>
          <Link href="/recipes" className={pathname.startsWith("/recipes") ? "underline underline-offset-8 text-primary font-semibold" : "hover:underline hover:underline-offset-8 transition-colors"}>Recipes</Link>
        </li>
        <li>
          <Link href="/plans" className={pathname.startsWith("/plans") ? "underline underline-offset-8 text-primary font-semibold" : "hover:underline hover:underline-offset-8 transition-colors"}>Plans</Link>
        </li>
        <li>
          <Link href="/blog" className={pathname.startsWith("/blog") ? "underline underline-offset-8 text-primary font-semibold" : "hover:underline hover:underline-offset-8 transition-colors"}>Blog</Link>
        </li>
        <li>
          <Link href="/faq" className={pathname.startsWith("/faq") ? "underline underline-offset-8 text-primary font-semibold" : "hover:underline hover:underline-offset-8 transition-colors"}>FAQ</Link>
        </li>
      </ul>
      {/* Right section: language, theme, avatar */}
      <div className="flex items-center gap-4">
        {/* Language select */}
        <select
          value={lang}
          onChange={handleLangChange}
          className="px-2 py-1 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-accent transition-colors focus:outline-none"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
        {/* User avatar */}
        <Link href="/profile" className="block">
          <Image
            src={photoUrl || "/assets/mylogo.png"}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border-2 border-primary shadow"
            width={35}
            height={35}
          />
        </Link>
      </div>
    </nav>
  );
}

export function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { href: "/profile", label: "Profile", icon: User },
    { href: "/tracker", label: "Progress Tracker", icon: BarChart2 },
    { href: "/form", label: "User Form", icon: UserPlus },
    { href: "/settings", label: "Settings", icon: Settings },
    { href: "/chatbot", label: "AI Chatbot", icon: Bot },
    { href: "/habits", label: "Habit Tracker", icon: ListTodo },
    { href: "/grocery-list", label: "Grocery List", icon: ShoppingBasket },
    { href: "/admin", label: "Admin", icon: Settings },
  ];
  return (
    <>
      {/* Collapsed sidebar (always visible, just icons) */}
      <aside className="fixed top-0 left-0 h-full bg-background border-r border-border z-40 flex flex-col w-16 items-center">
        <button
          className="p-[26px] focus:outline-none hover:bg-accent border-b border-border cursor-pointer"
          onClick={() => setExpanded(true)}
          aria-label="Expand sidebar"
        >
          <Menu className="w-5 h-5 mx-auto" />
        </button>
        <div className="flex-1 flex flex-col gap-1 mt-4">
          {navItems.map(({ href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-center p-3 rounded hover:bg-accent transition-colors"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
        <div className="p-3 border-t border-border flex flex-col gap-2 items-center">
          {!user ? (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <LogIn className="w-5 h-5" />
                {expanded && <span className="hidden md:inline">Login</span>}
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-2 text-primary hover:underline"
              >
                <UserPlus className="w-5 h-5" />
                {expanded && <span className="hidden md:inline">Sign Up</span>}
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:underline"
            >
              <LogOut className="w-5 h-5" />
              {expanded && <span className="hidden md:inline">Logout</span>}
            </button>
          )}
        </div>
      </aside>
      {/* Expanded sidebar (floats above content) */}
      {expanded && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-50"
            onClick={() => setExpanded(false)}
            aria-label="Sidebar backdrop"
          />
          <aside className="fixed top-0 left-0 h-full w-56 bg-background border-r border-border z-50 flex flex-col shadow-lg animate-in fade-in">
            <button
              className="p-3 focus:outline-none hover:bg-accent border-b border-border"
              onClick={() => setExpanded(false)}
              aria-label="Collapse sidebar"
            >
              <Menu className="w-5 h-5 mx-auto"/>
            </button>
            <div className="flex-1 flex flex-col gap-1 mt-4">
              {navItems.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 p-3 rounded hover:bg-accent transition-colors"
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
            <div className="pb-5 border-t border-border flex flex-col gap-2 items-center">
              {!user ? (
                <>
                  <Link
                    href="/login"
                    className="flex border w-full items-center gap-3 p-3 text-primary cursor-pointer rounded hover:bg-accent transition-colors"
                    onClick={() => setExpanded(false)}
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/signup"
                    className="flex border w-full items-center gap-3 p-3 text-primary cursor-pointer rounded hover:bg-accent transition-colors"
                    onClick={() => setExpanded(false)}
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Sign Up</span>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="flex border w-full items-center gap-3 p-3 text-primary cursor-pointer rounded hover:bg-accent transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border py-6 px-8 flex flex-col items-center gap-2 text-sm text-muted-foreground mt-8 pl-16 md:pl-16">
      <div>© {new Date().getFullYear()} NutriMind. All rights reserved.</div>
      <div className="flex gap-4">
        <Link href="/faq">FAQ</Link>
        <Link href="/support">Support</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </footer>
  );
} 