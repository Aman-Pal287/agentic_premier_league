"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPL_TEAMS } from "@/lib/mock/ipl-teams";
import { calculateMomentum } from "@/lib/simulation/momentum";
import type { BallOutcome } from "@/lib/types/match";

interface MomentumMeterProps {
  recentBalls: BallOutcome[];
}

export function MomentumMeter({ recentBalls }: MomentumMeterProps) {
  const { miPercent, cskPercent, label } = calculateMomentum(recentBalls);
  const mi = IPL_TEAMS.MI;
  const csk = IPL_TEAMS.CSK;

  return (
    <Card className="glass-card neon-border border-0 bg-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">
          Match Momentum
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-xs font-semibold">
          <span style={{ color: mi.primary }}>{mi.short}</span>
          <span style={{ color: csk.primary }}>{csk.short}</span>
        </div>

        <div className="relative h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${miPercent}%`,
              background: `linear-gradient(90deg, ${mi.primary}, #22d3ee)`,
            }}
          />
        </div>

        <p className="text-center text-sm font-medium text-cyan-300">{label}</p>
        <div className="flex justify-between text-xs text-slate-500">
          <span>{miPercent}% MI heat</span>
          <span>{cskPercent}% CSK control</span>
        </div>
      </CardContent>
    </Card>
  );
}
