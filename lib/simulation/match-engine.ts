import type { MatchEvent, MatchState } from "@/lib/types/match";

const T20_BALLS = 120;

export function parseOvers(overs: string): { whole: number; ball: number } {
  const [wholeStr, ballStr] = overs.split(".");
  return {
    whole: parseInt(wholeStr, 10) || 0,
    ball: parseInt(ballStr ?? "0", 10) || 0,
  };
}

export function totalBallsBowled(overs: string): number {
  const { whole, ball } = parseOvers(overs);
  return whole * 6 + ball;
}

export function ballsRemaining(overs: string): number {
  return Math.max(0, T20_BALLS - totalBallsBowled(overs));
}

export function incrementOver(overs: string): string {
  const { whole, ball } = parseOvers(overs);
  const nextBall = ball + 1;
  if (nextBall >= 6) {
    return `${whole + 1}.0`;
  }
  return `${whole}.${nextBall}`;
}

export function computeEquation(state: MatchState): string {
  const needed = state.target - state.score;
  if (needed <= 0) return "MI WIN!";
  const balls = ballsRemaining(state.overs);
  if (balls <= 0) return `MI need ${needed} — final ball!`;
  return `MI need ${needed} off ${balls}`;
}

function updateBatsmen(
  batsmen: MatchState["batsmen"],
  event: MatchEvent
): MatchState["batsmen"] {
  const updated = batsmen.map((b) => ({ ...b }));

  if (event.wicket && event.batsman) {
    const idx = updated.findIndex((b) => b.name === event.batsman);
    if (idx >= 0) {
      updated[idx] = { ...updated[idx], balls: updated[idx].balls + 1 };
    }
    if (event.batsman === "Hardik Pandya") {
      const sky = updated.find((b) => b.name === "Suryakumar Yadav");
      return sky
        ? [sky, { name: "Tim David", runs: 0, balls: 0 }]
        : [{ name: "Tim David", runs: 0, balls: 0 }];
    }
    return updated;
  }

  if (!event.batsman) return updated;

  const idx = updated.findIndex((b) => b.name === event.batsman);
  const strikerIdx = idx >= 0 ? idx : 0;
  updated[strikerIdx] = {
    ...updated[strikerIdx],
    runs: updated[strikerIdx].runs + event.runs,
    balls: updated[strikerIdx].balls + 1,
  };

  return updated;
}

export function applyEvent(state: MatchState, event: MatchEvent): MatchState {
  const score = state.score + event.runs;
  const wickets = state.wickets + (event.wicket ? 1 : 0);
  const overs = incrementOver(state.overs);
  const recentBalls = [...state.recentBalls, event.outcome].slice(-6);
  const batsmen = updateBatsmen(state.batsmen, event);
  const bowler = event.bowler
    ? { name: event.bowler, figures: state.bowler.figures }
    : state.bowler;

  const next: MatchState = {
    ...state,
    score,
    wickets,
    overs,
    batsmen,
    bowler,
    recentBalls,
    lastEvent: event.commentary,
  };

  next.equation = computeEquation(next);

  if (score >= state.target) {
    next.status = "Completed";
    next.equation = "MI WIN!";
    next.lastEvent = event.commentary;
  } else if (wickets >= 10 || ballsRemaining(overs) <= 0) {
    next.status = "Completed";
    next.equation = score >= state.target ? "MI WIN!" : "CSK WIN!";
  }

  return next;
}

export function isKeyEvent(event: MatchEvent): boolean {
  return (
    event.outcome === "SIX" ||
    event.outcome === "WICKET" ||
    event.outcome === "FOUR"
  );
}
