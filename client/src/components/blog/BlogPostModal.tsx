import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import React from "react";

type BlogPostModalProps = {
  post: any;
  onClose: () => void;
  chartData: any[];
};

export default function BlogPostModal({ post, onClose, chartData }: BlogPostModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 max-w-2xl w-full relative animate-in fade-in overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <img
          src={post.cover_image || "/assets/blog-placeholder.jpg"}
          alt={post.title}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h2 className="text-2xl font-bold text-primary mb-2">
          {post.title}
        </h2>
        <div className="text-zinc-500 text-sm mb-2">
          By {post.user?.name || post.user?.username || "Unknown"} | {new Date(post.published_at).toLocaleDateString()}
        </div>
        <div
          className="text-zinc-600 dark:text-zinc-300 mb-4 whitespace-pre-line"
          style={{ maxHeight: 200, overflowY: "auto" }}
        >
          {post.description}
        </div>
        <a
          href={post.url}
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
                <Bar
                  dataKey="articles"
                  fill="#34d399"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 