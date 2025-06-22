import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import SidebarNavItems from "./SidebarNavItems";
import SidebarFooter from "./SidebarFooter";
import { navItems } from "./navigationData";
import { Menu } from "lucide-react";

export default function Sidebar() {
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
        <SidebarNavItems navItems={navItems} expanded={false} />
        <SidebarFooter user={user} expanded={false} setExpanded={setExpanded} />
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
            <SidebarNavItems navItems={navItems} expanded={true} onLinkClick={() => setExpanded(false)} />
            <SidebarFooter user={user} expanded={true} setExpanded={setExpanded} />
          </aside>
        </>
      )}
    </>
  );
} 