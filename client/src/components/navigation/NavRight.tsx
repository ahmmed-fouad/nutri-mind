import { NotificationsDropdown } from "@/components/notifications";
import { SearchIconInput } from "@/components/search";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";

interface NavRightProps {
  lang: string;
  handleLangChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  photoUrl: string | null;
  avatarOnly?: boolean;
  navOnly?: boolean;
}

export default function NavRight({ lang, handleLangChange, theme, toggleTheme, photoUrl, avatarOnly, navOnly }: NavRightProps) {
  if (avatarOnly) {
    return (
      <Link href="/profile" className="block">
        <Image
          src={photoUrl || "/assets/mylogo.png"}
          alt="User avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-primary shadow"
          width={35}
          height={35}
        />
      </Link>
    );
  }
  if (navOnly) {
    return (
      <div className="flex items-center gap-2">
        {/* Language select */}
        <select
          value={lang}
          onChange={handleLangChange}
          className="py-1 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
        {/* Notifications dropdown */}
        <NotificationsDropdown />
        {/* Search icon input */}
        <SearchIconInput />
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
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      {/* Language select */}
      <select
        value={lang}
        onChange={handleLangChange}
        className="py-1 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="en">EN</option>
        <option value="ar">AR</option>
      </select>
      {/* Notifications dropdown */}
      <NotificationsDropdown />
      {/* Search icon input */}
      <SearchIconInput />
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
  );
} 