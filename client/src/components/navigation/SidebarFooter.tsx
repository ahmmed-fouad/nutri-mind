import Link from "next/link";
import { LogIn, UserPlus, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SidebarFooterProps {
  user: any;
  expanded: boolean;
  setExpanded: (v: boolean) => void;
}

export default function SidebarFooter({ user, expanded, setExpanded }: SidebarFooterProps) {
  const { t } = useTranslation("sidebar");
  return (
    <div className={expanded ? "pb-5 border-t border-border flex flex-col gap-2 items-center" : "p-3 border-t border-border flex flex-col gap-2 items-center"}>
      {!user ? (
        <>
          <Link
            href="/auth"
            className={expanded ? "flex border w-full items-center gap-3 p-3 text-primary cursor-pointer rounded hover:bg-accent transition-colors" : "flex items-center gap-2 text-primary hover:underline"}
            onClick={() => setExpanded(false)}
          >
            <LogIn className="w-5 h-5" />
            {expanded && <span>{t("login")}</span>}
          </Link>
          <Link
            href="/auth"
            className={expanded ? "flex border w-full items-center gap-3 p-3 text-primary cursor-pointer rounded hover:bg-accent transition-colors" : "flex items-center gap-2 text-primary hover:underline"}
            onClick={() => setExpanded(false)}
          >
            <UserPlus className="w-5 h-5" />
            {expanded && <span>{t("signup")}</span>}
          </Link>
        </>
      ) : (
        <Link
          href="/auth"
          className={expanded ? "flex border w-full items-center gap-3 p-3 text-primary cursor-pointer rounded hover:bg-accent transition-colors text-red-600" : "flex items-center gap-2 text-red-600 hover:underline"}
          onClick={() => setExpanded(false)}
        >
          <LogOut className="w-5 h-5" />
          {expanded && <span>{t("logout")}</span>}
        </Link>
      )}
    </div>
  );
} 