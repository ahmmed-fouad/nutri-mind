import { Hash, MessageCircle } from "lucide-react";

export const accent = "#6366f1";
export const categories = [
  { name: "All", icon: Hash },
  { name: "Nutrition", icon: MessageCircle },
  { name: "Recipes", icon: MessageCircle },
  { name: "Progress", icon: MessageCircle },
  { name: "Q&A", icon: MessageCircle },
  { name: "Off-topic", icon: MessageCircle },
];
export const counters = [
  { label: "Posts", value: 320 },
  { label: "Users", value: 1240 },
  { label: "Topics", value: 18 },
  { label: "Replies", value: 2100 },
];
export const activityData = [
  { day: "Mon", posts: 30 },
  { day: "Tue", posts: 42 },
  { day: "Wed", posts: 38 },
  { day: "Thu", posts: 50 },
  { day: "Fri", posts: 60 },
  { day: "Sat", posts: 55 },
  { day: "Sun", posts: 45 },
];
export const users = [
  { name: "Alice", avatar: "/assets/12.png" },
  { name: "Bob", avatar: "/assets/13.png" },
  { name: "Jane", avatar: "/assets/14.png" },
  { name: "Sam", avatar: "/assets/22.png" },
];
export const posts = [
  {
    id: 1,
    user: users[0],
    title: "Best high-protein breakfast ideas?",
    content: "What are your favorite quick, high-protein breakfasts?",
    tags: ["Nutrition", "Recipes"],
    time: "2h ago",
    replies: 5,
    likes: 12,
  },
  {
    id: 2,
    user: users[1],
    title: "How do you stay motivated to track progress?",
    content: "I struggle to keep up with my progress tracker. Any tips?",
    tags: ["Progress"],
    time: "4h ago",
    replies: 3,
    likes: 8,
  },
  {
    id: 3,
    user: users[2],
    title: "Favorite healthy snacks for work?",
    content: "Looking for snack ideas that are easy to bring to the office.",
    tags: ["Nutrition", "Q&A"],
    time: "6h ago",
    replies: 7,
    likes: 15,
  },
  {
    id: 4,
    user: users[3],
    title: "Share your transformation story!",
    content: "Let's inspire each other. Post your before/after progress!",
    tags: ["Progress"],
    time: "1d ago",
    replies: 10,
    likes: 22,
  },
];
export const replies = [
  {
    user: users[1],
    content: "I love overnight oats with protein powder!",
    time: "1h ago",
  },
  {
    user: users[2],
    content: "Egg muffins are my go-to for busy mornings.",
    time: "30m ago",
  },
]; 