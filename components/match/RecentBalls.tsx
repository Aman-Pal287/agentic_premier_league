"use client";

import { BallChip } from "@/components/match/BallChip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BallOutcome } from "@/lib/types/match";

interface RecentBallsProps {
  balls: BallOutcome[];
  eventKey?: number;
}

export function RecentBalls({ balls, eventKey = 0 }: RecentBallsProps) {
  return (
    <Card className="glass-card border-0 bg-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-300">
          Recent Balls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {balls.length === 0 ? (
            <p className="text-sm text-slate-500">Waiting for live balls…</p>
          ) : (
            balls.map((ball, i) => (
              <BallChip
                key={`${ball}-${i}-${eventKey}`}
                outcome={ball}
                highlight={i === balls.length - 1}
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
