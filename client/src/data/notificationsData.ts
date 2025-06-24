export const typeColors = ["#34d399", "#60a5fa", "#fbbf24", "#a78bfa", "#f87171"];

export const notificationTypes = [
  { type: "achievement", label: "Achievements", color: typeColors[0], icon: "CheckCircle" },
  { type: "community", label: "Community", color: typeColors[1], icon: "MessageCircle" },
  { type: "feature", label: "Features", color: typeColors[2], icon: "Flame" },
  { type: "reminder", label: "Reminders", color: typeColors[3], icon: "Droplet" },
  { type: "streak", label: "Streaks", color: typeColors[4], icon: "Star" },
];

export const sampleNotifications = [
  { id: 1, type: "achievement", title: "Goal Reached!", message: "You hit your water goal today.", time: "2m ago", unread: true },
  { id: 2, type: "community", title: "Forum Reply", message: "Alice replied to your post.", time: "10m ago", unread: true },
  { id: 3, type: "feature", title: "New Feature", message: "Food Scanner is now live!", time: "1h ago", unread: false },
  { id: 4, type: "streak", title: "Streak!", message: "7 days logged in a row.", time: "3h ago", unread: false },
  { id: 5, type: "reminder", title: "Hydration Reminder", message: "Time to drink water.", time: "5h ago", unread: false },
  { id: 6, type: "community", title: "Mention", message: "Bob mentioned you in a comment.", time: "1d ago", unread: false },
  { id: 7, type: "achievement", title: "Protein Goal!", message: "You reached your protein target.", time: "2d ago", unread: false },
]; 