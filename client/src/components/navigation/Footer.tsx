import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "@/components/search";
import { Twitter, Facebook, Instagram, Linkedin, Github } from "lucide-react";
import { navbarLinks } from "./navigationData";
import { allPages } from "./navigationData";
import Logo from "./Logo";
import { useTranslation } from "react-i18next";

const moreLinks = allPages.filter(p => !navbarLinks.some(n => n.href === p.href));
const socialLinks = [
  { href: "https://twitter.com/", icon: <Twitter className="w-6 h-6" />, label: "Twitter" },
  { href: "https://facebook.com/", icon: <Facebook className="w-6 h-6" />, label: "Facebook" },
  { href: "https://instagram.com/", icon: <Instagram className="w-6 h-6" />, label: "Instagram" },
  { href: "https://linkedin.com/", icon: <Linkedin className="w-6 h-6" />, label: "LinkedIn" },
  { href: "https://github.com/", icon: <Github className="w-6 h-6" />, label: "GitHub" },
];

export default function Footer() {
  const { t } = useTranslation("footer");
  return (
    <footer className="w-full bg-background border-t border-border px-4 sm:px-8 py-8 flex flex-col gap-8 items-center glassmorphism-footer">
      {/* Footer search input */}
      <div className="w-full max-w-lg mx-auto mb-4">
        <SearchInput />
      </div>

      {/* Responsive main content */}
      <div className="w-full max-w-7xl flex flex-col md:flex-col lg:flex-row gap-8 items-center lg:items-start">
        {/* Tablet & up: Branding + Social in a row, links below; Mobile: all stacked */}
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start gap-3 flex-1">
            <Logo size={60} />
            <div className="text-zinc-500 text-sm text-center md:text-left">
              {t("branding")}
            </div>
          </div>
          {/* Social Icons */}
          <div className="flex flex-col items-center md:items-end gap-2 flex-1">
            <p className="font-semibold text-primary mb-2">{t("follow_us")}</p>
            <div className="flex flex-row gap-4">
              {socialLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`social.${s.label}`, s.label)}
                  className="text-zinc-500 hover:text-primary transition-colors hover:scale-110 duration-150"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* All Page Links */}
        <div className="w-full flex flex-col gap-2 items-center">
          <h1 className="font-semibold text-primary mb-2">{t("pages")}</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-2 w-full max-w-md">
            {navbarLinks.concat(moreLinks).map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-zinc-600 hover:text-primary transition-colors text-base font-medium text-center"
              >
                {t(`links.${link.label}`, link.label)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Legal & Info */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-center items-center gap-2 border-t border-zinc-200 pt-4 text-zinc-400">
        <div>© {new Date().getFullYear()} NutriMind. {t("all_rights")}</div>
        <div className="flex gap-2">
          <Link href="/privacy" className="hover:underline">
            {t("privacy_policy")}
          </Link>
          <Link href="/terms" className="hover:underline">
            {t("terms_of_service")}
          </Link>
        </div>
      </div>

      <style jsx>{`
        .glassmorphism-footer {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border-top: 1.5px solid #e5e7eb;
        }
      `}</style>
    </footer>
  );
} 