"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMatch } from "@/context/MatchContext";
import { AnimatePresence, motion } from "framer-motion";
import { AppIcon } from "@/components/icons/app-icon";
import { Megaphone } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface Moment {
  type: string;
  text: string;
}

const TYPE_STYLES: Record<string, string> = {
  "Turning Point": "border-amber-500/40 bg-amber-500/10 text-amber-300",
  "Game Changer": "border-purple-500/40 bg-purple-500/10 text-purple-300",
  "Clutch Moment": "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
  "IPL Drama": "border-red-500/40 bg-red-500/10 text-red-300",
};

export function MomentCards() {
  const { matchState, lastBallEvent, shouldTriggerAI, clearAITrigger, sessionKey } =
    useMatch();
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMoment = useCallback(async () => {
    if (!lastBallEvent) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/moments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matchState, event: lastBallEvent }),
      });
      const data = await res.json();
      if (data.moments?.length) {
        setMoments((prev) =>
          [...data.moments, ...prev].slice(0, 5)
        );
      }
    } catch {
      /* keep existing moments */
    } finally {
      setLoading(false);
      clearAITrigger();
    }
  }, [matchState, lastBallEvent, clearAITrigger]);

  useEffect(() => {
    if (shouldTriggerAI && lastBallEvent) {
      fetchMoment();
    }
  }, [shouldTriggerAI, lastBallEvent, fetchMoment]);

  return (
    <Card key={sessionKey} className="glass-card border-0 bg-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <AppIcon icon={Megaphone} size={17} className="text-amber-400" />
          AI Match Moments
          {loading && (
            <span className="ml-1 text-xs text-cyan-400 animate-pulse">
              …
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 max-h-48 overflow-y-auto">
        {moments.length === 0 ? (
          <p className="text-xs text-slate-500">
            Big moments appear on SIX, FOUR, or WICKET…
          </p>
        ) : (
          <AnimatePresence initial={false}>
            {moments.map((m, i) => (
              <motion.div
                key={`${m.type}-${m.text}-${i}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={`rounded-lg border px-3 py-2 ${TYPE_STYLES[m.type] ?? TYPE_STYLES["IPL Drama"]}`}
              >
                <Badge
                  variant="outline"
                  className="mb-1 border-current/30 text-[10px]"
                >
                  {m.type}
                </Badge>
                <p className="text-sm leading-snug">{m.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </CardContent>
    </Card>
  );
}
