"use client";
import Image from "next/image";

const dummyChats = [
  { id: 1, name: "Alice Smith", avatar: "/assets/14.png", last: "See you at the gym!", unread: 2 },
  { id: 2, name: "Bob Lee", avatar: "/assets/13.png", last: "Great recipe!", unread: 0 },
];
const dummyMessages = [
  { from: "me", text: "Hey Alice!", time: "09:00" },
  { from: "Alice", text: "See you at the gym!", time: "09:01" },
];

export default function MessagesPage() {
  return (
    <section className="flex min-h-[70vh]">
      <aside className="w-64 bg-zinc-50 dark:bg-zinc-900/80 border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-2">
        <h3 className="font-bold text-lg mb-2">Chats</h3>
        {dummyChats.map(chat => (
          <div key={chat.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/30 cursor-pointer">
            <Image src={chat.avatar} alt={chat.name} width={40} height={40} className="rounded-full" />
            <div className="flex-1">
              <div className="font-semibold">{chat.name}</div>
              <div className="text-xs text-zinc-400">{chat.last}</div>
            </div>
            {chat.unread > 0 && <span className="bg-primary text-white text-xs rounded-full px-2 py-0.5 font-bold">{chat.unread}</span>}
          </div>
        ))}
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="flex-1 p-6 flex flex-col gap-4">
          {dummyMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl shadow ${msg.from === "me" ? "bg-primary text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"}`}>
                {msg.text}
                <div className="text-xs text-right mt-1 opacity-70">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 flex gap-2">
          <input className="flex-1 rounded-lg border px-4 py-2" placeholder="Type a message..." />
          <button className="btn btn-primary px-6 py-2 rounded-lg font-semibold shadow">Send</button>
        </div>
      </main>
    </section>
  );
} 