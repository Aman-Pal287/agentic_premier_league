"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMatch } from "@/context/MatchContext";
import { AppIcon } from "@/components/icons/app-icon";
import { Medal, Pause, Play, RotateCcw } from "lucide-react";

export function SimulationControls() {
  const {
    matchState,
    isPaused,
    eventIndex,
    totalEvents,
    userPoints,
    pauseSimulation,
    resumeSimulation,
    resetSimulation,
  } = useMatch();

  return (
    <Card className="glass-card border-0 bg-transparent">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <AppIcon icon={Medal} size={17} className="text-amber-400" />
          Your Session
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2">
          <span className="text-sm text-slate-400">Points</span>
          <span className="text-2xl font-bold text-amber-400">{userPoints}</span>
        </div>

        <div className="space-y-1 text-sm text-slate-400">
          <p>
            Delivery{" "}
            <span className="font-mono text-cyan-400">
              {eventIndex}/{totalEvents}
            </span>
          </p>
          <p className="text-xs text-slate-500">{matchState.venue}</p>
          <Badge variant="outline" className="mt-1 text-slate-500">
            {matchState.status}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2">
          {isPaused ? (
            <Button
              size="sm"
              variant="outline"
              onClick={resumeSimulation}
              className="flex-1 gap-1 border-cyan-500/30"
            >
              <AppIcon icon={Play} size={15} />
              Resume
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              onClick={pauseSimulation}
              disabled={matchState.status === "Completed"}
              className="flex-1 gap-1"
            >
              <AppIcon icon={Pause} size={15} />
              Pause
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={resetSimulation}
            className="gap-1"
          >
            <AppIcon icon={RotateCcw} size={15} />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
