import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import React from "react";
import Link from "next/link";

type BlogPostModalProps = {
  post: any;
  onClose: () => void;
  chartData: any[];
};

export default function BlogPostModal({
  post,
  onClose,
  chartData,
}: BlogPostModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 max-w-3xl w-full relative animate-in fade-in overflow-y-auto h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute cursor-pointer top-0 right-2 text-zinc-400 hover:text-red-500 text-3xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <img
          src={post.cover_image || "/assets/12.png"}
          alt={post.title}
          className="w-full h-[15rem] object-cover rounded-xl mb-4"
        />
        <div className="p-5">
          <h2 className="text-2xl font-bold text-primary mb-2">{post.title}</h2>
          <div className="flex items-center">
            <div>
              <p className="text-zinc-500 text-sm mb-2">
                By {post.user?.name || post.user?.username || "Unknown"} |{" "}
                {new Date(post.published_at).toLocaleDateString()}
              </p>
              <p
                className="text-zinc-600 dark:text-zinc-300 mb-2 whitespace-pre-line"
                style={{ maxHeight: 200, overflowY: "auto" }}
              >
                {post.description}
              </p>
              <Link
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-semibold underline inline-block"
              >
                Read full article on Dev.to
              </Link>
            </div>
            <div className="w-[75rem] h-[10rem]  text-center">
              <h4 className="font-semibold mb-1">Nutrition Topic Chart</h4>
              <ResponsiveContainer width="100%" height="100%" className="">
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
    </div>
  );
}
