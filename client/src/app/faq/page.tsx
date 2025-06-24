"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { faqs, chartDatFaq, COLORS, formFields } from "@/data/faqData";
import Link from "next/link";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: any) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="min-h-[90vh] bg-zinc-50 dark:bg-zinc-900/60 py-6 px-2 sm:px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center text-primary">
          FAQ & Support
        </h1>
        <p className="text-center text-zinc-500 mb-12 max-w-2xl mx-auto text-base sm:text-lg">
          Find answers to common questions or contact our support team for help.
        </p>
        {/* FAQ Accordion */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-lg sm:text-2xl font-bold mb-6 text-primary">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800"
              >
                <button
                  className="w-full flex justify-between items-center px-4 sm:px-6 py-4 text-left text-base sm:text-lg font-medium text-zinc-700 dark:text-zinc-200 focus:outline-none"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{faq.q}</span>
                  <span
                    className={`transition-transform ${open === i ? "rotate-180" : "rotate-0"}`}
                  >
                    ▼
                  </span>
                </button>
                <div
                  className={`px-4 sm:px-6 pb-4 text-zinc-600 dark:text-zinc-300 text-sm sm:text-base transition-all duration-300 ${
                    open === i
                      ? "max-h-40 opacity-100"
                      : "max-h-0 opacity-0 overflow-hidden"
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Chart section */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 mb-12 sm:mb-16">
          <h3 className="text-lg sm:text-2xl font-bold mb-6 text-center text-primary">
            Most Asked Topics
          </h3>
          <div className="w-full h-56 sm:h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartDatFaq}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#34d399"
                  label
                >
                  {chartDatFaq.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Support Contact Form */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-8 mb-12 sm:mb-16">
          <h3 className="text-lg sm:text-2xl font-bold mb-6 text-center text-primary">
            Contact Support
          </h3>
          <p className="text-center text-zinc-500 mb-6 text-sm sm:text-base">
            Didn't find your answer? Fill out the form below and our team will
            get back to you soon.
          </p>
          <form className="max-w-xl mx-auto space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4">
              {formFields.slice(0, 2).map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`${field.className} px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm w-full`}
                  required={field.required}
                />
              ))}
            </div>
            {formFields
              .slice(2)
              .map((field) =>
                field.type === "textarea" ? (
                  <textarea
                    key={field.name}
                    name={field.name}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`${field.className} px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm w-full`}
                    required={field.required}
                  />
                ) : (
                  <input
                    key={field.name}
                    name={field.name}
                    type={field.type}
                    value={form[field.name as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className={`${field.className} px-4 py-2 rounded-lg border border-border bg-white/80 dark:bg-zinc-900/70 text-base text-foreground placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition hover:border-primary/70 shadow-sm w-full`}
                    required={field.required}
                  />
                )
              )}
            <button
              type="submit"
              className="btn btn-primary w-full py-2 rounded-lg font-semibold text-lg bg-primary text-[var(--darkcard)] shadow-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition"
            >
              Send
            </button>
            {sent && (
              <div className="text-green-600 text-center mt-2">
                Your message has been sent!
              </div>
            )}
          </form>
          <div className="text-center text-zinc-400 text-xs sm:text-sm mt-6">
            Support hours: Mon–Fri, 9am–5pm | Email: {" "}
            <Link
              href="mailto:support@nutrimind.com"
              className="underline text-primary"
            >
              support@nutrimind.com
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
