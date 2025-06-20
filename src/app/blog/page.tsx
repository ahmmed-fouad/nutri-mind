"use client";
import { useState } from "react";
import { useGetBlogPostsQuery } from "@/features/blog";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";

const chartData = [
  { topic: "Protein", articles: 8 },
  { topic: "Carbs", articles: 5 },
  { topic: "Fat", articles: 4 },
  { topic: "Vitamins", articles: 6 },
  { topic: "Hydration", articles: 3 },
];

export default function BlogPage() {
  const { data, isLoading, error } = useGetBlogPostsQuery();
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="min-h-[90vh] bg-zinc-50 dark:bg-zinc-900/60 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">Nutrition Blog</h1>
        <p className="text-center text-zinc-500 mb-12 max-w-2xl mx-auto text-lg">
          Explore the latest articles on nutrition, healthy eating, and wellness. Click any post to read more and see nutrition trends!
        </p>
        {isLoading && <div className="text-center text-lg">Loading blog posts...</div>}
        {error && <div className="text-center text-red-500">Failed to load blog posts.</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.map((post: any) => (
            <div
              key={post.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col hover:scale-105 transition-transform cursor-pointer group"
              onClick={() => setSelected(post)}
            >
              <img
                src={post.cover_image || "/assets/blog-placeholder.jpg"}
                alt={post.title}
                className="w-full h-40 object-cover rounded-xl mb-4 group-hover:shadow-xl"
              />
              <h2 className="text-lg font-semibold mb-2 text-primary group-hover:underline line-clamp-2">{post.title}</h2>
              <div className="text-zinc-500 text-xs mb-1">By {post.user?.name || post.user?.username || "Unknown"}</div>
              <div className="text-zinc-400 text-xs mb-2">{new Date(post.published_at).toLocaleDateString()}</div>
              <div className="text-zinc-600 dark:text-zinc-300 text-sm line-clamp-3 mb-2">{post.description}</div>
              <span className="text-primary text-xs font-medium mt-auto">Read More →</span>
            </div>
          ))}
        </div>
        {/* Chart section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mt-16 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">Popular Nutrition Topics</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="articles" fill="#34d399" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Modal for blog post details */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setSelected(null)}>
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 max-w-2xl w-full relative animate-in fade-in overflow-y-auto max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 text-xl font-bold"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={selected.cover_image || "/assets/blog-placeholder.jpg"}
              alt={selected.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold text-primary mb-2">{selected.title}</h2>
            <div className="text-zinc-500 text-sm mb-2">By {selected.user?.name || selected.user?.username || "Unknown"} | {new Date(selected.published_at).toLocaleDateString()}</div>
            <div className="text-zinc-600 dark:text-zinc-300 mb-4 whitespace-pre-line" style={{ maxHeight: 200, overflowY: 'auto' }}>{selected.description}</div>
            <a
              href={selected.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-semibold underline mb-4 inline-block"
            >
              Read full article on Dev.to
            </a>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Nutrition Topic Chart</h4>
              <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="topic" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="articles" fill="#34d399" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
