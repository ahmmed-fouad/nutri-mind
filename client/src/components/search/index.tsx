import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Search, Home, User, BarChart2, Calculator, UserPlus, Settings, Bot, ListTodo, ShoppingBasket, LayoutDashboard, ShieldUser, UserRound, BookOpen, FileText, LifeBuoy, MessageCircle, Star, Bell } from "lucide-react";

type PageEntry = {
  title: string;
  path: string;
  icon: React.ReactElement;
  content: string[];
};

const pageIndex: PageEntry[] = [
  { title: "Home", path: "/", icon: <Home className="w-5 h-5 text-primary" />, content: ["Welcome to NutriMind!", "Personalized nutrition, AI meal plans, and more."] },
  { title: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="w-5 h-5 text-primary" />, content: ["Your progress at a glance.", "Calories, steps, water, streak, goals, and insights."] },
  { title: "Admin", path: "/admin", icon: <ShieldUser className="w-5 h-5 text-primary" />, content: ["Admin analytics.", "User management, content moderation."] },
  { title: "Profile", path: "/profile", icon: <User className="w-5 h-5 text-primary" />, content: ["Edit your profile.", "Change avatar, update info."] },
  { title: "Progress Tracker", path: "/tracker", icon: <BarChart2 className="w-5 h-5 text-primary" />, content: ["Track your health journey.", "Weight, calories, macros, and more."] },
  { title: "Diet Calculator", path: "/calculator", icon: <Calculator className="w-5 h-5 text-primary" />, content: ["Advanced diet calculator.", "Personalized macros, calories, water."] },
  { title: "User Form", path: "/form", icon: <UserPlus className="w-5 h-5 text-primary" />, content: ["Step-by-step onboarding.", "Tell us about your goals."] },
  { title: "Settings", path: "/settings", icon: <Settings className="w-5 h-5 text-primary" />, content: ["App preferences.", "Theme, notifications, privacy."] },
  { title: "AI Chatbot", path: "/chatbot", icon: <Bot className="w-5 h-5 text-primary" />, content: ["Ask nutrition questions.", "24/7 AI support."] },
  { title: "Habit Tracker", path: "/habits", icon: <ListTodo className="w-5 h-5 text-primary" />, content: ["Build healthy habits.", "Daily streaks, reminders."] },
  { title: "Grocery List", path: "/grocery-list", icon: <ShoppingBasket className="w-5 h-5 text-primary" />, content: ["Smart shopping lists.", "Categorized, meal-linked."] },
  { title: "Recipes", path: "/recipes", icon: <BookOpen className="w-5 h-5 text-primary" />, content: ["Healthy recipes.", "Nutrition info, meal ideas."] },
  { title: "Plans", path: "/plans", icon: <FileText className="w-5 h-5 text-primary" />, content: ["Choose your plan.", "Pricing, features, upgrades."] },
  { title: "Blog", path: "/blog", icon: <FileText className="w-5 h-5 text-primary" />, content: ["Nutrition tips.", "Expert articles, news."] },
  { title: "FAQ", path: "/faq", icon: <LifeBuoy className="w-5 h-5 text-primary" />, content: ["Frequently asked questions.", "Support, help topics."] },
  { title: "Testimonials", path: "/testimonials", icon: <Star className="w-5 h-5 text-primary" />, content: ["Success stories.", "User reviews, ratings."] },
  { title: "Food Scanner", path: "/food-scanner", icon: <ShoppingBasket className="w-5 h-5 text-primary" />, content: ["Scan food or barcode.", "Get instant nutrition facts."] },
  { title: "Forum", path: "/forum", icon: <MessageCircle className="w-5 h-5 text-primary" />, content: ["Community discussions.", "Ask, share, connect."] },
  { title: "Notifications", path: "/notifications", icon: <Bell className="w-5 h-5 text-primary" />, content: ["All your alerts.", "Reminders, achievements, replies."] },
];

function highlightInDOM(term: string) {
  if (!term) return;
  setTimeout(() => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.toLowerCase().includes(term.toLowerCase())) {
        const span = document.createElement("span");
        span.style.background = "#fef08a";
        span.style.borderRadius = "0.3em";
        span.style.padding = "0.1em 0.2em";
        span.textContent = node.nodeValue;
        node.parentNode?.replaceChild(span, node);
        break;
      }
    }
  }, 100);
}

function getSearchResults(query: string, option: string): PageEntry[] {
  if (!query) return [];
  const q = query.toLowerCase();
  if (option === "titles") {
    return pageIndex.filter(p => p.title.toLowerCase().includes(q));
  } else if (option === "content") {
    return pageIndex.filter(p => p.content.some(c => c.toLowerCase().includes(q)));
  } else {
    // all
    return pageIndex.filter(p => p.title.toLowerCase().includes(q) || p.content.some(c => c.toLowerCase().includes(q)));
  }
}

export function SearchInput() {
  const [query, setQuery] = useState("");
  const [option, setOption] = useState("all");
  const [results, setResults] = useState<PageEntry[]>([]);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(-1);

  useEffect(() => {
    if (query) {
      setResults(getSearchResults(query, option));
      setShow(true);
    } else {
      setResults([]);
      setShow(false);
    }
  }, [query, option]);

  const handleKeyDown = (e: any) => {
    if (!show) return;
    if (e.key === "ArrowDown") setActive(a => Math.min(a + 1, results.length - 1));
    if (e.key === "ArrowUp") setActive(a => Math.max(a - 1, 0));
    if (e.key === "Enter" && active >= 0) {
      router.push(`${results[active].path}?search=${encodeURIComponent(query)}`);
      setShow(false);
      setQuery("");
      setActive(-1);
    }
  };

  return (
    <div className="relative w-full max-w-xs">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          className="input glassmorphism w-full"
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setShow(!!query)}
          onBlur={() => setTimeout(() => setShow(false), 150)}
          onKeyDown={handleKeyDown}
        />
        <select
          className="rounded-lg border border-zinc-200 bg-white px-2 text-sm text-zinc-600"
          value={option}
          onChange={e => setOption(e.target.value)}
        >
          <option value="all">All</option>
          <option value="titles">Titles</option>
          <option value="content">Content</option>
        </select>
      </div>
      {show && (
        <div className="absolute left-0 top-full mt-2 w-full bg-white/90 glassmorphism rounded-xl shadow-2xl z-50 animate-fade-in">
          <ul className="divide-y divide-zinc-100">
            {results.length === 0 && <li className="p-4 text-zinc-400">No results found.</li>}
            {results.map((r, i) => (
              <li key={r.path} className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-accent/30 transition-colors ${i === active ? "bg-primary/10" : ""}`}
                onMouseDown={() => {
                  router.push(`${r.path}?search=${encodeURIComponent(query)}`);
                  setShow(false);
                  setQuery("");
                  setActive(-1);
                }}
              >
                {r.icon}
                <span>{r.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <style jsx>{`
        .glassmorphism {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
        }
        .input {
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          background: rgba(255,255,255,0.5);
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        .input:focus {
          border: 1.5px solid #34d399;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export function SearchIconInput() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [option, setOption] = useState("all");
  const [results, setResults] = useState<PageEntry[]>([]);
  const [active, setActive] = useState(-1);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    if (query) {
      setResults(getSearchResults(query, option));
    } else {
      setResults([]);
    }
  }, [query, option]);

  const handleKeyDown = (e: any) => {
    if (!open) return;
    if (e.key === "ArrowDown") setActive(a => Math.min(a + 1, results.length - 1));
    if (e.key === "ArrowUp") setActive(a => Math.max(a - 1, 0));
    if (e.key === "Enter" && active >= 0) {
      router.push(`${results[active].path}?search=${encodeURIComponent(query)}`);
      setOpen(false);
      setQuery("");
      setActive(-1);
    }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="p-2 rounded-full hover:bg-accent transition-colors focus:outline-none"
        aria-label="Search"
        onClick={() => setOpen(o => !o)}
      >
        <Search className="w-6 h-6 text-primary" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white/90 glassmorphism rounded-xl shadow-2xl z-50 animate-fade-in">
          <div className="flex gap-2 p-2">
            <input
              ref={inputRef}
              type="text"
              className="input glassmorphism w-full"
              placeholder="Search..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <select
              className="rounded-lg border border-zinc-200 bg-white px-2 text-sm text-zinc-600"
              value={option}
              onChange={e => setOption(e.target.value)}
            >
              <option value="all">All</option>
              <option value="titles">Titles</option>
              <option value="content">Content</option>
            </select>
          </div>
          {query && (
            <ul className="divide-y divide-zinc-100">
              {results.length === 0 && <li className="p-4 text-zinc-400">No results found.</li>}
              {results.map((r, i) => (
                <li key={r.path} className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-accent/30 transition-colors ${i === active ? "bg-primary/10" : ""}`}
                  onMouseDown={() => {
                    router.push(`${r.path}?search=${encodeURIComponent(query)}`);
                    setOpen(false);
                    setQuery("");
                    setActive(-1);
                  }}
                >
                  {r.icon}
                  <span>{r.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <style jsx>{`
        .glassmorphism {
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(8px);
        }
        .input {
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          background: rgba(255,255,255,0.5);
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        .input:focus {
          border: 1.5px solid #34d399;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// For use in pages: highlightInDOM(searchTerm)
export { highlightInDOM }; 