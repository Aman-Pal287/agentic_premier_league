"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { INITIAL_MATCH, MATCH_EVENTS } from "@/lib/mock";
import {
  evaluatePrediction,
  formatOutcome,
} from "@/lib/prediction/evaluate";
import { applyEvent, isKeyEvent } from "@/lib/simulation/match-engine";
import type { MatchEvent, MatchState, PredictionChoice } from "@/lib/types/match";

export interface PredictionFeedback {
  correct: boolean;
  message: string;
  points: number;
}

interface MatchContextValue {
  matchState: MatchState;
  isLive: boolean;
  isPaused: boolean;
  eventIndex: number;
  totalEvents: number;
  userPoints: number;
  lastBallEvent: MatchEvent | null;
  shouldTriggerAI: boolean;
  pendingPrediction: PredictionChoice | null;
  predictionFeedback: PredictionFeedback | null;
  predictionStats: { correct: number; total: number };
  addPoints: (n: number) => void;
  submitPrediction: (choice: PredictionChoice) => void;
  clearAITrigger: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  resetSimulation: () => void;
  sessionKey: number;
}

const MatchContext = createContext<MatchContextValue | null>(null);

function randomInterval(): number {
  return 4000 + Math.floor(Math.random() * 2000);
}

export function MatchProvider({ children }: { children: ReactNode }) {
  const [matchState, setMatchState] = useState<MatchState>(INITIAL_MATCH);
  const [eventIndex, setEventIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [lastBallEvent, setLastBallEvent] = useState<MatchEvent | null>(null);
  const [shouldTriggerAI, setShouldTriggerAI] = useState(false);
  const [simKey, setSimKey] = useState(0);
  const [pendingPrediction, setPendingPrediction] =
    useState<PredictionChoice | null>(null);
  const [predictionFeedback, setPredictionFeedback] =
    useState<PredictionFeedback | null>(null);
  const [predictionStats, setPredictionStats] = useState({
    correct: 0,
    total: 0,
  });

  const eventIndexRef = useRef(0);
  const pausedRef = useRef(false);
  const pendingPredictionRef = useRef<PredictionChoice | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resolvePrediction = useCallback(
    (event: MatchEvent) => {
      const choice = pendingPredictionRef.current;
      if (!choice) return;

      const { correct, points } = evaluatePrediction(choice, event.outcome);
      const actual = formatOutcome(event.outcome);

      setPredictionStats((s) => ({
        correct: s.correct + (correct ? 1 : 0),
        total: s.total + 1,
      }));

      if (correct) {
        setUserPoints((p) => p + points);
        setPredictionFeedback({
          correct: true,
          points,
          message: `Correct! It was a ${actual}`,
        });
      } else {
        setPredictionFeedback({
          correct: false,
          points: 0,
          message: `Wrong — it was a ${actual}`,
        });
      }

      pendingPredictionRef.current = null;
      setPendingPrediction(null);
    },
    []
  );

  const isLive =
    matchState.status === "Live" && eventIndex < MATCH_EVENTS.length;

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (isPaused || matchState.status !== "Live") {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    if (eventIndexRef.current >= MATCH_EVENTS.length) return;

    const tick = () => {
      if (pausedRef.current) return;

      const idx = eventIndexRef.current;
      if (idx >= MATCH_EVENTS.length) return;

      const event = MATCH_EVENTS[idx];
      resolvePrediction(event);
      setMatchState((prev) => applyEvent(prev, event));
      setLastBallEvent(event);
      if (isKeyEvent(event)) setShouldTriggerAI(true);

      eventIndexRef.current = idx + 1;
      setEventIndex(idx + 1);

      if (idx + 1 < MATCH_EVENTS.length) {
        timerRef.current = setTimeout(tick, randomInterval());
      }
    };

    timerRef.current = setTimeout(tick, randomInterval());

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused, matchState.status, simKey, resolvePrediction]);

  const pauseSimulation = useCallback(() => {
    setIsPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const resumeSimulation = useCallback(() => {
    setIsPaused(false);
  }, []);

  const resetSimulation = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    eventIndexRef.current = 0;
    pausedRef.current = false;
    setEventIndex(0);
    setMatchState(INITIAL_MATCH);
    setIsPaused(false);
    setLastBallEvent(null);
    setShouldTriggerAI(false);
    setUserPoints(0);
    pendingPredictionRef.current = null;
    setPendingPrediction(null);
    setPredictionFeedback(null);
    setPredictionStats({ correct: 0, total: 0 });
    setSimKey((k) => k + 1);
  }, []);

  const addPoints = useCallback((n: number) => {
    setUserPoints((p) => p + n);
  }, []);

  const submitPrediction = useCallback(
    (choice: PredictionChoice) => {
      if (pendingPredictionRef.current) return;
      if (matchState.status !== "Live") return;
      pendingPredictionRef.current = choice;
      setPendingPrediction(choice);
      setPredictionFeedback(null);
    },
    [matchState.status]
  );

  const clearAITrigger = useCallback(() => {
    setShouldTriggerAI(false);
  }, []);

  return (
    <MatchContext.Provider
      value={{
        matchState,
        isLive,
        isPaused,
        eventIndex,
        totalEvents: MATCH_EVENTS.length,
        userPoints,
        lastBallEvent,
        shouldTriggerAI,
        pendingPrediction,
        predictionFeedback,
        predictionStats,
        addPoints,
        submitPrediction,
        clearAITrigger,
        pauseSimulation,
        resumeSimulation,
        resetSimulation,
        sessionKey: simKey,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export function useMatch() {
  const ctx = useContext(MatchContext);
  if (!ctx) {
    throw new Error("useMatch must be used within MatchProvider");
  }
  return ctx;
}
