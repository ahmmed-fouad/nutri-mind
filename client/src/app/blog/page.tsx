"use client";
import { useState } from "react";
import { useGetBlogPostsQuery } from "@/services/blogApi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { chartData } from "@/data/homepageData";
import BlogPostModal from "@/components/blog/BlogPostModal";

export default function BlogPage() {
  const { data, isLoading, error } = useGetBlogPostsQuery();
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="min-h-[90vh] bg-zinc-50 dark:bg-zinc-900/60 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          Nutrition Blog
        </h1>
        <p className="text-center text-zinc-500 mb-12 max-w-2xl mx-auto text-lg">
          Explore the latest articles on nutrition, healthy eating, and
          wellness. Click any post to read more and see nutrition trends!
        </p>
        {isLoading && (
          <div className="text-center text-lg">Loading blog posts...</div>
        )}
        {error && (
          <div className="text-center text-red-500">
            Failed to load blog posts.
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data?.map((post: any) => (
            <div
              key={post.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col hover:scale-105 transition-transform cursor-pointer group"
              onClick={() => setSelected(post)}
            >
              <img
                src={post.cover_image || "/assets/12.png"}
                alt={post.title}
                className="w-full h-40 object-cover rounded-xl mb-4 group-hover:shadow-xl"
              />
              <h2 className="text-lg font-semibold mb-2 text-primary group-hover:underline line-clamp-2">
                {post.title}
              </h2>
              <div className="text-zinc-500 text-xs mb-1">
                By {post.user?.name || post.user?.username || "Unknown"}
              </div>
              <div className="text-zinc-400 text-xs mb-2">
                {new Date(post.published_at).toLocaleDateString()}
              </div>
              <div className="text-zinc-600 dark:text-zinc-300 text-sm line-clamp-3 mb-2">
                {post.description}
              </div>
              <span className="text-primary text-xs font-medium mt-auto">
                Read More →
              </span>
            </div>
          ))}
        </div>
        {/* Chart section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mt-16 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center text-primary">
            Popular Nutrition Topics
          </h3>
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
        <BlogPostModal
          post={selected}
          onClose={() => setSelected(null)}
          chartData={chartData}
        />
      )}
    </div>
  );
}
