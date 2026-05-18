import type { MatchState } from "@/lib/types/match";

export const INITIAL_MATCH: MatchState = {
  competition: "IPL",
  season: "IPL 2025",
  venue: "Wankhede Stadium, Mumbai",
  title: "Mumbai Indians vs Chennai Super Kings",
  chasing: "MI",
  defending: "CSK",
  target: 186,
  score: 162,
  wickets: 4,
  overs: "17.0",
  status: "Live",
  batsmen: [
    { name: "Suryakumar Yadav", runs: 58, balls: 32 },
    { name: "Hardik Pandya", runs: 24, balls: 14 },
  ],
  bowler: { name: "Matheesha Pathirana", figures: "3/28" },
  recentBalls: ["SINGLE", "DOT", "FOUR", "SINGLE", "DOT", "SINGLE"],
  lastEvent: "MI need 24 off 18 — death overs on!",
  equation: "MI need 24 off 18",
};
