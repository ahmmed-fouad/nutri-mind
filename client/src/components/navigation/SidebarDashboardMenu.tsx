import Link from "next/link";
import { LayoutDashboard, ShieldUser, UserRound } from "lucide-react";
import { useState as useLocalState } from "react";
import { useTranslation } from "react-i18next";

export default function SidebarDashboardMenu({ expanded, onLinkClick }: { expanded: boolean; onLinkClick?: () => void }) {
  const [open, setOpen] = useLocalState(false);
  const { t, i18n } = useTranslation("sidebar");
  const isRTL = i18n.language === "ar";
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`flex items-center ${
          expanded ? "gap-3 p-3" : "justify-center p-3"
        } rounded hover:bg-accent transition-colors w-full`}
        tabIndex={0}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <LayoutDashboard className="w-5 h-5" />
        {expanded && <span>{t("links.Dashboard")}</span>}
      </button>
      {open && (
        <div className="absolute top-1/2 -translate-y-1/2">
          <div
            className={`left-full z-50 bg-background border border-border 
              rounded-lg shadow-lg min-w-[180px] ${
                isRTL
                  ? expanded
                    ? "mr-[232px]"
                    : "mr-[65px]"
                  : expanded
                    ? "ml-[232px]"
                    : "ml-[65px]"
              }`}
            style={{ minWidth: 180 }}
          >
            <Link
              href="/admin"
              className="flex items-center gap-3 p-3 hover:bg-accent rounded-t-lg transition-colors"
              onClick={onLinkClick}
            >
              <ShieldUser className="w-5 h-5 text-primary" />
              <span>{t("links.Admin")}</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 p-3 hover:bg-accent rounded-b-lg transition-colors"
              onClick={onLinkClick}
            >
              <UserRound className="w-5 h-5 text-primary" />
              <span>{t("links.User Dashboard")}</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 