import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SocialDropdownProps {
  socialLinks: { href: string; label: string }[];
  open: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function SocialDropdown({ socialLinks, open, onMouseEnter, onMouseLeave }: SocialDropdownProps) {
  const { t } = useTranslation("navbar");
  return (
    <li
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button className="flex items-center cursor-pointer gap-1 px-2 py-1 rounded hover:bg-accent transition-colors focus:outline-none">
        {t("social_dropdown", "Social")} <ChevronDown className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 z-20">
          <ul className="top-full mt-2 w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg z-50">
            {socialLinks.map((slink) => (
              <li key={slink.href}>
                <Link
                  href={slink.href}
                  className="block px-4 py-2 hover:bg-accent/30 transition-colors rounded-lg"
                >
                  {t(`links.${slink.label}`, slink.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
} 