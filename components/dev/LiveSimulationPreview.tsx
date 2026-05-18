"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMatch } from "@/context/MatchContext";
import { getTeam } from "@/lib/mock/ipl-teams";
import type { BallOutcome } from "@/lib/types/match";
import { Pause, Play, RotateCcw } from "lucide-react";

export function LiveSimulationPreview() {
  const {
    matchState,
    isLive,
    isPaused,
    eventIndex,
    totalEvents,
    userPoints,
    lastBallEvent,
    pauseSimulation,
    resumeSimulation,
    resetSimulation,
  } = useMatch();

  const chasing = getTeam(matchState.chasing);
  const defending = getTeam(matchState.defending);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="glass-card neon-border border-0 bg-transparent md:col-span-2">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-white">{matchState.title}</CardTitle>
          <div className="flex items-center gap-2">
            {isLive && !isPaused && (
              <Badge className="border-red-500/30 bg-red-500/20 text-red-400 live-pulse">
                <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-500" />
                LIVE
              </Badge>
            )}
            {isPaused && (
              <Badge variant="outline" className="text-amber-400">
                PAUSED
              </Badge>
            )}
            {matchState.status === "Completed" && (
              <Badge className="bg-emerald-500/20 text-emerald-400">
                {matchState.equation}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-end gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {chasing.short} chasing
              </p>
              <p
                className="text-4xl font-bold tabular-nums transition-all duration-300"
                style={{ color: chasing.primary }}
              >
                {matchState.score}/{matchState.wickets}
              </p>
              <p className="text-sm text-slate-400">
                ({matchState.overs} ov) · Target {matchState.target}
              </p>
            </div>
            <div className="text-slate-500">vs</div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {defending.short}
              </p>
              <p
                className="text-lg font-semibold"
                style={{ color: defending.primary }}
              >
                {defending.name}
              </p>
            </div>
          </div>

          {matchState.equation && (
            <p className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300">
              {matchState.equation}
            </p>
          )}

          {lastBallEvent && (
            <p className="animate-in fade-in rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300 duration-300">
              {lastBallEvent.commentary}
            </p>
          )}

          <div className="grid gap-2 sm:grid-cols-2">
            {matchState.batsmen.map((b) => (
              <div
                key={b.name}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
              >
                <span className="font-medium text-white">{b.name}</span>
                <span className="text-slate-400">
                  {" "}
                  {b.runs} ({b.balls})
                </span>
              </div>
            ))}
            <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm">
              <span className="text-slate-500">Bowler · </span>
              <span className="font-medium text-white">
                {matchState.bowler.name}
              </span>
              <span className="text-slate-400"> {matchState.bowler.figures}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {matchState.recentBalls.map((ball, i) => (
              <BallChip key={`${ball}-${i}-${eventIndex}`} outcome={ball} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-0 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white">Simulation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-400">
          <p>
            Ball{" "}
            <span className="font-mono text-cyan-400">
              {eventIndex}/{totalEvents}
            </span>
          </p>
          <p>
            Points: <span className="text-amber-400">{userPoints}</span>
          </p>
          <p className="text-xs text-slate-500">{matchState.venue}</p>

          <div className="flex flex-wrap gap-2">
            {isPaused ? (
              <Button
                size="sm"
                variant="outline"
                onClick={resumeSimulation}
                className="gap-1"
              >
                <Play className="h-3 w-3" /> Resume
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={pauseSimulation}
                disabled={matchState.status === "Completed"}
                className="gap-1"
              >
                <Pause className="h-3 w-3" /> Pause
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={resetSimulation}
              className="gap-1"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </Button>
          </div>

          <p className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-emerald-400">
            Step 3 — Live simulation active
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function BallChip({ outcome }: { outcome: BallOutcome }) {
  const styles: Record<BallOutcome, string> = {
    FOUR: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    SIX: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    WICKET: "bg-red-500/20 text-red-400 border-red-500/30",
    DOT: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    SINGLE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };
  const label =
    outcome === "DOT" ? "·" : outcome === "WICKET" ? "W" : outcome[0];

  return (
    <span
      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-transform duration-200 ${styles[outcome]}`}
    >
      {label}
    </span>
  );
}
