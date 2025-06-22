import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUserForm } from "@/stores/userFormApi";
import { RootState } from "@/stores";
import { supabase } from "@/lib/supabase";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import NavRight from "./NavRight";
import { navbarLinks, socialLinks } from "./navigationData";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState<any>(null);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [socialOpen, setSocialOpen] = useState(false);

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

  return (
    <nav className="w-full bg-background border-b border-border py-4 px-15 flex items-center justify-between">
      <Logo />
      <NavLinks
        navbarLinks={navbarLinks}
        socialLinks={socialLinks}
        socialOpen={socialOpen}
        onSocialEnter={() => setSocialOpen(true)}
        onSocialLeave={() => setSocialOpen(false)}
      />
      <NavRight
        lang={lang}
        handleLangChange={handleLangChange}
        theme={theme}
        toggleTheme={toggleTheme}
        photoUrl={photoUrl}
      />
    </nav>
  );
} 