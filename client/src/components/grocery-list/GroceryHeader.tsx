import { ShoppingBasket } from "lucide-react";

export default function GroceryHeader() {
  return (
    <div className="mb-10 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary flex items-center justify-center gap-2">
        <ShoppingBasket className="w-8 h-8" /> Grocery List
      </h1>
      <p className="text-lg text-zinc-500 max-w-2xl mx-auto">
        Plan your healthy shopping and never miss an ingredient.
      </p>
    </div>
  );
} 