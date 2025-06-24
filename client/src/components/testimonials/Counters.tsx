import React from "react";

type CountersProps = {
  counters: { label: string; value: number }[];
  counterAnim: number[];
};

export default function Counters({ counters, counterAnim }: CountersProps) {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mt-4 w-full">
      {counters.map((c, i) => (
        <div key={i} className="flex flex-col items-center justify-center p-2">
          <span className="text-2xl sm:text-3xl font-bold text-primary animate-counter">
            {counterAnim[i]}
          </span>
          <span className="text-zinc-500 text-sm font-semibold text-center">
            {c.label}
          </span>
        </div>
      ))}
    </div>
  );
} 