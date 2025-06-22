"use client";
import Image from "next/image";

const trendingPosts = [
  { id: 1, user: "Jane Doe", avatar: "/assets/12.png", content: "Just finished a 5k run! 🏃‍♀️", likes: 34 },
  { id: 2, user: "Bob Lee", avatar: "/assets/13.png", content: "Try my new salad recipe! 🥗", likes: 21 },
];
const suggestedUsers = [
  { username: "alice", name: "Alice Smith", avatar: "/assets/14.png" },
  { username: "sam", name: "Sam Patel", avatar: "/assets/22.png" },
];
const trendingGroups = [
  { id: 1, name: "Fitness Buddies", members: 80 },
  { id: 2, name: "Healthy Recipes", members: 120 },
];

export default function ExplorePage() {
  return (
    <section className="flex flex-col items-center py-10 min-h-[70vh]">
      <div className="w-full max-w-4xl grid md:grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold text-primary mb-4">Trending Posts</h2>
          <div className="space-y-4">
            {trendingPosts.map(post => (
              <div key={post.id} className="bg-white dark:bg-zinc-900/80 rounded-xl shadow p-4 flex items-center gap-4">
                <Image src={post.avatar} alt={post.user} width={48} height={48} className="rounded-full" />
                <div className="flex-1">
                  <div className="font-semibold">{post.user}</div>
                  <div className="text-zinc-700 dark:text-zinc-200">{post.content}</div>
                </div>
                <span className="text-primary font-bold">👍 {post.likes}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-primary mb-4">Who to Follow</h2>
          <div className="space-y-4 mb-8">
            {suggestedUsers.map(user => (
              <div key={user.username} className="bg-white dark:bg-zinc-900/80 rounded-xl shadow p-4 flex items-center gap-3">
                <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full" />
                <div className="flex-1">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-zinc-400 text-sm">@{user.username}</div>
                </div>
                <button className="btn btn-primary">Follow</button>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-bold text-primary mb-4">Trending Groups</h2>
          <div className="space-y-4">
            {trendingGroups.map(group => (
              <div key={group.id} className="bg-white dark:bg-zinc-900/80 rounded-xl shadow p-4 flex items-center gap-3">
                <div className="flex-1">
                  <div className="font-semibold">{group.name}</div>
                  <div className="text-zinc-400 text-sm">{group.members} members</div>
                </div>
                <button className="btn btn-secondary">Join</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 