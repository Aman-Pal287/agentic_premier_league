"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMatch } from "@/context/MatchContext";
import { CricketBallLogo } from "@/components/icons/cricket-ball-logo";
import { AppIcon } from "@/components/icons/app-icon";
import { RotateCcw } from "lucide-react";

export function DashboardHeader() {
  const { matchState, isLive, isPaused, resetSimulation } = useMatch();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 neon-border">
            <CricketBallLogo className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">
              MatchMind <span className="text-cyan-400">AI</span>
            </h1>
            <p className="text-xs text-slate-400">IPL Second-Screen Companion</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {matchState.equation && (
            <Badge
              variant="outline"
              className="hidden border-cyan-500/30 text-cyan-300 sm:inline-flex"
            >
              {matchState.equation}
            </Badge>
          )}
          <Badge variant="outline" className="border-amber-500/50 text-amber-400">
            IPL 2025
          </Badge>
          <Badge variant="outline" className="border-[#004ba0]/50 text-blue-300">
            MI vs CSK
          </Badge>
          {matchState.status === "Completed" ? (
            <Badge className="border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
              {matchState.equation ?? "MATCH OVER"}
            </Badge>
          ) : isPaused ? (
            <Badge variant="outline" className="text-amber-400">
              PAUSED
            </Badge>
          ) : isLive ? (
            <Badge className="border-red-500/30 bg-red-500/20 text-red-400 live-pulse">
              <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-500" />
              LIVE
            </Badge>
          ) : null}
          <Button
            size="sm"
            variant="ghost"
            onClick={resetSimulation}
            className="text-slate-500 hover:text-white"
            title="Reset demo"
          >
            <AppIcon icon={RotateCcw} size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
}
