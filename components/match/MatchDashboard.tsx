"use client";

import { LiveScoreboard } from "@/components/match/LiveScoreboard";
import { MomentumMeter } from "@/components/match/MomentumMeter";
import { RecentBalls } from "@/components/match/RecentBalls";
import { SimulationControls } from "@/components/match/SimulationControls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMatch } from "@/context/MatchContext";

export function MatchDashboard() {
  const { matchState, eventIndex } = useMatch();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <LiveScoreboard />
          <RecentBalls balls={matchState.recentBalls} eventKey={eventIndex} />
        </div>

        <div className="space-y-4">
          <MomentumMeter recentBalls={matchState.recentBalls} />
          <SimulationControls />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PlaceholderCard title="AI Insights" subtitle="Step 7 — Gemini powered" />
        <PlaceholderCard title="Ball Prediction" subtitle="Step 5 — Predict next ball" />
        <PlaceholderCard title="Live IPL Quiz" subtitle="Step 6 — Earn points" />
        <PlaceholderCard title="Fan Reactions" subtitle="Step 6 — Send emoji" />
        <PlaceholderCard title="AI Moments" subtitle="Step 8 — Turning points" />
        <PlaceholderCard title="Fan Chat" subtitle="Step 8 — Ask the analyst" />
      </div>
    </div>
  );
}

function PlaceholderCard({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <Card className="glass-card border border-dashed border-white/10 bg-transparent opacity-60">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-400">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-600">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
