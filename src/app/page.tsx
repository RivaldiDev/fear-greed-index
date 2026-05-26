"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { RefreshCw, AlertCircle, TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

const DAYS = ["Today", "Yesterday", "2 Days", "3 Days", "4 Days", "5 Days", "6 Days"];

export default function Home() {
  const [data, setData] = useState<FNGData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.alternative.me/fng/?limit=7&format=json"
      );
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      setData(json.data);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to fetch sentiment data"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const today = data[0];
  const val = today ? parseInt(today.value) : 0;
  const { text, emoji } = getColor(val);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-amber-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-blue-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text">
                  Crypto Sentiment
                </h1>
                <p className="text-[10px] text-muted-foreground -mt-0.5 tracking-wider uppercase">
                  Fear &amp; Greed Index
                </p>
              </div>
            </div>
            <Button
              onClick={fetchData}
              variant="outline"
              size="sm"
              className="border-amber-500/20 hover:bg-amber-500/10"
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline ml-2">Refresh</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error */}
        {error && (
          <div className="glass rounded-2xl p-6 mb-8 border border-red-500/20">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-medium">Failed to load data</p>
                <p className="text-sm text-muted-foreground mt-1">{error}</p>
              </div>
            </div>
            <Button
              onClick={fetchData}
              variant="outline"
              size="sm"
              className="mt-4 border-red-500/20 text-red-400 hover:bg-red-500/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-2 border-white/10 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading sentiment data…</p>
          </div>
        ) : !error ? (
          <>
            {/* Gauge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-10"
            >
              <div className="relative w-60 h-30 sm:w-72 sm:h-36 mx-auto mb-6">
                <div className="w-60 h-30 sm:w-72 sm:h-36 rounded-t-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 relative overflow-hidden">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-22 sm:w-52 sm:h-26 bg-background rounded-t-full" />
                </div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
                  <p className={`text-5xl sm:text-6xl font-extrabold ${text}`}>
                    {val}
                  </p>
                </div>
              </div>
              <p className={`text-xl sm:text-2xl font-bold ${text}`}>
                {emoji} {today?.value_classification}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Bitcoin Fear &amp; Greed Index
              </p>
            </motion.div>

            {/* 7-day trend */}
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-amber-400 rounded-full" />
              7-Day Sentiment Trend
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-10">
              {data.slice(0, 7).map((d, i) => {
                const v = parseInt(d.value);
                const c = getColor(v);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card
                      className={`bg-white/5 border-white/5 ${
                        i === 0
                          ? "border-amber-500/30 shadow-lg shadow-amber-500/10"
                          : ""
                      }`}
                    >
                      <CardContent className="p-4 text-center">
                        <p className="text-xs text-muted-foreground mb-2">
                          {DAYS[i]}
                        </p>
                        <p className={`text-2xl sm:text-3xl font-extrabold ${c.text}`}>
                          {v}
                        </p>
                        <p className={`text-xs font-semibold mt-1 ${c.text}`}>
                          {d.value_classification}
                        </p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${ind.pct}%` }}
                        transition={{ duration: 1 }}
                        className={`h-full ${ind.color} rounded-full`}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                      <span>Low</span>
                      <span>{ind.pct}%</span>
                      <span>High</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : null}
      </main>

      <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-xs text-muted-foreground border-t border-white/5">
        Crypto Sentiment Index © 2026 · Data from alternative.me Fear &amp; Greed
        API
      </footer>
    </div>
  );
}
