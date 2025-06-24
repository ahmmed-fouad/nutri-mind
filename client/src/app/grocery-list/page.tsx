"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Plus, Edit, Trash2, ShoppingBasket, BookOpen, Sparkles, Share2, FileText } from "lucide-react";
import { categories, demoItems, demoTemplates, smartSuggestions } from "@/data/groceryListData";
import GroceryHeader from "@/components/grocery-list/GroceryHeader";
import AddItemForm from "@/components/grocery-list/AddItemForm";
import GroceryList from "@/components/grocery-list/GroceryList";
import CategoryChart from "@/components/grocery-list/CategoryChart";
import SmartSuggestions from "@/components/grocery-list/SmartSuggestions";
import NotesSection from "@/components/grocery-list/NotesSection";
import ShareExportSection from "@/components/grocery-list/ShareExportSection";

export default function GroceryListPage() {
  const [items, setItems] = useState(demoItems);
  const [input, setInput] = useState({ name: "", qty: "", category: categories[0].name });
  const [notes, setNotes] = useState("");
  const [templateIdx, setTemplateIdx] = useState(0);

  const handleAdd = () => {
    if (!input.name) return;
    setItems(prev => [
      ...prev,
      { id: Date.now(), name: input.name, qty: input.qty, category: input.category, bought: false },
    ]);
    setInput({ name: "", qty: "", category: categories[0].name });
  };
  const handleCheck = (id: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, bought: !item.bought } : item));
  };
  const handleDelete = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const categoryChartData = categories.map(cat => ({
    name: cat.name,
    value: items.filter(item => item.category === cat.name).length,
  }));

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-zinc-50 via-white to-green-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-green-950 py-6 sm:py-10 px-1 sm:px-2 md:px-6">
      <div className="max-w-5xl mx-auto">
        <GroceryHeader />
        <AddItemForm
          input={input}
          setInput={setInput}
          handleAdd={handleAdd}
          templateIdx={templateIdx}
          setTemplateIdx={setTemplateIdx}
          demoTemplates={demoTemplates}
          categories={categories}
        />
        <GroceryList
          items={items}
          categories={categories}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
        <div className="my-6 sm:my-8">
          <CategoryChart
            categoryChartData={categoryChartData}
            categories={categories}
          />
        </div>
        <div className="mb-6 sm:mb-8">
          <SmartSuggestions smartSuggestions={smartSuggestions} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
          <NotesSection notes={notes} setNotes={setNotes} />
          <ShareExportSection />
        </div>
      </div>
    </div>
  );
}
