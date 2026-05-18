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
import { applyEvent, isKeyEvent } from "@/lib/simulation/match-engine";
import type { MatchEvent, MatchState } from "@/lib/types/match";

interface MatchContextValue {
  matchState: MatchState;
  isLive: boolean;
  isPaused: boolean;
  eventIndex: number;
  totalEvents: number;
  userPoints: number;
  lastBallEvent: MatchEvent | null;
  shouldTriggerAI: boolean;
  addPoints: (n: number) => void;
  clearAITrigger: () => void;
  pauseSimulation: () => void;
  resumeSimulation: () => void;
  resetSimulation: () => void;
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

  const eventIndexRef = useRef(0);
  const pausedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  }, [isPaused, matchState.status, simKey]);

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
    setSimKey((k) => k + 1);
  }, []);

  const addPoints = useCallback((n: number) => {
    setUserPoints((p) => p + n);
  }, []);

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
        addPoints,
        clearAITrigger,
        pauseSimulation,
        resumeSimulation,
        resetSimulation,
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
