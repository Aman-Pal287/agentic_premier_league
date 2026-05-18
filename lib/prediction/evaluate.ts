import type { BallOutcome, PredictionChoice } from "@/lib/types/match";

export function predictionMatches(
  choice: PredictionChoice,
  outcome: BallOutcome
): boolean {
  switch (choice) {
    case "BOUNDARY":
      return outcome === "FOUR" || outcome === "SIX";
    case "WICKET":
      return outcome === "WICKET";
    case "DOT":
      return outcome === "DOT";
    case "SINGLE":
      return outcome === "SINGLE";
    default:
      return false;
  }
}

export function pointsForPrediction(choice: PredictionChoice): number {
  return choice === "BOUNDARY" || choice === "WICKET" ? 25 : 10;
}

export function evaluatePrediction(
  choice: PredictionChoice,
  outcome: BallOutcome
): { correct: boolean; points: number } {
  const correct = predictionMatches(choice, outcome);
  return {
    correct,
    points: correct ? pointsForPrediction(choice) : 0,
  };
}

export function formatOutcome(outcome: BallOutcome): string {
  switch (outcome) {
    case "FOUR":
      return "FOUR";
    case "SIX":
      return "SIX";
    case "WICKET":
      return "WICKET";
    case "DOT":
      return "DOT BALL";
    case "SINGLE":
      return "SINGLE";
  }
}

export const PREDICTION_LABELS: Record<
  PredictionChoice,
  { label: string; hint: string }
> = {
  BOUNDARY: { label: "Boundary", hint: "4 or 6" },
  WICKET: { label: "Wicket", hint: "W" },
  DOT: { label: "Dot Ball", hint: "0 runs" },
  SINGLE: { label: "Single", hint: "1 run" },
};
