"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import HeaderForum from "@/components/forum/header";
import SidebarForum from "@/components/forum/sidebar";
import PostCardForum from "@/components/forum/postcard";
import PostModalForum from "@/components/forum/postmodal";
import NewPostForum from "@/components/forum/newpost";
import { counters, posts } from "@/data/forumData";


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
    <section className="min-h-[90vh] flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-900/60 px-2">
      <div className="max-w-7xl w-full bg-[var(--darkcard)] bg-white/70 backdrop-blur-lg border border-white/20 p-4 sm:p-8 rounded-3xl shadow-2xl mb-8 animate-fade-in">
        <HeaderForum
          counterAnim={counterAnim}
        />
        {/* Top New Post button for all screens */}
        <button
          className="w-full sm:max-w-xs md:max-w-sm mx-auto mb-6 bg-primary text-[var(--darkcard)] rounded-lg py-3 font-bold text-lg shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <Plus className="w-6 h-6" /> New Post
        </button>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Sidebar */}
          <SidebarForum
            setSelectedCat={setSelectedCat}
            selectedCat={selectedCat}
          />
          {/* Main Feed */}
          <main className="flex-1 min-w-0">
            <div className="flex flex-col gap-6">
              <PostCardForum
                setShowPost={setShowPost}
                filteredPosts={filteredPosts}
              />
              {/* Pagination (UI only) */}
              <div className="flex justify-center mt-6">
                <button className="px-6 py-2 rounded-xl font-bold text-lg shadow-lg bg-yellow-400 text-slate-800 hover:bg-yellow-300 transition-colors">
                  Load More
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* Post Modal */}
      {showPost !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center animate-fade-in">
          <PostModalForum showPost={showPost} setShowPost={setShowPost} />
        </div>
      )}
      {/* New Post Modal */}
      {showModal && 
      <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center animate-fade-in">
        <NewPostForum setShowModal={setShowModal} />
    </div>
}
    </section>
  );
}
