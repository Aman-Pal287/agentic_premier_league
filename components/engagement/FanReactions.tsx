"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactionFloat } from "@/components/engagement/ReactionFloat";
import { useMatch } from "@/context/MatchContext";
import { useCallback, useState } from "react";

const REACTIONS = [
  { emoji: "🔥", label: "Fire" },
  { emoji: "😮", label: "Wow" },
  { emoji: "👏", label: "Clap" },
  { emoji: "💀", label: "Dead" },
] as const;

const MAX_FLOATS = 8;

interface FloatItem {
  id: string;
  emoji: string;
  left: number;
}

export function FanReactions() {
  const { sessionKey } = useMatch();
  const [floats, setFloats] = useState<FloatItem[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({
    "🔥": 0,
    "😮": 0,
    "👏": 0,
    "💀": 0,
  });

  const removeFloat = useCallback((id: string) => {
    setFloats((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const sendReaction = (emoji: string) => {
    setCounts((c) => ({ ...c, [emoji]: (c[emoji] ?? 0) + 1 }));

    const id = `${emoji}-${Date.now()}-${Math.random()}`;
    const left = 10 + Math.random() * 70;

    setFloats((prev) => {
      const next = [...prev, { id, emoji, left }];
      return next.length > MAX_FLOATS ? next.slice(-MAX_FLOATS) : next;
    });
  };

  return (
    <Card
      key={sessionKey}
      className="glass-card relative overflow-hidden border-0 bg-transparent"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {floats.map((f) => (
          <ReactionFloat
            key={f.id}
            id={f.id}
            emoji={f.emoji}
            left={f.left}
            onDone={removeFloat}
          />
        ))}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">
          Fan Reactions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {REACTIONS.map(({ emoji, label }) => (
            <Button
              key={emoji}
              variant="outline"
              onClick={() => sendReaction(emoji)}
              className="flex h-auto flex-col gap-1 py-3 text-lg hover:scale-105 transition-transform border-white/10 bg-white/5"
              title={label}
            >
              <span className="text-2xl">{emoji}</span>
              <span className="text-[10px] text-slate-500">{counts[emoji]}</span>
            </Button>
          ))}
        </div>
        <p className="text-center text-xs text-slate-500">
          Send love to your team — reactions float live!
        </p>
      </CardContent>
    </Card>
  );
}
