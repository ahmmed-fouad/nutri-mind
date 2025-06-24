import React from 'react'
import { categories } from '@/data/forumData';

type NewPostForumProps = {
  setShowModal: (show: boolean) => void;
};

const NewPostForum: React.FC<NewPostForumProps> = ({ setShowModal }) => {
  return (
    <div className="bg-green-200/90 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
      <button
        className="absolute top-3 right-3 text-xl"
        onClick={() => setShowModal(false)}
      >
        ×
      </button>
      <h2 className="text-xl font-bold text-primary mb-4">Create New Post</h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="input glassmorphism"
        />
        <textarea
          placeholder="What's on your mind?"
          className="input glassmorphism min-h-[80px]"
        />
        <div className="flex gap-2 flex-wrap">
          {categories.slice(1).map((cat) => (
            <button
              key={cat.name}
              type="button"
              className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-xs font-semibold shadow"
            >
              {cat.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary py-2 rounded-lg font-semibold shadow"
          onClick={() => setShowModal(false)}
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default NewPostForum
