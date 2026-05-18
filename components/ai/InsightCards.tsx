"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMatch } from "@/context/MatchContext";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export function InsightCards() {
  const { matchState, eventIndex, sessionKey } = useMatch();
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"gemini" | "fallback">("fallback");
  const lastFetchRef = useRef(0);

  const fetchInsights = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchState }),
      });
      const data = await res.json();
      if (data.insights?.length) {
        setInsights(data.insights);
        setSource(data.source ?? "gemini");
      }
    } catch {
      setInsights([
        "MI pushing hard in this Wankhede chase.",
        "Death overs — momentum on a knife edge.",
        "Next over could decide the IPL thriller!",
      ]);
      setSource("fallback");
    } finally {
      setLoading(false);
      lastFetchRef.current = Date.now();
    }
  }, [matchState]);

  useEffect(() => {
    const now = Date.now();
    const elapsed = now - lastFetchRef.current;
    const delay = elapsed >= 30000 ? 0 : Math.min(30000 - elapsed, 2000);

    const t = setTimeout(() => {
      fetchInsights();
    }, delay);

    return () => clearTimeout(t);
  }, [matchState.score, matchState.wickets, eventIndex, fetchInsights]);

  return (
    <Card key={sessionKey} className="glass-card neon-border border-0 bg-transparent">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            AI Match Insights
          </CardTitle>
          {loading ? (
            <Badge variant="outline" className="text-xs animate-pulse text-cyan-400">
              Analyzing…
            </Badge>
          ) : (
            <Badge variant="outline" className="text-[10px] text-slate-500">
              {source === "gemini" ? "Gemini" : "Offline"}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading && insights.length === 0 ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-12 animate-pulse rounded-lg bg-white/5"
              />
            ))}
          </div>
        ) : (
          insights.map((text, i) => (
            <motion.div
              key={`${text}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-lg border border-cyan-500/15 bg-cyan-500/5 px-3 py-2.5 text-sm leading-relaxed text-slate-300"
            >
              {text}
            </motion.div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
