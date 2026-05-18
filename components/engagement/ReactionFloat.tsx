"use client";

import { useEffect } from "react";

interface ReactionFloatProps {
  id: string;
  emoji: string;
  left: number;
  onDone: (id: string) => void;
}

export function ReactionFloat({ id, emoji, left, onDone }: ReactionFloatProps) {
  useEffect(() => {
    const t = setTimeout(() => onDone(id), 2200);
    return () => clearTimeout(t);
  }, [id, onDone]);

  return (
    <span
      className="pointer-events-none absolute bottom-0 z-20 text-2xl animate-reaction-float"
      style={{ left: `${left}%` }}
      aria-hidden
    >
      {emoji}
    </span>
  );
}
