import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BallOutcome } from "@/lib/types/match";
import {
  INITIAL_MATCH,
  IPL_TEAMS,
  MATCH_EVENTS,
  QUIZ_QUESTIONS,
} from "@/lib/mock";
import { getTeam } from "@/lib/mock/ipl-teams";

export function MockDataPreview() {
  const chasing = getTeam(INITIAL_MATCH.chasing);
  const defending = getTeam(INITIAL_MATCH.defending);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="glass-card neon-border border-0 bg-transparent md:col-span-2">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-white">{INITIAL_MATCH.title}</CardTitle>
          <Badge className="bg-red-500/20 text-red-400">LIVE</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-end gap-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {chasing.short} chasing
              </p>
              <p
                className="text-4xl font-bold tabular-nums"
                style={{ color: chasing.primary }}
              >
                {INITIAL_MATCH.score}/{INITIAL_MATCH.wickets}
              </p>
              <p className="text-sm text-slate-400">
                ({INITIAL_MATCH.overs} ov) · Target {INITIAL_MATCH.target}
              </p>
            </div>
            <div className="text-slate-500">vs</div>
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {defending.short} defending
              </p>
              <p
                className="text-lg font-semibold"
                style={{ color: defending.primary }}
              >
                {defending.name}
              </p>
            </div>
          </div>

          <p className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300">
            {INITIAL_MATCH.equation}
          </p>

          <div className="grid gap-2 sm:grid-cols-2">
            {INITIAL_MATCH.batsmen.map((b) => (
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
                {INITIAL_MATCH.bowler.name}
              </span>
              <span className="text-slate-400">
                {" "}
                {INITIAL_MATCH.bowler.figures}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {INITIAL_MATCH.recentBalls.map((ball, i) => (
              <BallChip key={`${ball}-${i}`} outcome={ball} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-0 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white">Mock Data Loaded</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-400">
          <p>
            <span className="text-cyan-400">{MATCH_EVENTS.length}</span> match
            events queued
          </p>
          <p>
            <span className="text-cyan-400">{QUIZ_QUESTIONS.length}</span> IPL
            quiz questions
          </p>
          <p>
            Teams:{" "}
            <span style={{ color: IPL_TEAMS.MI.primary }}>MI</span> ·{" "}
            <span style={{ color: IPL_TEAMS.CSK.primary }}>CSK</span>
          </p>
          <p className="text-xs text-slate-500">{INITIAL_MATCH.venue}</p>
          <p className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-emerald-400">
            Step 2 complete
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
      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${styles[outcome]}`}
    >
      {label}
    </span>
  );
}
