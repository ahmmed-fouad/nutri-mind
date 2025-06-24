import Link from "next/link";
import SocialDropdown from "./SocialDropdown";
import { usePathname } from "next/navigation";

interface NavLinksProps {
  navbarLinks: { href: string; label: string }[];
  socialLinks: { href: string; label: string }[];
  socialOpen: boolean;
  onSocialEnter: () => void;
  onSocialLeave: () => void;
  vertical?: boolean;
  onLinkClick?: () => void;
}

export default function NavLinks({ navbarLinks, socialLinks, socialOpen, onSocialEnter, onSocialLeave, vertical, onLinkClick }: NavLinksProps) {
  const pathname = usePathname();
  return (
    <ul className={vertical ? "flex flex-col items-center gap-6 text-2xl mt-8" : "flex-1 flex justify-center gap-4 text-lg relative items-center"}>
      {navbarLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href))
                ? `underline underline-offset-8 text-primary font-bold${["/", "/plans", "/faq"].includes(link.href) ? " font-bold" : " flex items-center gap-1"}`
                : `hover:underline hover:underline-offset-8 transition-colors${["/", "/plans", "/faq"].includes(link.href) ? "" : " flex items-center gap-1"}`
            }
            onClick={onLinkClick}
          >
            {link.label}
          </Link>
        </li>
      ))}
      <SocialDropdown
        socialLinks={socialLinks}
        open={socialOpen}
        onMouseEnter={onSocialEnter}
        onMouseLeave={onSocialLeave}
      />
    </ul>
  );
} 