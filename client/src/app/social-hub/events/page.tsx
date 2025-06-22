"use client";

const dummyEvents = [
  { id: 1, title: "Wellness Webinar", date: "2024-07-10", desc: "Join our expert-led wellness webinar.", rsvp: false },
  { id: 2, title: "Group Run", date: "2024-07-15", desc: "Meet up for a community run in the park.", rsvp: true },
];
const myEvents = [dummyEvents[1]];

export default function EventsPage() {
  return (
    <section className="flex flex-col items-center py-10 min-h-[70vh]">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-primary mb-6">My Events</h2>
        <div className="flex flex-col gap-6 mb-10">
          {myEvents.map(event => (
            <div key={event.id} className="bg-white dark:bg-zinc-900/80 rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="font-bold text-lg">{event.title}</div>
              <div className="text-zinc-500 text-sm">{event.date}</div>
              <div className="text-zinc-400 text-sm">{event.desc}</div>
              <button className="btn btn-secondary mt-2">View Event</button>
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold text-primary mb-6">Upcoming Events</h2>
        <div className="flex flex-col gap-8">
          {dummyEvents.map(event => (
            <div key={event.id} className="bg-white dark:bg-zinc-900/80 rounded-xl shadow p-6 flex flex-col gap-2">
              <div className="font-bold text-lg">{event.title}</div>
              <div className="text-zinc-500 text-sm">{event.date}</div>
              <div className="text-zinc-400 text-sm">{event.desc}</div>
              <button className="btn btn-primary mt-2">{event.rsvp ? "Going" : "RSVP"}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 