import type { BallOutcome } from "@/lib/types/match";

const STYLES: Record<BallOutcome, string> = {
  FOUR: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  SIX: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  WICKET: "bg-red-500/20 text-red-400 border-red-500/30",
  DOT: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  SINGLE: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

interface BallChipProps {
  outcome: BallOutcome;
  highlight?: boolean;
}

export function BallChip({ outcome, highlight }: BallChipProps) {
  const label =
    outcome === "DOT" ? "·" : outcome === "WICKET" ? "W" : outcome[0];

  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-all duration-300 ${STYLES[outcome]} ${highlight ? "scale-110 ring-2 ring-cyan-400/50" : ""}`}
    >
      {label}
    </span>
  );
}
