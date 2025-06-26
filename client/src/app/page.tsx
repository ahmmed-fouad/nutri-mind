"use client";
import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import MetricSelector from "@/components/home/MetricSelector";
import FeatureCards from "@/components/home/FeatureCards";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import { healthData } from "@/data/homepageData";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTranslation } from "react-i18next";


export default function HomePage() {
  const { t } = useTranslation("page");
  const [metric, setMetric] = useState("weight");
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [newsletter, setNewsletter] = useState("");

  return (
    <div className="min-h-[95vh] bg-gradient-to-br from-zinc-50 via-white to-blue-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-blue-950 py-10 px-2 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero: Diet AI Chatbot */}
        <HeroSection />

        {/* Dynamic Chart: Health at a Glance */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-primary mb-6">
              {t("health_glance")}
            </h2>
            <MetricSelector metric={metric} setMetric={setMetric} />
          </div>
          <div className="w-full h-80 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={healthData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey={metric}
                  stroke="#34d399"
                  fill="#34d39933"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 8 }}
                  animationDuration={600}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Cards */}
        <FeatureCards />

        {/* How It Works */}
        <HowItWorks />

        {/* Testimonials */}
        <Testimonials />

        {/* ...other sections... */}
      </div>
    </div>
  );
}
