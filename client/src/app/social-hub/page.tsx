"use client";
import Image from "next/image";
import { useState } from "react";
import { Plus, Smile, X, Send, MessageCircle, Heart, Share2, Bookmark } from "lucide-react";
import { toast } from "sonner";

const initialPosts: Array<{
  id: number;
  user: { name: string; avatar: string };
  content: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  saved: boolean;
  commentsList: Array<{ id: number; user: { name: string; avatar: string }; text: string }>;
  image?: string;
}> = [
  { id: 1, user: { name: "Jane Doe", avatar: "/assets/12.png" }, content: "Just finished a 5k run! 🏃‍♀️", time: "2h ago", likes: 34, comments: 5, shares: 2, liked: false, saved: false, commentsList: [
    { id: 1, user: { name: "Bob Lee", avatar: "/assets/13.png" }, text: "Congrats!" },
    { id: 2, user: { name: "Alice Smith", avatar: "/assets/14.png" }, text: "Awesome!" },
  ], image: undefined },
  { id: 2, user: { name: "Bob Lee", avatar: "/assets/13.png" }, content: "Try my new salad recipe! 🥗", time: "1d ago", likes: 21, comments: 3, shares: 1, liked: false, saved: false, commentsList: [
    { id: 1, user: { name: "Jane Doe", avatar: "/assets/12.png" }, text: "Looks tasty!" },
  ], image: undefined },
];
const trendingTopics = ["#wellness", "#recipes", "#challenge", "#fitness"];
const suggestedUsers = [
  { username: "alice", name: "Alice Smith", avatar: "/assets/14.png" },
  { username: "sam", name: "Sam Patel", avatar: "/assets/22.png" },
];
const emojiList = ["😀", "😂", "😍", "🥗", "🏃‍♀️", "🔥", "👍", "🎉"];

export default function SocialHubFeedPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [postText, setPostText] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [showComments, setShowComments] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");

  // Floating action button
  const Fab = () => (
    <button
      className="fixed bottom-8 right-8 z-50 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition-all flex items-center gap-2"
      onClick={() => setShowPostModal(true)}
      aria-label="New Post"
    >
      <Plus className="w-6 h-6" />
      <span className="hidden md:inline font-semibold">New Post</span>
    </button>
  );

  // Post modal
  const PostModal = () => (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white dark:bg-zinc-900/90 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in-up">
        <button className="absolute top-3 right-3 text-xl" onClick={() => setShowPostModal(false)}><X /></button>
        <h2 className="text-xl font-bold text-primary mb-4">Create Post</h2>
        <textarea
          className="w-full rounded-lg border px-4 py-2 mb-2"
          placeholder="What's on your mind?"
          value={postText}
          onChange={e => setPostText(e.target.value)}
        />
        {image && (
          <div className="mb-2"><img src={image} alt="preview" className="rounded-lg max-h-40 mx-auto" /></div>
        )}
        <div className="flex gap-2 mb-4">
          <button type="button" className="btn btn-secondary flex items-center gap-1" onClick={() => setShowEmojiPicker(v => !v)}><Smile className="w-5 h-5" /> Emoji</button>
          <label className="btn btn-accent cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = ev => setImage(ev.target?.result as string);
                reader.readAsDataURL(file);
              }
            }} />
            Upload Image
          </label>
        </div>
        {showEmojiPicker && (
          <div className="flex flex-wrap gap-2 mb-2 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg animate-fade-in">
            {emojiList.map(emoji => (
              <button key={emoji} className="text-2xl" onClick={() => setPostText(t => t + emoji)}>{emoji}</button>
            ))}
          </div>
        )}
        <button
          className="btn btn-primary w-full py-2 rounded-lg font-semibold shadow mt-2"
          onClick={() => {
            if (!postText.trim() && !image) {
              toast.error("Post cannot be empty!");
              return;
            }
            setPosts([
              {
                id: Date.now(),
                user: { name: "You", avatar: "/assets/mylogo.png" },
                content: postText,
                time: "Just now",
                likes: 0,
                comments: 0,
                shares: 0,
                liked: false,
                saved: false,
                commentsList: [],
                image,
              },
              ...posts,
            ]);
            setPostText("");
            setImage(undefined);
            setShowPostModal(false);
            toast.success("Post created!");
          }}
        >
          Post
        </button>
      </div>
    </div>
  );

  // Comments modal
  const CommentsModal = ({ post }: { post: typeof posts[0] }) => (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white dark:bg-zinc-900/90 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in-up">
        <button className="absolute top-3 right-3 text-xl" onClick={() => setShowComments(null)}><X /></button>
        <h2 className="text-xl font-bold text-primary mb-4">Comments</h2>
        <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
          {post.commentsList.map(c => (
            <div key={c.id} className="flex items-center gap-3">
              <Image src={c.user.avatar} alt={c.user.name} width={32} height={32} className="rounded-full" />
              <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg px-3 py-2 flex-1">
                <span className="font-semibold text-primary">{c.user.name}</span> <span className="text-zinc-700 dark:text-zinc-200">{c.text}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <input
            className="flex-1 rounded-lg border px-4 py-2"
            placeholder="Add a comment..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
          />
          <button
            className="btn btn-primary px-4 py-2 rounded-lg font-semibold shadow"
            onClick={() => {
              if (!commentText.trim()) return;
              setPosts(posts => posts.map(p =>
                p.id === post.id
                  ? { ...p, commentsList: [...p.commentsList, { id: Date.now(), user: { name: "You", avatar: "/assets/mylogo.png" }, text: commentText }], comments: p.comments + 1 }
                  : p
              ));
              setCommentText("");
              toast.success("Comment added!");
            }}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="flex flex-col md:flex-row gap-8 py-10 min-h-[70vh]">
      <Fab />
      {showPostModal && <PostModal />}
      {showComments !== null && <CommentsModal post={posts.find(p => p.id === showComments)!} />}
      <main className="flex-1 max-w-2xl mx-auto">
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white dark:bg-zinc-900/80 rounded-xl shadow p-6 flex gap-4 animate-fade-in-up">
              <Image src={post.user.avatar} alt={post.user.name} width={48} height={48} className="rounded-full" />
              <div className="flex-1">
                <div className="font-semibold">{post.user.name}</div>
                <div className="text-zinc-700 dark:text-zinc-200 mb-2">{post.content}</div>
                {post.image && <img src={post.image} alt="post" className="rounded-lg max-h-60 mb-2" />}
                <div className="flex gap-6 text-sm text-zinc-400 items-center">
                  <span>{post.time}</span>
                  <button
                    className={`flex items-center gap-1 transition-all ${post.liked ? "text-red-500 scale-110" : "hover:text-red-500"}`}
                    onClick={() => {
                      setPosts(posts => posts.map(p =>
                        p.id === post.id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
                      ));
                      toast(post.liked ? "Like removed" : "Liked!");
                    }}
                  >
                    <Heart className="w-4 h-4" fill={post.liked ? "#ef4444" : "none"} /> {post.likes}
                  </button>
                  <button
                    className="flex items-center gap-1 hover:text-blue-500 transition-all"
                    onClick={() => setShowComments(post.id)}
                  >
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </button>
                  <button
                    className="flex items-center gap-1 hover:text-green-500 transition-all"
                    onClick={() => {
                      toast.success("Post shared!");
                      setPosts(posts => posts.map(p =>
                        p.id === post.id ? { ...p, shares: p.shares + 1 } : p
                      ));
                    }}
                  >
                    <Share2 className="w-4 h-4" /> {post.shares}
                  </button>
                  <button
                    className={`flex items-center gap-1 hover:text-yellow-500 transition-all ${post.saved ? "text-yellow-500 scale-110" : ""}`}
                    onClick={() => {
                      setPosts(posts => posts.map(p =>
                        p.id === post.id ? { ...p, saved: !p.saved } : p
                      ));
                      toast(post.saved ? "Removed from saved" : "Saved!");
                    }}
                  >
                    <Bookmark className="w-4 h-4" fill={post.saved ? "#facc15" : "none"} /> Save
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <aside className="w-full md:w-80 flex flex-col gap-8">
        <div className="bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="font-bold text-lg mb-2">Trending Topics</h3>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map(topic => (
              <span key={topic} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">{topic}</span>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6">
          <h3 className="font-bold text-lg mb-2">Who to Follow</h3>
          <div className="flex flex-col gap-4">
            {suggestedUsers.map(user => (
              <div key={user.username} className="flex items-center gap-3">
                <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full" />
                <div className="flex-1">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-zinc-400 text-sm">@{user.username}</div>
                </div>
                <button className="btn btn-primary">Follow</button>
              </div>
            ))}
          </div>
        </div>
      </aside>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </section>
  );
}