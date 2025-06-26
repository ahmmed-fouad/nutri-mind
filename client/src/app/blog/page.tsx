"use client";
import { useState } from "react";
import { useGetBlogPostsQuery } from "@/services/blogApi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { chartData } from "@/data/homepageData";
import BlogPostModal from "@/components/blog/BlogPostModal";
import { useTranslation } from "react-i18next";

export default function BlogPage() {
  const { t } = useTranslation("blog");
  const { data, isLoading, error } = useGetBlogPostsQuery();
  const [selected, setSelected] = useState<any>(null);

  const translatedData = data?.map((post: any) => ({
    ...post,
    translatedTitle: String(t(`posts.${post.title}`, post.title)),
    translatedDescription: String(t(`posts.${post.description}`, post.description)),
  }));

  return (
    <div className="min-h-[90vh] bg-zinc-50 dark:bg-zinc-900/60 py-6 px-2 sm:px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-primary">
          {t("page_title")}
        </h1>
        <p className="text-center text-zinc-500 mb-12 max-w-2xl mx-auto text-base sm:text-lg">
          {t("page_subtitle")}
        </p>
        {isLoading && (
          <div className="text-center text-lg">{t("loading")}</div>
        )}
        {error && (
          <div className="text-center text-red-500">
            {t("error")}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {translatedData?.map((post: any) => (
            <div
              key={post.id}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col hover:scale-105 transition-transform cursor-pointer group"
              onClick={() => setSelected(post)}
            >
              <img
                src={post.cover_image || "/assets/12.png"}
                alt={post.translatedTitle}
                className="w-full h-40 object-cover rounded-xl mb-4 group-hover:shadow-xl"
              />
              <h2 className="text-lg font-semibold mb-2 text-primary group-hover:underline line-clamp-2">
                {post.translatedTitle}
              </h2>
              <div className="text-zinc-500 text-xs mb-1">
                {t("by")} {post.user?.name || post.user?.username || t("unknown")}
              </div>
              <div className="text-zinc-400 text-xs mb-2">
                {new Date(post.published_at).toLocaleDateString()}
              </div>
              <div className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm line-clamp-3 mb-2">
                {post.translatedDescription}
              </div>
              <span className="text-primary text-xs font-medium mt-auto">
                {t("read_more")}
              </span>
            </div>
          ))}
        </div>
        {/* Chart section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 mt-12 sm:mt-16 mb-12 sm:mb-16">
          <h3 className="text-lg sm:text-2xl font-bold mb-6 text-center text-primary">
            {t("popular_topics")}
          </h3>
          <div className="w-full h-56 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.map(d => ({...d, topic: t(`topics.${d.topic}`, d.topic)}))}>
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
