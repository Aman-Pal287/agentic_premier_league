"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMatch } from "@/context/MatchContext";
import { PREDICTION_LABELS } from "@/lib/prediction/evaluate";
import type { PredictionChoice } from "@/lib/types/match";
import { motion, AnimatePresence } from "framer-motion";
import { AppIcon } from "@/components/icons/app-icon";
import { ArrowRight, Minus, MoveUpRight, XCircle } from "lucide-react";

const CHOICES: {
  id: PredictionChoice;
  icon: React.ReactNode;
  className: string;
}[] = [
  {
    id: "BOUNDARY",
    icon: <AppIcon icon={MoveUpRight} size={17} />,
    className:
      "border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300",
  },
  {
    id: "WICKET",
    icon: <AppIcon icon={XCircle} size={17} />,
    className: "border-red-500/40 bg-red-500/10 hover:bg-red-500/20 text-red-300",
  },
  {
    id: "DOT",
    icon: <AppIcon icon={Minus} size={17} />,
    className:
      "border-slate-500/40 bg-slate-500/10 hover:bg-slate-500/20 text-slate-300",
  },
  {
    id: "SINGLE",
    icon: <AppIcon icon={ArrowRight} size={17} />,
    className: "border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300",
  },
];

export function BallPrediction() {
  const {
    matchState,
    pendingPrediction,
    predictionFeedback,
    predictionStats,
    submitPrediction,
  } = useMatch();

  const locked = pendingPrediction !== null;
  const disabled = matchState.status !== "Live" || locked;

  return (
    <Card className="glass-card neon-border border-0 bg-transparent">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-slate-300">
            Predict Next Ball
          </CardTitle>
          <Badge variant="outline" className="text-xs text-amber-400">
            {predictionStats.correct}/{predictionStats.total} correct
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-slate-500">
          Pick before the next delivery · Boundary/Wicket = +25 · Others = +10
        </p>

        <div className="grid grid-cols-2 gap-2">
          {CHOICES.map(({ id, icon, className }) => {
            const meta = PREDICTION_LABELS[id];
            const selected = pendingPrediction === id;
            return (
              <Button
                key={id}
                variant="outline"
                disabled={disabled}
                onClick={() => submitPrediction(id)}
                className={`h-auto flex-col gap-1 py-3 transition-all ${className} ${
                  selected ? "ring-2 ring-cyan-400 scale-[1.02]" : ""
                } ${disabled && !selected ? "opacity-50" : ""}`}
              >
                {icon}
                <span className="text-sm font-semibold">{meta.label}</span>
                <span className="text-[10px] opacity-70">{meta.hint}</span>
              </Button>
            );
          })}
        </div>

        {locked && (
          <p className="text-center text-xs text-cyan-400 animate-pulse">
            Locked — waiting for next ball…
          </p>
        )}

        <AnimatePresence mode="wait">
          {predictionFeedback && (
            <motion.div
              key={predictionFeedback.message}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`rounded-lg border px-3 py-2 text-center text-sm ${
                predictionFeedback.correct
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                  : "border-red-500/30 bg-red-500/10 text-red-300"
              }`}
            >
              <p className="font-medium">{predictionFeedback.message}</p>
              {predictionFeedback.correct && (
                <p className="text-xs opacity-80">
                  +{predictionFeedback.points} points
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
