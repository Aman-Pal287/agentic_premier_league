import type { MatchEvent, MatchState } from "@/lib/types/match";

export function fallbackInsights(state: MatchState): string[] {
  const needed = state.target - state.score;
  return [
    `MI need ${needed} more — every ball is gold at Wankhede right now.`,
    `Pathirana vs SKY — the yorker battle will decide this chase.`,
    `CSK will hunt wickets; MI must keep wickets in hand for the last over.`,
  ];
}

export function fallbackMoments(
  event: MatchEvent
): { type: string; text: string }[] {
  if (event.outcome === "SIX") {
    return [
      {
        type: "IPL Drama",
        text: "Six lands! The crowd erupts — momentum swings MI's way.",
      },
    ];
  }
  if (event.wicket) {
    return [
      {
        type: "Turning Point",
        text: "WICKET! CSK strike — the chase just got tense.",
      },
    ];
  }
  if (event.outcome === "FOUR") {
    return [
      {
        type: "Game Changer",
        text: "Boundary! MI keep the scoreboard ticking in the death overs.",
      },
    ];
  }
  return [
    {
      type: "Clutch Moment",
      text: "Pressure ball — both teams fighting for control of the over.",
    },
  ];
}

export function fallbackChat(
  state: MatchState,
  message: string
): string {
  const lower = message.toLowerCase();
  const needed = state.target - state.score;

  if (lower.includes("win") || lower.includes("chase")) {
    return `Bhai, MI need ${needed} off ${state.equation?.split("off")[1]?.trim() ?? "few"} balls — totally chaseable if SKY or David fire. Wankhede crowd will push them!`;
  }
  if (lower.includes("pressure") || lower.includes("who")) {
    return `Right now the bowler is under pressure — MI have wickets. But one dot ball and CSK are back on top. Classic IPL death over!`;
  }
  if (lower.includes("momentum")) {
    return `Momentum shifts every ball in T20. Recent balls show who's dominating — watch the next over, that's where the match turns.`;
  }
  return `Great question! MI are ${state.score}/${state.wickets} chasing ${state.target} — ${state.equation ?? "tight finish"}. Stay locked in, this one's a thriller!`;
}
