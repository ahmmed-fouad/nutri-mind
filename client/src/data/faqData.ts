//faq
export const faqs = [
  {
    q: "How do I reset my password?",
    a: "Go to your profile page, click 'Change password', and follow the instructions.",
    topic: "Account",
  },
  {
    q: "How do I upgrade my plan?",
    a: "Visit the Plans & Pricing page and click 'Upgrade' on your desired plan.",
    topic: "Plans",
  },
  {
    q: "How do I use the AI Chatbot?",
    a: "Go to the AI Chatbot page from the sidebar and start chatting!",
    topic: "Features",
  },
  {
    q: "Can I share my progress with friends?",
    a: "Yes! Use the social sharing options on your dashboard.",
    topic: "Features",
  },
  {
    q: "How do I contact support?",
    a: "Fill out the support form below or email us at support@nutrimind.com.",
    topic: "Support",
  },
  {
    q: "Is my data private?",
    a: "Yes, your data is securely stored and never shared without your consent.",
    topic: "Account",
  },
];
export const chartDatFaq = [
  { name: "Account", value: 2 },
  { name: "Plans", value: 1 },
  { name: "Features", value: 2 },
  { name: "Support", value: 1 },
];
export const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#f87171"];
export const formFields = [
  {
    name: "name",
    type: "text",
    placeholder: "Your Name",
    required: true,
    className: "w-1/2",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Your Email",
    required: true,
    className: "w-1/2",
  },
  {
    name: "subject",
    type: "text",
    placeholder: "Subject",
    required: true,
    className: "w-full",
  },
  {
    name: "message",
    type: "textarea",
    placeholder: "How can we help you?",
    required: true,
    className: "w-full min-h-[100px]",
  },
];
