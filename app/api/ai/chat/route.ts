import { generateText } from "@/lib/ai/gemini";
import { fallbackChat } from "@/lib/ai/fallbacks";
import { chatPrompt } from "@/lib/ai/prompts";
import type { MatchState } from "@/lib/types/match";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const matchState = body.matchState as MatchState;
    const message = (body.message as string)?.trim();

    if (!matchState || !message) {
      return NextResponse.json(
        { error: "matchState and message required" },
        { status: 400 }
      );
    }

    const text = await generateText(chatPrompt(matchState, message));

    if (text) {
      return NextResponse.json({ reply: text, source: "gemini" });
    }

    return NextResponse.json({
      reply: fallbackChat(matchState, message),
      source: "fallback",
    });
  } catch {
    return NextResponse.json({
      reply: "MatchMind AI is warming up — ask again in a moment!",
      source: "fallback",
    });
  }
}
