import Link from "next/link";
import SidebarDashboardMenu from "./SidebarDashboardMenu";

interface SidebarNavItemsProps {
  navItems: { href?: string; label: string; icon: any; submenu?: any[] }[];
  expanded: boolean;
  onLinkClick?: () => void;
}

export default function SidebarNavItems({ navItems, expanded, onLinkClick }: SidebarNavItemsProps) {
  return (
    <div className="flex-1 flex flex-col gap-1 mt-4">
      {navItems.map((item, idx) => {
        if (!item.submenu) {
          return (
            <Link
              key={item.href}
              href={item.href!}
              className={
                expanded
                  ? "flex items-center gap-3 p-3 rounded hover:bg-accent transition-colors"
                  : "flex items-center justify-center p-3 rounded hover:bg-accent transition-colors"
              }
              onClick={onLinkClick}
            >
              <item.icon className="w-5 h-5" />
              {expanded && <span>{item.label}</span>}
            </Link>
          );
        } else {
          return <SidebarDashboardMenu key={item.label} expanded={expanded} onLinkClick={onLinkClick} />;
        }
      })}
    </div>
  );
} 