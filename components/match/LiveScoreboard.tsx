"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMatch } from "@/context/MatchContext";
import { getTeam } from "@/lib/mock/ipl-teams";
import { motion } from "framer-motion";
import { AppIcon } from "@/components/icons/app-icon";
import { Landmark, Trophy } from "lucide-react";

export function LiveScoreboard() {
  const { matchState, isLive, isPaused, lastBallEvent } = useMatch();
  const chasing = getTeam(matchState.chasing);
  const defending = getTeam(matchState.defending);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card
        className="glass-card neon-border overflow-hidden border-0 bg-transparent"
        style={{ borderLeftWidth: 4, borderLeftColor: chasing.primary }}
      >
        <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-3 pb-2">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
              <AppIcon icon={Trophy} size={14} />
              {matchState.season}
              <span className="text-slate-600">·</span>
              <AppIcon icon={Landmark} size={14} />
              Wankhede
            </div>
            <CardTitle className="text-lg text-white sm:text-xl">
              {matchState.title}
            </CardTitle>
          </div>
          <MatchStatusBadge
            isLive={isLive}
            isPaused={isPaused}
            status={matchState.status}
            equation={matchState.equation}
          />
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <TeamScoreBlock
              teamShort={chasing.short}
              teamName={chasing.name}
              color={chasing.primary}
              score={matchState.score}
              wickets={matchState.wickets}
              overs={matchState.overs}
              target={matchState.target}
              label="chasing"
            />
            <div className="hidden px-2 text-2xl font-light text-slate-600 sm:block">
              vs
            </div>
            <TeamDefendingBlock
              teamShort={defending.short}
              teamName={defending.name}
              color={defending.primary}
            />
          </div>

          {matchState.equation && (
            <motion.p
              key={matchState.equation}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-4 py-2.5 text-center text-sm font-medium text-cyan-300 sm:text-base"
            >
              {matchState.equation}
            </motion.p>
          )}

          {lastBallEvent && (
            <motion.p
              key={lastBallEvent.commentary}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm leading-relaxed text-slate-300"
            >
              {lastBallEvent.commentary}
            </motion.p>
          )}

          <div className="grid gap-2 sm:grid-cols-3">
            {matchState.batsmen.map((b, i) => (
              <motion.div
                key={b.name}
                layout
                className={`rounded-lg border px-3 py-2.5 text-sm ${
                  i === 0
                    ? "border-cyan-500/30 bg-cyan-500/5"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <p className="text-xs text-slate-500">
                  {i === 0 ? "Striker" : "Non-striker"}
                </p>
                <p className="font-medium text-white">{b.name}</p>
                <p className="text-slate-400">
                  {b.runs}
                  <span className="text-slate-600"> ({b.balls})</span>
                </p>
              </motion.div>
            ))}
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2.5 text-sm sm:col-span-1">
              <p className="text-xs text-slate-500">Bowler</p>
              <p className="font-medium text-white">{matchState.bowler.name}</p>
              <p className="text-amber-400/90">{matchState.bowler.figures}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function TeamScoreBlock({
  teamShort,
  teamName,
  color,
  score,
  wickets,
  overs,
  target,
  label,
}: {
  teamShort: string;
  teamName: string;
  color: string;
  score: number;
  wickets: number;
  overs: string;
  target: number;
  label: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {teamShort}
        </span>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            {label}
          </p>
          <p className="text-sm font-medium text-slate-300">{teamName}</p>
        </div>
      </div>
      <p
        className="text-5xl font-bold tabular-nums tracking-tight transition-all duration-300"
        style={{ color }}
      >
        {score}/{wickets}
      </p>
      <p className="mt-1 text-sm text-slate-400">
        {overs} ov · Target {target}
      </p>
    </div>
  );
}

function TeamDefendingBlock({
  teamShort,
  teamName,
  color,
}: {
  teamShort: string;
  teamName: string;
  color: string;
}) {
  return (
    <div className="text-right">
      <div className="mb-1 flex items-center justify-end gap-2">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            defending
          </p>
          <p className="text-sm font-medium text-slate-300">{teamName}</p>
        </div>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-slate-900"
          style={{ backgroundColor: color }}
        >
          {teamShort}
        </span>
      </div>
      <p className="text-sm text-slate-500">Bowling attack</p>
    </div>
  );
}

function MatchStatusBadge({
  isLive,
  isPaused,
  status,
  equation,
}: {
  isLive: boolean;
  isPaused: boolean;
  status: string;
  equation?: string;
}) {
  if (status === "Completed") {
    return (
      <Badge className="border-emerald-500/40 bg-emerald-500/20 px-3 py-1 text-emerald-300">
        {equation ?? "Match Over"}
      </Badge>
    );
  }
  if (isPaused) {
    return (
      <Badge variant="outline" className="border-amber-500/50 text-amber-400">
        PAUSED
      </Badge>
    );
  }
  if (isLive) {
    return (
      <Badge className="border-red-500/30 bg-red-500/20 text-red-400 live-pulse">
        <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-red-500" />
        LIVE
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-slate-400">
      {status}
    </Badge>
  );
}
