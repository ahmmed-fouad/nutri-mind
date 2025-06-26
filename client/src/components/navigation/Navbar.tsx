import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserForm } from "@/stores/userFormApi";
import { RootState } from "@/stores";
import { supabase } from "@/lib/supabase";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import NavRight from "./NavRight";
import { navbarLinks, socialLinks } from "./navigationData";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState<any>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [socialOpen, setSocialOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("navbar");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);
  const userId = user?.email || "";
  const userForm = useSelector((state: RootState) => selectUserForm(state.userForm, userId));

  useEffect(() => {
    // Check for locally saved profile photo first
    const localPhoto = typeof window !== 'undefined' ? localStorage.getItem("profile_photo_base64") : null;
    if (localPhoto) {
      setPhotoUrl(localPhoto);
      return;
    }
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
    setTheme("light");
    document.documentElement.classList.remove("dark");
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
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <nav className="w-full bg-background border-b border-border py-4 px-4 md:px-8">
      {/* Mobile: Logo and Avatar in one row, menu and NavRight in next line */}
      <div className="block lg:hidden w-full">
        <div className="flex items-center justify-between w-full mb-2">
          <Logo />
          <NavRight
            theme={theme}
            toggleTheme={toggleTheme}
            photoUrl={photoUrl}
            avatarOnly
          />
        </div>
        <div className="flex items-center justify-between w-full relative">
          <button
            ref={menuButtonRef}
            className="p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-dropdown"
          >
            <Menu className="w-7 h-7 mr-2" />
          </button>
          <NavRight
            theme={theme}
            toggleTheme={toggleTheme}
            photoUrl={photoUrl}
            navOnly
          />
          {/* Dropdown menu */}
          {menuOpen && (
            <div
              ref={dropdownRef}
              id="mobile-nav-dropdown"
              className="absolute left-0 top-12 w-56 bg-white dark:bg-zinc-900 shadow-lg rounded-lg z-50 flex flex-col py-2 animate-fade-in"
              role="menu"
            >
              <NavLinks
                navbarLinks={navbarLinks}
                socialLinks={socialLinks}
                socialOpen={socialOpen}
                onSocialEnter={() => setSocialOpen(true)}
                onSocialLeave={() => setSocialOpen(false)}
                vertical
                onLinkClick={() => setMenuOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
      {/* Desktop/Tablet: Current design */}
      <div className="hidden lg:flex items-center justify-between w-full">
        <Logo />
        <NavLinks
          navbarLinks={navbarLinks}
          socialLinks={socialLinks}
          socialOpen={socialOpen}
          onSocialEnter={() => setSocialOpen(true)}
          onSocialLeave={() => setSocialOpen(false)}
        />
        <NavRight

          theme={theme}
          toggleTheme={toggleTheme}
          photoUrl={photoUrl}
        />
      </div>
    </nav>
  );
} 