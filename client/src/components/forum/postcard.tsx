import React from 'react'
import {
  MessageCircle,
  ThumbsUp,
} from "lucide-react";

type User = {
  name: string;
  avatar: string;
};

type Post = {
  id: number;
  user: User;
  title: string;
  content: string;
  tags: string[];
  time: string;
  replies: number;
  likes: number;
};

type PostCardForumProps = {
  filteredPosts: Post[];
  setShowPost: (id: number) => void;
};

const PostCardForum: React.FC<PostCardForumProps> = ({ filteredPosts, setShowPost }) => {
  return (
    <div>
      {filteredPosts.map((post) => (
        <div
          key={post.id}
          className="glassmorphism p-6 rounded-2xl shadow-xl flex flex-col gap-2 animate-fade-in-up cursor-pointer hover:scale-[1.01] transition-transform"
          onClick={() => setShowPost(post.id)}
        >
          <div className="flex items-center gap-3 mb-1">
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-primary shadow"
            />
            <span className="font-bold text-foreground">{post.user.name}</span>
            <span className="text-lg text-foreground ml-auto">{post.time}</span>
          </div>
          <div className="text-lg font-bold text-foreground">{post.title}</div>
          <div className="text-zinc-700 mb-1">{post.content}</div>
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-zinc-700 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-xs font-semibold shadow"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-2 text-zinc-700 text-sm items-center">
            <span className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" /> {post.replies} Replies
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" /> {post.likes} Likes
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostCardForum
