import React from "react";

type CountersProps = {
  counters: { label: string; value: number }[];
  counterAnim: number[];
};

export default function Counters({ counters, counterAnim }: CountersProps) {
  return (
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
  );
} 