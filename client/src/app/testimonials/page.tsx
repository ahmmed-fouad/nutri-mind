"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { testimonials, satisfactionData, counters, modalFields, starColors } from "../../data/testimonialsData";
import SatisfactionChart from "../../components/testimonials/SatisfactionChart";
import Counters from "../../components/testimonials/Counters";
import TestimonialCarousel from "../../components/testimonials/TestimonialCarousel";
import ModalForm from "../../components/testimonials/ModalForm";

const accentColor = "#6366f1";

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
    <section className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-white via-indigo-50 to-purple-50 py-6 px-2 sm:px-4 md:px-8">
      <div className="max-w-4xl w-full bg-white/70 shadow-lg backdrop-blur-lg rounded-2xl border border-white/20 p-4 sm:p-6 md:p-8 mb-8 animate-fadeIn">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 text-primary">
          Testimonials
        </h1>
        <p className="text-center text-zinc-500 mb-6">
          See how NutriMind is transforming lives around the world.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="flex flex-col gap-6 items-center justify-center">
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">
              User Satisfaction
            </h2>
            <SatisfactionChart satisfactionData={satisfactionData} starColors={starColors} />
            <Counters counters={counters} counterAnim={counterAnim} />
          </div>
          <div className="flex flex-col gap-6 items-center justify-center">
            <h2 className="text-lg sm:text-xl font-bold text-primary mb-2">
              What Our Users Say
            </h2>
            <TestimonialCarousel testimonials={testimonials} carousel={carousel} next={next} prev={prev} />
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="w-full md:w-auto bg-indigo-500 text-white hover:bg-indigo-700 px-6 py-3 rounded-xl font-bold text-lg shadow-lg transition"
            onClick={() => setShowModal(true)}
          >
            Add Your Story
          </button>
        </div>
      </div>
      {showModal && (
        <ModalForm modalFields={modalFields} setShowModal={setShowModal} />
      )}
    </section>
  );
}
