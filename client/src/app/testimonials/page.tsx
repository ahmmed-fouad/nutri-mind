"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const starColors = ["#fbbf24", "#fde68a", "#fef3c7", "#e5e7eb"];
const accentColor = "#6366f1";

const testimonials = [
  {
    name: "Alice Smith",
    photo: "/assets/12.png",
    quote: "The AI meal planner changed my life! I lost 12kg and feel amazing.",
    rating: 5,
    goal: "Lost 12kg",
  },
  {
    name: "Bob Lee",
    photo: "/assets/13.png",
    quote: "Tracking my progress is so easy now. The charts keep me motivated!",
    rating: 5,
    goal: "Built healthy habits",
  },
  {
    name: "Jane Doe",
    photo: "/assets/14.png",
    quote: "Love the healthy recipes and grocery list! My family eats better now.",
    rating: 4,
    goal: "Family nutrition",
  },
  {
    name: "Sam Patel",
    photo: "/assets/22.png",
    quote: "The food scanner is so cool! I always know what I'm eating.",
    rating: 5,
    goal: "Better food choices",
  },
];

const satisfactionData = [
  { name: "5 Stars", value: 75 },
  { name: "4 Stars", value: 20 },
  { name: "3 Stars", value: 4 },
  { name: "2 Stars or less", value: 1 },
];

const counters = [
  { label: "Users Helped", value: 1240 },
  { label: "Kilos Lost", value: 3200 },
  { label: "Meals Planned", value: 9800 },
];

export default function TestimonialsPage() {
  const [carousel, setCarousel] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [counterAnim, setCounterAnim] = useState([0, 0, 0]);

  // Animate counters
  useState(() => {
    const interval = setInterval(() => {
      setCounterAnim(prev => prev.map((v, i) => v < counters[i].value ? v + Math.ceil(counters[i].value / 40) : counters[i].value));
    }, 40);
    return () => clearInterval(interval);
  });

  // Carousel navigation
  const next = () => setCarousel((carousel + 1) % testimonials.length);
  const prev = () => setCarousel((carousel - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-50 py-10 px-2">
      <div className="max-w-4xl w-full glassmorphism p-8 !bg-[var(--darkcard)] rounded-3xl shadow-2xl mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-primary">
          Testimonials
        </h1>
        <p className="text-center text-zinc-500 mb-6">
          See how NutriMind is transforming lives around the world.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6 items-center justify-center">
            <h2 className="text-xl font-bold text-primary mb-2">
              User Satisfaction
            </h2>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={satisfactionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {satisfactionData.map((entry, i) => (
                    <Cell key={i} fill={starColors[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-6 mt-4">
              {counters.map((c, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary animate-counter">
                    {counterAnim[i]}
                  </span>
                  <span className="text-zinc-500 text-sm font-semibold">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center justify-center">
            <h2 className="text-xl font-bold text-primary mb-2">
              What Our Users Say
            </h2>
            <div className="relative w-full">
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-primary/10 transition z-10"
              >
                ❮
              </button>
              <div className="testimonial-card glassmorphism mx-10 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-3 animate-fade-in-up">
                <img
                  src={testimonials[carousel].photo}
                  alt={testimonials[carousel].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow"
                />
                <div className="text-lg font-bold text-primary">
                  {testimonials[carousel].name}
                </div>
                <div className="flex gap-1 mb-1">
                  {[...Array(testimonials[carousel].rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <div className="italic text-zinc-700 text-center">
                  “{testimonials[carousel].quote}”
                </div>
                <div className="text-xs text-zinc-400">
                  {testimonials[carousel].goal}
                </div>
              </div>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-primary/10 transition z-10"
              >
                ❯
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <button
            className="btn btn-accent px-6 py-3 rounded-xl font-bold text-lg shadow-lg"
            onClick={() => setShowModal(true)}
          >
            Add Your Story
          </button>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center animate-fade-in">
          <div className="glassmorphism p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-primary mb-4">
              Share Your Experience
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input glassmorphism"
              />
              <input
                type="text"
                placeholder="Your Goal/Achievement"
                className="input glassmorphism"
              />
              <textarea
                placeholder="Your Story"
                className="input glassmorphism min-h-[80px]"
              />
              <button
                type="button"
                className="btn btn-primary py-2 rounded-lg font-semibold shadow"
                onClick={() => setShowModal(false)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <style jsx>{`
        .glassmorphism {
          background: rgba(255, 255, 255, 0.7);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.12);
          backdrop-filter: blur(8px);
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.18);
        }
        .input {
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          background: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        .input:focus {
          border: 1.5px solid #6366f1;
        }
        .btn-primary {
          background: #6366f1;
          color: white;
        }
        .btn-primary:hover {
          background: #4338ca;
        }
        .btn-accent {
          background: #fbbf24;
          color: #1e293b;
        }
        .btn-accent:hover {
          background: #f59e42;
        }
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
