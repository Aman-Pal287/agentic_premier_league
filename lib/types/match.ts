export type BallOutcome = "FOUR" | "SIX" | "WICKET" | "DOT" | "SINGLE";

export type IPLTeamId = "MI" | "CSK";

export type MatchStatus = "Live" | "Strategic Timeout" | "Completed";

export interface Batsman {
  name: string;
  runs: number;
  balls: number;
}

export interface Bowler {
  name: string;
  figures: string;
}

export interface MatchState {
  competition: "IPL";
  season: string;
  venue: string;
  title: string;
  chasing: IPLTeamId;
  defending: IPLTeamId;
  target: number;
  score: number;
  wickets: number;
  overs: string;
  status: MatchStatus;
  batsmen: Batsman[];
  bowler: Bowler;
  recentBalls: BallOutcome[];
  lastEvent?: string;
  equation?: string;
}

export interface MatchEvent {
  outcome: BallOutcome;
  runs: number;
  wicket?: boolean;
  batsman?: string;
  bowler?: string;
  commentary: string;
}

export type QuizCategory = "IPL History" | "Live Guess" | "Player Trivia";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
  category: QuizCategory;
}

export type PredictionChoice = "BOUNDARY" | "WICKET" | "DOT" | "SINGLE";
