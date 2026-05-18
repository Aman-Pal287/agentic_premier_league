import { generateText } from "@/lib/ai/gemini";
import { fallbackMoments } from "@/lib/ai/fallbacks";
import { parseJson } from "@/lib/ai/parse";
import { momentsPrompt } from "@/lib/ai/prompts";
import type { MatchEvent, MatchState } from "@/lib/types/match";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const matchState = body.matchState as MatchState;
    const event = body.event as MatchEvent;

    if (!matchState || !event) {
      return NextResponse.json(
        { error: "matchState and event required" },
        { status: 400 }
      );
    }

    const text = await generateText(momentsPrompt(matchState, event));

    if (text) {
      const parsed = parseJson<{
        moments: { type: string; text: string }[];
      }>(text);
      if (parsed?.moments?.length) {
        return NextResponse.json({
          moments: parsed.moments.slice(0, 2),
          source: "gemini",
        });
      }
    }

    return NextResponse.json({
      moments: fallbackMoments(event),
      source: "fallback",
    });
  } catch {
    return NextResponse.json({
      moments: fallbackMoments({
        outcome: "DOT",
        runs: 0,
        commentary: "Play continues",
      }),
      source: "fallback",
    });
  }
}
