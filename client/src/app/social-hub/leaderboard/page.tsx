"use client";
import Image from "next/image";

const topUsers = [
  { username: "janedoe", name: "Jane Doe", avatar: "/assets/12.png", points: 1200, badges: ["🥇", "🏆"] },
  { username: "boblee", name: "Bob Lee", avatar: "/assets/13.png", points: 1100, badges: ["🥈"] },
  { username: "alice", name: "Alice Smith", avatar: "/assets/14.png", points: 950, badges: ["🥉"] },
];

export default function LeaderboardPage() {
  return (
    <section className="flex flex-col items-center py-10 min-h-[70vh]">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Leaderboard</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-zinc-500">
              <th className="py-2">#</th>
              <th>User</th>
              <th>Points</th>
              <th>Badges</th>
            </tr>
          </thead>
          <tbody>
            {topUsers.map((user, i) => (
              <tr key={user.username} className="border-b last:border-none">
                <td className="py-2 font-bold">{i + 1}</td>
                <td className="flex items-center gap-3 py-2">
                  <Image src={user.avatar} alt={user.name} width={36} height={36} className="rounded-full" />
                  <span>{user.name}</span>
                </td>
                <td>{user.points}</td>
                <td>{user.badges.join(" ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
} 