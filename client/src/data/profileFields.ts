const profileFields = [
  {
    name: "email",
    label: "fields.email",
    type: "email",
    readOnly: true,
    placeholder: "placeholders.email",
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-zinc-100 dark:bg-zinc-800 text-base text-zinc-500 cursor-not-allowed",
  },
  {
    name: "password",
    label: "fields.password",
    type: "password",
    placeholder: "placeholders.password",
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm",
  },
  {
    name: "name",
    label: "fields.name",
    type: "text",
    placeholder: "placeholders.name",
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm",
  },
  {
    name: "age",
    label: "fields.age",
    type: "number",
    placeholder: "placeholders.age",
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm",
  },
  {
    name: "length",
    label: "fields.length",
    type: "number",
    placeholder: "placeholders.length",
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm",
  },
  {
    name: "weight",
    label: "fields.weight",
    type: "number",
    placeholder: "placeholders.weight",
    className:
      "w-full px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm",
  },
];

export default profileFields; 