import React from 'react'
import { posts, replies } from "@/data/forumData";
import { CornerDownRight } from 'lucide-react';

type PostModalForumProps = {
  showPost: number | null;
  setShowPost: (id: number | null) => void;
};

const PostModalForum: React.FC<PostModalForumProps> = ({ showPost, setShowPost }) => {
  return (
    <div className="bg-red-100/95 p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative">
      <button
        className="absolute top-3 right-3 text-xl"
        onClick={() => setShowPost(null)}
      >
        ×
      </button>
      <div className="flex items-center gap-3 mb-4">
        <img
          src={posts.find((p) => p.id === showPost)?.user.avatar}
          alt={posts.find((p) => p.id === showPost)?.user.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary shadow"
        />
        <span className="font-bold text-primary text-lg">
          {posts.find((p) => p.id === showPost)?.user.name}
        </span>
        <span className="text-xs text-zinc-400 ml-auto">
          {posts.find((p) => p.id === showPost)?.time}
        </span>
      </div>
      <div className="text-2xl font-bold text-primary mb-2">
        {posts.find((p) => p.id === showPost)?.title}
      </div>
      <div className="text-zinc-600 mb-4">
        {posts.find((p) => p.id === showPost)?.content}
      </div>
      <div className="flex gap-2 flex-wrap mb-4">
        {posts
          .find((p) => p.id === showPost)
          ?.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-xs font-semibold shadow"
            >
              {tag}
            </span>
          ))}
      </div>
      <div className="font-bold text-primary mb-2">Replies</div>
      <div className="flex flex-col gap-3">
        {replies.map((r, i) => (
          <div key={i} className="flex items-start gap-3">
            <img
              src={r.user.avatar}
              alt={r.user.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-primary shadow"
            />
            <div>
              <span className="font-bold text-primary text-sm">
                {r.user.name}
              </span>
              <span className="text-xs text-zinc-400 ml-2">{r.time}</span>
              <div className="text-zinc-600 mt-1 flex items-center gap-2">
                <CornerDownRight className="w-4 h-4 text-zinc-400" />{" "}
                {r.content}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form className="mt-6 flex gap-3">
        <input
          type="text"
          placeholder="Write a reply..."
          className="input glassmorphism flex-1"
        />
        <button
          type="button"
          className="btn btn-primary px-4 py-2 rounded-lg font-semibold shadow"
        >
          Reply
        </button>
      </form>
    </div>
  );
};


export default PostModalForum
