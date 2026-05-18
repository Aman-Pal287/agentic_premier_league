import type { MatchEvent, MatchState } from "@/lib/types/match";

export function matchSnapshot(state: MatchState): string {
  return JSON.stringify(
    {
      title: state.title,
      score: `${state.score}/${state.wickets}`,
      overs: state.overs,
      target: state.target,
      equation: state.equation,
      status: state.status,
      batsmen: state.batsmen,
      bowler: state.bowler,
      recentBalls: state.recentBalls,
      lastEvent: state.lastEvent,
    },
    null,
    2
  );
}

export function insightsPrompt(state: MatchState): string {
  return `You are an IPL T20 TV analyst on a second-screen app (MatchMind AI).
Match snapshot:
${matchSnapshot(state)}

Give exactly 3 short insight bullets for fans watching MI vs CSK.
Cover: (1) momentum, (2) pressure situation, (3) tactical tip.
Keep each bullet under 20 words. IPL fan energy, concise.

Respond ONLY with valid JSON:
{"insights":["bullet1","bullet2","bullet3"]}`;
}

export function momentsPrompt(
  state: MatchState,
  event: MatchEvent
): string {
  return `You are an IPL drama commentator. A key ball just happened.

Match:
${matchSnapshot(state)}

Ball event:
${JSON.stringify(event)}

Create 1 dramatic "moment" card for fans.

Respond ONLY with valid JSON:
{"moments":[{"type":"Turning Point"|"Game Changer"|"Clutch Moment"|"IPL Drama","text":"one vivid sentence under 25 words"}]}`;
}

export function chatPrompt(state: MatchState, message: string): string {
  return `You are MatchMind AI — an enthusiastic IPL TV analyst (Star Sports / JioCinema vibe).
Light Hinglish OK. 2-4 sentences max. Be specific to this chase.

Match:
${matchSnapshot(state)}

Fan question: ${message}

Answer like you're on air. No markdown.`;
}
