"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { MessageCircle, Users, Hash, Plus, ThumbsUp, CornerDownRight } from "lucide-react";

const accent = "#6366f1";
const categories = [
  { name: "All", icon: Hash },
  { name: "Nutrition", icon: MessageCircle },
  { name: "Recipes", icon: MessageCircle },
  { name: "Progress", icon: MessageCircle },
  { name: "Q&A", icon: MessageCircle },
  { name: "Off-topic", icon: MessageCircle },
];
const counters = [
  { label: "Posts", value: 320 },
  { label: "Users", value: 1240 },
  { label: "Topics", value: 18 },
  { label: "Replies", value: 2100 },
];
const activityData = [
  { day: "Mon", posts: 30 },
  { day: "Tue", posts: 42 },
  { day: "Wed", posts: 38 },
  { day: "Thu", posts: 50 },
  { day: "Fri", posts: 60 },
  { day: "Sat", posts: 55 },
  { day: "Sun", posts: 45 },
];
const users = [
  { name: "Alice", avatar: "/assets/12.png" },
  { name: "Bob", avatar: "/assets/13.png" },
  { name: "Jane", avatar: "/assets/14.png" },
  { name: "Sam", avatar: "/assets/22.png" },
];
const posts = [
  {
    id: 1,
    user: users[0],
    title: "Best high-protein breakfast ideas?",
    content: "What are your favorite quick, high-protein breakfasts?",
    tags: ["Nutrition", "Recipes"],
    time: "2h ago",
    replies: 5,
    likes: 12,
  },
  {
    id: 2,
    user: users[1],
    title: "How do you stay motivated to track progress?",
    content: "I struggle to keep up with my progress tracker. Any tips?",
    tags: ["Progress"],
    time: "4h ago",
    replies: 3,
    likes: 8,
  },
  {
    id: 3,
    user: users[2],
    title: "Favorite healthy snacks for work?",
    content: "Looking for snack ideas that are easy to bring to the office.",
    tags: ["Nutrition", "Q&A"],
    time: "6h ago",
    replies: 7,
    likes: 15,
  },
  {
    id: 4,
    user: users[3],
    title: "Share your transformation story!",
    content: "Let's inspire each other. Post your before/after progress!",
    tags: ["Progress"],
    time: "1d ago",
    replies: 10,
    likes: 22,
  },
];
const replies = [
  {
    user: users[1],
    content: "I love overnight oats with protein powder!",
    time: "1h ago",
  },
  {
    user: users[2],
    content: "Egg muffins are my go-to for busy mornings.",
    time: "30m ago",
  },
];

export default function ForumPage() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [showPost, setShowPost] = useState<null | number>(null);
  const [counterAnim, setCounterAnim] = useState([0, 0, 0, 0]);

  // Animate counters
  useState(() => {
    const interval = setInterval(() => {
      setCounterAnim(prev => prev.map((v, i) => v < counters[i].value ? v + Math.ceil(counters[i].value / 40) : counters[i].value));
    }, 40);
    return () => clearInterval(interval);
  });

  const filteredPosts = selectedCat === "All" ? posts : posts.filter(p => p.tags.includes(selectedCat));

  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-br from-white via-blue-50 to-purple-50 py-10 px-2">
      <div className="max-w-7xl w-full glassmorphism p-8 rounded-3xl shadow-2xl mb-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Community Forum</h1>
          <div className="flex gap-6">
            {counters.map((c, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-primary animate-counter">{counterAnim[i]}</span>
                <span className="text-zinc-500 text-sm font-semibold">{c.label}</span>
              </div>
            ))}
          </div>
          <div className="w-64">
            <ResponsiveContainer width="100%" height={60}>
              <BarChart data={activityData}>
                <XAxis dataKey="day" />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="posts" fill={accent} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-48 flex-shrink-0">
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <button key={cat.name} onClick={() => setSelectedCat(cat.name)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${selectedCat === cat.name ? "bg-primary text-white" : "bg-white/70 text-primary hover:bg-primary/10"}`}>
                  <cat.icon className="w-5 h-5" /> {cat.name}
                </button>
              ))}
            </div>
          </aside>
          {/* Main Feed */}
          <main className="flex-1 min-w-0">
            <div className="flex flex-col gap-6">
              {filteredPosts.map(post => (
                <div key={post.id} className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-2 animate-fade-in-up cursor-pointer hover:scale-[1.01] transition-transform" onClick={() => setShowPost(post.id)}>
                  <div className="flex items-center gap-3 mb-1">
                    <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full object-cover border-2 border-primary shadow" />
                    <span className="font-bold text-primary">{post.user.name}</span>
                    <span className="text-xs text-zinc-400 ml-auto">{post.time}</span>
                  </div>
                  <div className="text-lg font-bold text-primary">{post.title}</div>
                  <div className="text-zinc-600 mb-1">{post.content}</div>
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag, i) => <span key={i} className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-xs font-semibold shadow">{tag}</span>)}
                  </div>
                  <div className="flex gap-4 mt-2 text-zinc-500 text-sm items-center">
                    <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {post.replies} Replies</span>
                    <span className="flex items-center gap-1"><ThumbsUp className="w-4 h-4" /> {post.likes} Likes</span>
                  </div>
                </div>
              ))}
              {/* Pagination (UI only) */}
              <div className="flex justify-center mt-6">
                <button className="btn btn-accent px-6 py-2 rounded-xl font-bold text-lg shadow-lg">Load More</button>
              </div>
            </div>
          </main>
        </div>
        {/* Floating New Post Button */}
        <button className="fixed bottom-10 right-10 z-50 bg-primary text-white rounded-full p-5 shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2" onClick={() => setShowModal(true)}>
          <Plus className="w-6 h-6" /> <span className="hidden md:inline font-bold">New Post</span>
        </button>
      </div>
      {/* Post Modal */}
      {showPost !== null && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center animate-fade-in">
          <div className="glassmorphism p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative">
            <button className="absolute top-3 right-3 text-xl" onClick={() => setShowPost(null)}>×</button>
            <div className="flex items-center gap-3 mb-4">
              <img src={posts.find(p => p.id === showPost)?.user.avatar} alt={posts.find(p => p.id === showPost)?.user.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow" />
              <span className="font-bold text-primary text-lg">{posts.find(p => p.id === showPost)?.user.name}</span>
              <span className="text-xs text-zinc-400 ml-auto">{posts.find(p => p.id === showPost)?.time}</span>
            </div>
            <div className="text-2xl font-bold text-primary mb-2">{posts.find(p => p.id === showPost)?.title}</div>
            <div className="text-zinc-600 mb-4">{posts.find(p => p.id === showPost)?.content}</div>
            <div className="flex gap-2 flex-wrap mb-4">
              {posts.find(p => p.id === showPost)?.tags.map((tag, i) => <span key={i} className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-xs font-semibold shadow">{tag}</span>)}
            </div>
            <div className="font-bold text-primary mb-2">Replies</div>
            <div className="flex flex-col gap-3">
              {replies.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <img src={r.user.avatar} alt={r.user.name} className="w-8 h-8 rounded-full object-cover border-2 border-primary shadow" />
                  <div>
                    <span className="font-bold text-primary text-sm">{r.user.name}</span>
                    <span className="text-xs text-zinc-400 ml-2">{r.time}</span>
                    <div className="text-zinc-600 mt-1 flex items-center gap-2"><CornerDownRight className="w-4 h-4 text-zinc-400" /> {r.content}</div>
                  </div>
                </div>
              ))}
            </div>
            <form className="mt-6 flex gap-3">
              <input type="text" placeholder="Write a reply..." className="input glassmorphism flex-1" />
              <button type="button" className="btn btn-primary px-4 py-2 rounded-lg font-semibold shadow">Reply</button>
            </form>
          </div>
        </div>
      )}
      {/* New Post Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center animate-fade-in">
          <div className="glassmorphism p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
            <button className="absolute top-3 right-3 text-xl" onClick={() => setShowModal(false)}>×</button>
            <h2 className="text-xl font-bold text-primary mb-4">Create New Post</h2>
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Title" className="input glassmorphism" />
              <textarea placeholder="What's on your mind?" className="input glassmorphism min-h-[80px]" />
              <div className="flex gap-2 flex-wrap">
                {categories.slice(1).map(cat => (
                  <button key={cat.name} type="button" className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-xs font-semibold shadow">{cat.name}</button>
                ))}
              </div>
              <button type="button" className="btn btn-primary py-2 rounded-lg font-semibold shadow" onClick={() => setShowModal(false)}>Post</button>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        .glassmorphism {
          background: rgba(255,255,255,0.7);
          box-shadow: 0 8px 32px 0 rgba(31,38,135,0.12);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255,255,255,0.18);
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
          border: 1.5px solid #6366f1;
        }
        .btn-primary {
          background: #6366f1;
          color: white;
        }
        .btn-primary:hover {
          background: #4338ca;
        }
        .btn-accent {
          background: #fbbf24;
          color: #1e293b;
        }
        .btn-accent:hover {
          background: #f59e42;
        }
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
