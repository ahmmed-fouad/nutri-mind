"use client";
import Image from "next/image";

const dummyGroups = [
  { id: 1, name: "Healthy Recipes", desc: "Share and discover healthy recipes.", members: 120, avatar: "/assets/12.png" },
  { id: 2, name: "Fitness Buddies", desc: "Find workout partners and share progress.", members: 80, avatar: "/assets/13.png" },
];
const myGroups = [dummyGroups[0]];

export default function GroupsPage() {
  return (
    <section className="flex flex-col items-center py-10 min-h-[70vh]">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-bold text-primary mb-6">My Groups</h2>
        <div className="flex gap-6 mb-10">
          {myGroups.map(group => (
            <div key={group.id} className="bg-white dark:bg-zinc-900/80 rounded-xl shadow p-6 flex flex-col items-center gap-2 w-64">
              <Image src={group.avatar} alt={group.name} width={48} height={48} className="rounded-full" />
              <div className="font-bold text-lg">{group.name}</div>
              <div className="text-zinc-500 text-sm text-center">{group.desc}</div>
              <div className="text-xs text-zinc-400">{group.members} members</div>
              <button className="btn btn-secondary mt-2">View Group</button>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-primary mb-6">Discover Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dummyGroups.map(group => (
            <div key={group.id} className="bg-white dark:bg-zinc-900/80 rounded-xl shadow p-6 flex flex-col items-center gap-2">
              <Image src={group.avatar} alt={group.name} width={48} height={48} className="rounded-full" />
              <div className="font-bold text-lg">{group.name}</div>
              <div className="text-zinc-500 text-sm text-center">{group.desc}</div>
              <div className="text-xs text-zinc-400">{group.members} members</div>
              <button className="btn btn-primary mt-2">Join</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 