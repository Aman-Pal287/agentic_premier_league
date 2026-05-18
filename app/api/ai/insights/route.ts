import { generateText } from "@/lib/ai/gemini";
import { fallbackInsights } from "@/lib/ai/fallbacks";
import { parseJson } from "@/lib/ai/parse";
import { insightsPrompt } from "@/lib/ai/prompts";
import type { MatchState } from "@/lib/types/match";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const matchState = body.matchState as MatchState;

    if (!matchState) {
      return NextResponse.json(
        { error: "matchState required" },
        { status: 400 }
      );
    }

    const text = await generateText(insightsPrompt(matchState));

    if (text) {
      const parsed = parseJson<{ insights: string[] }>(text);
      if (parsed?.insights?.length) {
        return NextResponse.json({
          insights: parsed.insights.slice(0, 3),
          source: "gemini",
        });
      }
    }

    return NextResponse.json({
      insights: fallbackInsights(matchState),
      source: "fallback",
    });
  } catch {
    return NextResponse.json({
      insights: [
        "MI fighting hard in this Wankhede chase.",
        "Death overs — every ball swings the momentum.",
        "Watch the yorker vs power-hitting battle!",
      ],
      source: "fallback",
    });
  }
}
