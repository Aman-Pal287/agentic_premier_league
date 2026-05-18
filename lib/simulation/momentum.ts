import type { BallOutcome } from "@/lib/types/match";

export interface MomentumResult {
  miPercent: number;
  cskPercent: number;
  label: string;
}

export function calculateMomentum(recentBalls: BallOutcome[]): MomentumResult {
  let score = 50;

  for (const ball of recentBalls) {
    switch (ball) {
      case "SIX":
        score += 15;
        break;
      case "FOUR":
        score += 10;
        break;
      case "SINGLE":
        score += 3;
        break;
      case "DOT":
        score -= 8;
        break;
      case "WICKET":
        score -= 20;
        break;
    }
  }

  const miPercent = Math.min(100, Math.max(0, score));
  const cskPercent = 100 - miPercent;

  let label = "Even contest";
  if (miPercent >= 65) label = "MI surging";
  else if (miPercent <= 35) label = "CSK squeezing";
  else if (miPercent >= 55) label = "MI building pressure";
  else if (miPercent <= 45) label = "CSK holding line";

  return { miPercent, cskPercent, label };
}
