"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FNGData {
  value: string;
  value_classification: string;
  timestamp: string;
}

function getColor(v: number) {
  if (v <= 25) return { text: "text-red-500", bg: "bg-red-500", emoji: "😱" };
  if (v <= 45) return { text: "text-orange-500", bg: "bg-orange-500", emoji: "😰" };
  if (v <= 55) return { text: "text-yellow-500", bg: "bg-yellow-500", emoji: "😐" };
  if (v <= 75) return { text: "text-lime-500", bg: "bg-lime-500", emoji: "😊" };
  return { text: "text-green-500", bg: "bg-green-500", emoji: "🤑" };
}

export default function Home() {
  const [data, setData] = useState<FNGData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://api.alternative.me/fng/?limit=7&format=json");
        const json = await res.json();
        setData(json.data);
        setLoading(false);
      } catch (e) {
        console.error(e);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const today = data[0];
  const val = today ? parseInt(today.value) : 0;
  const { text, bg, emoji } = getColor(val);
  const days = ["Today", "Yesterday", "2 Days", "3 Days", "4 Days", "5 Days", "6 Days"];

  return (
    <div className="min-h-screen bg-[#080c15] text-slate-200">
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-amber-950/15 via-[#080c15] to-blue-950/10" />

      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="border-b border-white/5 backdrop-blur-xl bg-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold text-amber-400">📊 Crypto Sentiment Index</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time market psychology | alternative.me Fear & Greed API</p>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/10 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500">Loading sentiment data...</p>
          </div>
        ) : (
          <>
            {/* Gauge */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-10">
              <div className="relative w-72 h-36 mx-auto mb-6">
                <div className="w-72 h-36 rounded-t-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 relative overflow-hidden">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-26 bg-[#080c15] rounded-t-full" />
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  <p className={`text-6xl font-extrabold ${text}`}>{val}</p>
                </div>
              </div>
              <p className={`text-2xl font-bold ${text}`}>{emoji} {today?.value_classification}</p>
              <p className="text-xs text-slate-500 mt-2">Bitcoin Fear & Greed Index</p>
            </motion.div>

            {/* 7-day cards */}
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-400 rounded-full" />
              7-Day Sentiment Trend
            </h2>
            <div className="grid grid-cols-7 gap-3 mb-10">
              {data.slice(0, 7).map((d, i) => {
                const v = parseInt(d.value);
                const c = getColor(v);
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <Card className={`bg-white/5 border-white/5 ${i === 0 ? "border-amber-500/30 shadow-lg shadow-amber-500/10" : ""}`}>
                      <CardContent className="p-4 text-center">
                        <p className="text-xs text-slate-500 mb-2">{days[i]}</p>
                        <p className={`text-3xl font-extrabold ${c.text}`}>{v}</p>
                        <p className={`text-xs font-semibold mt-1 ${c.text}`}>{d.value_classification}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Indicators */}
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-400 rounded-full" />
              Sentiment Indicators
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Extreme Fear Zone (0-25)", pct: val <= 25 ? 100 : 0, color: "bg-red-500" },
                { name: "Fear Zone (26-45)", pct: val >= 26 && val <= 45 ? 100 : 0, color: "bg-orange-500" },
                { name: "Neutral Zone (46-55)", pct: val >= 46 && val <= 55 ? 100 : 0, color: "bg-yellow-500" },
                { name: "Greed Zone (56-75)", pct: val >= 56 && val <= 75 ? 100 : 0, color: "bg-lime-500" },
                { name: "Extreme Greed (76-100)", pct: val >= 76 ? 100 : 0, color: "bg-green-500" },
                { name: "Market Momentum", pct: Math.min(100, val + 10), color: "bg-purple-500" },
                { name: "Social Sentiment", pct: Math.min(100, val - 5), color: "bg-cyan-500" },
                { name: "Volatility Index", pct: 100 - val, color: "bg-pink-500" },
                { name: "Dominance Trend", pct: val > 50 ? 60 : 40, color: "bg-orange-500" },
              ].map((ind) => (
                <Card key={ind.name} className="bg-white/5 border-white/5">
                  <CardContent className="p-4">
                    <p className="text-sm font-semibold mb-3">{ind.name}</p>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${ind.pct}%` }} transition={{ duration: 1 }} className={`h-full ${ind.color} rounded-full`} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Low</span><span>{ind.pct}%</span><span>High</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="max-w-6xl mx-auto px-6 py-8 text-center text-xs text-slate-600 border-t border-white/5">
        Crypto Sentiment Index &copy; 2026 | Data from alternative.me Fear & Greed API (Free) | Built with Next.js + shadcn/ui
      </footer>
    </div>
  );
}
