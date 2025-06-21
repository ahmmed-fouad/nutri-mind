"use client";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Plus, Edit, Trash2, CheckCircle, ShoppingBasket, BookOpen, Sparkles, Share2, FileText } from "lucide-react";

const categories = [
  { name: "Produce", color: "#34d399" },
  { name: "Dairy", color: "#60a5fa" },
  { name: "Protein", color: "#fbbf24" },
  { name: "Grains", color: "#a78bfa" },
  { name: "Snacks", color: "#f87171" },
  { name: "Other", color: "#a3a3a3" },
];

const demoItems = [
  { id: 1, name: "Spinach", qty: "2 bags", category: "Produce", bought: false },
  { id: 2, name: "Eggs", qty: "1 dozen", category: "Protein", bought: true },
  { id: 3, name: "Greek Yogurt", qty: "2 cups", category: "Dairy", bought: false },
  { id: 4, name: "Brown Rice", qty: "1kg", category: "Grains", bought: false },
  { id: 5, name: "Almonds", qty: "200g", category: "Snacks", bought: false },
  { id: 6, name: "Avocado", qty: "3", category: "Produce", bought: true },
];

const demoTemplates = [
  { name: "Weekly Basics", items: ["Eggs", "Spinach", "Brown Rice"] },
  { name: "Meal Prep Week", items: ["Chicken Breast", "Quinoa", "Broccoli"] },
];

const smartSuggestions = [
  "Bananas", "Chicken Breast", "Oats", "Carrots"
];

const categoryChartData = categories.map(cat => ({
  name: cat.name,
  value: demoItems.filter(item => item.category === cat.name).length,
}));

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

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-zinc-50 via-white to-green-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-green-950 py-10 px-2 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary flex items-center justify-center gap-2"><ShoppingBasket className="w-8 h-8" /> Grocery List</h1>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto">Plan your healthy shopping and never miss an ingredient.</p>
        </div>
        {/* Add Item & Templates */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex gap-2 flex-1">
            <input
              value={input.name}
              onChange={e => setInput(i => ({ ...i, name: e.target.value }))}
              placeholder="Item name"
              className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base w-32"
            />
            <input
              value={input.qty}
              onChange={e => setInput(i => ({ ...i, qty: e.target.value }))}
              placeholder="Qty"
              className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base w-20"
            />
            <select
              value={input.category}
              onChange={e => setInput(i => ({ ...i, category: e.target.value }))}
              className="px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 text-base"
            >
              {categories.map(cat => <option key={cat.name}>{cat.name}</option>)}
            </select>
            <button onClick={handleAdd} className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"><Plus className="w-4 h-4" /> Add</button>
          </div>
          <div className="flex gap-2 items-center">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm">Templates:</span>
            <select value={templateIdx} onChange={e => setTemplateIdx(Number(e.target.value))} className="rounded-lg px-2 py-1 border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800">
              {demoTemplates.map((t, i) => <option key={t.name} value={i}>{t.name}</option>)}
            </select>
            <button className="ml-2 px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-xs">Load</button>
          </div>
        </div>
        {/* Grocery List */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
          {categories.map(cat => (
            <div key={cat.name} className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                <span className="font-semibold text-lg text-primary">{cat.name}</span>
              </div>
              <div className="flex flex-col gap-2">
                {items.filter(item => item.category === cat.name).length === 0 && <div className="text-xs text-zinc-400">No items</div>}
                {items.filter(item => item.category === cat.name).map(item => (
                  <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg border ${item.bought ? 'bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800' : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-800'} shadow-sm`}>
                    <input type="checkbox" checked={item.bought} onChange={() => handleCheck(item.id)} className="w-5 h-5 accent-primary" />
                    <span className={`font-medium ${item.bought ? 'line-through text-zinc-400' : ''}`}>{item.name}</span>
                    <span className="text-xs text-zinc-500">{item.qty}</span>
                    <button className="ml-auto text-zinc-400 hover:text-primary"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(item.id)} className="text-zinc-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Dynamic Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
          <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2"><PieChart className="w-5 h-5" /> Category Breakdown</h2>
          <div className="w-full h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#34d399"
                  label
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categories[index].color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Smart Suggestions */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-8 mb-12">
          <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5" /> Smart Suggestions</h2>
          <div className="flex flex-wrap gap-3">
            {smartSuggestions.map((s, i) => (
              <span key={i} className="px-4 py-2 rounded-full bg-gradient-to-r from-green-100 via-blue-100 to-yellow-100 dark:from-green-900 dark:via-blue-900 dark:to-yellow-900 text-sm font-semibold shadow">{s}</span>
            ))}
          </div>
        </div>
        {/* Notes & Share/Export */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Notes */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col h-full">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2"><FileText className="w-5 h-5" /> Notes</h3>
            <textarea
              className="w-full min-h-[100px] rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800 p-3 text-base text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              placeholder="Add notes for this week or special instructions..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/90 transition"><FileText className="w-5 h-5" /> Save Note</button>
          </div>
          {/* Share/Export */}
          <div className="flex flex-col items-center justify-center gap-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2"><Share2 className="w-5 h-5" /> Share / Export</h3>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-green-400 text-white font-bold shadow-lg hover:from-primary/90 hover:to-green-500 transition text-lg"><Share2 className="w-6 h-6" /> Export List</button>
          </div>
        </div>
      </div>
    </div>
  );
}
