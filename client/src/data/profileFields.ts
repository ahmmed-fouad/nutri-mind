const profileFields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    readOnly: true,
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-zinc-100 dark:bg-zinc-800 text-base text-zinc-500 cursor-not-allowed",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    placeholder: "Change password",
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm",
  },
  {
    name: "name",
    label: "Name",
    type: "text",
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm",
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm",
  },
  {
    name: "length",
    label: "Length (cm)",
    type: "number",
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm",
  },
  {
    name: "weight",
    label: "Weight (kg)",
    type: "number",
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm",
  },
];

export default profileFields; 