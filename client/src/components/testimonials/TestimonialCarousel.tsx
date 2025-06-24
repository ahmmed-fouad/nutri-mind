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
    <div className="w-full flex flex-col md:flex-row md:items-center md:justify-center relative">
      {/* Left arrow (md+) */}
      <button
        onClick={prev}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-3 md:p-2 shadow hover:bg-primary/10 transition z-10 text-2xl md:text-base"
        aria-label="Previous testimonial"
      >
        ❮
      </button>
      {/* Card */}
      <div className="testimonial-card bg-white/70 shadow-lg backdrop-blur-lg rounded-2xl p-4 sm:p-6 flex flex-col items-center gap-3 animate-fadeInUp w-full md:w-auto">
        <img
          src={testimonials[carousel].photo}
          alt={testimonials[carousel].name}
          className="w-20 h-20 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-primary shadow"
        />
        <div className="text-lg font-bold text-primary text-center">
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
        <div className="text-xs text-zinc-400 text-center">
          {testimonials[carousel].goal}
        </div>
      </div>
      {/* Right arrow (md+) */}
      <button
        onClick={next}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-3 md:p-2 shadow hover:bg-primary/10 transition z-10 text-2xl md:text-base"
        aria-label="Next testimonial"
      >
        ❯
      </button>
      {/* Mobile arrows below card */}
      <div className="flex md:hidden justify-center gap-6 mt-4 w-full">
        <button
          onClick={prev}
          className="bg-white/70 rounded-full p-4 shadow hover:bg-primary/10 transition text-2xl"
          aria-label="Previous testimonial"
        >
          ❮
        </button>
        <button
          onClick={next}
          className="bg-white/70 rounded-full p-4 shadow hover:bg-primary/10 transition text-2xl"
          aria-label="Next testimonial"
        >
          ❯
        </button>
      </div>
    </div>
  );
} 