"use client";

export default function SocialHubSettingsPage() {
  return (
    <section className="flex flex-col items-center py-10 min-h-[70vh]">
      <div className="w-full max-w-xl bg-white dark:bg-zinc-900/80 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-8 flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-primary mb-2">Settings</h2>
        <form className="space-y-6">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input className="w-full rounded-lg border px-4 py-2" defaultValue="Jane Doe" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input className="w-full rounded-lg border px-4 py-2" defaultValue="jane@email.com" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Bio</label>
            <textarea className="w-full rounded-lg border px-4 py-2" defaultValue="Nutrition enthusiast. Love to cook and share healthy recipes!" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Privacy</label>
            <select className="w-full rounded-lg border px-4 py-2">
              <option>Public</option>
              <option>Friends Only</option>
              <option>Private</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Notifications</label>
            <div className="flex flex-col gap-2">
              <label><input type="checkbox" defaultChecked /> Email Alerts</label>
              <label><input type="checkbox" defaultChecked /> Push Notifications</label>
              <label><input type="checkbox" /> SMS Alerts</label>
            </div>
          </div>
          <button className="btn btn-primary px-8 py-2 rounded-lg font-semibold shadow mt-4">Save Changes</button>
        </form>
      </div>
    </section>
  );
} 