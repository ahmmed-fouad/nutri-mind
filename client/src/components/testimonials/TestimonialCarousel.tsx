import React from "react";

type Testimonial = {
  name: string;
  photo: string;
  quote: string;
  rating: number;
  goal: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
  carousel: number;
  next: () => void;
  prev: () => void;
};

export default function TestimonialCarousel({ testimonials, carousel, next, prev }: TestimonialCarouselProps) {
  return (
    <div className="relative w-full">
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-2 shadow hover:bg-primary/10 transition z-10"
      >
        ❮
      </button>
      <div className="testimonial-card bg-white/70 shadow-lg backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center gap-3 animate-fadeInUp">
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
  );
} 