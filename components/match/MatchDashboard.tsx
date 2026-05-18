"use client";

import { InsightCards } from "@/components/ai/InsightCards";
import { FanChat } from "@/components/ai/FanChat";
import { MomentCards } from "@/components/ai/MomentCards";
import { BallPrediction } from "@/components/engagement/BallPrediction";
import { FanReactions } from "@/components/engagement/FanReactions";
import { LiveQuiz } from "@/components/engagement/LiveQuiz";
import { LiveScoreboard } from "@/components/match/LiveScoreboard";
import { MomentumMeter } from "@/components/match/MomentumMeter";
import { RecentBalls } from "@/components/match/RecentBalls";
import { SimulationControls } from "@/components/match/SimulationControls";
import { useMatch } from "@/context/MatchContext";

export function MatchDashboard() {
  const { matchState, eventIndex } = useMatch();

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <LiveScoreboard />
          <RecentBalls balls={matchState.recentBalls} eventKey={eventIndex} />
        </div>

        <div className="space-y-4">
          <BallPrediction />
          <MomentumMeter recentBalls={matchState.recentBalls} />
          <SimulationControls />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InsightCards />
        <LiveQuiz />
        <FanReactions />
        <MomentCards />
        <div className="sm:col-span-2 lg:col-span-2">
          <FanChat />
        </div>
      </div>
    </div>
  );
}
