"use client";
import Image from "next/image";

const dummyUser = {
  username: "janedoe",
  name: "Jane Doe",
  avatar: "/assets/12.png",
  bio: "Nutrition enthusiast. Love to cook and share healthy recipes!",
  stats: { posts: 12, friends: 34, followers: 120 },
  posts: [
    { id: 1, content: "Just made a delicious smoothie! 🍓🥑", time: "2h ago", likes: 10, comments: 2 },
    { id: 2, content: "Excited to join the 30-day wellness challenge!", time: "1d ago", likes: 22, comments: 5 },
  ],
  friends: [
    { username: "boblee", name: "Bob Lee", avatar: "/assets/13.png" },
    { username: "alice", name: "Alice Smith", avatar: "/assets/14.png" },
  ],
};

export default function ProfilePage() {
  return (
    <section className="flex flex-col items-center py-10 min-h-[70vh]">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col items-center gap-6">
        <Image src={dummyUser.avatar} alt={dummyUser.name} width={96} height={96} className="rounded-full border-4 border-primary shadow-lg" />
        <h2 className="text-2xl font-bold text-primary">{dummyUser.name}</h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-center">@{dummyUser.username}</p>
        <p className="text-zinc-500 dark:text-zinc-400 text-center">{dummyUser.bio}</p>
        <div className="flex gap-8 text-center">
          <div><span className="font-bold text-lg">{dummyUser.stats.posts}</span><br/>Posts</div>
          <div><span className="font-bold text-lg">{dummyUser.stats.friends}</span><br/>Friends</div>
          <div><span className="font-bold text-lg">{dummyUser.stats.followers}</span><br/>Followers</div>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-primary px-6 py-2 rounded-lg font-semibold shadow">Add Friend</button>
          <button className="btn btn-accent px-6 py-2 rounded-lg font-semibold shadow">Follow</button>
        </div>
        <div className="w-full mt-8">
          <div className="flex gap-6 border-b pb-2 mb-4">
            <button className="font-semibold text-primary border-b-2 border-primary pb-1">Posts</button>
            <button className="font-semibold text-zinc-500 hover:text-primary">Friends</button>
            <button className="font-semibold text-zinc-500 hover:text-primary">About</button>
          </div>
          <div className="space-y-4">
            {dummyUser.posts.map(post => (
              <div key={post.id} className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4 shadow flex flex-col gap-2">
                <div className="text-zinc-700 dark:text-zinc-200">{post.content}</div>
                <div className="flex gap-4 text-sm text-zinc-400">
                  <span>{post.time}</span>
                  <span>👍 {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 